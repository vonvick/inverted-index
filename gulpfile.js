var gulp = require("gulp");
var babelify = require("babelify");
var browserify = require("browserify");
var vinylSourceStream = require("vinyl-source-stream");
var vinylBuffer = require("vinyl-buffer");

gulp.task("default", function() {

});
gulp.task("script", function() {
	var sources = browserify({
		entries: "./src/js/inverted-index.js",
		debug: true
  })
  .transform(babelify.configure({
		presets: ["es2015"]
	}));

  return sources.bundle()
    .pipe(vinylSourceStream('app.min.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest('./build/js/'));
});