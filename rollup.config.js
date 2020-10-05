import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'

import pkg from './package.json'

const input = 'src/index.ts'
const peerDeps = Object.keys(pkg.peerDependencies)

export default [
  {
    input,
    external: (id) => peerDeps.includes(id),
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
      }),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
      }),
      cleanup(),
      sourceMaps(),
      filesize(),
    ],
  },
]
