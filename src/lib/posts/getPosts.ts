export const getPosts = async (doFetch: (arg0: string) => Promise<Response>, num = 0, category = ''): Promise<postMeta[]> => {
  const url = '/posts.json';
  const res = await doFetch(url);
  if (!res.ok) return;
  const posts: postMeta[] = await res.json();
  if (num > posts.length) throw Error('arg2 must be smaller than the length of posts');
  let postsToReturn = posts;
  if (num > 0) postsToReturn = posts.slice(0, num);
  if (category) postsToReturn = postsToReturn.filter((post) => post.meta.category === category);
  return postsToReturn;
};
