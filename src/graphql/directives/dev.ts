import { IS_DEV } from '@/core/config';
import { GraphQLException } from '@/core/exception';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export default (schema: GraphQLSchema, directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const devDirective = getDirective(schema, type, directiveName)?.[0];
      if (devDirective) {
        typeDirectiveArgumentMaps[type.name] = devDirective;
      }
      return undefined;
    },

    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = (source, args, context, info) => {
          if (!IS_DEV) {
            throw new GraphQLException(403, 'Forbidden');
          }
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }

      return fieldConfig;
    },
  });
};
