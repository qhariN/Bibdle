<script lang="ts">
  import type { Letter } from 'src/interfaces/letter'
  import type { BibleWord } from 'src/interfaces/bible-word';
  import bibleWords from '../assets/bible-words.json'
  import spanishWords from '../assets/spanish-words.json'
  import { onMount } from 'svelte'
  import { gameOver, words } from './store'

  export let tries: number = 6
  export let randomWord: string

  let nextWord: string[]
  let shakeLetters: boolean = false

  $: firstEmptyWordIndex = () => $words.findIndex(isEmptyWord)
  $: {
    words.set(Array.from(Array(tries), () => new Array(randomWord.length)))
    nextWord = Array.from(Array(randomWord.length))
    gameOver.set(false)
  }

  onMount(() => {
    document.addEventListener("keydown", pushKey)
  })

  export const pushKey = (event: KeyboardEvent | CustomEvent) => {
    if ($gameOver) return
    const key = (event as KeyboardEvent).key || (event as CustomEvent).detail
    const isLetter = key.length === 1 && key.match(/[ña-z]/i)
    const isBackspace = key === "Backspace"
    const isEnter = key === "Enter"

    if (isBackspace) {
      for (let i = randomWord.length - 1; i >= 0; i--) {
        if (nextWord[i] !== undefined) {
          nextWord[i] = undefined
          break
        }
      }
    }
    if (isEnter) {
      const nextWordString = nextWord.join('')
      if (nextWordString.length === randomWord.length && (verifyMatch(bibleWords, nextWordString) || verifyMatch(spanishWords, nextWordString))) {
        const word = nextWord.map((letter, i) => ({
          name: letter,
          matched: letter === randomWord[i],
          belong: nextWord.filter((l, i) => l === randomWord[i] && l === letter).length < randomWord.split('').filter(l => l === letter).length
            ? randomWord.includes(letter)
            : false
        }))
        $words[firstEmptyWordIndex()] = word
        nextWord = Array.from(Array(randomWord.length))
        if (word.every(l => l.matched)) gameOver.set(true)
      } else {
        shakeLetters = true
        setTimeout(() => shakeLetters = false, 400)
      }
    }
    if (isLetter) {
      for (let i = 0; i < randomWord.length; i++) {
        if (nextWord[i] === undefined) {
          nextWord[i] = key.toUpperCase()
          break
        }
      }
    }
  }

  const isEmptyWord = (letters: Letter[]): boolean => {
    return typeof letters[0] === "undefined"
  }

  const verifyMatch = (words: string[] | BibleWord[], word: string): boolean => {
    return words.some((w: string | BibleWord) => {
      w = typeof w === "string" ? w : w.name
      w = w.normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      return w.toLowerCase() === word.toLowerCase()
    })
  }
</script>

<div class="max-w-full overflow-x-auto space-y-2 pb-6 sm:pb-8">
  {#each $words as word, i}
    <div class="board-row">
      {#if isEmptyWord(word) && i === firstEmptyWordIndex()}
        {#each nextWord as letter}
          <div class="bg-silverFoil dark:bg-darkLiver" class:shake={shakeLetters}>{letter || ''}</div>
        {/each}
      {:else}
        {#each word as letter, j}
          <div class="letter" class:letter-belong={letter?.belong} class:letter-matched={letter?.matched}>{letter?.name || ''}</div>
        {/each}
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  .board-row {
    @apply flex gap-2;
  }
  .board-row > div {
    @apply min-w-[3.5rem] h-14 rounded-full text-3xl font-extrabold flex justify-center items-center;
  }
  .letter {
    @apply bg-lavenderGray gdark:bg-onyx;
  }
  .letter:empty {
    @apply bg-silverFoil gdark:bg-darkLiver;
  }
  .letter-belong {
    @apply bg-lightCrayola gdark:bg-darkCrayola;
  }
  .letter-matched {
    @apply bg-lightGreen gdark:bg-darkGreen;
  }
  .shake {
    animation: shake .8s;
    animation-iteration-count: infinite;
  }
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
</style>