const PostMaterialSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Material name"
      },
      "chemicalCompound": {
        "type": "boolean",
        "description": "Whether it should be a chemical compound"
      },
      "biochemicalCompound": {
        "type": "boolean",
        "description": "Whether it should be a biochemical compound"
      },
      "drug": {
        "type": "boolean",
        "description": "Whether it should be a drug"
      },
      "poisonousSubstance": {
        "type": "boolean",
        "description": "Whether it should be a poisonous substance"
      },
      "explosive": {
        "type": "boolean",
        "description": "Whether it should be an explosive"
      },
      "gemstone": {
        "type": "boolean",
        "description": "Whether it should be a gemstone"
      },
      "alloyOrComposite": {
        "type": "boolean",
        "description": "Whether it should be an alloy or a composite"
      },
      "fuel": {
        "type": "boolean",
        "description": "Whether it should be a fuel"
      },
      "mineral": {
        "type": "boolean",
        "description": "Whether it should be a mineral"
      },
      "preciousMaterial": {
        "type": "boolean",
        "description": "Whether it should be a precious material"
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
export default PostMaterialSearch
