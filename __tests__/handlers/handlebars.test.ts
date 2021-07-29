import { resolve } from 'path';

import { HandlerError } from '../../src/errors/HandlerError';
import { HandlerOptionsError } from '../../src/errors/HandlerOptionsError';
import { handlebarsHandler } from '../../src/handlers/handlebars';
import { render } from '../../src/render';
import { handlerExpect } from '../_utils/handlerExpect';

const HANDLEBARS_PDF_FILE_PATH = resolve(
  __dirname,
  '..',
  '_fixtures',
  'pdf.hbs',
);

describe('handlebars handler', () => {
  it('should be a valid handler', () => {
    expect(handlebarsHandler).toEqual(handlerExpect);
  });

  it('should be return an error because not provided valid options', async () => {
    expect.assertions(1);

    try {
      await render({ handler: 'handlebars', options: {} as any });
    } catch (error) {
      expect(error).toBeInstanceOf(HandlerOptionsError);
    }
  });

  it('should be return an error because required module is not installed', async () => {
    jest.mock('handlebars', () => {
      throw new ReferenceError();
    });

    expect.assertions(1);

    try {
      await render({
        handler: 'handlebars',
        options: {
          path: HANDLEBARS_PDF_FILE_PATH,
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HandlerError);
    } finally {
      jest.unmock('handlebars');
    }
  });

  it('should be render a pdf', async () => {
    const data = await render({
      handler: 'handlebars',
      options: {
        path: HANDLEBARS_PDF_FILE_PATH,
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });
});
