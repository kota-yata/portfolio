<script>
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';

  export let imgPath;
  export let title;
  export let description;
  export let url;
  export let urlMessage;
</script>

<div class="media-card">
  <span> <img class="media-img lazyload" alt="img" data-src={imgPath} /> </span>
  <span class="media-sentences">
    <span class="media-title">{title}<br /></span>
    <span class="media-description">{description}</span>
    <span class="media-url">
      <a href={url} target="blank">
        <Icon data={externalLink} class="external-link" />
        {urlMessage}
      </a>
    </span>
  </span>
</div>

<style lang="scss">
  @import '../assets/definition.scss';

  .media-card {
    @extend %center;
    display: flex;
    // flex: 0 0 auto;
    border-radius: 20px;
    width: 600px;
    height: 250px;
    background: $white;
    box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
    .media-sentences {
      text-align: left;
      position: relative;
      padding: 1em;
      .media-title {
        font-size: 30px;
        font-weight: 500;
      }
      .media-description {
        display: inline-block;
        word-wrap: break-word;
        padding-top: 10px;
      }
      .media-url {
        position: absolute;
        bottom: 0.5em;
        right: 0.5em;
        font-size: 15px;
      }
    }
    .media-img {
      display: inline-block;
      margin: 0 auto;
      width: 250px;
    }
  }

  @media screen and (max-width: 750px) {
    .media-card {
      width: 75vw;
      height: 40vh;
      padding: 10px;
      display: block;
      .media-sentences {
        display: block;
        padding: 0.5em;
        height: calc(40vh - 75vw / 3 - 1em);
        .media-title {
          font-size: 20px;
        }
        .media-description {
          font-size: 15px;
          padding-top: 5px;
        }
        .media-url {
          font-size: 10px;
        }
      }
      .media-img {
        display: block;
        width: 75vw;
        height: calc(75vw / 3);
        object-fit: cover;
      }
    }
  }
</style>
