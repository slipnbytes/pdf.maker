import { resolve } from 'path';

import { HandlerOptionsError } from '../../src/errors/HandlerOptionsError';
import { urlHandler } from '../../src/handlers/url';
import { render } from '../../src/render';
import { getFileContent } from '../../src/utils/getFileContent';
import { handlerExpect } from '../_utils/handlerExpect';

const HTML_PDF_FILE_PATH = resolve(__dirname, '..', '_fixtures', 'pdf.html');

describe('html handler', () => {
  it('should be a valid handler', () => {
    expect(urlHandler).toEqual(handlerExpect);
  });

  it('should be return an error because not provided valid options', async () => {
    expect.assertions(1);

    try {
      await render({ handler: 'html', options: {} as any });
    } catch (error) {
      expect(error).toBeInstanceOf(HandlerOptionsError);
    }
  });

  it('should be render a pdf using file', async () => {
    const data = await render({
      handler: 'html',
      options: {
        path: HTML_PDF_FILE_PATH,
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });

  it('should be render a pdf using content', async () => {
    const content = await getFileContent(HTML_PDF_FILE_PATH);
    const data = await render({
      handler: 'html',
      options: {
        content,
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });
});
