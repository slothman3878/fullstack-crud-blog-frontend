import { gql } from "@apollo/client";

export const DRAFT = gql`
  query Draft($input: DraftQueryInput!) {
    draft(input: $input) {
      id
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