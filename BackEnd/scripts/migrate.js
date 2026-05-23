// scripts/migrate.js
const { execSync } = require('child_process');

const command = process.argv[2];
const args = process.argv.slice(3).join(' ');

// Build command
let migrateCmd = `node --trace-warnings ./node_modules/.bin/node-pg-migrate ${command}`;
if (args) {
  migrateCmd += ` ${args}`;
}

console.log(`Migrasi berjalan: ${migrateCmd}`);

try {
  execSync(migrateCmd, { stdio: 'inherit' });
  console.log('Migrasi selesai!');
} catch (error) {
  console.error('Migrasi gagal:', error.message);
  process.exit(1);
}