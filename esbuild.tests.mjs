import * as esbuild from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createInstrumenter } = require('istanbul-lib-instrument');

const instrumenter = createInstrumenter({
  esModules: true,
  produceSourceMap: true,
  compact: false,
  parserPlugins: ['jsx']
});

const coberturaGotyShop = {
  name: 'cobertura-gotyshop',
  setup(build) {
    build.onLoad({ filter: /\.[cm]?jsx?$/ }, async (args) => {
      const ruta = args.path.replace(/\\/g, '/');
      if (ruta.includes('/node_modules/') || ruta.includes('/src/tests/')) return;
      if (!ruta.includes('/src/')) return;

      const codigo = await fs.readFile(args.path, 'utf8');
      const instrumentado = instrumenter.instrumentSync(codigo, args.path);
      return {
        contents: instrumentado,
        loader: path.extname(args.path) === '.jsx' ? 'jsx' : 'js'
      };
    });
  }
};

await esbuild.build({
  entryPoints: ['src/tests/index.jsx'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  jsx: 'automatic',
  outfile: 'testing/tests.bundle.js',
  sourcemap: true,
  plugins: [coberturaGotyShop]
});

console.log('Bundle de pruebas con cobertura generado correctamente');
