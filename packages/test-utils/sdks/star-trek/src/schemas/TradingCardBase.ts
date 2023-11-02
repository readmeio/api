import TradingCardDeckHeader from './TradingCardDeckHeader.js';
import TradingCardSetHeader from './TradingCardSetHeader.js';

const TradingCardBase = {
  "type": "object",
  "description": "Base trading card, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Trading card unique ID"
    },
    "name": {
      "type": "string",
      "description": "Trading card name"
    },
    "number": {
      "type": "string",
      "description": "Trading card number"
    },
    "releaseYear": {
      "type": "integer",
      "description": "Release year, if set was releases over multiple years"
    },
    "productionRun": {
      "type": "integer",
      "description": "Production run, if different from trading card set production run"
    },
    "tradingCardSet": TradingCardSetHeader,
    "tradingCardDeck": TradingCardDeckHeader
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TradingCardBase",
  "x-readme-ref-name": "TradingCardBase"
} as const;
export default TradingCardBase
