/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface DraftMutationInput {
  title: string;
  body?: string | null;
  type: string;
}

export interface DraftQueryInput {
  id?: string | null;
  title?: string | null;
}

export interface PostMutationInput {
  title: string;
  slug: string;
  body?: string | null;
  type: string;
}

export interface PostQueryInput {
  id?: string | null;
  slug?: string | null;
  title?: string | null;
}

export interface TypeMutationInput {
  name: string;
  suptype?: string | null;
  desc?: string | null;
}

export interface TypeQueryInput {
  id?: string | null;
  name?: string | null;
}

export interface TypesQueryInput {
  suptype?: string | null;
  isRoot?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
