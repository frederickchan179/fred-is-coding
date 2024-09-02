<script lang="ts" setup>
import '~/assets/styles/app.css'

const { title } = useAppConfig()

useHead({
  title,
  titleTemplate: `%s - ${title}`
})
</script>

<template>
  <Body class="overflow-x-hidden bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage class="flex-1" />
    </NuxtLayout>
  </Body>
</template>
