# 概要

訪問するたびにGoogle Earth から取得した異なる画像を表示します。  
[Earth View from Google Earth](https://chromewebstore.google.com/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh)のWebページ版です。拡張機能じゃないのでVimiumの操作が効きます。

# 使用法

- [Custom New Tab](https://chromewebstore.google.com/detail/custom-new-tab/lfjnnkckddkopjfgmbcpdiolnmfobflj)などのChrome 拡張機能を利用して、新規タブで開くページとしてこのページを指定します。

# メンテナンス

画像は Earth View from Google Earth の Dev Tool → Source → service-worker.js から取得した photoIds を使って、
https://www.gstatic.com/prettyearth/assets/data/v3/${randomId}.json にリクエストして取得しています。


このURLで画像が取得できなくなった場合や、廃止された photoIds がある場合は、再度 Earth View from Google Earth のソースを確認し、同じ変更をこちらにも適用してください。