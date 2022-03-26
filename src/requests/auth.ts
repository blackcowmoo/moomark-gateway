import { endpoints } from '@/core/config';
import axios from 'axios';

const authServerHost = endpoints.auth.endpoint;
const authAxios = axios.create({
  baseURL: authServerHost,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

// const generateSession = async () => {
//   const result = await authAxios.get('/login/session', {
//     headers: { Accept: '*/*' },
//     validateStatus: (status) => status === 302,
//     withCredentials: true,
//   });

//   const [session] = result.headers['set-cookie'];
//   return session.split(';')[0];
// };

// const parseSession = (cookie: string) => {
//   return cookie.split(';')[0].split('=')[1];
// };

export const googleLogin = async (code: string, routes: { [KEY: string]: string }) => {
  const result = await authAxios.get('/api/v1/oauth2/google', {
    params: { code },
    headers: routes,
  });

  return JSON.parse(result.data);
};
