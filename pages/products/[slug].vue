<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const albums = ref([{
  id: 1,
  title: 'NuhiKun - Directions to Servants',
  slug: 'nuhikun',
  description: 'As of the 29th of October 2021 Nuhikun - Directions to Servants by J • A • Seazer is available.The digital release follows the 19th of October 2021 release of the vinyl version. Devoted Art Propaganda in cooperation with InlanDimensions International Arts Festival present: Soundtrack to Nuhikun - Directions to Servants by legendary, avant-garde Japanese troupe Tenjo Sajiki, composed by J • A • Seazer and directed by Terayama Shuji. The release by Devoted Art Propaganda marks the first official release of music to Tenjo Sajiki\'s performances outside of Japan and first release of Nuhikun - Directions to Servants [read more…]',
  image: 'nuhikun.png',
  price: 20,
}, {
  id: 2,
  title: 'Berliner Vulkan - Wędrowcy Tułacze Zbiegi',
  slug: 'berliner-vulkan',
  description: '"Miga, miga, nie. Miga, miga, tak.',
  image: 'berliner.png',
  price: 21,
}, {
  id: 3,
  title: 'Avidee / Cannibal Troten - Gargowitch',
  slug: 'avidee',
  description: '"Avidee" and "Cannibal Troten" by Gargowitch are OUT NOW on Devoted Art Propaganda. J-case CD. Limited to 100c each. It is a black metal that goes back to the very roots of music and humanity. Gargowitch is the very beginning.',
  image: 'avidee.png',
  price: 10,
}])
const route = useRoute()

const product = computed(() => {
  return albums.value.find((product) => {
    return product.slug === route.params.slug
  })
})
</script>

<template>
  <h2 class="text-4xl text-black ">
    Tytuł :
    {{ product?.title }}
  </h2>
  <img :src="useAssetsMockup(product?.image)" :alt="product?.title">
  <div class="my-8 flex flex-col items-center justify-center">
    <button
      class="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-indigo-200 rounded-lg"
    >
      Add to Basket{{ product?.price }}
    </button>
  </div>
</template>
