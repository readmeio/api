import type Oas from 'oas';

export default abstract class CodeGenerator {
  spec: Oas;

  userAgent: string;

  constructor(spec: Oas) {
    this.spec = spec;
  }

  abstract generator(): any;
}
