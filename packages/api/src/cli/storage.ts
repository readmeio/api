import type { OASDocument } from 'oas/@types/rmoas.types';

import ssri from 'ssri';
import fs from 'fs';
import path from 'path';
import makeDir from 'make-dir';

import { PACKAGE_VERSION } from '../packageInfo';

import Fetcher from '../fetcher';

export default class Storage {
  static dir: string;

  static lockfile: string;

  static apisDir: string;

  /**
   * This is the original source that the file came from (relative/absolute file path, URL, ReadMe
   * registry UUID, etc.).
   */
  source: string;

  identifier: string;

  lockfile: false | Lockfile;

  fetcher: Fetcher;

  constructor(source: string, identifier: string) {
    Storage.setStorageDir();
    Storage.lockfile = path.join(Storage.dir, 'api.json');
    Storage.apisDir = path.join(Storage.dir, 'apis');

    this.fetcher = new Fetcher(source);

    this.source = source;
    this.identifier = identifier;

    // This should default to false so we have awareness if we've looked at the lockfile yet.
    this.lockfile = false;
  }

  static setStorageDir(dir?: string) {
    if (dir) {
      Storage.dir = dir;
      return;
    } else if (Storage.dir) {
      // If we already have a storage dir set and aren't explicitly it to something new then we
      // shouldn't overwrite what we've already got.
      return;
    }

    Storage.dir = makeDir.sync(path.join(__dirname, '.api'));
    makeDir.sync(Storage.apisDir);
  }

  /**
   * Reset the state of the entire storage system.
   *
   * This will completely destroy the contents of the `.api/` directory!
   */
  static async reset() {
    if (Storage.lockfile) {
      await fs.promises.writeFile(Storage.lockfile, JSON.stringify(Storage.getDefaultLockfile(), null, 2));
      // await fs.promises.rm(Storage.lockfile);
    }

    if (Storage.apisDir) {
      await fs.promises.rm(Storage.apisDir, { recursive: true });
      await fs.promises.mkdir(Storage.apisDir, { recursive: true });
    }
  }

  static getDefaultLockfile(): Lockfile {
    return {
      version: '1.0',
      apis: [],
    };
  }

  static generateIntegrityHash(definition: OASDocument) {
    return ssri
      .fromData(JSON.stringify(definition), {
        algorithms: ['sha512'],
      })
      .toString();
  }

  /**
   * Determine if the current spec + identifier we're working with is already in the lockfile.
   */
  isInLockfile() {
    return Boolean(this.getFromLockfile());
  }

  /**
   * Retrieve the lockfile record for the current spec + identifier if it exists in the lockfile.
   */
  getFromLockfile() {
    const lockfile = this.getLockfile();
    return lockfile.apis.find(a => a.identifier === this.identifier);
  }

  getLockfile() {
    if (typeof this.lockfile === 'object') {
      return this.lockfile;
    }

    if (fs.existsSync(Storage.lockfile)) {
      this.lockfile = JSON.parse(fs.readFileSync(Storage.lockfile, 'utf8')) as Lockfile;
    } else {
      this.lockfile = Storage.getDefaultLockfile();
    }

    return this.lockfile;
  }

  getAPIDefinition() {
    if (!this.isInLockfile()) {
      throw new Error(`${this.source} has not been cached yet and must do so before being retrieved.`);
    }

    const identifierStorageDir = path.join(Storage.apisDir, this.identifier);
    return JSON.parse(fs.readFileSync(path.join(identifierStorageDir, 'openapi.json'), 'utf8'));
  }

  async load() {
    return this.fetcher.load().then(async spec => this.save(spec));
  }

  /**
   * @example <caption>Storage directory structure</caption>
   * api/
   * ├── api.js               // The `package-lock.json` equivalent that records everything that's
   * |                        // installed, when it was installed, what the original source was,
   * |                        // and what version of `api` was used.
   * └── apis/
   *     ├── readme/
   *     │   ├── index.js     // We may offer the option to export a raw TS file for folks who want
   *     |   |                  // that, but for now it'll be a compiled JS file.
   *     │   ├── types.ts     // All types for their SDK, ready to use in an IDE.
   *     │   └── openapi.json
   *     └── petstore/
   *         ├── index.js
   *         ├── types.ts
   *         └── openapi.json
   *
   * @param spec
   */
  save(spec: OASDocument) {
    // Create our main `.api/` directory.
    if (!fs.existsSync(Storage.dir)) {
      fs.mkdirSync(Storage.dir, { recursive: true });
    }

    // Create the `.api/apis/` diretory where we'll be storing API definitions.
    if (!fs.existsSync(Storage.apisDir)) {
      fs.mkdirSync(Storage.apisDir, { recursive: true });
    }

    if (!this.isInLockfile()) {
      // This API doesn't exist within our storage system yet so we need to record it in the
      // lockfile.
      const identifierStorageDir = path.join(Storage.apisDir, this.identifier);
      const saved = JSON.stringify(spec, null, 2);

      // Create the `.api/apis/<identifier>` directory where we'll be storing this API definition
      // and eventually its codegen'd SDK.
      if (!fs.existsSync(identifierStorageDir)) {
        fs.mkdirSync(identifierStorageDir, { recursive: true });
      }

      (this.lockfile as Lockfile).apis.push({
        identifier: this.identifier,
        source: this.source,
        integrity: Storage.generateIntegrityHash(spec),
        installerVersion: PACKAGE_VERSION,
      } as LockfileAPI);

      fs.writeFileSync(path.join(identifierStorageDir, 'openapi.json'), saved);
      fs.writeFileSync(Storage.lockfile, JSON.stringify(this.lockfile, null, 2));
    } else {
      // Is this the same spec that we already have? Should we update it? // @todo
    }

    return spec;
  }
}

export type Lockfile = {
  /**
   * The `api.json` schema version. This will only ever change if we introduce breaking changes to
   * this store.
   */
  version: '1.0';
  apis: LockfileAPI[];
};

export type LockfileAPI = {
  /**
   * A unique identifier of the API. This'll be used to do requires on `@api/<identifier>` and also
   * where the SDK code will be located in `.api/apis/<identifier>`.
   *
   * @example petstore
   */
  identifier: string;

  /**
   * The original source that was used to generate the SDK with.
   *
   * @example https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore-simple.json
   * @example ./petstore.json
   * @example @developers/v2.0#nysezql0wwo236
   */
  source: string;

  /**
   * An integrity hash that will be used to determine on `npx api update` calls if the API has
   * changed since the SDK was last generated.
   *
   * @example sha512-ld+djZk8uRWmzXC+JYla1PTBScg0NjP/8x9vOOKRW+DuJ3NNMRjrpfbY7T77Jgnc87dZZsU49robbQfYe3ukug==
   */
  integrity: string;

  /**
   * The version of `api` that was used to install this SDK.
   *
   * @example 5.0.0
   */
  installerVersion: string;
};
