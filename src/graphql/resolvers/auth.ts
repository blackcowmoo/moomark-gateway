import { googleLogin } from '@/requests/auth';

export const Mutation = {
  login: async (_, { type, code }, { routes }) => {
    switch (type.toLowerCase()) {
      case 'google':
        return googleLogin(code, routes);
      // case 'github':
      //   return 'github: ' + code;
      default:
        return '';
    }
  },
};
