var gulp = require('gulp');

//shared
var runSequence = require('run-sequence');
var del = require('del');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cachebust = require('gulp-cache-bust');
var browserSync = require('browser-sync').create();

//js
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

//scss/css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

/*************************
-- PATH VARS
*************************/
var devDirectory = 'site';
var paths = {
	src: {
		jsEntry: devDirectory + '/js/app.js',
		jsAll: devDirectory + '/js/**/*.js',
		scssEntry: devDirectory + '/scss/main.scss',
		scssAll: devDirectory + '/scss/**/*.scss',
		htmlAll: devDirectory + '/*.html'
	},
	out: {
		jsOut: devDirectory + '/compiled/js',
		cssOut: devDirectory + '/compiled/css'
	},
	dist: {
		base: './dist',
		htmlEntry: './dist/index.html'
	}
};

/*************************
-- SCSS COMPILE
*************************/
gulp.task('scss', function() {
	return gulp
		.src(paths.src.scssEntry)
		.pipe(sass())
		.pipe(
			autoprefixer({
				browsers: ['last 7 versions']
			})
		)
		.pipe(gulp.dest(paths.out.cssOut))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

/*************************
-- ES6 JS COMPILE
*************************/
gulp.task('js', function() {
	return browserify({ entries: paths.src.jsEntry, debug: true })
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest(paths.out.jsOut))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

/*************************
-- START SERVER & WATCH
*************************/
gulp.task('watch', ['browserSync', 'scss', 'js'], function() {
	gulp.watch([paths.src.scssEntry, paths.src.scssAll], ['scss']);
	gulp.watch([paths.src.jsEntry, paths.src.jsAll], ['js']);
	gulp.watch([paths.src.htmlAll], browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: devDirectory
		}
	});
});

/*************************
-- PROD BUILD HELPERS
*************************/
gulp.task('build-clean', function() {
	return del([paths.dist.base]);
});

// Minify and bundle resources referenced in HTML
gulp.task('useref', function() {
	return gulp
		.src(paths.src.htmlAll)
		.pipe(useref())
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest(paths.dist.base));
});

// Add cache strings to resources referenced in HTML
gulp.task('cachebust', function() {
	return gulp
		.src(paths.dist.htmlEntry)
		.pipe(
			cachebust({
				type: 'timestamp'
			})
		)
		.pipe(gulp.dest(paths.dist.base));
});

/*************************
-- PROD BUILD TASK
*************************/
gulp.task('build', function(callback) {
	runSequence('build-clean', 'scss', 'js', 'useref', 'cachebust', callback);
});

/*************************
-- DEFAULT TASK = WATCH
*************************/
gulp.task('default', ['watch']);
