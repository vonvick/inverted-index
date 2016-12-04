require('dotenv').config();
const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');
const webpackConfig = require('./webpack.config.js');

const plugins = require('gulp-load-plugins')();

const src = {
  html: './src/**/*.html',
  css: './src/css/style/style.css',
  sass: './src/css/sass/materialize.scss',
  scripts: {
    all: './src/js/**/*.js',
    app: './src/js/index.js'
  },
  images: './src/img/*',
  test: {
    file: './jasmine/spec/inverted-index.js'
  }
};

const build = './build/';
const spec = './jasmine/';

const out = {
  html: `${build}*.html`,
  css: `${build}css/`,
  customcss: `${build}css/style`,
  scripts: {
    file: 'app.min.js',
    folder: `${build}js/`
  },
  images: `${build}img/`,
  test: {
    folder: `${spec}spec`
  }
};

gulp.task('default', () => {

});

gulp.task('script', () => gulp.src(src.scripts.app)
  .pipe(webpack({
    output: {
      filename: 'index.js'
    },
    watch: false,
    module: {
      loaders: [
        { loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
          query: {
            presets: 'es2015'
          }
        }
      ],
    },
  }))
  .pipe(gulp.dest(out.scripts.folder)));

gulp.task('source', () => gulp.src('./src/js/inverted-index.js')
  .pipe(gulp.dest('./build/js'))
  .pipe(plugins.connect.reload()));

gulp.task('sass', () => gulp.src(src.sass)
  .pipe(plugins.sass())
  .pipe(gulp.dest(out.css)));

gulp.task('css', () => gulp.src(src.css)
  .pipe(cleanCSS())
  .pipe(gulp.dest(out.customcss))
  .pipe(plugins.connect.reload()));

gulp.task('html', () => gulp.src(src.html)
  .pipe(gulp.dest(build))
  .pipe(plugins.connect.reload()));

gulp.task('imagemin', () => gulp.src(src.images)
  .pipe(plugins.imagemin())
  .pipe(gulp.dest(out.images)));

/* The jshint task runs jshint with ES6 support. */
gulp.task('eslint', () => gulp.src(src.scripts.all)
  .pipe(eslint())
  .pipe(eslint.format()));

gulp.task('webpack', () => gulp.src(src.test.file)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(out.test.folder))
  .pipe(plugins.connect.reload()));

gulp.task('testSource', () => gulp.src('./src/js/inverted-index.js')
  .pipe(gulp.dest('./jasmine/src/'))
  .pipe(plugins.connect.reload()));

gulp.task('reloadTest', () => gulp.src(`${spec}spec/build.js`)
  .pipe(gulp.dest(`${out.test.folder}build.js`))
  .pipe(plugins.connect.reload()));

gulp.task('serve', ['build', 'watch'], () => {
  plugins.connect.server({
    root: build,
    port: process.env.PORT || 8080,
    livereload: true,
    fallback: `${build}index.html`
  });
});

gulp.task('serveTest', () => {
  plugins.connect.server({
    root: spec,
    port: 8082,
    livereload: true,
    fallback: `${spec}SpecRunner.html`
  });
});

gulp.task('watch', () => {
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.html, ['html']);
  gulp.watch(src.scripts.all, ['script']);
  gulp.watch(src.images, ['imagemin']);
  gulp.watch('./jasmine/spec/inverted-index-test.js', ['reloadTest']);
  gulp.watch('./src/js/inverted-index.js', ['testSource']);
  gulp.watch('./src/js/inverted-index.js', ['source']);
});

gulp.task('build', ['script', 'source', 'sass', 'css', 'html', 'imagemin', 'reloadTest', 'testSource']);
gulp.task('default', ['serve', 'webpack', 'serveTest']);
