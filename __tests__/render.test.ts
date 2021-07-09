import { toMatchImageSnapshot } from 'jest-image-snapshot';

import { PDFMakerError } from '../src/PDFMakerError';
import { render } from '../src/render';
import { work } from '../src/work';

jest.setTimeout(60000);

expect.extend({ toMatchImageSnapshot });

describe('render', () => {
  it('should be return an error because the provider handler is invalid', async () => {
    expect.assertions(1);

    try {
      await render({ handler: 'unknwon' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(PDFMakerError);
    }
  });

  it('should be return a pdf data', async () => {
    const data = await render({
      handler: 'url',
      options: {
        url: 'https://google.com',
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });

  test('check pdf is render correct', async () => {
    const { run, getBrowser } = await work({});
    const page = await run('url', {
      url: 'https://google.com',
    });

    const image = await page.screenshot();

    await getBrowser().close();

    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.1,
      failureThresholdType: 'percent',
    });
  });
});
