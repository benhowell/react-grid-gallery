import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import sourcemaps from "rollup-plugin-sourcemaps";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const input = "src/index.ts";

export default [
  {
    input,
    output: {
      name: "ReactGridGallery",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    external: ["react", "react-dom"],
    plugins: [
      nodeResolve({ browser: true }),
      commonjs({ include: /node_modules/ }),
      typescript({
        tsconfigOverride: {
          compilerOptions: { target: "ES5" },
        },
      }),
      sourcemaps(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true,
      }),
    ],
  },
  {
    input,
    output: [
      { file: pkg.main, format: "cjs", exports: "named", sourcemap: true },
      { file: pkg.module, format: "es", exports: "named", sourcemap: true },
    ],
    plugins: [external(), typescript(), sourcemaps()],
  },
  {
    input,
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];
