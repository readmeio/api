import { utils } from 'oas';

const { matchesMimeType } = utils;

export default async function getResponseBody(response: Response) {
  const contentType = response.headers.get('Content-Type');
  const isJson = contentType && (matchesMimeType.json(contentType) || matchesMimeType.wildcard(contentType));

  // We have to clone it before reading, just incase we cannot parse it as JSON later, then we can
  // re-read again as plain text.
  const clonedResponse = response.clone();
  let responseBody;

  try {
    responseBody = await response[isJson ? 'json' : 'text']();
  } catch (e) {
    responseBody = await clonedResponse.text();
  }

  return responseBody;
}
