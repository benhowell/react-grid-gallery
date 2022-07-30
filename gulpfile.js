"use strict";

const glob = require("glob");
const babelify = require("babelify");
const browserify = require("browserify");
const { series, src, dest, watch } = require("gulp");

const ghPages = require("gulp-gh-pages");
const uglify = require("gulp-uglify");
const beautify = require("gulp-beautify");
const gulpif = require("gulp-if");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const cleanLib = () =>
  src("./lib", { read: false, allowEmpty: true }).pipe(clean());

const buildLib = () => src("src/**/*.js").pipe(babel()).pipe(dest("lib"));

const cleanWeb = () =>
  src("./examples/dist", { read: false, allowEmpty: true }).pipe(clean());

const deployWeb = () => src("./examples/dist/**/*").pipe(ghPages());

const copyCSS = () =>
  src("./examples/**/*.css").pipe(dest("./examples/dist/css"));

const copyHTML = () =>
  src("./examples/index.html").pipe(dest("./examples/dist/"));

const createBrowserifyBundle = (browserifyParams, bundleName, destDir) => {
  const isDevEnv = process.env.NODE_ENV === "dev";

  return browserify
    .apply(this, browserifyParams)
    .transform(babelify)
    .bundle()
    .on("error", (error) => {
      console.log(error.stack, error.message);
      this.emit("end");
    })
    .pipe(
      gulpif(
        isDevEnv,
        source(`${bundleName}.js`),
        source(`${bundleName}.min.js`)
      )
    )
    .pipe(buffer())
    .pipe(gulpif(isDevEnv, beautify({}), uglify()))
    .pipe(dest(destDir));
};

const buildExamples = () =>
  createBrowserifyBundle(
    [glob.sync("./examples/+(app|demo*).js")],
    "bundle",
    "./examples/dist/js"
  );

const buildStandalone = () =>
  createBrowserifyBundle(
    ["./src/Gallery.js", { standalone: "Gallery" }],
    "react-grid-gallery",
    "./dist"
  );

const buildSite = series(cleanWeb, buildExamples, copyCSS, copyHTML);

const buildAll = series(cleanLib, buildLib, buildStandalone, buildSite);

const buildAndDeploy = series(buildAll, deployWeb);

const watchAndBuildAll = () =>
  watch("./src/*.js", { ignoreInitial: false }, buildAll);

exports.default = buildAll;
exports.buildAndDeploy = buildAndDeploy;
exports.watch = watchAndBuildAll;
exports.buildStandalone = buildStandalone;
