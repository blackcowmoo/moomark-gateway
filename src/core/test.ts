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

    console.log(result);

    res.status(result.status).header(result.headers).json(result.data.toString('utf8'));
  } else {
    res.status(200).send('');
  }
};
