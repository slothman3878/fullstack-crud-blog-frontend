import {gql} from '@apollo/client';

export const TYPE = gql`
  query Type($typeInput: TypeQueryInput!) {
    type(input: $typeInput) {
      id
      name
      desc
      suptype {
        id
        name
      }
      subtypes {
        name
        id
      }
    }
  }
`

/// Check existence, and returns only unique parameters
export const TYPE_EXISTS = gql`
  query TypeExists($typeInput: TypeQueryInput!) {
    type(input: $typeInput) {
      id
      name
    }
  }
`

export const TYPES = gql`
  query Types($typesInput: TypesQueryInput!, $limit: Float, $offset: Float) {
    types(input: $typesInput, offset: $offset, limit: $limit) {
      id
      name
      isRoot
      suptype {
        id
      }
      subtypes {
        id
      }
    }
  }
`