const path             = require('path');
const gulp             = require('gulp');
const gulpBetterRollup = require('gulp-better-rollup');
const gulpSass         = require('gulp-sass');
const autoPrefixer     = require('gulp-autoprefixer');
const gulpRename       = require('gulp-rename');
const gulpCleanCss     = require('gulp-clean-css');
const gulpUglify       = require('gulp-uglify');

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

// Minify css
gulp.task('minify:css', () => {
    const TARGET_FILE = path.join(BUNDLES_ROOT, 'francette.css');
    return gulp.src(TARGET_FILE)
        .pipe(gulpCleanCss())
        .pipe(gulpRename('francette.min.css'))
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

// Minify js
gulp.task('minify:js', () => {
    const TARGET_FILE = path.join(BUNDLES_ROOT, 'francette.umd.js');
    return gulp.src(TARGET_FILE)
        .pipe(gulpUglify())
        .pipe(gulpRename('francette.umd.min.js'))
        .pipe(gulp.dest(BUNDLES_ROOT));
});
