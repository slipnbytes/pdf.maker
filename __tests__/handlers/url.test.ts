import { urlHandler } from '../../src/handlers/url';
import { handlerExpect } from '../_utils/handlerExpect';

describe('url handler', () => {
  it('should be a valid handler', () => {
    expect(urlHandler).toEqual(handlerExpect);
  });
});
