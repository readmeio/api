const PostEpisodeSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Episode title"
      },
      "seasonNumberFrom": {
        "type": "integer",
        "description": "Minimal season number",
        "format": "int32"
      },
      "seasonNumberTo": {
        "type": "integer",
        "description": "Maximal season number",
        "format": "int32"
      },
      "episodeNumberFrom": {
        "type": "integer",
        "description": "Minimal episode number in season",
        "format": "int32"
      },
      "episodeNumberTo": {
        "type": "integer",
        "description": "Maximal episode number in season",
        "format": "int32"
      },
      "productionSerialNumber": {
        "type": "string",
        "description": "Production serial number"
      },
      "featureLength": {
        "type": "boolean",
        "description": "Whether it should be a feature length episode"
      },
      "stardateFrom": {
        "type": "number",
        "description": "Starting stardate of episode story",
        "format": "float"
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of episode story",
        "format": "float"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of episode story",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of episode story",
        "format": "int32"
      },
      "usAirDateFrom": {
        "type": "string",
        "description": "Minimal date the episode was first aired in the United States",
        "format": "date"
      },
      "usAirDateTo": {
        "type": "string",
        "description": "Maximal date the episode was first aired in the United States",
        "format": "date"
      },
      "finalScriptDateFrom": {
        "type": "string",
        "description": "Minimal date the episode script was completed",
        "format": "date"
      },
      "finalScriptDateTo": {
        "type": "string",
        "description": "Maximal date the episode script was completed",
        "format": "date"
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
export default PostEpisodeSearch
