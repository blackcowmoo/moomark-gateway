import { endpoints } from '@/core/config';
import { buildUserId } from '@/utils/user';
import axios from 'axios';

const postAxios = axios.create({
  baseURL: endpoints.post.endpoint,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

export const writePost = async (post: PostInput, user: User, routes: Route): Promise<Post> => {
  const result = await postAxios.post(
    '/post',
    {
      postDto: {
        ...post,
        userId: buildUserId(user),
      },
    },
    {
      headers: { ...routes },
    },
  );

  return result.data;
};
