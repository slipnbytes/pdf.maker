export class ErrorBase extends Error {
  constructor(message: string) {
    super(message);

    Error.captureStackTrace(this, ErrorBase);
  }
}
