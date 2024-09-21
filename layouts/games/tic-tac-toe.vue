<script setup lang="ts">
const { title } = useAppConfig()

useHead({
  title,
  titleTemplate: `%s - Tic-Tac-Toe - ${title}`
})
</script>

<template>
  <section class="root">
    <h1 class="sr-only">
      {{ title }}
    </h1>

    <slot />
  </section>
</template>

<style lang="postcss" scoped>
.root {
  @apply flex h-screen w-screen items-center justify-center overflow-hidden bg-[var(--color-bg)] text-center font-['Ubuntu'] text-[var(--color-text)] transition-all;

  --color-text: #192a33;
  --color-primary: #30c4be;
  --color-secondary: #f2b137;
  --color-neutral: #a8bfc9;
  --color-bg: #192a33;
  --color-cell-bg: #1f3640;
}
</style>
