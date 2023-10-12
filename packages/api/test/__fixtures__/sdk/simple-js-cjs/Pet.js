"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Category_1 = __importDefault(require("./Category"));
var Tag_1 = __importDefault(require("./Tag"));
var Pet = { "type": "object", "required": ["name", "photoUrls"], "properties": { "id": { "type": "integer", "format": "int64", "readOnly": true, "default": 40, "examples": [25], "minimum": -9223372036854776000, "maximum": 9223372036854776000 }, "category": Category_1.default, "name": { "type": "string", "examples": ["doggie"] }, "photoUrls": { "type": "array", "items": { "type": "string", "examples": ["https://example.com/photo.png"] } }, "tags": { "type": "array", "items": Tag_1.default }, "status": { "type": "string", "description": "pet status in the store\n\n`available` `pending` `sold`", "enum": ["available", "pending", "sold"] } }, "title": "Pet", "x-readme-ref-name": "Pet" };
exports.default = Pet;
