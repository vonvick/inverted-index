var gulp = require("gulp");
var babelify = require("babelify");
var browserify = require("browserify");
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
  images: "./src/img/*"
};

var build = "./build/";
var out = {
  html: build + "*.html",
  css: build + "css/",
  customcss: build + "css/style",
  scripts: {
    file: "app.min.js",
    folder: build + "js/"
  },
  images: build + "img/"
};

gulp.task("default", function() {

});

gulp.task("script", function() {
  var sources = browserify({
    entries: src.scripts.app,
    debug: true
  })
  .transform(babelify.configure({
    presets: ["es2015"]
  }));

  return sources.bundle()
    .pipe(vinylSourceStream(out.scripts.file))
    .pipe(vinylBuffer())
    .pipe(gulp.dest(out.scripts.folder))
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

gulp.task("serve", ["build", "watch"], function() {
  plugins.connect.server({
    root: build,
    port: 8080,
    livereload: true,
    fallback: build + "index.html"
  });
});

gulp.task("watch", function() {
  gulp.watch(src.sass, ["sass"]);
  gulp.watch(src.css, ["css"]);
  gulp.watch(src.html, ["html"]);
  gulp.watch(src.scripts.all, ["script"]);
  gulp.watch(src.images, ["imagemin"]);
});

gulp.task("build", ["script", "sass", "css", "html", "imagemin"]);
gulp.task("default", ["serve"]);