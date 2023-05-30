<script setup lang="ts">
const modal = useModal()
</script>

<!-- TODO: close modal when click outside -->
<template>
  <Transition>
    <div v-show="modal.show" class="absolute bg-white top-10 right-10 w-96 h-auto justify-center items-center p-6 flex flex-col shadow">
      <button class="absolute top-1 right-1 bg-black text-2xl font-bold w-8 h-8 flex items-center justify-center text-white" @click="modal.show = false">
        x
      </button>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
