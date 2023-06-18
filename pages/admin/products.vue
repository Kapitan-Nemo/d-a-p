<script setup lang="ts">
import { collection, doc, getFirestore, onSnapshot, updateDoc } from '@firebase/firestore'
import type IAlbum from '~/components/constants/interface'
import DEFAULT_PRODUCT from '~/utils/constants'

definePageMeta({
  middleware: [
    'admin',
  ],
})

const products = ref<IAlbum[]>([])
const selectedProducts = ref<IAlbum[]>([])
const selectedAll = ref(false)
const currentEdit = ref<IAlbum>(DEFAULT_PRODUCT)
const editMode = ref(false)
const search = ref('')

onMounted(async () => {
  products.value = []
  onSnapshot(collection(getFirestore(), 'albums/'), (snap) => {
    snap.forEach((doc) => {
      products.value?.push(doc.data() as IAlbum)
    })
  })
})

const filterProducts = computed(() => {
  return products.value.filter(product => product.title.toLowerCase().includes(search.value.toLowerCase()))
})

// function deleteProduct(id: string) {
//   updateDoc(doc(getFirestore(), 'albums', id), {
//     deleted: true,
//   }).then(() => {
//     useToast('Product deleted successfully', 'success')
//   }).catch((error) => {
//     console.error('Error updating document: ', error)
//     useToast('Error updating document', 'error')
//   })
// }

function selectAll() {
  selectedAll.value ? selectedProducts.value = [] : selectedProducts.value = products.value as IAlbum[]
  selectedAll.value = !selectedAll.value
}

function sortByColumn(e: Event, column: string) {
  const direction = ((e.target as HTMLButtonElement).getAttribute('data-dir'))

  // Clean all data-dir attributes values
  if (direction === '') {
    document.querySelectorAll('th').forEach((c) => {
      c.setAttribute('data-dir', '')
    })
  }
  direction === 'asc'
    ? products.value.sort((a, b) => ((column === 'title' ? a.title > b.title : column === 'price' ? a.price > b.price : a.quantityInWarehouse > b.quantityInWarehouse) ? 1 : -1)) && (e.target as HTMLButtonElement).setAttribute('data-dir', 'desc')
    : products.value.sort((a, b) => ((column === 'title' ? a.title < b.title : column === 'price' ? a.price < b.price : a.quantityInWarehouse < b.quantityInWarehouse) ? 1 : -1)) && (e.target as HTMLButtonElement).setAttribute('data-dir', 'asc')
}

function editProduct(product: IAlbum) {
  currentEdit.value = product
  editMode.value = !editMode.value
}

watch(() => editMode.value, () => {
  editMode.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})

async function updateProduct(id: string) {
  await updateDoc(doc(getFirestore(), 'albums', id), {
    ...currentEdit.value,
  }).then(() => {
    useToast('Product updated successfully', 'success')
  }).catch((error) => {
    console.error('Error updating document: ', error)
    useToast('Error updating document', 'error')
  })
}
</script>

<template>
  <input v-model="search" class="mb-3  border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="search">
  <div class="relative overflow-x-auto shadow-md">
    <table class="w-full text-sm text-left text-white">
      <thead class="text-xs uppercase bg-dark-200 text-white">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all" v-model="selectedAll" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " @click="selectAll">
            </div>
          </th>
          <th data-dir="" scope="col" class="px-6 py-3" @click="sortByColumn($event, 'title')">
            Product name
          </th>
          <th data-dir="" scope="col" class="px-6 py-3" @click="sortByColumn($event, 'price')">
            Price
          </th>
          <th data-dir="" scope="col" class="px-6 py-3" @click="sortByColumn($event, 'stock')">
            Stock
          </th>
          <th scope="col" class="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filterProducts" :key="product.id">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input :id="product.title" v-model="selectedProducts" :value="product" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
          </td>
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
            {{ product.title }}
          </th>
          <td class="px-6 py-4">
            {{ product.price }}
          </td>
          <td class="px-6 py-4">
            {{ product.quantityInWarehouse }}
          </td>
          <td class="px-6 py-4">
            <button class="mr-6" @click="editProduct(product)">
              <svg class="text-red-300 " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M1.30351497,32 C0.964845437,32 0.631386209,31.8695275 0.381291787,31.6190204 C-0.00948074544,31.2276031 -0.111081604,30.6300393 0.128592216,30.1316345 L5.18518879,19.6129454 C5.2893948,19.3989706 5.44309866,19.2241375 5.63066948,19.0962745 C5.72966519,18.9736304 5.8338712,18.8535957 5.94849781,18.7439988 L23.1945923,1.46683671 C25.1458498,-0.487640627 28.5429657,-0.490250076 30.4890129,1.46683671 C31.4633391,2.44277065 32,3.73966683 32,5.11745592 C32,6.49524502 31.4607339,7.7921412 30.4864077,8.77068459 L13.2324978,26.0530656 C13.1074506,26.1809286 12.9719828,26.2983538 12.8339098,26.4053412 C12.7140729,26.5775649 12.5577639,26.723694 12.3727982,26.8098058 L1.86883256,31.872137 C1.6890772,31.9556394 1.49629608,32 1.30351497,32 Z M7.36048923,21.1081597 L4.09363085,27.903165 L10.8878626,24.6283064 C10.9425708,24.5708986 10.9972789,24.5187096 11.0598025,24.474349 C11.1744291,24.393456 11.2890558,24.3073442 11.3906566,24.2055757 L28.6445665,6.92319466 C29.1291245,6.43783714 29.3948498,5.79591268 29.3948498,5.11484648 C29.3948498,4.43378027 29.1291245,3.79185581 28.6471717,3.30910774 C27.6832661,2.34361159 26.0029442,2.34622104 25.0364335,3.31171718 L7.78252356,20.5967077 C7.67310725,20.7063045 7.58713729,20.8263392 7.50116734,20.9437644 C7.45948493,21.0011723 7.41259223,21.0559707 7.36048923,21.1081597 Z" /><path d="M12.16638,27.1515152 C11.8050373,27.1515152 11.4436946,27.0131327 11.1670416,26.7391919 L5.2613471,20.8339327 C4.7108641,20.2832271 4.7108641,19.3879773 5.2613471,18.8372717 C5.81183009,18.286566 6.70671783,18.286566 7.25720083,18.8372717 L13.1628953,24.7425309 C13.7133783,25.2932365 13.7133783,26.1884863 13.1628953,26.7391919 C12.8890653,27.0131327 12.5277226,27.1515152 12.16638,27.1515152 Z" /></g></svg>
            </button>
            <button>
              <svg class="text-red-300" xmlns="http://www.w3.org/2000/svg" width="26" height="35" viewBox="0 0 26 35"><g fill="currentColor"><path d="M20.4515043,35 L5.54849573,35 C3.44555456,35 1.73518186,33.2818129 1.73518186,31.1707297 L1.73518186,9.76815783 C1.73518186,9.36353355 2.06207903,9.03514283 2.46486304,9.03514283 L23.5365963,9.03514283 C23.9393803,9.03514283 24.2662775,9.36353355 24.2662775,9.76815783 L24.2662775,31.1707297 C24.2662775,33.2818129 22.5559048,35 20.4515043,35 Z M3.19308487,10.5011728 L3.19308487,31.1707297 C3.19308487,32.4740303 4.24966322,33.53397 5.54703637,33.53397 L20.4515043,33.53397 C21.7503368,33.53397 22.8054558,32.4740303 22.8054558,31.1707297 L22.8054558,10.5011728 L3.19308487,10.5011728 Z" /><path d="M25.2703188,10.5011728 L0.729681185,10.5011728 C0.326897171,10.5011728 0,10.1727821 0,9.76815783 L0,4.34824495 C0,3.94362068 0.326897171,3.61522996 0.729681185,3.61522996 L25.2703188,3.61522996 C25.6731028,3.61522996 26,3.94362068 26,4.34824495 L26,9.76815783 C26,10.1727821 25.6745622,10.5011728 25.2703188,10.5011728 Z M1.45936237,9.03514283 L24.5406376,9.03514283 L24.5406376,5.08125995 L1.45936237,5.08125995 L1.45936237,9.03514283 Z" /><path d="M18.2157611,5.08125995 L7.78423889,5.08125995 C7.38145487,5.08125995 7.0545577,4.75286923 7.0545577,4.34824495 L7.0545577,0.733014995 C7.0545577,0.328390718 7.38145487,0 7.78423889,0 L18.2157611,0 C18.6185451,0 18.9454423,0.328390718 18.9454423,0.733014995 L18.9454423,4.34824495 C18.9454423,4.75286923 18.6200045,5.08125995 18.2157611,5.08125995 Z M8.51392007,3.61522996 L17.4860799,3.61522996 L17.4860799,1.46602999 L8.51392007,1.46602999 L8.51392007,3.61522996 L8.51392007,3.61522996 Z" /><path d="M.729681185 15.7598224C.326897171 15.7598224 0 15.4314317 0 15.0268074L0 .733014995C0 .328390718.326897171 0 .729681185 0 1.1324652 0 1.45936237.328390718 1.45936237.733014995L1.45936237 15.0268074C1.45936237 15.4314317 1.1324652 15.7598224.729681185 15.7598224ZM5.9454423 15.7598224C5.54265828 15.7598224 5.21576111 15.4314317 5.21576111 15.0268074L5.21576111.733014995C5.21576111.328390718 5.54265828 0 5.9454423 0 6.34822631 0 6.67512348.328390718 6.67512348.733014995L6.67512348 15.0268074C6.67512348 15.4314317 6.34822631 15.7598224 5.9454423 15.7598224ZM11.1612034 15.7598224C10.7584194 15.7598224 10.4315222 15.4314317 10.4315222 15.0268074L10.4315222.733014995C10.4315222.328390718 10.7584194 0 11.1612034 0 11.5639874 0 11.8908846.328390718 11.8908846.733014995L11.8908846 15.0268074C11.8908846 15.4314317 11.5654468 15.7598224 11.1612034 15.7598224Z" transform="translate(7.055 14.138)" /></g></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- drawer component -->
  <div :class="editMode ? 'transform-none' : '-translate-x-full'" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-dark-200">
    <h5 class="inline-flex items-center mb-4 text-base font-semibold text-white">
      <svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>Info
    </h5>
    <button type="button" class="text-white hover:bg-dark-100 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" @click="editMode = !editMode">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
    </button>
    <div class="flex flex-col">
      <label class="font-bold text-white text-xl">Title:</label>
      <textarea v-model="currentEdit.title" rows="3" cols="40" class="mb-3 w-full border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="textarea" />
      <label class="font-bold text-white text-xl">Description:</label>
      <textarea v-model="currentEdit.description" rows="3" cols="40" class="mb-3 w-full border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="textarea" />
      <label class="font-bold text-white text-xl">Price:</label>
      <input v-model="currentEdit.price" class="mb-3 w-full border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none" type="text">
      <label class="font-bold text-white text-xl">Quantity:</label>
      <input v-model="currentEdit.quantityInWarehouse" class="mb-3 w-full border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none" type="text">
      <label class="font-bold text-white text-xl">Feautred:</label>
      <div class="flex justify-start items-center mb-3">
        <input id="featured" v-model="currentEdit.featured" type="checkbox" class="border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none">
        <label for="featured" class="text-white ml-3">{{ currentEdit.featured ? 'YES' : 'NO' }}</label>
      </div>

      <!-- TODO:  image uploader -->
      <label class="font-bold text-white text-xl">Image:</label>
      <img :src="`/images/${currentEdit.image}`" alt="product image">
      <button class="update-product bg-black text-white font-bold py-2 px-4 rounded" @click="updateProduct(currentEdit.id)">
        Update
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-product {
  position: fixed;
  bottom: 10px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
