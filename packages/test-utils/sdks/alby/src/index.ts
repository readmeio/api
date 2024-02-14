import SDK from './sdk.js';

/**
 * Control API v1
 *
 * Use the Control API to manage your applications, namespaces, keys, queues, rules, and
 * more.
 *
 * Detailed information on using this API can be found in the Ably <a
 * href="https://ably.com/documentation/control-api">developer documentation</a>.
 *
 * Control API is currently in Beta.
 *
 *
 */
const createSDK = (() => { return new SDK(); })();

export default createSDK;
