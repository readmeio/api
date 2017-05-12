const assert = require('assert');
const fs = require('fs');
const os = require('os');
const { questions, prepareDeploy } = require('../../commands/deploy');
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

  describe('prepareDeploy()', () => {
    describe('name', () => {
      it('should prefix with @team if it is a private package', () => {
        const pjson = packageJson();
        pjson.set('name', 'service');
        prepareDeploy(pjson, { team: 'team', private: 'private' });

        assert.equal(pjson.get('name'), '@team/service');
        assert.equal(pjson.get('team', { build: true }), 'team');
      });

      it('should not prefix with @team if it is a public package', () => {
        const pjson = packageJson();
        pjson.set('name', 'service');
        prepareDeploy(pjson, { team: 'test', private: 'public' });

        assert.equal(pjson.get('name'), 'service');
        assert.equal(pjson.get('team', { build: true }), 'test');
      });

      it('should not overwrite team if it is already set and no answer provided', () => {
        const pjson = packageJson();
        pjson.set('name', 'service');
        pjson.set('team', 'team', { build: true });
        prepareDeploy(pjson, {});

        assert.equal(pjson.get('team', { build: true }), 'team');
      });
    });

    describe('version', () => {
      it('should set version if provided', () => {
        const pjson = packageJson();
        pjson.set('version', '1.0.0');
        prepareDeploy(pjson, {
          version: '2.0.0',
        });

        assert.equal(pjson.get('version'), '2.0.0');
      });

      it('should default to package.json version', () => {
        const pjson = packageJson();
        pjson.set('version', '1.0.0');
        prepareDeploy(pjson, {});

        assert.equal(pjson.get('version'), '1.0.0');
      });
    });
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
        assert.equal(teamQuestion.choices.length, teams.length);
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

    describe('private', () => {
      it('should ask question', () => {
        const privateQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'private');

        assert.deepEqual(privateQuestion.choices, ['public', 'private']);
      });

      it('should not ask if `build.team` is set', () => {
        const pjson = packageJson();
        pjson.set('team', 'team-name', { build: true });
        pjson.write();

        const privateQuestion = questions(['1.0.0'], true, []).find(question => question.name === 'private');
        assert.equal(privateQuestion, undefined);
      });
    });
  });
});
