<script lang="ts">
  import { words } from './store'

  const keys: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ]

  $: usedKeys = new Set($words.flat())
  $: isUsedKey = (key: string) => usedKeys.has(key)
</script>

<footer class="p-7">
  {#each keys as row}
    <div class="flex justify-center">
      {#each row as key}
        <button class:key-used={isUsedKey(key)}>
          {key}
        </button>
      {/each}
    </div>
  {/each}
</footer>

<style lang="postcss">
  footer {
    background-color: #c7c7cc;
  }
  button {
    @apply w-10 h-10 font-extrabold;
  }
  .key-used {
    color: #308519;
  }
</style>