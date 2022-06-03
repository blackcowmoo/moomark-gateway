import { GraphQLSchema } from 'graphql';
import dev from './dev';
import auth from './auth';

export const directives = (schema: GraphQLSchema) =>
  Object.entries({
    dev,
    auth,
  }).reduce((_schema, [name, transformer]) => {
    return transformer(_schema, name);
  }, schema);
