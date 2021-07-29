import type { BrowserManager } from '../browser/BrowserManager';
import { HandlerRunnerError } from '../errors/HandlerRunnerError';
import { handlers } from '../handlers';
import type {
  HandlersName,
  HandlersType,
  GetHandler,
  GetHandlerOptions,
} from '../types';

export class HandlerRunner {
  static readonly #handlersCache = new Map<HandlersName, HandlersType>();

  constructor(private browserManager: BrowserManager) {}

  public async run<HandlerName extends HandlersName>(
    handlerName: HandlerName,
    handlerOptions: GetHandlerOptions<HandlerName>,
  ): Promise<string> {
    const handler = this.findHandler(handlerName);
    const page = await this.browserManager.browser.newPage();

    await handler.run({
      page,
      options: handlerOptions,
    });

    return page.id;
  }

  public async verify<HandlerName extends HandlersName>(
    handlerName: HandlerName,
    handlerOptions: GetHandlerOptions<HandlerName>,
  ): Promise<true> {
    const handler = this.findHandler(handlerName);

    await handler.verify?.(handlerOptions);

    return true;
  }

  private findHandler<HandlerName extends HandlersName>(
    handlerName: HandlerName,
  ): GetHandler<HandlerName> {
    const handlersCache = HandlerRunner.#handlersCache;

    if (handlersCache.has(handlerName)) {
      return handlersCache.get(handlerName) as GetHandler<HandlerName>;
    }

    const findedHandler = handlers.find(({ name }) => name === handlerName);

    if (!findedHandler) {
      throw new HandlerRunnerError('The "handler" inserted is invalid.');
    }

    handlersCache.set(handlerName, findedHandler);
    return findedHandler as GetHandler<HandlerName>;
  }
}
