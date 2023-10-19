import TradingCardSetHeader from './TradingCardSetHeader';

const TradingCardDeckBase = {
  "type": "object",
  "description": "Base trading card deck, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Trading card deck unique ID"
    },
    "name": {
      "type": "string",
      "description": "Trading card deck name"
    },
    "frequency": {
      "type": "string",
      "description": "Frequency with which this deck occur in it's set"
    },
    "tradingCardSet": TradingCardSetHeader
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TradingCardDeckBase",
  "x-readme-ref-name": "TradingCardDeckBase"
} as const;
export default TradingCardDeckBase
