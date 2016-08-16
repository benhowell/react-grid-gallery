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

var argv = require('yargs').argv;


gulp.task('default', function() {
    gulp.start('build');
});


gulp.task('build', function(callback) {
    runSequence(['browserify', 'copy-css', 'copy-html'],
                'deploy');
});

gulp.task('deploy', function() {
    return gulp.src('./examples/dist/**/*')
        .pipe(ghPages());
});

gulp.task('copy-css', function () {
    return gulp.src('./examples/src/**/*.css')
        .pipe(gulp.dest('./examples/dist/css'));
});

gulp.task('copy-html', function () {
    return gulp.src('./examples/src/index.html')
        .pipe(gulp.dest('./examples/dist/'));
});

gulp.task('browserify', function() {
    var bundle = watchify(browserify('./examples/src/app.js', {
        extensions: ['.js', '.jsx'],
    }));
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
            .pipe(gulpif(argv.production, source('bundle.min.js'), source('bundle.js')))
            .pipe(buffer())
            .pipe(gulpif(argv.production, uglify(), beautify()))
            .pipe(gulp.dest('examples/dist/js'));
    }
    return rebundle(bundle);
});
