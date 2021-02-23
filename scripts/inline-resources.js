const { existsSync, readFileSync, writeFileSync } = require('fs');
const { sync: glob } = require('glob');
const { sync: mkdirp } = require('mkdirp');
const { dirname, join } = require('path');
const { pipeline } = require('./utils');


glob('./src/app/**/*.ts').filter(file => {
  return !file.match(/.*\.spec.ts$/);
}).forEach(file => {
  replaceInlineResources(file);
});

function getOutFilePath(filePath) {
  return filePath.replace('src/app', '.packaging');
}

function replaceInlineResources(filePath) {
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

function replaceInlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl:\s*\'(.*\.html)\'/, (_, templateUrl) => {
    // const templatePath = join(dirname(filePath), templateUrl);
    // const templateContent = readResourceFile(templatePath);
    const templateContent = pipeline(
      (_url) => join(dirname(filePath), _url),
      readResourceFile
    )(templateUrl);
    return `template: "${templateContent}"`;
  });
}

function replaceInlineStyles(fileContent, filePath) {
  return fileContent.replace(/styleUrls:\s*(\[.*\])/, (_, styleUrlsValue) => {
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

function readResourceFile(filePath) {
  return readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/gm, '\\"');
}
