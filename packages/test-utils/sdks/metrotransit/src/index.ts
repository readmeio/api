import SDK from './sdk.js';

/**
 * NexTrip API
 *
 * API for creating Metro Transit real-time departure information display (beta, subject to
 * change)
 *
 */
const createSDK = (() => { return new SDK(); })();

export default createSDK;
