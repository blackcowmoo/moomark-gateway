import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: Int!
    user: User!
    title: String!
    content(length: Int, removeMarkdown: Boolean): String!
    uploadTime: String!
    recommendCount: Int!
    viewsCount: Int!
  }

  input PostInput {
    id: Int
    title: String!
    content: String!
  }

  type PostMetadata {
    total: Int!
    posts: [Post]!
  }
`;
