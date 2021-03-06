var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var debug = require('gulp-debug');
var ngAnnotate = require('gulp-ng-annotate');
var stringify = require('stringify');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');

var paths = {
  js: ['./app/src/**/*.js'],
  sass: ['./app/src/**/*.scss']
};

var pathsDist = {
  js: './www/js/',
  css: './www/css/'
}

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./app/src/scss/*.scss') // TODO add dynamically to all files in app ('./app/src/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(pathsDist.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(pathsDist.css))
    .on('end', done);
});

gulp.task('script', function(done) {
  	return browserify({entries: './app/src/index.js', debug: true})
      .transform("babelify", {presets: ["es2015"]})
      .transform(stringify(['.html']))
      .bundle()
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(ngAnnotate())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('./maps/'))
      .pipe(gulp.dest(pathsDist.js))
      .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['script']);
});

gulp.task('serve:before', ['sass', 'script', 'watch']);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
