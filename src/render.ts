import type { RenderOptions, HandlersName } from './types';
import { work } from './work';

export async function render<HandlerName extends HandlersName>(
  options: RenderOptions<HandlerName>,
): Promise<Buffer> {
  const { handler: handlerName, options: handlerOptions } = options;
  const { run, makePDF, getBrowser } = await work({});

  try {
    await run(handlerName, handlerOptions);

    const pdf = await makePDF();

    await getBrowser().close();
    return pdf;
  } catch (error) {
    await getBrowser().close();
    throw error;
  }
}
