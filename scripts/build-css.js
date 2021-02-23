const autoprefixer = require('autoprefixer');
const { existsSync, writeFileSync } = require('fs');
const { sync: glob } = require('glob');
const { sync: mkdirp } = require('mkdirp');
const { renderSync: sassRender } = require('node-sass');
const { dirname } = require('path');
const postcss = require('postcss');
const { pipeline } = require('./utils');

glob('./src/app/**/*.scss').forEach(file => {
  pipeline(
    compileSassToCss,
    (css) => addPrefixes(css, file)
  )(file);
});

function compileSassToCss(filePath) {
  return sassRender({
    file: filePath,
    outputStyle: 'compressed'
  }).css;
}

function addPrefixes(css, filePath) {
  const outFilePath = filePath.replace('src/app', '.packaging').replace('.scss', '.css');
  const outDir      = dirname(outFilePath);
  postcss([ autoprefixer ]).process(css).then(prefixed => {
    prefixed.warnings().forEach(warn => {
      console.warn(warn);
    });
    return prefixed.css;
  }).then(result => {
    if (!existsSync(outDir)) {
      mkdirp(outDir);
    }
    writeFileSync(outFilePath, result);
    console.log(`Compiled ${outFilePath}`);
  });
}
