<script lang="ts" setup>
definePageMeta({
  layout: 'games-tic-tac-toe'
})

useHead({ title: 'Home' })

const store = useMyGameTicTacToeStore()
const { setGameState, setPlayMode, setCurrentPlayer } = store
const { isCurrentPlayerX, isCurrentPlayerO } = storeToRefs(store)

const startPlay = (mode: PlayMode) => {
  setPlayMode(mode)
  setGameState('playing')
  navigateTo('/games/tic-tac-toe/in-game')
}
</script>

<template>
  <div class="flex w-full max-w-[30rem] flex-col items-center justify-center gap-6 p-4">
    <GamesTicTacToeIconGameLogo />

    <GamesTicTacToeShadow3dBox
      class="flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--color-cell-bg)] p-4"
    >
      <h3 class="text-center text-lg font-bold uppercase text-[var(--color-neutral)]">Pick Your Mark</h3>

      <div class="mark-select-box" :class="{ 'after:translate-x-full': isCurrentPlayerO }">
        <button :class="{ 'text-[var(--color-bg)]': isCurrentPlayerX }" @click.prevent="setCurrentPlayer('X')">
          <GamesTicTacToeIconMarkX class="h-7 w-7" />
        </button>
        <button :class="{ 'text-[var(--color-bg)]': isCurrentPlayerO }" @click.prevent="setCurrentPlayer('O')">
          <GamesTicTacToeIconMarkO class="h-7 w-7" />
        </button>
      </div>

      <span class="text-sm font-medium uppercase text-[var(--color-neutral)] opacity-50">
        Remember : X goes first
      </span>
    </GamesTicTacToeShadow3dBox>

    <div class="flex w-full flex-col gap-3">
      <GamesTicTacToeShadow3dBox
        interactive
        :brightness="0.7"
        class="h-14 rounded-2xl bg-[var(--color-secondary)] text-lg font-bold uppercase"
        @click.prevent="startPlay('vs-ai')"
      >
        <span>New Game (vs AI)</span>
      </GamesTicTacToeShadow3dBox>
      <GamesTicTacToeShadow3dBox
        interactive
        :brightness="0.7"
        class="h-14 rounded-2xl bg-[var(--color-primary)] text-lg font-bold uppercase"
        @click.prevent="startPlay('vs-player')"
      >
        <span>New Game (vs Player)</span>
      </GamesTicTacToeShadow3dBox>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.mark-select-box {
  @apply relative flex h-16 w-full rounded-xl bg-[var(--color-bg)] text-[var(--color-neutral)] transition-all;

  &::after {
    @apply absolute bottom-2 left-2 right-auto top-2 z-0 w-[calc(50%-0.5rem)] rounded-lg bg-[var(--color-neutral)] transition-all content-[''];
  }

  > button {
    @apply relative z-[1] inline-flex flex-1 items-center justify-center transition-all;
  }
}
</style>
