const SpacecraftType = {
  "type": "object",
  "description": "Rating of video release, etc.",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Spacecraft type unique ID"
    },
    "name": {
      "type": "string",
      "description": "Spacecraft type name"
    }
  },
  "title": "SpacecraftType",
  "x-readme-ref-name": "SpacecraftType"
} as const;
export default SpacecraftType
