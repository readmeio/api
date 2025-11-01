import type { HarRequest } from '@readme/httpsnippet';
import type { OASDocument } from 'oas/types';

export interface SnippetMock {
  definition: OASDocument;
  har: HarRequest;
}
