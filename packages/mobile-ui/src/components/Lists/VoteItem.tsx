import React from 'react';
import styled from 'styled-components/native';
import { VotesIndex as VotesIndexCmp } from '../VotesIndex';
import VoteDateCmp from '../shared/VoteDate.tsx/VoteDate';
import { PieChart, Slice } from '../shared/Charts/PieChart';

// import ActivityIndex from './ActivityIndex';
// import DemocracyIconComponent from '../../iconfont/DemocracyFont';
// import StatusIcon from '../components/StatusIcon';

// const DemocracyIcon = styled(DemocracyIconComponent)``;

const ListItemWrapper = styled.View`
  flex-direction: row;
`;

const MainWrapper = styled.View`
  flex: 1;
  padding-right: 10;
  justify-content: space-between;
`;

const SideWrapper = styled.View`
  align-items: flex-end;
  min-width: 50;
`;

const VotesIndex = styled(VotesIndexCmp)``;

const ChartWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  min-width: 45;
  padding-top: 18;
`;

const VoteDate = styled(VoteDateCmp)`
  padding-top: 18;
`;

const Title = styled.Text.attrs(() => ({ numberOfLines: 3 }))`
  font-size: 17;
  color: #030303;
`;
const Subline = styled.Text`
  padding-top: 8;
  font-size: 15;
  color: #8f8e94;
`;

interface Props {
  title: string;
  subline?: string | null;
  voted: boolean;
  votes: number;
  voteDate: Date;
  endDate?: Date;
  communityVotes?: Slice[];
  governmentVotes?: Slice[];
}

const VoteItem: React.FC<Props> = ({
  title,
  subline,
  voteDate,
  endDate,
  communityVotes = [{ percent: 1, color: '#d8d8d8' }],
  governmentVotes,
  // procedureId,
  // children,
  // activityIndex: { activityIndex, active },
  // votedGovernment,
  voted,
  // viewedStatus,
  votes,
}) => {
  // TODO title length function: handle subline line length by https://facebook.github.io/react-native/docs/text#ontextlayout on title
  // const [titleLines, setTitleLines] = useState(2);
  return (
    <ListItemWrapper>
      {/* <StatusIcon
      push={viewedStatus === 'PUSH'}
      unreaded={viewedStatus === 'NEW' && !voted && !active}
    /> */}
      <MainWrapper>
        <Title
        // TODO title length function
        // onTextLayout={({ nativeEvent: { lines } }) =>
        //   setTitleLines(lines.length)
        // }
        >
          {title}
        </Title>
        {subline && (
          <Subline
            // TODO title length function
            // numberOfLines={titleLines > 2 ? 1 : 2}
            numberOfLines={2}>
            {subline}
          </Subline>
        )}
      </MainWrapper>
      <SideWrapper>
        <VotesIndex votes={votes} voted={voted} />
        <ChartWrapper>
          {governmentVotes && <PieChart data={governmentVotes} size={20} />}
          <PieChart data={communityVotes} size={20} />
        </ChartWrapper>
        {voteDate && <VoteDate date={voteDate} endDate={endDate} />}
      </SideWrapper>
    </ListItemWrapper>
  );
};

export { VoteItem };
