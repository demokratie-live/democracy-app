import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import {
  Procedure as ProcedureQueryObj,
  ProcedureVariables,
} from './graphql/query/__generated__/Procedure';
import PROCEDURE from './graphql/query/Procedure';
import { Intro } from './Intro';
import styled from 'styled-components/native';
import Details from './components/Details';

const Container = styled.ScrollView`
  background-color: #fff;
`;

type ProcedureScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Procedure'
>;

type Props = {
  route: ProcedureScreenRouteProp;
};

export const Procedure: FC<Props> = ({ route }) => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  const { data, loading } = useQuery<ProcedureQueryObj, ProcedureVariables>(
    PROCEDURE,
    {
      variables: {
        id: route.params.procedureId,
      },
    },
  );
  if (loading) {
    return <Text>loading…</Text>;
  }
  if (!data) {
    return <Text>procedure not found</Text>;
  }

  const {
    title,
    voteDate,
    voteEnd,
    sessionTOPHeading,
    procedureId,
    type,
    subjectGroups,
    submissionDate,
    abstract,
    currentStatus,
  } = data.procedure;

  return (
    <Container>
      <Intro
        title={title}
        date={voteDate}
        endDate={voteEnd}
        topHeading={sessionTOPHeading}
        procedureId={procedureId}
        type={type || ''} // TODO fix GraphQL TypeScript Safety
      />
      <Folding title="Details" opened>
        <Details
          subjectGroups={subjectGroups}
          submissionDate={submissionDate}
          dateVote={voteDate}
          abstract={abstract}
          procedureId={procedureId}
          currentStatus={currentStatus}
          type={type}
        />
      </Folding>

      {
        // TODO Remove source bottom from here
      }
      <Text>Procedure Page</Text>
      <Text>ID: {route.params.procedureId}</Text>
      <Button
        title="Go to Voting"
        onPress={() => navigation.navigate('Voting')}
      />
    </Container>
  );
};
