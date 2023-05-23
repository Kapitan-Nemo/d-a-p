<template>
  <Header :cart-link="true">
    "Pasterz mebli i sprzętów z żelaza, ubrany w prześcieradła"
  </Header>
  <section>
    <div class="px-6 flex flex-col 2xl:flex-row">
      <img class="hidden 2xl:block mb-3 2xl:mb-0" src="@/assets/images/devoted-art-propagadna-logo.png" alt="Devoted Art Propaganda Logo">
      <div class="flex flex-col lg:ml-6 ">
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
  @media (min-width: 1024px) {
    clip-path: polygon(5% 0, 100% 0%, 100% 100%, 0 100%);
    margin-left: 120px;
    }
}
.description {
  min-height: 250px;
}
</style>
