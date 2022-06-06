import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';

describe('GraphQL', () => {
  it('Run', async () => {
    const query = graphql`
      query {
        healthz
      }
    `;

    const { data } = await graphqlRequest(query);

    assert.equal(data.healthz, 'OK');
  });
});
