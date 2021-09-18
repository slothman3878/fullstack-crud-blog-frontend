/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DraftMutationInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SaveDraft
// ====================================================

export interface SaveDraft_saveDraft_type {
  __typename: "Type";
  id: string;
}

export interface SaveDraft_saveDraft {
  __typename: "Post";
  id: string;
  title: string;
  type: SaveDraft_saveDraft_type;
}

export interface SaveDraft {
  saveDraft: SaveDraft_saveDraft;
}

export interface SaveDraftVariables {
  input: DraftMutationInput;
  id: string;
}
