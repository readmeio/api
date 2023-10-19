import ProductionRunUnit from './ProductionRunUnit';

const TradingCardSetBase = {
  "type": "object",
  "description": "Base trading card set, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Trading card set unique ID"
    },
    "name": {
      "type": "string",
      "description": "Trading card set name"
    },
    "releaseYear": {
      "type": "integer",
      "description": "Release year"
    },
    "releaseMonth": {
      "type": "integer",
      "description": "Release month"
    },
    "releaseDay": {
      "type": "integer",
      "description": "Release day"
    },
    "cardsPerPack": {
      "type": "integer",
      "description": "Cards per deck"
    },
    "packsPerBox": {
      "type": "integer",
      "description": "Packs per box"
    },
    "boxesPerCase": {
      "type": "integer",
      "description": "Boxes per case"
    },
    "productionRun": {
      "type": "integer",
      "description": "Production run"
    },
    "productionRunUnit": ProductionRunUnit,
    "cardWidth": {
      "type": "number",
      "description": "Card width, in inches",
      "format": "double",
      "minimum": -1.7976931348623157e+308,
      "maximum": 1.7976931348623157e+308
    },
    "cardHeight": {
      "type": "number",
      "description": "Card height, in inches",
      "format": "double",
      "minimum": -1.7976931348623157e+308,
      "maximum": 1.7976931348623157e+308
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TradingCardSetBase",
  "x-readme-ref-name": "TradingCardSetBase"
} as const;
export default TradingCardSetBase
