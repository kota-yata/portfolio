<script context="module" lang="ts">
  export const load = async ({ fetch }): Promise<postsProps> => {
    const posts = await getPosts(fetch, 3);
    return { props: { posts } };
  };
</script>

<script lang="ts">
  import { getPosts } from "$lib/posts/getPosts";
  import Page from "$lib/page.svelte";
  import PostCard from "$lib/posts/postCard.svelte";
  import TopicSection from "$lib/topicSection.svelte";
  export let posts;

  const topics: { category: string, enName: string, description: string }[] = [
    {
      category: '研究',
      enName: 'Research',
      description: '現在僕はブロックチェーン、特にDHTについてリサーチをしています。高校の卒研も「分散型フリマの提案」なるテーマで研究をしており、ブロックチェーンやP2Pネットワーク、非中央集権型システムに関わる技術のリサーチ記事を研究カテゴリとしてまとめています。体系化する前段階のメモはScrapboxに置いてあります。'
    },
    {
      category: 'アルゴリズム',
      enName: 'Algorithm',
      description: '既存のアルゴリズム実装や自作のライブラリで使うアルゴリズムなどに関する記事はここにまとめています。ほとんどの記事内の実装はGItHubに上がってると思うので改善点や指摘がある場合はそっちでIssueを立ててもらえればなるはやで確認します。'
    },
    {
      category: '暗号',
      enName: 'Cryptography',
      description: '暗号学に関する記事はここにまとめています。暗号に関する記事でもアルゴリズムを実装しているものはアルゴリズムカテゴリーにあり、研究カテゴリーに置かれてる場合もがあります。'
    },
    {
      category: '計算機科学',
      enName: 'Computer Science',
      description: '上記のどのカテゴリーにも引っかからない計算機科学分野の記事はここにまとめています。プロセッサーやネットワークに関する記事がメインになる予定です。'
    },
    {
      category: '非技術',
      enName: 'Non-Tech',
      description: 'プログラミングやコンピューターサイエンスに直接関係のない記事はここにまとめています。哲学とかの話も体系化できるようになったら書いていきたいな。'
    }
  ]
</script>

<Page>
  <h2 class="slot-h2">Latest 3 Posts</h2>
  {#each posts as post}
  <div class="slot-post"><PostCard meta={post} /></div>
  {/each}
</Page>
<div class="to-posts"><a href="/posts">View All Posts</a></div>
{#each topics as topic}
<TopicSection category={topic.category} enName={topic.enName} description={topic.description} />
{/each}

<style lang="scss">
  @import '../styles/variable.scss';
  .slot-h2 {
    padding-top: 0;
  }
  .slot-post {
    margin-bottom: 40px;
  }
  .to-posts {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    & > a {
      padding: 15px 40px;
      border-radius: 500px;
      background: $white;
      color: $black;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
  }
</style>
