import { GraphQLContext } from '@/core/graphql';
import { getUser, googleLogin, User as UserType, withdrawUser } from '@/requests/auth';

export const Query = {
  user: async (_, __, { user }: GraphQLContext): Promise<UserType> => {
    return user;
  },
};

export const User = {
  id: ({ id, authProvider }): string => {
    return `${authProvider}@${id}`;
  },
};

export const Mutation = {
  login: async (_, { type, code }, { routes }: GraphQLContext): Promise<{ token: string; refreshToken: string; user: UserType }> => {
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

  withdraw: async (_, __, { routes, user, token }: GraphQLContext): Promise<boolean> => {
    if (user) {
      return withdrawUser(token, routes);
    }

    return false;
  },
};
