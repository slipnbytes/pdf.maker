import type { Context, AnyObject, Handler, HandlerArcade } from './types';

export function makeHandler<Name extends string, Options extends AnyObject>(
  name: Name,
  handler: HandlerArcade<Options>,
): Handler<Name, Options> {
  return {
    name,
    async make(context: Context<Options>) {
      const result = handler(context);

      if (result && result instanceof Promise) {
        await result;
      }

      return context.page;
    },
  };
}
