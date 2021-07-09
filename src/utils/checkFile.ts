import type { promises as fsPromises } from 'fs';
import { extname } from 'path';

import { PDFMakerError } from '../PDFMakerError';
import { isBrowser } from './isBrowser';

export async function checkFile(
  path: string,
  extensionRegex: RegExp,
): Promise<true> {
  if (isBrowser()) {
    console.log(
      'Invalid Environment',
      'You are using this handler in a browser.',
    );
  }

  const promises = require('fs').promises as typeof fsPromises;

  try {
    await promises.access(path);
  } catch (error) {
    throw new PDFMakerError(
      'Invalid File',
      `The file inserted not exists.\nPath: ${path}`,
    );
  }

  const fileStat = await promises.lstat(path);

  if (!fileStat.isFile()) {
    throw new PDFMakerError(
      'Invalid File',
      'The file inserted is a directory.',
    );
  }

  const fileExtension = extname(path);

  if (!extensionRegex.test(fileExtension)) {
    throw new PDFMakerError(
      'Invalid File',
      'The file inserted is not expected file.',
    );
  }

  return true;
}
