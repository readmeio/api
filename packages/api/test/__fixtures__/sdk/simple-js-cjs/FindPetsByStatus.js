"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pet_1 = __importDefault(require("./Pet"));
var FindPetsByStatus = { "metadata": { "allOf": [{ "type": "object", "properties": { "status": { "type": "array", "items": { "type": "string", "enum": ["available", "pending", "sold"], "default": "available", "description": "Default: available" }, "$schema": "http://json-schema.org/draft-04/schema#", "description": "Status values that need to be considered for filter" } }, "required": ["status"] }] }, "response": { "200": { "type": "array", "items": Pet_1.default, "$schema": "http://json-schema.org/draft-04/schema#" } } };
exports.default = FindPetsByStatus;
