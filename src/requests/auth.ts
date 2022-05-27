import { endpoints } from '@/core/config';
import { GraphQLException } from '@/core/exception';
import { Route } from '@/core/graphql';
import axios from 'axios';

interface LoginTokens {
  token: string;
  refreshToken: string;
}

export interface User {
  authProvider: string;
  id: string;
  name: string;
  email: string;
  nickname: string;
  picture: string;
  role: string;
}

const authServerHost = endpoints.auth.endpoint;
const authAxios = axios.create({
  baseURL: authServerHost,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

export const getUser = async (token: string, routes): Promise<User> => {
  const result = await authAxios.get('/api/v1/user', {
    headers: { authorization: token, ...routes },
  });

  return result.data;
};

export const renewRefreshToken = async (refreshToken: string, routes): Promise<LoginTokens> => {
  const result = await authAxios.post('/api/v1/oauth2/refresh', { refreshToken }, { headers: routes });
  if (result.status === 401) {
    throw new GraphQLException(401, 'Unauthorized');
  }

  return result.data;
};

export const withdrawUser = async (token: string, routes): Promise<boolean> => {
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
