import { expect } from 'chai';
import Oas from 'oas';
import prepareAuth from '../src/lib/prepareAuth';

import securityOas from '@readme/oas-examples/3.0/json/security.json';

const oas = Oas.init(securityOas);

describe('#prepareAuth()', function () {
  describe('apiKey', function () {
    const apiKey = '123457890';

    describe('in: query', function () {
      it('should support query auth', function () {
        const operation = oas.operation('/apiKey', 'get');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          apiKey_query: '123457890',
        });
      });

      it('should throw if you supply multiple auth keys', function () {
        const operation = oas.operation('/apiKey', 'get');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw(/only a single key is needed/i);
      });
    });

    describe('in: header', function () {
      it('should support header auth', function () {
        const operation = oas.operation('/apiKey', 'put');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          apiKey_header: '123457890',
        });
      });

      it('should throw if you supply multiple auth keys', function () {
        const operation = oas.operation('/apiKey', 'put');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw(/only a single key is needed/i);
      });
    });
  });

  describe('HTTP', function () {
    describe('scheme: basic', function () {
      const user = 'username';
      const pass = 'changeme';

      it('should supprot basic auth', function () {
        const operation = oas.operation('/basic', 'post');
        const authKeys = [[user, pass]];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          basic: {
            user: 'username',
            pass: 'changeme',
          },
        });
      });

      it('should allow you to not pass in a password', function () {
        const operation = oas.operation('/basic', 'post');
        const authKeys = [[user]];

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
        const operation = oas.operation('/bearer', 'post');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).to.deep.equal({
          bearer: '123457890',
        });
      });

      it('should throw if you pass in multiple bearer tokens', function () {
        const operation = oas.operation('/bearer', 'post');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).to.throw(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', function () {
    const apiKey = '123457890';

    it('should support oauth2 auth', function () {
      const operation = oas.operation('/oauth2', 'post');
      const authKeys = [[apiKey]];

      expect(prepareAuth(authKeys, operation)).to.deep.equal({
        oauth2: '123457890',
      });
    });

    it('should throw if you pass in multiple bearer tokens', function () {
      const operation = oas.operation('/oauth2', 'post');
      const authKeys = [[apiKey, apiKey]];

      expect(() => {
        prepareAuth(authKeys, operation);
      }).to.throw(/only a single token is needed/i);
    });
  });
});
