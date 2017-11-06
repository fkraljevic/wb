var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});


gulp.task('uglify', function() {
    gulp.src('./lib/*.js')
        .pipe(uglify('main.min.js'))
        .pipe(gulp.dest('./js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./lib/*.js', ['uglify']);
    gulp.watch(['./style.css', './*.html', './js/main.min.js'], function (files){
        livereload.changed(files)
    });
});

gulp.task('default', ['watch']);