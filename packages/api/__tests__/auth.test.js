const nock = require('nock');
const api = require('../src');

const securityOas = require('@readme/oas-examples/3.0/json/security.json');

describe('#auth()', () => {
  describe('API Keys', () => {
    const apiKey = '123457890';

    describe('in: query', () => {
      it('should allow you to supply auth', () => {
        const sdk = api(securityOas);
        const mock = nock('https://httpbin.org').get('/apiKey').query({ apiKey }).reply(200, {});

        sdk.auth(apiKey);
        return sdk.get('/apiKey').then(() => mock.done());
      });

      it('should throw if you supply multiple auth keys', () => {
        const sdk = api(securityOas);

        sdk.auth(apiKey, apiKey);
        return expect(sdk.get('/apiKey')).rejects.toThrow(/only a single key is needed/i);
      });
    });

    describe('in: header', () => {
      it('should allow you to supply auth', () => {
        const sdk = api(securityOas);
        const mock = nock('https://httpbin.org', { reqheaders: { 'X-API-KEY': apiKey } })
          .put('/apiKey')
          .reply(200, {});

        sdk.auth(apiKey);
        return sdk.put('/apiKey').then(() => mock.done());
      });

      it('should throw if you supply multiple auth keys', () => {
        const sdk = api(securityOas);

        sdk.auth(apiKey, apiKey);
        return expect(sdk.put('/apiKey')).rejects.toThrow(/only a single key is needed/i);
      });
    });
  });

  describe('HTTP', () => {
    describe('scheme: basic', () => {
      const user = 'username';
      const pass = 'changeme';

      it('should allow you to supply auth', () => {
        const sdk = api(securityOas);
        const mock = nock('https://httpbin.org', {
          reqheaders: { authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` },
        })
          .post('/basic')
          .reply(200, { id: 1 });

        sdk.auth(user, pass);
        return sdk.post('/basic').then(res => {
          expect(res.id).toBe(1);
          mock.done();
        });
      });

      it('should allow you to not pass in a password', () => {
        const sdk = api(securityOas);
        const mock = nock('https://httpbin.org', {
          reqheaders: { authorization: `Basic ${Buffer.from(`${user}:`).toString('base64')}` },
        })
          .post('/basic')
          .reply(200, {});

        sdk.auth(user);
        return sdk.post('/basic').then(() => mock.done());
      });
    });

    describe('scheme: bearer', () => {
      const apiKey = '123457890';

      it('should allow you to supply auth', () => {
        const sdk = api(securityOas);
        const mock = nock('https://httpbin.org', { reqheaders: { authorization: `Bearer ${apiKey}` } })
          .post('/bearer')
          .reply(200, {});

        sdk.auth(apiKey);
        return sdk.post('/bearer').then(() => mock.done());
      });

      it('should throw if you pass in multiple bearer tokens', () => {
        const sdk = api(securityOas);

        sdk.auth(apiKey, apiKey);
        return expect(sdk.post('/bearer')).rejects.toThrow(/only a single token is needed/i);
      });
    });
  });

  describe('OAuth 2', () => {
    const apiKey = '123457890';

    it('should allow you to supply auth', () => {
      const sdk = api(securityOas);
      const mock = nock('https://httpbin.org', { reqheaders: { authorization: `Bearer ${apiKey}` } })
        .post('/oauth2')
        .reply(200, {});

      sdk.auth(apiKey);
      return sdk.post('/oauth2').then(() => mock.done());
    });

    it('should throw if you pass in multiple bearer tokens', () => {
      const sdk = api(securityOas);

      sdk.auth(apiKey, apiKey);
      return expect(sdk.post('/oauth2')).rejects.toThrow(/only a single token is needed/i);
    });
  });
});
