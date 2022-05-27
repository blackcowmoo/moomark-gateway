import { gql } from 'apollo-server-express';

import directives from './directives';
import authType from './auth';
import userType from './user';

const rootQuerySchema = gql`
  type Query {
    # test
    healthz: String!
    servers: String!

    me: User @auth
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    login(type: String!, code: String!): Login!
    withdraw: Boolean!
  }
`;

export const typeDefs = [directives, userType, authType, rootQuerySchema, rootMutationSchema];
