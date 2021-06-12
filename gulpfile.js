'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefix = require('gulp-autoprefixer');
let browsersync = require('browser-sync').create();


function style(done) {
	gulp.src('./style/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('./css/'));
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
	gulp.watch('./style/**/*', style);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(browserSync, watch));