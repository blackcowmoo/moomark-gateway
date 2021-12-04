import { googleLogin } from '@/requests/auth';

export const Mutation = {
  login: async (_, { type, code }) => {
    switch (type.toLowerCase()) {
      case 'google':
        return googleLogin(code);
      case 'github':
        return 'github: ' + code;
      default:
        return '';
    }
  },
};
