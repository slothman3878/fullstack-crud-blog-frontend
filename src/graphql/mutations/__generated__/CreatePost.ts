/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_type {
  __typename: "Type";
  id: string;
}

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  title: string;
  slug: string;
  type: CreatePost_createPost_type;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  draft_id: string;
  slug: string;
}
