import express from 'express';
import createGraphqlServer from './graphql';
import { testRequest } from './test';

export default async () => {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  // For kubernetes
  app.get('/healthz', (req, res) => {
    res.send('OK');
  });

  app.use('/test/**', testRequest);
  const graphqlServer = createGraphqlServer();
  await graphqlServer.start();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });

  return app;
};
