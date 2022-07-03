import { getPost, listPosts, listPostsCount, writePost } from '@/requests/post';

export const Post = {
  user: async ({ userId }) => {
    const [authProvider, id] = userId.split('@');
    return {
      authProvider,
      id,
    };
  },
  content: ({ content }, { length }): string => {
    return length > 0 ? content.substring(0, length) : content;
  },
};

export const Query = {
  listPosts: async (_, { offset, limit }, { routes }: GraphQLContext): Promise<PostMetadata> => {
    return {
      total: await listPostsCount(routes),
      posts: await listPosts(offset, limit, routes),
    };
  },
  post: async (_, { id }, { routes }: GraphQLContext): Promise<Post> => {
    return getPost(id, routes);
  },
};

export const Mutation = {
  writePost: async (_, { post }: { post: PostInput }, { passport, routes }: GraphQLContext): Promise<Post> => {
    return writePost(post, passport, routes);
  },
};
