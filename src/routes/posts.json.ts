import { getPosts } from '$lib/posts/getPosts';

export const get = (): { body: postMeta[] } => {
  const body = getPosts();
  return { body };
};
