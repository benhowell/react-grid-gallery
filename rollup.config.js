import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const isWatchMode = process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/Gallery.tsx",
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
      typescript({}),
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
    input: ["src/Gallery.tsx", "src/CheckButton.tsx", "src/Image.tsx"],
    output: {
      dir: "lib",
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    preserveModules: true,
    external: ["prop-types", "react"],
    plugins: [typescript({})],
  },
  {
    input: "src/Gallery.tsx",
    external: ["prop-types", "react"],
    output: [
      { file: pkg.main, format: "cjs", exports: "auto" },
      { file: pkg.module, format: "es", exports: "auto" },
    ],
    plugins: [
      typescript({}),
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
