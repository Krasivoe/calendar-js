import gulp from 'gulp';

// Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import imageMinify from 'gulp-imagemin';
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';

// Конфигурация
import app from '../config/app.js';

// Обработка Image
export default () =>
  gulp
    .src('./src/img/**/*.{png,jpg,jpeg,gif,svg,ico}')
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'Image',
          message: error.message
        }))
      })
    )
    .pipe(newer('./docs/img'))
    .pipe(gulpIf(app.isProd, imageMinify()))
    .pipe(gulp.dest('./docs/img'));
