// TODO: remove

export default function useAssets(path: string, mockup?: boolean) {
  const assets = import.meta.glob('/public/images/*', {
    eager: true,
    import: 'default',
  })
  const assetsMockup = import.meta.glob('/public/images/mockup/*', {
    eager: true,
    import: 'default',
  })

  if (mockup)
    return assetsMockup[`/public/images/mockup/${path}`] as string
  else
    return assets[`/public/images/${path}`] as string
}
