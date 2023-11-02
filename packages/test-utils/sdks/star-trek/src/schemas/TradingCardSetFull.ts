import CompanyBase from './CompanyBase.js';
import Country from './Country.js';
import ProductionRunUnit from './ProductionRunUnit.js';
import TradingCardBase from './TradingCardBase.js';
import TradingCardDeckBase from './TradingCardDeckBase.js';

const TradingCardSetFull = {
  "type": "object",
  "description": "Full trading card set, returned when queried using UID",
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
    },
    "manufacturers": {
      "type": "array",
      "description": "Manufacturers",
      "items": CompanyBase
    },
    "tradingCardDecks": {
      "type": "array",
      "description": "Trading card decks in this set",
      "items": TradingCardDeckBase
    },
    "tradingCards": {
      "type": "array",
      "description": "Trading cards in this set",
      "items": TradingCardBase
    },
    "countriesOfOrigin": {
      "type": "array",
      "description": "Countries of origin",
      "items": Country
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TradingCardSetFull",
  "x-readme-ref-name": "TradingCardSetFull"
} as const;
export default TradingCardSetFull
