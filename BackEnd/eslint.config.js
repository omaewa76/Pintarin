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