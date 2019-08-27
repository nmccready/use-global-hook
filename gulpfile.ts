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

gulp.task('docs:clean', () =>
  del(['docs/public', 'docs/api_website', 'docs/website/*.md?(x)'])
);

gulp.task('docs:clean:api:website', () =>
  del(['../use-global-hook-api-website/**/*', '!../use-global-hook-api-website/.gitignore'], {
    force: true,
  })
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

const docsSource = ['**/*.md?(x)', '!docs/**/*', '!node_modules/**/*'];

const setupWebsiteMarkdown = () =>
  gulp
    .src(docsSource)
    .pipe(replace(/\/index.md/g, '')) // fix links
    .pipe(
      rename((filePath) => {
        if (filePath.basename.toUpperCase() === 'README') {
          filePath.basename = 'index';
          if (filePath.dirname === '.') {
            // we're at root README
            filePath.basename = 'docs';
          }
        }
      })
    )
    .pipe(gulp.dest('docs/website'));

const runDevWebsite = () => run('yarn x0 docs/website', { verbosity: 3 }).exec();

const publishMainWebsite = () => run('yarn website', { verbosity: 3 }).exec();

const publishApiWebsite = () => run('yarn publish:api:website', { verbosity: 3 }).exec();

gulp.task('docs:website', gulp.series('docs:clean', setupWebsiteMarkdown));

gulp.task(
  'docs:website:dev',
  gulp.series('docs:website', runDevWebsite, () => {
    gulp.watch(docsSource, gulp.series('docs:website', runDevWebsite));
  })
);

gulp.task('docs:api:markdown', () => run('yarn docs:api:markdown').exec());

gulp.task(
  'docs:api:website',
  gulp.series(
    () => run('yarn docs:api:website').exec(),
    () => gulp.src('docs/api_website/**/*').pipe(gulp.dest('../use-global-hook-api-website'))
  )
);

gulp.task('default', gulp.series('clean', 'build'));

gulp.task(
  'publish:websites',
  gulp.parallel(
    gulp.series('docs:api:website', publishApiWebsite),
    'docs:api:markdown',
    gulp.series('docs:website', publishMainWebsite)
  )
);
