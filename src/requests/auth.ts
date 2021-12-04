import { endpoints } from '@/core/config';
import axios from 'axios';

const authServerHost = endpoints.auth.endpoint;
const authAxios = axios.create({
  baseURL: authServerHost,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

const generateSession = async () => {
  const result = await authAxios.get('/login/session', {
    validateStatus: (status) => status === 302,
  });

  console.log(JSON.stringify(result));
  return result;
};

export const googleLogin = async (code) => {
  await generateSession();
  const result = await authAxios.get('/login/oauth2/code/google', {
    params: {
      code,
      scope: 'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
      authuser: 0,
      prompt: 'consent',
    },
    // headers: {
    //   Cookie: generateSession(),
    // },
  });

  console.log(JSON.stringify(result));
  return result;
};
