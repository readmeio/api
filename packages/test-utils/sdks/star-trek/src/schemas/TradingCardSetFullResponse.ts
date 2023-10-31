import TradingCardSetFull from './TradingCardSetFull.js';

const TradingCardSetFullResponse = {
  "type": "object",
  "description": "Response object for single trading card set query",
  "properties": {
    "tradingCardSet": TradingCardSetFull
  },
  "title": "TradingCardSetFullResponse",
  "x-readme-ref-name": "TradingCardSetFullResponse"
} as const;
export default TradingCardSetFullResponse
