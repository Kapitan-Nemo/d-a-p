<template>
  <Header :cart-link="true">
    "Pasterz mebli i sprzętów z żelaza, ubrany w prześcieradła"
  </Header>
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
