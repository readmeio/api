import { utils } from 'oas';

const { matchesMimeType } = utils;

export default async function getResponseBody(response: Response) {
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
}
