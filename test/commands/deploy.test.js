const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { questions, constructTeamChoice } = require('../../commands/deploy');
const packageJson = require('../../lib/package-json');

let cwd;
let tmpDir;

describe('deploy command', () => {
  beforeEach(() => {
    cwd = process.cwd();

    tmpDir = fs.mkdtempSync(`${os.tmpdir()}/`);

    process.chdir(tmpDir);
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  describe('questions', () => {
    describe('version', () => {
      it('should not ask if version has not yet been deployed', () => {
        const versionQuestion = questions(['1.0.0'], false, []).find(question => question.name === 'version');

        assert.equal(versionQuestion.when(), false);
      });

      it('should ask if version has already been deployed', () => {
        const versionQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'version');

        assert.equal(versionQuestion.when(), true);
      });

      it('should validate against semver version', () => {
        const versionQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'version');
        assert.equal(versionQuestion.validate('not-valid'), 'not-valid is not a valid semver version');
        assert.equal(versionQuestion.validate('2.0.0'), true);
      });

      it('should error if version has already been deployed', () => {
        const versionQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'version');
        assert.equal(versionQuestion.validate('1.0.0'), 'Version 1.0.0 has already been deployed.');
      });
    });

    describe('private', () => {
      it('should ask public/private if not set in `build.private`', () => {
        const privateQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'private');
        assert.equal(typeof privateQuestion, 'object');
      });

      it('should not ask public/private if `build.private` is set to true', () => {
        const pjson = packageJson();
        pjson.set('private', true, { build: true });
        pjson.write();

        const privateQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'private');
        assert.equal(privateQuestion, undefined);
      });

      it('should not ask public/private if `build.private` is set to false', () => {
        const pjson = packageJson();
        pjson.set('private', false, { build: true });
        pjson.write();

        const privateQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'private');
        assert.equal(privateQuestion, undefined);
      });
    });

    describe('team', () => {
      it('should ask for team if not set in `build.team`', () => {
        const teams = [
          { name: 'test', personal: true },
          { name: 'another-team', personal: false },
        ];
        const pjson = packageJson();
        pjson.set('name', 'name');
        pjson.write();
        const teamQuestion = questions(['1.0.0'], true, teams).find(question => question.name === 'team');
        assert.equal(typeof teamQuestion, 'object');
        assert.deepEqual(teamQuestion.choices, [
          `test: personal team - will be deployed as \`${pjson.get('name')}\``,
          `another-team: non-personal team - will be deployed as \`@another-team/${pjson.get('name')}\``,
        ]);
      });

      it('should not ask for team if `build.team` is set', () => {
        const pjson = packageJson();
        pjson.set('team', 'team-name', { build: true });
        pjson.write();

        const teamQuestion = questions(['1.0.0'], true).find(question => question.name === 'team');
        assert.equal(teamQuestion, undefined);
      });

      it('should not ask for team if `build.team` is set', () => {
        const pjson = packageJson();
        pjson.set('team', 'team-name', { build: true });
        pjson.write();

        const teamQuestion = questions(['1.0.0'], true).find(question => question.name === 'team');
        assert.equal(teamQuestion, undefined);
      });
    });
  });

  describe('constructTeamChoice()', () => {
    it('should construct the team choice', () => {
      assert.equal(constructTeamChoice('service', { name: 'test', personal: true }), 'test: personal team - will be deployed as `service`');
      assert.equal(constructTeamChoice('service', { name: 'another-team', personal: false }), 'another-team: non-personal team - will be deployed as `@another-team/service`');
    });
  });
});
