<script lang="ts">
  import diceSvg from '../assets/dice.svg'
  import eyeSvg from '../assets/eye.svg'
  import darkModeSvg from '../assets/dark-mode.svg'
  import helpSvg from '../assets/help.svg'
  import settingsSvg from '../assets/settings.svg'
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

<header class="flex px-12 py-6">
  <div class="flex gap-3">
    <button on:click={randomWord} type="button" class="dark:filter-silverFoil">
      <img src={diceSvg} width="24" height="24" alt="dice" title="Palabra aleatoria">
    </button>
    <button type="button" class="dark:filter-silverFoil">
      <img src={eyeSvg} width="24" height="24" alt="eye open" title="Mostrar palabra">
    </button>
  </div>
  <div class="flex gap-3 ml-auto">
    <button on:click={toggleDarkMode} type="button" class="dark:filter-silverFoil">
      <img src={darkModeSvg} width="24" height="24" alt="moon" title="Modo oscuro">
    </button>
    <button type="button" class="dark:filter-silverFoil">
      <img src={helpSvg} width="24" height="24" alt="question mark" title="Ayuda">
    </button>
    <button type="button" class="dark:filter-silverFoil">
      <img src={settingsSvg} width="24" height="24" alt="gear" title="Ajustes">
    </button>
  </div>
</header>

<style lang="postcss">
  button {
    @apply rounded-full p-3 bg-lavenderGray/40 gdark:bg-onyx/40;
  }
  button:hover {
    @apply bg-lavenderGray/60 gdark:bg-onyx/60;
  }
  button:active {
    @apply bg-lavenderGray/80 gdark:bg-onyx/80;
  }
</style>