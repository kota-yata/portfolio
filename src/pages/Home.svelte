<script>
  import '../assets/main.scss';
  import Button from '../components/Button.svelte';
  import WorksGallery from '../components/WorksGallery.svelte';

  const IMG_SRC_ME = './img/me.jpeg';
</script>

<svelte:head>
  <script
    src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    integrity="sha384-QLs4VQg614zMrRtkgMK6uETamOX2hrpd9k+EitpfurDuIZPjMXm72BFAuj5RQNe2"
    crossorigin="anonymous">

  </script>
  <link
    href="https://fonts.googleapis.com/css2?family=Muli:wght@600;700&display=swap"
    integrity="sha384-mddOKiReLTuMzLu1J4z5xOJt+Fx3blfs9WBtjKB2BXWximhMaf54FtHe+Mr4+xJ6"
    crossorigin="anonymous"
    rel="stylesheet" />
</svelte:head>

<main>
  <div id="intro">
    <div id="main_title" class="css-fade4">
      <h1>
        Kota Yatagai
        <img alt="img" src={IMG_SRC_ME} />
      </h1>
    </div>
    <lottie-player
      id="intro_bg1"
      src="https://assets2.lottiefiles.com/private_files/lf30_oOGQFY.json"
      background="transparent"
      speed="1"
      style="width: 200px; height: 200px;"
      loop
      autoplay />
    <div id="intro_button_container">
      <Button href="/about" name="About" />
      <Button href="/works" name="Works" />
      <Button href="https://blog.kotayatagai.cf" name="Blog" />
    </div>
    <div id="gallery">
      <p1>Works gallery</p1>
      <br />
      <lottie-player
        id="lottie_arrow"
        src="https://assets7.lottiefiles.com/datafiles/uuKxdnyHBkukhBj/data.json"
        background="transparent"
        speed="1"
        style="width: 50px; height: 50px;"
        loop
        autoplay />
    </div>
    <div id="to_policy">
      <a href="policy.html">
        <i class="fas fa-user-shield fa-stack-1x" />
      </a>
    </div>
  </div>
  <WorksGallery />
</main>
