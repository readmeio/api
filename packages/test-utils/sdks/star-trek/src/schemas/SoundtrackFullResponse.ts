import SoundtrackFull from './SoundtrackFull.js';

const SoundtrackFullResponse = {
  "type": "object",
  "description": "Response object for single soundtrack query",
  "properties": {
    "soundtrack": SoundtrackFull
  },
  "title": "SoundtrackFullResponse",
  "x-readme-ref-name": "SoundtrackFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SoundtrackFullResponse
