const nock = require('nock');
const api = require('../src');

const serverUrl = 'https://api.example.com';
const createOas = require('./__fixtures__/createOas')(serverUrl);

describe('#auth()', () => {
  const baseSecurityOas = createOas('get', '/', {
    operationId: 'getSomething',
    security: [
      {
        auth: [],
      },
    ],
  });

  describe('API Keys', () => {
    const apiKey = '123457890';

    describe('in: query', () => {
      const securityOas = {
        ...baseSecurityOas,
        components: {
          securitySchemes: {
            auth: {
              type: 'apiKey',
              name: 'apiKeyParam',
              in: 'query',
            },
          },
        },
      };

      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', (testCase, chained) => {
        const sdk = api(securityOas);
        const mock = nock(serverUrl).get('/').query({ apiKeyParam: apiKey }).reply(200, {});

        if (chained) {
          return sdk
            .auth(apiKey)
            .getSomething()
            .then(res => {
              expect(res.status).toBe(200);
              mock.done();
            });
        }

        sdk.auth(apiKey);
        return sdk.getSomething().then(res => {
          expect(res.status).toBe(200);
          mock.done();
        });
      });

      it('should throw if you supply multiple auth keys', () => {
        const sdk = api(securityOas);

        return expect(sdk.auth(apiKey, apiKey).getSomething()).rejects.toThrow(/only a single key is needed/i);
      });
    });

    describe('in: header', () => {
      const securityOas = {
        ...baseSecurityOas,
        components: {
          securitySchemes: {
            auth: {
              type: 'apiKey',
              name: 'apiKeyHeader',
              in: 'header',
            },
          },
        },
      };

      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', (testCase, chained) => {
        const sdk = api(securityOas);
        const mock = nock(serverUrl, { reqheaders: { apiKeyHeader: apiKey } })
          .get('/')
          .reply(200, {});

        if (chained) {
          return sdk
            .auth(apiKey)
            .getSomething()
            .then(res => {
              expect(res.status).toBe(200);
              mock.done();
            });
        }

        sdk.auth(apiKey);
        return sdk.getSomething().then(res => {
          expect(res.status).toBe(200);
          mock.done();
        });
      });

      it('should throw if you supply multiple auth keys', () => {
        const sdk = api(securityOas);

        return expect(sdk.auth(apiKey, apiKey).getSomething()).rejects.toThrow(/only a single key is needed/i);
      });
    });
  });

  describe('HTTP', () => {
    describe('scheme: basic', () => {
      const user = 'username';
      const pass = 'changeme';
      const securityOas = {
        ...baseSecurityOas,
        components: {
          securitySchemes: {
            auth: {
              type: 'http',
              scheme: 'basic',
            },
          },
        },
      };

      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', (testCase, chained) => {
        const sdk = api(securityOas);
        const mock = nock(serverUrl, {
          reqheaders: { authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` },
        })
          .get('/')
          .reply(200, {});

        if (chained) {
          return sdk
            .auth(user, pass)
            .getSomething()
            .then(res => {
              expect(res.status).toBe(200);
              mock.done();
            });
        }

        sdk.auth(user, pass);
        return sdk.getSomething().then(res => {
          expect(res.status).toBe(200);
          mock.done();
        });
      });

      it('should allow you to not pass in a password', () => {
        const sdk = api(securityOas);
        const mock = nock(serverUrl, {
          reqheaders: { authorization: `Basic ${Buffer.from(`${user}:`).toString('base64')}` },
        })
          .get('/')
          .reply(200, {});

        return sdk
          .auth(user)
          .getSomething()
          .then(res => {
            expect(res.status).toBe(200);
            mock.done();
          });
      });
    });

    describe('scheme: bearer', () => {
      const apiKey = '123457890';
      const securityOas = {
        ...baseSecurityOas,
        components: {
          securitySchemes: {
            auth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
      };

      it.each([
        ['should allow you to supply auth', false],
        ['should allow you to supply auth when unchained from an operation', true],
      ])('%s', (testCase, chained) => {
        const sdk = api(securityOas);
        const mock = nock(serverUrl, { reqheaders: { authorization: `Bearer ${apiKey}` } })
          .get('/')
          .reply(200, {});

        if (chained) {
          return sdk
            .auth(apiKey)
            .getSomething()
            .then(res => {
              expect(res.status).toBe(200);
              mock.done();
            });
        }

        sdk.auth(apiKey);
        return sdk.getSomething().then(res => {
          expect(res.status).toBe(200);
          mock.done();
        });
      });

      it('should throw if you pass in multiple bearer tokens', () => {
        const sdk = api(securityOas);

        return expect(sdk.auth(apiKey, apiKey).getSomething()).rejects.toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', () => {
    const apiKey = '123457890';
    const securityOas = {
      ...baseSecurityOas,
      components: {
        securitySchemes: {
          auth: {
            type: 'oauth2',
          },
        },
      },
    };

    it.each([
      ['should allow you to supply auth', false],
      ['should allow you to supply auth when unchained from an operation', true],
    ])('%s', (testCase, chained) => {
      const sdk = api(securityOas);
      const mock = nock(serverUrl, { reqheaders: { authorization: `Bearer ${apiKey}` } })
        .get('/')
        .reply(200, {});

      if (chained) {
        return sdk
          .auth(apiKey)
          .getSomething()
          .then(res => {
            expect(res.status).toBe(200);
            mock.done();
          });
      }

      sdk.auth(apiKey);
      return sdk.getSomething().then(res => {
        expect(res.status).toBe(200);
        mock.done();
      });
    });

    it('should throw if you pass in multiple bearer tokens', () => {
      const sdk = api(securityOas);

      return expect(sdk.auth(apiKey, apiKey).getSomething()).rejects.toThrow(/only a single token is needed/i);
    });
  });
});
