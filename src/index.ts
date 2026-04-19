import { renderGlobe } from './globe';
import { h, g } from '../assets/photoIds';

const PHOTO_IDS = [...h.photoIds, ...g.photoIds];

function updateGlobeUI(lat: number, lng: number) {
    const pathElement = document.getElementById('globe-path') as SVGPathElement | null;
    if (!pathElement) return;
    const dString = renderGlobe(lat, lng);
    if (dString) pathElement.setAttribute('d', dString);
}

async function updateUI(data: any) {
    if (!data.dataUri) return;

    const bg = document.getElementById('bg');
    if (bg) {
        bg.style.backgroundImage = `url(${data.dataUri})`;
        bg.style.opacity = "1";
    }

    const regionEl = document.getElementById('region');
    const countryEl = document.getElementById('country');
    if (regionEl) regionEl.innerText = data.region || data.geocode?.administrative_area_level_1 || "";
    if (countryEl) countryEl.innerText = data.country || data.geocode?.country || "";

    const elevationEl = document.getElementById('elevation');
    if (elevationEl) elevationEl.innerText = `${Math.round(data.elevation).toLocaleString()}m`;

    if (typeof data.lat === 'number' && typeof data.lng === 'number') {
        updateGlobeUI(data.lat, data.lng);
    }
}

async function main() {
    if (PHOTO_IDS.length === 0) return;

    const randomId = PHOTO_IDS[Math.floor(Math.random() * PHOTO_IDS.length)];
    const url = `https://www.gstatic.com/prettyearth/assets/data/v3/${randomId}.json`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        await updateUI(data);
    } catch (err) {
        console.error("データの取得に失敗しました:", err);
    }
}

main();