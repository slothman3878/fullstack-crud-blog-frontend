/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: PostExists
// ====================================================

export interface PostExists_post {
  __typename: "Post";
  id: string;
  slug: string;
  title: string;
}

export interface PostExists {
  post: PostExists_post | null;
}

export interface PostExistsVariables {
  input: PostQueryInput;
}
