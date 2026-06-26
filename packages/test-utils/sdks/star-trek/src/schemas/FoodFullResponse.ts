import FoodFull from './FoodFull.js';

const FoodFullResponse = {
  "type": "object",
  "description": "Response object for single food query",
  "properties": {
    "food": FoodFull
  },
  "title": "FoodFullResponse",
  "x-readme-ref-name": "FoodFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default FoodFullResponse
