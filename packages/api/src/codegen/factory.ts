import type CodeGenerator from './codegenerator.js';
import type Storage from '../storage.js';
import type Oas from 'oas';

import TSGenerator from './languages/typescript/index.js';

export const SupportedLanguages = {
  JS: 'js',
} as const;

type ObjectValues<T> = T[keyof T];

export type SupportedLanguageType = ObjectValues<typeof SupportedLanguages>;

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

export function codegenFactory(
  language: SupportedLanguageType,
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

export function uninstallerFactory(
  language: SupportedLanguageType,
  storage: Storage,
  opts: InstallerOptions = {},
): Promise<void> {
  switch (language) {
    case SupportedLanguages.JS:
      return TSGenerator.uninstall(storage, opts);

    default:
      throw new TypeError(`Unsupported language supplied: ${language}`);
  }
}
