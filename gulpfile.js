// Dependecies
let gulp = require('gulp');
let livereload = require('gulp-livereload');
let uglify = require('gulp-uglifyjs');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

// Minify images
gulp.task('imagemin', function () {
    return gulp.src('./assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./wp-content/themes/olympos/images'));
});

// Gulp sass
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./styles'));
});

// Minify js
gulp.task('uglify', function() {
    gulp.src('./lib/*.js')
        .pipe(uglify('main.min.js'))
        .pipe(gulp.dest('./js'))
});

// Default task watch
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./lib/*.js', ['uglify']);
    gulp.watch(['./styles/style.css', './*.html', './js/main.min.js'], function (files){
        livereload.changed(files)
    });
});

gulp.task('default', ['watch']);