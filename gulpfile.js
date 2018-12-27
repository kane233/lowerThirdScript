const gulp = require('gulp');
const replace = require('gulp-replace');
const include = require('gulp-include');

gulp.task("buildMyScript", ["rewriteIncludes"], function () {
    return gulp.src(".temp/lower_thirds_script.jsx")
        .pipe(include())
        .pipe(gulp.dest("dist"));
});

gulp.task('rewriteIncludes', function () {
    return gulp.src("src/**/*.jsx")
        .pipe(replace("#include", "//= include"))
        .pipe(gulp.dest(".temp"));
});