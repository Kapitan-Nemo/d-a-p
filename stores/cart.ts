import type IAlbums from '~/components/constants/interface'

export const useCart = defineStore('cart', {
  state: () => ({
    albums: [{
      id: 0,
      title: 'NuhiKun - Directions to Servants',
      slug: 'nuhikun',
      description: 'As of the 29th of October 2021 Nuhikun - Directions to Servants by J • A • Seazer is available.The digital release follows the 19th of October 2021 release of the vinyl version. Devoted Art Propaganda in cooperation with InlanDimensions International Arts Festival present: Soundtrack to Nuhikun - Directions to Servants by legendary, avant-garde Japanese troupe Tenjo Sajiki, composed by J • A • Seazer and directed by Terayama Shuji. The release by Devoted Art Propaganda marks the first official release of music to Tenjo Sajiki\'s performances outside of Japan and first release of Nuhikun - Directions to Servants [read more…]',
      image: 'nuhikun.png',
      quantity: 100,
      quantityInCart: 0,
      price: 20,
      featured: true,
    }, {
      id: 1,
      title: 'Futurista - Wędrowcy Tułacze Zbiegi',
      slug: 'futurista',
      description: '"Futurista" by Wędrowcy Tułacze Zbiegi is now SOLD OUT. "Futurista" is a 15-chapter story about the life of a man, who becomes an animal just like the ones he used to skin. The record comes as 12" vinyl with a A5 booklet. You can still listen to it here',
      image: 'futurista.png',
      quantity: 0,
      quantityInCart: 0,
      price: 10,
      featured: true,
    },
    {
      id: 2,
      title: 'Avidee / Cannibal Troten - Gargowitch',
      slug: 'avidee',
      description: '"Avidee" and "Cannibal Troten" by Gargowitch are OUT NOW on Devoted Art Propaganda. J-case CD. Limited to 100c each. It is a black metal that goes back to the very roots of music and humanity. Gargowitch is the very beginning.',
      image: 'avidee.png',
      quantity: 0,
      quantityInCart: 0,
      price: 12,
      featured: true,
    },
    {
      id: 3,
      title: 'NMS 026 Wędrowcy Tułacze Zbiegi "Berliner Vulkan" ltd. 12"MLP',
      slug: 'berliner-vulkan',
      description: 'Zabiorę Cię na wojnę z motylami.',
      image: 'berliner-vulkan.png',
      quantity: 0,
      quantityInCart: 0,
      price: 15,
      featured: false,
    }, {
      id: 4,
      title: 'NMS 016 Wędrowcy Tułacze Zbiegi "Światu jest wszystko jedno" 12" ',
      slug: 'swiatu-jest-wszystko-jedno',
      description: '...lecz w brzuchu ziemi do końca wszechświata, żył będę z olbrzymami!',
      image: 'swiatu-jest-wszystko-jedno.png',
      quantity: 100,
      quantityInCart: 0,
      price: 35,
      featured: false,
    }, {
      id: 5,
      title: 'NMS 030 Gruzja "Pierwszy koncert w mieście" ltd. 7"',
      slug: 'pierwszy-koncert-w-miescie',
      description: 'Gruzja na Cykladach. Gruzja na własnych zasadach. Tylko czysty Grues.',
      image: 'pierwszy-koncert-w-miescie.png',
      quantity: 2,
      quantityInCart: 0,
      price: 5,
      featured: false,
    }, {
      id: 6,
      title: 'NMS 000 DUSZĘ WYPUŚCIŁ "przekrólewszczenie zero" GLP+LP"',
      slug: 'przekrolewszczenie-zero',
      description: 'Będziemy widzieć takie rzeczy, w kótre i tak nikt nie uwierzy.',
      image: 'przekrolewszczenie-zero.png',
      quantity: 9,
      quantityInCart: 0,
      price: 33,
      featured: false,
    },
    {
      id: 7,
      title: 'NMS 036 ODRAZA "Rzeczom" tape ltd. 150',
      slug: 'rzeczom',
      description: 'Dziś staram się bardzo nie starać, Dziś staram się raczej nie dawać',
      image: 'rzeczom.png',
      quantity: 25,
      quantityInCart: 0,
      price: 7,
      featured: false,
    },
    {
      id: 8,
      title: 'NMS 029 Koniec Pola "trop" DigiBook ltd. 100"',
      slug: 'trop',
      description: 'Zbieraj się, idziemy. Weź nasze. Zostaw swoje.',
      image: 'trop.png',
      quantity: 55,
      quantityInCart: 0,
      price: 23,
      featured: false,
    }],
    cart: [] as IAlbums[],
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot))
