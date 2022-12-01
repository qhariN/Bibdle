<script>
  import diceSvg from '../assets/dice.svg'
  import eyeSvg from '../assets/eye.svg'
  import darkModeSvg from '../assets/dark-mode.svg'
  import helpSvg from '../assets/help.svg'
  import settingsSvg from '../assets/settings.svg'

  let darkMode = document.documentElement.classList.contains('dark')

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
    <button type="button">
      <img src={diceSvg} width="24" height="24" alt="dice" title="Palabra aleatoria">
    </button>
    <button type="button">
      <img src={eyeSvg} width="24" height="24" alt="eye open" title="Mostrar palabra">
    </button>
  </div>
  <div class="flex gap-3 ml-auto">
    <button on:click={toggleDarkMode} type="button">
      <img src={darkModeSvg} width="24" height="24" alt="moon" title="Modo oscuro">
    </button>
    <button type="button">
      <img src={helpSvg} width="24" height="24" alt="question mark" title="Ayuda">
    </button>
    <button type="button">
      <img src={settingsSvg} width="24" height="24" alt="gear" title="Ajustes">
    </button>
  </div>
</header>

<style lang="postcss">
  button {
    @apply rounded-full p-3 bg-[#c3c3c9]/40;
  }
  button:hover {
    @apply bg-[#c3c3c9]/60;
  }
  button:active {
    @apply bg-[#c3c3c9]/80;
  }
</style>