// eslint.config.js
const js = require('@eslint/js');
const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier');

// Konfigurasi ESLint untuk proyek Node.js dengan aturan yang disesuaikan
module.exports = [
  // Menggunakan konfigurasi dasar dari ESLint untuk JavaScript
  js.configs.recommended,
  {
    // Menentukan lingkungan dan aturan untuk kode Node.js
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },

    // Aturan kustom untuk menjaga konsistensi kode dan kualitas
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'complexity': ['warn', 15],
      'max-depth': ['error', 3],
      'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },
  
  // Menambahkan konfigurasi Prettier untuk memastikan format kode yang konsisten
  eslintConfigPrettier,
  {
    // Mengabaikan direktori yang tidak perlu diperiksa oleh ESLint
    ignores: [
      'node_modules/',
      'migrations/',
      'postman/',
    ],
  },
];