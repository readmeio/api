import type Oas from 'oas';
import type CodeGenerator from './generatorBase';

import TSGenerator from './typescript';

export default function codegen(language: 'ts' | 'js', spec: Oas, specPath: string): CodeGenerator {
  if (language === 'ts' || language === 'js') {
    return new TSGenerator(spec, specPath);
  }

  throw new TypeError('Unsupported language supplied.');
}
