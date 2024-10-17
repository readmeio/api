import { matchesMimeType } from 'oas/utils';

export default async function parseResponse<HTTPStatus extends number = number>(response: Response) {
  const contentType = response.headers.get('Content-Type');
  const isJSON = contentType && (matchesMimeType.json(contentType) || matchesMimeType.wildcard(contentType));

  const responseBody = await response.clone().text();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = responseBody;
  if (isJSON) {
    try {
      data = JSON.parse(responseBody);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // If our JSON parsing failed then we can just return plaintext instead.
    }
  }

  return {
    data,
    status: response.status as HTTPStatus,
    headers: response.headers,
    res: response,
  };
}
