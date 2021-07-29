import { urlHandler } from '../../src/handlers/url';
import { render } from '../../src/render';
import { handlerExpect } from '../_utils/handlerExpect';

describe('url handler', () => {
  it('should be a valid handler', () => {
    expect(urlHandler).toEqual(handlerExpect);
  });

  it('should be render a pdf', async () => {
    const data = await render({
      handler: 'url',
      options: {
        url: 'https://google.com',
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });
});
