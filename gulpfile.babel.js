'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefix = require('gulp-autoprefixer');
let browsersync = require('browser-sync').create();
let concat = require('gulp-concat');
// let uglify = require('gulp-uglify');
// let rename = require('gulp-rename');
// let babel = require('gulp-babel');
// const include = require('gulp-include')

function style(done) {
	gulp.src('./src/style/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('./build/css/'));
	done();
}

function scripts(done) {
	gulp.src('./src/js/*.js')
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./build/js/'));
	done();
}

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './'
		},
		port: 3000
	});
	done();
}

function browserReload(done) {
	browsersync.reload();
	done();
}

function watch(){
	gulp.watch('./src/style/**/*', style);
	gulp.watch('./src/style/**/*', browserReload);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./src/**/*.js', scripts);
	gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(scripts, browserSync, watch));