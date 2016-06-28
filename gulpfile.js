var gulp = require("gulp");
var ts = require("gulp-typescript");
var debug = require("gulp-debug");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

gulp.task("clean", function () {
    return del("dist/**/*.*");
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
    return compileTypescript("src/**/*.ts", "all.js");
});

gulp.task("copyTemplate", function () {
   return gulp.src("./template/**/*.*", {since:gulp.lastRun("copyTemplate")})
       .pipe(debug({title:"template"}))
       .pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series("clean", "compile", "copyTemplate"));

gulp.task("watch", function () {
    gulp.watch("src/**/*.*", gulp.series("compile"));
    gulp.watch("template/**/*.*", gulp.series("copyTemplate"));
});

gulp.task("dev", gulp.series("build", "watch"));

