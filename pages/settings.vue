<script setup lang="ts">
const auth = useAuth()
</script>

<template>
  <Header :cart-link="true">
    Settings
  </Header>
  <div class="default-height px-6">
    <p>User name: {{ auth.userName }}</p>
    <p>User email: {{ auth.userEmail }}</p>
    <p>User id: {{ auth.userId }}</p>
  </div>
</template>
