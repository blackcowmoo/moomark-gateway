export const IS_DEV = process.env.DEPLOY_ENV === 'dev' || process.env.NODE_ENV === 'test';
export const IS_TEST = process.env.NODE_ENV === 'test';

export const endpoints: { [service: string]: Endpoint } = {
  auth: {
    endpoint: process.env.AUTH_SERVICE_HOST || 'http://localhost:8080',
    healthz: '/actuator/health',
  },
  post: {
    endpoint: process.env.POST_SERVICE_HOST || 'http://localhost:8080',
    healthz: '/health',
  },
};
