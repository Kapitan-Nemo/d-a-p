<script setup lang="ts">
</script>

<template>
  <nav class="fixed z-30 w-full bg-black">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <div class="flex ml-2">
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">D-A-P</span>
          </div>
        </div>
        <div class="flex items-center">
          <button type="button" class="p-2 text-red-400 rounded-lg">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
          </button>

          <div class="flex items-center ml-3">
            <button type="button" class="flex">
              <img class="w-8 h-8" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
