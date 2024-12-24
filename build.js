#!/usr/bin/env node

import * as esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  entryPoints: ['src/main.ts'],
  external: [
    'node:*',
  ],
  format: 'esm',
  minify: true,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node20',
});
