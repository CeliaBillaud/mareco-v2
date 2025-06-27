import { gql } from "@apollo/client";

export const GET_ALL_RECOS = gql`
  query GetAllRecos {
    getAllRecos {
      id
      title
      content
      type
      link
      user {
        id
        username
      }
    }
  }
`;
