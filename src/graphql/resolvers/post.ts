import { listPosts, writePost } from '@/requests/post';

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
  listPosts: async (_, { offset, limit }, { routes }: GraphQLContext): Promise<PostMetadata> => {
    return {
      total: 100,
      posts: await listPosts(offset, limit, routes),
    };
  },
};

export const Mutation = {
  writePost: async (_, { post }: { post: PostInput }, { user, routes }: GraphQLContext): Promise<Post> => {
    return writePost(post, user, routes);
  },
};
