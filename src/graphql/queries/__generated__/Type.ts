/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TypeQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Type
// ====================================================

export interface Type_type_suptype {
  __typename: "Type";
  id: string;
  name: string;
}

export interface Type_type_subtypes {
  __typename: "Type";
  name: string;
  id: string;
}

export interface Type_type {
  __typename: "Type";
  id: string;
  name: string;
  desc: string | null;
  suptype: Type_type_suptype | null;
  subtypes: Type_type_subtypes[];
}

export interface Type {
  type: Type_type | null;
}

export interface TypeVariables {
  typeInput: TypeQueryInput;
}
