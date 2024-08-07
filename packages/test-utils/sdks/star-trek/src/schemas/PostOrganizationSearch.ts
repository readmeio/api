const PostOrganizationSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Organization name"
      },
      "government": {
        "type": "boolean",
        "description": "Whether it should be a government"
      },
      "intergovernmentalOrganization": {
        "type": "boolean",
        "description": "Whether it should be an intergovernmental organization"
      },
      "researchOrganization": {
        "type": "boolean",
        "description": "Whether it should be a research organization"
      },
      "sportOrganization": {
        "type": "boolean",
        "description": "Whether it should be a sport organization"
      },
      "medicalOrganization": {
        "type": "boolean",
        "description": "Whether it should be a medical organization"
      },
      "militaryOrganization": {
        "type": "boolean",
        "description": "Whether it should be a military organization"
      },
      "militaryUnit": {
        "type": "boolean",
        "description": "Whether it should be a military unit"
      },
      "governmentAgency": {
        "type": "boolean",
        "description": "Whether it should be a government agency"
      },
      "lawEnforcementAgency": {
        "type": "boolean",
        "description": "Whether it should be a law enforcement agency"
      },
      "prisonOrPenalColony": {
        "type": "boolean",
        "description": "Whether it should be a prison or penal colony"
      },
      "mirror": {
        "type": "boolean",
        "description": "Whether this organization should be from mirror universe"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this organization should be from alternate reality"
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
export default PostOrganizationSearch
