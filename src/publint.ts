import {
  type AnnotationProperties,
  error,
  getBooleanInput,
  getInput,
  notice,
  warning,
} from '@actions/core';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { publint, Options } from 'publint';
import { formatMessage } from 'publint/utils';

/**
 * Runs publint with the given inputs
 * @returns true if there are no errors, false otherwise
 */
export const runPublint = async (): Promise<boolean> => {
  // Inputs
  const level = getInput('level') as Options['level'];
  const pkgDir = getInput('pkg-dir');
  const strict = getBooleanInput('strict');

  // Parse package.json
  const pkgPath = resolve(pkgDir, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));

  // Run publint
  const { messages } = await publint({
    level,
    pack: false,
    pkgDir,
    strict,
  });

  messages.forEach((message) => {
    // Format the lint message
    const formattedMessage = formatMessage(message, pkg);
    if (!formattedMessage) {
      return;
    }

    // Set file for the annotation
    // TODO: Add line and column
    const properties: AnnotationProperties = {
      file: pkgPath,
    };

    // Create annotations based on the message type
    switch (message.type) {
      case 'error':
        error(formattedMessage, properties);
        break;
      case 'warning':
        warning(formattedMessage, properties);
        break;
      default:
        notice(formattedMessage, properties);
        break;
    }
  });

  return !messages.some(({ type }) => type === 'error');
};
