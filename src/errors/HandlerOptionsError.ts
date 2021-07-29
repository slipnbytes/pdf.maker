import { ErrorBase } from './ErrorBase';

export class HandlerOptionsError extends ErrorBase {
  constructor(message: string) {
    super(message);

    this.name = 'HandlerOptionsError';
  }
}
