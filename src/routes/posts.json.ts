import { getMeta } from '$lib/posts/process';
import fs from 'fs';

const retrieveMetaFromMarkdown = (fileName: string) => {
  const path = fileName.split('.')[0];
  return {
    path: path,
    meta: getMeta(fs.readFileSync(`src/contents/posts/${fileName}`).toString())
  };
};

export const get = (): { body: postMeta[] } => {
  const posts = fs.readdirSync('src/contents/posts').map(retrieveMetaFromMarkdown);
  posts.sort((a: postMeta, b: postMeta): number => {
    const aDate = Date.parse(a.meta.date);
    const bDate = Date.parse(b.meta.date);
    return aDate > bDate ? -1 : 1;
  });
  return { body: posts };
};
