import tsParser from '@typescript-eslint/parser';
import * as wdio from 'eslint-plugin-wdio';
import globals from 'globals';

export default [
  {
    files: ['packages/*/test/**/*.ts', 'packages/*/test/**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.mocha,
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
      },
    },
    plugins: {
      'wdio': wdio,
    },
    rules: {
      ...wdio.configs.recommended.rules,
    },
  },
];