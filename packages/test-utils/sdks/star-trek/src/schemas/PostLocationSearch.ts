const PostLocationSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Location name"
      },
      "earthlyLocation": {
        "type": "boolean",
        "description": "Whether it should be an earthly location"
      },
      "fictionalLocation": {
        "type": "boolean",
        "description": "Whether it should be a fictional location"
      },
      "religiousLocation": {
        "type": "boolean",
        "description": "Whether it should be a religious location"
      },
      "geographicalLocation": {
        "type": "boolean",
        "description": "Whether it should be a geographical location"
      },
      "bodyOfWater": {
        "type": "boolean",
        "description": "Whether it should be a body of water"
      },
      "country": {
        "type": "boolean",
        "description": "Whether it should be a country"
      },
      "subnationalEntity": {
        "type": "boolean",
        "description": "Whether it should be a subnational entity"
      },
      "settlement": {
        "type": "boolean",
        "description": "Whether it should be a settlement"
      },
      "usSettlement": {
        "type": "boolean",
        "description": "Whether it should be a US settlement"
      },
      "bajoranSettlement": {
        "type": "boolean",
        "description": "Whether it should be a Bajoran settlement"
      },
      "colony": {
        "type": "boolean",
        "description": "Whether it should be a colony"
      },
      "landform": {
        "type": "boolean",
        "description": "Whether it should be a landform"
      },
      "landmark": {
        "type": "boolean",
        "description": "Whether it should be a landmark"
      },
      "road": {
        "type": "boolean",
        "description": "Whether it should be a road"
      },
      "structure": {
        "type": "boolean",
        "description": "Whether it should be a structure"
      },
      "shipyard": {
        "type": "boolean",
        "description": "Whether it should be a shipyard"
      },
      "buildingInterior": {
        "type": "boolean",
        "description": "Whether it should be a building interior"
      },
      "establishment": {
        "type": "boolean",
        "description": "Whether it should be a establishment"
      },
      "medicalEstablishment": {
        "type": "boolean",
        "description": "Whether it should be a medical establishment"
      },
      "ds9Establishment": {
        "type": "boolean",
        "description": "Whether it should be a DS9 establishment"
      },
      "school": {
        "type": "boolean",
        "description": "Whether it should be a school"
      },
      "mirror": {
        "type": "boolean",
        "description": "Whether this location should be from mirror universe"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this location should be from alternate reality"
      }
    },
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647,
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647,
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "API key"
          }
        },
        "required": []
      }
    ]
  }
} as const;
export default PostLocationSearch
