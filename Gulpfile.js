'use strict';

var gulp    = require('gulp');
var less    = require('gulp-less');
var concat  = require('gulp-concat');
var path    = require('path');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var gutil   = require('gulp-util');

gulp.task('connect', function() {
  connect.server({
    root: 'assets',
    livereload: true,
    port: 3047
  });
});



gulp.task('watch', function() {


});



gulp.task('default', ['connect', 'watch']);