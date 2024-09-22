<script setup lang="ts">
defineProps<{
  interactive?: boolean
  brightness?: number
  innerClass?: string
  small?: boolean
  forceActive?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="interactive ? 'button' : 'div'"
    class="shadow-3d-box"
    :class="{ 'shadow-3d-box--interactive': interactive, 'force-active': forceActive, disabled }"
    :style="{ '--shadow-brightness': brightness ?? 0.6, '--shadow-size': small ? '0.25rem' : '0.5rem' }"
  >
    <slot />
  </component>
</template>

<style lang="postcss" scoped>
.shadow-3d-box {
  @apply relative z-[1] mb-[var(--shadow-size)] transition-all;

  &::before {
    @apply absolute inset-0 z-[-1] rounded-[inherit] bg-inherit transition-all content-[''];
  }

  &::after {
    @apply absolute left-0 right-0 top-[var(--shadow-size)] z-[-2] block h-full rounded-[inherit] bg-inherit brightness-[var(--shadow-brightness)] transition-all content-[''];
  }

  &.disabled {
    @apply pointer-events-none grayscale;
  }
}

.shadow-3d-box--interactive {
  @apply cursor-pointer;

  &:active,
  &.force-active,
  &.disabled {
    @apply translate-y-[var(--shadow-size)];

    &::after {
      @apply top-0;
    }
  }
}
</style>
