import { resolve } from 'path';

import { PDFMakerError } from '../../PDFMakerError';
import { checkFile } from '../checkFile';

const EXTENSION_REGEX = /\.html$/;

describe('url handler', () => {
  describe('checkFile', () => {
    it('should be return false because file is not exists', async () => {
      expect.assertions(1);

      try {
        await checkFile(
          resolve(__dirname, '.', '_fixtures', 'unknown.html'),
          EXTENSION_REGEX,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(PDFMakerError);
      }
    });

    it('should be return false because file is not html', async () => {
      expect.assertions(2);

      try {
        await checkFile(resolve(__dirname, '.', '_fixtures'), EXTENSION_REGEX);
      } catch (error) {
        expect(error).toBeInstanceOf(PDFMakerError);
      }

      try {
        await checkFile(
          resolve(__dirname, '.', '_fixtures', 'file.txt'),
          EXTENSION_REGEX,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(PDFMakerError);
      }
    });

    it('should be return true because the file is valid', async () => {
      expect(
        await checkFile(
          resolve(__dirname, '.', '_fixtures', 'file.html'),
          EXTENSION_REGEX,
        ),
      ).toBe(true);
    });
  });
});
