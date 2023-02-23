# Project Setup

## SvelteKit, Typescript, Tailwind, Eslint, Prettier

npm create svelte@latest ./

npm install

npx svelte-add@latest tailwindcss

npm install -D @tailwindcss/forms

git add -A && git commit -m "Initial packages"

### Add to tailwind.config.cjs

```
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// https://www.tailwindshades.com/
			colors: {
				primary: {
					DEFAULT: '#085892',
					50: '#5CB5F6',
					100: '#48ACF5',
					200: '#229BF3',
					300: '#0C87DF',
					400: '#0A6FB9',
					500: '#085892',
					600: '#05385D',
					700: '#021828',
					800: '#000000',
					900: '#000000'
				},

				accent: {
					DEFAULT: '#FFCA05',
					50: '#FFF1BD',
					100: '#FFEDA8',
					200: '#FFE47F',
					300: '#FFDB57',
					400: '#FFD32E',
					500: '#FFCA05',
					600: '#CCA100',
					700: '#947400',
					800: '#5C4800',
					900: '#241C00'
				}
			},
			fontFamily: {
				poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
				// montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms')
		// ...
	]
}
```

### Add to .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "all",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"pluginSearchDirs": ["."],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }],
	"semi": false
}
```

### Add to svelte.config.js

```
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter(),
		alias: {
			// these are the aliases and paths to them
			'@components': path.resolve('./src/lib/components'),
			'@lib': path.resolve('./src/lib'),
			'@utils': path.resolve('./src/lib/utils'),
		},
	},
}

export default config

```

## "No inputs were found in config file in TypeScript"

The error "No inputs were found in config file" occurs when we try to build a project that does not contain any TypeScript files. To solve the error, add an empty file with a .ts extension in your project's root directory and restart your IDE if necessary.
