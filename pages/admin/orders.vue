<script setup lang="ts">
import { collection, getFirestore, onSnapshot } from '@firebase/firestore'
import { deleteDoc, doc } from 'firebase/firestore'
import type { IOrders } from '~/utils/interface'

definePageMeta({
  middleware: [
    'admin',
  ],
})

const orders = ref<IOrders[]>([])
const search = ref('')

onMounted(() => {
  onSnapshot(collection(getFirestore(), 'orders/'), (snap) => {
    orders.value = []
    snap.forEach((doc) => {
      orders.value?.push(doc.data() as IOrders)
    })
  })
  console.log('Here are orders:', orders.value)
})

const filterOrders = computed(() => {
  return orders.value.filter(order => order.orderID.toLowerCase().includes(search.value.toLowerCase()) || order.name.toLowerCase().includes(search.value.toLowerCase()) || order.price.toString().includes(search.value.toLowerCase()) || order.date.toDate().toLocaleDateString().includes(search.value.toLowerCase()) || order.status.toLowerCase().includes(search.value.toLowerCase()) || order.price.toLocaleString().includes(search.value))
})

function editOrder(id: string) {
  const currentorder = orders.value.find(order => order.orderID === id)
  console.log('current order:', currentorder)
}
async function deleteOrder(id: string) {
  await deleteDoc(doc(getFirestore(), 'orders', id)).then(() => {
    useToast('Order deleted successfully', 'success')
  }).catch((error) => {
    console.error('Error removing document: ', error)
    useToast('Error removing document', 'error')
  })
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
          <th scope="col" class="px-6 py-3">
            Order ID
          </th>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Price
          </th>
          <th scope="col" class="px-6 py-3">
            Date
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filterOrders" :key="order.date.nanoseconds">
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
            <span class="rounded-xl bg-amber-700 text-white font-bold px-2 py-1">{{ order.status }}</span>
          </td>
          <td class="px-6 py-4 text-right">
            <button class="mr-6" @click="editOrder(order.orderID)">
              <svg class="text-red-300 " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M1.30351497,32 C0.964845437,32 0.631386209,31.8695275 0.381291787,31.6190204 C-0.00948074544,31.2276031 -0.111081604,30.6300393 0.128592216,30.1316345 L5.18518879,19.6129454 C5.2893948,19.3989706 5.44309866,19.2241375 5.63066948,19.0962745 C5.72966519,18.9736304 5.8338712,18.8535957 5.94849781,18.7439988 L23.1945923,1.46683671 C25.1458498,-0.487640627 28.5429657,-0.490250076 30.4890129,1.46683671 C31.4633391,2.44277065 32,3.73966683 32,5.11745592 C32,6.49524502 31.4607339,7.7921412 30.4864077,8.77068459 L13.2324978,26.0530656 C13.1074506,26.1809286 12.9719828,26.2983538 12.8339098,26.4053412 C12.7140729,26.5775649 12.5577639,26.723694 12.3727982,26.8098058 L1.86883256,31.872137 C1.6890772,31.9556394 1.49629608,32 1.30351497,32 Z M7.36048923,21.1081597 L4.09363085,27.903165 L10.8878626,24.6283064 C10.9425708,24.5708986 10.9972789,24.5187096 11.0598025,24.474349 C11.1744291,24.393456 11.2890558,24.3073442 11.3906566,24.2055757 L28.6445665,6.92319466 C29.1291245,6.43783714 29.3948498,5.79591268 29.3948498,5.11484648 C29.3948498,4.43378027 29.1291245,3.79185581 28.6471717,3.30910774 C27.6832661,2.34361159 26.0029442,2.34622104 25.0364335,3.31171718 L7.78252356,20.5967077 C7.67310725,20.7063045 7.58713729,20.8263392 7.50116734,20.9437644 C7.45948493,21.0011723 7.41259223,21.0559707 7.36048923,21.1081597 Z" /><path d="M12.16638,27.1515152 C11.8050373,27.1515152 11.4436946,27.0131327 11.1670416,26.7391919 L5.2613471,20.8339327 C4.7108641,20.2832271 4.7108641,19.3879773 5.2613471,18.8372717 C5.81183009,18.286566 6.70671783,18.286566 7.25720083,18.8372717 L13.1628953,24.7425309 C13.7133783,25.2932365 13.7133783,26.1884863 13.1628953,26.7391919 C12.8890653,27.0131327 12.5277226,27.1515152 12.16638,27.1515152 Z" /></g></svg>
            </button>
            <button @click="deleteOrder(order.orderID)">
              <svg class="text-red-300" xmlns="http://www.w3.org/2000/svg" width="26" height="35" viewBox="0 0 26 35"><g fill="currentColor"><path d="M20.4515043,35 L5.54849573,35 C3.44555456,35 1.73518186,33.2818129 1.73518186,31.1707297 L1.73518186,9.76815783 C1.73518186,9.36353355 2.06207903,9.03514283 2.46486304,9.03514283 L23.5365963,9.03514283 C23.9393803,9.03514283 24.2662775,9.36353355 24.2662775,9.76815783 L24.2662775,31.1707297 C24.2662775,33.2818129 22.5559048,35 20.4515043,35 Z M3.19308487,10.5011728 L3.19308487,31.1707297 C3.19308487,32.4740303 4.24966322,33.53397 5.54703637,33.53397 L20.4515043,33.53397 C21.7503368,33.53397 22.8054558,32.4740303 22.8054558,31.1707297 L22.8054558,10.5011728 L3.19308487,10.5011728 Z" /><path d="M25.2703188,10.5011728 L0.729681185,10.5011728 C0.326897171,10.5011728 0,10.1727821 0,9.76815783 L0,4.34824495 C0,3.94362068 0.326897171,3.61522996 0.729681185,3.61522996 L25.2703188,3.61522996 C25.6731028,3.61522996 26,3.94362068 26,4.34824495 L26,9.76815783 C26,10.1727821 25.6745622,10.5011728 25.2703188,10.5011728 Z M1.45936237,9.03514283 L24.5406376,9.03514283 L24.5406376,5.08125995 L1.45936237,5.08125995 L1.45936237,9.03514283 Z" /><path d="M18.2157611,5.08125995 L7.78423889,5.08125995 C7.38145487,5.08125995 7.0545577,4.75286923 7.0545577,4.34824495 L7.0545577,0.733014995 C7.0545577,0.328390718 7.38145487,0 7.78423889,0 L18.2157611,0 C18.6185451,0 18.9454423,0.328390718 18.9454423,0.733014995 L18.9454423,4.34824495 C18.9454423,4.75286923 18.6200045,5.08125995 18.2157611,5.08125995 Z M8.51392007,3.61522996 L17.4860799,3.61522996 L17.4860799,1.46602999 L8.51392007,1.46602999 L8.51392007,3.61522996 L8.51392007,3.61522996 Z" /><path d="M.729681185 15.7598224C.326897171 15.7598224 0 15.4314317 0 15.0268074L0 .733014995C0 .328390718.326897171 0 .729681185 0 1.1324652 0 1.45936237.328390718 1.45936237.733014995L1.45936237 15.0268074C1.45936237 15.4314317 1.1324652 15.7598224.729681185 15.7598224ZM5.9454423 15.7598224C5.54265828 15.7598224 5.21576111 15.4314317 5.21576111 15.0268074L5.21576111.733014995C5.21576111.328390718 5.54265828 0 5.9454423 0 6.34822631 0 6.67512348.328390718 6.67512348.733014995L6.67512348 15.0268074C6.67512348 15.4314317 6.34822631 15.7598224 5.9454423 15.7598224ZM11.1612034 15.7598224C10.7584194 15.7598224 10.4315222 15.4314317 10.4315222 15.0268074L10.4315222.733014995C10.4315222.328390718 10.7584194 0 11.1612034 0 11.5639874 0 11.8908846.328390718 11.8908846.733014995L11.8908846 15.0268074C11.8908846 15.4314317 11.5654468 15.7598224 11.1612034 15.7598224Z" transform="translate(7.055 14.138)" /></g></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
