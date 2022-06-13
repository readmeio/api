import type Oas from 'oas';
import type CodeGenerator from './generatorBase';

import TSGenerator from './typescript';

export default function codegen(
  language: string | 'ts' | 'typescript' | 'js' | 'javascript',
  spec: Oas,
  specPath: string
): CodeGenerator {
  if (language === 'ts' || language === 'typescript' || language === 'js' || language === 'javascript') {
    return new TSGenerator(spec, specPath);
  }

  throw new TypeError(`Unsupported language supplied: ${language}`);
}
