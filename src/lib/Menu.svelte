<script lang="ts">
  import diceSvg from '../assets/dice.svg'
  import homeSvg from '../assets/home.svg'
  import eyeSvg from '../assets/eye.svg'
  import darkModeSvg from '../assets/dark-mode.svg'
  import helpSvg from '../assets/help.svg'
  import settingsSvg from '../assets/settings.svg'
  import { view } from './store'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const randomWord = (e: MouseEvent) => {
    dispatch('randomWord')
    if (e.target instanceof HTMLButtonElement) {
      e.target.blur()
    }
  }

  let darkMode: boolean = (() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      return true
    } else {
      document.documentElement.classList.remove('dark')
      return false
    }
  })()

  $: {
    if (darkMode) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleDarkMode = () => {
    darkMode = !darkMode
  }
</script>

<header class="flex px-6 py-4 sm:px-12 sm:py-6">
  <div class="flex gap-2 sm:gap-3">
    {#if $view === 'board'}
      <button on:click={randomWord} type="button" class="btn">
        <img src={diceSvg} width="24" height="24" alt="dice" title="Palabra aleatoria">
      </button>
    {:else}
      <button on:click={() => view.set('board')} type="button" class="btn">
        <img src={homeSvg} width="24" height="24" alt="home" title="Volver al inicio">
      </button>
    {/if}
    <button on:click={() => view.set('result')} type="button" class="btn">
      <img src={eyeSvg} width="24" height="24" alt="eye open" title="Mostrar palabra">
    </button>
  </div>
  <div class="flex gap-2 sm:gap-3 ml-auto">
    <button on:click={toggleDarkMode} type="button" class="btn">
      <img src={darkModeSvg} width="24" height="24" alt="moon" title="Modo oscuro">
    </button>
    <button on:click={() => view.set('help')} type="button" class="btn">
      <img src={helpSvg} width="24" height="24" alt="question mark" title="Ayuda">
    </button>
    <!-- <button type="button" class="btn">
      <img src={settingsSvg} width="24" height="24" alt="gear" title="Ajustes">
    </button> -->
  </div>
</header>