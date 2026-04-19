let _cache: Record<string, any> | null = null

export async function useGetTumblrCache(): Promise<Record<string, any>> {
  if (_cache !== null) return _cache
  try {
    const imported = await import('~/tumblr-cache.json')
    _cache = imported.default as Record<string, any>
  } catch {
    _cache = {}
  }
  return _cache
}