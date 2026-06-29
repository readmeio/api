import TradingCardSetFull from './TradingCardSetFull.js';

const TradingCardSetFullResponse = {
  "type": "object",
  "description": "Response object for single trading card set query",
  "properties": {
    "tradingCardSet": TradingCardSetFull
  },
  "title": "TradingCardSetFullResponse",
  "x-readme-ref-name": "TradingCardSetFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TradingCardSetFullResponse
