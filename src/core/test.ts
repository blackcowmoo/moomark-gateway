import axios, { Method } from 'axios';

import { RequestHandler } from 'express';
import { endpoints, IS_DEV } from './config';
import { omit } from './utils';

export const testRequest: RequestHandler = async (req, res) => {
  if (!IS_DEV) {
    res.status(403).send('Forbidden');
    return;
  }

  const [service, ...url] = req.params[0].split('/');

  if (Object.keys(endpoints).includes(service)) {
    const headers = omit(req.headers, 'host', 'x-forward-proto');

    const { origin, pathname } = new URL(endpoints[service].endpoint);
    console.log(endpoints[service].endpoint, origin, pathname);
    const result = await axios({
      method: req.method as Method,
      baseURL: origin,
      url: `${pathname}/${url.join('/')}`.replace(/[\\/]+/g, '/'),
      data: req.body || {},
      headers: headers || {},
      params: req.query || {},
    }).catch((err) => {
      console.error(err.response);
      return {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
        headers: err.response?.headers || {},
      };
    });

    Object.entries(result.headers).forEach(([key, value]) => {
      if (value && !['host', 'connection', 'transfer-encoding', 'x-envoy-upstream-service-time', 'server'].includes(key)) {
        console.log('header', key, value);
        res.setHeader(key, value as string);
      }
    });

    if (result.headers['content-type'] === 'application/json') {
      res.status(result.status).json(result.data);
    } else {
      res.status(result.status).send(result.data);
    }
  } else {
    res.status(200).send('');
  }
};
