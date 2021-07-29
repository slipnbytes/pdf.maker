import { randomBytes } from 'crypto';

import puppeteer, {
  Page as PuppeteerPage,
  Browser as PuppeteerBrowser,
} from 'puppeteer';

import { LAUNCH_BROWSER_OPTIONS } from '../constants';
import { BrowserError } from '../errors/BrowserError';
import type { Page } from '../types';
import { BrowserPagesManager } from './BrowserPagesManager';

const NOT_LAUNCHED_ERROR = new BrowserError('Browser was not launched.');

export class Browser {
  readonly #pages = new BrowserPagesManager();

  #browser: PuppeteerBrowser | null = null;

  constructor() {
    Object.defineProperty(this, '_handleDisconnect', {
      value: this._handleDisconnect.bind(this),
    });
  }

  public get pages(): Page[] {
    return Array.from(this.#pages).map(([, page]) => page);
  }

  public async launch(): Promise<void> {
    if (this.#browser) {
      return;
    }

    const browser = await puppeteer.launch(LAUNCH_BROWSER_OPTIONS);

    this.#browser = browser;
    this.watch();
  }

  public async close(): Promise<void> {
    if (!this.#browser) {
      return;
    }

    const closePagePromises = Array.from(this.#pages).map(([pageId]) =>
      this.closePage(pageId),
    );

    await Promise.allSettled(closePagePromises);
    await this.#browser.close();

    this.#browser = null;
  }

  //

  public async newPage(): Promise<Page> {
    if (!this.#browser) {
      throw NOT_LAUNCHED_ERROR;
    }

    const id = randomBytes(20).toString('hex');
    const page = (await this.#browser.newPage()) as PuppeteerPage & {
      id: string;
    };

    page.once('close', () => {
      if (this.#pages.has(id)) {
        this.#pages.delete(id);
      }
    });

    page.id = id;
    this.#pages.set(id, page);

    return page;
  }

  public getPage(pageId: string): Page {
    if (!this.#pages.has(pageId)) {
      throw new BrowserError('No page found with the inserted id.');
    }

    return this.#pages.get(pageId) as Page;
  }

  public async closePage(pageId: string): Promise<boolean> {
    if (!this.#pages.has(pageId)) {
      return false;
    }

    const page = this.#pages.get(pageId) as Page;

    this.#pages.delete(pageId);

    if (page.isClosed()) {
      return true;
    }

    await page.close();
    return true;
  }

  //

  private watch(): void {
    if (!this.#browser) {
      throw NOT_LAUNCHED_ERROR;
    }

    this.#browser.once('disconnect', this._handleDisconnect);
  }

  // Listeners

  private async _handleDisconnect(): Promise<void> {
    await this.close();
  }
}
