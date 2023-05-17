<script setup lang="ts">
const albums = ref([{
  id: 1,
  title: 'NuhiKun - Directions to Servants',
  description: 'As of the 29th of October 2021 Nuhikun - Directions to Servants by J • A • Seazer is available.The digital release follows the 19th of October 2021 release of the vinyl version. Devoted Art Propaganda in cooperation with InlanDimensions International Arts Festival present: Soundtrack to Nuhikun - Directions to Servants by legendary, avant-garde Japanese troupe Tenjo Sajiki, composed by J • A • Seazer and directed by Terayama Shuji. The release by Devoted Art Propaganda marks the first official release of music to Tenjo Sajiki\'s performances outside of Japan and first release of Nuhikun - Directions to Servants [read more…]',
  image: 'nuhikun.png',
}, {
  id: 2,
  title: 'Futurista - Wędrowcy Tułacze Zbiegi',
  description: '"Futurista" by Wędrowcy Tułacze Zbiegi is now SOLD OUT. "Futurista" is a 15-chapter story about the life of a man, who becomes an animal just like the ones he used to skin. The record comes as 12" vinyl with a A5 booklet. You can still listen to it here',
  image: 'futurista.png',
}, {
  id: 3,
  title: 'Avidee / Cannibal Troten - Gargowitch',
  description: '"Avidee" and "Cannibal Troten" by Gargowitch are OUT NOW on Devoted Art Propaganda. J-case CD. Limited to 100c each. It is a black metal that goes back to the very roots of music and humanity. Gargowitch is the very beginning.',
  image: 'avidee.png',
}])

// TODO: move to composables when this bug will be fixed:
// https://github.com/nuxt/nuxt/issues/20827
function useAssets(path: string): string {
  const assets = import.meta.glob('/assets/images/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/images/${path}`]
}
</script>

<template>
  <h2 class="text-4xl font-bold mb-6">
    December 2021
  </h2>
  <div v-for="album in albums" :key="album.id" class="mb-6">
    <div class="flex items-start">
      <img :src="useAssets(album.image)" :alt="album.title">
      <div class="ml-6 leading-4 description flex flex-col justify-between ">
        {{ album.description }}
        <div class="flex mt-6">
          <button class=" px-8 py-2 text-3xl bg-black font-bold text-white rounded-none">
            order
          </button>
          <button class="px-8 py-2 text-3xl  ml-6 bg-white border-4 border-black font-bold text-black rounded-none">
            listen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
