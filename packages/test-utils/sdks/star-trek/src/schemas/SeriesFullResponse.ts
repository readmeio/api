import SeriesFull from './SeriesFull.js';

const SeriesFullResponse = {
  "type": "object",
  "description": "Response object for single series query",
  "properties": {
    "series": SeriesFull
  },
  "title": "SeriesFullResponse",
  "x-readme-ref-name": "SeriesFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SeriesFullResponse
