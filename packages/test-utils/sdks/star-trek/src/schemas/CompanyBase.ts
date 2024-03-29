const CompanyBase = {
  "type": "object",
  "description": "Base company, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Company unique ID"
    },
    "name": {
      "type": "string",
      "description": "Company name"
    },
    "broadcaster": {
      "type": "boolean",
      "description": "Whether it's a broadcaster"
    },
    "collectibleCompany": {
      "type": "boolean",
      "description": "Whether it's a collectible company"
    },
    "conglomerate": {
      "type": "boolean",
      "description": "Whether it's a conglomerate"
    },
    "digitalVisualEffectsCompany": {
      "type": "boolean",
      "description": "Whether it's a digital visual effects company"
    },
    "distributor": {
      "type": "boolean",
      "description": "Whether it's a distributor"
    },
    "gameCompany": {
      "type": "boolean",
      "description": "Whether it's a game company"
    },
    "filmEquipmentCompany": {
      "type": "boolean",
      "description": "Whether it's a film equipment company"
    },
    "makeUpEffectsStudio": {
      "type": "boolean",
      "description": "Whether it's a make-up effects studio"
    },
    "mattePaintingCompany": {
      "type": "boolean",
      "description": "Whether it's a matte painting company"
    },
    "modelAndMiniatureEffectsCompany": {
      "type": "boolean",
      "description": "Whether it's a model and miniature effects company"
    },
    "postProductionCompany": {
      "type": "boolean",
      "description": "Whether it's a post-production company"
    },
    "productionCompany": {
      "type": "boolean",
      "description": "Whether it's a production company"
    },
    "propCompany": {
      "type": "boolean",
      "description": "Whether it's a prop company"
    },
    "recordLabel": {
      "type": "boolean",
      "description": "Whether it's a record label"
    },
    "specialEffectsCompany": {
      "type": "boolean",
      "description": "Whether it's a special effects company"
    },
    "tvAndFilmProductionCompany": {
      "type": "boolean",
      "description": "Whether it's a TV and film production company"
    },
    "videoGameCompany": {
      "type": "boolean",
      "description": "Whether it's a video game company"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "CompanyBase",
  "x-readme-ref-name": "CompanyBase"
} as const;
export default CompanyBase
