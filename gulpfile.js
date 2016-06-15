var gulp = require("gulp");
var ts = require("gulp-typescript");
var debug = require("gulp-debug");
var sourcemaps = require("gulp-sourcemaps");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(debug(), {title:"source"})
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .js
        .pipe(sourcemaps.write(".", {sourceRoot:"../src"}))
        .pipe(gulp.dest("dist"));
});