const path             = require('path');
const gulp             = require('gulp');
const gulpBetterRollup = require('gulp-better-rollup');
const gulpSass         = require('gulp-sass');
const autoPrefixer     = require('gulp-autoprefixer');
const gulpRename       = require('gulp-rename');
const gulpCleanCss     = require('gulp-clean-css');
const gulpUglify       = require('gulp-uglify');
const glob             = require('glob');
const fs               = require('fs');
const del              = require('del');

const PROJECT_ROOT = path.join(__dirname);
const SOURCE_ROOT  = path.join(__dirname, 'src');
const DIST_ROOT    = path.join(__dirname, 'dist/out-tsc');
const BUNDLES_ROOT = path.join(__dirname, 'bundles');

function promiseify(fn) {
    return function() {
        const args = [].slice.call(arguments, 0);
        return new Promise((resolve, reject) => {
            fn.apply(this, args.concat([function (err, value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            }]));
        });
    };
}

const readFile = promiseify(fs.readFile);

function replaceTemplate(content, filePath) {
    const templatePath    = filePath.replace(/dist\/out-tsc/, 'src/app').replace(/\.js$/, '.html');
    if (!fs.existsSync(templatePath)) {
        return content.replace(/templateUrl: \'.*html\'/, 'template: ``');
    }
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    return content.replace(/templateUrl: \'.*html\'/, 'template: `' + templateContent + '`')
}

function replaceStyle(content, filePath) {
    return content.replace(/styleUrls:\s*(\[[\s\S]*?\])/, function (m, styleUrls) {
        const urls = eval(styleUrls);

        const styles = urls.map((url) => {
            const dir       = path.dirname(filePath).replace(/dist\/out-tsc/, 'src/app');
            const stylePath = path.join(dir, url);
            const styleContent = fs.readFileSync(stylePath, 'utf-8');
            const shortened    = styleContent
                .replace(/([\n\r]\s*)+/gm, ' ')
                .replace(/"/gm, '\\"');
            return `"${shortened}"`;
        });

        return 'styles: [' + styles.join(',\n') + ']';
    });
}

gulp.task('build:inline-resource', () => {
    const files = glob(DIST_ROOT + '/**/**.js', (err, files) => {
        files.map((filePath) => {
            readFile(filePath, 'utf-8').then((content) => {
                content = replaceTemplate(content, filePath);
                content = replaceStyle(content, filePath);
                fs.writeFileSync(filePath, content);
            }).catch((err) => {
                console.error(err);
            });
        });
    });
});

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
gulp.task('build:rollup', () => {
    const TARGET_FILE  = path.join(DIST_ROOT, 'index.js');

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
        dest: 'francette.js'
    };

    return gulp.src(TARGET_FILE)
        .pipe(gulpBetterRollup(rollupOptions, rollupGenerateOptions))
        .pipe(gulp.dest(BUNDLES_ROOT));
});

// Minify js
gulp.task('minify:js', () => {
    const TARGET_FILE = path.join(BUNDLES_ROOT, 'francette.js');
    return gulp.src(TARGET_FILE)
        .pipe(gulpUglify())
        .pipe(gulpRename('francette.min.js'))
        .pipe(gulp.dest(BUNDLES_ROOT));
});
