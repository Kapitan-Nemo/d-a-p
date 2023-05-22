export default function useAssets(path: string | undefined, mockup?: boolean): string {
  const assets = import.meta.glob('/assets/images/*', {
    eager: true,
    import: 'default',
  })
  const assetsMockup = import.meta.glob('/assets/images/mockup/*', {
    eager: true,
    import: 'default',
  })

  if (mockup)
    return assetsMockup[`/assets/images/mockup/${path}`] as string
  else
    return assets[`/assets/images/${path}`] as string
}
