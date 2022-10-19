import { utils } from 'oas';

const { matchesMimeType } = utils;

export default async function getResponseBody(response: Response) {
  const contentType = response.headers.get('Content-Type');
  const isJSON = contentType && (matchesMimeType.json(contentType) || matchesMimeType.wildcard(contentType));

  const responseBody = await response.text();

  let data = responseBody;
  if (isJSON) {
    try {
      data = JSON.parse(responseBody);
    } catch (e) {
      // If our JSON parsing failed then we can just return plaintext instead.
    }
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
    res: response,
  };
}
