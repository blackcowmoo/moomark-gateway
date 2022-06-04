// import { assert } from 'chai';
import { graphqlRequest, graphql } from '@/test/utils/app';
import { getTestToken, withdrawTestUser } from '@/test/utils/auth';

describe('Post', () => {
  let token = null;

  before(async () => {
    token = await getTestToken();
  });

  it('Write post', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mutation = graphql`
      mutation Post($post: PostInput!) {
        writePost(post: $post) {
          id
          userId
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

    const { errors, data } = await graphqlRequest(mutation, { variables: { post }, headers: { Authorization: token } });

    console.log(data);
    console.log(errors);
  });

  after(async () => {
    await withdrawTestUser(token);
  });
});
