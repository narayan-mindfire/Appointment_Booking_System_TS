import hub from '@mindfiredigital/eslint-plugin-hub';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
 
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    languageOptions: {
      globals: globals.builtin,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      hub: hub,
    },
    files: ['**/*.ts'],
    rules: {
      'hub/vars-camelcase': 'error',
      'hub/class-pascalcase': 'error',
      'hub/function-camelcase': 'error',
    },
  },
];
 