import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    myProfile: User
  }

  type QuoteWithName {
    name: String
    by: IdAndName
  }

  type IdAndName {
    _id: String
    firstName: String
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSignInput!): Token
    createQuote(name: String!): String
  }

  type Token {
    token: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSignInput {
    email: String!
    password: String!
  }
`;
