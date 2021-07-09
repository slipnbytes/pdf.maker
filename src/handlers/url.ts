import { makeHandler } from '../makeHandler';

export interface URLHandlerOptions {
  url: string;
}

export const urlHandler = makeHandler<'url', URLHandlerOptions>(
  'url',
  async ({ page, options }) => {
    await page.goto(options.url, {
      waitUntil: 'networkidle0',
    });
  },
);
