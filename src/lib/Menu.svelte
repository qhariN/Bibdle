<script lang="ts">
  import DiceIcon from '../assets/DiceIcon.svelte'
  import HomeIcon from '../assets/HomeIcon.svelte'
  import EyeIcon from '../assets/EyeIcon.svelte'
  import DarkModeIcon from '../assets/DarkModeIcon.svelte'
  import HelpIcon from '../assets/HelpIcon.svelte'
  import SettingsIcon from '../assets/SettingsIcon.svelte'
  import { view } from './store'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  const randomWord = (e: MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      e.target.blur()
    }
    dispatch('randomWord')
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
        <DiceIcon />
      </button>
    {:else}
      <button on:click={() => view.set('board')} type="button" class="btn" title="Volver al inicio">
        <HomeIcon />
      </button>
    {/if}
    <button on:click={() => view.set('result')} type="button" class="btn" title="Mostrar palabra">
      <EyeIcon />
    </button>
  </div>
  <div class="flex gap-2 sm:gap-3 ml-auto">
    <button on:click={toggleDarkMode} type="button" class="btn" title="Modo oscuro">
      <DarkModeIcon />
    </button>
    <button on:click={() => view.set('help')} type="button" class="btn" title="Ayuda">
      <HelpIcon />
    </button>
    <!-- <button type="button" class="btn" title="Ajustes">
      <SettingsIcon />
    </button> -->
  </div>
</header>