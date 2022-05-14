import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';

describe('GraphQL', () => {
  it('Login', async () => {
    const query = graphql`
      mutation {
        login(type: "Google", code: "test") {
          token
          refreshToken
        }
      }
    `;

    const { status, body } = await graphqlRequest(query);

    console.log(body);
    assert.equal(status, 200);
    // assert.equal(body.data.healthz, 'OK');
  });
});
