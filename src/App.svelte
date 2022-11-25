<script lang="ts">
  import type { BibleWord } from './interfaces/bible-word'
  import Menu from './lib/Menu.svelte'
  import Board from './lib/Board.svelte'
  import Keyboard from './lib/Keyboard.svelte'
  import bibleWords from './assets/bible-words.json'

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * bibleWords.length)
    const randomWord: BibleWord = bibleWords[randomIndex]
    randomWord.formattedName = randomWord.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return randomWord
  }

  let word: BibleWord = setRandomWord()
</script>

<div class="flex flex-col w-full h-screen">
  <Menu />
  <main class="grow flex justify-center items-center">
    <div class="w-full max-w-screen-md flex flex-col items-center gap-8">
      <div class="flex justify-center text-7xl text-[#7bb64f] font-[1000]">
        <span class="-rotate-12">B</span>
        <span class="mt-1">I</span>
        <span class="rotate-12">B</span>
        <span class="-rotate-6 text-[#7a6bcf]">D</span>
        <span class="mt-1">L</span>
        <span class="rotate-12">E</span>
      </div>
      <Board randomWord={word.name} x={word.name.length} />
    </div>
  </main>
  <Keyboard />
</div>