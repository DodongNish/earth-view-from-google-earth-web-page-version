import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/earth-view-from-google-earth-web-page-version/',
    build: {
        outDir: 'dist',
    },
    plugins: [
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.ts',
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            injectManifest: {
                // ビルドされた静的ファイルをキャッシュ対象に含める
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
            manifest: {
                name: 'Earth View',
                short_name: 'EarthView',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            }
        }),
    ],
});