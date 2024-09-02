<script lang="ts" setup>
const { title } = useAppConfig()

useHead({
  title,
  titleTemplate: `%s - ${title}`
})
</script>

<template>
  <Body class="bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-200">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
