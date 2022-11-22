<script lang="ts">
  import Menu from './lib/Menu.svelte';
  import Board from './lib/Board.svelte'
  import Keyboard from './lib/Keyboard.svelte'
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
      <Board />
    </div>
  </main>
  <Keyboard />
</div>