import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-auto-external'
// import external from "rollup-plugin-peer-deps-external";
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourceMap: true,
  },
  plugins: [
    external(),
    resolve(),
    postcss(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    json(),
    commonjs(),
  ],
}
