import type { SupportedLanguage } from './codegen/factory.js';
import type { Lockfile, LockfileAPI } from './lockfileSchema.js';
import type { OASDocument } from 'oas/types';

import fs from 'node:fs';
import path from 'node:path';

import semver from 'semver';
import ssri from 'ssri';
import validateNPMPackageName from 'validate-npm-package-name';

import { SupportedLanguages } from './codegen/factory.js';
import Fetcher from './fetcher.js';
import { PACKAGE_VERSION } from './packageInfo.js';

export default class Storage {
  static dir: string;

  static lockfile: Lockfile | false;

  fetcher: Fetcher;

  /**
   * This is the original source that the file came from (relative/absolute file path, URL, ReadMe
   * registry UUID, etc.).
   *
   * @example  @developers/v2.0#nysezql0wwo236
   * @example https://raw.githubusercontent.com/readmeio/oas-examples/main/3.0/json/petstore-simple.json
   * @example ./petstore.json
   */
  source: string;

  /**
   * The language that this SDK was generated for.
   */
  private language!: SupportedLanguage;

  /**
   * The identifier that this was installed as.
   *
   * @example petstore
   */
  identifier!: string;

  constructor(source: string, language?: SupportedLanguage, identifier?: string) {
    Storage.setStorageDir();

    this.fetcher = new Fetcher(source);

    this.source = source;
    if (language) this.language = language;
    if (identifier) this.identifier = identifier;

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

    Storage.dir = path.join(process.cwd(), '.api');

    fs.mkdirSync(Storage.dir, { recursive: true });
    fs.mkdirSync(Storage.getAPIsDir(), { recursive: true });
  }

  /**
   * Retrieves the project's root directory path.
   *
   * If a storage directory has not been explicitly set, this method will default it to
   * the current working directory. It then returns the directory name of the storage path.
   *
   */
  static getProjectDir() {
    if (!Storage.dir) {
      Storage.setStorageDir();
    }

    return path.dirname(Storage.dir);
  }

  /**
   * Reset the state of the entire storage system.
   *
   * This will completely destroy the contents of the `.api/` directory!
   *
   * @internal
   */
  static async reset() {
    const noop = () => {
      // If any of these file and directory removals fail we don't need to throw any errors because
      // this method is only used internally in unit tests.
    };

    if (Storage.getLockfilePath()) {
      await fs.promises
        .writeFile(Storage.getLockfilePath(), JSON.stringify(Storage.getDefaultLockfile(), null, 2))
        .catch(noop);
    }

    if (Storage.getAPIsDir()) {
      await fs.promises.rm(Storage.getAPIsDir(), { recursive: true }).catch(noop);
      await fs.promises.mkdir(Storage.getAPIsDir(), { recursive: true }).catch(noop);
    }
  }

  static getDefaultLockfile(): Lockfile {
    const majorVersion = semver.parse(PACKAGE_VERSION)?.major || 'latest';

    return {
      $schema: `https://unpkg.com/api@${majorVersion}/schema.json`,
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
      try {
        Storage.lockfile = JSON.parse(file) as Lockfile;
      } catch (err) {
        // If we can't parse the lock file for whatever reason then it's probably corrupted so we
        // should reset it to the default.
        Storage.lockfile = Storage.getDefaultLockfile();
      }
    } else {
      Storage.lockfile = Storage.getDefaultLockfile();
    }

    return Storage.lockfile;
  }

  static isIdentifierValid(identifier: string, prefixWithAPINamespace?: boolean) {
    // Is this identifier already in storage?
    if (Storage.isInLockFile({ identifier })) {
      throw new Error(`"${identifier}" is already taken in your \`.api/\` directory. Please try another identifier.`);
    }

    const isValidForNPM = validateNPMPackageName(prefixWithAPINamespace ? `@api/${identifier}` : identifier);
    if (!isValidForNPM.validForNewPackages) {
      // `prompts` doesn't support surfacing multiple errors in a `validate` call so we can only
      // surface the first to the user.
      throw new Error(
        `Identifier cannot be used for an NPM package: ${isValidForNPM?.errors?.[0] || '[error unavailable]'}`,
      );
    }

    return true;
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

  setLanguage(language?: SupportedLanguage) {
    // `language` wasn't always present in the lockfile so if we don't have one we should default
    // to JS.
    if (!language) {
      this.language = SupportedLanguages.JS;
      return;
    }

    this.language = language;
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
   *
   */
  getFromLockfile() {
    const lockfile = Storage.getLockfile();
    return lockfile.apis.find(a => a.identifier === this.identifier);
  }

  /**
   * Retrieve the lockfile record, if it exists, for a given identifier.
   *
   */
  static getFromLockfile(identifier: string) {
    const lockfile = Storage.getLockfile();
    return lockfile.apis.find(a => a.identifier === identifier);
  }

  getSDKLanguage() {
    const entry = this.getFromLockfile();

    // We may not have `language` in the lockfile for old users but we default to JS so we can
    // safely return that if this isn't present.
    return entry?.language || SupportedLanguages.JS;
  }

  getPackageName() {
    const entry = this.getFromLockfile();
    if (entry?.private) {
      return `@api/${entry.identifier}`;
    }

    return undefined;
  }

  getIdentifierStorageDir() {
    if (!this.isInLockfile()) {
      throw new Error(`${this.source} has not been saved to storage yet and must do so before being retrieved.`);
    }

    return path.join(Storage.getAPIsDir(), this.identifier);
  }

  getAPIDefinitionPath() {
    return path.join(this.getIdentifierStorageDir(), 'openapi.json');
  }

  getAPIDefinition() {
    const filePath = this.getAPIDefinitionPath();
    const file = fs.readFileSync(filePath, 'utf8');

    try {
      return JSON.parse(file);
    } catch (err) {
      throw new Error(`Sorry we were unable to parse JSON in ${filePath}. Reason: ${err.message}`);
    }
  }

  saveSourceFiles(files: Record<string, string>) {
    if (!this.isInLockfile()) {
      throw new Error(`${this.source} has not been saved to storage yet and must do so before being retrieved.`);
    }

    return new Promise(resolve => {
      const savedSource: string[] = [];
      Object.entries(files).forEach(([fileName, contents]) => {
        const sourceFilePath = path.join(this.getIdentifierStorageDir(), fileName);

        // If this file is stored in a subdirectory then we need to create it.
        if (path.dirname(fileName) !== '.') {
          const dir = path.dirname(fileName);
          const dirPath = path.join(this.getIdentifierStorageDir(), dir);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
          }
        }

        fs.writeFileSync(sourceFilePath, contents);

        savedSource.push(sourceFilePath);
      });

      resolve(savedSource);
    });
  }

  async load(shouldSave: boolean = true) {
    return this.fetcher.load().then(async spec => {
      if (shouldSave) {
        return this.save(spec);
      }

      return spec;
    });
  }

  /**
   * Initialize a directory in the storage system for this identifier and add it into the lockfile.
   * This does not create or save the source code for this SDK, that work happens within the
   * code generation system.
   *
   * @see {@link https://api.readme.dev/docs/how-it-works#api-directory}
   */
  save(spec: OASDocument) {
    if (!this.identifier) {
      throw new TypeError('An identifier must be set before saving the API definition into storage.');
    } else if (!this.language) {
      throw new TypeError('A language must be set before saving the API definition into storage.');
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
        private: true,
        identifier: this.identifier,
        source: this.source,
        integrity: Storage.generateIntegrityHash(spec),
        installerVersion: PACKAGE_VERSION,
        language: this.language,
        createdAt: new Date().toISOString(),
      } as LockfileAPI);

      fs.writeFileSync(path.join(identifierStorageDir, 'openapi.json'), saved);
      fs.writeFileSync(Storage.getLockfilePath(), JSON.stringify(Storage.lockfile, null, 2));
    } else {
      // Is this the same spec that we already have? Should we update it? // @todo
    }

    return spec;
  }

  /**
   * Delete the stored source code for the given identifier and purge it from the lockfile.
   *
   */
  async remove() {
    // Delete the codegen'd SDK source code.
    const identifierDir = this.getIdentifierStorageDir();
    await fs.promises.rm(identifierDir, { recursive: true }).catch(() => {
      // If the identifier directory doesn't exist for some reason we can continue on and remove it
      // from the lockfile because some sort of corruption happened.
    });

    // Remove the SDK from the lockfile.
    const lockfile = Storage.lockfile as Lockfile;
    const idx = lockfile.apis.findIndex(api => api.identifier === this.identifier);

    lockfile.apis.splice(idx, 1);

    Storage.lockfile = lockfile;

    fs.writeFileSync(Storage.getLockfilePath(), JSON.stringify(Storage.lockfile, null, 2));
  }
}
