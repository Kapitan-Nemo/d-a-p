<script setup lang="ts">
const auth = useAuth()
</script>

<template>
  <Header :cart-link="true">
    Settings
  </Header>
  <div class="default-height px-6">
    <ClientOnly>
      <p>User name: {{ auth.userName }}</p>
      <p>User Last name: {{ auth.userLastName }}</p>
      <p>User street: {{ auth.userStreet }}</p>
      <p>User city: {{ auth.userCity }}</p>
      <p>User zip code: {{ auth.userZipCode }}</p>
      <p>User phone: {{ auth.userPhone }}</p>
      <p>User email: {{ auth.userEmail }}</p>
      <p>User id: {{ auth.userId }}</p>
    </ClientOnly>
  </div>
</template>
