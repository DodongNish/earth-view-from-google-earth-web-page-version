import { renderGlobe } from './globe';
import { h, g } from '../assets/photoIds';

const PHOTO_IDS = [...h.photoIds, ...g.photoIds];

/**
 * 地球儀の描画を更新する
 */
function updateGlobeUI(lat: number, lng: number) {
    const pathElement = document.getElementById('globe-path') as SVGPathElement | null;
    if (!pathElement) return;

    try {
        const dString = renderGlobe(lat, lng);
        if (dString) {
            pathElement.setAttribute('d', dString);

        }
    } catch (err) {
        console.error("地球儀の描画に失敗しました:", err);
    }
}

async function getRandomPhotoUrl() {
    const randomId = PHOTO_IDS[Math.floor(Math.random() * PHOTO_IDS.length)];
    return `https://www.gstatic.com/prettyearth/assets/data/v3/${randomId}.json`;
}


async function fetchRandomData() {
    const url = await getRandomPhotoUrl();

    const res = await fetch(url);
    return await res.json();
}


const CACHE_NAME = 'prefetched-data';
const CACHE_KEY = 'image';

async function loadPrefetchedData() {

    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(CACHE_KEY);

    if (response) {
        const data = await response.json();
        console.log("[Cache] 前回取得済みのデータを使用します");
        console.log(data);
        return data;
    }

    console.log("[Network] 取得済みのデータがないため新規取得します");
    return fetchRandomData();
}

/**
 * 次回のためのプリフェッチを実行してキャッシュに保存
 */
async function prefetchNextData() {
    try {
        const fetchedData = await fetchRandomData();
        const cache = await caches.open(CACHE_NAME);
        // 現在のデータを上書き保存
        await cache.put(CACHE_KEY, new Response(JSON.stringify(fetchedData)));
        console.log("[Prefetch] 次回の分をディスクに保存しました");
    } catch (err) {
        console.error("プリフェッチに失敗:", err);
    }
}

async function updateUI(data: any) {
    if (data.dataUri) {
        // 背景画像の設定
        const bg = document.getElementById('bg');
        if (bg) {
            bg.style.backgroundImage = `url(${data.dataUri})`;
            bg.style.opacity = "1";
        }

        // 地名の更新
        const regionEl = document.getElementById('region');
        const countryEl = document.getElementById('country');
        if (regionEl) regionEl.innerText = data.region || data.geocode?.administrative_area_level_1 || data.geocode?.locality || "";
        if (countryEl) countryEl.innerText = data.country || data.geocode?.country || "";

        // 標高の更新
        const elevationEl = document.getElementById('elevation');
        if (elevationEl) {
            // 1000 → "1,000m"
            elevationEl.innerText = `${Math.round(data.elevation).toLocaleString()}m`;
        }

        // Google Earthへのリンク
        const linkEl = document.getElementById('location-link') as HTMLAnchorElement | null;
        if (linkEl) {
            linkEl.href = `https://earth.google.com/web/@${data.lat},${data.lng},0a,10000d,30y,0h,0t,0r`;
        }

        // 地球儀の更新（lat, lng を渡す）
        if (typeof data.lat === 'number' && typeof data.lng === 'number') {
            updateGlobeUI(data.lat, data.lng);
        }
    }

}

/**
 * メイン処理
 */
async function main() {

    if (PHOTO_IDS.length === 0) {
        console.error("IDリストが空です。");
        return;
    }

    try {
        const data = await loadPrefetchedData()

        await updateUI(data);

        // Prefetch Data
        prefetchNextData().catch(console.error);
    } catch (err) {
        console.error("データの取得に失敗しました:", err);
    }
}

main();