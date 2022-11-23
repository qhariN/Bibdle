<script lang="ts">
  import { onMount } from "svelte";

  export let x = 5
  export let y = 6

  let words: string[][] = Array.from(Array(y), () => new Array(x))
  let nextWord: string[] = Array.from(Array(x))

  onMount(() => {
    words[0] = ["A", "B", "C", "D", "E"]
  })

  const emptyWord = (letters: string[]):boolean => {
    const word = letters.join('')
    return word === ''
  }

  $: firstEmptyWordIndex = () => words.findIndex(emptyWord)
</script>

<div class="space-y-2">
  {#each words as word, i}
    <div class="board-row">
      {#if emptyWord(word) && i === firstEmptyWordIndex()}
        {#each nextWord as letter}
          <div class="!bg-[#978bd2]">{letter || ''}</div>
        {/each}
      {:else}
        {#each word as letter}
          <div>{letter || ''}</div>
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
    @apply w-14 h-14 rounded-full bg-[#c3c3c9] text-3xl font-extrabold flex justify-center items-center;
  }
  .board-row > div:empty {
    @apply bg-[#afadb0];
  }
</style>