import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";

const isWatchMode = process.env.ROLLUP_WATCH;

export default [
  {
    input: "./examples/index",
    output: {
      file: "./examples/dist/js/bundle.min.js",
      format: "umd",
      sourcemap: true,
      exports: "none",
    },
    plugins: [
      nodeResolve({ browser: true }),
      commonjs({ include: /node_modules/ }), // https://github.com/rollup/plugins/issues/805#issuecomment-779902868
      babel({ exclude: "node_modules/**", babelHelpers: "bundled" }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: false,
      }),
      copy({
        targets: [
          { src: "./examples/*.css", dest: "./examples/dist/css" },
          { src: "./examples/index.html", dest: "./examples/dist" },
        ],
      }),
      isWatchMode && serve({ verbose: true, contentBase: ["./examples/dist"] }),
      isWatchMode && livereload({ watch: "./examples/dist" }),
    ],
  },
];
