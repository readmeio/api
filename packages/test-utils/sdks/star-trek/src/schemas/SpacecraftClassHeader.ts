const SpacecraftClassHeader = {
  "type": "object",
  "description": "Header spacecraft class, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Spacecraft class unique ID"
    },
    "name": {
      "type": "string",
      "description": "Spacecraft class name"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "SpacecraftClassHeader",
  "x-readme-ref-name": "SpacecraftClassHeader"
} as const;
export default SpacecraftClassHeader
