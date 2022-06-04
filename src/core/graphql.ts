import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from '@/graphql/types';
import { resolvers } from '@/graphql/resolvers';
import { directives } from '@/graphql/directives';
import { formatException } from '@/graphql/plugins/exception';
import { getUser } from '@/requests/auth';

import { IS_DEV, IS_TEST } from './config';

export default (headers?: any) =>
  new ApolloServer({
    schema: directives(makeExecutableSchema({ typeDefs, resolvers })),
    introspection: IS_DEV,
    plugins: [formatException, IS_DEV ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled()],
    context: async ({ req }): Promise<GraphQLContext> => {
      if (IS_TEST) {
        if (!req) {
          req = {} as any;
        }
        req.headers = Object.entries(headers || {})
          .map(([key, value]) => [key.toLowerCase(), value])
          .reduce((acc, [key, value]) => Object.assign(acc, { [key as string]: value }), {});
      }

      let routes = {};
      if (IS_DEV && req?.headers) {
        routes = Object.entries(req.headers)
          .filter(([key]) => key.startsWith('x-moom-route-'))
          .reduce((p, v) => Object.assign(p, { [v[0]]: v[1] }), {});
      }

      let user: User | null = null;
      if (req?.headers?.authorization) {
        // TODO cache (with redis)
        try {
          user = await getUser(req.headers.authorization, routes);
        } catch {
          user = null;
        }
      }

      return { routes, user, token: req?.headers?.authorization };
    },
  });
