/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DraftsQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Drafts
// ====================================================

export interface Drafts_drafts {
  __typename: "Draft";
  id: string;
  title: string;
  createdAt: any;
  updatedAt: any;
}

export interface Drafts {
  drafts: Drafts_drafts[] | null;
}

export interface DraftsVariables {
  input: DraftsQueryInput;
  limit?: number | null;
  offset?: number | null;
}
