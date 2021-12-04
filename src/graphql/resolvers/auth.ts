export const Mutation = {
  login: async (_, { type, code }) => {
    return `login: ${type}, ${code}`;
  },
};
