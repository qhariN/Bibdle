<script lang="ts">
  export let key: string
  export let belong: boolean = false
  export let matched: boolean = false
  export let shake: boolean = false
  export let isNextWord: boolean = false
</script>

<div class:belong class:matched class:shake class:nextWord={isNextWord}>
  {key || ''}
</div>

<style lang="postcss">
  div {
    @apply min-w-[3.5rem] h-14 rounded-full text-3xl font-extrabold flex justify-center items-center bg-lavenderGray gdark:bg-onyx;
  }
  div:empty {
    @apply bg-silverFoil gdark:bg-darkLiver;
  }
  .nextWord {
    @apply bg-silverFoil gdark:bg-darkLiver
  }
  .belong {
    @apply bg-lightCrayola gdark:bg-darkCrayola;
  }
  .matched {
    @apply bg-lightGreen gdark:bg-darkGreen;
  }
  .shake {
    animation: shake .8s;
    animation-iteration-count: infinite;
  }
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }
</style>