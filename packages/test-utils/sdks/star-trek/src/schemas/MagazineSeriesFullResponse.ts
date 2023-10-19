import MagazineSeriesFull from './MagazineSeriesFull';

const MagazineSeriesFullResponse = {
  "type": "object",
  "description": "Response object for single magazine series query",
  "properties": {
    "magazineSeries": MagazineSeriesFull
  },
  "title": "MagazineSeriesFullResponse",
  "x-readme-ref-name": "MagazineSeriesFullResponse"
} as const;
export default MagazineSeriesFullResponse
