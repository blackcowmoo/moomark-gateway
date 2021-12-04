import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    login(type: String!, code: String!, state: String): String!
  }
`;
