import type Oas from 'oas';
import type Storage from '../storage';

export interface InstallerOptions {
  /**
   * Will initiate a dry run install process. Used for simulating installations within a unit test.
   */
  dryRun?: boolean;

  /**
   * Used for stubbing out the logger that we use within the installation process so it can be
   * easily introspected without having to mock out `console.*`.
   */
  logger?: (msg: string) => void;
}

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

  abstract installer(storage: Storage, opts?: InstallerOptions): Promise<void>;

  hasRequiredPackages() {
    return Boolean(Object.keys(this.requiredPackages));
  }
}
