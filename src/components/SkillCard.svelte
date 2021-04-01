<script>
  export let name;
  export let desc;
  export let order;

  if (order % 3 === 1) {
    order = 'odd';
  } else if (order % 3 === 2) {
    order = 'threen';
  }
</script>

<div class="container container-small skillcard {order}">
  <div class="container-title">{name}</div>
  <div class="container-desc">{desc}</div>
</div>

<style lang="scss">
  @import '../assets/definition.scss';
  .skillcard {
    width: 400px;
    padding: 20px 20px 30px 20px;
    margin: 10px;
  }
  .odd {
    background: $light-white;
    .container-title,
    .container-desc {
      color: $black;
    }
  }
  .threen {
    background: $light-black;
    .container-title {
      color: $white;
    }
  }

  @media screen and (max-width: 1300px) {
    .skillcard {
      width: 25vw;
    }
  }
  @media screen and (max-width: 800px) {
    .skillcard {
      width: 90vw;
      max-width: 400px;
    }
  }
</style>
