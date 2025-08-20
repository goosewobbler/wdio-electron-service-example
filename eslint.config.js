import tsParser from '@typescript-eslint/parser';
import * as wdio from 'eslint-plugin-wdio';

export default [
  // Ignored dirs
  {
    ignores: [
      '**/dist/**/*',
      '**/node_modules/**/*',
      '**/wdio-logs/**/*',
      '**/coverage/**/*',
    ],
  },
  // E2E test files - WebdriverIO specific rules
  {
    files: ['packages/*/test/**/*.ts', 'packages/*/test/**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...wdio.configs['flat/recommended'].globals,
      },
    },
    plugins: {
      wdio,
    },
    rules: {
      ...wdio.configs['flat/recommended'].rules,
    },
  },
];