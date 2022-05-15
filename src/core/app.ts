import express from 'express';
import graphqlServer from './graphql';
import { testRequest } from './test';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// For kubernetes
app.get('/healthz', (req, res) => {
  res.send('OK');
});

app.use('/test/**', testRequest);

graphqlServer.applyMiddleware({ app, path: '/graphql' });

export default app;
