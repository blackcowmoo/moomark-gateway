import { GraphQLException } from '@/core/exception';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export default (schema: GraphQLSchema, directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const authDirective = getDirective(schema, type, directiveName)?.[0];
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }
      return undefined;
    },

    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = (source, args, context, info) => {
          if (!context.user) {
            throw new GraphQLException(401, 'Unauthorized');
          }
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }

      return fieldConfig;
    },
  });
};
