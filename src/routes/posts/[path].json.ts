import fs from 'fs';
import { process } from '$lib/posts/process';

export const get = ({ params }: { params: { path: string } }): { body: post } => {
  const { path } = params;
  const data = fs.readFileSync(`src/contents/posts/${path}.md`, 'utf8');
  const post = process(data);
  return { body: post };
};
