<script lang="ts" setup>
const store = useGameTicTacToeStore()
const { makeMove } = store
const { board, boardSize } = storeToRefs(store)
</script>

<template>
  <div
    class="mx-auto grid w-max max-w-full flex-1 gap-4 overflow-scroll p-4"
    :style="{
      gridTemplateColumns: `repeat(${boardSize}, minmax(60px, ${26 / 3}rem))`
    }"
  >
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <template v-for="(col, colIndex) in row" :key="colIndex">
        <GamesTicTacToeShadow3dBox
          interactive
          class="flex aspect-square items-center justify-center rounded-xl bg-[var(--color-cell-bg)]"
          @click.prevent="makeMove(rowIndex, colIndex)"
        >
          <GamesTicTacToeIconMarkX v-if="col === 'X'" class="block !h-1/2 !w-1/2 text-[var(--color-primary)]" />
          <GamesTicTacToeIconMarkO v-else-if="col === 'O'" class="block !h-1/2 !w-1/2 text-[var(--color-secondary)]" />
          <span v-else></span>
        </GamesTicTacToeShadow3dBox>
      </template>
    </template>
  </div>
</template>

<style></style>
