let _cachePromise: Promise<Record<string, any>> | null = null

export async function useGetTumblrCache(): Promise<Record<string, any>> {
  if (!_cachePromise) {
    _cachePromise = (async () => {
      try {
        const imported = await import('~/tumblr-cache.json')
        return imported.default as Record<string, any>
      } catch {
        return {}
      }
    })()
  }
  return _cachePromise
}