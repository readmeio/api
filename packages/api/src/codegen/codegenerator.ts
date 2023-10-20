import type { InstallerOptions } from './factory.js';
import type Storage from '../storage.js';
import type Oas from 'oas';

import { PACKAGE_NAME, PACKAGE_VERSION } from '../packageInfo.js';

export default abstract class CodeGenerator {
  spec: Oas;

  specPath: string;

  identifier: string;

  userAgent: string;

  requiredPackages!: Record<
    string,
    {
      dependencyType: 'production' | 'development';
      reason: string;
      url?: string;
      version: string;
    }
  >;

  constructor(spec: Oas, specPath: string, identifier: string) {
    this.spec = spec;
    this.specPath = specPath;
    this.identifier = identifier;

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
        'Sorry, this library does not yet support generating an SDK for an OpenAPI definition that contains circular references.',
      );
    }
  }

  abstract generate(): Promise<Record<string, string>>;

  abstract install(storage: Storage, opts?: InstallerOptions): Promise<void>;

  /**
   * It would be better if this were an abstract function but TS/JS doesn't have support for that so
   * we instead have to rely on throwing a `TypeError` if it's not been implemented instead of a
   * build-time error.
   *
   * @see {@link https://github.com/microsoft/TypeScript/issues/34516}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async uninstall(storage: Storage, opts?: InstallerOptions): Promise<void> {
    throw new TypeError('The uninstallation step for this language has not been implemented');
  }

  abstract compile(storage: Storage, opts?: InstallerOptions): Promise<void>;

  hasRequiredPackages() {
    return Boolean(Object.keys(this.requiredPackages));
  }
}
