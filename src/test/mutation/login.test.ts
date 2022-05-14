import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { testCode } from '@/test/utils/user';

describe('GraphQL', () => {
  it('Login', async () => {
    const query = graphql`
      mutation Login($code: String!) {
        login(type: "Google", code: $code) {
          token
          refreshToken
          user {
            id
            name
            email
            nickname
            picture
            role
          }
        }
      }
    `;

    const { status, body } = await graphqlRequest(query, { variables: { code: testCode } });

    console.log(testCode);

    console.log(body);
    assert.equal(status, 200);
    // assert.equal(body.data.healthz, 'OK');
  });
});
