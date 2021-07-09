const { build } = require('./build');

build({
  format: 'cjs',
  outfile: 'dist/index.cjs.js',
  entryPoints: ['src/index.ts'],
});
