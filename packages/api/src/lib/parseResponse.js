// Nabbed from here:
// https://github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30
const {
  utils: { matchesMimeType },
} = require('oas');

module.exports = async function getResponseBody(response) {
  const contentType = response.headers.get('Content-Type');
  const isJson = contentType && (matchesMimeType.json(contentType) || matchesMimeType.wildcard(contentType));

  // We have to clone it before reading, just incase
  // we cannot parse it as JSON later, then we can
  // re-read again as plain text
  const clonedResponse = response.clone();
  let responseBody;

  try {
    responseBody = await response[isJson ? 'json' : 'text']();
  } catch (e) {
    responseBody = await clonedResponse.text();
  }

  return responseBody;
};
