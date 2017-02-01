var path = require('path');
var gulp = require('gulp');
var gulpBetterRollup = require('gulp-better-rollup');
var gulpSass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var gulpRename = require('gulp-rename');

const PROJECT_ROOT = path.join(__dirname);
const SOURCE_ROOT  = path.join(__dirname, 'src');
const DIST_ROOT    = path.join(__dirname, 'dist/out-tsc');
const BUNDLES_ROOT = path.join(__dirname, 'bundles');

// scss -> css
gulp.task('build:css', () => {
    const TARGET_FILE = path.join(SOURCE_ROOT, 'styles.scss');
    return gulp.src(TARGET_FILE)
        .pipe(gulpSass())
        .pipe(autoPrefixer())
        .pipe(gulpRename('francette.css'))
        .pipe(gulp.dest(BUNDLES_ROOT));
});

// bundle js files
gulp.task('rollup', () => {
    const TARGET_FILE  = path.join(DIST_ROOT, 'app/index.js');

    const globals = {
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms',
        '@angular/common': 'ng.common'
    };

    const rollupOptions = {
        context: 'this',
        external: Object.keys(globals)
    };

    const rollupGenerateOptions = {
        moduleId: '',
        moduleName: 'francette',
        format: 'umd',
        globals,
        banner: '',
        dest: 'francette.umd.js'
    };

    return gulp.src(TARGET_FILE)
        .pipe(gulpBetterRollup(rollupOptions, rollupGenerateOptions))
        .pipe(gulp.dest(BUNDLES_ROOT));
});
