'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
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
        '/node_modules': 'node_modules',
      },
    },
    notify: false,
  });
});

gulp.task('showcase', function () {
  return gulp.src('src/showcase/**/*')
      .pipe(gulp.dest('dist/showcase'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(autoprefixer(['last 10 versions']))
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngout()],
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('css:minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('useref', function () {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCss({ compatibility: 'ie8' })))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'showcase', 'sass', 'css:minify', ['useref', 'images', 'fonts'], callback);
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'], callback);
});
