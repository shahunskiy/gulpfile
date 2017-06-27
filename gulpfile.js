var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    pug = require('gulp-pug'),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect');

gulp.task('default', ['connect', 'watch', 'stylus', 'pug', 'coffee', 'img', 'fonts']);

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('stylus', function () {
    gulp.src('stylus/*.stylus')
        .pipe(stylus({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('pug', function () {
    gulp.src('pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('coffee', function() {
    gulp.src('coffee/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function () {
    gulp.src('img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
    gulp.src('fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('stylus/**/*.stylus', ['stylus']);
    gulp.watch('pug/**/*.pug', ['pug']);
    gulp.watch('coffee/*.*', ['coffee']);
    gulp.watch('img/*.png', ['img']);
    gulp.watch('fonts/*.*', ['fonts']);
});