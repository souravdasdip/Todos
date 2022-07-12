import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($userSignin: UserSignInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_QOUTE = gql`
  mutation CreateQuote($name: String!) {
    quote: createQuote(name: $name)
  }
`;
