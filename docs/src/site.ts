export const SITE = 'https://jp-money-data.com'
export const NPM = 'jp-money-data'
export const CDN_BASE = 'https://cdn.jsdelivr.net/npm/jp-money-data@0/data'

/** データセットの生JSON（jsDelivr）URL。folder は meta.category と一致する。 */
export function cdnJsonUrl(category: string, id: string): string {
  return `${CDN_BASE}/${category}/${id}.json`
}

/** データセットの const 名（camelCase）。npm import 例の表示に使う。 */
export function camelId(id: string): string {
  return id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
}
