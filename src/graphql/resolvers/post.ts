import { writePost } from '@/requests/post';

export const Mutation = {
  writePost: async (_, { post }: { post: PostInput }, { user, routes }: GraphQLContext): Promise<Post> => {
    return writePost(post, user, routes);
  },
};
