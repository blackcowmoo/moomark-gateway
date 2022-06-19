import { endpoints } from '@/core/config';
import { buildUserId } from '@/utils/user';
import axios from 'axios';

const postAxios = axios.create({
  baseURL: endpoints.post.endpoint,
  maxRedirects: 0,
  headers: { Accept: 'application/json' },
});

export const getPost = async (id: number, routes: Route): Promise<Post> => {
  const { data } = await postAxios.get(`/api/v1/post/${id}`, { headers: routes });

  return data;
};

export const listPostsCount = async (routes: Route): Promise<number> => {
  const { data } = await postAxios.get('/api/v1/posts/count', { headers: routes });

  return data;
};

export const listPosts = async (offset: number, limit: number, routes: Route): Promise<Post[]> => {
  const { data } = await postAxios.get('/api/v1/posts', {
    params: { offset, limit },
    headers: routes,
  });

  return data;
};

export const writePost = async (post: PostInput, user: User, routes: Route): Promise<Post> => {
  const result = await postAxios.post(
    '/api/v1/post',
    { title: post.title, content: post.content },
    {
      headers: {
        'x-moom-user-id': buildUserId(user),
        ...routes,
      },
    },
  );

  return result.data;
};
