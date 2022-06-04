import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: Int!
    userId: String!
    title: String!
    content: String!
    uploadTime: String!
    recommendCount: Int!
    viewsCount: Int!
  }

  input PostInput {
    id: Int
    title: String!
    content: String!
  }
`;
