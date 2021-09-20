/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostsQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts {
  __typename: "Post";
  id: string;
  slug: string;
  title: string;
}

export interface Posts {
  posts: Posts_posts[] | null;
}

export interface PostsVariables {
  input: PostsQueryInput;
  limit?: number | null;
  offset?: number | null;
}
