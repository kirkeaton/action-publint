import { setFailed } from '@actions/core';

import { runPublint } from './publint.mjs';

const run = async () => {
  try {
    const success = await runPublint();
    process.exit(success ? 0 : 1);
  } catch (err) {
    if (err instanceof Error) {
      setFailed(err);
    }
  }
};

run();
