import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import csso from 'gulp-csso';
import terser from 'gulp-terser';
import webp from 'gulp-webp';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

//Script

export const script = () => {
  return gulp.src('source/js/menu.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

//Images

export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg, png, svg}')
    .pipe(gulp.dest('build/img'))
}

//Copy

export const copy = () => {
  return gulp.src([
    'source/fonts/*.{woff2, woff}',
    'source/favicon.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

//Webp

export const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}

//Build

export const build = gulp.series(
  copy,
  copyImages,
  createWebp,
  gulp.parallel(
    html,
    styles,
    script
  ),
);

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', gulp.series(browser.reload, html));
}


export default gulp.series(
  copy, html, styles, script, copyImages, createWebp, server, watcher
);
