const assert = require('assert');
const { questions } = require('../../commands/deploy');

describe('deploy command', () => {
  describe('questions', () => {
    describe('version', () => {
      it('should not ask if version has not yet been deployed', () => {
        const versionQuestion = questions(['1.0.0'], false).find(question => question.name === 'version');

        assert.equal(versionQuestion.when(), false);
      });

      it('should ask if version has already been deployed', () => {
        const versionQuestion = questions(['1.0.0'], true).find(question => question.name === 'version');

        assert.equal(versionQuestion.when(), true);
      });

      it('should validate against semver version', () => {
        const versionQuestion = questions(['1.0.0'], true).find(question => question.name === 'version');
        assert.equal(versionQuestion.validate('not-valid'), 'not-valid is not a valid semver version');
        assert.equal(versionQuestion.validate('2.0.0'), true);
      });

      it('should error if version has already been deployed', () => {
        const versionQuestion = questions(['1.0.0'], true).find(question => question.name === 'version');
        assert.equal(versionQuestion.validate('1.0.0'), 'Version 1.0.0 has already been deployed.');
      });
    });
  });
});
