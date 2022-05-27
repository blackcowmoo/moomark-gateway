import { GraphQLContext } from '@/core/graphql';
import { getUser, googleLogin, renewRefreshToken, User as UserType, withdrawUser } from '@/requests/auth';

interface LoginInput {
  token: string;
  refreshToken: string;
}

export const Query = {
  me: async (_, __, { user }: GraphQLContext): Promise<UserType> => {
    return user;
  },
};

export const Login = {
  user: async ({ token }: LoginInput, __, { routes }: GraphQLContext): Promise<UserType> => {
    return getUser(token, routes);
  },
};

export const User = {
  id: ({ id, authProvider }): string => {
    return `${authProvider}@${id}`;
  },
};

export const Mutation = {
  login: async (_, { type, code }, { routes }: GraphQLContext): Promise<LoginInput> => {
    const lowerType = type.toLowerCase();
    if (lowerType === 'google') {
      return googleLogin(code, routes);
    }

    return null;
  },

  refreshToken: async (_, { refreshToken }, { routes }: GraphQLContext): Promise<LoginInput> => {
    const { token, refreshToken: newRefreshToken } = await renewRefreshToken(refreshToken, routes);

    return {
      token,
      refreshToken: newRefreshToken,
    };
  },

  withdraw: async (_, __, { routes, user, token }: GraphQLContext): Promise<boolean> => {
    if (user) {
      return withdrawUser(token, routes);
    }

    return false;
  },
};
