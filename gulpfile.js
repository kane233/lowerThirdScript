const gulp = require('gulp');
const replace = require('gulp-replace');
const include = require('gulp-include');
const header = require('gulp-header')
const zip = require("gulp-zip")
const del = require('del');
const exec = require('child_process').exec;
const path = require('path');
const jshint = require('gulp-jshint');

var pkg = require('./package.json');
var headerTemplate = ["/**",
    " * <%= pkg.kane.name %> - <%= pkg.description %>",
    " * @version v<%= pkg.version %>",
    " * @link <%= pkg.homepage %>",
    " * @license <%= pkg.license %>",
    " */"
].join("\n");

function isWindows() {
    var isWin = /^win/.test(process.platform);
    return isWin;
}

function executeScript(absFilePath, callback) {
    var shellCommand = isWindows() ? ('"G:\\Adobe\\Adobe After Effects CC 2018\\Support Files\\AfterFX.exe" -r ' + absFilePath) :
        ('osascript -e \'tell application"Adobe After Effects CC 2017" to activate\' -e \'tell application "Adobe After Effects CC 2017" to DoScriptFile "' + absFilePath + '"\'')
    exec(shellCommand, callback);
}

gulp.task("runMyScript", ["buildMyScript"], function (done) {
    var absPath = path.join(__dirname, "dist/lower_thirds_script.jsx");
    executeScript(absPath, function (error, stdout, stderr) {
        done();
    });
});


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

gulp.task("lint", function () {
    return gulp.src("src/**/*.js*")
        .pipe(jshint({multistr:true}))
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    del(['./dist', './.temp']);
});

gulp.task("watch", function () {
    gulp.watch(["src/**/*.js*"], ['lint']);
});

gulp.task("renderSpreadsheet",function (done) {
    var absPath = path.join(__dirname, "src/renderMySpreadSheet.jsx");
    executeScript(absPath, function (error, stdout, stderr) {
        done();
    });
});

gulp.task("watchSpreadSheet",function(){
    gulp.watch(["test data/sampleCSV.csv*"], ['renderSpreadsheet']);
});

gulp.task("default", ["buildMyScript"]);