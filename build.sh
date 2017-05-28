#!/usr/bin/env sh

set -x

GULP=./node_modules/.bin/gulp
NGC=./node_modules/.bin/ngc

# Remove previous builds
rm -rf builds

# Copy ts files src to pre-builds
$GULP pre-build:js

# Replace all `templateUrl: '/path/to/template-file'` to `template: 'template content'`
$GULP build:inline-resource

# Transpile
$NGC --project ./src/tsconfig-ngc.json

# Rollup
$GULP build:rollup

# Remove temporary directory
rm -rf pre-builds

# Build css and minify css
$GULP build:css
$GULP minify:css

# Build themed css
$GULP build:css:themes

# Copy package.json
cp ./src/package.json ./builds/package.json
