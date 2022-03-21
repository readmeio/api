const serverVariables = require('@readme/oas-examples/3.0/json/server-variables.json');

module.exports = serverVariables;

// {
//   "openapi": "3.0.3",
//   "info": {
//     "title": "Server variables",
//     "description": "https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#serverVariableObject",
//     "version": "1.0.0"
//   },
//   "servers": [
//     {
//       "url": "https://{name}.example.com:{port}/{basePath}",
//       "variables": {
//         "name": {
//           "default": "demo"
//         },
//         "port": {
//           "default": "443"
//         },
//         "basePath": {
//           "default": "v2"
//         }
//       }
//     },
//     {
//       "url": "http://{name}.local/{basePath}",
//       "variables": {
//         "name": {
//           "default": "demo"
//         },
//         "basePath": {
//           "default": "v2"
//         }
//       }
//     },
//     {
//       "url": "http://{subdomain}.local/{subdomain}",
//       "variables": {
//         "subdomain": {
//           "default": "demo"
//         }
//       }
//     }
//   ],
//   "paths": {
//     "/create/{id}": {
//       "post": {
//         "operationId": "create",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "schema": {
//               "type": "integer"
//             }
//           }
//         ],
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/x-www-form-urlencoded": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "foo": {
//                     "type": "string"
//                   }
//                 },
//                 "required": [
//                   "foo"
//                 ]
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "OK"
//           }
//         },
//         "security": [
//           {
//             "petstore_auth": []
//           }
//         ]
//       }
//     }
//   },
//   "components": {
//     "securitySchemes": {
//       "petstore_auth": {
//         "type": "oauth2",
//         "flows": {
//           "implicit": {
//             "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
//             "scopes": {
//               "write:pets": "modify pets in your account",
//               "read:pets": "read your pets"
//             }
//           }
//         }
//       }
//     }
//   }
// }
