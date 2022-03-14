import fs from 'fs';
import { separateData, formatMeta } from '$lib/posts/process';

const filterPosts = (posts: postMeta[], num = 0, category = ''): postMeta[] => {
  let postsToReturn = posts;
  if (num > 0) postsToReturn = posts.slice(0, num);
  if (category) postsToReturn = postsToReturn.filter((post) => post.meta.category === category);
  return postsToReturn;
};

// Getting posts during build
const getMeta = (data: string): meta => {
  const separatedData = separateData(data);
  const meta = formatMeta(separatedData.meta);
  return meta;
};

const retrieveMetaFromMarkdown = (fileName: string): { path: string, meta: meta } => {
  const path = fileName.split('.')[0];
  return {
    path: path,
    meta: getMeta(fs.readFileSync(`src/contents/posts/${fileName}`).toString())
  };
};

export const getPosts = (num = 0, category = ''): postMeta[] => {
  const posts = fs.readdirSync('src/contents/posts').map(retrieveMetaFromMarkdown);
  posts.sort((a: postMeta, b: postMeta): number => {
    const aDate = Date.parse(a.meta.date);
    const bDate = Date.parse(b.meta.date);
    return aDate > bDate ? -1 : 1;
  });
  const result = filterPosts(posts);
  return result;
};

// Getting posts with given filters from client
// Simply fetching /posts.json since it should be already generated
export const getPostsClient = async (doFetch: (arg0: string) => Promise<Response>, num = 0, category = ''): Promise<postMeta[]> => {
  const url = '/posts.json';
  const res = await doFetch(url);
  if (!res.ok) return;
  const posts: postMeta[] = await res.json();
  if (num > posts.length) throw Error('arg2 must be smaller than the length of posts');
  const filtered = filterPosts(posts, num, category);
  return filtered;
};
