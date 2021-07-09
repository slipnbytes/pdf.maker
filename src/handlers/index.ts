import { handlebarsHandler } from './handlebars';
import { htmlHandler } from './html';
import { urlHandler } from './url';

export const handlers = [urlHandler, htmlHandler, handlebarsHandler] as const;
