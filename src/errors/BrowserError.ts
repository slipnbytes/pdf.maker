import { ErrorBase } from './ErrorBase';

export class BrowserError extends ErrorBase {
  constructor(message: string) {
    super(message);

    this.name = 'BrowserError';
  }
}
