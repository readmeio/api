import MagazineFull from './MagazineFull.js';

const MagazineFullResponse = {
  "type": "object",
  "description": "Response object for single magazine query",
  "properties": {
    "magazine": MagazineFull
  },
  "title": "MagazineFullResponse",
  "x-readme-ref-name": "MagazineFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MagazineFullResponse
