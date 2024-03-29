import { gql } from 'apollo-server-express';

export default gql`
  enum Role {
    USER
    WITHDRAW
  }

  type User {
    id: String!
    email: String!
    nickname: String!
    picture: String
    role: Role!
  }
`;
