import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        VitePWA({
            registerType: "autoUpdate",
            manifest:{
                name: "CESAE Cursos",
                short_name: "CESAE",
                description: "Aplicação de Cursos CESAE Digital",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "icon_192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon_512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "icon_512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ],
            },
            devOptions: {
                enabled: true,
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
})
