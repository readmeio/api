import FoodBase from './FoodBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const FoodBaseResponse = {
  "type": "object",
  "description": "Response object for foods search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "foods": {
      "type": "array",
      "description": "List of foods matching given criteria",
      "items": FoodBase
    }
  },
  "title": "FoodBaseResponse",
  "x-readme-ref-name": "FoodBaseResponse"
} as const;
export default FoodBaseResponse
