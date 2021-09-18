/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TypesQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Types
// ====================================================

export interface Types_types_suptype {
  __typename: "Type";
  id: string;
}

export interface Types_types_subtypes {
  __typename: "Type";
  id: string;
}

export interface Types_types {
  __typename: "Type";
  id: string;
  name: string;
  isRoot: boolean;
  suptype: Types_types_suptype | null;
  subtypes: Types_types_subtypes[];
}

export interface Types {
  types: Types_types[] | null;
}

export interface TypesVariables {
  typesInput: TypesQueryInput;
  limit?: number | null;
  offset?: number | null;
}
