<script setup lang="ts">
const modal = useModal()
</script>

<template>
  <div v-show="modal.show" class="absolute bg-white top-10 right-10 w-96 h-96 justify-between p-6 flex flex-col shadow">
    <div class="modal-body">
      <slot />
    </div>
    <div class="modal-footer">
      <button @click="modal.show = false">
        Close
      </button>
    </div>
  </div>
</template>
