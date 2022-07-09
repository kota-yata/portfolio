import { getPosts } from '../lib/posts/getPosts';

const xml = (posts: postMeta[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Kota Yatagai</title>
  <link>https://kota-yata.com</link>
  <description><![CDATA[Personal Blog & Stuffs by Kota Yatagai]]></description>
  ${posts.map(
    post => {
      // Date format adaptation for sugokunaritai-gakusei-group/sgg-feed
      const dateSplitted: number[] = post.meta.date.split('-').map((s) => parseInt(s));
      const date = new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2], 0, 0, 0, 0);
      return `
        <item>
          <title><![CDATA[${post.meta.title}]]></title>
          <description><![CDATA[${post.meta.description}]]></description>
          <category>${post.meta.category}</category>
          <author>kota-yata</author>
          <link>https://kota-yata.com/posts/${post.path}</link>
          <guid isPermaLink="true">https://kota-yata.com/posts/${post.path}</guid>
          <pubDate><![CDATA[${date.toUTCString()}]]></pubDate>
          <enclosure url="${`https://kota-yata.com/media/optimized/${post.meta.ogp}.webp` || `https://kota-yata.com/ogp.webp`}" length="0" type="image/webp"/>
          <dc:creator>Kota Yatagai</dc:creator>
        </item>
      `;
    }
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
