const PostWeaponSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Weapon name"
      },
      "handHeldWeapon": {
        "type": "boolean",
        "description": "Whether it should be a hand-help weapon"
      },
      "laserTechnology": {
        "type": "boolean",
        "description": "Whether it should be a laser technology"
      },
      "plasmaTechnology": {
        "type": "boolean",
        "description": "Whether it should be a plasma technology"
      },
      "photonicTechnology": {
        "type": "boolean",
        "description": "Whether it should be a photonic technology"
      },
      "phaserTechnology": {
        "type": "boolean",
        "description": "Whether it should be a phaser technology"
      },
      "mirror": {
        "type": "boolean",
        "description": "Whether this weapon should be from mirror universe"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this weapon should be from alternate reality"
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
export default PostWeaponSearch
