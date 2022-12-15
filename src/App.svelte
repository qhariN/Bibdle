<script lang="ts">
  import type { BibleWord } from './interfaces/bible-word'
  import Menu from './lib/Menu.svelte'
  import Help from './lib/Help.svelte'
  import Bibdle from './lib/Bibdle.svelte';
  import Board from './lib/Board.svelte'
  import Keyboard from './lib/Keyboard.svelte'
  import bibleWords from './assets/bible-words.json'
  import { onMount } from 'svelte'
  import { parseWord } from './utils/utils'

  let word: BibleWord
  let board: Board
  let view: 'board' | 'word' | 'help' = 'board'

  onMount(() => {
    setRandomWord()
  })

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * bibleWords.length)
    const randomWord: BibleWord = bibleWords[randomIndex]
    randomWord.formattedName = parseWord(randomWord.name)
    word = randomWord
  }
</script>

<div class="flex flex-col w-full min-h-screen overflow-hidden dark:bg-raisinBlack dark:text-lightGray">
  <Menu bind:view on:randomWord={setRandomWord} />
  {#if view === 'board'}
    <main class="grow flex justify-center items-center">
      <div class="w-full flex flex-col items-center gap-3 sm:gap-8 px-4">
        <Bibdle />
        {#if word}
          <Board bind:this={board} randomWord={word.formattedName} />
        {/if}
      </div>
    </main>
    <Keyboard on:pushKey={board.pushKey} />
  {:else if view === 'help'}
    <Help />
  {/if}
</div>