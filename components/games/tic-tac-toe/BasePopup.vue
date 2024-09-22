<script lang="ts" setup>
defineProps<{
  open: boolean
  close?: () => void
}>()

const content = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!content.value) return

  onClickOutside(content.value, () => {
    close?.()
  })
})
</script>

<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center" :class="{ 'pointer-events-none': !open }">
    <!-- Backdrop -->
    <Transition>
      <div v-if="open" class="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
    </Transition>

    <!-- Content -->
    <Transition>
      <div
        v-if="open"
        ref="content"
        class="absolute z-[1] flex w-full items-center justify-center bg-[var(--color-cell-bg)] px-6 py-9 md:p-12"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
