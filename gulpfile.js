/**
 * Created by sunday on 11/29/16.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function ()
{
    return gulp.src('app/**/*')
            .pipe(ghPages());
});


gulp.task('less', function ()
{
    return gulp.src('app/less/**/*.less')
            .pipe(less())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('browserSync', function ()
{
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', ['browserSync', 'less'], function ()
{
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
