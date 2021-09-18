import {gql} from '@apollo/client'

export const CREATE_POST = gql`
  mutation CreatePost($draft_id: String!, $slug: String!) {
    createPost(draft_id: $draft_id, slug: $slug) {
      id
      title
      slug
      type {
        id
      } 
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