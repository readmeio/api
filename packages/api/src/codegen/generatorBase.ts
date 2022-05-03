import type Oas from 'oas';

export default abstract class CodeGenerator {
  spec: Oas;

  specPath: string;

  userAgent: string;

  constructor(spec: Oas, specPath: string) {
    this.spec = spec;
    this.specPath = specPath;
  }

  abstract generator(): Promise<Record<string, string>>;
}
