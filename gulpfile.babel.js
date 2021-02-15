import gulp from "gulp";
import sass from "gulp-sass";
sass.compiler = require("node-sass");

function convertScss() {
    return gulp
        .src("./src/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./src/css"));
}

function watchScss() {
    gulp.watch("./src/scss/*.scss", gulp.series("scss"));
}

gulp.task("scss", convertScss);
gulp.task("watch", watchScss);
