const ElementFull = {
  "type": "object",
  "description": "Full element, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Element unique ID"
    },
    "name": {
      "type": "string",
      "description": "Element name"
    },
    "symbol": {
      "type": "string",
      "description": "Element symbol"
    },
    "atomicNumber": {
      "type": "integer",
      "description": "Element atomic number"
    },
    "atomicWeight": {
      "type": "integer",
      "description": "Element atomic weight"
    },
    "transuranium": {
      "type": "boolean",
      "description": "Whether it's a transuranium"
    },
    "gammaSeries": {
      "type": "boolean",
      "description": "Whether it belongs to Gamma series"
    },
    "hypersonicSeries": {
      "type": "boolean",
      "description": "Whether it belongs to Hypersonic series"
    },
    "megaSeries": {
      "type": "boolean",
      "description": "Whether it belongs to Mega series"
    },
    "omegaSeries": {
      "type": "boolean",
      "description": "Whether it belongs to Omega series"
    },
    "transonicSeries": {
      "type": "boolean",
      "description": "Whether it belongs to Transonic series"
    },
    "worldSeries": {
      "type": "boolean",
      "description": "Whether it belongs to World series"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "ElementFull",
  "x-readme-ref-name": "ElementFull"
} as const;
export default ElementFull
