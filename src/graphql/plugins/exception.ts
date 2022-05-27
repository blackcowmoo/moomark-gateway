import { PluginDefinition } from 'apollo-server-core';

export const formatException: PluginDefinition = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        if (response.errors) {
          for (const error of response.errors) {
            if (error?.extensions?.exception?.statusCode > 0) {
              delete response.errors;
              response.http.status = error.extensions.exception.statusCode;
            }
          }
        }
      },
    };
  },
};
