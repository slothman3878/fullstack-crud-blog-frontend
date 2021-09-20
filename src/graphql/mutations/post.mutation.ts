import {gql} from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost($draft_id: String!) {
    createPost(draft_id: $draft_id) {
      id
      slug
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($id: String!, $input: PostMutationInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      slug
      type {
        id
      }       
    }
  }
`