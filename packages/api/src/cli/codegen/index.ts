import type Oas from 'oas';
import type CodeGeneratorLanguage from './language';

import TSGenerator from './languages/typescript';

export default function codegen(
  language: string | 'ts' | 'typescript' | 'js' | 'javascript',
  spec: Oas,
  specPath: string
): CodeGeneratorLanguage {
  if (language === 'ts' || language === 'typescript' || language === 'js' || language === 'javascript') {
    return new TSGenerator(spec, specPath);
  }

  throw new TypeError(`Unsupported language supplied: ${language}`);
}
