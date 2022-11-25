<script lang="ts">
  import { onMount } from 'svelte'
  import { words } from './store'

  export let x = 5
  export let y = 6
  export let randomWord: string

  let nextWord: string[] = Array.from(Array(x))

  $: firstEmptyWordIndex = () => $words.findIndex(isEmptyWord)

  onMount(() => {
    words.set(Array.from(Array(y), () => new Array(x)))
    document.addEventListener("keydown", pushKey)
  })

  const isEmptyWord = (letters: string[]):boolean => {
    const word = letters.join('')
    return word === ''
  }

  const pushKey = ({ key }: KeyboardEvent) => {
    const isLetter = key.length === 1 && key.match(/[a-z]/i)
    const isBackspace = key === "Backspace"
    const isEnter = key === "Enter"

    if (isBackspace) {
      for (let i = x - 1; i >= 0; i--) {
        if (nextWord[i] !== undefined) {
          nextWord[i] = undefined
          break
        }
      }
    }
    if (isEnter) {
      if (nextWord.join('').length === x) {
        $words[firstEmptyWordIndex()] = nextWord
        nextWord = Array.from(Array(x))
      }
    }
    if (isLetter) {
      for (let i = 0; i < x; i++) {
        if (nextWord[i] === undefined) {
          nextWord[i] = key.toUpperCase()
          break
        }
      }
    }
  }

  const letterHighlight = (letter: string, index: number) => {
    if (randomWord[index] === letter) {
      return 'bg-[#80bc51]'
    } else if (randomWord.includes(letter)) {
      return 'bg-[#978bd2]'
    } else {
      return 'bg-[#c3c3c9]'
    }
  }
</script>

<div class="space-y-2">
  {#each $words as word, i}
    <div class="board-row">
      {#if isEmptyWord(word) && i === firstEmptyWordIndex()}
        {#each nextWord as letter}
          <div class="!bg-[#afadb0]">{letter || ''}</div>
        {/each}
      {:else}
        {#each word as letter, j}
          <div class={letter && letterHighlight(letter, j)}>{letter || ''}</div>
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
  .board-row > div:empty {
    @apply bg-[#afadb0];
  }
</style>