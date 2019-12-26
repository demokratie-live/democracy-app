/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DeputyProcedures
// ====================================================

export interface DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes {
  __typename: "PartyVote";
  party: string;
  main: VoteSelection | null;
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure_voteResults {
  __typename: "VoteResult";
  governmentDecision: VoteSelection | null;
  yes: number | null;
  abstination: number | null;
  no: number | null;
  notVoted: number | null;
  partyVotes: DeputyProcedures_deputyProcedures_procedures_procedure_voteResults_partyVotes[];
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure_communityVotes {
  __typename: "CommunityVotes";
  yes: number | null;
  abstination: number | null;
  no: number | null;
  total: number | null;
}

export interface DeputyProcedures_deputyProcedures_procedures_procedure {
  __typename: "Procedure";
  _id: string;
  procedureId: string;
  title: string;
  subjectGroups: string[] | null;
  voteDate: any | null;
  votedGovernment: boolean | null;
  submissionDate: any | null;
  completed: boolean | null;
  voted: boolean;
  voteResults: DeputyProcedures_deputyProcedures_procedures_procedure_voteResults | null;
  communityVotes: DeputyProcedures_deputyProcedures_procedures_procedure_communityVotes | null;
}

export interface DeputyProcedures_deputyProcedures_procedures {
  __typename: "DeputyProcedure";
  decision: VoteSelection;
  procedure: DeputyProcedures_deputyProcedures_procedures_procedure;
}

export interface DeputyProcedures_deputyProcedures {
  __typename: "Deputy";
  totalProcedures: number | null;
  procedures: DeputyProcedures_deputyProcedures_procedures[];
}

export interface DeputyProcedures {
  deputyProcedures: DeputyProcedures_deputyProcedures[];
}

export interface DeputyProceduresVariables {
  constituency: string;
  directCandidate?: boolean | null;
  offset?: number | null;
  pageSize?: number | null;
}
