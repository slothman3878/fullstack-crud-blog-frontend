/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_type {
  __typename: "Type";
  id: string;
  name: string;
}

export interface Post_post_writer {
  __typename: "User";
  id: string;
  email: string;
}

export interface Post_post {
  __typename: "Post";
  id: string;
  slug: string;
  title: string;
  body: string;
  type: Post_post_type;
  writer: Post_post_writer;
  createdAt: any;
  updatedAt: any;
}

export interface Post {
  post: Post_post | null;
}

export interface PostVariables {
  input: PostQueryInput;
}
