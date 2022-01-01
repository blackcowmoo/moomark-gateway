import { gql } from 'apollo-server-express';
import auth from './auth';

const rootQuerySchema = gql`
  type Query {
    healthz: String!
    servers: String!
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    request(method: String!, service: String!, url: String!, body: String, header: String, params: String): String!
  }
`;

export const typeDefs = [rootQuerySchema, rootMutationSchema, auth];
