import { gql } from 'apollo-server-express';

export default gql`
  enum Role {
    USER
  }

  type User {
    # id: String!
    name: String!
    email: String!
    nickname: String!
    picture: String
    role: Role!
  }
`;
