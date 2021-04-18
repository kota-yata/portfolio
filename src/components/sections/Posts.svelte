<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  let articles = [];
  onMount(async () => {
    const response = await fetch('https://feed.kota-yata.com/api', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    const items = result.items;
    for (let i = 0; i < 6; i++) {
      const date = dayjs(items[i].date_published).format('YYYY-MM-DD');
      const url = items[i].id;
      let service = 'blog.kota-yata.com';
      if (url.includes('zenn.dev')) service = 'zenn.dev';
      if (url.includes('note.com')) service = 'note.com';
      const info = {
        title: items[i].title,
        date: date,
        url: url,
        service
      };
      articles = articles.concat(info);
    }
  });
</script>

<div class="posts">
  <div class="posts-title">Recent Posts</div>
  <div class="posts-contents container">
    {#each articles as { title, date, url, service }}
      <div class="posts-contents-article">
        <div class="posts-contents-article-title">{title}</div>
        <div class="posts-contents-article-info">
          <div class="posts-contents-article-info-date">{date}</div>
          <div class="posts-contents-article-info-link">
            <span class="posts-contents-article-info-link-service">{service}</span>
            <a href={url}><img alt="external link" src="../svg/link.svg" /></a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';
  .posts {
    width: 100%;
    padding-top: 30px;
    height: calc(100% - 30vh - 30px);
    &-title {
      @extend %center;

      font-size: 20px;
      color: $gray;
      font-weight: bold;
      height: 40px;
    }
    &-contents {
      height: calc(100% - 40px - 40px - 20px);
      padding: 20px;
      margin: 0 10px 10px 10px;
      overflow-y: scroll;
      &-article {
        background: $black;
        padding: 10px 10px 10px 15px;
        border-radius: 10px;
        font-family: $generic-fonts-jp;
        margin-bottom: 15px;
        &-title {
          font-size: 13px;
          padding: 5px 0 10px 0;
        }
        &-info {
          color: $gray;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 5px;
          &-date {
            font-size: 12px;
          }
          &-link {
            display: flex;
            &-service {
              font-size: 12px;
              margin-right: 10px;
            }
            a {
              display: flex;
              align-items: center;
              img {
                width: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>
