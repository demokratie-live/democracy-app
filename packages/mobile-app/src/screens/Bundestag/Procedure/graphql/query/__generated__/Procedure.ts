/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
  ListType,
  VoteSelection,
} from './../../../../../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: Procedure
// ====================================================

export interface Procedure_procedure_importantDocuments {
  __typename: 'Document';
  editor: string;
  type: string;
  url: string;
  number: string;
}

export interface Procedure_procedure_communityVotes_constituencies {
  __typename: 'CommunityConstituencyVotes';
  yes: number;
  abstination: number;
  no: number;
  constituency: string;
  total: number | null;
}

export interface Procedure_procedure_communityVotes {
  __typename: 'CommunityVotes';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
  constituencies: Procedure_procedure_communityVotes_constituencies[];
}

export interface Procedure_procedure_voteResults_partyVotes_deviants {
  __typename: 'Deviants';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
}

export interface Procedure_procedure_voteResults_partyVotes {
  __typename: 'PartyVote';
  main: VoteSelection | null;
  party: string;
  deviants: Procedure_procedure_voteResults_partyVotes_deviants;
}

export interface Procedure_procedure_voteResults {
  __typename: 'VoteResult';
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
  decisionText: string | null;
  namedVote: boolean | null;
  governmentDecision: VoteSelection | null;
  partyVotes: Procedure_procedure_voteResults_partyVotes[];
}

export interface Procedure_procedure {
  __typename: 'Procedure';
  _id: string;
  procedureId: string;
  title: string;
  sessionTOPHeading: string | null;
  tags: (string | null)[] | null;
  abstract: string | null;
  voteDate: any | null;
  voteEnd: any | null;
  notify: boolean | null;
  list: ListType | null;
  type: string;
  subjectGroups: string[] | null;
  submissionDate: any | null;
  currentStatus: string | null;
  currentStatusHistory: string[];
  voted: boolean;
  votedGovernment: boolean | null;
  importantDocuments: Procedure_procedure_importantDocuments[];
  communityVotes: Procedure_procedure_communityVotes | null;
  voteResults: Procedure_procedure_voteResults | null;
}

export interface Procedure {
  procedure: Procedure_procedure;
}

export interface ProcedureVariables {
  id: string;
  constituencies?: string[] | null;
}
