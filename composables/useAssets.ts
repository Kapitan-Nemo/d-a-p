export default function useAssets(path: string | undefined): string {
  const assets = import.meta.glob('/assets/images/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets[`/assets/images/${path}`]
}

// TODO: auto import throw error  -  https://github.com/nuxt/nuxt/issues/20827
