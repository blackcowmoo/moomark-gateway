import { googleLogin } from '@/requests/auth';

export const Mutation = {
  login: async (_, { type, code, state }) => {
    switch (type.toLowerCase()) {
      case 'google':
        return googleLogin(state, code);
      // case 'github':
      //   return 'github: ' + code;
      default:
        return '';
    }
  },
};
