import React, { useState, useContext } from 'react';
import { Text, ListRenderItem, SectionList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { procedures } from './graphql/query/procedures';
import {
  ProceduresList,
  ProceduresListVariables,
  ProceduresList_procedures,
} from './graphql/query/__generated__/ProceduresList';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { TopTabParamList } from '../../../routes/Sidebar/Bundestag/TabView';
import styled from 'styled-components/native';
import { Segment } from './Components/Segment';
import { ListType } from '../../../../__generated__/globalTypes';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { pieChartGovernmentData } from '../../../lib/helper/PieChartGovernmentData';
import { ListFilterContext } from '../../../context/ListFilter';
import { NoConferenceWeekData } from './NoConferenceWeekData';

type ListScreenRouteProp = RouteProp<
  TopTabParamList,
  'DEV' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
>;

export interface SegmentedData {
  title: string;
  data: ProceduresList_procedures[];
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const List = () => {
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const { proceduresFilter } = useContext(ListFilterContext);
  const route = useRoute<ListScreenRouteProp>();
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, error, fetchMore, networkStatus, refetch } = useQuery<
    ProceduresList,
    ProceduresListVariables
  >(procedures, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    variables: {
      listTypes: [route.params.list],
      pageSize: 10,
      filter: proceduresFilter,
    },
  });

  if (loading) {
    return <ListLoading />;
  }

  if (error) {
    return <Text>some error: {error.message}</Text>;
  }

  if (!data) {
    return <Text>some error: No Data</Text>;
  }

  if (
    route.params.list === ListType.CONFERENCEWEEKS_PLANNED &&
    data.procedures.length === 0
  ) {
    return <NoConferenceWeekData />;
  }
  let segmentedData: SegmentedData[];

  // Do not sort top 100 list
  if (ListType.TOP100 === route.params.list) {
    segmentedData = [
      {
        title: '',
        data: data.procedures,
      },
    ];
  } else {
    segmentedData = data.procedures.reduce<SegmentedData[]>(
      (prev, procedure) => {
        const { voteWeek, voteYear } = procedure;
        const segment = `KW ${voteWeek}/${voteYear}`;
        const index = prev.findIndex(({ title }) => title === segment);
        if (index !== -1) {
          return Object.assign([...prev], {
            [index]: { title: segment, data: [...prev[index].data, procedure] },
          });
        }
        return [
          ...prev,
          {
            title: segment,
            data: [procedure],
          },
        ];
      },
      [],
    );
  }

  const renderItem: ListRenderItem<ProceduresList_procedures> = ({
    item: {
      procedureId,
      title,
      sessionTOPHeading,
      subjectGroups,
      voteDate,
      voteEnd,
      voted,
      type,
      voteResults,
      votedGovernment,
      communityVotes,
    },
  }) => {
    // If no session top headings available use subject groups
    let subline = null;
    if (sessionTOPHeading) {
      subline = sessionTOPHeading;
    } else if (subjectGroups) {
      subline = subjectGroups.join(', ');
    }

    const govSlices = pieChartGovernmentData({
      voteResults,
      votedGovernment,
    });

    const localSelection = getLocalVoteSelection(procedureId);
    // TODO improve Graphql Types
    const communityVoteSlices = communityVoteData({
      communityVotes,
      localSelection,
      voted,
    });

    return (
      <Row
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId,
            title: type || procedureId,
          })
        }>
        <ListItem
          title={title}
          subline={subline}
          voteDate={voteDate}
          endDate={voteEnd}
          voted={voted}
          votes={communityVotes ? communityVotes.total || 0 : 0}
          governmentVotes={govSlices}
          communityVotes={communityVoteSlices}
        />
      </Row>
    );
  };

  return (
    <Container>
      <SectionList<ProceduresList_procedures>
        sections={segmentedData}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) =>
          route.params.list !== 'TOP100' ? (
            <Segment text={section.title} />
          ) : null
        }
        testID="ListView"
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() => (hasMore ? <ListLoading /> : null)}
        onRefresh={refetch}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          !loading &&
            hasMore &&
            fetchMore({
              variables: {
                offset: data.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }

                if (fetchMoreResult.procedures.length === 0) {
                  setHasMore(false);
                }

                const newProcedureList = [
                  ...prev.procedures,
                  ...fetchMoreResult.procedures,
                ];

                return Object.assign({}, prev, {
                  procedures: newProcedureList.filter(
                    (s1, pos, arr) =>
                      arr.findIndex(s2 => s2.procedureId === s1.procedureId) ===
                      pos,
                  ),
                });
              },
            });
        }}
      />
    </Container>
  );
};
