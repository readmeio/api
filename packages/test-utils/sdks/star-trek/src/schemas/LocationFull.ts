const LocationFull = {
  "type": "object",
  "description": "Full location, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Location unique ID"
    },
    "name": {
      "type": "string",
      "description": "Location name"
    },
    "earthlyLocation": {
      "type": "boolean",
      "description": "Whether it's an earthly location"
    },
    "fictionalLocation": {
      "type": "boolean",
      "description": "Whether it's a fictional location"
    },
    "religiousLocation": {
      "type": "boolean",
      "description": "Whether it's a religious location"
    },
    "geographicalLocation": {
      "type": "boolean",
      "description": "Whether it's a geographical location"
    },
    "bodyOfWater": {
      "type": "boolean",
      "description": "Whether it's a body of water"
    },
    "country": {
      "type": "boolean",
      "description": "Whether it's a country"
    },
    "subnationalEntity": {
      "type": "boolean",
      "description": "Whether it's a subnational entity"
    },
    "settlement": {
      "type": "boolean",
      "description": "Whether it's a settlement"
    },
    "usSettlement": {
      "type": "boolean",
      "description": "Whether it's a US settlement"
    },
    "bajoranSettlement": {
      "type": "boolean",
      "description": "Whether it's a Bajoran settlement"
    },
    "colony": {
      "type": "boolean",
      "description": "Whether it's a colony"
    },
    "landform": {
      "type": "boolean",
      "description": "Whether it's a landform"
    },
    "landmark": {
      "type": "boolean",
      "description": "Whether it's a landmark"
    },
    "road": {
      "type": "boolean",
      "description": "Whether it's a road"
    },
    "structure": {
      "type": "boolean",
      "description": "Whether it's a structure"
    },
    "shipyard": {
      "type": "boolean",
      "description": "Whether it's a shipyard"
    },
    "buildingInterior": {
      "type": "boolean",
      "description": "Whether it's a building interior"
    },
    "establishment": {
      "type": "boolean",
      "description": "Whether it's a establishment"
    },
    "medicalEstablishment": {
      "type": "boolean",
      "description": "Whether it's a medical establishment"
    },
    "ds9Establishment": {
      "type": "boolean",
      "description": "Whether it's a DS9 establishment"
    },
    "school": {
      "type": "boolean",
      "description": "Whether it's a school"
    },
    "mirror": {
      "type": "boolean",
      "description": "Whether this location is from mirror universe"
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
  "title": "LocationFull",
  "x-readme-ref-name": "LocationFull"
} as const;
export default LocationFull
