import gulp from 'gulp';
import browserSync from 'browser-sync';

// Конфигурация
import app from './config/app.js';

// Задачи
import clear from './tasks/clear.js';
import html from './tasks/html.js';
import scss from './tasks/scss.js';
import js from './tasks/javascript.js';
import img from './tasks/img.js';

// Сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  });
};

// Наблюдение
const watcher = () => {
  gulp.watch('./src/html/**/*.html', html).on('all', browserSync.reload);
  gulp.watch('./src/sass/**/*.{sass,scss}', scss).on('all', browserSync.reload);
  gulp.watch('./src/js/**/*.js', js).on('all', browserSync.reload);
  gulp
    .watch('./src/img/**/*.{png,jpg,jpeg,gif,svg,ico}', img)
    .on('all', browserSync.reload);
};

const build = gulp.series(
  clear,
  gulp.parallel(html, scss, js, img),
  gulp.parallel(watcher, server)
);

const dev = gulp.series(build, gulp.parallel(watcher, server));

// Задачи
export { clear };
export { html };
export { scss };
export { js };
export { img };

// Сборка
export default app.isProd ? build : dev;
