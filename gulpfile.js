var gulp = require('gulp'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon');

// gulp watch
gulp.task('watch', function () {
    gulp.watch('./public/app/**/*.scss', ['sass']);
});

// gulp sass
gulp.task('sass', function () {
    gulp.src('./public/app/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/assets/css')
    );
});

// gulp start
gulp.task('start', function () {
    nodemon({
        script: 'server.js' 
    });
});

// gulp
gulp.task('default', ['watch', 'start']);