import { FileSystemCollectionDesc } from '@angular-devkit/schematics/tools';
import { sync as glob } from 'glob';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { sync as mkdirp } from 'mkdirp';

import { pipeline } from './utils';

glob('./src/app/**/*.ts').filter(file => {
  return !file.match(/.*\.spec.ts$/);
}).forEach(file => {
  replaceInlineResources(file);
});

function getOutFilePath(filePath: string): string {
  return filePath.replace('src/app', '.packaging');
}

export function replaceInlineResources(filePath: string): void {
  const fileContent = pipeline(
    (_filePath) => readFileSync(_filePath, 'utf-8'),
    (_fileContent) => replaceInlineTemplate(_fileContent, filePath),
    (_fileContent) => replaceInlineStyles(_fileContent, filePath),
  )(filePath);

  const outFilePath = getOutFilePath(filePath);
  if (!existsSync(dirname(outFilePath))) {
    mkdirp(dirname(outFilePath));
  }
  writeFileSync(getOutFilePath(filePath), fileContent, 'utf-8');
}

function replaceInlineTemplate(fileContent: string, filePath: string): string {
  return fileContent.replace(/templateUrl:\s*\'(.*\.html)\'/, (_, templateUrl): string => {
    // const templatePath = join(dirname(filePath), templateUrl);
    // const templateContent = readResourceFile(templatePath);
    const templateContent = pipeline(
      (_url) => join(dirname(filePath), _url),
      readResourceFile
    )(templateUrl);
    return `template: "${templateContent}"`;
  });
}

function replaceInlineStyles(fileContent: string, filePath: string): string {
  return fileContent.replace(/styleUrls:\s*(\[.*\])/, (_, styleUrlsValue): string => {
    /* tslint:disable:no-eval */
    const styleUrls = eval(styleUrlsValue);
    const styleContent = styleUrls
      .map(url => join(dirname(filePath), url)
        .replace('src/app', '.packaging')
        .replace('scss', 'css')
      )
      .map(cssPath => readResourceFile(cssPath));

    return `styles: ["${styleContent.join(' ')}"]`;
  });
}

function readResourceFile(filePath: string): string {
  return readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/gm, '\\"');
}
