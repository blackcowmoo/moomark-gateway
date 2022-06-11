import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { getMe, getTestToken, withdrawTestUser } from '@/test/utils/auth';
import { writePost } from '@/test/utils/post';
import { WITHDRAWN_USER_ROLE, WITHDRAWN_USER_TEXT } from '@/models/const';

describe('Post', () => {
  let token = null;

  before(async () => {
    token = await getTestToken();
  });

  it('Write post', async () => {
    const mutation = graphql`
      mutation Post($post: PostInput!) {
        writePost(post: $post) {
          id
          title
          content
          uploadTime
          recommendCount
          viewsCount
          user {
            id
            nickname
            email
            picture
            role
          }
        }
      }
    `;

    const post = {
      title: 'TestPostTitle',
      content: 'TestPostContent',
    };

    const { errors, data } = await graphqlRequest(mutation, { variables: { post }, headers: { Authorization: token } });

    assert.equal(errors, null);
    assert.equal(data.writePost.title, post.title);
    assert.equal(data.writePost.content, post.content);
    assert.equal(data.writePost.viewsCount, 0);
    assert.equal(data.writePost.recommendCount, 0);

    const me = await getMe(token);
    assert.equal(data.writePost.user.id, me.id);
    assert.equal(data.writePost.user.nickname, me.nickname);
    assert.equal(data.writePost.user.email, me.email);
    assert.equal(data.writePost.user.picture, me.picture);
    assert.equal(data.writePost.user.role, me.role);
  });

  it('List post', async () => {
    const postTitle = 'TestPostTitle';
    const postContent = 'TestPostContent';
    const writePostData = await writePost(postTitle, postContent, token);

    assert.equal(writePostData.title, postTitle);
    assert.equal(writePostData.content, postContent);
    assert.equal(writePostData.viewsCount, 0);
    assert.equal(writePostData.recommendCount, 0);

    const { id } = writePostData;
    const query = graphql`
      query posts($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          id
          title
          content
          uploadTime
          recommendCount
          viewsCount
        }
      }
    `;

    const { data: queryData } = await graphqlRequest(query, { variables: { offset: id + 1, limit: 1 } });
    assert.equal(queryData.posts.length, 1);

    const postData = queryData.posts[0];

    assert.equal(postData.id, id);
    assert.equal(postData.title, postTitle);
    assert.equal(postData.content, postContent);
    assert.equal(postData.viewsCount, 0);
    assert.equal(postData.recommendCount, 0);
  });

  it('List post (withdraw user)', async () => {
    const postTitle = 'TestPostTitle';
    const postContent = 'TestPostContent';
    const writePostData = await writePost(postTitle, postContent);

    assert.equal(writePostData.title, postTitle);
    assert.equal(writePostData.content, postContent);
    assert.equal(writePostData.viewsCount, 0);
    assert.equal(writePostData.recommendCount, 0);

    const { id } = writePostData;
    const query = graphql`
      query posts($offset: Int, $limit: Int) {
        posts(offset: $offset, limit: $limit) {
          user {
            id
            nickname
            email
            picture
            role
          }
        }
      }
    `;

    const { data: queryData } = await graphqlRequest(query, { variables: { offset: id + 1, limit: 1 } });
    assert.equal(queryData.posts.length, 1);

    const postData = queryData.posts[0];

    assert.equal(postData.user.nickname, WITHDRAWN_USER_TEXT);
    assert.equal(postData.user.email, WITHDRAWN_USER_TEXT);
    assert.equal(postData.user.picture, WITHDRAWN_USER_TEXT);
    assert.equal(postData.user.role, WITHDRAWN_USER_ROLE);
  });

  after(async () => {
    await withdrawTestUser(token);
  });
});
