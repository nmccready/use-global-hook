const gulp = require('gulp');
const ts = require('gulp-typescript');
const umd = require('gulp-umd');
const del = require('del');
const { compilerOptions: tsconfig } = require('./tsconfig.json');

gulp.task('clean', () => del(['.tmp', 'lib']));

gulp.task('umd', () =>
  gulp
    .src('lib/*.js')
    .pipe(umd())
    .pipe(gulp.dest('umd'))
);

const build = (
  src = [
    'src/**/*.ts?(x)',
    '!src/**/*.spec.ts?(x)',
    '!src/**/*.test.ts?(x)',
    '!src/test/**/*',
  ],
  dest = 'lib'
) => () =>
  gulp
    .src(src)
    .pipe(ts(tsconfig))
    .pipe(gulp.dest(dest));

gulp.task('build', build());

gulp.task('default', gulp.series('clean', gulp.series('build', 'umd')));
