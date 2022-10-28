import type { OASDocument } from 'oas/dist/rmoas.types';

import { expect } from 'chai';
import Oas from 'oas';

import prepareAuth from '../../src/core/prepareAuth';
import loadSpec from '../helpers/load-spec';

let oas: Oas;

describe('#prepareAuth()', function () {
  before(async function () {
    oas = await loadSpec('@readme/oas-examples/3.0/json/security.json').then(Oas.init);
  });

  it('should not do anything if the operation has no auth', async function () {
    const uspto = await loadSpec('@readme/oas-examples/3.0/json/uspto.json').then(Oas.init);
    const operation = uspto.operation('/', 'get');
    const authKeys = ['12345'];

    expect(prepareAuth(authKeys, operation)).to.deep.equal({});
  });

  describe('single auth setups', function () {
    describe('apiKey', function () {
      const apiKey = '123457890';

      describe('in: query', function () {
        it('should support query auth', function () {
          const operation = oas.operation('/anything/apiKey', 'get');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            apiKey_query: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', function () {
          const operation = oas.operation('/anything/apiKey', 'get');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).to.throw('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });

      describe('in: header', function () {
        it('should support header auth', function () {
          const operation = oas.operation('/anything/apiKey', 'put');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            apiKey_header: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', function () {
          const operation = oas.operation('/anything/apiKey', 'put');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).to.throw('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });

      describe('in: cookie', function () {
        it('should support cookie auth', function () {
          const operation = oas.operation('/anything/apiKey', 'post');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            apiKey_cookie: '123457890',
          });
        });

        it('should throw if you supply multiple auth keys', function () {
          const operation = oas.operation('/anything/apiKey', 'post');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).to.throw('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });
    });

    describe('HTTP', function () {
      describe('scheme: basic', function () {
        const user = 'buster';
        const pass = 'hunter1';

        it('should support basic auth', function () {
          const operation = oas.operation('/anything/basic', 'post');
          const authKeys = [user, pass];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            basic: {
              user: 'buster',
              pass: 'hunter1',
            },
          });
        });

        it('should allow you to not pass in a password', function () {
          const operation = oas.operation('/anything/basic', 'post');
          const authKeys = [user];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            basic: {
              user: 'buster',
              pass: '',
            },
          });
        });
      });

      describe('scheme: bearer', function () {
        const apiKey = '123457890';

        it('should support bearer auth', function () {
          const operation = oas.operation('/anything/bearer', 'post');
          const authKeys = [apiKey];

          expect(prepareAuth(authKeys, operation)).to.deep.equal({
            bearer: '123457890',
          });
        });

        it('should throw if you pass in multiple bearer tokens', function () {
          const operation = oas.operation('/anything/bearer', 'post');
          const authKeys = [apiKey, apiKey];

          expect(() => {
            prepareAuth(authKeys, operation);
          }).to.throw('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
        });
      });
    });

    describe('OAuth 2', function () {
      const apiKey = '123457890';

      it('should support oauth2 auth', function () {
        const operation = oas.operation('/anything/oauth2', 'post');
        const authKeys = [apiKey];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          oauth2: '123457890',
        });
      });

      it('should throw if you pass in multiple bearer tokens', function () {
        const operation = oas.operation('/anything/oauth2', 'post');
        const authKeys = [apiKey, apiKey];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw('Multiple auth tokens were supplied for this endpoint but only a single token is needed.');
      });
    });
  });

  describe('multi auth configurations', function () {
    let authQuirksOas;
    let securityMultipleOas;

    before(async function () {
      authQuirksOas = await loadSpec(require.resolve('../__fixtures__/definitions/auth-quirks.json'));
      securityMultipleOas = await loadSpec('@readme/oas-examples/3.0/json/security-multiple.json');
    });

    describe('AND', function () {
      it('should throw an exception on an operation that requires two forms of auth', function () {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
        const operation = multipleAuth.operation('/anything/and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw(
          "Sorry, this operation currently requires multiple forms of authentication which this library doesn't yet support."
        );
      });

      it('should allow usage if an operation has an AND config but one is a single token', function () {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
        const operation = multipleAuth.operation('/anything/many-and-or', 'post');
        const authKeys = ['123457890'];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          bearer_jwt: '123457890',
        });
      });

      it('should allow usage if an operation has an AND config but one is username + password', function () {
        const multipleAuth = Oas.init(securityMultipleOas as unknown as OASDocument);
        const operation = multipleAuth.operation('/anything/many-and-or', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          basic: {
            user: 'buster',
            pass: 'hunter1',
          },
        });
      });
    });

    describe('OR', function () {
      it('should throw an exception on an operation that requires two forms of auth', function () {
        const authQuirks = Oas.init(authQuirksOas as unknown as OASDocument);
        const operation = authQuirks.operation('/anything/or-and', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw(/Credentials for Basic Authentication were supplied/);
      });

      it('should support supplying username+password credentials to an operation that allows OAuth 2 or Basic', function () {
        const authQuirks = Oas.init(authQuirksOas as unknown as OASDocument);
        const operation = authQuirks.operation('/anything', 'post');
        const authKeys = ['buster', 'hunter1'];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          basicAuth: {
            user: 'buster',
            pass: 'hunter1',
          },
        });
      });
    });
  });
});
