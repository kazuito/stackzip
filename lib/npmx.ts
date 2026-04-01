const NPMX_BASE = "https://npmx.dev";

export function npmxPackageUrl(name: string): string {
  return `${NPMX_BASE}/package/${encodeURIComponent(name)}`;
}

export function npmxKeywordSearchUrl(keyword: string): string {
  return `${NPMX_BASE}/search?q=keyword:${encodeURIComponent(keyword)}`;
}
