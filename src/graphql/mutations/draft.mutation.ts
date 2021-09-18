import {gql} from '@apollo/client'

export const CREATE_DRAFT = gql`
  mutation CreateDraft {
    createDraft {
      id
    }
  }
`

export const SAVE_DRAFT = gql`
  mutation SaveDraft($input: DraftMutationInput!, $id: String!) {
    saveDraft(input: $input, id: $id) {
      id
      title
      type {
        id
      }      
    }
  }
`