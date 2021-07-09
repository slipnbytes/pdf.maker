import { makeHandler } from '../src/makeHandler';
import { handlerExpect } from './_utils/handlerExpect';

describe('makeHandler', () => {
  it('should be return a valid handler', () => {
    const handler = makeHandler('handler', () => {
      //
    });

    expect(handler).toEqual(handlerExpect);
  });
});
