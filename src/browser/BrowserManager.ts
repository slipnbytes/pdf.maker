import { Browser } from './Browser';

export class BrowserManager {
  static readonly #browser = new Browser();

  get browser(): Browser {
    return BrowserManager.#browser;
  }

  public async open(): Promise<this> {
    await this.browser.launch();

    return this;
  }
}
