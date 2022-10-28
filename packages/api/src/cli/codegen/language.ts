import type Storage from '../storage';
import type Oas from 'oas';

import { PACKAGE_NAME, PACKAGE_VERSION } from '../../packageInfo';

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

  identifier: string;

  userAgent: string;

  requiredPackages: Record<string, { reason: string; url: string }>;

  constructor(spec: Oas, specPath: string, identifier: string) {
    this.spec = spec;
    this.specPath = specPath;

    // User agents should be contextual to the spec in question and the version of `api` that was
    // used to generate the SDK. For example, this'll look like `petstore/1.0.0 (api/4.2.0)` for
    // a `petstore` spec installed on api@4.2.0.
    const info = spec.getDefinition().info;
    this.userAgent = `${identifier}/${info.version} (${PACKAGE_NAME}/${PACKAGE_VERSION})`;

    /**
     * This check is barbaric but there are a number of issues with how the `transformer` work we
     * have in `oas` and in `.getParametersAsJSONSchema()` and `.getResponseAsJSONSchema()` that
     * are fully crashing when attempting to codegen an SDK for an API definition that has a
     * circular reference.
     *
     * In order to get v5 out the door we're not going to support this case initialy.
     *
     * @see {@link https://github.com/readmeio/api/issues/549}
     */
    if (JSON.stringify(spec.api).includes('"$ref":"#/')) {
      throw new Error(
        'Sorry, this library does not yet support generating an SDK for an OpenAPI definition that contains circular references.'
      );
    }
  }

  abstract generator(): Promise<Record<string, string>>;

  abstract installer(storage: Storage, opts?: InstallerOptions): Promise<void>;

  hasRequiredPackages() {
    return Boolean(Object.keys(this.requiredPackages));
  }
}
