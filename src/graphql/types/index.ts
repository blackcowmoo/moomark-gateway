import { gql } from 'apollo-server-express';

import directives from './directives';
import authType from './auth';
import userType from './user';
import postType from './post';

const rootQuerySchema = gql`
  type Query {
    # test
    healthz: String! @dev
    servers: String! @dev

    me: User @auth
    post(id: Int!): Post!
    listPosts(offset: Int, limit: Int): PostMetadata!
  }
`;

const rootMutationSchema = gql`
  type Mutation {
    login(type: String!, code: String!): Login!
    refreshToken(refreshToken: String!): Login!
    withdraw: Boolean! @auth
    writePost(post: PostInput!): Post! @auth
  }
`;

export const typeDefs = [directives, userType, postType, authType, rootQuerySchema, rootMutationSchema];
