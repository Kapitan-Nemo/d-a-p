<script setup lang="ts">
const releases = ref([{
  id: 1,
  title: 'NMS 026 Wędrowcy Tułacze Zbiegi "Berliner Vulkan" ltd. 12"MLP',
  description: 'Zabiorę Cię na wojnę z motylami.',
  image: 'berliner-vulkan.png',
}, {
  id: 2,
  title: 'NMS 016 Wędrowcy Tułacze Zbiegi "Światu jest wszystko jedno" 12" ',
  description: '...lecz w brzuchu ziemi do końca wszechświata, żył będę z olbrzymami!',
  image: 'swiatu-jest-wszystko-jedno.png',
}, {
  id: 3,
  title: 'NMS 030 Gruzja "Pierwszy koncert w mieście" ltd. 7"',
  description: 'Gruzja na Cykladach. Gruzja na własnych zasadach. Tylko czysty Grues.',
  image: 'pierwszy-koncert-w-miescie.png',
}, {
  id: 4,
  title: 'NMS 000 DUSZĘ WYPUŚCIŁ "przekrólewszczenie zero" GLP+LP"',
  description: 'Będziemy widzieć takie rzeczy, w kótre i tak nikt nie uwierzy.',
  image: 'przekrolewszczenie-zero.png',
},
{
  id: 5,
  title: 'NMS 029 Koniec Pola "trop" DigiBook ltd. 100"',
  description: 'Zbieraj się, idziemy. Weź nasze. Zostaw swoje.',
  image: 'trop.png',
},
])
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
    Releases
  </h2>
  <div v-for="release in releases" :key="release.id">
    <p>{{ release.title }}</p>
    <p>{{ release.description }}</p>
    <img :src="useAssets(release.image)" :alt="release.title">
  </div>
</template>
