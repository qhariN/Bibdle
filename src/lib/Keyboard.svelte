<script lang="ts">
  import backspaceSvg from '../assets/backspace.svg'
  import { createEventDispatcher } from 'svelte';
  import { words } from './store'

  const dispatch = createEventDispatcher()
  const pushKey = (key: string) => dispatch('pushKey', key)
  
  const keys: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ]

  $: usedKeys = new Set($words.flat().map(({ key }) => key))
  $: isUsedKey = (key: string) => usedKeys.has(key)
</script>

<footer>
  {#each keys as row}
    <div class="flex justify-center">
      {#each row as key}
        <button on:click={() => pushKey(key)} class:enter={key === 'Enter'} class:key-used={isUsedKey(key)} type="button">
          {#if key === 'Backspace'}
            <img src={backspaceSvg} width="20" height="20" alt="backspace" class="mb-[2px] mr-[4px] dark:filter-silverFoil">
          {:else}
            {key}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</footer>

<style lang="postcss">
  footer {
    @apply bg-lavenderGray gdark:bg-onyx px-4 py-3 sm:p-7;
  }
  button {
    @apply w-10 h-10 font-extrabold uppercase gdark:text-silverFoil;
  }
  button:has(img) {
    @apply flex justify-center items-center;
  }
  .enter {
    @apply text-sm text-center w-20;
  }
  .key-used {
    @apply text-darkGreen gdark:text-darkGreen;
  }
</style>