/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

// Viteがビルドした静的ファイルのリストをここに注入してキャッシュ
declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

const DATA_CACHE_NAME = 'google-earth-data-v1';
const DATA_KEY = 'latest-photo-json';

self.addEventListener('fetch', (event: FetchEvent) => {
    const url = new URL(event.request.url);

    // gstaticのJSONリクエストのみをインターセプト
    if (url.origin === 'https://www.gstatic.com' && url.pathname.includes('.json')) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(DATA_CACHE_NAME);

                // 1. 保存済みの「前回の1枚」を探す
                const cachedResponse = await cache.match(DATA_KEY);

                // 2. 通信を開始して「次回の1枚」を準備
                const fetchPromise = fetch(event.request).then(async (networkResponse) => {
                    if (networkResponse.ok) {
                        // 次回のために今回の結果で上書き保存
                        await cache.put(DATA_KEY, networkResponse.clone());
                    }
                    return networkResponse;
                });

                // キャッシュがあれば即座に返し、なければ今回の通信を待つ
                return cachedResponse || fetchPromise;
            })()
        );
    }
});