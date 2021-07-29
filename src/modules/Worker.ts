import { BrowserManager } from '../browser/BrowserManager';
import { PDF_MAKE_OPTIONS } from '../constants';
import type { WorkerOptions, HandlersName, GetHandlerOptions } from '../types';
import { HandlerRunner } from './HandlerRunner';

export class Worker {
  public readonly browserManager = new BrowserManager();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(private options: WorkerOptions) {}

  public async execute<HandlerName extends HandlersName>(
    handlerName: HandlerName,
    handlerOptions: GetHandlerOptions<HandlerName>,
  ): Promise<Buffer> {
    const handlerRunner = new HandlerRunner(this.browserManager);

    await handlerRunner.verify(handlerName, handlerOptions);
    await this.browserManager.open();

    const pageId = await handlerRunner.run(handlerName, handlerOptions);
    const pdf = await this.renderPDF(pageId);

    process.nextTick(async () => {
      await this.browserManager.browser.closePage(pageId);
    });

    return pdf;
  }

  public async renderPDF(pageId: string): Promise<Buffer> {
    const page = this.browserManager.browser.getPage(pageId);
    const pdf = await page.pdf(PDF_MAKE_OPTIONS);

    return pdf;
  }
}
