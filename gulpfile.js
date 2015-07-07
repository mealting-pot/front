/**
 * Created by Jordan on 7/8/2015.
 */
'use strict';

var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var gutil       = require('gulp-util');
var gulp        = require('gulp');


gulp.task('browserify', function () {
    // set up the browserify instance on a task basis
    return browserify({
        entries: 'src/app.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*.*', ['default']);
});