<script lang="ts">
  import type { BibleWord } from './interfaces/bible-word'
  import Menu from './lib/Menu.svelte'
  import Result from './lib/Result.svelte'
  import Help from './lib/Help.svelte'
  import Bibdle from './lib/Bibdle.svelte'
  import Board from './lib/Board.svelte'
  import Keyboard from './lib/Keyboard.svelte'
  import bibleWords from './assets/bible-words.json'
  import { onMount } from 'svelte'
  import { parseWord } from './utils/utils'
  import { view, words } from './lib/store'

  let word: BibleWord
  let tries: number = 6
  let board: Board

  onMount(() => {
    setRandomWord()
  })

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * bibleWords.length)
    const randomWord: BibleWord = bibleWords[randomIndex]
    randomWord.formattedName = parseWord(randomWord.name)
    word = randomWord
    words.set(Array.from(Array(tries), () => new Array(word.formattedName.length)))
  }
</script>

<div class="flex flex-col w-full min-h-screen overflow-hidden dark:bg-raisinBlack dark:text-lightGray">
  <Menu on:randomWord={setRandomWord} />
  {#if $view === 'board'}
    <main class="grow self-center flex flex-col justify-center items-center gap-3 sm:gap-8 max-w-full px-4">
      <Bibdle />
      {#if word}
        <Board bind:this={board} randomWord={word.formattedName} />
      {/if}
    </main>
    <Keyboard on:pushKey={board.pushKey} />
  {:else if $view === 'result'}
    <Result {word} />
  {:else if $view === 'help'}
    <Help />
  {/if}
</div>