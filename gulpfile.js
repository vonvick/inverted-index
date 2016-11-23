var gulp = require("gulp");
var babelify = require("babelify");
var browserSync = require("browser-sync");
var webpack = require("webpack-stream");
var cleanCSS = require("gulp-clean-css");
var vinylSourceStream = require("vinyl-source-stream");
var vinylBuffer = require("vinyl-buffer");

var plugins = require("gulp-load-plugins")();

var src = {
  html: "./src/**/*.html",
  css: "./src/css/style/style.css",
  sass: "./src/css/sass/materialize.scss",
  scripts: {
    all: "./src/js/**/*.js",
    app: "./src/js/index.js"
  },
  images: "./src/img/*",
  test: {
    file: "./jasmine/spec/inverted-index.js"
  }
};

var build = "./build/";
var spec = "./jasmine/";

var out = {
  html: build + "*.html",
  css: build + "css/",
  customcss: build + "css/style",
  scripts: {
    file: "app.min.js",
    folder: build + "js/"
  },
  images: build + "img/",
  test: {
    folder: spec + "spec"
  }
};

gulp.task("default", function() {

});

gulp.task("script", function() {
  return gulp.src(src.scripts.app)
  .pipe(webpack({
    output: {
      filename: "index.js"
    },
    watch: false,
    module: {
      loaders: [
        { loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
          query: {
            presets: "es2015" 
          }
        }
      ],
    },
  }))
  .pipe(gulp.dest(out.scripts.folder));
});

gulp.task("source", function () {
  return gulp.src("./src/js/inverted-index.js")
    .pipe(gulp.dest("./build/js"))
    .pipe(plugins.connect.reload());
});

gulp.task("sass", function() {
  return gulp.src(src.sass)
    .pipe(plugins.sass())
    .pipe(gulp.dest(out.css));
});

gulp.task("css", function() {
  return gulp.src(src.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(out.customcss))
    .pipe(plugins.connect.reload());
});

gulp.task("html", function() {
  return gulp.src(src.html)
    .pipe(gulp.dest(build))
    .pipe(plugins.connect.reload());
});

gulp.task("imagemin", function() {
  return gulp.src(src.images)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(out.images));
});

/* The jshint task runs jshint with ES6 support. */
gulp.task("jshint", function() {
  return gulp.src(src.scripts.all)
    .pipe(plugins.jshint({
      esnext: true // Enable ES6 support
    }))
    .pipe(plugins.jshint.reporter("jshint-stylish"));
});

gulp.task("webpack", function() {
  return gulp.src(src.test.file)
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(out.test.folder))
    .pipe(plugins.connect.reload());
});

gulp.task("testSource", function() {
  return gulp.src("./src/js/inverted-index.js")
    .pipe(gulp.dest("./jasmine/src/"))
    .pipe(plugins.connect.reload());
});

gulp.task("reloadTest", function() {
  return gulp.src(spec + "spec/build.js")
    .pipe(gulp.dest(out.test.folder + "build.js"))
    .pipe(plugins.connect.reload());
});

gulp.task("serve", ["build", "watch"], function() {
  plugins.connect.server({
    root: build,
    port: 8080,
    livereload: true,
    fallback: build + "index.html"
  });
});

gulp.task("serveTest", function() {
  plugins.connect.server({
    root: spec,
    port: 8082,
    livereload: true,
    fallback: spec + "SpecRunner.html"
  });
});

gulp.task("watch", function() {
  gulp.watch(src.sass, ["sass"]);
  gulp.watch(src.css, ["css"]);
  gulp.watch(src.html, ["html"]);
  gulp.watch(src.scripts.all, ["script"]);
  gulp.watch(src.images, ["imagemin"]);
  gulp.watch("./jasmine/spec/inverted-index-test.js", ["reloadTest"]);
  gulp.watch("./src/js/inverted-index.js", ["testSource"]);
  gulp.watch("./src/js/inverted-index.js", ["source"])
});

gulp.task("build", ["script", "source", "sass", "css", "html", "imagemin", "reloadTest", "testSource"]);
gulp.task("default", ["serve", "webpack", "serveTest"]);