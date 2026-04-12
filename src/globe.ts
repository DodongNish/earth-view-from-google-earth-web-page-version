import { geoOrthographic, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';
// https://github.com/topojson/world-atlas?tab=readme-ov-file の世界地図データ
import world from '../assets/land-110m.json';

export function renderGlobe(lat: number, lng: number) {

    // 1.TopoJSON を D3 が読める GeoJSON(Feature) に変換する
    const land = topojson.feature(
        (world as any),
        (world as any).objects.land
    );


    // 2. 投影法の作成
    const projection = geoOrthographic()
        .scale(40)               // 80x80の枠に対して半径40
        .translate([40, 40])     // 中心を [40, 40] に固定
        .rotate([-lng, -lat])    // 経度・緯度に合わせて回転
        .clipAngle(90);          // 地球の裏側を描画しない

    const pathGenerator = geoPath().projection(projection);

    // 3. パス文字列の生成
    return pathGenerator(land);
}