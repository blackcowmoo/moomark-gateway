import { googleLogin } from '@/requests/auth';

export const Mutation = {
  login: async (_, { type, code, state }, { routes }) => {
    switch (type.toLowerCase()) {
      case 'google':
        return googleLogin(state, code, routes);
      // case 'github':
      //   return 'github: ' + code;
      default:
        return '';
    }
  },
};
