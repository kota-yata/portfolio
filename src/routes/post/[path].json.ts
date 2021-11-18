import fs from 'fs';
import { process } from '$lib/post/process';
import markdownToHTML from 'zenn-markdown-html';

export const get = async ({ params }: { params: { path: string } }): Promise<{ body: string }> => {
  const { path } = params;
  let post: post;
  fs.readFile(`src/contents/post/${path}.md`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
    if (err) throw err;
    post = {
      frontMatter: process(data),
      content: markdownToHTML(data)
    };
  });
  const body = JSON.stringify(post);
  return { body };
};
