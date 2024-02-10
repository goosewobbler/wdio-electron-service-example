const eslint = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const wdio = require('eslint-plugin-wdio');
const globals = require('globals');

module.exports = [
  // Ignored dirs
  {
    ignores: ['**/dist/**/*'],
  },
  // All files
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.es2021,
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
  // Node & Electron main process files and scripts
  {
    files: ['**/*.{js,mjs,ts}'],
    ignores: ['src/preload.ts', 'src/util.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Electron renderer process files
  {
    files: ['example*/src/preload.ts', 'example*/src/util.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  // TS files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs.recommended.rules,
      'no-undef': 'off', // redundant - TS will fail to compile with undefined vars
      'no-redeclare': 'off', // redundant - TS will fail to compile with duplicate declarations
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: true,
        },
      ],
      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': ['warn'],
    },
  },
  // E2E TS files
  {
    files: ['test/*.spec.ts'],
    languageOptions: {
      globals: {
        ...wdio.configs.recommended.globals,
      },
    },
    plugins: {
      wdio,
    },
    rules: {
      ...wdio.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  // ensure all rules work with prettier
  prettier,
];
