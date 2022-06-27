import type Oas from 'oas';
import type { ExecaChildProcess } from 'execa';
import type Storage from '../cli/storage';

export default abstract class CodeGeneratorLanguage {
  spec: Oas;

  specPath: string;

  userAgent: string;

  requiredPackages: Record<string, { reason: string; url: string }>;

  constructor(spec: Oas, specPath: string) {
    this.spec = spec;
    this.specPath = specPath;
  }

  abstract generator(): Promise<Record<string, string>>;

  abstract installer(storage: Storage): Promise<ExecaChildProcess<string>>;

  hasRequiredPackages() {
    return Boolean(Object.keys(this.requiredPackages));
  }
}
