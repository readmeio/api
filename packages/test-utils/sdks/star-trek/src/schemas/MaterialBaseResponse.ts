import MaterialBase from './MaterialBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const MaterialBaseResponse = {
  "type": "object",
  "description": "Response object for materials search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "materials": {
      "type": "array",
      "description": "List of materials matching given criteria",
      "items": MaterialBase
    }
  },
  "title": "MaterialBaseResponse",
  "x-readme-ref-name": "MaterialBaseResponse"
} as const;
export default MaterialBaseResponse
