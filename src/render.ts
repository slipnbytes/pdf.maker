import { Worker } from './modules/Worker';
import type { RenderOptions, HandlersName } from './types';

export async function render<HandlerName extends HandlersName>(
  options: RenderOptions<HandlerName>,
): Promise<Buffer> {
  const { handler: handlerName, options: handlerOptions } = options;

  const worker = new Worker({});
  const pdf = await worker.execute(handlerName, handlerOptions);

  return pdf;
}
