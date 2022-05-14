import { GraphQLContext } from '@/core/graphql';
import { getUser, googleLogin } from '@/requests/auth';

export const Query = {
  user: async (_, __, { user }: GraphQLContext) => {
    return user;
  },
};

export const Mutation = {
  login: async (_, { type, code }, { routes }: GraphQLContext) => {
    const lowerType = type.toLowerCase();
    if (lowerType === 'google') {
      const { token, refreshToken } = await googleLogin(code, routes);
      const user = await getUser(token, routes);

      return {
        token,
        refreshToken,
        user,
      };
    }

    return null;
  },
};
