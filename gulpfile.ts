import gulp from 'gulp';
import ts from 'gulp-typescript';
import umd from 'gulp-umd';
import del from 'del';
import { VinylFile } from 'gulp-typescript/release/types';
import { pascal } from 'change-case';

const { compilerOptions: tsconfig } = require('./tsconfig.json');

gulp.task('clean', () => del(['.tmp', 'lib', 'umd']));

const umdNaming = (file: VinylFile) => {
  if (file.basename === 'index.js') return 'UseGlobalHook';
  if (file.basename === 'actions.js') return 'UseGlobalHookActions';
  // @ts-ignore
  return pascal(file);
};

gulp.task('umd', () =>
  gulp
    .src('lib/*.js')
    .pipe(
      umd({
        exports: umdNaming,
        namespace: umdNaming,
      })
    )
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
