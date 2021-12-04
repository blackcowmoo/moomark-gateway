export const Mutation = {
  login: async (_, { type, code }) => {
    switch (type.toLowerCase()) {
      case 'google':
        return 'google: ' + code;
      case 'github':
        return 'github: ' + code;
      default:
        return '';
    }
  },
};
