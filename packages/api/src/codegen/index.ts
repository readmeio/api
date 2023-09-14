import type CodeGeneratorLanguage from './language';
import type Oas from 'oas';

import TSGenerator from './languages/typescript';

export type SupportedLanguages = 'js' | 'js-cjs' | 'js-esm' | 'ts';

export default function codegen(
  language: SupportedLanguages,
  spec: Oas,
  specPath: string,
  identifier: string,
): CodeGeneratorLanguage {
  switch (language) {
    case 'js':
      throw new TypeError('An export format of CommonJS or ECMAScript is required for JavaScript compilation.');

    case 'js-cjs':
    case 'js-esm':
    case 'ts':
      return new TSGenerator(spec, specPath, identifier, {
        outputJS: ['js-cjs', 'js-esm'].includes(language),

        // TS will always generate with ESM-like exports.
        compilerTarget: language === 'js-cjs' ? 'cjs' : 'esm',
      });

    default:
      throw new TypeError(`Unsupported language supplied: ${language}`);
  }
}
