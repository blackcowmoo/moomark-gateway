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

    assert.equal(status, 200);
    assert.isNotEmpty(body.data.login.token);
    assert.isNotEmpty(body.data.login.refreshToken);
    assert.equal(body.data.login.user.id, `TEST@${testCode.split('-')[1]}`);
    assert.equal(body.data.login.user.name, 'test');
    assert.equal(body.data.login.user.email, 'test@blackcowmoo.com');
    assert.equal(body.data.login.user.nickname, 'test');
    assert.equal(body.data.login.user.picture, 'https://www.gravatar.com/avatar/HASH');
    assert.equal(body.data.login.user.role, 'USER');
  });
});
