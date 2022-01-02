import { endpoints } from '@/core/config';
import axios from 'axios';
import * as auth from './auth';

const rootQueryResolvers = {
  Query: {
    healthz: () => 'OK',
    servers: async () => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Invalid query');
      }

      const pings = await Promise.all(
        Object.entries(endpoints).map(async ([key, { endpoint, healthz }]) => {
          try {
            const result = await axios.get(endpoint + healthz);
            if (result.status >= 400) {
              throw new Error(`Error http status code: ${result.status}`);
            }

            return `${key}: OK`;
          } catch (err) {
            return `${key}: ${err}`;
          }
        }),
      );

      return pings.join('\n');
    },
  },
};

const rootMutationResolvers = {
  Mutation: {
    request: async (_, { method, service, url, body, headers, params }) => {
      if (process.env.DEPLOY_ENV !== 'dev') {
        return "Forbidden"
      }
      const result = await axios({
        method,
        baseURL: endpoints[service].endpoint,
        url,
        data: JSON.parse(body || "{}"),
        headers: Object.assign(JSON.parse(headers || "{}"), { "Content-Type": "application/json" }),
        params: JSON.parse(params || "{}")
      });

      return { headers: result.headers, status: result.status, data: result.data }
    }
  }
}

export const resolvers = [rootQueryResolvers, rootMutationResolvers, auth];
