import type { OASDocument } from 'oas/dist/rmoas.types';

import securityOas from '@readme/oas-examples/3.0/json/security.json';
import { expect } from 'chai';
import Oas from 'oas';

import prepareAuth from '../../src/core/prepareAuth';

const oas = Oas.init(securityOas as unknown as OASDocument);

describe('#prepareAuth()', function () {
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
        }).to.throw('Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.');
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
        }).to.throw('Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.');
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
        }).to.throw('Multiple auth keys were supplied for the auth on this endpoint, but only a single key is needed.');
      });
    });
  });

  describe('HTTP', function () {
    describe('scheme: basic', function () {
      const user = 'username';
      const pass = 'changeme';

      it('should supprot basic auth', function () {
        const operation = oas.operation('/anything/basic', 'post');
        const authKeys = [user, pass];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          basic: {
            user: 'username',
            pass: 'changeme',
          },
        });
      });

      it('should allow you to not pass in a password', function () {
        const operation = oas.operation('/anything/basic', 'post');
        const authKeys = [user];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          basic: {
            user: 'username',
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
        }).to.throw(
          'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
        );
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
      }).to.throw(
        'Multiple auth tokens were supplied for the auth on this endpoint, but only a single token is needed.'
      );
    });
  });
});
