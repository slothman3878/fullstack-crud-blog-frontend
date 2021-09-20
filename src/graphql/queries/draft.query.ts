import { gql } from "@apollo/client";

export const DRAFT = gql`
  query Draft($input: DraftQueryInput!) {
    draft(input: $input) {
      id
      title
      slug
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

export const DRAFTS = gql`
  query Drafts($input: DraftsQueryInput!, $limit: Float, $offset: Float) {
    drafts(input: $input, limit: $limit, offset: $offset) {
      id
      title
      createdAt
      updatedAt
    }
  }
`