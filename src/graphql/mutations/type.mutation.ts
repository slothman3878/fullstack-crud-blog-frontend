import {gql} from '@apollo/client'

export const CREATE_TYPE = gql`
  mutation CreateType($createTypeInput: TypeMutationInput!) {
    createType(input: $createTypeInput) {
      id
      name
      suptype {
        id
        name
      }
    }
  }
`