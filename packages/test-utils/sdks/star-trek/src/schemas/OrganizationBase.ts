const OrganizationBase = {
  "type": "object",
  "description": "Base organization, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Organization unique ID"
    },
    "name": {
      "type": "string",
      "description": "Organization name"
    },
    "government": {
      "type": "boolean",
      "description": "Whether it's a government"
    },
    "intergovernmentalOrganization": {
      "type": "boolean",
      "description": "Whether it's an intergovernmental organization"
    },
    "researchOrganization": {
      "type": "boolean",
      "description": "Whether it's a research organization"
    },
    "sportOrganization": {
      "type": "boolean",
      "description": "Whether it's a sport organization"
    },
    "medicalOrganization": {
      "type": "boolean",
      "description": "Whether it's a medical organization"
    },
    "militaryOrganization": {
      "type": "boolean",
      "description": "Whether it's a military organization"
    },
    "militaryUnit": {
      "type": "boolean",
      "description": "Whether it's a military unit"
    },
    "governmentAgency": {
      "type": "boolean",
      "description": "Whether it's a government agency"
    },
    "lawEnforcementAgency": {
      "type": "boolean",
      "description": "Whether it's a law enforcement agency"
    },
    "prisonOrPenalColony": {
      "type": "boolean",
      "description": "Whether it's a prison or penal colony"
    },
    "mirror": {
      "type": "boolean",
      "description": "Whether this organization is from mirror universe"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this location is from alternate reality"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "OrganizationBase",
  "x-readme-ref-name": "OrganizationBase"
} as const;
export default OrganizationBase
