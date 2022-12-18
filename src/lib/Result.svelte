<script lang="ts">
  import type { BibleWord } from '../interfaces/bible-word'
  import Bibdle from './Bibdle.svelte'
  import Tile from './Tile.svelte'
  import shareSvg from '../assets/share.svg'
  import facebookSvg from '../assets/facebook.svg'
  import whatsappSvg from '../assets/whatsapp.svg'
  import twitterSvg from '../assets/twitter.svg'

  export let word: BibleWord

  const share = () => {
    navigator.share({
      title: 'Bibdle',
      text: '¡Disfruta de una forma divertida y educativa de interactuar con las sagradas escrituras!',
      url: 'https://bibdle.vercel.app',
    })
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://bibdle.vercel.app`,
      'facebook-share-dialog',
      'width=800,height=600'
    )
  }

  const shareOnWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=https://bibdle.vercel.app`,
      'whatsapp-share-dialog',
      'width=800,height=600'
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=https://bibdle.vercel.app`,
      'twitter-share-dialog',
      'width=800,height=600'
    )
  }
</script>

<main class="grow self-center flex flex-col items-center gap-7 max-w-full w-[32rem] px-4">
  <div class="grow flex flex-col justify-center items-center gap-7 max-w-full">
    <Bibdle />
    <h2>Respuesta</h2>
    <div class="space-y-3 max-w-full lg:max-w-none">
      <h3>La palabra es</h3>
      <div class="flex gap-2 max-w-full overflow-x-auto">
        {#each word.name as key}
          <Tile {key} matched />
        {/each}
      </div>
    </div>
    <div class="space-y-3">
      <h3>Descripción</h3>
      <div class="bg-lavenderGray/60 dark:bg-onyx/60 rounded-3xl py-5 px-7">
        <p>{word.description}</p>
      </div>
    </div>
    <div class="space-y-3">
      <h2>Compartir</h2>
      <div class="flex justify-center gap-3">
        <button on:click={share} type="button" class="btn dark:filter-silverFoil">
          <img src={shareSvg} width="30" height="30" alt="share" title="Compartir">
        </button>
        <button on:click={shareOnFacebook} type="button" class="btn dark:filter-silverFoil">
          <img src={facebookSvg} width="30" height="30" alt="facebook" title="Facebook">
        </button>
        <button on:click={shareOnWhatsapp} type="button" class="btn dark:filter-silverFoil">
          <img src={whatsappSvg} width="30" height="30" alt="whatsapp" title="Whatsapp">
        </button>
        <button on:click={shareOnTwitter} type="button" class="btn dark:filter-silverFoil">
          <img src={twitterSvg} width="30" height="30" alt="twitter" title="Twitter">
        </button>
      </div>
    </div>
  </div>
</main>
<footer class="w-full px-6 py-4 sm:px-12 sm:py-6">
  Hecho con 💖 por <a class="underline" href="https://jhormanrus.vercel.app">Jhorman Rus</a>
</footer>