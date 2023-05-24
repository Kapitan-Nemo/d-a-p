<script setup>
onMounted(async () => {
  await useFire()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
