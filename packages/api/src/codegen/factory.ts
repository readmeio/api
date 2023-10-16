import type CodeGenerator from './codegenerator.js';
import type Oas from 'oas';

import TSGenerator from './languages/typescript/index.js';

export enum SupportedLanguages {
  JS = 'js',
}

export default function codegenFactory(
  language: SupportedLanguages,
  spec: Oas,
  specPath: string,
  identifier: string,
): CodeGenerator {
  switch (language) {
    case SupportedLanguages.JS:
      return new TSGenerator(spec, specPath, identifier);

    default:
      throw new TypeError(`Unsupported language supplied: ${language}`);
  }
}
