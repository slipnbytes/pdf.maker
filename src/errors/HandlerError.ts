import { ErrorBase } from './ErrorBase';

export class HandlerError extends ErrorBase {
  constructor(message: string) {
    super(message);

    this.name = 'HandlerError';
  }
}
