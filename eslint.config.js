import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['.claude/skills/**', '**/.svelte-kit/**', '**/build/**', '**/dist/**'] },
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint recommends against no-undef on TypeScript projects.
			'no-undef': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			]
		}
	},
	{
		files: ['apps/web/**/*.svelte', 'apps/web/**/*.svelte.ts', 'apps/web/**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		// packages/sim must stay pure: no DOM, no engine, no time, no randomness.
		files: ['packages/sim/src/**/*.ts'],
		ignores: ['packages/sim/src/**/*.test.ts'],
		languageOptions: { globals: {} },
		rules: {
			'no-restricted-globals': [
				'error',
				'window',
				'document',
				'navigator',
				'performance',
				'requestAnimationFrame',
				'setTimeout',
				'setInterval'
			],
			'no-restricted-properties': [
				'error',
				{ object: 'Math', property: 'random', message: 'The simulation must be deterministic.' },
				{ object: 'Date', property: 'now', message: 'The simulation must not read the clock.' }
			],
			'no-restricted-imports': [
				'error',
				{ patterns: ['@babylonjs/*', 'svelte', 'svelte/*', '$app/*', '$lib/*'] }
			]
		}
	},
	{
		// packages/shared may not import from apps.
		files: ['packages/shared/src/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						'@babylonjs/*',
						'svelte',
						'svelte/*',
						'$app/*',
						'$lib/*',
						'@webxr-pool/web*',
						'@webxr-pool/server*'
					]
				}
			]
		}
	}
);
