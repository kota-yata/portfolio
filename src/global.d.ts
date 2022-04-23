/// <reference types="@sveltejs/kit" />

interface meta {
  title: string,
  date: string,
  category: string,
  description: string,
  ogp?: string
}

interface post {
  path: string
  meta: meta,
  body: string
};

interface postMeta {
  path: string,
  meta: meta
}

interface postsProps { props: { posts: postMeta[] } };

interface pages {
  html: string
}

interface localizedProps { JP: string, EN: string };
