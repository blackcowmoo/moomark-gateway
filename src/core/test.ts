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
    const headers = omit(req.headers, 'host');
    const result = await axios({
      method: req.method as Method,
      baseURL: endpoints[service].endpoint,
      url: url.join('/'),
      data: req.body || {},
      headers: headers || {},
      params: req.query || {},
    }).catch((err) => {
      return {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
        headers: err.response?.headers || {},
      };
    });

    res.status(result.status).header(result.headers).send(result.data);
  } else {
    res.status(200).send('');
  }
};
