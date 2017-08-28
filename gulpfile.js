'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const cache = require('gulp-cache');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const pngout = require('imagemin-pngout');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './src',
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    notify: false
  });
});

gulp.task('showcase', function () {
  return gulp.src('src/showcase/**/*')
      .pipe(gulp.dest('dist/showcase'));
});

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(autoprefixer(['last 10 versions']))
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function () {
  gulp.src('src/img/**/*')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngout()]
      })))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('html-minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css:minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('useref', ['html-minify'], function () {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCss({ compatibility: 'ie8' })))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function () {
  del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'css:minify', 'showcase', ['useref', 'fonts', 'images'], callback);
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'], callback);
});
