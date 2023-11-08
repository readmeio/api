import ci from 'ci-info';

/**
 * Small env check to determine if we're running our testbed
 */
function isTest() {
  return process.env.NODE_ENV === 'rdme-test';
}

/**
 * Small check to ensure we're in a safe CI environment.
 *
 * The reason we have this weird conditional logic is because we run our tests in
 * a CI environment and we don't want false positives when running tests.
 */
export default function isCI() {
  /* istanbul ignore next */
  return ci.isCI && !isTest();
}
