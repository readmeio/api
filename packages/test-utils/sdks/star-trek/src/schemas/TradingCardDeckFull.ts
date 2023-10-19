import TradingCardBase from './TradingCardBase';
import TradingCardSetHeader from './TradingCardSetHeader';

const TradingCardDeckFull = {
  "type": "object",
  "description": "Full trading card deck, returned when queried using UID",
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
    "tradingCardSet": TradingCardSetHeader,
    "tradingCards": {
      "type": "array",
      "description": "Trading cards in this deck",
      "items": TradingCardBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TradingCardDeckFull",
  "x-readme-ref-name": "TradingCardDeckFull"
} as const;
export default TradingCardDeckFull
