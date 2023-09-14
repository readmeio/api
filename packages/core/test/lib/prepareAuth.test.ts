import type { OASDocument } from 'oas/dist/rmoas.types';

import loadSpec from '@api/test-utils/load-spec';
import Oas from 'oas';
import { describe, beforeAll, it, expect } from 'vitest';

import prepareAuth from '../../src/lib/prepareAuth';

let oas: Oas;

describe('#prepareAuth()', () => {
  beforeAll(async () => {
    oas = await loadSpec('@readme/oas-examples/3.0/json/security.json').then(Oas.init);
  });

  it('should not do anything if the operation has no auth', async () => {
    const uspto = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
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
    let authQuirksOas;
    let securityMultipleOas;

    beforeAll(async () => {
      authQuirksOas = await loadSpec(require.resolve('@api/test-utils/definitions/auth-quirks.json'));
      securityMultipleOas = await loadSpec('@readme/oas-examples/3.0/json/security-multiple.json');
    });

    describe('AND', () => {
      it('should throw an exception on an operation that requires two forms of auth', () => {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
        const operation = multipleAuth.operation('/anything/and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(
          "Sorry, this operation currently requires multiple forms of authentication which this library doesn't yet support.",
        );
      });

      it('should allow usage if an operation has an AND config but one is a single token', () => {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
        const operation = multipleAuth.operation('/anything/many-and-or', 'post');
        const authKeys = ['123457890'];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          bearer_jwt: '123457890',
        });
      });

      it('should allow usage if an operation has an AND config but one is username + password', () => {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
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
        const authQuirks = Oas.init(authQuirksOas as unknown as OASDocument);
        const operation = authQuirks.operation('/anything/or-and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(/Credentials for Basic Authentication were supplied/);
      });

      it('should support supplying username+password credentials to an operation that allows OAuth 2 or Basic', () => {
        const authQuirks = Oas.init(authQuirksOas as unknown as OASDocument);
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
