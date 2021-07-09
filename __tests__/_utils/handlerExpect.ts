import type { Handler, AnyObject } from '../../src/types';

export const handlerExpect = expect.objectContaining<
  Handler<'handler', AnyObject>
>({
  name: expect.any(String),
  make: expect.any(Function),
});
