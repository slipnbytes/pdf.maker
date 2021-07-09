import { makeHandler } from '../../makeHandler';
import { PDFMakerError } from '../../PDFMakerError';
import { checkFile } from '../../utils/checkFile';
import { getFileContent } from '../../utils/getFileContent';

export interface HTMLHandlerOptions {
  path?: string;
  content?: string;
}

const HTML_EXTENSION_REGEX = /\.html$/;

export const htmlHandler = makeHandler<'html', HTMLHandlerOptions>(
  'html',
  async ({ page, options: { path, content } }) => {
    if (!path && !content) {
      throw new PDFMakerError(
        'Input Error',
        'No "path" or "content" was provided.',
      );
    }

    let contentParsed: string | undefined = content;

    if (path) {
      await checkFile(path, HTML_EXTENSION_REGEX);

      const pathContent = await getFileContent(path);

      contentParsed = pathContent;
    }

    if (!contentParsed) {
      return;
    }

    await page.setContent(contentParsed);
  },
);
