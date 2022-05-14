import { gql } from 'apollo-server-express';

export const devRequestType = gql`
  type devRequest {
    headers: [String]!
    status: Int!
    data: String!
  }
`;
