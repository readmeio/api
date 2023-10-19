import AstronomicalObjectBase from './AstronomicalObjectBase';
import CharacterBase from './CharacterBase';

const SpeciesFull = {
  "type": "object",
  "description": "Full species, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Species unique ID"
    },
    "name": {
      "type": "string",
      "description": "Species name"
    },
    "homeworld": AstronomicalObjectBase,
    "quadrant": AstronomicalObjectBase,
    "extinctSpecies": {
      "type": "boolean",
      "description": "Whether it's an extinct species"
    },
    "warpCapableSpecies": {
      "type": "boolean",
      "description": "Whether it's a warp-capable species"
    },
    "extraGalacticSpecies": {
      "type": "boolean",
      "description": "Whether it's an extra-galactic species"
    },
    "humanoidSpecies": {
      "type": "boolean",
      "description": "Whether it's a humanoid species"
    },
    "reptilianSpecies": {
      "type": "boolean",
      "description": "Whether it's a reptilian species"
    },
    "nonCorporealSpecies": {
      "type": "boolean",
      "description": "Whether it's a non-corporeal species"
    },
    "shapeshiftingSpecies": {
      "type": "boolean",
      "description": "Whether it's a shapeshifting species"
    },
    "spaceborneSpecies": {
      "type": "boolean",
      "description": "Whether it's a spaceborne species"
    },
    "telepathicSpecies": {
      "type": "boolean",
      "description": "Whether it's a telepathic species"
    },
    "transDimensionalSpecies": {
      "type": "boolean",
      "description": "Whether it's a trans-dimensional species"
    },
    "unnamedSpecies": {
      "type": "boolean",
      "description": "Whether it's a unnamed species"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this species is from alternate reality"
    },
    "characters": {
      "type": "array",
      "description": "Characters belonging to the species",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "SpeciesFull",
  "x-readme-ref-name": "SpeciesFull"
} as const;
export default SpeciesFull
