import type { promises as fsPromises } from 'fs';

import { isBrowser } from './isBrowser';

export async function getFileContent(path: string): Promise<string> {
  if (isBrowser()) {
    console.log(
      'Invalid Environment',
      'You are using this handler in a browser.',
    );
  }

  const promises = require('fs').promises as typeof fsPromises;
  const content = await promises.readFile(path, { encoding: 'utf-8' });

  return content;
}
