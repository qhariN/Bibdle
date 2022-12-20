<script lang="ts">
  import { confetti } from '@neoconfetti/svelte'
  import { gameOver } from '../lib/store'

  export let withConfetti: boolean = false
</script>

<div class="flex flex-col items-center">
  {#if withConfetti && $gameOver}
    <div use:confetti={{ colors: ['#7bb64f', '#7a6bcf', '#80bc51', '#978bd2', '#afadb0'] }} />
  {/if}
  <div class="flex justify-center text-6xl sm:text-7xl text-green font-[1000]">
    <span class="-rotate-12">B</span>
    <span class="mt-1">I</span>
    <span class="rotate-12">B</span>
    <span class="-rotate-6 text-crayola">D</span>
    <span class="mt-1">L</span>
    <span class="rotate-12">E</span>
  </div>
</div>