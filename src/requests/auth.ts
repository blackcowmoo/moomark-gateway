import { endpoints } from '@/core/config';
import { GraphQLException } from '@/core/exception';
import { PASSPORT_HEADER_KEY, PASSPORT_HEADER_USER } from '@/models/const';
import { parseUserId } from '@/utils/user';
import axios from 'axios';

const authAxios = axios.create({
  baseURL: endpoints.auth.endpoint,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

export const getUserById = async (userId: string, routes: Route): Promise<User | null> => {
  const { authProvider, id } = parseUserId(userId);
  const result = await authAxios.get(`/api/v1/user/${authProvider}/${id}`, { headers: routes }).catch((error) => {
    if (error.response && error.response.status === 404) {
      return { data: null };
    }

    throw error;
  });

  return result.data;
};

export const getPassport = async (token: string, routes: Route): Promise<Passport> => {
  const result = await authAxios.get('/api/v1/passport', {
    headers: { authorization: token, ...routes },
  });

  return result.data;
};

export const getUser = async (token: string, routes: Route): Promise<User> => {
  const result = await authAxios.get('/api/v1/user', {
    headers: { authorization: token, ...routes },
  });

  return result.data;
};

export const renewRefreshToken = async (refreshToken: string, routes: Route): Promise<LoginTokens> => {
  const result = await authAxios.post('/api/v1/oauth2/refresh', { refreshToken }, { headers: routes });
  if (result.status === 401) {
    throw new GraphQLException(401, 'Unauthorized');
  }

  return result.data;
};

export const updateUserInfo = async (passport: Passport, nickname: string, picture: string, routes: Route): Promise<User> => {
  const result = await authAxios.put(
    '/api/v1/user',
    { nickname, picture },
    { headers: { [PASSPORT_HEADER_USER]: passport.passport, [PASSPORT_HEADER_KEY]: passport.key, ...routes } },
  );
  if (result.status === 401) {
    throw new GraphQLException(401, 'Unauthorized');
  }

  return result.data;
};

export const withdrawUser = async (token: string, routes: Route): Promise<boolean> => {
  const result = await authAxios.delete('/api/v1/user', {
    headers: { authorization: token, ...routes },
  });

  return result.status === 200;
};

export const googleLogin = async (code: string, routes: Route): Promise<LoginTokens> => {
  const result = await authAxios.get('/api/v1/oauth2/google', {
    params: { code },
    headers: routes,
  });

  return result.data;
};
