import MagazineSeriesFull from './MagazineSeriesFull.js';

const MagazineSeriesFullResponse = {
  "type": "object",
  "description": "Response object for single magazine series query",
  "properties": {
    "magazineSeries": MagazineSeriesFull
  },
  "title": "MagazineSeriesFullResponse",
  "x-readme-ref-name": "MagazineSeriesFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MagazineSeriesFullResponse
