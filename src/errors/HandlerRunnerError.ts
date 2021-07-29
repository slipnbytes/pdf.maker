import { ErrorBase } from './ErrorBase';

export class HandlerRunnerError extends ErrorBase {
  constructor(message: string) {
    super(message);

    this.name = 'HandlerRunnerError';
  }
}
