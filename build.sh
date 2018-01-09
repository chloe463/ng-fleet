#!/usr/bin/env sh

set -x

PACKAGR=./node_modules/.bin/ng-packagr
GULP=./node_modules/.bin/gulp

# Remove previous builds
rm -rf builds

$PACKAGR -p ng-package.json

# Build css and minify css
$GULP build:css
$GULP minify:css

# Build themed css
$GULP build:css:themes
