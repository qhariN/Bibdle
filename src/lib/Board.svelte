<script lang="ts">
  import type { Letter } from 'src/interfaces/letter'
  import type { BibleWord } from 'src/interfaces/bible-word'
  import bibleWords from '../assets/bible-words.json'
  import spanishWords from '../assets/spanish-words.json'
  import Tile from './Tile.svelte'
  import { onDestroy, onMount } from 'svelte'
  import { gameOver, gameWon, view, words } from './store'
  import { parseWord } from '../utils/utils'

  export let word: BibleWord

  let shakeLetters: boolean = false

  $: nextWord = Array.from(Array(word.name.length))
  $: firstEmptyWordIndex = () => $words.findIndex(isEmptyWord)

  onMount(() => {
    document.addEventListener("keydown", pushKey)
  })

  onDestroy(() => {
    document.removeEventListener("keydown", pushKey)
  })

  export const pushKey = (event: KeyboardEvent | CustomEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      event.target.blur()
    }
    if ($gameOver || $gameWon) return
    const key = (event as KeyboardEvent).key || (event as CustomEvent).detail
    const isLetter = key.length === 1 && key.match(/[ña-z]/i)
    const isBackspace = key === "Backspace"
    const isEnter = key === "Enter"

    if (isBackspace) {
      for (let i = word.name.length - 1; i >= 0; i--) {
        if (nextWord[i] !== undefined) {
          nextWord[i] = undefined
          break
        }
      }
    }
    if (isEnter) {
      const nextWordString = nextWord.join('')
      if (nextWordString.length === word.name.length && (verifyMatch(bibleWords, nextWordString) || verifyMatch(spanishWords, nextWordString))) {
        $words[firstEmptyWordIndex()] = nextWord.map((letter, i) => ({
          key: letter === word.formattedName[i]? word.name[i] : letter,
          matched: letter === word.formattedName[i],
          belong: nextWord.filter((l, i) => l === word.formattedName[i] && l === letter).length < word.formattedName.split('').filter(l => l === letter).length
            ? word.formattedName.includes(letter)
            : false
        }))
        nextWord = Array.from(Array(word.name.length))
        if ($gameOver || $gameWon) view.set('result')
      } else {
        shakeLetters = true
        setTimeout(() => shakeLetters = false, 400)
      }
    }
    if (isLetter) {
      for (let i = 0; i < word.name.length; i++) {
        if (nextWord[i] === undefined) {
          nextWord[i] = key.toUpperCase()
          break
        }
      }
    }
  }

  const isEmptyWord = (letters: Letter[]): boolean => !letters[0]

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