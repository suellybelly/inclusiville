const gulp = require('gulp');
const gulpIf = require('gulp-if');
const path = require('path');
const filter = require('gulp-filter');
const del = require('del');
const cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const mergeStream = require('merge-stream');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const include = require('gulp-include');
const server = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const twig = require('gulp-twig');

/**
 * Define development mode flag
 */
let isDev = true;
let useSourceMaps = true;

/**
 * Define folder mappings
 */
const destDir = 'build';

const stylePaths = [
    {
        dest: 'assets/css/style.css',
        src: 'src/assets/scss/style.scss'
    },
    {
        dest: 'assets/css/vendor.css',
        src: [
            'node_modules/flickity/dist/flickity.css'
        ]
    }
];

const jsPaths = [
        {
            dest: 'assets/js/polyfills.js',
            src: [
                'node_modules/object-fit-images/dist/ofi.js',
                'src/assets/js/polyfills.js'
            ]
        },
        {
            dest: 'assets/js/app.js',
            src: [
                'src/assets/js/app.js',
                'src/assets/js/components/**/*.js'
            ]
        },
        {
            dest: 'assets/js/vendor.js',
            src: [
                'src/assets/js/vendor/modernizr.js',
                'src/assets/js/vendor/googlemaps.infobox.js',
                'node_modules/resize-sensor/ResizeSensor.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                'node_modules/flickity/dist/flickity.pkgd.js',
                'node_modules/jquery-match-height/jquery.matchHeight.js',
                'node_modules/jarallax/dist/jarallax.js',
                'node_modules/jarallax/dist/jarallax-element.js',
                'node_modules/jarallax/dist/jarallax-video.js',
                'node_modules/shufflejs/dist/shuffle.js',
                'src/assets/js/vendor/jquery.sticky-sidebar.js'
            ]
        }
    ]
;

const assetsPaths = [
    {
        dest: 'assets/images',
        src: 'src/assets/images/**/*'
    },
    {
        dest: 'assets/video',
        src: 'src/assets/video/**/*'
    },
    {
        dest: 'assets/fonts/font-awesome',
        src: [
            'node_modules/font-awesome/{css,fonts}/**/*',
        ]
    }
];

/**
 * Build styles
 */
gulp.task('styles', function () {
    return stylePaths.reduce(function (streams, current_value) {
        const sassFilter = filter('**/*.{scss,sass}', {restore: true});
        return streams.add(gulp.src(current_value.src, {allowEmpty: true})
            .pipe(gulpIf(useSourceMaps, sourcemaps.init()))
            .pipe(sassFilter)
            .pipe(sass({outputStyle: 'nested'}))
            .pipe(sassFilter.restore)
            .pipe(postcss([require('autoprefixer'), require('postcss-flexbugs-fixes'), require('postcss-object-fit-images')]))
            .pipe(concat(path.basename(current_value.dest)))
            .pipe(gulpIf(!isDev, cleanCss()))
            .pipe(gulpIf(useSourceMaps, sourcemaps.write('.')))
            .pipe(gulp.dest(path.join(destDir, path.dirname(current_value.dest)))));
    }, mergeStream()).pipe(server.stream());
});

/**
 * Build scripts
 */
gulp.task('scripts', function () {
    return jsPaths.reduce(function (streams, current_value) {
        return streams.add(gulp.src(current_value.src, {allowEmpty: true})
            .pipe(gulpIf(useSourceMaps, sourcemaps.init()))
            .pipe(include({includePaths: [path.join(__dirname, 'node_modules')]}))
            .pipe(concat(path.basename(current_value.dest)))
            .pipe(gulpIf(!isDev, uglify()))
            .pipe(gulpIf(useSourceMaps, sourcemaps.write('.')))
            .pipe(gulp.dest(path.join(destDir, path.dirname(current_value.dest)))));
    }, mergeStream());
});

/**
 * Copy static assets
 */
gulp.task('assets', function () {
    return assetsPaths.reduce(function (streams, current_value) {
        del.sync(current_value.dest);

        return streams.add(gulp.src(current_value.src, {allowEmpty: true})
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5})
            ]))
            .pipe(gulp.dest(path.join(destDir, current_value.dest))));
    }, mergeStream());
});

/**
 * Build html files
 */
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(twig())
        .pipe(gulpIf(!isDev, htmlmin({collapseWhitespace: true, removeComments: true, removeAttributeQuotes: true})))
        .pipe(gulp.dest(destDir));
});

/**
 * Clear build dir
 */
gulp.task('clear_build_dir', function (done) {
    del(destDir).finally(done);
});

/**
 * Run dev server
 */
gulp.task('serve', gulp.series('clear_build_dir', 'assets', 'styles', 'scripts', 'html', function () {
    server.init({
        server: {
            baseDir: destDir,
            routes: {
                '/documentation': './documentation'
            }
        },
        open: false,
        reloadOnRestart: true
    });

    gulp.watch('src/**/*.scss', gulp.series('styles'));
    gulp.watch('src/**/*.js', gulp.series('scripts')).on('change', server.reload);
    gulp.watch(assetsPaths.reduce((acc, val) => acc.concat(val.src), []), gulp.series('assets')).on('change', server.reload);
    gulp.watch('src/**/*.html', gulp.series('html')).on('change', server.reload);
}));

/**
 * Production build
 */
gulp.task('build', gulp.series(function (done) {
    isDev = false;
    useSourceMaps = false;
    done();
}, 'clear_build_dir', 'assets', 'styles', 'scripts', 'html'));

/**
 * Default task is equals to 'build'
 */
gulp.task('default', gulp.series('build'));
