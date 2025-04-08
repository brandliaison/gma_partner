import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/Site/app.js', 'resources/js/OpAdmin/app.js', 'resources/js/ItDashboard/app.js', 'resources/js/ServicePartner/app.js'],
            refresh: true,
        }),
        react()
    ],
});
