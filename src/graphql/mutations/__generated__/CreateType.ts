/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TypeMutationInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateType
// ====================================================

export interface CreateType_createType_suptype {
  __typename: "Type";
  id: string;
  name: string;
}

export interface CreateType_createType {
  __typename: "Type";
  id: string;
  name: string;
  suptype: CreateType_createType_suptype | null;
}

export interface CreateType {
  createType: CreateType_createType;
}

export interface CreateTypeVariables {
  createTypeInput: TypeMutationInput;
}
