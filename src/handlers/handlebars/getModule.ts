import type handlebars from 'handlebars';

import { HandlerError } from '../../errors/HandlerError';

export function getModule(): typeof handlebars {
  try {
    return require('handlebars');
  } catch {
    throw new HandlerError(
      'The package "handlebars" need be installed to use this handler.',
    );
  }
}
