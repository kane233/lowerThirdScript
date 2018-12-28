const gulp = require('gulp');
const replace = require('gulp-replace');
const include = require('gulp-include');
const header = require('gulp-header')
const zip = require("gulp-zip")
const del = require('del');

var pkg = require('./package.json');
var headerTemplate = ["/**",
    " * <%= pkg.kane.name %> - <%= pkg.description %>",
    " * @version v<%= pkg.version %>",
    " * @link <%= pkg.homepage %>",
    " * @license <%= pkg.license %>",
    " */"
].join("\n");

gulp.task("buildMyScript", ["preprocessSources"], function () {
    return gulp.src(".temp/lower_thirds_script.jsx")
        .pipe(include())
        .pipe(header(headerTemplate, {
            pkg: pkg
        }))
        .pipe(gulp.dest("dist"))
        .pipe(zip('lowerThire.zip'))
        .pipe(gulp.dest("dist"));
});

gulp.task('preprocessSources', ["clean"], function () {
    return gulp.src("src/**/*.jsx")
        .pipe(replace(/^\s*#include/gm, "//= include"))
        .pipe(replace("@@name", pkg.kane.name))
        .pipe(replace("@@version", pkg.version))
        .pipe(gulp.dest(".temp"));
});

gulp.task('clean', function () {
    del(['./dist', './.temp']);
});

gulp.task("default", ["buildMyScript"]);