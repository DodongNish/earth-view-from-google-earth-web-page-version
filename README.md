# ページ URL

https://dodongnish.github.io/earth-view-from-google-earth-web-page-version/

# 概要

訪問するたびに Google Earth から取得した異なる画像を表示します。  
[Earth View from Google Earth](https://chromewebstore.google.com/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh) のWebページ版です。拡張機能じゃないので [Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb) の操作が効きます。

<img src="https://github.com/user-attachments/assets/cfb7227c-89eb-4246-8186-455fd70ad6c0" width="600">

# 使用法

1. 初期タブとして開く: Google Chrome の Settings >  On startup > Open a specific page or set of pages でこのページを指定します。
2. 新規タブとして開く: [New Tab Redirect](https://chromewebstore.google.com/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) 等の Chrome 拡張機能を利用して、新規タブで開くページとしてこのページを指定します。

# メンテナンス

画像は Earth View from Google Earth の Dev Tool → Source → service-worker.js から取得した photoIds を使って、
https://www.gstatic.com/prettyearth/assets/data/v3/${randomId}.json にリクエストして取得しています。

このURLで画像が取得できなくなった場合や、廃止された photoIds がある場合は、再度 Earth View from Google Earth のソースを確認し、同じ変更をこちらにも適用してください。
