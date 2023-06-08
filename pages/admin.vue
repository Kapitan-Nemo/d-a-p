<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="admin">
    <AdminNav class="border-b border-dark-200" />
    <div class="flex">
      <AdminAside class="border-r border-dark-200" />
      <div class="p-6 w-full bg-dark-100">
        <p class="text-white">
          Content
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
