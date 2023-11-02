import FoodFull from './FoodFull.js';

const FoodFullResponse = {
  "type": "object",
  "description": "Response object for single food query",
  "properties": {
    "food": FoodFull
  },
  "title": "FoodFullResponse",
  "x-readme-ref-name": "FoodFullResponse"
} as const;
export default FoodFullResponse
