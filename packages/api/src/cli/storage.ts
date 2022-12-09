import type { OASDocument } from 'oas/dist/rmoas.types';

import fs from 'fs';
import path from 'path';

import makeDir from 'make-dir';
import ssri from 'ssri';

import Fetcher from '../fetcher';
import { PACKAGE_VERSION } from '../packageInfo';

export default class Storage {
  static dir: string;

  static lockfile: false | Lockfile;

  /**
   * This is the original source that the file came from (relative/absolute file path, URL, ReadMe
   * registry UUID, etc.).
   */
  source: string;

  identifier: string;

  fetcher: Fetcher;

  constructor(source: string, identifier?: string) {
    Storage.setStorageDir();

    this.fetcher = new Fetcher(source);

    this.source = source;
    this.identifier = identifier;

    // This should default to false so we have awareness if we've looked at the lockfile yet.
    Storage.lockfile = false;
  }

  static getLockfilePath() {
    return path.join(Storage.dir, 'api.json');
  }

  static getAPIsDir() {
    return path.join(Storage.dir, 'apis');
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

    Storage.dir = makeDir.sync(path.join(process.cwd(), '.api'));

    makeDir.sync(Storage.getAPIsDir());
  }

  /**
   * Reset the state of the entire storage system.
   *
   * This will completely destroy the contents of the `.api/` directory!
   */
  static async reset() {
    if (Storage.getLockfilePath()) {
      await fs.promises.writeFile(Storage.getLockfilePath(), JSON.stringify(Storage.getDefaultLockfile(), null, 2));
    }

    if (Storage.getAPIsDir()) {
      await fs.promises.rm(Storage.getAPIsDir(), { recursive: true });
      await fs.promises.mkdir(Storage.getAPIsDir(), { recursive: true });
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

  static getLockfile() {
    if (typeof Storage.lockfile === 'object') {
      return Storage.lockfile;
    }

    if (fs.existsSync(Storage.getLockfilePath())) {
      const file = fs.readFileSync(Storage.getLockfilePath(), 'utf8');
      Storage.lockfile = JSON.parse(file) as Lockfile;
    } else {
      Storage.lockfile = Storage.getDefaultLockfile();
    }

    return Storage.lockfile;
  }

  static isInLockFile(search: { identifier?: string; source?: string }) {
    // Because this method may run before we initialize a new storage object we should make sure
    // that we have a storage directory present.
    Storage.setStorageDir();

    if (!search.identifier && !search.source) {
      throw new TypeError('An `identifier` or `source` must be supplied to this method to search in the lockfile.');
    }

    const lockfile = Storage.getLockfile();
    if (typeof lockfile !== 'object' || lockfile === null || !lockfile.apis) {
      return false;
    }

    const res = lockfile.apis.find(a => {
      if (search.identifier) {
        return a.identifier === search.identifier;
      }

      return a.source === search.source;
    });

    return res === undefined ? false : res;
  }

  setIdentifier(identifier: string) {
    this.identifier = identifier;
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
    const lockfile = Storage.getLockfile();
    return lockfile.apis.find(a => a.identifier === this.identifier);
  }

  getIdentifierStorageDir() {
    if (!this.isInLockfile()) {
      throw new Error(`${this.source} has not been saved to storage yet and must do so before being retrieved.`);
    }

    return path.join(Storage.getAPIsDir(), this.identifier);
  }

  getAPIDefinition() {
    const file = fs.readFileSync(path.join(this.getIdentifierStorageDir(), 'openapi.json'), 'utf8');

    return JSON.parse(file);
  }

  saveSourceFiles(files: Record<string, string>) {
    if (!this.isInLockfile()) {
      throw new Error(`${this.source} has not been saved to storage yet and must do so before being retrieved.`);
    }

    return new Promise(resolve => {
      const savedSource: string[] = [];
      Object.entries(files).forEach(([fileName, contents]) => {
        const sourceFilePath = path.join(this.getIdentifierStorageDir(), fileName);

        fs.writeFileSync(sourceFilePath, contents);

        savedSource.push(sourceFilePath);
      });

      resolve(savedSource);
    });
  }

  async load() {
    return this.fetcher.load().then(async spec => this.save(spec));
  }

  /**
   * @example <caption>Storage directory structure</caption>
   * .api/
   * ├── api.json             // The `package-lock.json` equivalent that records everything that's
   * |                        // installed, when it was installed, what the original source was,
   * |                        // and what version of `api` was used.
   * └── apis/
   *     ├── readme/
   *     |   ├── node_modules/
   *     │   ├── index.js     // We may offer the option to export a raw TS file for folks who want
   *     |   |                // that, but for now it'll be a compiled JS file.
   *     │   ├── index.d.ts   // All types for their SDK, ready to use in an IDE.
   *     │   |── openapi.json
   *     │   └── package.json
   *     └── petstore/
   *         ├── node_modules/
   *         ├── index.js
   *         ├── index.d.ts
   *         ├── openapi.json
   *         └── package.json
   *
   * @param spec
   */
  save(spec: OASDocument) {
    if (!this.identifier) {
      throw new TypeError('An identifier must be set before saving the API definition into storage.');
    }

    // Create our main `.api/` directory.
    if (!fs.existsSync(Storage.dir)) {
      fs.mkdirSync(Storage.dir, { recursive: true });
    }

    // Create the `.api/apis/` diretory where we'll be storing API definitions.
    if (!fs.existsSync(Storage.getAPIsDir())) {
      fs.mkdirSync(Storage.getAPIsDir(), { recursive: true });
    }

    if (!this.isInLockfile()) {
      // This API doesn't exist within our storage system yet so we need to record it in the
      // lockfile.
      const identifierStorageDir = path.join(Storage.getAPIsDir(), this.identifier);
      const saved = JSON.stringify(spec, null, 2);

      // Create the `.api/apis/<identifier>` directory where we'll be storing this API definition
      // and eventually its codegen'd SDK.
      if (!fs.existsSync(identifierStorageDir)) {
        fs.mkdirSync(identifierStorageDir, { recursive: true });
      }

      (Storage.lockfile as Lockfile).apis.push({
        identifier: this.identifier,
        source: this.source,
        integrity: Storage.generateIntegrityHash(spec),
        installerVersion: PACKAGE_VERSION,
      } as LockfileAPI);

      fs.writeFileSync(path.join(identifierStorageDir, 'openapi.json'), saved);
      fs.writeFileSync(Storage.getLockfilePath(), JSON.stringify(Storage.lockfile, null, 2));
    } else {
      // Is this the same spec that we already have? Should we update it? // @todo
    }

    return spec;
  }
}

export interface Lockfile {
  /**
   * The `api.json` schema version. This will only ever change if we introduce breaking changes to
   * this store.
   */
  version: '1.0';
  apis: LockfileAPI[];
}

export interface LockfileAPI {
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
}
