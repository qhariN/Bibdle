<script lang="ts">
  import type { Letter } from 'src/interfaces/letter'
  import type { BibleWord } from 'src/interfaces/bible-word'
  import bibleWords from '../assets/bible-words.json'
  import spanishWords from '../assets/spanish-words.json'
  import Tile from './Tile.svelte'
  import { onDestroy, onMount } from 'svelte'
  import { gameOver, view, words } from './store'
  import { parseWord } from '../utils/utils'

  export let randomWord: string

  let shakeLetters: boolean = false

  $: nextWord = Array.from(Array(randomWord.length))
  $: firstEmptyWordIndex = () => $words.findIndex(isEmptyWord)

  onMount(() => {
    document.addEventListener("keydown", pushKey)
  })

  onDestroy(() => {
    document.removeEventListener("keydown", pushKey)
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
          key: letter,
          matched: letter === randomWord[i],
          belong: nextWord.filter((l, i) => l === randomWord[i] && l === letter).length < randomWord.split('').filter(l => l === letter).length
            ? randomWord.includes(letter)
            : false
        }))
        $words[firstEmptyWordIndex()] = word
        nextWord = Array.from(Array(randomWord.length))
        if (word.every(l => l.matched)) gameOver.set(true)
        if ($gameOver || firstEmptyWordIndex() === -1) view.set('result')
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
      w = parseWord(w)
      return w.toLowerCase() === word.toLowerCase()
    })
  }
</script>

<div class="max-w-full overflow-x-auto space-y-2 pb-6 sm:pb-8">
  {#each $words as word, i}
    <div class="flex gap-2">
      {#if isEmptyWord(word) && i === firstEmptyWordIndex()}
        {#each nextWord as key}
          <Tile {key} shake={shakeLetters} isNextWord />
        {/each}
      {:else}
        {#each word as letter}
          <Tile {...letter} />
        {/each}
      {/if}
    </div>
  {/each}
</div>