<script lang="ts" setup>
definePageMeta({
  layout: 'games-tic-tac-toe'
})

useHead({ title: 'Home' })

const store = useGameTicTacToeStore()
const { setGameState, setPlayMode, setBoardSize, setCurrentPlayer, resetGame } = store
const { boardSize, isCurrentPlayerX, isCurrentPlayerO } = storeToRefs(store)

const startPlay = (mode: PlayMode) => {
  resetGame()
  setGameState('playing')
  setPlayMode(mode)
  navigateTo('/games/tic-tac-toe/in-game')
}
</script>

<template>
  <div class="flex w-full max-w-[30rem] flex-col items-center justify-center gap-6 p-4">
    <h1 class="sr-only">Tic-Tac-Toe - Home Screen</h1>

    <GamesTicTacToeIconGameLogo />

    <GamesTicTacToeShadow3dBox
      class="flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--color-cell-bg)] p-4"
    >
      <div class="flex w-full items-center justify-between">
        <h2 class="text-lg font-bold uppercase text-[var(--color-neutral)]">Pick Your Mark</h2>
        <span class="font-medium uppercase text-[var(--color-neutral)] opacity-50">X goes first </span>
      </div>

      <div class="mark-select-box" :class="{ 'after:translate-x-full': isCurrentPlayerO }">
        <button :class="{ 'text-[var(--color-bg)]': isCurrentPlayerX }" @click="setCurrentPlayer('X')">
          <GamesTicTacToeIconMarkX class="h-7 w-7" />
        </button>
        <button :class="{ 'text-[var(--color-bg)]': isCurrentPlayerO }" @click="setCurrentPlayer('O')">
          <GamesTicTacToeIconMarkO class="h-7 w-7" />
        </button>
      </div>

      <hr />

      <div class="flex w-full items-center justify-between">
        <h2 class="text-lg font-bold uppercase text-[var(--color-neutral)]">Board Size</h2>
        <label for="boardSize" class="flex gap-2">
          <GamesTicTacToeShadow3dBox
            interactive
            :brightness="0.7"
            small
            class="aspect-square rounded-lg bg-[var(--color-neutral)] p-2"
            @click="setBoardSize(boardSize - 1)"
          >
            <Icon name="ic:twotone-minus" class="block h-6 w-6 min-w-6 text-[var(--color-text)]" />
          </GamesTicTacToeShadow3dBox>
          <input
            id="boardSize"
            :value="boardSize"
            min="3"
            max="15"
            type="number"
            class="board-size-input"
            @change="setBoardSize(Number(($event.target as HTMLInputElement | null)?.value))"
          />
          <GamesTicTacToeShadow3dBox
            interactive
            :brightness="0.7"
            small
            class="aspect-square rounded-lg bg-[var(--color-neutral)] p-2"
            @click="setBoardSize(boardSize + 1)"
          >
            <Icon name="ic:twotone-plus" class="block h-6 w-6 min-w-6 text-[var(--color-text)]" />
          </GamesTicTacToeShadow3dBox>
        </label>
      </div>
    </GamesTicTacToeShadow3dBox>

    <div class="flex w-full flex-col gap-3">
      <GamesTicTacToeShadow3dBox
        interactive
        :brightness="0.7"
        class="h-14 rounded-2xl bg-[var(--color-secondary)] px-4 text-lg font-bold uppercase"
        @click="startPlay('vs-ai')"
      >
        <span>New Game (vs AI)</span>
      </GamesTicTacToeShadow3dBox>
      <GamesTicTacToeShadow3dBox
        interactive
        :brightness="0.7"
        class="h-14 rounded-2xl bg-[var(--color-primary)] px-4 text-lg font-bold uppercase disabled:pointer-events-none disabled:grayscale"
        disabled
        @click="startPlay('vs-player')"
      >
        <span>New Game (vs Player)</span>
      </GamesTicTacToeShadow3dBox>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
hr {
  @apply h-[1px] w-full bg-[var(--color-neutral)] opacity-10;
}

.inset-shadow {
  box-shadow: rgb(0 0 0 / 0.3) 0 0 0.25rem 0.2rem inset;
}

.mark-select-box,
.board-size-input {
  @apply inset-shadow bg-[var(--color-bg)] text-[var(--color-neutral)] transition-all;
}

.mark-select-box {
  @apply relative flex h-16 w-full rounded-xl;

  &::after {
    @apply absolute bottom-2 left-2 right-auto top-2 z-0 w-[calc(50%-0.5rem)] rounded-lg bg-[var(--color-neutral)] transition-all content-[''];
  }

  > button {
    @apply relative z-[1] inline-flex flex-1 items-center justify-center transition-all;
  }
}

.board-size-input {
  @apply w-16 rounded-lg text-center text-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none;
}
</style>
