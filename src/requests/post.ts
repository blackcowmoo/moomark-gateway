import { endpoints } from '@/core/config';
import { buildUserId } from '@/utils/user';
import axios from 'axios';

const postAxios = axios.create({
  baseURL: endpoints.post.endpoint,
  maxRedirects: 0,
  headers: { Accept: 'application/json', 'X-MOOM-ROUTE-MOOMARK-POST': '12' },
});

export const writePost = async (post: PostInput, user: User, routes: Route): Promise<Post> => {
  const result = await postAxios.post(
    '/api/v1/post',
    {
      title: post.title,
      content: post.content,
    },
    {
      headers: {
        'x-moom-user-id': buildUserId(user),
        ...routes,
      },
    },
  );

  return result.data;
};
