const MaterialFull = {
  "type": "object",
  "description": "Full material, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Material unique ID"
    },
    "name": {
      "type": "string",
      "description": "Material name"
    },
    "chemicalCompound": {
      "type": "boolean",
      "description": "Whether it's a chemical compound"
    },
    "biochemicalCompound": {
      "type": "boolean",
      "description": "Whether it's a biochemical compound"
    },
    "drug": {
      "type": "boolean",
      "description": "Whether it's a drug"
    },
    "poisonousSubstance": {
      "type": "boolean",
      "description": "Whether it's a poisonous substance"
    },
    "explosive": {
      "type": "boolean",
      "description": "Whether it's an explosive"
    },
    "gemstone": {
      "type": "boolean",
      "description": "Whether it's a gemstone"
    },
    "alloyOrComposite": {
      "type": "boolean",
      "description": "Whether it's an alloy or a composite"
    },
    "fuel": {
      "type": "boolean",
      "description": "Whether it's a fuel"
    },
    "mineral": {
      "type": "boolean",
      "description": "Whether it's a mineral"
    },
    "preciousMaterial": {
      "type": "boolean",
      "description": "Whether it's a precious material"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "MaterialFull",
  "x-readme-ref-name": "MaterialFull"
} as const;
export default MaterialFull
