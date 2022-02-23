import { expect, test } from '@oclif/test';

describe('hello', function () {
  test
    .stdout()
    .command(['hello', 'friend', '--from=oclif'])
    .it('runs hello cmd', ctx => {
      expect(ctx.stdout).to.contain('hello friend from oclif!');
    });
});
