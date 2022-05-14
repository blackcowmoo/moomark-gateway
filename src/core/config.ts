interface EndpointOption {
  host: string;
  port: number;
  path?: string;
  protocol?: string;
}
const buildEndpoint = ({ host, port, protocol }: EndpointOption) => `${protocol || 'http'}://${host}:${port}`;

interface Endpoint {
  endpoint: string;
  healthz: string;
}

export const IS_DEV = process.env.DEPLOY_ENV === 'dev' || process.env.NODE_ENV === 'test';
export const IS_TEST = process.env.NODE_ENV === 'test';

export const endpoints: { [service: string]: Endpoint } = {
  auth: {
    endpoint: buildEndpoint({ host: process.env.AUTH_SERVICE_HOST || 'localhost', port: parseInt(process.env.AUTH_SERVICE_PORT || (8080).toString(), 10) }),
    healthz: '/actuator/health',
  },
};
