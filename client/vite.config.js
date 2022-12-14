import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://perfect-duck-bandanna.cyclic.app:8800',
				changeOrigin: true,
				secure: false
			}
		}
	},
	plugins: [react()]
});
