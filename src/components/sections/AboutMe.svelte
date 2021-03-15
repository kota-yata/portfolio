<script>
  const aboutDataList = [
    {
      title: 'Hobby',
      sentence: 'Cycling, Listening to US HipHop, Over sleeping'
    },
    {
      title: 'Special Skill',
      sentence: 'Playing non-existent song with the piano'
    },
    {
      title: 'Tab or Space',
      sentence: 'Space while feeling sorry for tabs'
    }
  ];
</script>

<div class="about">
  <div class="about-image scroll-reveal-slide-left">
    <div class="about-image-inner">
      <img alt="me putting in eye drops" src="../img/eyedrop.webp" />
      <div class="about-image-inner-caption">Me putting in eye drops</div>
    </div>
  </div>
  <div class="about-desc scroll-reveal">
    <div class="about-desc-title">
      <h2>About Me</h2>
    </div>
    <div class="about-desc-sentence">
      <span>
        Hi there 👋
        <br />
        I’m a front-end developer living in Japan. I have interest in algorithms which are not related to competitive
        programming such as hash, compression, cryptographic algorithm. Also, I’m studying SSI (Self-sovereign Identity)
        for my senior thesis in high school. Since I am going to study abroad this year, my whole ongoing projects are
        going to stop from the second half of this year to the first half of the next year.<br />
        I’m currently working as an event management intern at
        <a href="https://www.code4japan.org/" target="blank">Code for Japan</a>. If you have any question about me/my
        project, feel free to send an email or contact me on Twitter!
      </span>
    </div>
    <div class="data">
      {#each aboutDataList as { title, sentence }}
        <div><span class="data-red">{title} : </span>{sentence}</div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../assets/definition.scss';

  .about {
    @extend %completely-center;
    width: 100vw;
    min-height: 100vh;
    &-image {
      width: 45vw;
      padding-right: 20px;
      display: flex;
      justify-content: flex-end;
      &-inner {
        width: 30vw;
        img {
          box-shadow: 6px 7px 0px 0px $red;
          width: 100%;
        }
        &-caption {
          @extend %center;
          padding-top: 5px;
          color: $gray;
          font-size: 14px;
          font-family: 'inter';
          font-weight: normal;
        }
      }
    }
    &-desc {
      width: 55vw;
      display: flex;
      flex-direction: column;
      padding-left: 3vw;
      font-size: 18px;
      letter-spacing: 2%;
      &-title {
        width: 30vw;
        h2 {
          margin: 0;
          font-size: 36px;
          width: 250px;
          text-align: left;
          border-bottom: 2px $red solid;
        }
      }
      &-sentence {
        width: 30vw;
        font-family: 'inter';
        padding: 30px 0 40px 0;
        line-height: 30px;
        color: $white;
      }
    }
  }

  @media screen and (max-width: 1500px) {
    .about {
      &-desc {
        &-sentence {
          width: 50vw;
        }
      }
    }
  }
</style>
