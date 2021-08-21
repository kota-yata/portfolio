<script lang="ts">
  const links = [
    { name: 'github', url: 'https://github.com/kota-yata' },
    { name: 'spotify', url: 'https://open.spotify.com/user/jgm80x9h1j84hnk4nv3hozlaf?si=149aa7cf000b4948' },
    { name: 'twitter', url: 'https://twitter.com/kota_yata' },
    { name: 'instagram', url: 'https://www.instagram.com/kota_yata/' },
    { name: 'speakerdeck', url: 'https://speakerdeck.com/kota_yata' }
  ];
</script>

<div class="section">
  <section>
    <h2>Biography</h2>
    <div class="main">
      <p>
        > Student at Keio High Shool.<br />
        > Currently living in Wisconsin, United States as an exchange student.<br />
        > Learning blockchain and fundamental cryptography<br />
        > 1-year experience of JavaScript<br />
        > Mainly use Svelte.js and Nuxt.js for front-end development<br />
      </p>
      <img alt="profile" src="/me.webp" width="200px" height="200px" />
    </div>
    <div class="links">
      {#each links as link}
        <a href={link.url}><img alt={link.name} src="/{link.name}.svg" width="30px" height="30px" /></a>
      {/each}
    </div>
  </section>
  <section>
    <h3>Qualifications & Award</h3>
    <p>
      > Fundamental of Engineering (Japanese)<br />
      > <a href="https://openinnovation.epson.com/topics/20210331_1/">Won the 1st prize at EPSON HackTrek 2021</a>
    </p>
  </section>
  <div>
    <p>Tech blogs : <a href="https://blog.kota-yata.com">blog.kota-yata.com</a></p>
    <p>Contact : kota@yatagai.com</p>
  </div>
</div>

<style lang="scss">
  .section {
    section {
      padding-bottom: 50px;
      .main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          border-radius: 50%;
          filter: contrast(0.9);
        }
      }
      .links {
        margin-top: 10px;
        img {
          margin-right: 30px;
        }
      }
    }
    & > div {
      padding-bottom: 10px;
      p {
        font-weight: 600;
      }
    }
  }
  @media (max-aspect-ratio: 1/1) {
    .section {
      section { 
        .main {
          img {
            display: none;
          }
        }
      }
    }
  }
</style>
