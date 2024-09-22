<script lang="ts" setup>
const store = useGameTicTacToeStore()
const { setGameState, resetGame, clearBoard } = store
const { gameState, currentPlayer, roundWinner } = storeToRefs(store)

const isCurrentPlayerWon = computed(() => currentPlayer.value === roundWinner.value)
const isXWon = computed(() => roundWinner.value === 'X')
const isOWon = computed(() => roundWinner.value === 'O')
const isTie = computed(() => !isXWon.value && !isOWon.value)

const quitGame = () => {
  resetGame()
  setGameState('home')
  navigateTo('/games/tic-tac-toe')
}

const startNextRound = () => {
  clearBoard()
  setGameState('playing')
}
</script>

<template>
  <GamesTicTacToeBasePopup :open="gameState === 'end'">
    <div class="flex w-full flex-col items-center justify-center gap-6 text-center">
      <h3 class="text-lg font-bold uppercase text-[var(--color-neutral)]">
        {{ isTie ? "It's a Tie!" : `You ${isCurrentPlayerWon ? 'Won' : 'Lost'}!` }}
      </h3>
      <div
        class="flex items-center justify-center gap-3 md:gap-6"
        :class="{
          'text-[var(--color-primary)]': isXWon,
          'text-[var(--color-secondary)]': isOWon,
          'text-[var(--color-neutral)]': isTie
        }"
      >
        <GamesTicTacToeIconMarkX v-if="isXWon" class="!h-10 !w-10 md:!h-16 md:!w-16" />
        <GamesTicTacToeIconMarkO v-else-if="isOWon" class="!h-10 !w-10 md:!h-16 md:!w-16" />
        <span class="whitespace-nowrap text-left text-[2rem] font-bold uppercase md:text-[3rem]">
          {{ isTie ? 'Such A Tough Round' : 'Takes the round' }}
        </span>
      </div>
      <div class="flex justify-center gap-3">
        <GamesTicTacToeShadow3dBox
          interactive
          :brightness="0.7"
          small
          class="h-10 rounded-lg bg-[var(--color-text)] px-4 text-lg font-bold uppercase text-[var(--color-neutral)] md:h-12 md:rounded-xl"
          @click="quitGame"
        >
          <span>Quit</span>
        </GamesTicTacToeShadow3dBox>
        <GamesTicTacToeShadow3dBox
          interactive
          :brightness="0.7"
          small
          class="h-10 rounded-lg bg-[var(--color-neutral)] px-4 text-lg font-bold uppercase md:h-12 md:rounded-xl"
          @click="startNextRound"
        >
          <span>Next Round</span>
        </GamesTicTacToeShadow3dBox>
      </div>
    </div>
  </GamesTicTacToeBasePopup>
</template>
