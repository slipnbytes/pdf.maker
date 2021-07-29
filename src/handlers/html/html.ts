import { HandlerOptionsError } from '../../errors/HandlerOptionsError';
import type { Handler } from '../../types';
import { checkFile } from '../../utils/checkFile';
import { getFileContent } from '../../utils/getFileContent';

export interface HTMLHandlerOptions {
  path?: string;
  content?: string;
}

const HTML_EXTENSION_REGEX = /\.html$/;

export const htmlHandler: Handler<'html', HTMLHandlerOptions> = {
  name: 'html',
  async verify({ path, content }) {
    if (!path && !content) {
      throw new HandlerOptionsError('No "path" or "content" was provided.');
    }

    if (path) {
      await checkFile(path, HTML_EXTENSION_REGEX);
    }
  },
  async run({ page, options: { path, content } }) {
    let contentParsed: string = content as string;

    if (path) {
      const pathContent = await getFileContent(path);

      contentParsed = pathContent;
    }

    await page.setContent(contentParsed);
  },
};
