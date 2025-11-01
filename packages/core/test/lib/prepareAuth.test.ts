import type { OASDocument } from 'oas/types';

import authQuirksSpec from '@api/test-utils/definitions/auth-quirks.json' with { type: 'json' };
import securitySpec from '@readme/oas-examples/3.0/json/security.json' with { type: 'json' };
import securityMultipleSpec from '@readme/oas-examples/3.0/json/security-multiple.json' with { type: 'json' };
import usptoSpec from '@readme/oas-examples/3.0/json/uspto.json' with { type: 'json' };
import Oas from 'oas';
import { beforeAll, describe, expect, it } from 'vitest';

import prepareAuth from '../../src/lib/prepareAuth.js';

let oas: Oas;

describe('#prepareAuth()', () => {
  beforeAll(async () => {
    oas = Oas.init(structuredClone(securitySpec));
  });

  it('should not do anything if the operation has no auth', async () => {
    const uspto = Oas.init(structuredClone(usptoSpec));
    const operation = uspto.operation('/', 'get');
    const authKeys = ['12345'];

    expect(prepareAuth(authKeys, operation)).toStrictEqual({});
  });

  describe('single auth setups', () => {
    describe('apiKey', () => {
      const apiKey = '123457890';

      describe('in: query', () => {
        it('should support query auth', () => {
          const operation = oas.operation('/anything/apiKey', 'get');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            apiKey_query: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', () => {
          const operation = oas.operation('/anything/apiKey', 'get');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).toThrow('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });

      describe('in: header', () => {
        it('should support header auth', () => {
          const operation = oas.operation('/anything/apiKey', 'put');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            apiKey_header: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', () => {
          const operation = oas.operation('/anything/apiKey', 'put');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).toThrow('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });

      describe('in: cookie', () => {
        it('should support cookie auth', () => {
          const operation = oas.operation('/anything/apiKey', 'post');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            apiKey_cookie: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', () => {
          const operation = oas.operation('/anything/apiKey', 'post');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).toThrow('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });
    });

    describe('HTTP', () => {
      describe('scheme: basic', () => {
        const user = 'buster';
        const pass = 'hunter1';

        it('should support basic auth', () => {
          const operation = oas.operation('/anything/basic', 'post');
          const authKeys = [user, pass];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            basic: {
              user: 'buster',
              pass: 'hunter1',
            },
          });
        });

        it('should allow you to not pass in a password', () => {
          const operation = oas.operation('/anything/basic', 'post');
          const authKeys = [user];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            basic: {
              user: 'buster',
              pass: '',
            },
          });
        });
      });

      describe('scheme: bearer', () => {
        const apiKey = '123457890';

        it('should support bearer auth', () => {
          const operation = oas.operation('/anything/bearer', 'post');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).toStrictEqual({
            bearer: '123457890',
          });
        });

        it('should throw if you pass in multiple bearer tokens', () => {
          const operation = oas.operation('/anything/bearer', 'post');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).toThrow('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });
    });

    describe('OAuth 2', () => {
      const apiKey = '123457890';

      it('should support oauth2 auth', () => {
        const operation = oas.operation('/anything/oauth2', 'post');
        const authKeys = [apiKey];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          oauth2: '123457890',
        });
      });

      it('should throw if you pass in multiple bearer tokens', () => {
        const operation = oas.operation('/anything/oauth2', 'post');
        const authKeys = [apiKey, apiKey];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
      });
    });
  });

  describe('multi auth configurations', () => {
    let authQuirksOas: OASDocument;
    let securityMultipleOas: OASDocument;

    beforeAll(async () => {
      authQuirksOas = structuredClone(authQuirksSpec) as unknown as OASDocument;
      securityMultipleOas = structuredClone(securityMultipleSpec) as unknown as OASDocument;
    });

    describe('AND', () => {
      it('should throw an exception on an operation that requires two forms of auth', () => {
        const multipleAuth = Oas.init(securityMultipleOas);
        const operation = multipleAuth.operation('/anything/and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(
          "Sorry, this operation currently requires multiple forms of authentication which this library doesn't yet support.",
        );
      });

      it('should allow usage if an operation has an AND config but one is a single token', () => {
        const multipleAuth = Oas.init(securityMultipleOas);
        const operation = multipleAuth.operation('/anything/many-and-or', 'post');
        const authKeys = ['123457890'];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          bearer_jwt: '123457890',
        });
      });

      it('should allow usage if an operation has an AND config but one is username + password', () => {
        const multipleAuth = Oas.init(securityMultipleOas);
        const operation = multipleAuth.operation('/anything/many-and-or', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          basic: {
            user: 'buster',
            pass: 'hunter1',
          },
        });
      });
    });

    describe('OR', () => {
      it('should throw an exception on an operation that requires two forms of auth', () => {
        const authQuirks = Oas.init(authQuirksOas);
        const operation = authQuirks.operation('/anything/or-and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(/Credentials for Basic Authentication were supplied/);
      });

      it('should support supplying username+password credentials to an operation that allows OAuth 2 or Basic', () => {
        const authQuirks = Oas.init(authQuirksOas);
        const operation = authQuirks.operation('/anything', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          basicAuth: {
            user: 'buster',
            pass: 'hunter1',
          },
        });
      });
    });
  });
});
