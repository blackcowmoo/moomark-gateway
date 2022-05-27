import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { generateTestCode } from '@/test/utils/user';

describe('GraphQL', () => {
  let code = null;
  let token = null;

  before(async () => {
    code = generateTestCode();

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

    const { data } = await graphqlRequest(query, { variables: { code } });

    assert.isNotEmpty(data.login.token);
    assert.isNotEmpty(data.login.refreshToken);
    assert.equal(data.login.user.id, `TEST@${code.split('-')[1]}`);
    assert.equal(data.login.user.name, 'test');
    assert.equal(data.login.user.email, 'test@blackcowmoo.com');
    assert.equal(data.login.user.nickname, 'test');
    assert.equal(data.login.user.picture, 'https://www.gravatar.com/avatar/HASH');
    assert.equal(data.login.user.role, 'USER');

    token = data.login.token;
  });

  it('Me', async () => {
    const query = graphql`
      {
        me {
          id
          name
          email
          nickname
          picture
          role
        }
      }
    `;

    const { data } = await graphqlRequest(query, { headers: { Authorization: token } });

    assert.equal(data.me.id, `TEST@${code.split('-')[1]}`);
    assert.equal(data.me.name, 'test');
    assert.equal(data.me.email, 'test@blackcowmoo.com');
    assert.equal(data.me.nickname, 'test');
    assert.equal(data.me.picture, 'https://www.gravatar.com/avatar/HASH');
    assert.equal(data.me.role, 'USER');
  });

  it('Me (no token)', async () => {
    const query = graphql`
      {
        me {
          id
          name
          email
          nickname
          picture
          role
        }
      }
    `;

    const { http } = await graphqlRequest(query);

    assert.equal(http.status, 401);
  });

  after(async () => {
    const query = graphql`
      mutation {
        withdraw
      }
    `;

    const { data } = await graphqlRequest(query, { headers: { Authorization: token } });

    assert.isTrue(data.withdraw);
  });
});
