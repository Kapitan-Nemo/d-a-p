<script setup lang="ts">
import type IAlbum from '~/components/constants/interface'

definePageMeta({
  middleware: [
    'admin',
  ],
})
const { data: albums } = await useFetch('/api/albums')
const selectedProducts = ref([] as IAlbum[])
const selectedAll = ref(false)

function selectAll() {
  selectedAll.value ? selectedProducts.value = [] : selectedProducts.value = albums.value as IAlbum[]
  selectedAll.value = !selectedAll.value
}
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all" v-model="selectedAll" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " @click="selectAll">
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            Product name
          </th>
          <th scope="col" class="px-6 py-3">
            Category
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            Stock
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in albums" :key="product.id">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input :id="product.title" v-model="selectedProducts" :value="product" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ product.title }}
          </th>
          <td class="px-6 py-4">
            Category
          </td>
          <td class="px-6 py-4">
            {{ product.price }}
          </td>
          <td class="px-6 py-4">
            {{ product.quantityInWarehouse }}
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
