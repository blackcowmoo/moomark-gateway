import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '@/graphql/types';
import { resolvers } from '@/graphql/resolvers';

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.DEPLOY_ENV === 'dev',
  playground: process.env.DEPLOY_ENV === 'dev',
  context: ({ req }) => {
    let routes = {}
    if (process.env.DEPLOY_ENV === 'dev') {
      routes = Object.entries(req.headers)
        .map(([key, value]) => [key.toUpperCase(), value])
        .filter(([key, value]) => key.startsWith('X-MOOM-ROUTE-'))
        .reduce(object, (p, v) => Object.assign(p, { [v[0]]: v[1] }, {}));
    }

    return { routes };
  },
});
