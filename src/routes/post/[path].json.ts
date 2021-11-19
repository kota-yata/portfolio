import fs from 'fs';
import { process } from '$lib/post/process';

export const get = ({ params }: { params: { path: string } }): { body: post } => {
  const { path } = params;
  const data = fs.readFileSync(`src/contents/post/${path}.md`, 'utf8');
  const post = process(data);
  return { body: post };
};
