<script>
  let keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ]
</script>

<footer class="p-7">
  {#each keys as row}
    <div class="flex justify-center">
      {#each row as key}
        <div>
          <button class="w-10 h-10 font-extrabold">{key}</button>
        </div>
      {/each}
    </div>
  {/each}
</footer>

<style>
  footer {
    background-color: #c7c7cc;
  }
</style>