'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

const babel = require('gulp-babel');


gulp.task('default', function() {
    gulp.start('build-all');
});

gulp.task('build-all', function() {
    runSequence(
        'clean-lib',
        'build-lib',
        'build-cljs-lib',
        'clean-web',
        ['browserify', 'copy-css', 'copy-html'],
        'deploy-web');
});

gulp.task('clean-lib', function () {
    return gulp.src('./lib', {read: false})
        .pipe(clean());
});

gulp.task('build-lib', function() {
    return gulp.src(['src/**/*.js',
                     '!./src/require.js',
                     '!./src/react-grid-gallery.bundle.js'])
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('clean-web', function () {
    return gulp.src('./examples/dist', {read: false})
        .pipe(clean());
});

gulp.task('deploy-web', function() {
    return gulp.src('./examples/dist/**/*')
        .pipe(ghPages());
});

gulp.task('copy-css', function () {
    return gulp.src('./examples/**/*.css')
        .pipe(gulp.dest('./examples/dist/css'));
});

gulp.task('copy-html', function () {
    return gulp.src('./examples/index.html')
        .pipe(gulp.dest('./examples/dist/'));
});

//uncomment watchify + on update for continuous build
gulp.task('browserify', function() {
    var bundle =
            //watchify(
            browserify(['./examples/app.js',
                        './examples/demo1.js',
                        './examples/demo2.js',
                        './examples/demo3.js',
                        './examples/demo4.js',
                        './examples/demo5.js'], {
        extensions: ['.js', '.jsx']
        })
//)
    ;
    bundle.transform(babelify, {'presets': ['es2015', 'react']});

    //bundle.on('update', function() {
    //    rebundle(bundle);
    //});

    function rebundle(bundle) {
        return bundle.bundle()
            .on('error', function(error) {
                console.log(error.stack, error.message);
                this.emit('end');
            })
            .pipe(gulpif((process.env.NODE_ENV == 'dev'), source('bundle.js'), source('bundle.min.js')))
            .pipe(buffer())
            .pipe(gulpif((process.env.NODE_ENV == 'dev'), beautify(), uglify()))
            .pipe(gulp.dest('examples/dist/js'));
    }
    return rebundle(bundle);
});


gulp.task('build-cljs-lib', function() {
    var bundle = browserify('./src/require.js', {
        extensions: ['.js', '.jsx'],
    });
    bundle.transform(babelify, {'presets': ['es2015', 'react']});
    bundle.on('update', function() {
        rebundle(bundle);
    });

    function rebundle(bundle) {
        return bundle.bundle()
            .on('error', function(error) {
                console.log(error.stack, error.message);
                this.emit('end');
            })
            .pipe(gulpif((process.env.NODE_ENV == 'dev'),
                         source('react-grid-gallery.bundle.js'),
                         source('react-grid-gallery.bundle.min.js')))
            .pipe(buffer())
            .pipe(gulpif((process.env.NODE_ENV == 'production'), uglify()))
            .pipe(gulp.dest('lib'));
    }
    return rebundle(bundle);
});
