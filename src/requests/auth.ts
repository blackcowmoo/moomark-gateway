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

export const googleLogin = async (state: string, code: string, routes: { [KEY: string]: string }) => {
  const result = await authAxios.get('/login/oauth2/code/google', {
    params: {
      code,
      scope: 'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    },
    headers: routes,
    // headers: {
    //   Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // },
    // validateStatus: (status) => status === 302,
  });

  // console.log(JSON.stringify(result.headers));
  // return parseSession(result.data);
  console.log(JSON.stringify(result.data));
  return result.data;
};
