const WeaponFull = {
  "type": "object",
  "description": "Full weapon, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Weapon unique ID"
    },
    "name": {
      "type": "string",
      "description": "Weapon name"
    },
    "handHeldWeapon": {
      "type": "boolean",
      "description": "Whether it's a hand-help weapon"
    },
    "laserTechnology": {
      "type": "boolean",
      "description": "Whether it's a laser technology"
    },
    "plasmaTechnology": {
      "type": "boolean",
      "description": "Whether it's a plasma technology"
    },
    "photonicTechnology": {
      "type": "boolean",
      "description": "Whether it's a photonic technology"
    },
    "phaserTechnology": {
      "type": "boolean",
      "description": "Whether it's a phaser technology"
    },
    "mirror": {
      "type": "boolean",
      "description": "Whether this weapon is from mirror universe"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this weapon is from alternate reality"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "WeaponFull",
  "x-readme-ref-name": "WeaponFull"
} as const;
export default WeaponFull
