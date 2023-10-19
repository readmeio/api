import MagazineFull from './MagazineFull';

const MagazineFullResponse = {
  "type": "object",
  "description": "Response object for single magazine query",
  "properties": {
    "magazine": MagazineFull
  },
  "title": "MagazineFullResponse",
  "x-readme-ref-name": "MagazineFullResponse"
} as const;
export default MagazineFullResponse
