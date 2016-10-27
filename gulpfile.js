'use strict';

var gulp = require("gulp");
var ts = require("gulp-typescript");
var debug = require("gulp-debug");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var browserSync = require("browser-sync").create();
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var sequence = require("gulp-sequence");

gulp.task("clean", function () {
    return del("dist/**/*.*");
});

function compileTypescript(sources)
{
    return gulp.src(sources)
        .pipe(plumber({errorHandler: notify.onError(function (error) {
            return {
                title: "TypeScript",
                message: error.message,
                time: 3000
            }
        })}))
        .pipe(debug(), {title: "source"})
        .pipe(sourcemaps.init())
        .pipe(ts("tsconfig.json"))
        .pipe(sourcemaps.write(".", {sourceRoot:"../src"}))
        .pipe(gulp.dest("dist"))
}

gulp.task("compile", function () {
    return compileTypescript("src/**/*.ts")
        //.pipe(notify({message:"completed!", onLast:true}))
});

gulp.task("copyTemplate", function () {
   return gulp.src("./template/**/*.*")
       .pipe(debug({title:"template"}))
       .pipe(gulp.dest("dist"));
});

gulp.task("build", sequence("clean", "compile", "copyTemplate"));

gulp.task("watch", function () {
    gulp.watch("src/**/*.*", ["compile"]);
    gulp.watch("template/**/*.*", ["copyTemplate"]);
});

gulp.task("server", function () {
    browserSync.init({
        server: "dist"
    });

    browserSync.watch("dist/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", sequence("build", ["watch", "server"]));



