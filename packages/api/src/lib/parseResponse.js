// Nabbed from here:
// https://github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30
const {
  utils: { matchesMimeType },
} = require('oas');

module.exports = async function getResponseBody(response) {
  const contentType = response.headers.get('Content-Type');
  const isJSON = contentType && (matchesMimeType.json(contentType) || matchesMimeType.wildcard(contentType));

  const responseBody = await response.text();

  if (isJSON) {
    try {
      return JSON.parse(responseBody);
    } catch (e) {
      // If our JSON parsing failed then we can just return plaintext instead.
    }
  }

  return responseBody;
};
