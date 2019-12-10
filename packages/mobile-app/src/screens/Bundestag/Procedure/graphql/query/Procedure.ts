import gql from 'graphql-tag';

export default gql`
  query Procedure($id: ID!) {
    procedure(id: $id) {
      _id
      procedureId
      title
      sessionTOPHeading
      tags
      abstract
      voteDate
      voteEnd
      notify
      list
      type
      subjectGroups
      submissionDate
      currentStatus
      currentStatusHistory
      importantDocuments {
        editor
        type
        url
        number
      }
      voteResults {
        yes
        abstination
        no
        notVoted
        decisionText
        namedVote
        partyVotes {
          main
          party
          deviants {
            yes
            abstination
            no
            notVoted
          }
        }
      }
    }
  }
`;
