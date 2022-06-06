import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { getMe, getTestToken, withdrawTestUser } from '@/test/utils/auth';

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
  });

  it('List post', async () => {
    const mutation = graphql`
      mutation Post($post: PostInput!) {
        writePost(post: $post) {
          id
          title
          content
          uploadTime
          recommendCount
          viewsCount
        }
      }
    `;

    const post = {
      title: 'TestPostTitle',
      content: 'TestPostContent',
    };

    const { data } = await graphqlRequest(mutation, { variables: { post }, headers: { Authorization: token } });

    assert.equal(data.writePost.title, post.title);
    assert.equal(data.writePost.content, post.content);
    assert.equal(data.writePost.viewsCount, 0);
    assert.equal(data.writePost.recommendCount, 0);

    const { id } = data.writePost;
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
    assert.equal(postData.title, post.title);
    assert.equal(postData.content, post.content);
    assert.equal(postData.viewsCount, 0);
    assert.equal(postData.recommendCount, 0);
  });

  after(async () => {
    await withdrawTestUser(token);
  });
});
