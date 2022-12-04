<script lang="ts">
  import type { Letter } from 'src/interfaces/letter'
  import { onMount } from 'svelte'
  import { gameOver, words } from './store'

  export let tries: number = 6
  export let randomWord: string

  let nextWord: string[] = Array.from(Array(randomWord.length))

  $: firstEmptyWordIndex = () => $words.findIndex(isEmptyWord)

  onMount(() => {
    words.set(Array.from(Array(tries), () => new Array(randomWord.length)))
    document.addEventListener("keydown", pushKey)
  })

  const isEmptyWord = (letters: Letter[]):boolean => {
    return typeof letters[0] === "undefined"
  }

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
      if (nextWord.join('').length === randomWord.length) {
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
</script>

<div class="space-y-2">
  {#each $words as word, i}
    <div class="board-row">
      {#if isEmptyWord(word) && i === firstEmptyWordIndex()}
        {#each nextWord as letter}
          <div class="bg-silverFoil dark:bg-darkLiver">{letter || ''}</div>
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
    @apply w-14 h-14 rounded-full text-3xl font-extrabold flex justify-center items-center;
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
</style>