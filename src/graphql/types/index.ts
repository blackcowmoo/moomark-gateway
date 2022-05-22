import { gql } from 'apollo-server-express';
import authType from './auth';
import { devRequestType } from './test';
import userType from './user';

const rootQuerySchema = gql`
  type Query {
    # test
    healthz: String!
    servers: String!

    # auth
    me: User
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    login(type: String!, code: String!): Login!
    withdraw: Boolean!
  }
`;

export const typeDefs = [userType, authType, devRequestType, rootQuerySchema, rootMutationSchema];
