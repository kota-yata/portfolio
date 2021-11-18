import frontMatter from 'front-matter';
import fs from 'fs';

const retrieveMetaFromMarkdown = (fileName: string) => {
  const path = fileName.split('.')[0];
  const content = fs.readFileSync(fileName).toString();
  console.log('content', content);
  const meta = frontMatter(content);
  return { path, meta };
};

export const get = () => {
  const posts = fs.readdirSync('contents/post').map(retrieveMetaFromMarkdown);
  return posts;
};
