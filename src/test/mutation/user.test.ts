import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { getMe, getTestToken, withdrawTestUser } from '@/test/utils/auth';

describe('User', () => {
  let token = null;

  before(async () => {
    token = await getTestToken();
  });

  it('Update user information', async () => {
    const beforeUser = await getMe(token);

    const mutation = graphql`
      mutation user($nickname: String, $picture: String) {
        updateUserInfo(nickname: $nickname, picture: $picture) {
          id
          nickname
          picture
        }
      }
    `;

    const {
      data: { updateUserInfo: nullUpdateUser },
    } = await graphqlRequest(mutation, { headers: { Authorization: token } });

    assert.equal(nullUpdateUser.id, beforeUser.id);
    assert.equal(nullUpdateUser.nickname, beforeUser.nickname);
    assert.equal(nullUpdateUser.picture, beforeUser.picture);

    const {
      data: { updateUserInfo: emptyUpdateUser },
    } = await graphqlRequest(mutation, { variables: { nickname: '', picture: '' }, headers: { Authorization: token } });

    assert.equal(emptyUpdateUser.id, beforeUser.id);
    assert.equal(emptyUpdateUser.nickname, beforeUser.nickname);
    assert.notEqual(emptyUpdateUser.picture, beforeUser.picture); // default image

    const nickname = 'updatedNickname';
    const picture = 'https://i.pravatar.cc/300';

    const {
      data: { updateUserInfo: updateUser },
    } = await graphqlRequest(mutation, { variables: { nickname, picture }, headers: { Authorization: token } });

    assert.equal(updateUser.id, beforeUser.id);
    assert.equal(updateUser.nickname, nickname);
    assert.equal(updateUser.picture, picture);
  });

  after(async () => {
    await withdrawTestUser(token);
  });
});
