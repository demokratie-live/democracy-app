import gql from 'graphql-tag';

export const FINISH_SEARCH = gql`
  mutation FinishSearch($term: String!) {
    finishSearch(term: $term) {
      term
    }
  }
`;
