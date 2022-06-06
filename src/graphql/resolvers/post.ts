import { listPost, writePost } from '@/requests/post';

export const Post = {
  user: async ({ userId }) => {
    const [authProvider, id] = userId.split('@');
    return {
      authProvider,
      id,
    };
  },
};

export const Query = {
  posts: async (_, { offset, limit }, { routes }: GraphQLContext): Promise<Post> => {
    return listPost(offset, limit, routes);
  },
};

export const Mutation = {
  writePost: async (_, { post }: { post: PostInput }, { user, routes }: GraphQLContext): Promise<Post> => {
    return writePost(post, user, routes);
  },
};
