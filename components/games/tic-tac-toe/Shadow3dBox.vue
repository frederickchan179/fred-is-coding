<script setup lang="ts">
defineProps<{
  interactive?: boolean
  brightness?: number
  innerClass?: string
}>()
</script>

<template>
  <component
    :is="interactive ? 'button' : 'div'"
    class="shadow-3d-box"
    :class="{ 'shadow-3d-box--interactive': interactive }"
    :style="{ '--shadow-brightness': brightness ?? 0.6 }"
  >
    <slot />
  </component>
</template>

<style lang="postcss" scoped>
.shadow-3d-box {
  @apply relative z-[1] mb-2 transition-all;

  &::before {
    @apply absolute inset-0 z-[-1] rounded-[inherit] bg-inherit content-[''];
  }

  &::after {
    @apply absolute left-0 right-0 top-2 z-[-2] block h-full rounded-[inherit] bg-inherit brightness-[var(--shadow-brightness)] transition-all content-[''];
  }
}

.shadow-3d-box--interactive {
  @apply cursor-pointer;

  &:active {
    @apply translate-y-2;

    &::after {
      @apply top-0;
    }
  }
}
</style>
