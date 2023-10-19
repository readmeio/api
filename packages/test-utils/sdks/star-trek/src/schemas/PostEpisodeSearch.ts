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
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "seasonNumberTo": {
        "type": "integer",
        "description": "Maximal season number",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "episodeNumberFrom": {
        "type": "integer",
        "description": "Minimal episode number in season",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "episodeNumberTo": {
        "type": "integer",
        "description": "Maximal episode number in season",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
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
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of episode story",
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of episode story",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of episode story",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
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
export default PostEpisodeSearch
