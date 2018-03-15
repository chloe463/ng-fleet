#!/usr/bin/env sh

set -eux

build_all () {
  # Clean up previous build and working directory
  rm -rf .packaging builds

  # Build css and js
  build_css
  build_js
}

build_css () {
  INPUT_FILE="src/styles.scss"
  OUTPUT_FILE=".packaging/styles/styles.css"

  # Remove previous build file if it exists
  ls ${OUTPUT_FILE} && rm -f ${OUTPUT_FILE}
  ls builds/styles && rm -rf builds/styles

  # Make working directory if it does not exist
  ls -la $(dirname ${OUTPUT_FILE}) || mkdir -p $(dirname ${OUTPUT_FILE})

  # Compile sass to css and minify
  $(npm bin)/node-sass --output-style compressed --omit-source-map-url ${INPUT_FILE} > ${OUTPUT_FILE}

  # Add prefixes
  $(npm bin)/postcss --use autoprefixer --no-map -o ${OUTPUT_FILE} ${OUTPUT_FILE}

  ls builds/styles || mkdir -p builds/styles
  mv ${OUTPUT_FILE} builds/styles/francette.css
}

build_js () {
  # Remove previous builds and working directory
  rm -rf builds/esm2015 builds/esm5 builds/src builds/bundles .packaging

  # Replace `templateUrl` -> `template`, `styleUrls` -> `styles`
  npm run build:inline

  # Build ES2015 module (For Webpack(optimized) and Google Closure Compiler)
  npm run build:esm2015
  npm run build:fesm2015

  # Build ES5 module (For CLI, Rollup and Webpack)
  npm run build:esm5
  npm run build:fesm5

  # Build umd module (For <script>, Plunker, Fiddle and Node.js)
  npm run build:umd
  npm run build:umd-min

  # Move assets
  mkdir builds/src
  cp -r .packaging/esm2015/*.d.ts .packaging/esm2015/** .packaging/esm2015/*.json builds/src
  cp README.md builds

  $(npm bin)/ts-node -O '{"target":"es2015"}' ./scripts/modify-package-json.ts

  rm -f builds/src/*.js builds/src/**/*.js builds/src/**/**/*.js

  # Remove temporary working directory
  rm -rf .packaging
}

case $1 in
  "js") build_js ;;
  "css") build_css ;;
  "all")
    build_all
    ;;
  "*")
    echo "Usage) ./builds.sh {css|js|all}" ;;
esac
