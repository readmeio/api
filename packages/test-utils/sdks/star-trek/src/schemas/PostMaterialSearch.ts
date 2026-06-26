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
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "description": "API key"
          }
        }
      }
    ]
  }
} as const;
export default PostMaterialSearch
