import { BrowserManager } from '../src/browser/BrowserManager';

afterAll(async () => {
  await new BrowserManager().browser.close();
});
