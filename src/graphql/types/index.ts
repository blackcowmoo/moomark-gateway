import { gql } from 'apollo-server-express';
// import auth from './auth';

const rootQuerySchema = gql`
  type Query {
    healthz: String!
    servers: String!
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    request(method: String!, service: String!, url: String!, body: String, headers: String, params: String): String!
    login(type: String!, code: String!, state: String): String!
  }
`;

export const typeDefs = [rootQuerySchema, rootMutationSchema];
