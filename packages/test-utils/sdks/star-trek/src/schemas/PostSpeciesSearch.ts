const PostSpeciesSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Species name"
      },
      "extinctSpecies": {
        "type": "boolean",
        "description": "Whether it should be an extinct species"
      },
      "warpCapableSpecies": {
        "type": "boolean",
        "description": "Whether it should be a warp-capable species"
      },
      "extraGalacticSpecies": {
        "type": "boolean",
        "description": "Whether it should be an extra-galactic species"
      },
      "humanoidSpecies": {
        "type": "boolean",
        "description": "Whether it should be a humanoid species"
      },
      "reptilianSpecies": {
        "type": "boolean",
        "description": "Whether it should be a reptilian species"
      },
      "nonCorporealSpecies": {
        "type": "boolean",
        "description": "Whether it should be a non-corporeal species"
      },
      "shapeshiftingSpecies": {
        "type": "boolean",
        "description": "Whether it should be a shapeshifting species"
      },
      "spaceborneSpecies": {
        "type": "boolean",
        "description": "Whether it should be a spaceborne species"
      },
      "telepathicSpecies": {
        "type": "boolean",
        "description": "Whether it should be a telepathic species"
      },
      "transDimensionalSpecies": {
        "type": "boolean",
        "description": "Whether it should be a trans-dimensional species"
      },
      "unnamedSpecies": {
        "type": "boolean",
        "description": "Whether it should be a unnamed species"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this species should be from alternate reality"
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
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
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
export default PostSpeciesSearch
