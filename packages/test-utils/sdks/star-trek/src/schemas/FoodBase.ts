const FoodBase = {
  "type": "object",
  "description": "Base food, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Food unique ID"
    },
    "name": {
      "type": "string",
      "description": "Food name"
    },
    "earthlyOrigin": {
      "type": "boolean",
      "description": "Whether it's of earthly origin"
    },
    "dessert": {
      "type": "boolean",
      "description": "Whether it's a dessert"
    },
    "fruit": {
      "type": "boolean",
      "description": "Whether it's a fruit"
    },
    "herbOrSpice": {
      "type": "boolean",
      "description": "Whether it's a herb or a spice"
    },
    "sauce": {
      "type": "boolean",
      "description": "Whether it's a sauce"
    },
    "soup": {
      "type": "boolean",
      "description": "Whether it's a soup"
    },
    "beverage": {
      "type": "boolean",
      "description": "Whether it's a beverage"
    },
    "alcoholicBeverage": {
      "type": "boolean",
      "description": "Whether it's an alcoholic beverage"
    },
    "juice": {
      "type": "boolean",
      "description": "Whether it's a juice"
    },
    "tea": {
      "type": "boolean",
      "description": "Whether it's a tea"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "FoodBase",
  "x-readme-ref-name": "FoodBase"
} as const;
export default FoodBase
