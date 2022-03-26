import { gql } from 'apollo-server-express';
import authType from './auth';

const rootQuerySchema = gql`
  type Query {
    healthz: String!
    servers: String!
  }
`;

const devRequestType = gql`
  type devRequest {
    headers: [String]!
    status: Int!
    data: String!
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    request(method: String!, service: String!, url: String!, body: String, headers: String, params: String): devRequest!
    login(type: String!, code: String!): Login!
  }
`;

export const typeDefs = [authType, devRequestType, rootQuerySchema, rootMutationSchema];
