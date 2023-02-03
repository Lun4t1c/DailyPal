import node from "@sveltejs/adapter-node"
import { vitePreprocess } from '@sveltejs/kit/vite';
import postcss from 'postcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: node({ env: { port: process.env.PORT } }),
		alias: {
			$db: 'src/db',
		}
	}
};

export default config;
