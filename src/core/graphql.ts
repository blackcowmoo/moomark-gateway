import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '@/graphql/types';
import { resolvers } from '@/graphql/resolvers';
import { getUser, User } from '@/requests/auth';

import { IS_DEV } from './config';

export interface Route {
  [KEY: string]: string;
}

export interface GraphQLContext {
  routes: Route;
  user?: User;
}

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: IS_DEV,
  playground: IS_DEV,
  context: async ({ req }) => {
    let routes = {};
    if (IS_DEV) {
      routes = Object.entries(req.headers)
        .filter(([key]) => key.startsWith('x-moom-route-'))
        .reduce((p, v) => Object.assign(p, { [v[0]]: v[1] }), {});
    }

    let user: User | null = null;
    if (req.headers.authorization) {
      // TODO cache (with redis)
      try {
        user = await getUser(req.headers.authorization, routes);
      } catch {
        user = null;
      }
    }

    return { routes, user };
  },
});
