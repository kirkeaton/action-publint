#!/usr/bin/env node

import * as esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  entryPoints: ['src/main.ts'],
  format: 'esm',
  minify: false,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node20',
});
