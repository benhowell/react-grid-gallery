import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

const isWatchMode = process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/Gallery.js",
    output: {
      name: "Gallery",
      file: pkg.browser,
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    external: ["react", "react-dom"],
    plugins: [
      nodeResolve({ browser: true }),
      commonjs({ include: /node_modules/ }), // https://github.com/rollup/plugins/issues/805#issuecomment-779902868
      babel({ babelHelpers: "bundled" }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
      isWatchMode &&
        serve({ verbose: true, contentBase: ["./dist", "./examples/test"] }),
      isWatchMode && livereload({ watch: "dist" }),
    ],
  },
  {
    input: ["src/Gallery.js", "src/CheckButton.js", "src/Image.js"],
    output: {
      dir: "lib",
      format: "cjs",
      sourcemap: true,
      exports: "default",
    },
    preserveModules: true,
    external: ["prop-types", "react", "react-images"],
    plugins: [babel({ babelHelpers: "inline" })],
  },
  {
    input: "src/Gallery.js",
    external: ["prop-types", "react", "react-images"],
    output: [
      { file: pkg.main, format: "cjs", exports: "default" },
      { file: pkg.module, format: "es", exports: "default" },
    ],
    plugins: [
      babel({ babelHelpers: "bundled" }),
      copy({
        targets: [
          {
            src: "./index.d.ts",
            dest: "./dist",
            rename: `${pkg.name}.cjs.d.ts`,
          },
          {
            src: "./index.d.ts",
            dest: "./dist",
            rename: `${pkg.name}.esm.d.ts`,
          },
        ],
      }),
    ],
  },
];
