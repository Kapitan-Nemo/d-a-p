<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: [
    'admin',
  ],
})

const route = useRoute()
</script>

<template>
  <NuxtLayout name="admin">
    <AdminNav class="border-b border-dark-200" />
    <div class="flex bg-dark-100">
      <AdminAside class="border-r border-dark-200" />
      <div class="p-6 w-full">
        <div v-if="route.name === 'admin'">
          <p class="text-white">
            Content Dashboard for boxes
          </p>
        </div>
        <NuxtPage v-else />
      </div>
    </div>
  </NuxtLayout>
</template>
