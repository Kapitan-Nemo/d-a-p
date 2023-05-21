export default function useAssetsMockup(path: string | undefined): string {
  const assets = import.meta.glob('/assets/images/mockup/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/images/mockup/${path}`]
}

// TODO: auto import throw error  -  https://github.com/nuxt/nuxt/issues/20827
