<script lang="ts" setup>
definePageMeta({
  layout: 'games-tic-tac-toe'
})

useHead({ title: 'In Game' })

const store = useGameTicTacToeStore()
const { isPlayingVsAI, isCurrentPlayerX, isCurrentPlayerO, currentTurn, roundResults } = storeToRefs(store)

const footerInfos = computed(() => {
  const { X: xWins, O: oWins, ties } = roundResults.value
  const xIdentity = isCurrentPlayerX.value ? ' (You)' : isPlayingVsAI.value ? ' (AI)' : '(Player 1)'
  const oIdentity = isCurrentPlayerO.value ? ' (You)' : isPlayingVsAI.value ? ' (AI)' : '(Player 2)'

  return [
    {
      label: `X ${xIdentity}`,
      value: xWins,
      isCurrentTurn: currentTurn.value === 'X',
      bgClass: 'bg-[var(--color-primary)]'
    },
    { label: 'Ties', value: ties, bgClass: 'bg-[var(--color-neutral)]' },
    {
      label: `O ${oIdentity}`,
      value: oWins,
      isCurrentTurn: currentTurn.value === 'O',
      bgClass: 'bg-[var(--color-secondary)]'
    }
  ]
})
</script>

<template>
  <div class="flex max-h-screen w-screen flex-col items-center justify-center">
    <h1 class="sr-only">Tic-Tac-Toe - In Game Screen</h1>

    <div class="flex w-full max-w-[30rem] items-center justify-between gap-3 p-4">
      <NuxtLink to="/games/tic-tac-toe">
        <GamesTicTacToeIconGameLogo />
      </NuxtLink>

      <GamesTicTacToeShadow3dBox
        interactive
        :brightness="0.7"
        small
        class="aspect-square rounded-lg bg-[var(--color-neutral)] p-2"
      >
        <Icon
          name="material-symbols:settings-heart-outline-rounded"
          class="block h-6 w-6 min-w-6 text-[var(--color-text)]"
        />
      </GamesTicTacToeShadow3dBox>
    </div>

    <LazyGamesTicTacToeBoard />

    <div class="grid w-full max-w-[30rem] grid-cols-3 place-items-center gap-4 p-4 text-[var(--color-text)]">
      <div
        v-for="info in footerInfos"
        :key="info.label"
        class="flex w-full flex-col rounded-xl p-3"
        :class="[
          {
            'is-current-turn': info.isCurrentTurn
          },
          info.bgClass
        ]"
      >
        <span class="text-sm uppercase">{{ info.label }}</span>
        <span class="text-2xl font-bold">{{ info.value }}</span>
      </div>
    </div>
  </div>
</template>
