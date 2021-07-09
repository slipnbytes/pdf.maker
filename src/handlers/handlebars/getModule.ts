import type handlebars from 'handlebars';

import { PDFMakerError } from '../../PDFMakerError';

export function getModule(): typeof handlebars {
  try {
    return require('handlebars');
  } catch {
    throw new PDFMakerError(
      'No installed package',
      'The package "handlebars" need be installed to use this handler.',
    );
  }
}
