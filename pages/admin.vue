<script setup lang="ts">
definePageMeta({
  layout: false,
})
const route = useRoute()
console.log(route.name)
</script>

<template>
  <NuxtLayout name="admin">
    <AdminNav class="border-b border-dark-200" />
    <div class="flex">
      <AdminAside class="border-r border-dark-200" />
      <div class="p-6 w-full bg-dark-100">
        <div v-if="route.name === 'admin'" class="text-white">
          Content Dashboard for boxes
        </div>
        <NuxtPage v-else />
      </div>
    </div>
  </NuxtLayout>
</template>
