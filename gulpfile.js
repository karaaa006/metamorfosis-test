const { src, dest, watch, parallel, series, task } = require("gulp");
const ghPages = require("gulp-gh-pages");

let sсss = require("gulp-sass")(require("sass")),
  concat = require("gulp-concat"),
  browserSync = require("browser-sync").create(),
  uglify = require("gulp-uglify-es").default,
  autopref = require("gulp-autoprefixer"),
  del = require("del");

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function cleanDist() {
  return del("dist");
}

function scripts() {
  return src(["src/index.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src(["src/scss/main.scss"])
    .pipe(sсss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autopref({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "src/css/style.min.css",
      "src/fonts/**/*",
      "src/images/**/*",
      "src/*.html",
      "src/js/main.min.js",
    ],
    { base: "src" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/**/*.js", "!src/js/main.min.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, browsersync, watching);
