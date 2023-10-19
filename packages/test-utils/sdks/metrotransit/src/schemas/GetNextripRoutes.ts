import Route from './Route';

const GetNextripRoutes = {
  "response": {
    "200": {
      "type": "array",
      "items": Route,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetNextripRoutes
