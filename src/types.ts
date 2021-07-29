import type { Page as PuppeteerPage } from 'puppeteer';

import type { handlers } from './handlers';

export type AnyObject = Record<string, any>;

//

export interface Page extends PuppeteerPage {
  readonly id: string;
}

//

export interface Context<Options> {
  page: Page;
  options: Options;
}

//

export interface WorkerOptions {
  __render?: boolean;
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

export type GetHandler<Name extends HandlersName> = Exclude<
  HandlersType,
  Handler<Exclude<HandlersName, Name>, any>
> extends Handler<Name, infer Options>
  ? Handler<Name, Options>
  : never;

export type GetHandlerOptions<Name extends HandlersName> = Exclude<
  HandlersType,
  Handler<Exclude<HandlersName, Name>, any>
> extends Handler<Name, infer Options>
  ? Options
  : never;
