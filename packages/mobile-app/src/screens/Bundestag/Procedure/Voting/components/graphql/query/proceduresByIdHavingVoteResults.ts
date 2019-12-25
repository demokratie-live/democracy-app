import gql from 'graphql-tag';

export default gql`
  query proceduresByIdHavingVoteResults(
    $procedureIds: [String!]
    $pageSize: Int
    $offset: Int
  ) {
    proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
        _id
        procedureId
        title
        tags
        voteDate
        votedGovernment
        submissionDate
        completed
        subjectGroups
        votedGovernment
        voted
        voteResults {
          governmentDecision
          yes
          abstination
          no
          notVoted
          partyVotes {
            party
            main
          }
        }
        communityVotes {
          yes
          abstination
          no
          total
        }
      }
    }
  }
`;
