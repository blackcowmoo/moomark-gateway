import { GraphQLSchema } from 'graphql';
import auth from './auth';

export const directives = (schema: GraphQLSchema) =>
  Object.entries({
    auth,
  }).reduce((_schema, [name, transformer]) => {
    return transformer(_schema, name);
  }, schema);
