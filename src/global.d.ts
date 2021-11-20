/// <reference types="@sveltejs/kit" />
interface thumbnails {
  location: string,
  short: string,
  date: string,
  description: string,
  image: number
};

interface post {
  meta: FrontMatterResult<unknown>,
  body: string
};

interface meta {
  title: string,
  date: string,
  category: string,
  description: string,
  ogp?: string
}

interface postMeta {
  path: string,
  meta: meta
}

interface postsProps { props: { posts: postMeta[] } };

interface pages {
  html: string
}
