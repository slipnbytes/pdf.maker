const { build } = require('./build');

build({
  format: 'esm',
  outfile: 'dist/index.esm.js',
  entryPoints: ['src/index.ts'],
});
