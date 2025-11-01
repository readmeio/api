import petstore from '@readme/oas-examples/3.0/json/petstore.json' with { type: 'json' };
import readmeLegacy from '@readme/oas-examples/3.0/json/readme-legacy.json' with { type: 'json' };
import security from '@readme/oas-examples/3.0/json/security.json' with { type: 'json' };
import webhooks from '@readme/oas-examples/3.1/json/webhooks.json' with { type: 'json' };
import Oas from 'oas';
import { Operation } from 'oas/operation';
import { describe, expect, it } from 'vitest';

import { buildCodeSnippetForOperation, getSuggestedOperation } from '../../src/lib/suggestedOperations.js';

describe('#getSuggestedOperation', () => {
  it('should retrieve a suggested operation', async () => {
    const spec = Oas.init(structuredClone(readmeLegacy));
    await spec.dereference();

    const suggested = getSuggestedOperation(spec);

    expect(suggested).toBeInstanceOf(Operation);
    expect((suggested as Operation).getOperationId()).toBe('getProject');
  });

  it('should not retrieve an operation from a spec thats only comprised of webhooks', async () => {
    const spec = Oas.init(structuredClone(webhooks));
    await spec.dereference();

    const suggested = getSuggestedOperation(spec);
    expect(suggested).toBe(false);
  });
});

describe('#buildCodeSnippetForOperation', () => {
  it('should construct a code snippet for a given operation', async () => {
    const spec = Oas.init(structuredClone(petstore));
    await spec.dereference();

    const operation = spec.operation('/pet/findByStatus', 'get');
    const snippet = await buildCodeSnippetForOperation(spec, operation, {
      identifier: 'petstore',
    });

    expect(snippet).toMatchSnapshot();
  });

  describe('should prefill in example auth auth tokens for endpoints that have auth', () => {
    it('basic auth', async () => {
      const spec = Oas.init(structuredClone(readmeLegacy));
      await spec.dereference();

      const operation = spec.operation('/api-specification', 'get');
      const snippet = await buildCodeSnippetForOperation(spec, operation, {
        identifier: 'readme',
      });

      expect(snippet).toContain(".auth('username', 'password')");
    });

    it('query auth', async () => {
      const spec = Oas.init(structuredClone(security));
      await spec.dereference();

      const operation = spec.operation('/anything/apiKey', 'get');
      const snippet = await buildCodeSnippetForOperation(spec, operation, {
        identifier: 'security',
      });

      expect(snippet).toContain(".auth('token')");
    });
  });
});
