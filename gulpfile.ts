import gulp from 'gulp';
import ts from 'gulp-typescript';
import del from 'del';
import run from 'gulp-run';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

/*
Gulp is for an itemized build so you can easily
pick exactly what files you want without tree shaking.

So this is for lib / cjs build.
*/
const { compilerOptions: tsconfig } = require('./tsconfig.json');
const pkg = require('./package.json');

const getDir = (fileName: string) => fileName.split('/')[0];

gulp.task('clean', () =>
  del(['.tmp', getDir(pkg.main), '*.log', getDir(pkg.umd), getDir(pkg.module)])
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

const docsClean = () => del(['docs']);

const docsApiWebsite = () => run('yarn docs:api:website', { verbosity: 3 }).exec();

const docsApiMarkdown = () => run('yarn docs:api:markdown', { verbosity: 3 }).exec();

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('docs', gulp.series(docsClean, docsApiWebsite, docsApiMarkdown));
