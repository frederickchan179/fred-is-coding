<script lang="ts" setup>
const title = 'Advice Generator App'

// SEO
useHead({ title })

// Query advices
type Advice = {
  slip: {
    id: number
    advice: string
  }
}

const {
  data: advice,
  isFetching,
  refetch
} = useQuery<Advice>({
  queryKey: ['random-advice'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: () => $fetch('https://api.adviceslip.com/advice').then((res) => JSON.parse(res as any))
})

const refreshAdvice = () => {
  if (!isFetching) return

  refetch()
}
</script>

<template>
  <section class="root">
    <h1 class="sr-only">
      {{ title }}
    </h1>

    <div
      class="relative m-3 flex w-full max-w-[25rem] flex-col items-center justify-center gap-5 rounded-lg bg-[var(--color-card-bg)] px-6 py-8 shadow-2xl transition-all"
    >
      <Icon v-if="isFetching" name="eos-icons:three-dots-loading" class="text-[4rem]" />
      <template v-else>
        <h2 class="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-highlight)] transition-all">
          Advice #{{ advice?.slip.id }}
        </h2>
        <p class="text-lg">{{ advice?.slip.advice }}</p>
        <span class="divider">
          <Icon name="hugeicons:quote-down" class="text-lg" />
        </span>
        <button aria-label="Get new advice" :disabled="isFetching" class="refresh-button" @click="refreshAdvice">
          <Icon name="game-icons:perspective-dice-six-faces-random" class="text-3xl" />
        </button>
      </template>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.root {
  @apply flex h-screen w-screen items-center justify-center overflow-hidden bg-[var(--color-bg)] text-center font-['Manrope'] text-[var(--color-text)] transition-all;

  --color-text: hsl(193, 38%, 86%);
  --color-highlight: hsl(150, 100%, 66%);
  --color-divider: hsl(217, 19%, 38%);
  --color-card-bg: hsl(217, 19%, 24%);
  --color-bg: hsl(218, 23%, 16%);

  html.light & {
    --color-text: hsl(0, 0%, 20%);
    --color-highlight: hsl(187, 100%, 40%);
    --color-divider: hsl(0, 0%, 80%);
    --color-card-bg: hsl(0, 0%, 100%);
    --color-bg: hsl(0, 0%, 95%);
  }
}

.divider {
  @apply mb-6 inline-flex w-full items-center gap-2;

  &::before,
  &::after {
    @apply h-[1px] w-full flex-1 bg-[var(--color-divider)] transition-all content-[''];
  }
}

.refresh-button {
  @apply absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 appearance-none items-center justify-center rounded-full bg-[var(--color-highlight)] p-3 text-center text-[var(--color-bg)] transition-all disabled:cursor-progress disabled:grayscale;

  --shadow-size: 5px;

  box-shadow: 0px 0px var(--shadow-size) 0px var(--color-highlight);

  &:hover {
    --shadow-size: 30px;
  }

  &:active,
  &:focus-visible {
    --shadow-size: 20px;
  }
}
</style>
