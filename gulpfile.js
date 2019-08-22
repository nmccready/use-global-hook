const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const { compilerOptions: tsconfig } = require('./tsconfig.json');

gulp.task('clean', () => del(['.tmp', 'lib']));

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

gulp.task('default', gulp.series('clean', gulp.parallel('build')));
