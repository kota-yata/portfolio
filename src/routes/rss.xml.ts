import { getPosts } from '../lib/posts/getPosts';

const xml = (posts: postMeta[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Kota Yatagai</title>
  <link>https://kota-yata.com</link>
  <description><![CDATA[Personal Blog & Stuffs by Kota Yatagai]]></description>
  ${posts.map(
    post => `
      <item>
        <title><![CDATA[${post.meta.title}]]></title>
        <description><![CDATA[${post.meta.description}]]></description>
        <category>${post.meta.category}</category>
        <link>https://kota-yata.com/posts/${post.path}</link>
        <guid isPermaLink="true">https://kota-yata.com/posts/${post.path}</guid>
        <pubDate><![CDATA[${post.meta.date}T00:00:00+09:00]]></pubDate>
        <enclosure url="${post.meta.ogp || `https://kota-yata.com/ogp.webp`}" length="0" type="image/webp"/>
        <dc:creator>Kota Yatagai</dc:creator>
      </item>
    `
  ).join('')}
</channel>
</rss>`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const get = async () => {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=600',
    'Content-Type': 'application/xml',
  };
  const posts = getPosts();
  const body = xml(posts);
  return { body, headers };
};
