/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DraftQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Draft
// ====================================================

export interface Draft_draft_type {
  __typename: "Type";
  id: string;
  name: string;
}

export interface Draft_draft_writer {
  __typename: "User";
  id: string;
  email: string;
}

export interface Draft_draft {
  __typename: "Draft";
  id: string;
  title: string;
  body: string;
  type: Draft_draft_type | null;
  writer: Draft_draft_writer;
  createdAt: any;
  updatedAt: any;
}

export interface Draft {
  draft: Draft_draft | null;
}

export interface DraftVariables {
  input: DraftQueryInput;
}
