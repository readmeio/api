import type Oas from 'oas';
import type { ExecaChildProcess } from 'execa';

export default abstract class CodeGenerator {
  spec: Oas;

  specPath: string;

  userAgent: string;

  requiredPackages: Record<string, { reason: string; url: string }>;

  constructor(spec: Oas, specPath: string) {
    this.spec = spec;
    this.specPath = specPath;
  }

  abstract generator(): Promise<Record<string, string>>;

  abstract installer(): ExecaChildProcess<string>;

  hasRequiredPackages() {
    return Boolean(Object.keys(this.requiredPackages));
  }
}
