import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '@/graphql/types';
import { resolvers } from '@/graphql/resolvers';

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.deployEnv === 'dev',
  playground: process.env.deployEnv === 'dev',
});
