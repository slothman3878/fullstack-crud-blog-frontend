import { gql } from "@apollo/client";

export const POST = gql`
  query Post($input: PostQueryInput!){
    post(input: $input) {
      id
      slug
      title
      body
      type {
        id
        name
      }
      writer {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`

/// Check existence, and returns only unique parameters
/// For checking whether post with given slug and title alrady exists
export const POST_EXISTS = gql`
  query PostExists($input: PostQueryInput!) {
    post(input: $input) {
      id
      slug
      title
    }
  }
`