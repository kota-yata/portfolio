<script>
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';

  export let imgPath;
  export let title;
  export let description;
</script>

<span class="skill-card">
  <div class="card">
    <div class="img_and_title">
      <img alt="icon" src={imgPath} />
      <span class="title">{title}</span>
      <br />
    </div>
    <div class="description">
      <span>{description}</span>
    </div>
    <br />
    <span class="works-in">
      <a href="https://github.com/search?q=user%3Akota-yata+{title}" target="blank">
        <Icon data={externalLink} class="external-link" />
        My works with {title}
      </a>
    </span>
  </div>
</span>

<style lang="scss">
  @import '../assets/definition.scss';

  .skill-card {
    display: inline-block;
    margin: 10px;
    .card {
      position: relative;
      width: 30em;
      height: 13em;
      padding: 0.5em;
      border-radius: 20px;
      background: $white;
      box-shadow: 5px 5px 7px $shadow-white1, -5px -5px 7px $shadow-white2;
      .img_and_title {
        display: flex;
        padding: 5px;
        img {
          margin: 10px;
          display: inline-block;
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
        .title {
          display: flex;
          align-items: center;
          padding-left: 2px;
          font-size: 2em;
          font-weight: 500;
        }
      }
      .description {
        height: 80px;
        overflow: scroll;
        margin-top: 5px;
        padding-left: 10px;
        text-align: left;
        word-wrap: break-word;
      }
      .works-in {
        position: absolute;
        bottom: 1em;
        right: 1em;
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 750px) {
    .skill-card {
      margin: 10px 0px;
      .card {
        width: 20em;
        height: 10em;
        .img_and_title {
          padding: 0px;
          img {
            margin: 5px;
            width: 45px;
            height: 45px;
          }
          .title {
            font-size: 1.7em;
          }
        }
        .description {
          margin-top: 2px;
          height: 80px;
        }
      }
    }
  }
</style>
