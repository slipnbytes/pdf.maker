import type { Page, Browser } from 'puppeteer';

import type { handlers } from './handlers';

export type AnyObject = Record<string, any>;

//

export interface Context<Options> {
  page: Page;
  options: Options;
}

//

export interface WorkOptions {
  __render?: boolean;
}

export interface WorkFactory {
  getPage(): Page;
  getBrowser(): Browser;
  makePDF(): Promise<Buffer>;
  run<HandlerName extends HandlersName>(
    handlerName: HandlerName,
    options: GetHandlerOptions<HandlerName>,
  ): Promise<Page>;
}

//

export interface MakeHandlerOptions {
  name: string;
}

export interface RenderOptions<HandlerName extends HandlersName> {
  handler: HandlerName;
  options: GetHandlerOptions<HandlerName>;
}

// Handler

export type HandlersType = typeof handlers[number];

export type HandlersName = HandlersType['name'];

export interface Handler<Name extends string, Options extends AnyObject> {
  readonly name: Name;
  run(context: Context<Options>): Promise<void>;
  verify?(options: Options): Promise<void>;
}

export type GetHandlerOptions<Name extends HandlersName> = Exclude<
  HandlersType,
  Handler<Exclude<HandlersName, Name>, any>
> extends Handler<Name, infer Options>
  ? Options
  : never;
