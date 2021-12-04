import { generateSession } from '@/core/session';
import { endpoints } from '@/core/config';
import axios from 'axios';

const authServerHost = endpoints.auth.endpoint;

export const googleLogin = async (code) => {
    const result = await axios.get(`${authServerHost}/login/oauth2/code/google`, {
        params: {
            code,
            scope: 'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
            authuser: 0,
            prompt: 'consent'
        },
        headers: {
            Cookie: generateSession()
        }
    });

    console.log(JSON.stringify(result));
    return result;
}
