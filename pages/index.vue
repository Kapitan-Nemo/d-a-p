<template>
  <div class="w-fulll h-20 bg-black my-6 shape">
    <h1 class="text-white text-4xl font-bold h-full flex justify-center items-center pl-5">
      "Pasterz mebli i sprzętów z żelaza, ubrany w prześcieradła"
    </h1>
  </div>
  <section>
    <div class="px-6 flex">
      <img class="h-full" src="@/assets/images/devoted-art-propagadna-logo.png" alt="Devoted Art Propaganda Logo">
      <div class="flex flex-col ml-6">
        <AlbumsFeatured />
      </div>
    </div>
  </section>
  <section>
    <AlbumsCarousel />
  </section>
</template>

<style lang="scss">
.shape {
    clip-path: polygon(5% 0, 100% 0%, 100% 100%, 0 100%);
    margin-left: 120px;
}
.description {
  min-height: 250px;
}
</style>
