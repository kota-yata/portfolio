<script lang="ts">
export let location: string;
export let image: string;
export let date: string;
export let description: string;
</script>

<div class="container">
  <img alt="thumbnail" src={image} width="100%" />
  <h2>{location}</h2>
  <span class="date">{date}</span>
  <p>{description}</p>
</div>

<style lang="scss">
  @import '../../styles/variable.scss';

  .container {
    width: 45vw;
    padding: 10px 20px;
    img {
      aspect-ratio: 1.5;
      object-fit: cover;
      filter: contrast(0.9);
    }
    h2 {
      font-size: 1.5em;
      padding: 20px 0 8px 0;
    }
    .date {
      font-size: 0.8em;
      color: $gray;
      font-weight: 500;
    }
    p {
      font-size: 0.9em;
      padding-top: 10px;
      color: $light-gray;
      font-weight: 500;
      line-height: 1.5em;
    }
  }

  @media screen and (max-width: 1500px) {
    .container {
      h2 {
        font-size: 1.3em;
        padding: 15px 0 0 0;
      }
      .date { 
        font-size: 0.6em;
      }
      p {
        font-size: 0.7em;
      }
    }
  }

  @media screen and (max-width: 750px) {
    .container {
      width: calc(100vw - 20px);
      padding: 10px;
    }
  }
</style>
