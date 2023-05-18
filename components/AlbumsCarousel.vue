<script setup lang="ts">
const releases = ref([{
  id: 1,
  title: 'NMS 026 Wędrowcy Tułacze Zbiegi "Berliner Vulkan" ltd. 12"MLP',
  description: 'Zabiorę Cię na wojnę z motylami.',
  image: 'berliner-vulkan.png',
  quantity: 0,
}, {
  id: 2,
  title: 'NMS 016 Wędrowcy Tułacze Zbiegi "Światu jest wszystko jedno" 12" ',
  description: '...lecz w brzuchu ziemi do końca wszechświata, żył będę z olbrzymami!',
  image: 'swiatu-jest-wszystko-jedno.png',
  quantity: 100,
}, {
  id: 3,
  title: 'NMS 030 Gruzja "Pierwszy koncert w mieście" ltd. 7"',
  description: 'Gruzja na Cykladach. Gruzja na własnych zasadach. Tylko czysty Grues.',
  image: 'pierwszy-koncert-w-miescie.png',
  quantity: 2,
}, {
  id: 4,
  title: 'NMS 000 DUSZĘ WYPUŚCIŁ "przekrólewszczenie zero" GLP+LP"',
  description: 'Będziemy widzieć takie rzeczy, w kótre i tak nikt nie uwierzy.',
  image: 'przekrolewszczenie-zero.png',
  quantity: 9,
},
{
  id: 5,
  title: 'NMS 036 ODRAZA "Rzeczom" tape ltd. 150',
  description: 'Dziś staram się bardzo nie starać, Dziś staram się raczej nie dawać',
  image: 'rzeczom.png',
  quantity: 25,
},
{
  id: 6,
  title: 'NMS 029 Koniec Pola "trop" DigiBook ltd. 100"',
  description: 'Zbieraj się, idziemy. Weź nasze. Zostaw swoje.',
  image: 'trop.png',
  quantity: 55,
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
  <div class="px-6 pt-20">
    <h2 class="text-4xl font-bold mb-6">
      Releases
    </h2>

    <Swiper
      :slides-per-view="5"
      :space-between="50"
    >
      <SwiperControls />

      <SwiperSlide v-for="(release, idx) in releases" :key="idx">
        <div>
          <span class="relative">
            <p class="bg-white text-bold text-black py-3 px-5 absolute mt-2 ml-2" :class="release.quantity <= 10 ? 'text-red-700' : ' text-black' ">{{ release.quantity < 10 && release.quantity > 0 ? 'last copies' : release.quantity <= 0 ? 'sold out' : 'out now' }}</p>
            <img class="mb-3" :src="useAssets(release.image)" :alt="release.title">
          </span>
          <p class="font-bold mb-1">
            {{ release.title }}
          </p>
          <p>
            {{ release.description }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss">
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}
</style>
