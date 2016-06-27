var gulp = require("gulp");
var ts = require("gulp-typescript");
var debug = require("gulp-debug");
var sourcemaps = require("gulp-sourcemaps");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");

gulp.task("clean", function () {
    return del(["dist/*.js", "dist/*.js.map"]);
});

function compileTypescript(sources, destFile)
{
    return gulp.src(sources)
        .pipe(debug(), {title: "source"})
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "commonjs",
            target: "es5",
            outFile: destFile
        }))
        .pipe(sourcemaps.write(".", {sourceRoot:"../src"}))
        .pipe(gulp.dest("dist"))
}

gulp.task("compile", function () {
    /*
     return tsProject.src(["src/!**!/!*.ts"],{since:gulp.lastRun("compile")})
     .pipe(debug(), {title:"source"})
     .pipe(sourcemaps.init())
     .pipe(ts(tsProject))
     .js
     .pipe(sourcemaps.write(".", {sourceRoot:"../src"}))
     .pipe(debug())
     .pipe(gulp.dest("dist"));
     */
    return compileTypescript("src/**/*.ts", "all.js");
});

gulp.task("build", gulp.series("clean", "compile"));

gulp.task("watch", function () {
    gulp.watch("src/**/*.*", gulp.series("build"));
});

gulp.task("dev", gulp.series("compile", "watch"));

