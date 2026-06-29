import SeasonFull from './SeasonFull.js';

const SeasonFullResponse = {
  "type": "object",
  "description": "Response object for single season query",
  "properties": {
    "season": SeasonFull
  },
  "title": "SeasonFullResponse",
  "x-readme-ref-name": "SeasonFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SeasonFullResponse
