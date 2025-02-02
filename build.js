#!/usr/bin/env node

import * as esbuild from 'esbuild';

await esbuild.build({
  bundle: true,
  entryPoints: ['src/main.ts'],
  format: 'cjs',
  minify: true,
  outfile: 'dist/index.cjs',
  platform: 'node',
  target: 'node20',
});
