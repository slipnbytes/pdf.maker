import { BrowserManager } from '../src/browser/BrowserManager';
import { HandlerRunnerError } from '../src/errors/HandlerRunnerError';
import { HandlerRunner } from '../src/modules/HandlerRunner';
import { render } from '../src/render';

describe('render', () => {
  it('should be return an error because the provider handler is invalid', async () => {
    expect.assertions(1);

    try {
      await render({ handler: 'unknwon' } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(HandlerRunnerError);
    }
  });

  it('should be return a pdf data', async () => {
    const data = await render({
      handler: 'url',
      options: {
        url: 'https://i.imgur.com/Rvs3uLI.png',
      },
    });

    expect(data).toBeInstanceOf(Buffer);
  });

  test('check if pdf is rendered correctly', async () => {
    const browserManager = new BrowserManager();
    const handlerRunner = new HandlerRunner(browserManager);

    const pageId = await handlerRunner.run('url', {
      url: 'https://google.com',
    });

    const page = browserManager.browser.getPage(pageId);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.2,
      failureThresholdType: 'percent',
    });
  });
});
