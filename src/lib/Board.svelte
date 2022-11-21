<div class="space-y-2">
  <div class="board-row">
    <div class="!bg-[#978bd2]">L</div>
    <div>O</div>
    <div>V</div>
    <div>E</div>
    <div>R</div>
  </div>
  <div class="board-row">
    <div>P</div>
    <div>R</div>
    <div class="!bg-[#80bc51]">I</div>
    <div>M</div>
    <div>E</div>
  </div>
  <div class="board-row">
    <div>D</div>
    <div>O</div>
    <div class="!bg-[#978bd2]">L</div>
    <div class="!bg-[#80bc51]">L</div>
    <div class="!bg-[#978bd2]">S</div>
  </div>
  <div class="board-row">
    <div class="!bg-[#80bc51]">S</div>
    <div class="!bg-[#80bc51]">W</div>
    <div>E</div>
    <div>E</div>
    <div>T</div>
  </div>
  <div class="board-row">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="board-row">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
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