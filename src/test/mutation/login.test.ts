import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { generateTestCode } from '@/test/utils/user';

describe('GraphQL', () => {
  let code = null;
  let token = null;

  before(() => {
    code = generateTestCode();
  });

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

    const { status, body } = await graphqlRequest(query, { variables: { code } });

    assert.equal(status, 200);
    assert.isNotEmpty(body.data.login.token);
    assert.isNotEmpty(body.data.login.refreshToken);
    assert.equal(body.data.login.user.id, `TEST@${code.split('-')[1]}`);
    assert.equal(body.data.login.user.name, 'test');
    assert.equal(body.data.login.user.email, 'test@blackcowmoo.com');
    assert.equal(body.data.login.user.nickname, 'test');
    assert.equal(body.data.login.user.picture, 'https://www.gravatar.com/avatar/HASH');
    assert.equal(body.data.login.user.role, 'USER');

    token = body.data.login.token;
  });

  after(async () => {
    const query = graphql`
      mutation {
        withdraw
      }
    `;

    const { status, body } = await graphqlRequest(query, { variables: { code }, headers: { Authorization: token } });

    assert.equal(status, 200);
    assert.isTrue(body.data.withdraw);
  });
});
