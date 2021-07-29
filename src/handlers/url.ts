import type { Handler } from '../types';

export interface URLHandlerOptions {
  url: string;
}

export const urlHandler: Handler<'url', URLHandlerOptions> = {
  name: 'url',
  async run({ page, options }) {
    await page.goto(options.url, {
      waitUntil: 'networkidle0',
    });
  },
};
