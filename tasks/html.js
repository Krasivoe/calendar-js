import gulp from 'gulp';

// Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fileInclude from 'gulp-file-include';
import formatHtml from 'gulp-format-html';

// Обработка HTML
export default () =>
  gulp
    .src('./src/html/*.html')
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: 'HTML',
          message: error.message
        }))
      })
    )
    .pipe(fileInclude())
    .pipe(formatHtml())
    .pipe(gulp.dest('./docs'));
