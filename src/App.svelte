<script lang="ts">
  import type { BibleWord } from './interfaces/bible-word'
  import Menu from './lib/Menu.svelte'
  import Board from './lib/Board.svelte'
  import Keyboard from './lib/Keyboard.svelte'
  import bibleWords from './assets/bible-words.json'
  import { confetti } from '@neoconfetti/svelte'
  import { gameOver } from './lib/store'
  import { onMount } from 'svelte'

  let board

  onMount(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * bibleWords.length)
    const randomWord: BibleWord = bibleWords[randomIndex]
    randomWord.formattedName = randomWord.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return randomWord
  }

  let word: BibleWord = setRandomWord()
</script>

<div class="flex flex-col w-full h-screen dark:bg-raisinBlack dark:text-lightGray">
  <Menu />
  <main class="grow flex justify-center items-center">
    <div class="w-full max-w-screen-md flex flex-col items-center gap-8">
      <div class="flex flex-col items-center">
        {#if $gameOver}
          <div use:confetti={{ colors: ['#7bb64f', '#7a6bcf', '#80bc51', '#978bd2', '#afadb0'] }} />
        {/if}
        <div class="flex justify-center text-7xl text-green font-[1000]">
          <span class="-rotate-12">B</span>
          <span class="mt-1">I</span>
          <span class="rotate-12">B</span>
          <span class="-rotate-6 text-crayola">D</span>
          <span class="mt-1">L</span>
          <span class="rotate-12">E</span>
        </div>
      </div>
      <Board bind:this={board} randomWord={word.formattedName} x={word.formattedName.length} />
    </div>
  </main>
  <Keyboard on:pushKey={board.pushKey} />
</div>