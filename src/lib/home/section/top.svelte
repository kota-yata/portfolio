<script lang="ts">
  import Card from "../card.svelte";

  const links: { name: string, url: string }[] = [
    { name: 'github', url: 'https://github.com/kota-yata' },
    { name: 'spotify', url: 'https://open.spotify.com/user/jgm80x9h1j84hnk4nv3hozlaf?si=149aa7cf000b4948' },
    { name: 'twitter', url: 'https://twitter.com/kota_yata' },
    { name: 'instagram', url: 'https://www.instagram.com/kota_yata/' },
  ];

  const researches: { name: string, url: string }[] = [
    { name: 'Scrapbox', url: 'https://scrapbox.io/senior' }
  ]
</script>

<div class="top">
  <div class="basic">
    <img alt="profile" src="/me.webp"/>
    <h1>Kota Yatagai</h1>
  </div>
  <div class="info">
    <Card className="top-square biography" bg="#efd9d2">
      <p>
        > Front-end Developer<br />
        > Learning cryptography and distributed system<br />
        > Living in Wisconsin, United States as an exchange student<br />
        > Born and raised in Japan
      </p>
    </Card>
    <div class="detail">
      <div class="detail-left">
        <Card className="top-square" bg="#85d7c8" title="Qualifications">
          <p>> Fundamental of Engineering (Japanese)<br />> The 1st prize at EPSON HackTrek</p>
        </Card>
        <Card className="top-square communication" bg="#d3d3f4" title="Communication">
          <p>
            > Email : kota@yatagai.com<br />
            > Native : Japanese<br />
            > Non-Native : English<br />
          </p>
          <div class="links">
            {#each links as link}
              <a href={link.url}><img alt={link.name} src="/{link.name}.svg" width="30px" height="30px" /></a>
            {/each}
          </div>
        </Card>
      </div>
      <div class="detail-right">
        <Card className="research top-square" bg="#f1e6bd" title="Research">
          <p>
            Currently I am researching blockchain system, especially DHT, 
            which is the protocol for non-structual overlay P2P network. Although I have not published 
            any implementation or paper on the basis of this research yet, I have been reading 
            the paper of DHT algorithms and steadily writing note on Scrapbox. This section will be 
            updated when I published systemized blog posts or any kind of implementations about this topic. 
            If you can read Japanese, it would be great if you help me know about this topic further 
            by visiting my Scrapbox and send some comments to me on Twitter or something.
          </p>
          {#each researches as link}
            <a href={link.url}>{link.name}</a>
          {/each}
        </Card>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/variable.scss';

  .top {
    width: 85vw;
    .basic {
      z-index: 2;
      padding-top: 10vh;
      display: flex;
      position: relative;
      align-items: center;
      & > img {
        width: 15vw;
        height: 15vw;
        border-radius: 20px;
      }
      h1 {
        margin-top: -30px;
        margin-left: 5vw;
      }
    }
    .info {
      z-index: 0;
      width: 100%;
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      .detail {
        width: 95%;
        display: flex;
        justify-content: space-between;
        &-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: calc(55% - #{$default-square-margin})
        }
        &-right {
          display: flex;
          align-content: stretch;
          width: 45%;
          margin-left: $default-square-margin;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .top {
      text-align: center;
    }
  }
</style>
