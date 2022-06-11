import { getUser, getUserById, googleLogin, renewRefreshToken, withdrawUser } from '@/requests/auth';
import { buildUserId, userEqual } from '@/utils/user';

export const Query = {
  me: async (_, __, { user }: GraphQLContext): Promise<User> => {
    return user;
  },
};

export const Login = {
  user: async ({ token }: LoginInput, __, { routes }: GraphQLContext): Promise<User> => {
    return getUser(token, routes);
  },
};

const fetchUser = async <K extends keyof User>(user: UserPartial, userContext: User, key: K, routes?: Route): Promise<User[K]> => {
  if (user[key] !== undefined) {
    return user[key];
  }

  if (userEqual(user, userContext)) {
    return userContext[key];
  }

  return (await getUserById(buildUserId(user), routes || {}))[key];
};

export const User = {
  id: (user: UserPartial): string => {
    return buildUserId(user);
  },
  email: async (user: UserPartial, _, { user: userContext, routes }: GraphQLContext): Promise<string> => {
    return fetchUser(user, userContext, 'email', routes);
  },
  nickname: async (user: UserPartial, _, { user: userContext, routes }: GraphQLContext): Promise<string> => {
    return fetchUser(user, userContext, 'nickname', routes);
  },
  picture: async (user: UserPartial, _, { user: userContext, routes }: GraphQLContext): Promise<string> => {
    return fetchUser(user, userContext, 'picture', routes);
  },
  role: async (user: UserPartial, _, { user: userContext, routes }: GraphQLContext): Promise<string> => {
    return fetchUser(user, userContext, 'role', routes);
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
