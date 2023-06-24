<script setup lang="ts">
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import type { IOrders } from '~/utils/interface'

definePageMeta({
  middleware: [
    'admin',
  ],
})

const orders = ref<IOrders[]>([])
const search = ref('')

onMounted(() => {
  console.log('mounted')
  onSnapshot(collection(getFirestore(), 'orders/'), (snap) => {
    console.log(snap.docs)
    // orders.value = []
    snap.forEach((doc) => {
      orders.value?.push(doc.data() as IOrders)
    })
  })
  console.log('Here are orders:', orders.value)
})

const filterOrders = computed(() => {
  return orders.value.filter(order => order.name.toLowerCase().includes(search.value.toLowerCase()))
})

// function sortByColumn(e: Event, column: string) {
//   const direction = ((e.target as HTMLButtonElement).getAttribute('data-dir'))

//   // Clean all data-dir attributes values
//   if (direction === '') {
//     document.querySelectorAll('th').forEach((c) => {
//       c.setAttribute('data-dir', '')
//     })
//   }
//   direction === 'asc'
//     ? products.value.sort((a, b) => ((column === 'title' ? a.title > b.title : column === 'price' ? a.price > b.price : a.quantityInWarehouse > b.quantityInWarehouse) ? 1 : -1)) && (e.target as HTMLButtonElement).setAttribute('data-dir', 'desc')
//     : products.value.sort((a, b) => ((column === 'title' ? a.title < b.title : column === 'price' ? a.price < b.price : a.quantityInWarehouse < b.quantityInWarehouse) ? 1 : -1)) && (e.target as HTMLButtonElement).setAttribute('data-dir', 'asc')
// }
function editOrder() {
  console.log('edit order')
}
</script>

<template>
  <div class="flex justify-between">
    <input id="search" v-model="search" placeholder="Search product" class="w-1/2 px-3 py-3 mb-3 border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="search">
  </div>

  <div class="relative overflow-x-auto shadow-md">
    <table class="w-full text-sm text-left text-white">
      <thead class="text-xs uppercase bg-dark-200 text-white">
        <tr>
          <!-- <th data-dir="" scope="col" class="px-6 py-3">
            Photo
          </th> -->
          <th data-dir="" scope="col" class="px-6 py-3">
            Order ID
          </th>
          <th data-dir="" scope="col" class="px-6 py-3">
            Name
          </th>
          <th data-dir="" scope="col" class="px-6 py-3">
            Price
          </th>
          <th data-dir="" scope="col" class="px-6 py-3">
            Date
          </th>
          <th data-dir="" scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filterOrders" :key="order.date.nanoseconds">
          <!-- <th scope="row" class="px-6 py-4">
            <img class="w-16 h-16 rounded-full" :src="product.image" :alt="product.title">
          </th> -->
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
            {{ order.orderID }}
          </th>
          <td class="px-6 py-4">
            {{ order.name }}
          </td>
          <td class="px-6 py-4">
            {{ order.price }}
          </td>
          <td class="px-6 py-4">
            {{ order.date.toDate().toLocaleDateString() }}
          </td>
          <td class="px-6 py-4">
            {{ order.status }}
          </td>
          <td class="px-6 py-4 text-right">
            <button class="mr-6" @click="editOrder">
              <svg class="text-red-300 " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M1.30351497,32 C0.964845437,32 0.631386209,31.8695275 0.381291787,31.6190204 C-0.00948074544,31.2276031 -0.111081604,30.6300393 0.128592216,30.1316345 L5.18518879,19.6129454 C5.2893948,19.3989706 5.44309866,19.2241375 5.63066948,19.0962745 C5.72966519,18.9736304 5.8338712,18.8535957 5.94849781,18.7439988 L23.1945923,1.46683671 C25.1458498,-0.487640627 28.5429657,-0.490250076 30.4890129,1.46683671 C31.4633391,2.44277065 32,3.73966683 32,5.11745592 C32,6.49524502 31.4607339,7.7921412 30.4864077,8.77068459 L13.2324978,26.0530656 C13.1074506,26.1809286 12.9719828,26.2983538 12.8339098,26.4053412 C12.7140729,26.5775649 12.5577639,26.723694 12.3727982,26.8098058 L1.86883256,31.872137 C1.6890772,31.9556394 1.49629608,32 1.30351497,32 Z M7.36048923,21.1081597 L4.09363085,27.903165 L10.8878626,24.6283064 C10.9425708,24.5708986 10.9972789,24.5187096 11.0598025,24.474349 C11.1744291,24.393456 11.2890558,24.3073442 11.3906566,24.2055757 L28.6445665,6.92319466 C29.1291245,6.43783714 29.3948498,5.79591268 29.3948498,5.11484648 C29.3948498,4.43378027 29.1291245,3.79185581 28.6471717,3.30910774 C27.6832661,2.34361159 26.0029442,2.34622104 25.0364335,3.31171718 L7.78252356,20.5967077 C7.67310725,20.7063045 7.58713729,20.8263392 7.50116734,20.9437644 C7.45948493,21.0011723 7.41259223,21.0559707 7.36048923,21.1081597 Z" /><path d="M12.16638,27.1515152 C11.8050373,27.1515152 11.4436946,27.0131327 11.1670416,26.7391919 L5.2613471,20.8339327 C4.7108641,20.2832271 4.7108641,19.3879773 5.2613471,18.8372717 C5.81183009,18.286566 6.70671783,18.286566 7.25720083,18.8372717 L13.1628953,24.7425309 C13.7133783,25.2932365 13.7133783,26.1884863 13.1628953,26.7391919 C12.8890653,27.0131327 12.5277226,27.1515152 12.16638,27.1515152 Z" /></g></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
