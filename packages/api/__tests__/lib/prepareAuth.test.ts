import Oas from 'oas';
import prepareAuth from '../../src/lib/prepareAuth';

import securityOas from '@readme/oas-examples/3.0/json/security.json';

const oas = Oas.init(securityOas);

describe('#prepareAuth()', () => {
  describe('apiKey', () => {
    const apiKey = '123457890';

    describe('in: query', () => {
      it('should support query auth', () => {
        const operation = oas.operation('/apiKey', 'get');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          apiKey_query: '123457890',
        });
      });

      it('should throw if you supply multiple auth keys', () => {
        const operation = oas.operation('/apiKey', 'get');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(/only a single key is needed/i);
      });
    });

    describe('in: header', () => {
      it('should support header auth', () => {
        const operation = oas.operation('/apiKey', 'put');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          apiKey_header: '123457890',
        });
      });

      it('should throw if you supply multiple auth keys', () => {
        const operation = oas.operation('/apiKey', 'put');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(/only a single key is needed/i);
      });
    });
  });

  describe('HTTP', () => {
    describe('scheme: basic', () => {
      const user = 'username';
      const pass = 'changeme';

      it('should supprot basic auth', () => {
        const operation = oas.operation('/basic', 'post');
        const authKeys = [[user, pass]];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          basic: {
            user: 'username',
            pass: 'changeme',
          },
        });
      });

      it('should allow you to not pass in a password', () => {
        const operation = oas.operation('/basic', 'post');
        const authKeys = [[user]];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          basic: {
            user: 'username',
            pass: '',
          },
        });
      });
    });

    describe('scheme: bearer', () => {
      const apiKey = '123457890';

      it('should support bearer auth', () => {
        const operation = oas.operation('/bearer', 'post');
        const authKeys = [[apiKey]];

        expect(prepareAuth(authKeys, operation)).toStrictEqual({
          bearer: '123457890',
        });
      });

      it('should throw if you pass in multiple bearer tokens', () => {
        const operation = oas.operation('/bearer', 'post');
        const authKeys = [[apiKey, apiKey]];

        expect(() => {
          prepareAuth(authKeys, operation);
        }).toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', () => {
    const apiKey = '123457890';

    it('should support oauth2 auth', () => {
      const operation = oas.operation('/oauth2', 'post');
      const authKeys = [[apiKey]];

      expect(prepareAuth(authKeys, operation)).toStrictEqual({
        oauth2: '123457890',
      });
    });

    it('should throw if you pass in multiple bearer tokens', () => {
      const operation = oas.operation('/oauth2', 'post');
      const authKeys = [[apiKey, apiKey]];

      expect(() => {
        prepareAuth(authKeys, operation);
      }).toThrow(/only a single token is needed/i);
    });
  });
});
