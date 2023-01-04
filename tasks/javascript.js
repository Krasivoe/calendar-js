import gulp from 'gulp';

// Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

// Конфигурация
import app from '../config/app.js';

// Обработка JavaScript
export default () =>
  gulp
    .src('./src/js/**/*.js', { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'JS',
          message: error.message
        }))
      })
    )
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(gulp.dest('./docs/js', { sourcemaps: app.isDev }));
