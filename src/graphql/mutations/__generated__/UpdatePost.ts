/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostMutationInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost_updatePost_type {
  __typename: "Type";
  id: string;
}

export interface UpdatePost_updatePost {
  __typename: "Post";
  id: string;
  title: string;
  slug: string;
  type: UpdatePost_updatePost_type;
}

export interface UpdatePost {
  updatePost: UpdatePost_updatePost;
}

export interface UpdatePostVariables {
  id: string;
  input: PostMutationInput;
}
