'use strict';

var gulp = require('gulp'),
  minify = require('gulp-minify-css'),
  sass = require('gulp-sass');

var SRC = './src/';
var DIST = './web/';

// process css ans sass files
gulp.task('css', function () {
  return gulp.src([
      SRC + '**/*.css',
      SRC + '**/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(gulp.dest(DIST));
});

// copy html, python and Google Apps Engine (GAE) files
gulp.task('copy', function () {
  return gulp.src([
      SRC + '**/*.html',
      SRC + '**/*.py',
      SRC + '.playground',
      SRC + 'app.yaml'
    ])
    .pipe(gulp.dest(DIST));
});

gulp.task('default', ['css', 'copy']);