<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <AdminNav />
      <AdminAside />
    </NuxtLayout>
  </div>
</template>
