import puppeteer, { Page, Browser } from 'puppeteer';

import { PDF_MAKE_OPTIONS, LAUNCH_BROWSER_OPTIONS } from './constants';
import { handlers } from './handlers';
import { PDFMakerError } from './PDFMakerError';
import type {
  WorkFactory,
  WorkOptions,
  HandlersName,
  HandlersType,
  GetHandlerOptions,
} from './types';

const handlersCache = new Map<HandlersName, HandlersType>();

export async function work(_options: WorkOptions): Promise<WorkFactory> {
  const browser = await puppeteer.launch(LAUNCH_BROWSER_OPTIONS);
  const page = await browser.newPage();

  return {
    getPage(): Page {
      return page;
    },
    getBrowser(): Browser {
      return browser;
    },
    async makePDF(): Promise<Buffer> {
      const pdf = await page.pdf(PDF_MAKE_OPTIONS);

      return pdf;
    },
    async run<HandlerName extends HandlersName>(
      handlerName: HandlerName,
      handlerOptions: GetHandlerOptions<HandlerName>,
    ): Promise<Page> {
      const handler = findHandler(handlerName);

      const context = {
        page,
        options: handlerOptions,
      };

      return handler.make(context as any);
    },
  };
}

function findHandler(handlerName: HandlersName): HandlersType {
  if (handlersCache.has(handlerName)) {
    return handlersCache.get(handlerName) as HandlersType;
  }

  const findedHandler = handlers.find(({ name }) => name === handlerName);

  if (!findedHandler) {
    throw new PDFMakerError(
      'Invalid Handler',
      'The "handler" inserted not exists.',
    );
  }

  handlersCache.set(handlerName, findedHandler);
  return findedHandler;
}
