import gulp from 'gulp';

// Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import dartSass from 'dart-sass';
import gulpSass from 'gulp-sass';
import cssImport from 'gulp-cssimport';
import autoprefixer from 'gulp-autoprefixer';
import ccsMinify from 'gulp-csso';
import rename from 'gulp-rename';
import shortCss from 'gulp-shorthand';
import groupCssMedia from 'gulp-group-css-media-queries';

// Конфигурация
import app from '../config/app.js';

const sass = gulpSass(dartSass);

// Обработка SCSS
export default () =>
  gulp
    .src('./src/sass/*.{sass,scss}', { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'SCSS',
          message: error.message
        }))
      })
    )
    .pipe(sass())
    .pipe(cssImport())
    .pipe(autoprefixer())
    .pipe(shortCss())
    .pipe(groupCssMedia())
    .pipe(gulp.dest('./docs/css', { sourcemaps: app.isDev }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ccsMinify())
    .pipe(gulp.dest('./docs/css', { sourcemaps: app.isDev }));
