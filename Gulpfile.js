var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch('public/css/*.scss', ['sass']);
    gulp.watch('*.html, public/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("public/css/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
