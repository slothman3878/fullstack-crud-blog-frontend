/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TypeQueryInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TypeExists
// ====================================================

export interface TypeExists_type {
  __typename: "Type";
  id: string;
  name: string;
}

export interface TypeExists {
  type: TypeExists_type | null;
}

export interface TypeExistsVariables {
  typeInput: TypeQueryInput;
}
