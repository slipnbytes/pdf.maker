import type { compile } from 'handlebars';

import { makeHandler } from '../../makeHandler';
import { PDFMakerError } from '../../PDFMakerError';
import { checkFile } from '../../utils/checkFile';
import { getFileContent } from '../../utils/getFileContent';
import { getModule } from './getModule';

export interface HandlebarsHandlerOptions {
  path: string;
  context?: Record<string, any>;
  compileOptions?: Exclude<Parameters<typeof compile>[1], undefined>;
}

const HANDLEBARS_EXTENSION_REGEX = /\.hbs$/;

export const handlebarsHandler = makeHandler<
  'handlebars',
  HandlebarsHandlerOptions
>(
  'handlebars',
  async ({ page, options: { path, context = {}, compileOptions = {} } }) => {
    if (!path) {
      throw new PDFMakerError('Input Error', 'No "path" was provided.');
    }

    await checkFile(path, HANDLEBARS_EXTENSION_REGEX);

    const handlebars = getModule();

    const content = await getFileContent(path);
    const template = handlebars.compile(content, compileOptions);
    const view = template(context);

    await page.setContent(view);
  },
);
