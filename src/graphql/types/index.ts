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
    user: User
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    request(method: String!, service: String!, url: String!, body: String, headers: String, params: String): devRequest!
    login(type: String!, code: String!): Login!
  }
`;

export const typeDefs = [userType, authType, devRequestType, rootQuerySchema, rootMutationSchema];
