const { readFileSync, writeFileSync } = require('fs');
const { dirname, join } = require('path');

const packageJson = JSON.parse(readFileSync(join(dirname(dirname(process.argv[1])), './package.json'), 'utf-8'));
const modified = Object.assign({}, packageJson, {
  dependencies: {},
  devDependencies: {},
  peerDependencies: packageJson.dependencies,
  scripts: {},
  main: './bundles/francette.umd.js',
  module: './esm5/francette.js',
  es2015: './esm2015/francette.js',
  typings: './src/francette.d.ts'
});

writeFileSync('./builds/package.json', JSON.stringify(modified));
