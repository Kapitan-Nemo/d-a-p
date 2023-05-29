<script setup lang="ts">
const modal = useModal()
</script>

<!-- TODO: close modal when click outside -->
<template>
  <div v-show="modal.show" class="absolute bg-white top-10 right-10 w-96 h-96 justify-center items-center p-6 flex flex-col shadow">
    <button class="absolute top-1 right-1 bg-black text-2xl font-bold w-8 h-8 flex items-center justify-center text-white" @click="modal.show = false">
      x
    </button>
    <div class="modal-body">
      <slot />
    </div>
  </div>
</template>
