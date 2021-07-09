import type { PDFOptions, PuppeteerNodeLaunchOptions } from 'puppeteer';

export const LAUNCH_BROWSER_OPTIONS: PuppeteerNodeLaunchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

export const PDF_MAKE_OPTIONS: PDFOptions = {
  format: 'a4',
  printBackground: true,
  displayHeaderFooter: true,
};
