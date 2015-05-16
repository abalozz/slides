var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('lint-node', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
