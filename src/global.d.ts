/// <reference types="@sveltejs/kit" />
interface thumbnails {
  location: string,
  short: string,
  date: string,
  description: string,
  image: number
};

interface post {
  frontMatter: FrontMatterResult<unknown>,
  content: string
};
