import { endpoints } from '@/core/config';
import axios from 'axios';

const authServerHost = endpoints.auth.endpoint;
const authAxios = axios.create({
  baseURL: authServerHost,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

export const googleLogin = async (state: string, code: string) => {
  const result = await authAxios.post('/api/v1/login/google', { token: code });

  console.log(JSON.stringify(result.headers));
  console.log(JSON.stringify(result.data));
  return parseSession(session);
};
