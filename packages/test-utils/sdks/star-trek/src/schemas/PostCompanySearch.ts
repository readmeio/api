const PostCompanySearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Company name"
      },
      "broadcaster": {
        "type": "boolean",
        "description": "Whether it should be a broadcaster"
      },
      "collectibleCompany": {
        "type": "boolean",
        "description": "Whether it should be a collectible company"
      },
      "conglomerate": {
        "type": "boolean",
        "description": "Whether it should be a conglomerate"
      },
      "digitalVisualEffectsCompany": {
        "type": "boolean",
        "description": "Whether it should be a digital visual effects company"
      },
      "distributor": {
        "type": "boolean",
        "description": "Whether it should be a distributor"
      },
      "gameCompany": {
        "type": "boolean",
        "description": "Whether it should be a game company"
      },
      "filmEquipmentCompany": {
        "type": "boolean",
        "description": "Whether it should be a film equipment company"
      },
      "makeUpEffectsStudio": {
        "type": "boolean",
        "description": "Whether it should be a make-up effects studio"
      },
      "mattePaintingCompany": {
        "type": "boolean",
        "description": "Whether it should be a matte painting company"
      },
      "modelAndMiniatureEffectsCompany": {
        "type": "boolean",
        "description": "Whether it should be a model and miniature effects company"
      },
      "postProductionCompany": {
        "type": "boolean",
        "description": "Whether it should be a post-production company"
      },
      "productionCompany": {
        "type": "boolean",
        "description": "Whether it should be a production company"
      },
      "propCompany": {
        "type": "boolean",
        "description": "Whether it should be a prop company"
      },
      "recordLabel": {
        "type": "boolean",
        "description": "Whether it should be a record label"
      },
      "specialEffectsCompany": {
        "type": "boolean",
        "description": "Whether it should be a special effects company"
      },
      "tvAndFilmProductionCompany": {
        "type": "boolean",
        "description": "Whether it should be a TV and film production company"
      },
      "videoGameCompany": {
        "type": "boolean",
        "description": "Whether it should be a video game company"
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
export default PostCompanySearch
