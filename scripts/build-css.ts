import { sync as glob } from 'glob';
import { dirname } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { sync as mkdirp } from 'mkdirp';

import { renderSync as sassRender } from 'node-sass';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';

import { pipeline } from './utils';

glob('./src/app/**/*.scss').forEach(file => {
  pipeline(
    compileSassToCss,
    (css: string) => addPrefixes(css, file)
  )(file);
});

export function compileSassToCss(filePath: string): string {
  return sassRender({
    file: filePath,
    outputStyle: 'compressed'
  }).css;
}

export function addPrefixes(css: string, filePath: string): void {
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
