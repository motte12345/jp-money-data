// Cloudflare Pages Functions middleware.
// 旧 *.pages.dev の既定URL をカスタムドメインへ 301（canonical はヒント、301 は指示）。
// カスタムドメインは ".pages.dev" で終わらないため素通り＝ループしない。

const CUSTOM_DOMAIN = 'jp-money-data.com';

export function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = CUSTOM_DOMAIN;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
