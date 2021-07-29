import { ErrorBase } from './ErrorBase';

export class GenericError extends ErrorBase {
  constructor(message: string) {
    super(message);

    this.name = 'GenericError';
  }
}
