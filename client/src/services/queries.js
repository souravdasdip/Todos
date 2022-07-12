import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      name
      by {
        _id
        firstName
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query getUserInfo {
    myProfile {
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;
