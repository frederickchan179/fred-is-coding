<script lang="ts" setup>
const store = useGameTicTacToeStore()
const { isLastMove, makeMove } = store
const { gameState, board, boardSize, roundWinningCells } = storeToRefs(store)

const isInEndStates = computed(() => gameState.value === 'pre-end' || gameState.value === 'end')

function isWinningCell(row: number, col: number) {
  return roundWinningCells.value.some((cell) => cell.row === row && cell.col === col)
}
</script>

<template>
  <div
    class="mx-auto grid w-max max-w-full flex-1 gap-4 overflow-scroll p-4"
    :style="{
      gridTemplateColumns: `repeat(${boardSize}, minmax(60px, calc(26rem / 3)))`
    }"
  >
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <template v-for="(col, colIndex) in row" :key="colIndex">
        <GamesTicTacToeShadow3dBox
          interactive
          class="board-cell"
          :class="{
            'is-last-move': !isInEndStates && isLastMove(rowIndex, colIndex),
            'is-winning-cell': isInEndStates && isWinningCell(rowIndex, colIndex),
            [`is-${col?.toLowerCase()}-cell`]: !!col
          }"
          :disabled="isInEndStates && !isWinningCell(rowIndex, colIndex)"
          @click="makeMove(rowIndex, colIndex)"
        >
          <Transition name="scale">
            <GamesTicTacToeIconMarkX v-if="col === 'X'" class="block !h-1/2 !w-1/2 text-[var(--color-primary)]" />
            <GamesTicTacToeIconMarkO
              v-else-if="col === 'O'"
              class="block !h-1/2 !w-1/2 text-[var(--color-secondary)]"
            />
          </Transition>
        </GamesTicTacToeShadow3dBox>
      </template>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.board-cell {
  @apply flex aspect-square items-center justify-center rounded-xl bg-[var(--color-cell-bg)];

  &.is-last-move::before {
    @apply border border-solid outline-[var(--color-neutral)];
  }

  &.is-winning-cell {
    &.is-x-cell {
      @apply bg-[var(--color-primary)];
    }

    &.is-o-cell {
      @apply bg-[var(--color-secondary)];
    }

    svg {
      @apply !text-[var(--color-cell-bg)];
    }
  }
}
</style>
