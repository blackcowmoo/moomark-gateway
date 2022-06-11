import { graphqlRequest, graphql } from '@/test/utils/app';
import { getTestToken, withdrawTestUser } from './auth';

export const writePost = async (title: string, content: string, token?: string): Promise<Post> => {
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

  const requestToken = token || (await getTestToken());
  const { data } = await graphqlRequest(mutation, { variables: { post: { title, content } }, headers: { Authorization: requestToken } });
  if (!token) {
    await withdrawTestUser(requestToken);
  }

  return data.writePost;
};
