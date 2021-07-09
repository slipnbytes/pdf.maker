export class PDFMakerError extends Error {
  constructor(placeholder: string, message: string) {
    super(message);

    this.name = `PDFMakerError: ${placeholder}`;

    Error.captureStackTrace(this, PDFMakerError);
  }
}
