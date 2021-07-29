import type { compile } from 'handlebars';

import { HandlerOptionsError } from '../../errors/HandlerOptionsError';
import type { Handler } from '../../types';
import { checkFile } from '../../utils/checkFile';
import { getFileContent } from '../../utils/getFileContent';
import { getModule } from './getModule';

export interface HandlebarsHandlerOptions {
  path: string;
  context?: Record<string, any>;
  compileOptions?: Exclude<Parameters<typeof compile>[1], undefined>;
}

const HANDLEBARS_EXTENSION_REGEX = /\.hbs$/;

export const handlebarsHandler: Handler<
  'handlebars',
  HandlebarsHandlerOptions
> = {
  name: 'handlebars',
  async verify({ path }) {
    getModule();

    if (!path) {
      throw new HandlerOptionsError('No "path" was provided.');
    }

    await checkFile(path, HANDLEBARS_EXTENSION_REGEX);
  },
  async run({ page, options: { path, context = {}, compileOptions = {} } }) {
    const handlebars = getModule();

    const content = await getFileContent(path);
    const template = handlebars.compile(content, compileOptions);
    const view = template(context);

    await page.setContent(view);
  },
};
