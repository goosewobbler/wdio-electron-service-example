import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugins = [new webpack.ProgressPlugin()];
const mode = 'development';

export default [
  {
    mode,
    entry: ['./src/main.js'],
    output: {
      path: `${__dirname}/dist`,
      filename: `main.js`,
      module: true,
      chunkFormat: 'module',
    },
    experiments: {
      outputModule: true,
    },
    plugins,
    resolve: {
      extensions: ['.js'],
    },
    target: 'electron-main',
    node: {
      __dirname: true,
      __filename: true,
    },
  },
  {
    mode,
    entry: ['./src/preload.js'],
    output: {
      path: `${__dirname}/dist`,
      filename: `preload.js`,
      module: true,
      chunkFormat: 'module',
    },
    experiments: {
      outputModule: true,
    },
    plugins,
    resolve: {
      extensions: ['.js'],
    },
    target: 'electron-preload',
    node: {
      __dirname: true,
      __filename: true,
    },
  },
];
