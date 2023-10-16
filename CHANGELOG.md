## 7.0.0-alpha.5 (2023-10-16)

* fix: bringing back some tests ([d33e655](https://github.com/readmeio/api/commit/d33e655))
* fix: broken test ([9ade11b](https://github.com/readmeio/api/commit/9ade11b))
* fix: cjs compatibility with our `types` file being exported in `index` ([330a3a1](https://github.com/readmeio/api/commit/330a3a1))
* fix: compatibility with node 20 on `npm run debug:bin` ([9fd0370](https://github.com/readmeio/api/commit/9fd0370))
* fix: flaky test in ci ([8e11923](https://github.com/readmeio/api/commit/8e11923))
* fix: overhauling schemas to now be stored in a `schemas/` directory ([6463a02](https://github.com/readmeio/api/commit/6463a02))
* fix: pinning installed sdk dependencies to known working versions ([d4e5d5a](https://github.com/readmeio/api/commit/d4e5d5a))
* fix: removing some dead code ([488041e](https://github.com/readmeio/api/commit/488041e))
* fix: storage system didn't properly create subdirectories ([654194e](https://github.com/readmeio/api/commit/654194e))
* fix(api): nestling generated schemas into a new `schemas/` directory (#756) ([ec74118](https://github.com/readmeio/api/commit/ec74118)), closes [#756](https://github.com/readmeio/api/issues/756)
* fix(api): storage dir not being set properly (#753) ([fa31dd4](https://github.com/readmeio/api/commit/fa31dd4)), closes [#753](https://github.com/readmeio/api/issues/753)
* feat: migrate `api` and `core` to ESM (#733) ([f65bc79](https://github.com/readmeio/api/commit/f65bc79)), closes [#733](https://github.com/readmeio/api/issues/733)
* feat: refactoring codegen'd sdks to be placed into a `src/` directory ([7d7b4cc](https://github.com/readmeio/api/commit/7d7b4cc))
* feat(api): wip of proper esm support and codegen overhauls ([8e5558d](https://github.com/readmeio/api/commit/8e5558d))
* chore(deps-dev): bump the minor-development-deps group with 4 updates (#750) ([5259bb7](https://github.com/readmeio/api/commit/5259bb7)), closes [#750](https://github.com/readmeio/api/issues/750)
* chore(deps): bump vitest from 0.34.5 to 0.34.6 (#751) ([ef4b36c](https://github.com/readmeio/api/commit/ef4b36c)), closes [#751](https://github.com/readmeio/api/issues/751)
* chore(deps): bumping ts-morph ([e2e1259](https://github.com/readmeio/api/commit/e2e1259))
* docs: documenting why we're exporting `createSDK` the way we are ([84872e6](https://github.com/readmeio/api/commit/84872e6))
* refactor: remove `make-dir` as a dep (#746) ([ab41a72](https://github.com/readmeio/api/commit/ab41a72)), closes [#746](https://github.com/readmeio/api/issues/746)
* refactor(api): minor refactors to how some internal language classes are used (#755) ([518736d](https://github.com/readmeio/api/commit/518736d)), closes [#755](https://github.com/readmeio/api/issues/755)



## 7.0.0-alpha.3 (2023-09-27)

* chore(deps): bump fetch-har (#745) ([d7a5d0c](https://github.com/readmeio/api/commit/d7a5d0c)), closes [#745](https://github.com/readmeio/api/issues/745)
* chore(deps): npm up (#744) ([dc23621](https://github.com/readmeio/api/commit/dc23621)), closes [#744](https://github.com/readmeio/api/issues/744)



## 7.0.0-alpha.2 (2023-09-26)

* chore(deps-dev): bump oas-normalize from 8.4.1 to 10.1.0 (#726) ([5a947b9](https://github.com/readmeio/api/commit/5a947b9)), closes [#726](https://github.com/readmeio/api/issues/726)
* chore(deps): bump (#735) ([ee1b44d](https://github.com/readmeio/api/commit/ee1b44d)), closes [#735](https://github.com/readmeio/api/issues/735)
* chore(deps): bump (#742) ([cbdf9cd](https://github.com/readmeio/api/commit/cbdf9cd)), closes [#742](https://github.com/readmeio/api/issues/742)
* chore(deps): bump @readme/oas-to-har from 20.1.1 to 23.0.8 (#741) ([8d4f32d](https://github.com/readmeio/api/commit/8d4f32d)), closes [#741](https://github.com/readmeio/api/issues/741)
* chore(deps): bump `oas` + friends (#743) ([69ebbee](https://github.com/readmeio/api/commit/69ebbee)), closes [#743](https://github.com/readmeio/api/issues/743)



## 7.0.0-alpha.1 (2023-09-19)

* fix: try renaming core pkg to `@readme/api-core` (#732) ([43c55a1](https://github.com/readmeio/api/commit/43c55a1)), closes [#732](https://github.com/readmeio/api/issues/732)



## 7.0.0-alpha.0 (2023-09-19)

* revert: restore lerna.json changes ([066563e](https://github.com/readmeio/api/commit/066563e))
* refactor: rename `@api/core` to `api.core` (#731) ([7169c64](https://github.com/readmeio/api/commit/7169c64)), closes [#731](https://github.com/readmeio/api/issues/731)
* refactor(api): cleaning up the api directory now that core is split out (#728) ([ef4e95c](https://github.com/readmeio/api/commit/ef4e95c)), closes [#728](https://github.com/readmeio/api/issues/728)
* refactor(core): moving the core library into an isolated package (#725) ([189b8c5](https://github.com/readmeio/api/commit/189b8c5)), closes [#725](https://github.com/readmeio/api/issues/725)
* refactor(ts): strict mode (#696) ([3529992](https://github.com/readmeio/api/commit/3529992)), closes [#696](https://github.com/readmeio/api/issues/696)
* ci: disabling get-stream updates because its esm-only now ([6a6a290](https://github.com/readmeio/api/commit/6a6a290))
* ci: knip (#730) ([be87af5](https://github.com/readmeio/api/commit/be87af5)), closes [#730](https://github.com/readmeio/api/issues/730)
* ci(dependabot): setting up a group to reduce dependabot noise ([0421f43](https://github.com/readmeio/api/commit/0421f43))
* feat: deprecating the dynamic `api` entrypoint (#723) ([437f6e4](https://github.com/readmeio/api/commit/437f6e4)), closes [#723](https://github.com/readmeio/api/issues/723)
* feat: drop support for node 16 and move to require native fetch (#722) ([709c54b](https://github.com/readmeio/api/commit/709c54b)), closes [#722](https://github.com/readmeio/api/issues/722)
* feat: moving node imports over to using the node: prefix (#729) ([8810603](https://github.com/readmeio/api/commit/8810603)), closes [#729](https://github.com/readmeio/api/issues/729)
* docs: bumping the license years ([499b891](https://github.com/readmeio/api/commit/499b891))
* chore: bringing back changelog updating ([d673575](https://github.com/readmeio/api/commit/d673575))
* chore(deps-dev): bump the minor-development-deps group with 1 update (#720) ([5809cd9](https://github.com/readmeio/api/commit/5809cd9)), closes [#720](https://github.com/readmeio/api/issues/720)
* chore(deps): bump actions/checkout from 3 to 4 (#712) ([ac529fa](https://github.com/readmeio/api/commit/ac529fa)), closes [#712](https://github.com/readmeio/api/issues/712)
* chore(deps): bump commander from 10.0.0 to 11.0.0 (#703) ([48575cb](https://github.com/readmeio/api/commit/48575cb)), closes [#703](https://github.com/readmeio/api/issues/703)
* chore(deps): bump json-schema-to-ts from 2.6.2-beta.0 to 2.9.2 (#718) ([f252451](https://github.com/readmeio/api/commit/f252451)), closes [#718](https://github.com/readmeio/api/issues/718)
* chore(deps): bumping out of date deps (#711) ([cdeb4ba](https://github.com/readmeio/api/commit/cdeb4ba)), closes [#711](https://github.com/readmeio/api/issues/711)
* chore(deps): upgrading to typescript 5 (#719) ([fd1fade](https://github.com/readmeio/api/commit/fd1fade)), closes [#719](https://github.com/readmeio/api/issues/719)



## 6.1.0 (2023-07-17)

* fix(codegen): don't surface error responses as method return types (#674) ([cea1e7f](https://github.com/readmeio/api/commit/cea1e7f)), closes [#674](https://github.com/readmeio/api/issues/674)
* fix(security): running `npm audit fix` ([b5cb90a](https://github.com/readmeio/api/commit/b5cb90a))
* feat: extend unit testing to node 20 (#673) ([8f0c801](https://github.com/readmeio/api/commit/8f0c801)), closes [#673](https://github.com/readmeio/api/issues/673)
* feat(cli): adding a new `--identifier` option for supplying an SDK identifier (#675) ([e2af5c8](https://github.com/readmeio/api/commit/e2af5c8)), closes [#675](https://github.com/readmeio/api/issues/675)
* ci: removing broken specs from the smoketest, reducing its frequency ([37c2d40](https://github.com/readmeio/api/commit/37c2d40))
* ci: removing concurrency limitations on the smoketest workflow ([ad28c8d](https://github.com/readmeio/api/commit/ad28c8d))
* ci(smoketest): removing some bad apis from the smoketest dataset ([b323dc5](https://github.com/readmeio/api/commit/b323dc5))
* refactor: moving unit tests over to jest (#672) ([1f455f1](https://github.com/readmeio/api/commit/1f455f1)), closes [#672](https://github.com/readmeio/api/issues/672)



## <small>6.0.1 (2023-06-27)</small>

* v6.0.1 ([5fe262d](https://github.com/readmeio/api/commit/5fe262d))
* fix(snippet): bug where path params may lose hyphens if they have one (#660) ([674ce19](https://github.com/readmeio/api/commit/674ce19)), closes [#660](https://github.com/readmeio/api/issues/660)



## 6.0.0 (2023-06-26)

* v6.0.0 ([9759db4](https://github.com/readmeio/api/commit/9759db4))
* fix: getting unit tests passing again (#659) ([94e73e3](https://github.com/readmeio/api/commit/94e73e3)), closes [#659](https://github.com/readmeio/api/issues/659)
* chore: bumping up our peerdep for httpsnippet ([bc4e2ee](https://github.com/readmeio/api/commit/bc4e2ee))
* feat: dropping support for node 14 (#655) ([8e7515c](https://github.com/readmeio/api/commit/8e7515c)), closes [#655](https://github.com/readmeio/api/issues/655)



## <small>5.0.8 (2023-03-17)</small>

* v5.0.8 ([bd15ecc](https://github.com/readmeio/api/commit/bd15ecc))
* chore(deps): bump http-cache-semantics from 4.1.0 to 4.1.1 (#613) ([ebb90af](https://github.com/readmeio/api/commit/ebb90af)), closes [#613](https://github.com/readmeio/api/issues/613)
* chore(deps): bumping out of date deps (#611) ([287a708](https://github.com/readmeio/api/commit/287a708)), closes [#611](https://github.com/readmeio/api/issues/611)
* chore(test): refreshing the smoketest dataset ([1a457e4](https://github.com/readmeio/api/commit/1a457e4))
* feat: add install flag to bypass prompt (#625) ([415fb8e](https://github.com/readmeio/api/commit/415fb8e)), closes [#625](https://github.com/readmeio/api/issues/625)



## <small>5.0.7 (2023-01-23)</small>

* Adds ESM usage instructions (#606) ([6fadba7](https://github.com/readmeio/api/commit/6fadba7)), closes [#606](https://github.com/readmeio/api/issues/606)
* v5.0.7 ([b003a05](https://github.com/readmeio/api/commit/b003a05))
* fix: moving off `fs/promises` to `fs` in client-side code (#605) ([1d9c87e](https://github.com/readmeio/api/commit/1d9c87e)), closes [#605](https://github.com/readmeio/api/issues/605)
* chore: bumping deps (#607) ([21bd60a](https://github.com/readmeio/api/commit/21bd60a)), closes [#607](https://github.com/readmeio/api/issues/607)



## <small>5.0.6 (2023-01-09)</small>

* v5.0.6 ([33d0a4e](https://github.com/readmeio/api/commit/33d0a4e))
* chore: bumping out of date deps (#603) ([66cfec9](https://github.com/readmeio/api/commit/66cfec9)), closes [#603](https://github.com/readmeio/api/issues/603)
* fix: broken badge, remove unnecessary `.svg` extension ([7c5224c](https://github.com/readmeio/api/commit/7c5224c)), closes [badges/shields#8671](https://github.com/badges/shields/issues/8671)
* fix: failing tests (#602) ([c19a991](https://github.com/readmeio/api/commit/c19a991)), closes [#602](https://github.com/readmeio/api/issues/602)



## <small>5.0.5 (2022-12-09)</small>

* v5.0.5 ([2d39949](https://github.com/readmeio/api/commit/2d39949))
* fix: resolving typing issues in JS codegen (#593) ([ab97a70](https://github.com/readmeio/api/commit/ab97a70)), closes [#593](https://github.com/readmeio/api/issues/593)
* test: updating the smoketest dataset (#594) ([bf57315](https://github.com/readmeio/api/commit/bf57315)), closes [#594](https://github.com/readmeio/api/issues/594)
* chore(deps-dev): bump eslint from 8.28.0 to 8.29.0 (#592) ([deaa5ba](https://github.com/readmeio/api/commit/deaa5ba)), closes [#592](https://github.com/readmeio/api/issues/592)
* chore(deps): bump readmeio/rdme from 8.1.1 to 8.2.0 (#587) ([2c6144e](https://github.com/readmeio/api/commit/2c6144e)), closes [#587](https://github.com/readmeio/api/issues/587)
* chore(deps): bumping out of date deps (#591) ([54754da](https://github.com/readmeio/api/commit/54754da)), closes [#591](https://github.com/readmeio/api/issues/591)
* chore(deps): use rdme@v8 ([a730908](https://github.com/readmeio/api/commit/a730908))



## <small>5.0.4 (2022-11-30)</small>

* v5.0.4 ([e566a19](https://github.com/readmeio/api/commit/e566a19))
* chore(deps): bumping out of date deps across all packages (#576) ([1255dd6](https://github.com/readmeio/api/commit/1255dd6)), closes [#576](https://github.com/readmeio/api/issues/576)



## <small>5.0.3 (2022-11-28)</small>

* v5.0.3 ([7aba675](https://github.com/readmeio/api/commit/7aba675))
* test: refreshing the unit test dataset ([4dad793](https://github.com/readmeio/api/commit/4dad793))
* chore(deps-dev): bump husky from 8.0.1 to 8.0.2 (#568) ([113e898](https://github.com/readmeio/api/commit/113e898)), closes [#568](https://github.com/readmeio/api/issues/568)
* chore(deps): bump readmeio/rdme from 8.0.0 to 8.1.1 (#573) ([6f96efa](https://github.com/readmeio/api/commit/6f96efa)), closes [#573](https://github.com/readmeio/api/issues/573)
* chore(deps): bumping out of date deps (#575) ([ae55a13](https://github.com/readmeio/api/commit/ae55a13)), closes [#575](https://github.com/readmeio/api/issues/575)
* fix: compatibility with yarn installs where `package.json` needs `version` (#574) ([0913923](https://github.com/readmeio/api/commit/0913923)), closes [#574](https://github.com/readmeio/api/issues/574)
* ci: disabling updates to `find-cache-dir` as it's esm-only now ([e21a975](https://github.com/readmeio/api/commit/e21a975))



## <small>5.0.2 (2022-11-25)</small>

* v5.0.2 ([f51774f](https://github.com/readmeio/api/commit/f51774f))
* fix: installs not actually installing the api (#562) ([909a9fd](https://github.com/readmeio/api/commit/909a9fd)), closes [#562](https://github.com/readmeio/api/issues/562)
* chore(deps): bump readmeio/rdme from 7.5.0 to 8.0.0 (#558) ([08d3ac5](https://github.com/readmeio/api/commit/08d3ac5)), closes [#558](https://github.com/readmeio/api/issues/558)



## <small>5.0.1 (2022-10-31)</small>

* v5.0.1 ([81bb654](https://github.com/readmeio/api/commit/81bb654))
* fix: bug where `@api/identifier` wasn't being installed properly (#557) ([20228d2](https://github.com/readmeio/api/commit/20228d2)), closes [#557](https://github.com/readmeio/api/issues/557)
* docs: tweaks to the v4 upgrade docs ([f752c66](https://github.com/readmeio/api/commit/f752c66))



## 5.0.0 (2022-10-31)

* Fix example in README (#529) ([bd10fad](https://github.com/readmeio/api/commit/bd10fad)), closes [#529](https://github.com/readmeio/api/issues/529)
* v5.0.0 ([bb044ec](https://github.com/readmeio/api/commit/bb044ec))
* docs: adding a callout about v5 not being out yet ([c36fdb1](https://github.com/readmeio/api/commit/c36fdb1))
* docs: fixing some typos in a few docs ([e766707](https://github.com/readmeio/api/commit/e766707))
* docs: installation clarifications on the registry UUID ([a9c6ce2](https://github.com/readmeio/api/commit/a9c6ce2))
* docs: v5 (#553) ([5faaa11](https://github.com/readmeio/api/commit/5faaa11)), closes [#553](https://github.com/readmeio/api/issues/553)
* chore: refreshing the smoketest dataset and excluding all google apis (#554) ([5b6a86a](https://github.com/readmeio/api/commit/5b6a86a)), closes [#554](https://github.com/readmeio/api/issues/554)
* chore: updating packageInfo ([b507b38](https://github.com/readmeio/api/commit/b507b38))
* chore(deps-dev): bump @commitlint/cli from 17.0.3 to 17.1.2 (#515) ([1b84f6e](https://github.com/readmeio/api/commit/1b84f6e)), closes [#515](https://github.com/readmeio/api/issues/515)
* chore(deps-dev): bump @commitlint/cli from 17.1.2 to 17.2.0 (#555) ([71ae361](https://github.com/readmeio/api/commit/71ae361)), closes [#555](https://github.com/readmeio/api/issues/555)
* chore(deps-dev): bump @commitlint/config-conventional (#514) ([9699657](https://github.com/readmeio/api/commit/9699657)), closes [#514](https://github.com/readmeio/api/issues/514)
* chore(deps-dev): bump @commitlint/config-conventional (#556) ([09b43ce](https://github.com/readmeio/api/commit/09b43ce)), closes [#556](https://github.com/readmeio/api/issues/556)
* chore(deps-dev): bump @readme/eslint-config from 10.1.0 to 10.1.1 (#528) ([aae1d87](https://github.com/readmeio/api/commit/aae1d87)), closes [#528](https://github.com/readmeio/api/issues/528)
* chore(deps-dev): bump @readme/eslint-config from 9.0.0 to 10.1.0 (#519) ([9ab7829](https://github.com/readmeio/api/commit/9ab7829)), closes [#519](https://github.com/readmeio/api/issues/519)
* chore(deps-dev): bump @readme/oas-examples from 5.4.1 to 5.5.0 (#503) ([6a59efb](https://github.com/readmeio/api/commit/6a59efb)), closes [#503](https://github.com/readmeio/api/issues/503)
* chore(deps-dev): bump @types/mocha from 9.1.1 to 10.0.0 (#526) ([6a40663](https://github.com/readmeio/api/commit/6a40663)), closes [#526](https://github.com/readmeio/api/issues/526)
* chore(deps-dev): bump eslint from 8.21.0 to 8.23.0 (#517) ([827b71d](https://github.com/readmeio/api/commit/827b71d)), closes [#517](https://github.com/readmeio/api/issues/517)
* chore(deps-dev): bump eslint from 8.23.0 to 8.24.0 (#525) ([4ca9c8f](https://github.com/readmeio/api/commit/4ca9c8f)), closes [#525](https://github.com/readmeio/api/issues/525)
* chore(deps-dev): bump eslint from 8.24.0 to 8.25.0 (#531) ([3c1645b](https://github.com/readmeio/api/commit/3c1645b)), closes [#531](https://github.com/readmeio/api/issues/531)
* chore(deps-dev): bump eslint from 8.25.0 to 8.26.0 (#541) ([0621068](https://github.com/readmeio/api/commit/0621068)), closes [#541](https://github.com/readmeio/api/issues/541)
* chore(deps): bump @readme/oas-to-har from 17.1.2 to 18.0.0 (#518) ([9d88aea](https://github.com/readmeio/api/commit/9d88aea)), closes [#518](https://github.com/readmeio/api/issues/518)
* chore(deps): bump ssri from 9.0.0 to 10.0.0 (#534) ([33dd5bb](https://github.com/readmeio/api/commit/33dd5bb)), closes [#534](https://github.com/readmeio/api/issues/534)
* chore(deps): bump ts-morph from 15.1.0 to 16.0.0 (#527) ([501941d](https://github.com/readmeio/api/commit/501941d)), closes [#527](https://github.com/readmeio/api/issues/527)
* chore(deps): bump validate-npm-package-name from 4.0.0 to 5.0.0 (#535) ([d150055](https://github.com/readmeio/api/commit/d150055)), closes [#535](https://github.com/readmeio/api/issues/535)
* chore(deps): bumping oas deps (#552) ([3f7b625](https://github.com/readmeio/api/commit/3f7b625)), closes [#552](https://github.com/readmeio/api/issues/552)
* chore(deps): bumping out of date deps (#510) ([c37fbcc](https://github.com/readmeio/api/commit/c37fbcc)), closes [#510](https://github.com/readmeio/api/issues/510)
* fix: minor tweak to how we generate the packageInfo file ([980dd9d](https://github.com/readmeio/api/commit/980dd9d))
* fix: prefix schema titles that start with numbers to fix a type generation bug (#530) ([b17a261](https://github.com/readmeio/api/commit/b17a261)), closes [#530](https://github.com/readmeio/api/issues/530)
* fix: quirks with OR auth configurations not working right (#543) ([af4c0e9](https://github.com/readmeio/api/commit/af4c0e9)), closes [#543](https://github.com/readmeio/api/issues/543)
* feat: addition of a new `timeout` config option (#542) ([dad0dbe](https://github.com/readmeio/api/commit/dad0dbe)), closes [#542](https://github.com/readmeio/api/issues/542) [#432](https://github.com/readmeio/api/issues/432)
* feat: allow original operationIDs to be used in dynamic SDKs (#509) ([0d52b72](https://github.com/readmeio/api/commit/0d52b72)), closes [#509](https://github.com/readmeio/api/issues/509)
* feat: allowing `accept` headers to always be sent through as metadata (#538) ([826368a](https://github.com/readmeio/api/commit/826368a)), closes [#538](https://github.com/readmeio/api/issues/538)
* feat: allowing users to manually specify an `authorization` header (#546) ([11e2435](https://github.com/readmeio/api/commit/11e2435)), closes [#546](https://github.com/readmeio/api/issues/546)
* feat: completely overhauling how we're handling response data (#539) ([18ddbfb](https://github.com/readmeio/api/commit/18ddbfb)), closes [#539](https://github.com/readmeio/api/issues/539)
* feat(testing): codegen smoketest suite + fixes (#550) ([ab94a7e](https://github.com/readmeio/api/commit/ab94a7e)), closes [#550](https://github.com/readmeio/api/issues/550)
* refactor: json schema type generation and handling (#533) ([b257fe1](https://github.com/readmeio/api/commit/b257fe1)), closes [#533](https://github.com/readmeio/api/issues/533)
* ci: formdata-node is esm only now ([67f44cd](https://github.com/readmeio/api/commit/67f44cd))



## 5.0.0-beta.3 (2022-08-01)

* v5.0.0-beta.3 ([24d5b83](https://github.com/readmeio/api/commit/24d5b83))
* chore: updating packageInfo ([9b43093](https://github.com/readmeio/api/commit/9b43093))
* chore(deps-dev): bump @readme/eslint-config from 8.8.3 to 9.0.0 (#502) ([d084273](https://github.com/readmeio/api/commit/d084273)), closes [#502](https://github.com/readmeio/api/issues/502)
* chore(deps-dev): bump eslint from 8.19.0 to 8.21.0 (#501) ([ab18053](https://github.com/readmeio/api/commit/ab18053)), closes [#501](https://github.com/readmeio/api/issues/501)
* chore(deps): bump readmeio/rdme from 7.3.0 to 7.5.0 (#500) ([404fddf](https://github.com/readmeio/api/commit/404fddf)), closes [#500](https://github.com/readmeio/api/issues/500)
* fix: bug where operationIDs with underscores were being modified (#497) ([6519b4f](https://github.com/readmeio/api/commit/6519b4f)), closes [#497](https://github.com/readmeio/api/issues/497)
* fix: generated SDKs now ship an IFEE (#494) ([9d1247f](https://github.com/readmeio/api/commit/9d1247f)), closes [#494](https://github.com/readmeio/api/issues/494)
* fix: removing undefined objects from incoming metadata parameters (#496) ([3183a8e](https://github.com/readmeio/api/commit/3183a8e)), closes [#496](https://github.com/readmeio/api/issues/496)
* feat: adding support for case-insensitive header parameters (#495) ([895f8d5](https://github.com/readmeio/api/commit/895f8d5)), closes [#495](https://github.com/readmeio/api/issues/495)
* docs: minor doc change to test something in production ([8aaef93](https://github.com/readmeio/api/commit/8aaef93))
* docs: revert change ([b580517](https://github.com/readmeio/api/commit/b580517))



## 5.0.0-beta.2 (2022-07-19)

* v5.0.0-beta.2 ([aa738b1](https://github.com/readmeio/api/commit/aa738b1))
* feat: add support for github blob URLs (#484) ([f8b20a8](https://github.com/readmeio/api/commit/f8b20a8)), closes [#484](https://github.com/readmeio/api/issues/484)
* feat: improved typescript method acecssor `path` type generation (#482) ([8db66e7](https://github.com/readmeio/api/commit/8db66e7)), closes [#482](https://github.com/readmeio/api/issues/482)
* feat: updating httpsnippet-client-api to be compatible with httpsnippet v4 (#491) ([cb357f2](https://github.com/readmeio/api/commit/cb357f2)), closes [#491](https://github.com/readmeio/api/issues/491)
* feat: updating httpsnippet-client-api to work on httpsnippet v4 + TS rewrite (#492) ([8b11be6](https://github.com/readmeio/api/commit/8b11be6)), closes [#492](https://github.com/readmeio/api/issues/492)
* fix: making sure that packageInfo file updates get committed on release ([1b770b4](https://github.com/readmeio/api/commit/1b770b4))
* fix: rearrange markdown comment ([a992a86](https://github.com/readmeio/api/commit/a992a86))
* fix: typescript crashes (#480) ([78dc3b2](https://github.com/readmeio/api/commit/78dc3b2)), closes [#480](https://github.com/readmeio/api/issues/480)
* ci: getting started content reuse using hercule (#490) ([7803460](https://github.com/readmeio/api/commit/7803460)), closes [#490](https://github.com/readmeio/api/issues/490)
* docs: fixing a bad url ([618fee3](https://github.com/readmeio/api/commit/618fee3))
* docs: tweaks to callouts so they look better on our docs ([fc25a5e](https://github.com/readmeio/api/commit/fc25a5e))
* docs: updating documentation for v5 (#469) ([c77e900](https://github.com/readmeio/api/commit/c77e900)), closes [#469](https://github.com/readmeio/api/issues/469) [#475](https://github.com/readmeio/api/issues/475) [#479](https://github.com/readmeio/api/issues/479) [#473](https://github.com/readmeio/api/issues/473)
* docs: updating relative image paths to be absolute in our docs ([1f49792](https://github.com/readmeio/api/commit/1f49792))
* chore(deps-dev): bump typescript from 4.6.4 to 4.7.4 (#473) ([4aea544](https://github.com/readmeio/api/commit/4aea544)), closes [#473](https://github.com/readmeio/api/issues/473)
* chore(deps-dev): bumping dev deps (#479) ([1434753](https://github.com/readmeio/api/commit/1434753)), closes [#479](https://github.com/readmeio/api/issues/479)



## 5.0.0-beta.1 (2022-07-10)

* v5.0.0-beta.1 ([5970a1f](https://github.com/readmeio/api/commit/5970a1f))
* fix: downgrading json-schema-to-typescript to v10 (#475) ([31a1091](https://github.com/readmeio/api/commit/31a1091)), closes [#475](https://github.com/readmeio/api/issues/475)
* feat: updating the packageInfo file for v5 beta0 ([a4df246](https://github.com/readmeio/api/commit/a4df246))



## 5.0.0-beta.0 (2022-07-08)

* v5.0.0-beta.0 ([d18f7e3](https://github.com/readmeio/api/commit/d18f7e3))
* fix: cleaning up some unnecessarily complicated promises ([db41fd3](https://github.com/readmeio/api/commit/db41fd3))
* fix: cleanup of assorted snippet generation quirks (#420) ([44a6f11](https://github.com/readmeio/api/commit/44a6f11)), closes [#420](https://github.com/readmeio/api/issues/420)
* fix: fixing how we generate the dist to work under CJS imports (#397) ([358bde4](https://github.com/readmeio/api/commit/358bde4)), closes [#397](https://github.com/readmeio/api/issues/397)
* fix: improper paths in the unit test tsconfig ([6c6c044](https://github.com/readmeio/api/commit/6c6c044))
* fix: issue where formData would sometimes be sent twice (#389) ([d4e309c](https://github.com/readmeio/api/commit/d4e309c)), closes [#389](https://github.com/readmeio/api/issues/389)
* fix: moving us off the unstable node12 module resolution with a paths hack (#400) ([aa44884](https://github.com/readmeio/api/commit/aa44884)), closes [#400](https://github.com/readmeio/api/issues/400)
* fix: quirk with node 16 and `response.clone()` (#419) ([9fe5f2a](https://github.com/readmeio/api/commit/9fe5f2a)), closes [#419](https://github.com/readmeio/api/issues/419)
* fix: the codeql workflow so it runs properly (#379) ([ebcd3ce](https://github.com/readmeio/api/commit/ebcd3ce)), closes [#379](https://github.com/readmeio/api/issues/379)
* fix: updating the TS installer to install the upcoming `api@beta` release ([8c7388f](https://github.com/readmeio/api/commit/8c7388f))
* fix: use existing API methods (#447) ([fe01b6e](https://github.com/readmeio/api/commit/fe01b6e)), closes [#447](https://github.com/readmeio/api/issues/447)
* fix(auth): remove the ability to have auth chained with each request (#431) ([b7fc800](https://github.com/readmeio/api/commit/b7fc800)), closes [#431](https://github.com/readmeio/api/issues/431)
* chore: bumping the license year ([c7f1c76](https://github.com/readmeio/api/commit/c7f1c76))
* chore: delete redundant docs (#417) ([fbcfd26](https://github.com/readmeio/api/commit/fbcfd26)), closes [#417](https://github.com/readmeio/api/issues/417)
* chore: excluding esm-only packages from dependabot ([09420a0](https://github.com/readmeio/api/commit/09420a0))
* chore(deps-dev): bump @commitlint/cli from 16.2.1 to 16.2.4 (#441) ([628d90e](https://github.com/readmeio/api/commit/628d90e)), closes [#441](https://github.com/readmeio/api/issues/441)
* chore(deps-dev): bump @commitlint/cli from 16.2.4 to 17.0.2 (#452) ([ccc25d1](https://github.com/readmeio/api/commit/ccc25d1)), closes [#452](https://github.com/readmeio/api/issues/452)
* chore(deps-dev): bump @commitlint/cli from 17.0.2 to 17.0.3 (#463) ([e1bdea4](https://github.com/readmeio/api/commit/e1bdea4)), closes [#463](https://github.com/readmeio/api/issues/463)
* chore(deps-dev): bump @commitlint/config-conventional (#438) ([597b180](https://github.com/readmeio/api/commit/597b180)), closes [#438](https://github.com/readmeio/api/issues/438)
* chore(deps-dev): bump @commitlint/config-conventional (#450) ([5e29521](https://github.com/readmeio/api/commit/5e29521)), closes [#450](https://github.com/readmeio/api/issues/450)
* chore(deps-dev): bump @commitlint/config-conventional (#461) ([3b61e30](https://github.com/readmeio/api/commit/3b61e30)), closes [#461](https://github.com/readmeio/api/issues/461)
* chore(deps-dev): bump @types/validate-npm-package-name (#467) ([367495c](https://github.com/readmeio/api/commit/367495c)), closes [#467](https://github.com/readmeio/api/issues/467)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#454) ([a094b3f](https://github.com/readmeio/api/commit/a094b3f)), closes [#454](https://github.com/readmeio/api/issues/454)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#456) ([838bc54](https://github.com/readmeio/api/commit/838bc54)), closes [#456](https://github.com/readmeio/api/issues/456)
* chore(deps-dev): bump sinon from 13.0.2 to 14.0.0 (#451) ([5f127d1](https://github.com/readmeio/api/commit/5f127d1)), closes [#451](https://github.com/readmeio/api/issues/451)
* chore(deps-dev): bumping all dev deps (#384) ([874a91d](https://github.com/readmeio/api/commit/874a91d)), closes [#384](https://github.com/readmeio/api/issues/384)
* chore(deps-dev): bumping all out of date dev deps (#381) ([fb53f57](https://github.com/readmeio/api/commit/fb53f57)), closes [#381](https://github.com/readmeio/api/issues/381)
* chore(deps-dev): bumping some dev dependencie ([c5b4a49](https://github.com/readmeio/api/commit/c5b4a49))
* chore(deps-dev): removing alex as a dep, its better suited as a GH action ([9b9a9ea](https://github.com/readmeio/api/commit/9b9a9ea))
* chore(deps): bump @readme/oas-to-har from 14.1.0 to 15.0.0 (#390) ([fbad503](https://github.com/readmeio/api/commit/fbad503)), closes [#390](https://github.com/readmeio/api/issues/390)
* chore(deps): bump actions/checkout from 2.4.0 to 3 (#425) ([7669751](https://github.com/readmeio/api/commit/7669751)), closes [#425](https://github.com/readmeio/api/issues/425)
* chore(deps): bump actions/setup-node from 2.5.1 to 3 (#405) ([d761624](https://github.com/readmeio/api/commit/d761624)), closes [#405](https://github.com/readmeio/api/issues/405)
* chore(deps): bump github/codeql-action from 1 to 2 (#437) ([5e13314](https://github.com/readmeio/api/commit/5e13314)), closes [#437](https://github.com/readmeio/api/issues/437)
* chore(deps): bump json-schema-to-typescript from 10.1.5 to 11.0.1 (#464) ([04c4082](https://github.com/readmeio/api/commit/04c4082)), closes [#464](https://github.com/readmeio/api/issues/464)
* chore(deps): bump ts-morph from 14.0.0 to 15.1.0 (#459) ([9bbf46f](https://github.com/readmeio/api/commit/9bbf46f)), closes [#459](https://github.com/readmeio/api/issues/459)
* chore(deps): bumping node-fetch (#377) ([eec72cd](https://github.com/readmeio/api/commit/eec72cd)), closes [#377](https://github.com/readmeio/api/issues/377)
* chore(deps): bumping out of date deps (#443) ([66e5e69](https://github.com/readmeio/api/commit/66e5e69)), closes [#443](https://github.com/readmeio/api/issues/443)
* chore(deps): upgrading oas and @readme/openapi-parser ([2b3c07c](https://github.com/readmeio/api/commit/2b3c07c))
* chore(deps): upgrading oas to v18 (#407) ([a817eef](https://github.com/readmeio/api/commit/a817eef)), closes [#407](https://github.com/readmeio/api/issues/407)
* chore(deps): upgrading out of date deps ([8027f55](https://github.com/readmeio/api/commit/8027f55))
* feat: adding support for cookie parameters (#393) ([7252e5f](https://github.com/readmeio/api/commit/7252e5f)), closes [#393](https://github.com/readmeio/api/issues/393)
* feat: adding support for cookies in snippets (#421) ([a355800](https://github.com/readmeio/api/commit/a355800)), closes [#421](https://github.com/readmeio/api/issues/421)
* feat: changing the readme api url from .io to .com (#383) ([d64ee16](https://github.com/readmeio/api/commit/d64ee16)), closes [#383](https://github.com/readmeio/api/issues/383)
* feat: clenaing up how we access paths out of the OAS (#394) ([356248c](https://github.com/readmeio/api/commit/356248c)), closes [#394](https://github.com/readmeio/api/issues/394)
* feat: cli installer (#427) ([6b1e472](https://github.com/readmeio/api/commit/6b1e472)), closes [#427](https://github.com/readmeio/api/issues/427)
* feat: creating a new test suite for running snippet datasets within a VM (#422) ([0d23afc](https://github.com/readmeio/api/commit/0d23afc)), closes [#422](https://github.com/readmeio/api/issues/422)
* feat: creation of a new APICore class to handle fetching (#410) ([abf83ae](https://github.com/readmeio/api/commit/abf83ae)), closes [#410](https://github.com/readmeio/api/issues/410)
* feat: decoupling the spec fetching process from the caching library (#428) ([eb276b4](https://github.com/readmeio/api/commit/eb276b4)), closes [#428](https://github.com/readmeio/api/issues/428)
* feat: dropping support for node 12 (#382) ([d04c89d](https://github.com/readmeio/api/commit/d04c89d)), closes [#382](https://github.com/readmeio/api/issues/382)
* feat: extending support to node 18 (#435) ([4ba3917](https://github.com/readmeio/api/commit/4ba3917)), closes [#435](https://github.com/readmeio/api/issues/435)
* feat: improved handling of file uploads (#380) ([cd3c2ec](https://github.com/readmeio/api/commit/cd3c2ec)), closes [#380](https://github.com/readmeio/api/issues/380)
* feat: moving `api-core` back into the main `api` package (#409) ([8ce96f5](https://github.com/readmeio/api/commit/8ce96f5)), closes [#409](https://github.com/readmeio/api/issues/409)
* feat: moving the test suite over to mocha (#402) ([bc6952f](https://github.com/readmeio/api/commit/bc6952f)), closes [#402](https://github.com/readmeio/api/issues/402)
* feat: overhauling how we process parameters to support required defaults (#396) ([6ee4906](https://github.com/readmeio/api/commit/6ee4906)), closes [#396](https://github.com/readmeio/api/issues/396)
* feat: splitting core api functionality out into a separate package (#399) ([84da97a](https://github.com/readmeio/api/commit/84da97a)), closes [#399](https://github.com/readmeio/api/issues/399)
* feat: supporting configurable cache dirs in the dynamic SDK (#446) ([8f19be9](https://github.com/readmeio/api/commit/8f19be9)), closes [#446](https://github.com/readmeio/api/issues/446)
* feat: typescript rewrite (#392) ([a2241b0](https://github.com/readmeio/api/commit/a2241b0)), closes [#392](https://github.com/readmeio/api/issues/392)
* feat: TypeScript SDK code generation 🧙  (#411) ([77dbd34](https://github.com/readmeio/api/commit/77dbd34)), closes [#411](https://github.com/readmeio/api/issues/411)
* ci: form-data-encoder is now ESM-only so we can't use it (yet) ([934582f](https://github.com/readmeio/api/commit/934582f))
* docs: adding tickets to the pr template ([a4979e6](https://github.com/readmeio/api/commit/a4979e6))
* docs: incorporating alex into our documentation workflow (#408) ([cf55006](https://github.com/readmeio/api/commit/cf55006)), closes [#408](https://github.com/readmeio/api/issues/408)
* docs: minor contrib updates ([4d18c36](https://github.com/readmeio/api/commit/4d18c36))
* docs: small revision to the pr template ([e271dcf](https://github.com/readmeio/api/commit/e271dcf))
* docs: updating the changelog ([289c872](https://github.com/readmeio/api/commit/289c872))
* test: run `build` in pretest (#430) ([cfcbf00](https://github.com/readmeio/api/commit/cfcbf00)), closes [#430](https://github.com/readmeio/api/issues/430)
* test: SDK codegeneration test suite (#413) ([849c78c](https://github.com/readmeio/api/commit/849c78c)), closes [#413](https://github.com/readmeio/api/issues/413)
* test: upgrading `@readme/oas-examples` to the latest release and fixing issues (#424) ([2e8988c](https://github.com/readmeio/api/commit/2e8988c)), closes [#424](https://github.com/readmeio/api/issues/424)
* perf: codegen performance improvements (#429) ([7b341a2](https://github.com/readmeio/api/commit/7b341a2)), closes [#429](https://github.com/readmeio/api/issues/429)
* style: capping all long comments to 100 character lines so they're easier to read (#395) ([98ff3aa](https://github.com/readmeio/api/commit/98ff3aa)), closes [#395](https://github.com/readmeio/api/issues/395)



## 4.2.0 (2022-01-03)

* v4.2.0 ([eb3b741](https://github.com/readmeio/api/commit/eb3b741))
* chore(deps-dev): bump @commitlint/cli from 15.0.0 to 16.0.1 (#372) ([2279bcf](https://github.com/readmeio/api/commit/2279bcf)), closes [#372](https://github.com/readmeio/api/issues/372)
* chore(deps-dev): bump @commitlint/config-conventional (#365) ([eddaec1](https://github.com/readmeio/api/commit/eddaec1)), closes [#365](https://github.com/readmeio/api/issues/365)
* chore(deps-dev): bump @readme/eslint-config from 8.0.2 to 8.1.1 (#373) ([c781941](https://github.com/readmeio/api/commit/c781941)), closes [#373](https://github.com/readmeio/api/issues/373)
* chore(deps-dev): bump eslint from 8.3.0 to 8.6.0 (#369) ([1c5f2b1](https://github.com/readmeio/api/commit/1c5f2b1)), closes [#369](https://github.com/readmeio/api/issues/369)
* chore(deps-dev): bump jest from 27.4.2 to 27.4.5 (#370) ([81c8874](https://github.com/readmeio/api/commit/81c8874)), closes [#370](https://github.com/readmeio/api/issues/370)
* chore(deps-dev): bump memfs from 3.4.0 to 3.4.1 (#367) ([2f5f2f1](https://github.com/readmeio/api/commit/2f5f2f1)), closes [#367](https://github.com/readmeio/api/issues/367)
* chore(deps-dev): bump prettier from 2.5.0 to 2.5.1 (#371) ([55ce743](https://github.com/readmeio/api/commit/55ce743)), closes [#371](https://github.com/readmeio/api/issues/371)
* chore(deps): bump actions/setup-node from 2.5.0 to 2.5.1 (#364) ([343c5b7](https://github.com/readmeio/api/commit/343c5b7)), closes [#364](https://github.com/readmeio/api/issues/364)
* chore(deps): bump fetch-har from 5.0.3 to 5.0.4 (#366) ([53f0b61](https://github.com/readmeio/api/commit/53f0b61)), closes [#366](https://github.com/readmeio/api/issues/366)
* chore(deps): bump oas from 17.3.2 to 17.4.0 (#368) ([410f6ca](https://github.com/readmeio/api/commit/410f6ca)), closes [#368](https://github.com/readmeio/api/issues/368)
* chore(deps): upgrading various oas-related deps (#374) ([8a31118](https://github.com/readmeio/api/commit/8a31118)), closes [#374](https://github.com/readmeio/api/issues/374)



## <small>4.1.3 (2021-12-16)</small>

* v4.1.3 ([cb0dd91](https://github.com/readmeio/api/commit/cb0dd91))
* chore(deps): upgrading oas-to-har and oas (#361) ([b6ee52c](https://github.com/readmeio/api/commit/b6ee52c)), closes [#361](https://github.com/readmeio/api/issues/361)



## <small>4.1.2 (2021-12-10)</small>

* v4.1.2 ([7845886](https://github.com/readmeio/api/commit/7845886))
* fix: crash where multipart/form-data requests dont have params (#360) ([5762c22](https://github.com/readmeio/api/commit/5762c22)), closes [#360](https://github.com/readmeio/api/issues/360)



## <small>4.1.1 (2021-12-01)</small>

* v4.1.1 ([0731728](https://github.com/readmeio/api/commit/0731728))
* chore(deps-dev): bump @commitlint/cli from 13.2.1 to 15.0.0 (#353) ([240ee49](https://github.com/readmeio/api/commit/240ee49)), closes [#353](https://github.com/readmeio/api/issues/353)
* chore(deps-dev): bump @commitlint/config-conventional (#354) ([49fe5c0](https://github.com/readmeio/api/commit/49fe5c0)), closes [#354](https://github.com/readmeio/api/issues/354)
* chore(deps-dev): bump jest from 27.3.1 to 27.4.2 (#358) ([c9b7bc7](https://github.com/readmeio/api/commit/c9b7bc7)), closes [#358](https://github.com/readmeio/api/issues/358)
* chore(deps-dev): bump memfs from 3.3.0 to 3.4.0 (#357) ([c73cc93](https://github.com/readmeio/api/commit/c73cc93)), closes [#357](https://github.com/readmeio/api/issues/357)
* chore(deps-dev): bump nock from 13.1.4 to 13.2.1 (#352) ([0ad6778](https://github.com/readmeio/api/commit/0ad6778)), closes [#352](https://github.com/readmeio/api/issues/352)
* chore(deps-dev): bump prettier from 2.4.1 to 2.5.0 (#356) ([0fb9cdd](https://github.com/readmeio/api/commit/0fb9cdd)), closes [#356](https://github.com/readmeio/api/issues/356)
* chore(deps-dev): upgrading eslint and @readme/eslint-config ([693f52d](https://github.com/readmeio/api/commit/693f52d))
* chore(deps): bump @readme/oas-to-har from 14.0.0 to 14.0.1 (#359) ([3048ec9](https://github.com/readmeio/api/commit/3048ec9)), closes [#359](https://github.com/readmeio/api/issues/359)
* chore(deps): bump actions/checkout from 2.3.5 to 2.4.0 (#351) ([61af132](https://github.com/readmeio/api/commit/61af132)), closes [#351](https://github.com/readmeio/api/issues/351)
* chore(deps): bump actions/setup-node from 2.4.1 to 2.5.0 (#350) ([9b53392](https://github.com/readmeio/api/commit/9b53392)), closes [#350](https://github.com/readmeio/api/issues/350)
* chore(deps): bump oas from 17.1.0 to 17.1.6 (#355) ([916bab1](https://github.com/readmeio/api/commit/916bab1)), closes [#355](https://github.com/readmeio/api/issues/355)



## 4.1.0 (2021-11-08)

* v4.1.0 ([057c930](https://github.com/readmeio/api/commit/057c930))
* chore(deps-dev): bump nock from 13.1.3 to 13.1.4 (#346) ([de4ba12](https://github.com/readmeio/api/commit/de4ba12)), closes [#346](https://github.com/readmeio/api/issues/346)
* chore(deps): bump actions/checkout from 2.3.4 to 2.3.5 (#345) ([30b7101](https://github.com/readmeio/api/commit/30b7101)), closes [#345](https://github.com/readmeio/api/issues/345)
* chore(deps): bump node-fetch from 2.6.5 to 2.6.6 (#348) ([fba1514](https://github.com/readmeio/api/commit/fba1514)), closes [#348](https://github.com/readmeio/api/issues/348)
* chore(deps): bump oas from 16.0.3 to 16.0.4 (#347) ([b66675f](https://github.com/readmeio/api/commit/b66675f)), closes [#347](https://github.com/readmeio/api/issues/347)
* chore(deps): running npm audit ([04f5d5b](https://github.com/readmeio/api/commit/04f5d5b))
* feat: upgrading oas to v17 (#349) ([a88fb8b](https://github.com/readmeio/api/commit/a88fb8b)), closes [#349](https://github.com/readmeio/api/issues/349)



## 4.0.0 (2021-10-29)

* v4.0.0 ([f1d2c25](https://github.com/readmeio/api/commit/f1d2c25))
* feat: support for OpenAPI 3.1 (#344) ([4e5b9ba](https://github.com/readmeio/api/commit/4e5b9ba)), closes [#344](https://github.com/readmeio/api/issues/344)



## <small>3.4.2 (2021-10-08)</small>

* v3.4.2 ([a072112](https://github.com/readmeio/api/commit/a072112))
* fix: issues with circular references being dereferenced and unable to be stringified (#343) ([5c68896](https://github.com/readmeio/api/commit/5c68896)), closes [#343](https://github.com/readmeio/api/issues/343)



## <small>3.4.1 (2021-10-04)</small>

* v3.4.1 ([ebed0fc](https://github.com/readmeio/api/commit/ebed0fc))
* chore(deps-dev): bump @commitlint/cli from 13.1.0 to 13.2.0 (#337) ([33c95e6](https://github.com/readmeio/api/commit/33c95e6)), closes [#337](https://github.com/readmeio/api/issues/337)
* chore(deps-dev): bump @commitlint/config-conventional (#333) ([3136aff](https://github.com/readmeio/api/commit/3136aff)), closes [#333](https://github.com/readmeio/api/issues/333)
* chore(deps-dev): bump @readme/eslint-config from 7.1.0 to 7.2.0 (#334) ([8fd366d](https://github.com/readmeio/api/commit/8fd366d)), closes [#334](https://github.com/readmeio/api/issues/334)
* chore(deps-dev): bump jest from 27.2.0 to 27.2.4 (#341) ([17cba71](https://github.com/readmeio/api/commit/17cba71)), closes [#341](https://github.com/readmeio/api/issues/341)
* chore(deps-dev): bump memfs from 3.2.4 to 3.3.0 (#342) ([2f7e89f](https://github.com/readmeio/api/commit/2f7e89f)), closes [#342](https://github.com/readmeio/api/issues/342)
* chore(deps-dev): bump prettier from 2.4.0 to 2.4.1 (#340) ([d2c634a](https://github.com/readmeio/api/commit/d2c634a)), closes [#340](https://github.com/readmeio/api/issues/340)
* chore(deps): bump @readme/oas-to-har from 13.7.2 to 13.7.3 (#338) ([7cd53c3](https://github.com/readmeio/api/commit/7cd53c3)), closes [#338](https://github.com/readmeio/api/issues/338)
* chore(deps): bump actions/setup-node from 2.4.0 to 2.4.1 (#332) ([1ac85c7](https://github.com/readmeio/api/commit/1ac85c7)), closes [#332](https://github.com/readmeio/api/issues/332)
* chore(deps): bump fetch-har from 5.0.2 to 5.0.3 (#339) ([cabdd8f](https://github.com/readmeio/api/commit/cabdd8f)), closes [#339](https://github.com/readmeio/api/issues/339)
* chore(deps): bump node-fetch from 2.6.1 to 2.6.5 (#336) ([dab087b](https://github.com/readmeio/api/commit/dab087b)), closes [#336](https://github.com/readmeio/api/issues/336)
* chore(deps): bump oas from 14.5.1 to 14.6.1 (#335) ([b40d217](https://github.com/readmeio/api/commit/b40d217)), closes [#335](https://github.com/readmeio/api/issues/335)
* docs: adding a security policy ([420584f](https://github.com/readmeio/api/commit/420584f))



## 3.4.0 (2021-09-14)

* v3.4.0 ([142ce11](https://github.com/readmeio/api/commit/142ce11))
* chore(deps-dev): bumping dev deps ([69dcca3](https://github.com/readmeio/api/commit/69dcca3))
* chore(deps): bumping oas-to-har and oas deps ([a958511](https://github.com/readmeio/api/commit/a958511))
* chore(deps): upgrading the @readme/httpsnippet peerDep requirements ([3814721](https://github.com/readmeio/api/commit/3814721))
* fix: quirks in oas-to-har where query params are not being URI encoded (#331) ([fe43a41](https://github.com/readmeio/api/commit/fe43a41)), closes [#331](https://github.com/readmeio/api/issues/331)



## <small>3.3.2 (2021-09-01)</small>

* v3.3.2 ([0781286](https://github.com/readmeio/api/commit/0781286))
* chore(deps-dev): bump @readme/eslint-config from 6.0.0 to 6.1.0 (#329) ([716b0af](https://github.com/readmeio/api/commit/716b0af)), closes [#329](https://github.com/readmeio/api/issues/329)
* chore(deps-dev): bump jest from 27.0.6 to 27.1.0 (#326) ([1c7188a](https://github.com/readmeio/api/commit/1c7188a)), closes [#326](https://github.com/readmeio/api/issues/326)
* chore(deps-dev): bump memfs from 3.2.2 to 3.2.3 (#324) ([a1c689e](https://github.com/readmeio/api/commit/a1c689e)), closes [#324](https://github.com/readmeio/api/issues/324)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([9a7a05e](https://github.com/readmeio/api/commit/9a7a05e))
* chore(deps-dev): removing lerna in favor of npx ([1e237ac](https://github.com/readmeio/api/commit/1e237ac))
* chore(deps): bump fetch-har from 5.0.1 to 5.0.2 (#330) ([ca00fec](https://github.com/readmeio/api/commit/ca00fec)), closes [#330](https://github.com/readmeio/api/issues/330)
* chore(deps): bump find-cache-dir from 3.3.1 to 3.3.2 (#325) ([1255449](https://github.com/readmeio/api/commit/1255449)), closes [#325](https://github.com/readmeio/api/issues/325)
* chore(deps): bump oas from 14.3.1 to 14.4.0 (#328) ([7fc0996](https://github.com/readmeio/api/commit/7fc0996)), closes [#328](https://github.com/readmeio/api/issues/328)
* chore(deps): running npm audit ([6f07b41](https://github.com/readmeio/api/commit/6f07b41))
* ci: ignoring node-fetch updates as its now an esm package ([b3222a4](https://github.com/readmeio/api/commit/b3222a4))



## <small>3.3.1 (2021-08-26)</small>

* v3.3.1 ([3ab90c1](https://github.com/readmeio/api/commit/3ab90c1))
* chore: running npm audit ([50428b2](https://github.com/readmeio/api/commit/50428b2))
* chore(deps-dev): bump husky from 7.0.1 to 7.0.2 (#319) ([876bf46](https://github.com/readmeio/api/commit/876bf46)), closes [#319](https://github.com/readmeio/api/issues/319)
* chore(deps-dev): bump nock from 13.1.1 to 13.1.3 (#316) ([2cef19f](https://github.com/readmeio/api/commit/2cef19f)), closes [#316](https://github.com/readmeio/api/issues/316)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.2 to 10.0.3 (#320) ([380f369](https://github.com/readmeio/api/commit/380f369)), closes [#320](https://github.com/readmeio/api/issues/320)
* chore(deps): bump @readme/oas-to-har from 13.6.0 to 13.6.1 (#322) ([2c49d5f](https://github.com/readmeio/api/commit/2c49d5f)), closes [#322](https://github.com/readmeio/api/issues/322)
* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#312) ([e4a907d](https://github.com/readmeio/api/commit/e4a907d)), closes [#312](https://github.com/readmeio/api/issues/312)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#314) ([c53578d](https://github.com/readmeio/api/commit/c53578d)), closes [#314](https://github.com/readmeio/api/issues/314)
* chore(deps): bump datauri from 3.0.0 to 4.1.0 (#318) ([445c4ad](https://github.com/readmeio/api/commit/445c4ad)), closes [#318](https://github.com/readmeio/api/issues/318)
* chore(deps): bump fetch-har from 5.0.0 to 5.0.1 (#323) ([c3feab1](https://github.com/readmeio/api/commit/c3feab1)), closes [#323](https://github.com/readmeio/api/issues/323)
* chore(deps): bump mimer from 1.1.0 to 2.0.2 (#317) ([d3da902](https://github.com/readmeio/api/commit/d3da902)), closes [#317](https://github.com/readmeio/api/issues/317)
* chore(deps): bump oas from 14.0.0 to 14.3.1 (#315) ([400e680](https://github.com/readmeio/api/commit/400e680)), closes [#315](https://github.com/readmeio/api/issues/315)
* ci: ignoring stringify-object because its an ESM pkg now ([bbaac03](https://github.com/readmeio/api/commit/bbaac03))
* ci: updating the dependabot label ([d07b3c0](https://github.com/readmeio/api/commit/d07b3c0))



## 3.3.0 (2021-07-31)

* v3.3.0 ([e2a1e40](https://github.com/readmeio/api/commit/e2a1e40))
* chore(deps-dev): bumping dev deps ([d34cb39](https://github.com/readmeio/api/commit/d34cb39))
* chore(deps-dev): bumping root pkg deps ([b585684](https://github.com/readmeio/api/commit/b585684))
* chore(deps): upgrading our oas and fetch-har deps ([6efcd05](https://github.com/readmeio/api/commit/6efcd05))
* docs: revisions to the pr template ([2ccb888](https://github.com/readmeio/api/commit/2ccb888))



## <small>3.2.6 (2021-07-06)</small>

* v3.2.6 ([5def722](https://github.com/readmeio/api/commit/5def722))
* chore(deps-dev): bump @readme/eslint-config from 5.0.5 to 5.1.0 (#306) ([ea4e2f0](https://github.com/readmeio/api/commit/ea4e2f0)), closes [#306](https://github.com/readmeio/api/issues/306)
* chore(deps-dev): bump eslint from 7.27.0 to 7.29.0 (#305) ([cc41ca7](https://github.com/readmeio/api/commit/cc41ca7)), closes [#305](https://github.com/readmeio/api/issues/305)
* chore(deps-dev): bump husky from 6.0.0 to 7.0.0 (#307) ([7a5e17a](https://github.com/readmeio/api/commit/7a5e17a)), closes [#307](https://github.com/readmeio/api/issues/307)
* chore(deps-dev): bump jest from 27.0.3 to 27.0.6 (#308) ([ec8261f](https://github.com/readmeio/api/commit/ec8261f)), closes [#308](https://github.com/readmeio/api/issues/308)
* chore(deps-dev): bump prettier from 2.3.0 to 2.3.2 (#311) ([9fbc5d6](https://github.com/readmeio/api/commit/9fbc5d6)), closes [#311](https://github.com/readmeio/api/issues/311)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#310) ([7874ea4](https://github.com/readmeio/api/commit/7874ea4)), closes [#310](https://github.com/readmeio/api/issues/310)
* chore(deps): bump @readme/oas-to-har from 13.4.10 to 13.4.17 (#309) ([3e36558](https://github.com/readmeio/api/commit/3e36558)), closes [#309](https://github.com/readmeio/api/issues/309)
* chore(deps): bump actions/setup-node from 2.1.5 to 2.2.0 (#304) ([6cb7a85](https://github.com/readmeio/api/commit/6cb7a85)), closes [#304](https://github.com/readmeio/api/issues/304)



## <small>3.2.5 (2021-06-30)</small>

* v3.2.5 ([cfda278](https://github.com/readmeio/api/commit/cfda278))
* chore(deps): upgrading oas to fix a server path matching quirk ([bb4a3bd](https://github.com/readmeio/api/commit/bb4a3bd))



## <small>3.2.4 (2021-06-28)</small>

* v3.2.4 ([624b385](https://github.com/readmeio/api/commit/624b385))
* chore(deps): upgrading oas to 13.0.3 ([a6531d3](https://github.com/readmeio/api/commit/a6531d3))



## <small>3.2.3 (2021-06-28)</small>

* v3.2.3 ([ba32a36](https://github.com/readmeio/api/commit/ba32a36))
* chore(deps): upgrading oas to 13.0.2 ([ca3ef7a](https://github.com/readmeio/api/commit/ca3ef7a))



## <small>3.2.2 (2021-06-11)</small>

* v3.2.2 ([b952087](https://github.com/readmeio/api/commit/b952087))
* chore(deps): upgrading `oas` to v13 (#303) ([e77cb20](https://github.com/readmeio/api/commit/e77cb20)), closes [#303](https://github.com/readmeio/api/issues/303)



## <small>3.2.1 (2021-06-08)</small>

* v3.2.1 ([df00ce6](https://github.com/readmeio/api/commit/df00ce6))
* chore(deps): upgrading oas-to-har and oas (#302) ([eef8895](https://github.com/readmeio/api/commit/eef8895)), closes [#302](https://github.com/readmeio/api/issues/302)



## 3.2.0 (2021-06-07)

* v3.2.0 ([3e67252](https://github.com/readmeio/api/commit/3e67252))
* chore: upgrading the `oas` dependency in httpsnippet-client-api ([98981b0](https://github.com/readmeio/api/commit/98981b0))
* chore(deps-dev): bump @commitlint/cli from 12.1.3 to 12.1.4 (#296) ([3d1a6df](https://github.com/readmeio/api/commit/3d1a6df)), closes [#296](https://github.com/readmeio/api/issues/296)
* chore(deps-dev): bump @commitlint/config-conventional (#297) ([87f2825](https://github.com/readmeio/api/commit/87f2825)), closes [#297](https://github.com/readmeio/api/issues/297)
* chore(deps-dev): bump eslint from 7.26.0 to 7.27.0 (#300) ([1ef52d8](https://github.com/readmeio/api/commit/1ef52d8)), closes [#300](https://github.com/readmeio/api/issues/300)
* chore(deps-dev): bump jest from 26.6.3 to 27.0.3 (#299) ([2b73cef](https://github.com/readmeio/api/commit/2b73cef)), closes [#299](https://github.com/readmeio/api/issues/299)
* chore(deps-dev): bump nock from 13.0.11 to 13.1.0 (#295) ([f118bb2](https://github.com/readmeio/api/commit/f118bb2)), closes [#295](https://github.com/readmeio/api/issues/295)
* chore(deps): bump @readme/oas-to-har from 13.4.5 to 13.4.6 (#301) ([0a15279](https://github.com/readmeio/api/commit/0a15279)), closes [#301](https://github.com/readmeio/api/issues/301)
* chore(deps): bump oas from 11.0.0 to 11.0.1 (#298) ([a35e430](https://github.com/readmeio/api/commit/a35e430)), closes [#298](https://github.com/readmeio/api/issues/298)
* feat: shorthand for readme-hosted APIs (@subdomain#uuid) (#176) ([bca6c23](https://github.com/readmeio/api/commit/bca6c23)), closes [#176](https://github.com/readmeio/api/issues/176)
* ci: adjusting the codeql workflow ([0bbf4d8](https://github.com/readmeio/api/commit/0bbf4d8))



## 3.1.0 (2021-05-13)

* v3.1.0 ([954f82b](https://github.com/readmeio/api/commit/954f82b))
* chore(deps-dev): bump @commitlint/cli from 12.1.1 to 12.1.3 (#288) ([23cdaf5](https://github.com/readmeio/api/commit/23cdaf5)), closes [#288](https://github.com/readmeio/api/issues/288)
* chore(deps-dev): bump @commitlint/config-conventional (#290) ([5d325b0](https://github.com/readmeio/api/commit/5d325b0)), closes [#290](https://github.com/readmeio/api/issues/290)
* chore(deps-dev): bump eslint from 7.25.0 to 7.26.0 (#291) ([f519b33](https://github.com/readmeio/api/commit/f519b33)), closes [#291](https://github.com/readmeio/api/issues/291)
* chore(deps-dev): bump prettier from 2.2.1 to 2.3.0 (#289) ([b423897](https://github.com/readmeio/api/commit/b423897)), closes [#289](https://github.com/readmeio/api/issues/289)
* chore(deps-dev): upgrading husky (#286) ([a6c12a8](https://github.com/readmeio/api/commit/a6c12a8)), closes [#286](https://github.com/readmeio/api/issues/286)
* chore(deps): bump fetch-har from 4.0.2 to 4.0.3 (#292) ([a8660df](https://github.com/readmeio/api/commit/a8660df)), closes [#292](https://github.com/readmeio/api/issues/292)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#294) ([47ecf81](https://github.com/readmeio/api/commit/47ecf81)), closes [#294](https://github.com/readmeio/api/issues/294)
* chore(deps): bump get-stream from 4.1.0 to 6.0.1 (#293) ([344c209](https://github.com/readmeio/api/commit/344c209)), closes [#293](https://github.com/readmeio/api/issues/293)
* chore(deps): bump js-yaml from 3.14.0 to 4.1.0 (#274) ([b8b4216](https://github.com/readmeio/api/commit/b8b4216)), closes [#274](https://github.com/readmeio/api/issues/274)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#287) ([347354d](https://github.com/readmeio/api/commit/347354d)), closes [#287](https://github.com/readmeio/api/issues/287)
* chore(deps): upgrading oas to 11.0.0 (#285) ([00c0288](https://github.com/readmeio/api/commit/00c0288)), closes [#285](https://github.com/readmeio/api/issues/285)
* feat: add a config() function that allows disabling of response parsing (#264) ([570049a](https://github.com/readmeio/api/commit/570049a)), closes [#264](https://github.com/readmeio/api/issues/264)
* feat: adding support for server variables (#284) ([1dd8a2e](https://github.com/readmeio/api/commit/1dd8a2e)), closes [#284](https://github.com/readmeio/api/issues/284)



## <small>3.0.3 (2021-05-07)</small>

* v3.0.3 ([343d9e9](https://github.com/readmeio/api/commit/343d9e9))
* chore(deps-dev): bump @commitlint/cli from 12.0.1 to 12.1.1 (#276) ([d675432](https://github.com/readmeio/api/commit/d675432)), closes [#276](https://github.com/readmeio/api/issues/276)
* chore(deps-dev): bump @commitlint/config-conventional (#275) ([42a507b](https://github.com/readmeio/api/commit/42a507b)), closes [#275](https://github.com/readmeio/api/issues/275)
* chore(deps-dev): bump @readme/eslint-config from 5.0.3 to 5.0.5 (#282) ([b2d159c](https://github.com/readmeio/api/commit/b2d159c)), closes [#282](https://github.com/readmeio/api/issues/282)
* chore(deps-dev): bump eslint from 7.23.0 to 7.25.0 (#280) ([94ca270](https://github.com/readmeio/api/commit/94ca270)), closes [#280](https://github.com/readmeio/api/issues/280)
* chore(deps-dev): bump memfs from 3.2.1 to 3.2.2 (#273) ([8d50610](https://github.com/readmeio/api/commit/8d50610)), closes [#273](https://github.com/readmeio/api/issues/273)
* chore(deps): bump @readme/oas-to-har from 13.2.0 to 13.2.4 (#278) ([cc097e0](https://github.com/readmeio/api/commit/cc097e0)), closes [#278](https://github.com/readmeio/api/issues/278)
* chore(deps): bump get-stream from 6.0.0 to 6.0.1 (#279) ([1dea6cc](https://github.com/readmeio/api/commit/1dea6cc)), closes [#279](https://github.com/readmeio/api/issues/279)
* chore(deps): upgrading oas ([f6369c6](https://github.com/readmeio/api/commit/f6369c6))



## <small>3.0.2 (2021-05-04)</small>

* v3.0.2 ([b52845c](https://github.com/readmeio/api/commit/b52845c))
* chore(deps): upgrading oas (#283) ([34655cb](https://github.com/readmeio/api/commit/34655cb)), closes [#283](https://github.com/readmeio/api/issues/283)
* fix: cleaning up a typo in an error message in httpsnippet-client-api ([341494f](https://github.com/readmeio/api/commit/341494f))



## <small>3.0.1 (2021-04-20)</small>

* v3.0.1 ([4728737](https://github.com/readmeio/api/commit/4728737))
* ci: allowing node 16 installs and builds (#271) ([e36fab1](https://github.com/readmeio/api/commit/e36fab1)), closes [#271](https://github.com/readmeio/api/issues/271)
* chore(deps-dev): bump eslint from 7.22.0 to 7.23.0 (#266) ([54c2fc2](https://github.com/readmeio/api/commit/54c2fc2)), closes [#266](https://github.com/readmeio/api/issues/266)
* chore(deps-dev): bump memfs from 3.2.0 to 3.2.1 (#268) ([d6905cd](https://github.com/readmeio/api/commit/d6905cd)), closes [#268](https://github.com/readmeio/api/issues/268)
* chore(deps): bump @readme/oas-to-har from 13.0.0 to 13.2.0 (#265) ([21bc2f7](https://github.com/readmeio/api/commit/21bc2f7)), closes [#265](https://github.com/readmeio/api/issues/265)
* chore(deps): bump oas from 10.4.0 to 10.4.1 (#267) ([855d931](https://github.com/readmeio/api/commit/855d931)), closes [#267](https://github.com/readmeio/api/issues/267)
* feat: cleaner snippets when body and metadata are present (#269) ([4869caf](https://github.com/readmeio/api/commit/4869caf)), closes [#269](https://github.com/readmeio/api/issues/269)



## 3.0.0 (2021-03-24)

* v3.0.0 ([260be3a](https://github.com/readmeio/api/commit/260be3a))
* chore: update deps and require npm@7 (#253) ([efa2705](https://github.com/readmeio/api/commit/efa2705)), closes [#253](https://github.com/readmeio/api/issues/253)
* chore(deps-dev): bump @commitlint/cli from 11.0.0 to 12.0.1 (#250) ([8b9b6a4](https://github.com/readmeio/api/commit/8b9b6a4)), closes [#250](https://github.com/readmeio/api/issues/250)
* chore(deps-dev): bump @commitlint/config-conventional (#248) ([12d734e](https://github.com/readmeio/api/commit/12d734e)), closes [#248](https://github.com/readmeio/api/issues/248)
* chore(deps-dev): bump @readme/eslint-config from 4.1.0 to 5.0.0 (#247) ([ef2023f](https://github.com/readmeio/api/commit/ef2023f)), closes [#247](https://github.com/readmeio/api/issues/247)
* chore(deps-dev): bump @readme/eslint-config from 5.0.0 to 5.0.3 (#258) ([440801e](https://github.com/readmeio/api/commit/440801e)), closes [#258](https://github.com/readmeio/api/issues/258)
* chore(deps-dev): bump eslint from 7.19.0 to 7.21.0 (#242) ([6875828](https://github.com/readmeio/api/commit/6875828)), closes [#242](https://github.com/readmeio/api/issues/242)
* chore(deps-dev): bump eslint from 7.21.0 to 7.22.0 (#255) ([1e48edc](https://github.com/readmeio/api/commit/1e48edc)), closes [#255](https://github.com/readmeio/api/issues/255)
* chore(deps-dev): bump nock from 13.0.7 to 13.0.9 (#251) ([f0bbc06](https://github.com/readmeio/api/commit/f0bbc06)), closes [#251](https://github.com/readmeio/api/issues/251)
* chore(deps-dev): bump nock from 13.0.9 to 13.0.11 (#260) ([fc8427f](https://github.com/readmeio/api/commit/fc8427f)), closes [#260](https://github.com/readmeio/api/issues/260)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.1 to 10.0.2 (#245) ([84b95a2](https://github.com/readmeio/api/commit/84b95a2)), closes [#245](https://github.com/readmeio/api/issues/245)
* chore(deps): bump @readme/httpsnippet from 2.4.1 to 2.4.3 (#249) ([494bbcd](https://github.com/readmeio/api/commit/494bbcd)), closes [#249](https://github.com/readmeio/api/issues/249)
* chore(deps): bump @readme/oas-to-har from 11.1.2 to 12.2.1 (#246) ([57625d0](https://github.com/readmeio/api/commit/57625d0)), closes [#246](https://github.com/readmeio/api/issues/246)
* chore(deps): bump actions/setup-node from v2.1.4 to v2.1.5 (#241) ([0498476](https://github.com/readmeio/api/commit/0498476)), closes [#241](https://github.com/readmeio/api/issues/241)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#259) ([f9910da](https://github.com/readmeio/api/commit/f9910da)), closes [#259](https://github.com/readmeio/api/issues/259)
* chore(deps): bump form-data from 3.0.0 to 4.0.0 (#244) ([47792bc](https://github.com/readmeio/api/commit/47792bc)), closes [#244](https://github.com/readmeio/api/issues/244)
* chore(deps): bump get-stream from 4.1.0 to 6.0.0 (#261) ([588fff7](https://github.com/readmeio/api/commit/588fff7)), closes [#261](https://github.com/readmeio/api/issues/261)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#256) ([ceec5c1](https://github.com/readmeio/api/commit/ceec5c1)), closes [#256](https://github.com/readmeio/api/issues/256)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#254) ([aed83e4](https://github.com/readmeio/api/commit/aed83e4)), closes [#254](https://github.com/readmeio/api/issues/254)
* chore(deps): bump oas from 10.0.1 to 10.2.0 (#243) ([e5934cc](https://github.com/readmeio/api/commit/e5934cc)), closes [#243](https://github.com/readmeio/api/issues/243)
* chore(deps): bump oas from 10.3.0 to 10.4.0 (#262) ([c7280d3](https://github.com/readmeio/api/commit/c7280d3)), closes [#262](https://github.com/readmeio/api/issues/262)
* ci: trying to fix codeql failures (#263) ([e3dd56b](https://github.com/readmeio/api/commit/e3dd56b)), closes [#263](https://github.com/readmeio/api/issues/263)
* feat: automatically parse the api response based on content-type  (#240) ([ae50813](https://github.com/readmeio/api/commit/ae50813)), closes [#240](https://github.com/readmeio/api/issues/240) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125) [/github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30](https://github.com//github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js/issues/L13-L30) [/github.com/readmeio/api/pull/240#discussion_r569829932](https://github.com//github.com/readmeio/api/pull/240/issues/discussion_r569829932)
* refactor: switch to using memfs instead of mock-fs (#239) ([6cb517f](https://github.com/readmeio/api/commit/6cb517f)), closes [#239](https://github.com/readmeio/api/issues/239) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125)


### BREAKING CHANGE

* this is a breaking change.

* chore: relax commitlint rules on body and footer length

Taken from main codebase

* feat: remove res.json() line from the httpsnippet client

* fix: always output `.then(res => console.log(res))` in code sample

Since we dont know if the response is json or not, we can't make
assumptions. In an ideal world we'd conditionally do this based
on the accept header in the response, but Operation.getHeaders() only
returns with an array of headers and not their actual values. I think
this is good enough for now!


## <small>2.7.1 (2021-02-02)</small>

* v2.7.1 ([1bb8664](https://github.com/readmeio/api/commit/1bb8664))
* chore(deps): upgrading `@readme/httpsnippet` to the latest release ([9164024](https://github.com/readmeio/api/commit/9164024))



## 2.7.0 (2021-02-02)

* v2.7.0 ([64bb202](https://github.com/readmeio/api/commit/64bb202))
* chore(deps): upgrading `@readme/httpsnippet` ([d184a14](https://github.com/readmeio/api/commit/d184a14))



## 2.6.0 (2021-02-02)

* v2.6.0 ([4cd3ed5](https://github.com/readmeio/api/commit/4cd3ed5))
* chore: rebuilding the root package-lock ([d0f8091](https://github.com/readmeio/api/commit/d0f8091))
* chore(deps-dev): bump @readme/eslint-config from 3.6.5 to 3.7.1 (#210) ([ddae88a](https://github.com/readmeio/api/commit/ddae88a)), closes [#210](https://github.com/readmeio/api/issues/210)
* chore(deps-dev): bump @readme/eslint-config from 3.7.1 to 3.8.0 (#214) ([1346192](https://github.com/readmeio/api/commit/1346192)), closes [#214](https://github.com/readmeio/api/issues/214)
* chore(deps-dev): bump @readme/eslint-config from 3.8.0 to 4.0.0 (#219) ([0741212](https://github.com/readmeio/api/commit/0741212)), closes [#219](https://github.com/readmeio/api/issues/219)
* chore(deps-dev): bump @readme/eslint-config from 4.0.0 to 4.1.0 (#229) ([608e855](https://github.com/readmeio/api/commit/608e855)), closes [#229](https://github.com/readmeio/api/issues/229)
* chore(deps-dev): bump eslint from 7.14.0 to 7.15.0 (#212) ([b340515](https://github.com/readmeio/api/commit/b340515)), closes [#212](https://github.com/readmeio/api/issues/212)
* chore(deps-dev): bump eslint from 7.15.0 to 7.16.0 (#220) ([69a0e0a](https://github.com/readmeio/api/commit/69a0e0a)), closes [#220](https://github.com/readmeio/api/issues/220)
* chore(deps-dev): bump eslint from 7.16.0 to 7.17.0 (#226) ([0bbdc05](https://github.com/readmeio/api/commit/0bbdc05)), closes [#226](https://github.com/readmeio/api/issues/226)
* chore(deps-dev): bump eslint from 7.17.0 to 7.19.0 (#234) ([0acb815](https://github.com/readmeio/api/commit/0acb815)), closes [#234](https://github.com/readmeio/api/issues/234)
* chore(deps-dev): bump husky from 4.3.0 to 4.3.6 (#217) ([571fa3f](https://github.com/readmeio/api/commit/571fa3f)), closes [#217](https://github.com/readmeio/api/issues/217)
* chore(deps-dev): bump husky from 4.3.6 to 4.3.7 (#228) ([6988708](https://github.com/readmeio/api/commit/6988708)), closes [#228](https://github.com/readmeio/api/issues/228)
* chore(deps-dev): bump husky from 4.3.7 to 4.3.8 (#238) ([82efe01](https://github.com/readmeio/api/commit/82efe01)), closes [#238](https://github.com/readmeio/api/issues/238)
* chore(deps-dev): bump nock from 13.0.5 to 13.0.7 (#235) ([9beb2ae](https://github.com/readmeio/api/commit/9beb2ae)), closes [#235](https://github.com/readmeio/api/issues/235)
* chore(deps-dev): bump prettier from 2.2.0 to 2.2.1 (#209) ([38fe2ff](https://github.com/readmeio/api/commit/38fe2ff)), closes [#209](https://github.com/readmeio/api/issues/209)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#237) ([db65c3b](https://github.com/readmeio/api/commit/db65c3b)), closes [#237](https://github.com/readmeio/api/issues/237)
* chore(deps): bump @readme/oas-to-har from 10.0.0 to 10.0.5 (#215) ([0462373](https://github.com/readmeio/api/commit/0462373)), closes [#215](https://github.com/readmeio/api/issues/215)
* chore(deps): bump @readme/oas-to-har from 11.1.0 to 11.1.2 (#236) ([611148f](https://github.com/readmeio/api/commit/611148f)), closes [#236](https://github.com/readmeio/api/issues/236)
* chore(deps): bump actions/checkout from v2.3.3 to v2.3.4 (#211) ([a88ec6c](https://github.com/readmeio/api/commit/a88ec6c)), closes [#211](https://github.com/readmeio/api/issues/211)
* chore(deps): bump actions/setup-node from v2.1.2 to v2.1.4 (#225) ([6697623](https://github.com/readmeio/api/commit/6697623)), closes [#225](https://github.com/readmeio/api/issues/225)
* chore(deps): bump ini from 1.3.5 to 1.3.8 (#232) ([17f4246](https://github.com/readmeio/api/commit/17f4246)), closes [#232](https://github.com/readmeio/api/issues/232)
* chore(deps): bump js-yaml from 3.14.0 to 3.14.1 (#218) ([a4cb9e7](https://github.com/readmeio/api/commit/a4cb9e7)), closes [#218](https://github.com/readmeio/api/issues/218)
* chore(deps): bump node-notifier from 8.0.0 to 8.0.1 in /packages/api (#224) ([c846af0](https://github.com/readmeio/api/commit/c846af0)), closes [#224](https://github.com/readmeio/api/issues/224)
* chore(deps): bump node-notifier in /packages/httpsnippet-client-api (#223) ([63fa1f9](https://github.com/readmeio/api/commit/63fa1f9)), closes [#223](https://github.com/readmeio/api/issues/223)
* chore(deps): bump oas from 10.0.0 to 10.0.1 (#233) ([af2d9fb](https://github.com/readmeio/api/commit/af2d9fb)), closes [#233](https://github.com/readmeio/api/issues/233)
* chore(deps): bump oas from 6.1.0 to 10.0.0 (#231) ([166000a](https://github.com/readmeio/api/commit/166000a)), closes [#231](https://github.com/readmeio/api/issues/231)
* ci: updating dependabot to run on a monthly schedule ([a081851](https://github.com/readmeio/api/commit/a081851))



## 2.5.0 (2020-11-27)

* v2.5.0 ([7f6622c](https://github.com/readmeio/api/commit/7f6622c))
* chore(deps-dev): bump @readme/eslint-config from 3.6.2 to 3.6.3 (#194) ([c53f2a0](https://github.com/readmeio/api/commit/c53f2a0)), closes [#194](https://github.com/readmeio/api/issues/194)
* chore(deps-dev): bump @readme/eslint-config from 3.6.3 to 3.6.5 (#204) ([accc1b3](https://github.com/readmeio/api/commit/accc1b3)), closes [#204](https://github.com/readmeio/api/issues/204)
* chore(deps-dev): bump conventional-changelog-cli from 2.1.0 to 2.1.1 (#195) ([82ec912](https://github.com/readmeio/api/commit/82ec912)), closes [#195](https://github.com/readmeio/api/issues/195)
* chore(deps-dev): bump eslint from 7.12.1 to 7.13.0 (#197) ([e4cae18](https://github.com/readmeio/api/commit/e4cae18)), closes [#197](https://github.com/readmeio/api/issues/197)
* chore(deps-dev): bump eslint from 7.13.0 to 7.14.0 (#206) ([a963391](https://github.com/readmeio/api/commit/a963391)), closes [#206](https://github.com/readmeio/api/issues/206)
* chore(deps-dev): bump jest from 26.6.1 to 26.6.3 (#199) ([64ca33f](https://github.com/readmeio/api/commit/64ca33f)), closes [#199](https://github.com/readmeio/api/issues/199)
* chore(deps-dev): bump nock from 13.0.4 to 13.0.5 (#201) ([b3d5198](https://github.com/readmeio/api/commit/b3d5198)), closes [#201](https://github.com/readmeio/api/issues/201)
* chore(deps-dev): bump prettier from 2.1.2 to 2.2.0 (#205) ([f26cf5f](https://github.com/readmeio/api/commit/f26cf5f)), closes [#205](https://github.com/readmeio/api/issues/205)
* chore(deps): bump @readme/httpsnippet from 2.2.3 to 2.3.1 (#207) ([ca2eeb0](https://github.com/readmeio/api/commit/ca2eeb0)), closes [#207](https://github.com/readmeio/api/issues/207)
* chore(deps): bump @readme/oas-to-har from 9.0.0 to 9.2.0 (#196) ([0b0f5ac](https://github.com/readmeio/api/commit/0b0f5ac)), closes [#196](https://github.com/readmeio/api/issues/196)
* chore(deps): bump @readme/oas-to-har from 9.2.0 to 9.2.2 (#202) ([a492210](https://github.com/readmeio/api/commit/a492210)), closes [#202](https://github.com/readmeio/api/issues/202)
* chore(deps): bump oas from 5.0.0 to 5.2.0 (#198) ([cb0b851](https://github.com/readmeio/api/commit/cb0b851)), closes [#198](https://github.com/readmeio/api/issues/198)
* chore(deps): upgrade oas and oas-to-har (#208) ([3daec70](https://github.com/readmeio/api/commit/3daec70)), closes [#208](https://github.com/readmeio/api/issues/208)



## <small>2.4.4 (2020-11-02)</small>

* v2.4.4 ([f040910](https://github.com/readmeio/api/commit/f040910))
* fix: adding better messaging when operations can't be found (#193) ([22b6dfd](https://github.com/readmeio/api/commit/22b6dfd)), closes [#193](https://github.com/readmeio/api/issues/193)
* chore(deps-dev): bump @readme/eslint-config from 3.6.1 to 3.6.2 (#189) ([eae818f](https://github.com/readmeio/api/commit/eae818f)), closes [#189](https://github.com/readmeio/api/issues/189)
* chore(deps-dev): bump eslint from 7.11.0 to 7.12.0 (#186) ([1661310](https://github.com/readmeio/api/commit/1661310)), closes [#186](https://github.com/readmeio/api/issues/186)
* chore(deps-dev): bump eslint from 7.12.0 to 7.12.1 (#192) ([d0d838d](https://github.com/readmeio/api/commit/d0d838d)), closes [#192](https://github.com/readmeio/api/issues/192)
* chore(deps-dev): bump jest from 26.5.3 to 26.6.1 (#188) ([e25388e](https://github.com/readmeio/api/commit/e25388e)), closes [#188](https://github.com/readmeio/api/issues/188)
* chore(deps): bump @readme/httpsnippet from 2.2.2 to 2.2.3 (#187) ([530fa45](https://github.com/readmeio/api/commit/530fa45)), closes [#187](https://github.com/readmeio/api/issues/187)
* chore(deps): bump @readme/oas-to-har from 8.1.0 to 9.0.0 (#191) ([f50bbb0](https://github.com/readmeio/api/commit/f50bbb0)), closes [#191](https://github.com/readmeio/api/issues/191)
* chore(deps): bump actions/setup-node from v2.1.1 to v2.1.2 (#190) ([f4745f9](https://github.com/readmeio/api/commit/f4745f9)), closes [#190](https://github.com/readmeio/api/issues/190)



## <small>2.4.3 (2020-10-21)</small>

* v2.4.3 ([621ed10](https://github.com/readmeio/api/commit/621ed10))
* chore(deps): upgrading @readme/oas-to-har to 8.1.0 ([f2d3af7](https://github.com/readmeio/api/commit/f2d3af7))
* chore(deps): upgrading oas to 5.0 ([0351595](https://github.com/readmeio/api/commit/0351595))



## <small>2.4.2 (2020-10-21)</small>

* v2.4.2 ([d707575](https://github.com/readmeio/api/commit/d707575))
* fix: pinning httpsnippet-client-api to oas@4.0.0 ([29af3be](https://github.com/readmeio/api/commit/29af3be))



## <small>2.4.1 (2020-10-20)</small>

* v2.4.1 ([3a49483](https://github.com/readmeio/api/commit/3a49483))
* chore(deps-dev): bump @readme/eslint-config from 3.6.0 to 3.6.1 (#183) ([33996b0](https://github.com/readmeio/api/commit/33996b0)), closes [#183](https://github.com/readmeio/api/issues/183)
* chore(deps): bump @readme/oas-to-har from 7.5.0 to 8.0.1 (#182) ([a2052bb](https://github.com/readmeio/api/commit/a2052bb)), closes [#182](https://github.com/readmeio/api/issues/182)
* chore(deps): bump @readme/oas-tooling from 3.6.0 to 3.6.1 (#184) ([3d86be9](https://github.com/readmeio/api/commit/3d86be9)), closes [#184](https://github.com/readmeio/api/issues/184)
* chore(deps): swapping `@readme/oas-tooling` for `oas` (#185) ([d9ced1c](https://github.com/readmeio/api/commit/d9ced1c)), closes [#185](https://github.com/readmeio/api/issues/185)



## 2.4.0 (2020-10-16)

* v2.4.0 ([2d65241](https://github.com/readmeio/api/commit/2d65241))
* chore: test cleanup (#181) ([1fe0e95](https://github.com/readmeio/api/commit/1fe0e95)), closes [#181](https://github.com/readmeio/api/issues/181)
* fix: adding support for non-alphanumerical operation ids (#180) ([fd075a0](https://github.com/readmeio/api/commit/fd075a0)), closes [#180](https://github.com/readmeio/api/issues/180)
* fix: basic auth headers now decoded and exploded into `.auth()` calls (#179) ([2351b95](https://github.com/readmeio/api/commit/2351b95)), closes [#179](https://github.com/readmeio/api/issues/179)



## <small>2.3.3 (2020-10-15)</small>

* v2.3.3 ([17b475b](https://github.com/readmeio/api/commit/17b475b))
* fix: adding a `.catch()` statement to code snippets (#177) ([d7c8613](https://github.com/readmeio/api/commit/d7c8613)), closes [#177](https://github.com/readmeio/api/issues/177)
* chore(deps-dev): bump @readme/eslint-config from 3.5.0 to 3.6.0 (#173) ([9f8d0f2](https://github.com/readmeio/api/commit/9f8d0f2)), closes [#173](https://github.com/readmeio/api/issues/173)
* chore(deps-dev): bump @readme/oas-examples from 3.5.13 to 3.6.0 (#174) ([9c4b118](https://github.com/readmeio/api/commit/9c4b118)), closes [#174](https://github.com/readmeio/api/issues/174)
* chore(deps-dev): bump eslint from 7.10.0 to 7.11.0 (#175) ([be9393f](https://github.com/readmeio/api/commit/be9393f)), closes [#175](https://github.com/readmeio/api/issues/175)
* chore(deps-dev): bump jest from 26.4.2 to 26.5.3 (#171) ([b4cbc9f](https://github.com/readmeio/api/commit/b4cbc9f)), closes [#171](https://github.com/readmeio/api/issues/171)
* chore(deps): bump @readme/oas-to-har from 7.3.0 to 7.5.0 (#170) ([f26bb01](https://github.com/readmeio/api/commit/f26bb01)), closes [#170](https://github.com/readmeio/api/issues/170)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.14 (#169) ([524915a](https://github.com/readmeio/api/commit/524915a)), closes [#169](https://github.com/readmeio/api/issues/169)
* chore(deps): bump @readme/oas-tooling from 3.5.14 to 3.6.0 (#172) ([6bd2fb3](https://github.com/readmeio/api/commit/6bd2fb3)), closes [#172](https://github.com/readmeio/api/issues/172)



## <small>2.3.2 (2020-10-05)</small>

* v2.3.2 ([627cb28](https://github.com/readmeio/api/commit/627cb28))
* chore(deps-dev): bump @commitlint/cli from 9.1.2 to 11.0.0 (#158) ([a068e8f](https://github.com/readmeio/api/commit/a068e8f)), closes [#158](https://github.com/readmeio/api/issues/158)
* chore(deps-dev): bump @commitlint/config-conventional (#159) ([c084c27](https://github.com/readmeio/api/commit/c084c27)), closes [#159](https://github.com/readmeio/api/issues/159)
* chore(deps-dev): bump @readme/eslint-config from 3.4.2 to 3.4.3 (#155) ([efb446e](https://github.com/readmeio/api/commit/efb446e)), closes [#155](https://github.com/readmeio/api/issues/155)
* chore(deps-dev): bump @readme/eslint-config from 3.4.3 to 3.5.0 (#161) ([68d69ee](https://github.com/readmeio/api/commit/68d69ee)), closes [#161](https://github.com/readmeio/api/issues/161)
* chore(deps-dev): bump @readme/oas-examples from 3.5.5 to 3.5.13 (#164) ([1f5d2f1](https://github.com/readmeio/api/commit/1f5d2f1)), closes [#164](https://github.com/readmeio/api/issues/164)
* chore(deps-dev): bump eslint from 7.8.1 to 7.9.0 (#157) ([3f04da5](https://github.com/readmeio/api/commit/3f04da5)), closes [#157](https://github.com/readmeio/api/issues/157)
* chore(deps-dev): bump eslint from 7.9.0 to 7.10.0 (#166) ([d021965](https://github.com/readmeio/api/commit/d021965)), closes [#166](https://github.com/readmeio/api/issues/166)
* chore(deps-dev): bump husky from 4.2.5 to 4.3.0 (#160) ([54c9c0c](https://github.com/readmeio/api/commit/54c9c0c)), closes [#160](https://github.com/readmeio/api/issues/160)
* chore(deps-dev): bump prettier from 2.1.1 to 2.1.2 (#162) ([6d31ded](https://github.com/readmeio/api/commit/6d31ded)), closes [#162](https://github.com/readmeio/api/issues/162)
* chore(deps): bump @readme/oas-to-har from 7.2.1 to 7.3.0 (#163) ([5a915ca](https://github.com/readmeio/api/commit/5a915ca)), closes [#163](https://github.com/readmeio/api/issues/163)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.13 (#165) ([5b8cd08](https://github.com/readmeio/api/commit/5b8cd08)), closes [#165](https://github.com/readmeio/api/issues/165)
* chore(deps): bump actions/checkout from v2.3.2 to v2.3.3 (#167) ([3f12362](https://github.com/readmeio/api/commit/3f12362)), closes [#167](https://github.com/readmeio/api/issues/167)
* chore(deps): bump fetch-har from 4.0.1 to 4.0.2 (#156) ([2c3314e](https://github.com/readmeio/api/commit/2c3314e)), closes [#156](https://github.com/readmeio/api/issues/156)
* chore(deps): bump path-to-regexp from 6.1.0 to 6.2.0 (#168) ([7ccf66c](https://github.com/readmeio/api/commit/7ccf66c)), closes [#168](https://github.com/readmeio/api/issues/168)



## <small>2.3.1 (2020-09-08)</small>

* v2.3.1 ([be10f84](https://github.com/readmeio/api/commit/be10f84))
* fix: if no cache dir is determined, fallback to the os temp dir (#154) ([e0525f0](https://github.com/readmeio/api/commit/e0525f0)), closes [#154](https://github.com/readmeio/api/issues/154) [#107](https://github.com/readmeio/api/issues/107)
* chore(deps-dev): bump @readme/eslint-config from 3.4.1 to 3.4.2 (#144) ([5e7bc96](https://github.com/readmeio/api/commit/5e7bc96)), closes [#144](https://github.com/readmeio/api/issues/144)
* chore(deps-dev): bump eslint from 7.7.0 to 7.8.1 (#152) ([be44467](https://github.com/readmeio/api/commit/be44467)), closes [#152](https://github.com/readmeio/api/issues/152)
* chore(deps-dev): bump jest from 26.4.0 to 26.4.2 (#143) ([831d12c](https://github.com/readmeio/api/commit/831d12c)), closes [#143](https://github.com/readmeio/api/issues/143)
* chore(deps-dev): bump mock-fs from 4.12.0 to 4.13.0 (#145) ([69a87fa](https://github.com/readmeio/api/commit/69a87fa)), closes [#145](https://github.com/readmeio/api/issues/145)
* chore(deps-dev): bump prettier from 2.0.5 to 2.1.1 (#147) ([565939e](https://github.com/readmeio/api/commit/565939e)), closes [#147](https://github.com/readmeio/api/issues/147)
* chore(deps): bump @readme/httpsnippet from 2.0.1 to 2.1.1 (#148) ([4046808](https://github.com/readmeio/api/commit/4046808)), closes [#148](https://github.com/readmeio/api/issues/148)
* chore(deps): bump @readme/oas-to-har from 7.0.0 to 7.2.0 (#146) ([53a08a5](https://github.com/readmeio/api/commit/53a08a5)), closes [#146](https://github.com/readmeio/api/issues/146)
* chore(deps): bump @readme/oas-to-har from 7.2.0 to 7.2.1 (#153) ([7368d93](https://github.com/readmeio/api/commit/7368d93)), closes [#153](https://github.com/readmeio/api/issues/153)
* chore(deps): bump @readme/oas-tooling from 3.5.8 to 3.5.11 (#149) ([845e147](https://github.com/readmeio/api/commit/845e147)), closes [#149](https://github.com/readmeio/api/issues/149)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#151) ([d740da5](https://github.com/readmeio/api/commit/d740da5)), closes [#151](https://github.com/readmeio/api/issues/151)
* chore(deps): update actions/checkout requirement to v2.3.2 (#150) ([aacc532](https://github.com/readmeio/api/commit/aacc532)), closes [#150](https://github.com/readmeio/api/issues/150)



## 2.3.0 (2020-08-17)

* v2.3.0 ([bb65e11](https://github.com/readmeio/api/commit/bb65e11))
* feat: support multipart/form-data (#132) ([8f28341](https://github.com/readmeio/api/commit/8f28341)), closes [#132](https://github.com/readmeio/api/issues/132)
* chore(deps-dev): bump @commitlint/cli from 9.1.1 to 9.1.2 (#142) ([a4f70bf](https://github.com/readmeio/api/commit/a4f70bf)), closes [#142](https://github.com/readmeio/api/issues/142)
* chore(deps-dev): bump @commitlint/config-conventional (#138) ([125a08a](https://github.com/readmeio/api/commit/125a08a)), closes [#138](https://github.com/readmeio/api/issues/138)
* chore(deps-dev): bump @readme/eslint-config from 3.4.0 to 3.4.1 (#133) ([d65621b](https://github.com/readmeio/api/commit/d65621b)), closes [#133](https://github.com/readmeio/api/issues/133)
* chore(deps-dev): bump conventional-changelog-cli from 2.0.34 to 2.1.0 (#134) ([432dba7](https://github.com/readmeio/api/commit/432dba7)), closes [#134](https://github.com/readmeio/api/issues/134)
* chore(deps-dev): bump eslint from 7.6.0 to 7.7.0 (#137) ([baf6fe0](https://github.com/readmeio/api/commit/baf6fe0)), closes [#137](https://github.com/readmeio/api/issues/137)
* chore(deps-dev): bump jest from 26.2.2 to 26.4.0 (#141) ([16bc760](https://github.com/readmeio/api/commit/16bc760)), closes [#141](https://github.com/readmeio/api/issues/141)
* chore(deps-dev): bump nock from 13.0.3 to 13.0.4 (#135) ([34f7cf7](https://github.com/readmeio/api/commit/34f7cf7)), closes [#135](https://github.com/readmeio/api/issues/135)
* chore(deps-dev): upgrading @readme/eslint-config and eslint ([992651c](https://github.com/readmeio/api/commit/992651c))
* chore(deps): bump @readme/oas-to-har from 6.15.2 to 6.16.1 (#139) ([47db45a](https://github.com/readmeio/api/commit/47db45a)), closes [#139](https://github.com/readmeio/api/issues/139)
* chore(deps): bump @readme/oas-tooling from 3.5.6 to 3.5.8 (#136) ([4416c87](https://github.com/readmeio/api/commit/4416c87)), closes [#136](https://github.com/readmeio/api/issues/136)



## <small>2.2.3 (2020-08-03)</small>

* v2.2.3 ([3b20492](https://github.com/readmeio/api/commit/3b20492))
* fix: auth keys not being properly escaped (#129) ([b0923eb](https://github.com/readmeio/api/commit/b0923eb)), closes [#129](https://github.com/readmeio/api/issues/129)



## <small>2.2.2 (2020-08-03)</small>

* v2.2.2 ([6efa4e0](https://github.com/readmeio/api/commit/6efa4e0))
* ci: setting up codeql workflows (#127) ([62707be](https://github.com/readmeio/api/commit/62707be)), closes [#127](https://github.com/readmeio/api/issues/127)
* chore(deps-dev): bump @readme/eslint-config from 3.3.3 to 3.4.0 (#121) ([f393edc](https://github.com/readmeio/api/commit/f393edc)), closes [#121](https://github.com/readmeio/api/issues/121)
* chore(deps-dev): bump eslint from 7.5.0 to 7.6.0 (#122) ([0eb173b](https://github.com/readmeio/api/commit/0eb173b)), closes [#122](https://github.com/readmeio/api/issues/122)
* chore(deps-dev): bump jest from 26.1.0 to 26.2.2 (#126) ([4229c34](https://github.com/readmeio/api/commit/4229c34)), closes [#126](https://github.com/readmeio/api/issues/126)
* chore(deps-dev): bump nock from 13.0.2 to 13.0.3 (#125) ([fcc2d45](https://github.com/readmeio/api/commit/fcc2d45)), closes [#125](https://github.com/readmeio/api/issues/125)
* chore(deps): bump @readme/oas-to-har from 6.14.0 to 6.15.2 (#123) ([c6203a6](https://github.com/readmeio/api/commit/c6203a6)), closes [#123](https://github.com/readmeio/api/issues/123)
* chore(deps): bump @readme/oas-tooling from 3.5.5 to 3.5.6 (#124) ([1c179d8](https://github.com/readmeio/api/commit/1c179d8)), closes [#124](https://github.com/readmeio/api/issues/124)
* chore(deps): bump actions/setup-node from v2.1.0 to v2.1.1 (#120) ([6b915cf](https://github.com/readmeio/api/commit/6b915cf)), closes [#120](https://github.com/readmeio/api/issues/120)



## <small>2.2.1 (2020-07-27)</small>

* v2.2.1 ([09667db](https://github.com/readmeio/api/commit/09667db))
* chore: cleaning up the package-lock ([7d4ec59](https://github.com/readmeio/api/commit/7d4ec59))
* chore(deps-dev): bump @commitlint/cli from 9.0.1 to 9.1.1 (#109) ([7f0eaec](https://github.com/readmeio/api/commit/7f0eaec)), closes [#109](https://github.com/readmeio/api/issues/109)
* chore(deps-dev): bump @commitlint/config-conventional (#116) ([ee0f79c](https://github.com/readmeio/api/commit/ee0f79c)), closes [#116](https://github.com/readmeio/api/issues/116)
* chore(deps-dev): bump @readme/eslint-config from 3.3.2 to 3.3.3 (#118) ([963a235](https://github.com/readmeio/api/commit/963a235)), closes [#118](https://github.com/readmeio/api/issues/118)
* chore(deps-dev): bump @readme/oas-examples from 3.4.0 to 3.5.5 (#113) ([a7b4561](https://github.com/readmeio/api/commit/a7b4561)), closes [#113](https://github.com/readmeio/api/issues/113)
* chore(deps-dev): bump eslint from 7.4.0 to 7.5.0 (#110) ([cd29a03](https://github.com/readmeio/api/commit/cd29a03)), closes [#110](https://github.com/readmeio/api/issues/110)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#115) ([a129798](https://github.com/readmeio/api/commit/a129798)), closes [#115](https://github.com/readmeio/api/issues/115)
* chore(deps): bump @apidevtools/swagger-parser from 9.0.1 to 10.0.1 (#112) ([a3aed98](https://github.com/readmeio/api/commit/a3aed98)), closes [#112](https://github.com/readmeio/api/issues/112)
* chore(deps): bump @readme/oas-tooling from 3.5.0 to 3.5.5 (#111) ([5621fad](https://github.com/readmeio/api/commit/5621fad)), closes [#111](https://github.com/readmeio/api/issues/111)
* chore(deps): bump fetch-har from 3.0.0 to 3.0.2 (#114) ([41efd8b](https://github.com/readmeio/api/commit/41efd8b)), closes [#114](https://github.com/readmeio/api/issues/114)
* chore(deps): bump httpsnippet from 1.20.0 to 1.21.0 (#117) ([e5d5082](https://github.com/readmeio/api/commit/e5d5082)), closes [#117](https://github.com/readmeio/api/issues/117)
* chore(deps): bump lodash from 4.17.15 to 4.17.19 (#108) ([9d4c12a](https://github.com/readmeio/api/commit/9d4c12a)), closes [#108](https://github.com/readmeio/api/issues/108)



## 2.2.0 (2020-07-13)

* v2.2.0 ([fa9fa64](https://github.com/readmeio/api/commit/fa9fa64))
* feat: automatically reject the sdk promise for error statuses (#105) ([827f32a](https://github.com/readmeio/api/commit/827f32a)), closes [#105](https://github.com/readmeio/api/issues/105)
* feat: setting a custom user agent for all requests (#106) ([25cefef](https://github.com/readmeio/api/commit/25cefef)), closes [#106](https://github.com/readmeio/api/issues/106)



## <small>2.1.6 (2020-07-06)</small>

* v2.1.6 ([cc67a0c](https://github.com/readmeio/api/commit/cc67a0c))
* chore(deps-dev): bump @commitlint/cli from 8.3.5 to 9.0.1 (#87) ([5e99252](https://github.com/readmeio/api/commit/5e99252)), closes [#87](https://github.com/readmeio/api/issues/87)
* chore(deps-dev): bump @commitlint/config-conventional (#88) ([a08be1f](https://github.com/readmeio/api/commit/a08be1f)), closes [#88](https://github.com/readmeio/api/issues/88)
* chore(deps-dev): bump @readme/eslint-config from 3.2.0 to 3.3.0 (#90) ([7c286ac](https://github.com/readmeio/api/commit/7c286ac)), closes [#90](https://github.com/readmeio/api/issues/90)
* chore(deps-dev): bump @readme/eslint-config from 3.3.0 to 3.3.2 (#99) ([038e6e2](https://github.com/readmeio/api/commit/038e6e2)), closes [#99](https://github.com/readmeio/api/issues/99)
* chore(deps-dev): bump eslint from 7.2.0 to 7.3.1 (#93) ([d96b2c9](https://github.com/readmeio/api/commit/d96b2c9)), closes [#93](https://github.com/readmeio/api/issues/93)
* chore(deps-dev): bump eslint from 7.3.1 to 7.4.0 (#95) ([a1d7eed](https://github.com/readmeio/api/commit/a1d7eed)), closes [#95](https://github.com/readmeio/api/issues/95)
* chore(deps-dev): bump jest from 26.0.1 to 26.1.0 (#92) ([c388924](https://github.com/readmeio/api/commit/c388924)), closes [#92](https://github.com/readmeio/api/issues/92)
* chore(deps-dev): bump nock from 12.0.3 to 13.0.0 (#91) ([52c9202](https://github.com/readmeio/api/commit/52c9202)), closes [#91](https://github.com/readmeio/api/issues/91)
* chore(deps-dev): bump nock from 13.0.0 to 13.0.2 (#97) ([cafd323](https://github.com/readmeio/api/commit/cafd323)), closes [#97](https://github.com/readmeio/api/issues/97)
* chore(deps): bump @readme/oas-to-har from 6.10.2 to 6.11.1 (#85) ([0d0c59e](https://github.com/readmeio/api/commit/0d0c59e)), closes [#85](https://github.com/readmeio/api/issues/85)
* chore(deps): bump @readme/oas-to-har from 6.11.1 to 6.14.0 (#98) ([a3b7b7d](https://github.com/readmeio/api/commit/a3b7b7d)), closes [#98](https://github.com/readmeio/api/issues/98)
* chore(deps): bump @readme/oas-tooling from 3.4.5 to 3.4.7 (#83) ([c341070](https://github.com/readmeio/api/commit/c341070)), closes [#83](https://github.com/readmeio/api/issues/83)
* chore(deps): bump @readme/oas-tooling from 3.4.7 to 3.5.0 (#96) ([32aa6d5](https://github.com/readmeio/api/commit/32aa6d5)), closes [#96](https://github.com/readmeio/api/issues/96)
* chore(deps): bump actions/checkout from v2.2.0 to v2.3.1 (#89) ([51d9be7](https://github.com/readmeio/api/commit/51d9be7)), closes [#89](https://github.com/readmeio/api/issues/89)
* chore(deps): bump actions/setup-node from v2.0.0 to v2.1.0 (#94) ([d5a18ce](https://github.com/readmeio/api/commit/d5a18ce)), closes [#94](https://github.com/readmeio/api/issues/94)
* chore(deps): bump fetch-har from 2.3.2 to 3.0.0 (#100) ([6fbe358](https://github.com/readmeio/api/commit/6fbe358)), closes [#100](https://github.com/readmeio/api/issues/100)
* feat: cleaning up api snippets by breaking off the auth call (#101) ([d76ba9e](https://github.com/readmeio/api/commit/d76ba9e)), closes [#101](https://github.com/readmeio/api/issues/101)
* docs: cleaning up the pr template ([6539d14](https://github.com/readmeio/api/commit/6539d14))
* ci: changing the label that dependabot uses ([57917ce](https://github.com/readmeio/api/commit/57917ce))



## <small>2.1.5 (2020-06-19)</small>

* v2.1.5 ([e5bfdca](https://github.com/readmeio/api/commit/e5bfdca))
* build: some more attempts at changelog improvements ([ddcb46d](https://github.com/readmeio/api/commit/ddcb46d))
* chore(deps): upgrading @readme/oas-tooling to 3.4.7 (#82) ([1e19988](https://github.com/readmeio/api/commit/1e19988)), closes [#82](https://github.com/readmeio/api/issues/82)
* docs: changelog typo resolutions ([cbd7862](https://github.com/readmeio/api/commit/cbd7862))



## <small>2.1.4 (2020-06-19)</small>

* v2.1.4 ([386d713](https://github.com/readmeio/api/commit/386d713))
* build: setting an empty version in the root package file for changelogs ([f7e5db6](https://github.com/readmeio/api/commit/f7e5db6))
* fix: minor cleanup and clarification on the fix in 996da5b ([8fbe624](https://github.com/readmeio/api/commit/8fbe624))
* docs: fixing a typo in the changelog ([996da5b](https://github.com/readmeio/api/commit/996da5b))



## <small>2.1.3 (2020-06-19)</small>

* v2.1.3 ([33fc797](https://github.com/readmeio/api/commit/33fc797))
* build: working to get changelogs automatically updated ([074cbb8](https://github.com/readmeio/api/commit/074cbb8))
* fix: issues where path params wouldn't always get added as metadata (#80) ([5215366](https://github.com/readmeio/api/commit/5215366)), closes [#80](https://github.com/readmeio/api/issues/80)
* docs: updating the changelog ([27e23c4](https://github.com/readmeio/api/commit/27e23c4))



## <small>2.1.2 (2020-06-18)</small>

* v2.1.2 ([22dec18](https://github.com/readmeio/api/commit/22dec18))
* fix: bug where path params wouldn't be included in snippets (#79) ([719e2e0](https://github.com/readmeio/api/commit/719e2e0)), closes [#79](https://github.com/readmeio/api/issues/79)
* docs: updating the changelog ([aad2cf4](https://github.com/readmeio/api/commit/aad2cf4))



## <small>2.1.1 (2020-06-17)</small>

* v2.1.1 ([e855892](https://github.com/readmeio/api/commit/e855892))
* fix: snippet paths should not include the server url (#77) ([a812f0b](https://github.com/readmeio/api/commit/a812f0b)), closes [#77](https://github.com/readmeio/api/issues/77)
* chore(deps-dev): bump lerna from 3.22.0 to 3.22.1 (#74) ([7c270c2](https://github.com/readmeio/api/commit/7c270c2)), closes [#74](https://github.com/readmeio/api/issues/74)
* chore(deps): bump @readme/oas-to-har from 6.10.0 to 6.10.2 (#73) ([1b4568c](https://github.com/readmeio/api/commit/1b4568c)), closes [#73](https://github.com/readmeio/api/issues/73)
* chore(deps): bump @readme/oas-tooling from 3.4.3 to 3.4.5 (#75) ([05e5204](https://github.com/readmeio/api/commit/05e5204)), closes [#75](https://github.com/readmeio/api/issues/75)



## 2.1.0 (2020-06-12)

* v2.1.0 ([3802a50](https://github.com/readmeio/api/commit/3802a50))
* fix: relative paths in parent parent directories not being supported (#67) ([dba888b](https://github.com/readmeio/api/commit/dba888b)), closes [#67](https://github.com/readmeio/api/issues/67)
* fix: various code snippet issues and deficiencies (#72) ([c5e4eeb](https://github.com/readmeio/api/commit/c5e4eeb)), closes [#72](https://github.com/readmeio/api/issues/72)
* chore: configuring dependabot to also update our github actions ([e8a90ea](https://github.com/readmeio/api/commit/e8a90ea))
* chore: moving off our httpsnippet fork and to v1.20.x (#64) ([45b0e2a](https://github.com/readmeio/api/commit/45b0e2a)), closes [#64](https://github.com/readmeio/api/issues/64)
* chore(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#57) ([2d4fa96](https://github.com/readmeio/api/commit/2d4fa96)), closes [#57](https://github.com/readmeio/api/issues/57)
* chore(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#63) ([919bdd9](https://github.com/readmeio/api/commit/919bdd9)), closes [#63](https://github.com/readmeio/api/issues/63)
* chore(deps-dev): upgrading @readme/eslint-config to 3.2.0 (#70) ([3b26c2e](https://github.com/readmeio/api/commit/3b26c2e)), closes [#70](https://github.com/readmeio/api/issues/70)
* chore(deps): bump @readme/oas-to-har from 6.9.6 to 6.10.0 (#59) ([9ef271a](https://github.com/readmeio/api/commit/9ef271a)), closes [#59](https://github.com/readmeio/api/issues/59)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#54) ([b58e8e3](https://github.com/readmeio/api/commit/b58e8e3)), closes [#54](https://github.com/readmeio/api/issues/54)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#58) ([f66cae2](https://github.com/readmeio/api/commit/f66cae2)), closes [#58](https://github.com/readmeio/api/issues/58)
* chore(deps): bump actions/checkout from v1 to v2.2.0 (#65) ([47d99e4](https://github.com/readmeio/api/commit/47d99e4)), closes [#65](https://github.com/readmeio/api/issues/65)
* chore(deps): bump actions/setup-node from v1 to v2.0.0 (#66) ([6a46c6c](https://github.com/readmeio/api/commit/6a46c6c)), closes [#66](https://github.com/readmeio/api/issues/66)
* chore(deps): bump fetch-har from 2.3.1 to 2.3.2 (#60) ([1a1ebe7](https://github.com/readmeio/api/commit/1a1ebe7)), closes [#60](https://github.com/readmeio/api/issues/60)
* chore(deps): swapping yaml for js-yaml (#69) ([fc04a9f](https://github.com/readmeio/api/commit/fc04a9f)), closes [#69](https://github.com/readmeio/api/issues/69)
* feat: adding test cases for supporting unchained auth usage (#68) ([0a73b49](https://github.com/readmeio/api/commit/0a73b49)), closes [#68](https://github.com/readmeio/api/issues/68)
* style: updating dependabot to follow our commit standards ([b6a29be](https://github.com/readmeio/api/commit/b6a29be))
* ci: changing the dep update frequency to weekly ([285d042](https://github.com/readmeio/api/commit/285d042))
* ci: create Dependabot config file (#56) ([38110a0](https://github.com/readmeio/api/commit/38110a0)), closes [#56](https://github.com/readmeio/api/issues/56)



## <small>2.0.2 (2020-05-30)</small>

* Bump eslint from 7.0.0 to 7.1.0 (#48) ([fcd657b](https://github.com/readmeio/api/commit/fcd657b)), closes [#48](https://github.com/readmeio/api/issues/48)
* Bump jest from 25.5.4 to 26.0.1 (#46) ([adf39a1](https://github.com/readmeio/api/commit/adf39a1)), closes [#46](https://github.com/readmeio/api/issues/46)
* Bump yaml from 1.9.2 to 1.10.0 (#45) ([26d3edd](https://github.com/readmeio/api/commit/26d3edd)), closes [#45](https://github.com/readmeio/api/issues/45)
* v2.0.2 ([c504232](https://github.com/readmeio/api/commit/c504232))
* chore: moving the repository over to a monorepo directory tree (#51) ([a82fcdd](https://github.com/readmeio/api/commit/a82fcdd)), closes [#51](https://github.com/readmeio/api/issues/51)
* chore: setting the base lerna version to the current version ([063a449](https://github.com/readmeio/api/commit/063a449))
* feat: HTTP Snippet client for Node samples (#52) ([cf72740](https://github.com/readmeio/api/commit/cf72740)), closes [#52](https://github.com/readmeio/api/issues/52)
* docs: updating our CoC enforcement email address ([5609db4](https://github.com/readmeio/api/commit/5609db4))



## <small>2.0.1 (2020-05-26)</small>

* build: 2.0.1 release ([e663a9c](https://github.com/readmeio/api/commit/e663a9c))
* fix(package.main): specify the entry point file (#50) ([05727c4](https://github.com/readmeio/api/commit/05727c4)), closes [#50](https://github.com/readmeio/api/issues/50)



## 2.0.0 (2020-05-21)

* build: 2.0.0 release ([7b66318](https://github.com/readmeio/api/commit/7b66318))
* docs: adding a changelog and enforcing commit styles (#44) ([cc07150](https://github.com/readmeio/api/commit/cc07150)), closes [#44](https://github.com/readmeio/api/issues/44)
* docs: adding a code of conduct and contribution guide ([f023b41](https://github.com/readmeio/api/commit/f023b41))
* SDK Generation (#28) ([adab436](https://github.com/readmeio/api/commit/adab436)), closes [#28](https://github.com/readmeio/api/issues/28)
* chore: pulling over our common pull request template ([609c1ba](https://github.com/readmeio/api/commit/609c1ba))
* chore: relicensing under the MIT license ([5253c44](https://github.com/readmeio/api/commit/5253c44))
* chore: wiping the slate clean for a rewrite (#27) ([a27e006](https://github.com/readmeio/api/commit/a27e006)), closes [#27](https://github.com/readmeio/api/issues/27)



## 1.0.0 (2018-01-20)

* 1.0.0 ([083dd18](https://github.com/readmeio/api/commit/083dd18))
* Add babel compilation on prepublish ([afca7ca](https://github.com/readmeio/api/commit/afca7ca))
* Add output functionality (#24) ([617aa52](https://github.com/readmeio/api/commit/617aa52)), closes [#24](https://github.com/readmeio/api/issues/24)
* Bugfix/incorrect wrap (#25) ([645b6e9](https://github.com/readmeio/api/commit/645b6e9)), closes [#25](https://github.com/readmeio/api/issues/25)
* Build the src using babel pre-test for non watching mocha ([ff0b488](https://github.com/readmeio/api/commit/ff0b488))
* Fix local linking ([a68e514](https://github.com/readmeio/api/commit/a68e514))
* Move all code into src/ folder ([1ed313d](https://github.com/readmeio/api/commit/1ed313d))
* Run tests from dist/ to make sure babel has done it's job properly ([61dd4d0](https://github.com/readmeio/api/commit/61dd4d0))
* Support sending files to build services (#23) ([1213368](https://github.com/readmeio/api/commit/1213368)), closes [#23](https://github.com/readmeio/api/issues/23)
* Turn off babel module transformation ([6b47c7d](https://github.com/readmeio/api/commit/6b47c7d)), closes [/github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js#L71](https://github.com//github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js/issues/L71)



## 1.0.0-8 (2017-09-25)

* 1.0.0-8 ([e0de537](https://github.com/readmeio/api/commit/e0de537))
* Add circleci badge to the readme ([8f1d813](https://github.com/readmeio/api/commit/8f1d813))
* Clean up error messages by not showing error stack ([a672245](https://github.com/readmeio/api/commit/a672245))



## 1.0.0-7 (2017-09-21)

* 1.0.0-7 ([17c39ee](https://github.com/readmeio/api/commit/17c39ee))
* Add code coverage to codeclimate ([95b49f0](https://github.com/readmeio/api/commit/95b49f0))
* Fix bug with deploying private services ([550ac03](https://github.com/readmeio/api/commit/550ac03))
* Remove secrets from api help ([00f8b20](https://github.com/readmeio/api/commit/00f8b20))



## 1.0.0-6 (2017-09-07)

* 1.0.0-6 ([9ac6a7a](https://github.com/readmeio/api/commit/9ac6a7a))
* Fix spacing for init ([df5596d](https://github.com/readmeio/api/commit/df5596d))



## 1.0.0-5 (2017-09-07)

* 1.0.0-5 ([db451aa](https://github.com/readmeio/api/commit/db451aa))
* Ask to create new directory if api init is run with files already existing ([1367246](https://github.com/readmeio/api/commit/1367246))



## 1.0.0-4 (2017-09-05)

* 1.0.0-4 ([c3b875f](https://github.com/readmeio/api/commit/c3b875f))
* Add metadata to package.json ([dbe5de6](https://github.com/readmeio/api/commit/dbe5de6))



## 1.0.0-3 (2017-09-05)

* 1.0.0-3 ([6ac40df](https://github.com/readmeio/api/commit/6ac40df))
* Add docs and fix tests ([b11804f](https://github.com/readmeio/api/commit/b11804f))
* Add message if they try to deploy without editing comments ([235e2bc](https://github.com/readmeio/api/commit/235e2bc))
* Add nicer message if they need to upgrade to do something ([d5981e0](https://github.com/readmeio/api/commit/d5981e0))
* Add test ([c62190f](https://github.com/readmeio/api/commit/c62190f))
* Add warning private services requires paid plan ([8b4bc2b](https://github.com/readmeio/api/commit/8b4bc2b))
* Added tests ([a933796](https://github.com/readmeio/api/commit/a933796))
* Clean code up ([f76b1b5](https://github.com/readmeio/api/commit/f76b1b5))
* cleanup ([8cad8ce](https://github.com/readmeio/api/commit/8cad8ce))
* Don't need imports in tests anymore ([f08bbf8](https://github.com/readmeio/api/commit/f08bbf8))
* Don't need this since we are loading from the home directory ([2f52e88](https://github.com/readmeio/api/commit/2f52e88))
* Fix bug where linked service was always used, even without running `api link service` ([5273229](https://github.com/readmeio/api/commit/5273229))
* Fixes if no comments exist at all ([50a0974](https://github.com/readmeio/api/commit/50a0974))
* link -> unlink ([0d7fee3](https://github.com/readmeio/api/commit/0d7fee3))
* Make sure shared directory exists first ([986cdf3](https://github.com/readmeio/api/commit/986cdf3))
* Refactor `api link` to use a folder in the home directory ([18aefa3](https://github.com/readmeio/api/commit/18aefa3))
* Update build-docs ([5f8ba74](https://github.com/readmeio/api/commit/5f8ba74))
* update test ([e0badd4](https://github.com/readmeio/api/commit/e0badd4))
* Update to circleci2 ([1fbb21c](https://github.com/readmeio/api/commit/1fbb21c))
* Use home directory for login cookie ([1af5fa8](https://github.com/readmeio/api/commit/1af5fa8))



## 1.0.0-2 (2017-08-23)

* 1.0.0-2 ([07d0e9d](https://github.com/readmeio/api/commit/07d0e9d))
* Another readme fix ([7045e38](https://github.com/readmeio/api/commit/7045e38))
* Make sure we tell them to edit the file in endpoints/ ([722211f](https://github.com/readmeio/api/commit/722211f))
* Whoops. Removing more not needed readme stuff ([0765446](https://github.com/readmeio/api/commit/0765446))



## 1.0.0-1 (2017-08-23)

* 1.0.0-1 ([70eaf91](https://github.com/readmeio/api/commit/70eaf91))
* Update readme. Remove api.create stuff ([81f5cb9](https://github.com/readmeio/api/commit/81f5cb9))



## 1.0.0-0 (2017-08-23)

* 1.0.0-0 ([2761be6](https://github.com/readmeio/api/commit/2761be6))
* Action -> Endpoint ([c2a959d](https://github.com/readmeio/api/commit/c2a959d))
* Add a default to the generated code ([56541cf](https://github.com/readmeio/api/commit/56541cf))
* Add a way to see your keys ([a858e3b](https://github.com/readmeio/api/commit/a858e3b))
* Add higher coverage thresholds ([6b0c2ff](https://github.com/readmeio/api/commit/6b0c2ff))
* bump ([d2a91b6](https://github.com/readmeio/api/commit/d2a91b6))
* Bump ([5aa6879](https://github.com/readmeio/api/commit/5aa6879))
* Bump version of build-docs to 2.0.0 ([4faec3c](https://github.com/readmeio/api/commit/4faec3c))
* Clean up a bit ([c3ae266](https://github.com/readmeio/api/commit/c3ae266))
* I don't think the post-install step works all the time ([6b9c732](https://github.com/readmeio/api/commit/6b9c732))
* If the user attempts to use a key starting with `demo` then print a warning ([4c3ab01](https://github.com/readmeio/api/commit/4c3ab01))
* Let's not get too excited... ([c35d126](https://github.com/readmeio/api/commit/c35d126))
* Lowercase current folder name on `api init` ([82d33b5](https://github.com/readmeio/api/commit/82d33b5))
* Make sure brand new services can be created ([a5182c1](https://github.com/readmeio/api/commit/a5182c1))
* Refactor api module to use module.exports in seperate files ([f5bedba](https://github.com/readmeio/api/commit/f5bedba))
* Remove version from docs link in stub ([81a0afa](https://github.com/readmeio/api/commit/81a0afa))
* Should pass through team to fetch available versions on deploy ([3848b5b](https://github.com/readmeio/api/commit/3848b5b))
* Show better error message on signup ([8cfd84e](https://github.com/readmeio/api/commit/8cfd84e))
* Update the stub ([e98bf9a](https://github.com/readmeio/api/commit/e98bf9a))



## <small>0.13.4 (2017-08-03)</small>

* 0.13.4 ([f2b259a](https://github.com/readmeio/api/commit/f2b259a))
* update build-docs ([ee2e5af](https://github.com/readmeio/api/commit/ee2e5af))



## <small>0.13.3 (2017-08-03)</small>

* 0.13.3 ([6e50763](https://github.com/readmeio/api/commit/6e50763))
* Fix error handling for async called with api.error ([88cf6ef](https://github.com/readmeio/api/commit/88cf6ef))



## <small>0.13.2 (2017-08-03)</small>

* 0.13.2 ([68760b4](https://github.com/readmeio/api/commit/68760b4))



## <small>0.13.1 (2017-08-03)</small>

* 0.13.1 ([63f050a](https://github.com/readmeio/api/commit/63f050a))
* build-docs 1.4.1 ([58283b1](https://github.com/readmeio/api/commit/58283b1))



## 0.13.0 (2017-08-03)

* 0.13.0 ([60eef5c](https://github.com/readmeio/api/commit/60eef5c))
* Fix issue with errors in async code ([ac9355e](https://github.com/readmeio/api/commit/ac9355e))
* Update build-docs to support defaults ([a0c10f7](https://github.com/readmeio/api/commit/a0c10f7))
* Update stub to be more useful ([637cde5](https://github.com/readmeio/api/commit/637cde5))



## <small>0.12.8 (2017-08-01)</small>

* -v consoles the BUILD_HOST if set ([c6d3a76](https://github.com/readmeio/api/commit/c6d3a76))
* 0.12.8 ([ed76e3b](https://github.com/readmeio/api/commit/ed76e3b))
* Add -t shortcut for --team ([af18aa0](https://github.com/readmeio/api/commit/af18aa0))
* Fix bug deploying private service with only 1 team ([897e538](https://github.com/readmeio/api/commit/897e538))
* Should be .name ([07e1d8e](https://github.com/readmeio/api/commit/07e1d8e))



## <small>0.12.7 (2017-08-01)</small>

* 0.12.7 ([cf7b3b1](https://github.com/readmeio/api/commit/cf7b3b1))
* Actually installed updated version ([915e49d](https://github.com/readmeio/api/commit/915e49d))



## <small>0.12.6 (2017-08-01)</small>

* 0.12.6 ([6a85ec4](https://github.com/readmeio/api/commit/6a85ec4))
* Update build-docs ([9ed2849](https://github.com/readmeio/api/commit/9ed2849))



## <small>0.12.5 (2017-08-01)</small>

* 0.12.5 ([1583920](https://github.com/readmeio/api/commit/1583920))
* Update build-docs to fix issue with es6 syntax ([4b868f2](https://github.com/readmeio/api/commit/4b868f2))



## <small>0.12.4 (2017-07-31)</small>

* 0.12.4 ([412d22b](https://github.com/readmeio/api/commit/412d22b))
* Add a notice about what an action is ([a1ed38b](https://github.com/readmeio/api/commit/a1ed38b))
* Add a post-install script ([bf37f4d](https://github.com/readmeio/api/commit/bf37f4d))
* Better messages when deploying ([d4af7cd](https://github.com/readmeio/api/commit/d4af7cd))
* Better setup messaging ([3b30510](https://github.com/readmeio/api/commit/3b30510))
* Improve error message for docs ([40e834d](https://github.com/readmeio/api/commit/40e834d))
* Update build-docs so type is no longer case sensitive ([3ab61ac](https://github.com/readmeio/api/commit/3ab61ac))
* Whoops, testing ([66b7f08](https://github.com/readmeio/api/commit/66b7f08))



## <small>0.12.1 (2017-07-28)</small>

* 0.12.1 ([85ccd0a](https://github.com/readmeio/api/commit/85ccd0a))
* Fix failing tests ([c038070](https://github.com/readmeio/api/commit/c038070))



## 0.12.0 (2017-07-28)

* 0.12.0 ([cff0fcd](https://github.com/readmeio/api/commit/cff0fcd))
* Don't ask if you only have one team ([54b6e75](https://github.com/readmeio/api/commit/54b6e75))
* Update docs to match example ([ac707c6](https://github.com/readmeio/api/commit/ac707c6))
* Validate semver version during init ([183f1a3](https://github.com/readmeio/api/commit/183f1a3))



## 0.11.0 (2017-07-28)

* 0.11.0 ([ee13d9b](https://github.com/readmeio/api/commit/ee13d9b))
* Also prompt signup if they arent logged in but try to deploy ([69d0d6f](https://github.com/readmeio/api/commit/69d0d6f))
* Attempt to guess their username ([15a318e](https://github.com/readmeio/api/commit/15a318e))
* bump ([f784fe0](https://github.com/readmeio/api/commit/f784fe0))
* bump ([b1eb7f7](https://github.com/readmeio/api/commit/b1eb7f7))
* Bump ([2804fee](https://github.com/readmeio/api/commit/2804fee))
* Bump ([f4409a4](https://github.com/readmeio/api/commit/f4409a4))
* Bump bump ([19ce78c](https://github.com/readmeio/api/commit/19ce78c))
* Change .do to .run ([48a60bf](https://github.com/readmeio/api/commit/48a60bf))
* Change colors ([8e6b2f2](https://github.com/readmeio/api/commit/8e6b2f2))
* Change intro text ([e1a453f](https://github.com/readmeio/api/commit/e1a453f))
* Clean up the api help screen ([ceeba12](https://github.com/readmeio/api/commit/ceeba12))
* I don't think people will know what an 'action' is without context ([986f514](https://github.com/readmeio/api/commit/986f514))
* Put API back ([d3e8f39](https://github.com/readmeio/api/commit/d3e8f39))
* Send metadata from the Node module ([865e9f0](https://github.com/readmeio/api/commit/865e9f0))
* Simple ReadMe file intro ([73a61bf](https://github.com/readmeio/api/commit/73a61bf))
* There is no way this will work... ([4fe4232](https://github.com/readmeio/api/commit/4fe4232))
* Unbreak the breaks ([2c661f4](https://github.com/readmeio/api/commit/2c661f4))
* Update readme ([34b9015](https://github.com/readmeio/api/commit/34b9015))



## 0.10.0 (2017-07-25)

* 0.10.0 ([502ef36](https://github.com/readmeio/api/commit/502ef36))
* Change invoke url ([4cbf588](https://github.com/readmeio/api/commit/4cbf588))



## <small>0.9.2 (2017-07-24)</small>

* 0.9.2 ([3dfa1e2](https://github.com/readmeio/api/commit/3dfa1e2))
* Update package.lock ([8442f96](https://github.com/readmeio/api/commit/8442f96))



## <small>0.9.1 (2017-07-24)</small>

* 0.9.1 ([d078597](https://github.com/readmeio/api/commit/d078597))
* Update to v1 of the api ([2ae8c48](https://github.com/readmeio/api/commit/2ae8c48))
* Update to v1.3.1 of build-docs ([25d1a18](https://github.com/readmeio/api/commit/25d1a18))



## 0.9.0 (2017-07-19)

* 0.8.0 ([4ed8555](https://github.com/readmeio/api/commit/4ed8555))
* 0.9.0 ([2866b2e](https://github.com/readmeio/api/commit/2866b2e))
* Add better docs and tests for secrets ([564cec2](https://github.com/readmeio/api/commit/564cec2))
* Fix api module to v0 of api ([0236f02](https://github.com/readmeio/api/commit/0236f02))
* Fix some other tests ([35dd7e7](https://github.com/readmeio/api/commit/35dd7e7))
* Update to npm5 ([379796a](https://github.com/readmeio/api/commit/379796a))



## 0.8.0 (2017-06-21)

* 0.8.0 ([baa51e4](https://github.com/readmeio/api/commit/baa51e4))
* Fix test ([3f37f8a](https://github.com/readmeio/api/commit/3f37f8a))
* response.body.result -> response.body ([a328761](https://github.com/readmeio/api/commit/a328761))
* update gitignore ([ce72d6d](https://github.com/readmeio/api/commit/ce72d6d))



## <small>0.7.1 (2017-05-17)</small>

* 0.7.1 ([d7a72ad](https://github.com/readmeio/api/commit/d7a72ad))
* Only ask for invite code on sign up, not login ([fda5c63](https://github.com/readmeio/api/commit/fda5c63))



## 0.7.0 (2017-05-17)

* 0.7.0 ([6500175](https://github.com/readmeio/api/commit/6500175))
* Add inviteCode to command line signup ([a59592c](https://github.com/readmeio/api/commit/a59592c))
* Add support for `api.error(new Error('message'))` ([e49636a](https://github.com/readmeio/api/commit/e49636a))



## <small>0.6.1 (2017-05-16)</small>

* 0.6.1 ([bda076b](https://github.com/readmeio/api/commit/bda076b))
* Add documentation for login and signup ([249df23](https://github.com/readmeio/api/commit/249df23))
* api-build -> api ([9e7d163](https://github.com/readmeio/api/commit/9e7d163))
* Increase version of build-docs to throw on invalid json schema types ([9c0d40b](https://github.com/readmeio/api/commit/9c0d40b))
* Support `throw new Error('message')` from services ([8d2c51d](https://github.com/readmeio/api/commit/8d2c51d))



## 0.6.0 (2017-05-16)

* 0.6.0 ([51ac766](https://github.com/readmeio/api/commit/51ac766))
* Add --version and -v ([908db4d](https://github.com/readmeio/api/commit/908db4d))
* Fix bug with missing readme.md file ([bf6f4d5](https://github.com/readmeio/api/commit/bf6f4d5))
* Fix deprecated warning ([2bd2b8d](https://github.com/readmeio/api/commit/2bd2b8d))
* Signup from cli ([981adcd](https://github.com/readmeio/api/commit/981adcd))
* Use api instead of api-build ([13d2877](https://github.com/readmeio/api/commit/13d2877))



## 0.5.0 (2017-05-12)

* 0.5.0 ([d3d8e3c](https://github.com/readmeio/api/commit/d3d8e3c))
* Able to set secrets for service ([757db02](https://github.com/readmeio/api/commit/757db02))
* Add `#set()` and `#write()` to PackageJson class ([76e4c39](https://github.com/readmeio/api/commit/76e4c39))
* Add `api whoami` to return the current logged in user ([f980712](https://github.com/readmeio/api/commit/f980712))
* Add `build` property to package.json if existing property exists and does not match ([84fb912](https://github.com/readmeio/api/commit/84fb912))
* Add a couple more tests for `api init` ([08f541b](https://github.com/readmeio/api/commit/08f541b))
* Add a heading to the readme markdown ([2cea1f1](https://github.com/readmeio/api/commit/2cea1f1))
* Add a proper `api logout` ([e661b72](https://github.com/readmeio/api/commit/e661b72))
* Add a user-agent header which contains the `api` version, node version and platform ([ca42b63](https://github.com/readmeio/api/commit/ca42b63))
* Add capability to update property prioritising a root update first ([97bc69f](https://github.com/readmeio/api/commit/97bc69f))
* Add comment ([9d23768](https://github.com/readmeio/api/commit/9d23768))
* Add documentation for local and ls ([e51d1a2](https://github.com/readmeio/api/commit/e51d1a2))
* Add global request override which adds an error handler ([42a27b7](https://github.com/readmeio/api/commit/42a27b7))
* Add missing password prompt type ([f714e2d](https://github.com/readmeio/api/commit/f714e2d))
* Add more tests for `api init` and support existing package.json ([7067729](https://github.com/readmeio/api/commit/7067729))
* Add new `invoke` file which is used from both `run` and `api.do` ([bbcd26e](https://github.com/readmeio/api/commit/bbcd26e))
* Add some more tests for on deploy team selection ([ad81e04](https://github.com/readmeio/api/commit/ad81e04))
* Add tests and docs for `api update` ([b95eef0](https://github.com/readmeio/api/commit/b95eef0))
* Allowing running from cli on different team ([331a1e6](https://github.com/readmeio/api/commit/331a1e6))
* api.do returns promise or callback ([b798c2c](https://github.com/readmeio/api/commit/b798c2c))
* Ask for `team` and `private` on service deploy ([dd48ad1](https://github.com/readmeio/api/commit/dd48ad1))
* Better error handling ([2b43e55](https://github.com/readmeio/api/commit/2b43e55))
* Bump version of build-docs to 1.1.0 to support a full description ([da8d091](https://github.com/readmeio/api/commit/da8d091))
* Data is assumed to be {} if not passed in ([3549778](https://github.com/readmeio/api/commit/3549778))
* Document `run` and add support for private services ([5c83a86](https://github.com/readmeio/api/commit/5c83a86))
* Fix for new versions array format returned from api ([fdb1174](https://github.com/readmeio/api/commit/fdb1174))
* Fix formatting of readme file ([889efd3](https://github.com/readmeio/api/commit/889efd3))
* Fix help test ([20f0473](https://github.com/readmeio/api/commit/20f0473))
* Fix other enquirer usages ([2ceb606](https://github.com/readmeio/api/commit/2ceb606))
* Generate docs for all actions ([59a18c4](https://github.com/readmeio/api/commit/59a18c4))
* Lint ([be3a8cb](https://github.com/readmeio/api/commit/be3a8cb))
* Lint ([7c71d90](https://github.com/readmeio/api/commit/7c71d90))
* Make sure our request wrapper returns an actual promise ([0cd2343](https://github.com/readmeio/api/commit/0cd2343))
* Make tests better for init ([c82575e](https://github.com/readmeio/api/commit/c82575e))
* Move entrypoint require into try..catch block ([cb2b500](https://github.com/readmeio/api/commit/cb2b500))
* Output correct error from `api run` ([4a71ab6](https://github.com/readmeio/api/commit/4a71ab6))
* Pick a team to update service on ([61507b5](https://github.com/readmeio/api/commit/61507b5))
* Prefixing team name onto package.json name for private non-personal packages ([d33c5a3](https://github.com/readmeio/api/commit/d33c5a3))
* Print out location header for the URL to the hosted service ([b78e680](https://github.com/readmeio/api/commit/b78e680))
* Re-add back in the public/private question on first deploy ([f193130](https://github.com/readmeio/api/commit/f193130))
* Refactor the deployment process ([d325bb4](https://github.com/readmeio/api/commit/d325bb4))
* Remove asking of `private` in the cli ([05473ee](https://github.com/readmeio/api/commit/05473ee))
* Remove async/await ([bdede9e](https://github.com/readmeio/api/commit/bdede9e))
* Remove dependencies from package json object ([995f2b9](https://github.com/readmeio/api/commit/995f2b9))
* Remove signup ([e4db693](https://github.com/readmeio/api/commit/e4db693))
* Send private flag to the API ([afb54ca](https://github.com/readmeio/api/commit/afb54ca))
* Show prompt to update if on an old version ([aa770bb](https://github.com/readmeio/api/commit/aa770bb))
* Skip broken test ([3c6773a](https://github.com/readmeio/api/commit/3c6773a))
* Swap out inquirer for enquirer ([327a8a8](https://github.com/readmeio/api/commit/327a8a8))
* Switch logout to use async/await ([724992d](https://github.com/readmeio/api/commit/724992d))
* Tests ([97f119d](https://github.com/readmeio/api/commit/97f119d))
* Tidy up private question. Rename internal to private ([59ed258](https://github.com/readmeio/api/commit/59ed258))
* Update dependencies ([e8fcfb1](https://github.com/readmeio/api/commit/e8fcfb1))
* Update docs for deploy ([59f2853](https://github.com/readmeio/api/commit/59f2853))
* Use prod url by default ([9b58b31](https://github.com/readmeio/api/commit/9b58b31))
* Validate package name ([b122167](https://github.com/readmeio/api/commit/b122167))
* Versions can be marked as deprecated ([226a81f](https://github.com/readmeio/api/commit/226a81f))



## <small>0.4.1 (2017-03-31)</small>

* 0.4.1 ([ffd17b9](https://github.com/readmeio/api/commit/ffd17b9))
* Add `api docs` command to show generated docs ([11a2e08](https://github.com/readmeio/api/commit/11a2e08))
* Add build-docs comment block to stub.js ([d8d8587](https://github.com/readmeio/api/commit/d8d8587))
* Add circle.yml file ([0850643](https://github.com/readmeio/api/commit/0850643))
* Add readme.md ([6b34546](https://github.com/readmeio/api/commit/6b34546))
* Add testing setup and add tests for help command ([601e8a3](https://github.com/readmeio/api/commit/601e8a3))
* Better deployment with versions ([02fa41f](https://github.com/readmeio/api/commit/02fa41f))
* Fix commands for new api response format ([25a4d9a](https://github.com/readmeio/api/commit/25a4d9a))
* Fix header ([dd3c390](https://github.com/readmeio/api/commit/dd3c390))
* Log if you're not logged in before doing actions ([01f87ca](https://github.com/readmeio/api/commit/01f87ca))
* Pass minimists args into `action.run()` ([48b82c2](https://github.com/readmeio/api/commit/48b82c2))
* Removing lodash dependency ([8b9deea](https://github.com/readmeio/api/commit/8b9deea))
* Show link to dash after deploy ([aced1c4](https://github.com/readmeio/api/commit/aced1c4))
* Takes the web url from utils ([648ca4b](https://github.com/readmeio/api/commit/648ca4b))
* Temp fix for deploying a new service that hasn't been deployed before ([fa2aba5](https://github.com/readmeio/api/commit/fa2aba5))



## 0.4.0 (2017-03-22)

* 0.4.0 ([c8b1010](https://github.com/readmeio/api/commit/c8b1010))
* Add progress bar for uploader! ([eb18151](https://github.com/readmeio/api/commit/eb18151))



## <small>0.3.3 (2017-03-22)</small>

* 0.3.3 ([5b16f0a](https://github.com/readmeio/api/commit/5b16f0a))



## <small>0.3.2 (2017-03-21)</small>

* 0.3.2 ([06aecaa](https://github.com/readmeio/api/commit/06aecaa))
* Bump build-docs version to 1.0.2 ([c29da07](https://github.com/readmeio/api/commit/c29da07))



## <small>0.3.1 (2017-03-21)</small>

* 0.3.1 ([8cabf32](https://github.com/readmeio/api/commit/8cabf32))
* Bump build-docs version to 1.0.1 ([d0533c7](https://github.com/readmeio/api/commit/d0533c7))



## 0.3.0 (2017-03-21)

* 0.3.0 ([8159ef8](https://github.com/readmeio/api/commit/8159ef8))
* Add help usage for `api`, `api help` and `api help <command>` ([900cc39](https://github.com/readmeio/api/commit/900cc39))



## <small>0.2.2 (2017-03-21)</small>

* 0.2.2 ([d10c15a](https://github.com/readmeio/api/commit/d10c15a))
* Checks semver version ([748a09b](https://github.com/readmeio/api/commit/748a09b))
* Request is required by request-promise ([884eb0b](https://github.com/readmeio/api/commit/884eb0b))
* Update version via cli ([cc2d38a](https://github.com/readmeio/api/commit/cc2d38a))



## <small>0.2.1 (2017-03-21)</small>

* 0.2.1 ([8802c9d](https://github.com/readmeio/api/commit/8802c9d))
* Deploy readme.md ([f7f893b](https://github.com/readmeio/api/commit/f7f893b))
* Fetch BUILD_URL from env variable ([26e4da4](https://github.com/readmeio/api/commit/26e4da4))
* Remove unused dependencies and fix handler.js ([d885ea7](https://github.com/readmeio/api/commit/d885ea7))
* Rename 'api' to 'api-build' in handler local ([5e9b4dc](https://github.com/readmeio/api/commit/5e9b4dc))
* Save cookie on login and signup ([6353d4d](https://github.com/readmeio/api/commit/6353d4d))
* Send docs to registry ([0f33d5e](https://github.com/readmeio/api/commit/0f33d5e))



## 0.2.0 (2017-03-20)

* 0.2.0 ([be11dd0](https://github.com/readmeio/api/commit/be11dd0))
* Add command for running remotely ([4d20036](https://github.com/readmeio/api/commit/4d20036))
* Fix keys command ([5dae4f6](https://github.com/readmeio/api/commit/5dae4f6))
* Fix logs to work with new auth, and not stop lambda from quiting ([fc904a4](https://github.com/readmeio/api/commit/fc904a4))
* Improvements to api init ([5ed8581](https://github.com/readmeio/api/commit/5ed8581))
* use stage url ([518715d](https://github.com/readmeio/api/commit/518715d))



## <small>0.1.1 (2017-03-16)</small>

* 0.1.1 ([00d00c2](https://github.com/readmeio/api/commit/00d00c2))
* Update package.json name ([8709337](https://github.com/readmeio/api/commit/8709337))



## 0.1.0 (2017-03-16)

* 0.1.0 ([f87c48e](https://github.com/readmeio/api/commit/f87c48e))
* Ability to use staging url ([2f40fe0](https://github.com/readmeio/api/commit/2f40fe0))
* Add alias for invoke ([16574f1](https://github.com/readmeio/api/commit/16574f1))
* Add list command to show deployed versions ([4664860](https://github.com/readmeio/api/commit/4664860))
* Add way to output keys on cli ([d22a8cf](https://github.com/readmeio/api/commit/d22a8cf))
* api init ([a61647f](https://github.com/readmeio/api/commit/a61647f))
* api link ([0b3b1a8](https://github.com/readmeio/api/commit/0b3b1a8))
* api log ([4647c27](https://github.com/readmeio/api/commit/4647c27))
* api unlink ([6146766](https://github.com/readmeio/api/commit/6146766))
* api.do ([62133c8](https://github.com/readmeio/api/commit/62133c8))
* better un-tracking? ([1395319](https://github.com/readmeio/api/commit/1395319))
* Clean up console ([7c6501a](https://github.com/readmeio/api/commit/7c6501a))
* Clean up eslint ([0d65954](https://github.com/readmeio/api/commit/0d65954))
* e2e working with services registry, needs to un-hardcode the endpoint ([c67d252](https://github.com/readmeio/api/commit/c67d252))
* Fix a bunch of login stuff with users ([e029edb](https://github.com/readmeio/api/commit/e029edb))
* Fix build url to staging ([1e70e00](https://github.com/readmeio/api/commit/1e70e00))
* Fix issues with logger ([a3019f3](https://github.com/readmeio/api/commit/a3019f3))
* Fix ls ([34df489](https://github.com/readmeio/api/commit/34df489))
* Fix running locally ([3dfd627](https://github.com/readmeio/api/commit/3dfd627))
* Fixes for ls ([7bf009a](https://github.com/readmeio/api/commit/7bf009a))
* Initial commit ([0dbe429](https://github.com/readmeio/api/commit/0dbe429))
* initial commit of skeleton, needs POST route, and handler ([9924cd7](https://github.com/readmeio/api/commit/9924cd7))
* Invoking and deploying ([4f4b30e](https://github.com/readmeio/api/commit/4f4b30e))
* it's all working now ([62c775f](https://github.com/readmeio/api/commit/62c775f))
* keep git from tracking changes to cred file ([c7ff98e](https://github.com/readmeio/api/commit/c7ff98e))
* list all deployed services ([d094242](https://github.com/readmeio/api/commit/d094242))
* Login with username or email ([dd593bd](https://github.com/readmeio/api/commit/dd593bd))
* make sure data dir is part of package so it won't need to be created ([8186db2](https://github.com/readmeio/api/commit/8186db2))
* Move handler into module ([7c4e8f3](https://github.com/readmeio/api/commit/7c4e8f3))
* no way to untrack changes to cred file, just commiting dir ([07b87ad](https://github.com/readmeio/api/commit/07b87ad))
* Run locally ([3dd7b46](https://github.com/readmeio/api/commit/3dd7b46))
* Should be staging url ([882df8f](https://github.com/readmeio/api/commit/882df8f))
* Update how api key is passed ([2191617](https://github.com/readmeio/api/commit/2191617))
* Use new login style ([a2bb2bc](https://github.com/readmeio/api/commit/a2bb2bc))
* yarn ([1945f2f](https://github.com/readmeio/api/commit/1945f2f))



## <small>6.0.1 (2023-06-27)</small>

* fix(snippet): bug where path params may lose hyphens if they have one (#660) ([674ce19](https://github.com/readmeio/api/commit/674ce19)), closes [#660](https://github.com/readmeio/api/issues/660)



## 6.0.0 (2023-06-26)

* v6.0.0 ([9759db4](https://github.com/readmeio/api/commit/9759db4))
* fix: getting unit tests passing again (#659) ([94e73e3](https://github.com/readmeio/api/commit/94e73e3)), closes [#659](https://github.com/readmeio/api/issues/659)
* chore: bumping up our peerdep for httpsnippet ([bc4e2ee](https://github.com/readmeio/api/commit/bc4e2ee))
* feat: dropping support for node 14 (#655) ([8e7515c](https://github.com/readmeio/api/commit/8e7515c)), closes [#655](https://github.com/readmeio/api/issues/655)



## <small>5.0.8 (2023-03-17)</small>

* v5.0.8 ([bd15ecc](https://github.com/readmeio/api/commit/bd15ecc))
* chore(deps): bump http-cache-semantics from 4.1.0 to 4.1.1 (#613) ([ebb90af](https://github.com/readmeio/api/commit/ebb90af)), closes [#613](https://github.com/readmeio/api/issues/613)
* chore(deps): bumping out of date deps (#611) ([287a708](https://github.com/readmeio/api/commit/287a708)), closes [#611](https://github.com/readmeio/api/issues/611)
* chore(test): refreshing the smoketest dataset ([1a457e4](https://github.com/readmeio/api/commit/1a457e4))
* feat: add install flag to bypass prompt (#625) ([415fb8e](https://github.com/readmeio/api/commit/415fb8e)), closes [#625](https://github.com/readmeio/api/issues/625)



## <small>5.0.7 (2023-01-23)</small>

* Adds ESM usage instructions (#606) ([6fadba7](https://github.com/readmeio/api/commit/6fadba7)), closes [#606](https://github.com/readmeio/api/issues/606)
* v5.0.7 ([b003a05](https://github.com/readmeio/api/commit/b003a05))
* fix: moving off `fs/promises` to `fs` in client-side code (#605) ([1d9c87e](https://github.com/readmeio/api/commit/1d9c87e)), closes [#605](https://github.com/readmeio/api/issues/605)
* chore: bumping deps (#607) ([21bd60a](https://github.com/readmeio/api/commit/21bd60a)), closes [#607](https://github.com/readmeio/api/issues/607)



## <small>5.0.6 (2023-01-09)</small>

* v5.0.6 ([33d0a4e](https://github.com/readmeio/api/commit/33d0a4e))
* chore: bumping out of date deps (#603) ([66cfec9](https://github.com/readmeio/api/commit/66cfec9)), closes [#603](https://github.com/readmeio/api/issues/603)
* fix: broken badge, remove unnecessary `.svg` extension ([7c5224c](https://github.com/readmeio/api/commit/7c5224c)), closes [badges/shields#8671](https://github.com/badges/shields/issues/8671)
* fix: failing tests (#602) ([c19a991](https://github.com/readmeio/api/commit/c19a991)), closes [#602](https://github.com/readmeio/api/issues/602)



## <small>5.0.5 (2022-12-09)</small>

* v5.0.5 ([2d39949](https://github.com/readmeio/api/commit/2d39949))
* fix: resolving typing issues in JS codegen (#593) ([ab97a70](https://github.com/readmeio/api/commit/ab97a70)), closes [#593](https://github.com/readmeio/api/issues/593)
* test: updating the smoketest dataset (#594) ([bf57315](https://github.com/readmeio/api/commit/bf57315)), closes [#594](https://github.com/readmeio/api/issues/594)
* chore(deps-dev): bump eslint from 8.28.0 to 8.29.0 (#592) ([deaa5ba](https://github.com/readmeio/api/commit/deaa5ba)), closes [#592](https://github.com/readmeio/api/issues/592)
* chore(deps): bump readmeio/rdme from 8.1.1 to 8.2.0 (#587) ([2c6144e](https://github.com/readmeio/api/commit/2c6144e)), closes [#587](https://github.com/readmeio/api/issues/587)
* chore(deps): bumping out of date deps (#591) ([54754da](https://github.com/readmeio/api/commit/54754da)), closes [#591](https://github.com/readmeio/api/issues/591)
* chore(deps): use rdme@v8 ([a730908](https://github.com/readmeio/api/commit/a730908))



## <small>5.0.4 (2022-11-30)</small>

* v5.0.4 ([e566a19](https://github.com/readmeio/api/commit/e566a19))
* chore(deps): bumping out of date deps across all packages (#576) ([1255dd6](https://github.com/readmeio/api/commit/1255dd6)), closes [#576](https://github.com/readmeio/api/issues/576)



## <small>5.0.3 (2022-11-28)</small>

* v5.0.3 ([7aba675](https://github.com/readmeio/api/commit/7aba675))
* test: refreshing the unit test dataset ([4dad793](https://github.com/readmeio/api/commit/4dad793))
* chore(deps-dev): bump husky from 8.0.1 to 8.0.2 (#568) ([113e898](https://github.com/readmeio/api/commit/113e898)), closes [#568](https://github.com/readmeio/api/issues/568)
* chore(deps): bump readmeio/rdme from 8.0.0 to 8.1.1 (#573) ([6f96efa](https://github.com/readmeio/api/commit/6f96efa)), closes [#573](https://github.com/readmeio/api/issues/573)
* chore(deps): bumping out of date deps (#575) ([ae55a13](https://github.com/readmeio/api/commit/ae55a13)), closes [#575](https://github.com/readmeio/api/issues/575)
* fix: compatibility with yarn installs where `package.json` needs `version` (#574) ([0913923](https://github.com/readmeio/api/commit/0913923)), closes [#574](https://github.com/readmeio/api/issues/574)
* ci: disabling updates to `find-cache-dir` as it's esm-only now ([e21a975](https://github.com/readmeio/api/commit/e21a975))



## <small>5.0.2 (2022-11-25)</small>

* v5.0.2 ([f51774f](https://github.com/readmeio/api/commit/f51774f))
* fix: installs not actually installing the api (#562) ([909a9fd](https://github.com/readmeio/api/commit/909a9fd)), closes [#562](https://github.com/readmeio/api/issues/562)
* chore(deps): bump readmeio/rdme from 7.5.0 to 8.0.0 (#558) ([08d3ac5](https://github.com/readmeio/api/commit/08d3ac5)), closes [#558](https://github.com/readmeio/api/issues/558)



## <small>5.0.1 (2022-10-31)</small>

* v5.0.1 ([81bb654](https://github.com/readmeio/api/commit/81bb654))
* fix: bug where `@api/identifier` wasn't being installed properly (#557) ([20228d2](https://github.com/readmeio/api/commit/20228d2)), closes [#557](https://github.com/readmeio/api/issues/557)
* docs: tweaks to the v4 upgrade docs ([f752c66](https://github.com/readmeio/api/commit/f752c66))



## 5.0.0 (2022-10-31)

* Fix example in README (#529) ([bd10fad](https://github.com/readmeio/api/commit/bd10fad)), closes [#529](https://github.com/readmeio/api/issues/529)
* v5.0.0 ([bb044ec](https://github.com/readmeio/api/commit/bb044ec))
* docs: adding a callout about v5 not being out yet ([c36fdb1](https://github.com/readmeio/api/commit/c36fdb1))
* docs: fixing some typos in a few docs ([e766707](https://github.com/readmeio/api/commit/e766707))
* docs: installation clarifications on the registry UUID ([a9c6ce2](https://github.com/readmeio/api/commit/a9c6ce2))
* docs: v5 (#553) ([5faaa11](https://github.com/readmeio/api/commit/5faaa11)), closes [#553](https://github.com/readmeio/api/issues/553)
* chore: refreshing the smoketest dataset and excluding all google apis (#554) ([5b6a86a](https://github.com/readmeio/api/commit/5b6a86a)), closes [#554](https://github.com/readmeio/api/issues/554)
* chore: updating packageInfo ([b507b38](https://github.com/readmeio/api/commit/b507b38))
* chore(deps-dev): bump @commitlint/cli from 17.0.3 to 17.1.2 (#515) ([1b84f6e](https://github.com/readmeio/api/commit/1b84f6e)), closes [#515](https://github.com/readmeio/api/issues/515)
* chore(deps-dev): bump @commitlint/cli from 17.1.2 to 17.2.0 (#555) ([71ae361](https://github.com/readmeio/api/commit/71ae361)), closes [#555](https://github.com/readmeio/api/issues/555)
* chore(deps-dev): bump @commitlint/config-conventional (#514) ([9699657](https://github.com/readmeio/api/commit/9699657)), closes [#514](https://github.com/readmeio/api/issues/514)
* chore(deps-dev): bump @commitlint/config-conventional (#556) ([09b43ce](https://github.com/readmeio/api/commit/09b43ce)), closes [#556](https://github.com/readmeio/api/issues/556)
* chore(deps-dev): bump @readme/eslint-config from 10.1.0 to 10.1.1 (#528) ([aae1d87](https://github.com/readmeio/api/commit/aae1d87)), closes [#528](https://github.com/readmeio/api/issues/528)
* chore(deps-dev): bump @readme/eslint-config from 9.0.0 to 10.1.0 (#519) ([9ab7829](https://github.com/readmeio/api/commit/9ab7829)), closes [#519](https://github.com/readmeio/api/issues/519)
* chore(deps-dev): bump @readme/oas-examples from 5.4.1 to 5.5.0 (#503) ([6a59efb](https://github.com/readmeio/api/commit/6a59efb)), closes [#503](https://github.com/readmeio/api/issues/503)
* chore(deps-dev): bump @types/mocha from 9.1.1 to 10.0.0 (#526) ([6a40663](https://github.com/readmeio/api/commit/6a40663)), closes [#526](https://github.com/readmeio/api/issues/526)
* chore(deps-dev): bump eslint from 8.21.0 to 8.23.0 (#517) ([827b71d](https://github.com/readmeio/api/commit/827b71d)), closes [#517](https://github.com/readmeio/api/issues/517)
* chore(deps-dev): bump eslint from 8.23.0 to 8.24.0 (#525) ([4ca9c8f](https://github.com/readmeio/api/commit/4ca9c8f)), closes [#525](https://github.com/readmeio/api/issues/525)
* chore(deps-dev): bump eslint from 8.24.0 to 8.25.0 (#531) ([3c1645b](https://github.com/readmeio/api/commit/3c1645b)), closes [#531](https://github.com/readmeio/api/issues/531)
* chore(deps-dev): bump eslint from 8.25.0 to 8.26.0 (#541) ([0621068](https://github.com/readmeio/api/commit/0621068)), closes [#541](https://github.com/readmeio/api/issues/541)
* chore(deps): bump @readme/oas-to-har from 17.1.2 to 18.0.0 (#518) ([9d88aea](https://github.com/readmeio/api/commit/9d88aea)), closes [#518](https://github.com/readmeio/api/issues/518)
* chore(deps): bump ssri from 9.0.0 to 10.0.0 (#534) ([33dd5bb](https://github.com/readmeio/api/commit/33dd5bb)), closes [#534](https://github.com/readmeio/api/issues/534)
* chore(deps): bump ts-morph from 15.1.0 to 16.0.0 (#527) ([501941d](https://github.com/readmeio/api/commit/501941d)), closes [#527](https://github.com/readmeio/api/issues/527)
* chore(deps): bump validate-npm-package-name from 4.0.0 to 5.0.0 (#535) ([d150055](https://github.com/readmeio/api/commit/d150055)), closes [#535](https://github.com/readmeio/api/issues/535)
* chore(deps): bumping oas deps (#552) ([3f7b625](https://github.com/readmeio/api/commit/3f7b625)), closes [#552](https://github.com/readmeio/api/issues/552)
* chore(deps): bumping out of date deps (#510) ([c37fbcc](https://github.com/readmeio/api/commit/c37fbcc)), closes [#510](https://github.com/readmeio/api/issues/510)
* fix: minor tweak to how we generate the packageInfo file ([980dd9d](https://github.com/readmeio/api/commit/980dd9d))
* fix: prefix schema titles that start with numbers to fix a type generation bug (#530) ([b17a261](https://github.com/readmeio/api/commit/b17a261)), closes [#530](https://github.com/readmeio/api/issues/530)
* fix: quirks with OR auth configurations not working right (#543) ([af4c0e9](https://github.com/readmeio/api/commit/af4c0e9)), closes [#543](https://github.com/readmeio/api/issues/543)
* feat: addition of a new `timeout` config option (#542) ([dad0dbe](https://github.com/readmeio/api/commit/dad0dbe)), closes [#542](https://github.com/readmeio/api/issues/542) [#432](https://github.com/readmeio/api/issues/432)
* feat: allow original operationIDs to be used in dynamic SDKs (#509) ([0d52b72](https://github.com/readmeio/api/commit/0d52b72)), closes [#509](https://github.com/readmeio/api/issues/509)
* feat: allowing `accept` headers to always be sent through as metadata (#538) ([826368a](https://github.com/readmeio/api/commit/826368a)), closes [#538](https://github.com/readmeio/api/issues/538)
* feat: allowing users to manually specify an `authorization` header (#546) ([11e2435](https://github.com/readmeio/api/commit/11e2435)), closes [#546](https://github.com/readmeio/api/issues/546)
* feat: completely overhauling how we're handling response data (#539) ([18ddbfb](https://github.com/readmeio/api/commit/18ddbfb)), closes [#539](https://github.com/readmeio/api/issues/539)
* feat(testing): codegen smoketest suite + fixes (#550) ([ab94a7e](https://github.com/readmeio/api/commit/ab94a7e)), closes [#550](https://github.com/readmeio/api/issues/550)
* refactor: json schema type generation and handling (#533) ([b257fe1](https://github.com/readmeio/api/commit/b257fe1)), closes [#533](https://github.com/readmeio/api/issues/533)
* ci: formdata-node is esm only now ([67f44cd](https://github.com/readmeio/api/commit/67f44cd))



## 5.0.0-beta.3 (2022-08-01)

* v5.0.0-beta.3 ([24d5b83](https://github.com/readmeio/api/commit/24d5b83))
* chore: updating packageInfo ([9b43093](https://github.com/readmeio/api/commit/9b43093))
* chore(deps-dev): bump @readme/eslint-config from 8.8.3 to 9.0.0 (#502) ([d084273](https://github.com/readmeio/api/commit/d084273)), closes [#502](https://github.com/readmeio/api/issues/502)
* chore(deps-dev): bump eslint from 8.19.0 to 8.21.0 (#501) ([ab18053](https://github.com/readmeio/api/commit/ab18053)), closes [#501](https://github.com/readmeio/api/issues/501)
* chore(deps): bump readmeio/rdme from 7.3.0 to 7.5.0 (#500) ([404fddf](https://github.com/readmeio/api/commit/404fddf)), closes [#500](https://github.com/readmeio/api/issues/500)
* fix: bug where operationIDs with underscores were being modified (#497) ([6519b4f](https://github.com/readmeio/api/commit/6519b4f)), closes [#497](https://github.com/readmeio/api/issues/497)
* fix: generated SDKs now ship an IFEE (#494) ([9d1247f](https://github.com/readmeio/api/commit/9d1247f)), closes [#494](https://github.com/readmeio/api/issues/494)
* fix: removing undefined objects from incoming metadata parameters (#496) ([3183a8e](https://github.com/readmeio/api/commit/3183a8e)), closes [#496](https://github.com/readmeio/api/issues/496)
* feat: adding support for case-insensitive header parameters (#495) ([895f8d5](https://github.com/readmeio/api/commit/895f8d5)), closes [#495](https://github.com/readmeio/api/issues/495)
* docs: minor doc change to test something in production ([8aaef93](https://github.com/readmeio/api/commit/8aaef93))
* docs: revert change ([b580517](https://github.com/readmeio/api/commit/b580517))



## 5.0.0-beta.2 (2022-07-19)

* v5.0.0-beta.2 ([aa738b1](https://github.com/readmeio/api/commit/aa738b1))
* feat: add support for github blob URLs (#484) ([f8b20a8](https://github.com/readmeio/api/commit/f8b20a8)), closes [#484](https://github.com/readmeio/api/issues/484)
* feat: improved typescript method acecssor `path` type generation (#482) ([8db66e7](https://github.com/readmeio/api/commit/8db66e7)), closes [#482](https://github.com/readmeio/api/issues/482)
* feat: updating httpsnippet-client-api to be compatible with httpsnippet v4 (#491) ([cb357f2](https://github.com/readmeio/api/commit/cb357f2)), closes [#491](https://github.com/readmeio/api/issues/491)
* feat: updating httpsnippet-client-api to work on httpsnippet v4 + TS rewrite (#492) ([8b11be6](https://github.com/readmeio/api/commit/8b11be6)), closes [#492](https://github.com/readmeio/api/issues/492)
* fix: making sure that packageInfo file updates get committed on release ([1b770b4](https://github.com/readmeio/api/commit/1b770b4))
* fix: rearrange markdown comment ([a992a86](https://github.com/readmeio/api/commit/a992a86))
* fix: typescript crashes (#480) ([78dc3b2](https://github.com/readmeio/api/commit/78dc3b2)), closes [#480](https://github.com/readmeio/api/issues/480)
* ci: getting started content reuse using hercule (#490) ([7803460](https://github.com/readmeio/api/commit/7803460)), closes [#490](https://github.com/readmeio/api/issues/490)
* docs: fixing a bad url ([618fee3](https://github.com/readmeio/api/commit/618fee3))
* docs: tweaks to callouts so they look better on our docs ([fc25a5e](https://github.com/readmeio/api/commit/fc25a5e))
* docs: updating documentation for v5 (#469) ([c77e900](https://github.com/readmeio/api/commit/c77e900)), closes [#469](https://github.com/readmeio/api/issues/469) [#475](https://github.com/readmeio/api/issues/475) [#479](https://github.com/readmeio/api/issues/479) [#473](https://github.com/readmeio/api/issues/473)
* docs: updating relative image paths to be absolute in our docs ([1f49792](https://github.com/readmeio/api/commit/1f49792))
* chore(deps-dev): bump typescript from 4.6.4 to 4.7.4 (#473) ([4aea544](https://github.com/readmeio/api/commit/4aea544)), closes [#473](https://github.com/readmeio/api/issues/473)
* chore(deps-dev): bumping dev deps (#479) ([1434753](https://github.com/readmeio/api/commit/1434753)), closes [#479](https://github.com/readmeio/api/issues/479)



## 5.0.0-beta.1 (2022-07-10)

* v5.0.0-beta.1 ([5970a1f](https://github.com/readmeio/api/commit/5970a1f))
* fix: downgrading json-schema-to-typescript to v10 (#475) ([31a1091](https://github.com/readmeio/api/commit/31a1091)), closes [#475](https://github.com/readmeio/api/issues/475)
* feat: updating the packageInfo file for v5 beta0 ([a4df246](https://github.com/readmeio/api/commit/a4df246))



## 5.0.0-beta.0 (2022-07-08)

* v5.0.0-beta.0 ([d18f7e3](https://github.com/readmeio/api/commit/d18f7e3))
* fix: cleaning up some unnecessarily complicated promises ([db41fd3](https://github.com/readmeio/api/commit/db41fd3))
* fix: cleanup of assorted snippet generation quirks (#420) ([44a6f11](https://github.com/readmeio/api/commit/44a6f11)), closes [#420](https://github.com/readmeio/api/issues/420)
* fix: fixing how we generate the dist to work under CJS imports (#397) ([358bde4](https://github.com/readmeio/api/commit/358bde4)), closes [#397](https://github.com/readmeio/api/issues/397)
* fix: improper paths in the unit test tsconfig ([6c6c044](https://github.com/readmeio/api/commit/6c6c044))
* fix: issue where formData would sometimes be sent twice (#389) ([d4e309c](https://github.com/readmeio/api/commit/d4e309c)), closes [#389](https://github.com/readmeio/api/issues/389)
* fix: moving us off the unstable node12 module resolution with a paths hack (#400) ([aa44884](https://github.com/readmeio/api/commit/aa44884)), closes [#400](https://github.com/readmeio/api/issues/400)
* fix: quirk with node 16 and `response.clone()` (#419) ([9fe5f2a](https://github.com/readmeio/api/commit/9fe5f2a)), closes [#419](https://github.com/readmeio/api/issues/419)
* fix: the codeql workflow so it runs properly (#379) ([ebcd3ce](https://github.com/readmeio/api/commit/ebcd3ce)), closes [#379](https://github.com/readmeio/api/issues/379)
* fix: updating the TS installer to install the upcoming `api@beta` release ([8c7388f](https://github.com/readmeio/api/commit/8c7388f))
* fix: use existing API methods (#447) ([fe01b6e](https://github.com/readmeio/api/commit/fe01b6e)), closes [#447](https://github.com/readmeio/api/issues/447)
* fix(auth): remove the ability to have auth chained with each request (#431) ([b7fc800](https://github.com/readmeio/api/commit/b7fc800)), closes [#431](https://github.com/readmeio/api/issues/431)
* chore: bumping the license year ([c7f1c76](https://github.com/readmeio/api/commit/c7f1c76))
* chore: delete redundant docs (#417) ([fbcfd26](https://github.com/readmeio/api/commit/fbcfd26)), closes [#417](https://github.com/readmeio/api/issues/417)
* chore: excluding esm-only packages from dependabot ([09420a0](https://github.com/readmeio/api/commit/09420a0))
* chore(deps-dev): bump @commitlint/cli from 16.2.1 to 16.2.4 (#441) ([628d90e](https://github.com/readmeio/api/commit/628d90e)), closes [#441](https://github.com/readmeio/api/issues/441)
* chore(deps-dev): bump @commitlint/cli from 16.2.4 to 17.0.2 (#452) ([ccc25d1](https://github.com/readmeio/api/commit/ccc25d1)), closes [#452](https://github.com/readmeio/api/issues/452)
* chore(deps-dev): bump @commitlint/cli from 17.0.2 to 17.0.3 (#463) ([e1bdea4](https://github.com/readmeio/api/commit/e1bdea4)), closes [#463](https://github.com/readmeio/api/issues/463)
* chore(deps-dev): bump @commitlint/config-conventional (#438) ([597b180](https://github.com/readmeio/api/commit/597b180)), closes [#438](https://github.com/readmeio/api/issues/438)
* chore(deps-dev): bump @commitlint/config-conventional (#450) ([5e29521](https://github.com/readmeio/api/commit/5e29521)), closes [#450](https://github.com/readmeio/api/issues/450)
* chore(deps-dev): bump @commitlint/config-conventional (#461) ([3b61e30](https://github.com/readmeio/api/commit/3b61e30)), closes [#461](https://github.com/readmeio/api/issues/461)
* chore(deps-dev): bump @types/validate-npm-package-name (#467) ([367495c](https://github.com/readmeio/api/commit/367495c)), closes [#467](https://github.com/readmeio/api/issues/467)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#454) ([a094b3f](https://github.com/readmeio/api/commit/a094b3f)), closes [#454](https://github.com/readmeio/api/issues/454)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#456) ([838bc54](https://github.com/readmeio/api/commit/838bc54)), closes [#456](https://github.com/readmeio/api/issues/456)
* chore(deps-dev): bump sinon from 13.0.2 to 14.0.0 (#451) ([5f127d1](https://github.com/readmeio/api/commit/5f127d1)), closes [#451](https://github.com/readmeio/api/issues/451)
* chore(deps-dev): bumping all dev deps (#384) ([874a91d](https://github.com/readmeio/api/commit/874a91d)), closes [#384](https://github.com/readmeio/api/issues/384)
* chore(deps-dev): bumping all out of date dev deps (#381) ([fb53f57](https://github.com/readmeio/api/commit/fb53f57)), closes [#381](https://github.com/readmeio/api/issues/381)
* chore(deps-dev): bumping some dev dependencie ([c5b4a49](https://github.com/readmeio/api/commit/c5b4a49))
* chore(deps-dev): removing alex as a dep, its better suited as a GH action ([9b9a9ea](https://github.com/readmeio/api/commit/9b9a9ea))
* chore(deps): bump @readme/oas-to-har from 14.1.0 to 15.0.0 (#390) ([fbad503](https://github.com/readmeio/api/commit/fbad503)), closes [#390](https://github.com/readmeio/api/issues/390)
* chore(deps): bump actions/checkout from 2.4.0 to 3 (#425) ([7669751](https://github.com/readmeio/api/commit/7669751)), closes [#425](https://github.com/readmeio/api/issues/425)
* chore(deps): bump actions/setup-node from 2.5.1 to 3 (#405) ([d761624](https://github.com/readmeio/api/commit/d761624)), closes [#405](https://github.com/readmeio/api/issues/405)
* chore(deps): bump github/codeql-action from 1 to 2 (#437) ([5e13314](https://github.com/readmeio/api/commit/5e13314)), closes [#437](https://github.com/readmeio/api/issues/437)
* chore(deps): bump json-schema-to-typescript from 10.1.5 to 11.0.1 (#464) ([04c4082](https://github.com/readmeio/api/commit/04c4082)), closes [#464](https://github.com/readmeio/api/issues/464)
* chore(deps): bump ts-morph from 14.0.0 to 15.1.0 (#459) ([9bbf46f](https://github.com/readmeio/api/commit/9bbf46f)), closes [#459](https://github.com/readmeio/api/issues/459)
* chore(deps): bumping node-fetch (#377) ([eec72cd](https://github.com/readmeio/api/commit/eec72cd)), closes [#377](https://github.com/readmeio/api/issues/377)
* chore(deps): bumping out of date deps (#443) ([66e5e69](https://github.com/readmeio/api/commit/66e5e69)), closes [#443](https://github.com/readmeio/api/issues/443)
* chore(deps): upgrading oas and @readme/openapi-parser ([2b3c07c](https://github.com/readmeio/api/commit/2b3c07c))
* chore(deps): upgrading oas to v18 (#407) ([a817eef](https://github.com/readmeio/api/commit/a817eef)), closes [#407](https://github.com/readmeio/api/issues/407)
* chore(deps): upgrading out of date deps ([8027f55](https://github.com/readmeio/api/commit/8027f55))
* feat: adding support for cookie parameters (#393) ([7252e5f](https://github.com/readmeio/api/commit/7252e5f)), closes [#393](https://github.com/readmeio/api/issues/393)
* feat: adding support for cookies in snippets (#421) ([a355800](https://github.com/readmeio/api/commit/a355800)), closes [#421](https://github.com/readmeio/api/issues/421)
* feat: changing the readme api url from .io to .com (#383) ([d64ee16](https://github.com/readmeio/api/commit/d64ee16)), closes [#383](https://github.com/readmeio/api/issues/383)
* feat: clenaing up how we access paths out of the OAS (#394) ([356248c](https://github.com/readmeio/api/commit/356248c)), closes [#394](https://github.com/readmeio/api/issues/394)
* feat: cli installer (#427) ([6b1e472](https://github.com/readmeio/api/commit/6b1e472)), closes [#427](https://github.com/readmeio/api/issues/427)
* feat: creating a new test suite for running snippet datasets within a VM (#422) ([0d23afc](https://github.com/readmeio/api/commit/0d23afc)), closes [#422](https://github.com/readmeio/api/issues/422)
* feat: creation of a new APICore class to handle fetching (#410) ([abf83ae](https://github.com/readmeio/api/commit/abf83ae)), closes [#410](https://github.com/readmeio/api/issues/410)
* feat: decoupling the spec fetching process from the caching library (#428) ([eb276b4](https://github.com/readmeio/api/commit/eb276b4)), closes [#428](https://github.com/readmeio/api/issues/428)
* feat: dropping support for node 12 (#382) ([d04c89d](https://github.com/readmeio/api/commit/d04c89d)), closes [#382](https://github.com/readmeio/api/issues/382)
* feat: extending support to node 18 (#435) ([4ba3917](https://github.com/readmeio/api/commit/4ba3917)), closes [#435](https://github.com/readmeio/api/issues/435)
* feat: improved handling of file uploads (#380) ([cd3c2ec](https://github.com/readmeio/api/commit/cd3c2ec)), closes [#380](https://github.com/readmeio/api/issues/380)
* feat: moving `api-core` back into the main `api` package (#409) ([8ce96f5](https://github.com/readmeio/api/commit/8ce96f5)), closes [#409](https://github.com/readmeio/api/issues/409)
* feat: moving the test suite over to mocha (#402) ([bc6952f](https://github.com/readmeio/api/commit/bc6952f)), closes [#402](https://github.com/readmeio/api/issues/402)
* feat: overhauling how we process parameters to support required defaults (#396) ([6ee4906](https://github.com/readmeio/api/commit/6ee4906)), closes [#396](https://github.com/readmeio/api/issues/396)
* feat: splitting core api functionality out into a separate package (#399) ([84da97a](https://github.com/readmeio/api/commit/84da97a)), closes [#399](https://github.com/readmeio/api/issues/399)
* feat: supporting configurable cache dirs in the dynamic SDK (#446) ([8f19be9](https://github.com/readmeio/api/commit/8f19be9)), closes [#446](https://github.com/readmeio/api/issues/446)
* feat: typescript rewrite (#392) ([a2241b0](https://github.com/readmeio/api/commit/a2241b0)), closes [#392](https://github.com/readmeio/api/issues/392)
* feat: TypeScript SDK code generation 🧙  (#411) ([77dbd34](https://github.com/readmeio/api/commit/77dbd34)), closes [#411](https://github.com/readmeio/api/issues/411)
* ci: form-data-encoder is now ESM-only so we can't use it (yet) ([934582f](https://github.com/readmeio/api/commit/934582f))
* docs: adding tickets to the pr template ([a4979e6](https://github.com/readmeio/api/commit/a4979e6))
* docs: incorporating alex into our documentation workflow (#408) ([cf55006](https://github.com/readmeio/api/commit/cf55006)), closes [#408](https://github.com/readmeio/api/issues/408)
* docs: minor contrib updates ([4d18c36](https://github.com/readmeio/api/commit/4d18c36))
* docs: small revision to the pr template ([e271dcf](https://github.com/readmeio/api/commit/e271dcf))
* docs: updating the changelog ([289c872](https://github.com/readmeio/api/commit/289c872))
* test: run `build` in pretest (#430) ([cfcbf00](https://github.com/readmeio/api/commit/cfcbf00)), closes [#430](https://github.com/readmeio/api/issues/430)
* test: SDK codegeneration test suite (#413) ([849c78c](https://github.com/readmeio/api/commit/849c78c)), closes [#413](https://github.com/readmeio/api/issues/413)
* test: upgrading `@readme/oas-examples` to the latest release and fixing issues (#424) ([2e8988c](https://github.com/readmeio/api/commit/2e8988c)), closes [#424](https://github.com/readmeio/api/issues/424)
* perf: codegen performance improvements (#429) ([7b341a2](https://github.com/readmeio/api/commit/7b341a2)), closes [#429](https://github.com/readmeio/api/issues/429)
* style: capping all long comments to 100 character lines so they're easier to read (#395) ([98ff3aa](https://github.com/readmeio/api/commit/98ff3aa)), closes [#395](https://github.com/readmeio/api/issues/395)



## 4.2.0 (2022-01-03)

* v4.2.0 ([eb3b741](https://github.com/readmeio/api/commit/eb3b741))
* chore(deps-dev): bump @commitlint/cli from 15.0.0 to 16.0.1 (#372) ([2279bcf](https://github.com/readmeio/api/commit/2279bcf)), closes [#372](https://github.com/readmeio/api/issues/372)
* chore(deps-dev): bump @commitlint/config-conventional (#365) ([eddaec1](https://github.com/readmeio/api/commit/eddaec1)), closes [#365](https://github.com/readmeio/api/issues/365)
* chore(deps-dev): bump @readme/eslint-config from 8.0.2 to 8.1.1 (#373) ([c781941](https://github.com/readmeio/api/commit/c781941)), closes [#373](https://github.com/readmeio/api/issues/373)
* chore(deps-dev): bump eslint from 8.3.0 to 8.6.0 (#369) ([1c5f2b1](https://github.com/readmeio/api/commit/1c5f2b1)), closes [#369](https://github.com/readmeio/api/issues/369)
* chore(deps-dev): bump jest from 27.4.2 to 27.4.5 (#370) ([81c8874](https://github.com/readmeio/api/commit/81c8874)), closes [#370](https://github.com/readmeio/api/issues/370)
* chore(deps-dev): bump memfs from 3.4.0 to 3.4.1 (#367) ([2f5f2f1](https://github.com/readmeio/api/commit/2f5f2f1)), closes [#367](https://github.com/readmeio/api/issues/367)
* chore(deps-dev): bump prettier from 2.5.0 to 2.5.1 (#371) ([55ce743](https://github.com/readmeio/api/commit/55ce743)), closes [#371](https://github.com/readmeio/api/issues/371)
* chore(deps): bump actions/setup-node from 2.5.0 to 2.5.1 (#364) ([343c5b7](https://github.com/readmeio/api/commit/343c5b7)), closes [#364](https://github.com/readmeio/api/issues/364)
* chore(deps): bump fetch-har from 5.0.3 to 5.0.4 (#366) ([53f0b61](https://github.com/readmeio/api/commit/53f0b61)), closes [#366](https://github.com/readmeio/api/issues/366)
* chore(deps): bump oas from 17.3.2 to 17.4.0 (#368) ([410f6ca](https://github.com/readmeio/api/commit/410f6ca)), closes [#368](https://github.com/readmeio/api/issues/368)
* chore(deps): upgrading various oas-related deps (#374) ([8a31118](https://github.com/readmeio/api/commit/8a31118)), closes [#374](https://github.com/readmeio/api/issues/374)



## <small>4.1.3 (2021-12-16)</small>

* v4.1.3 ([cb0dd91](https://github.com/readmeio/api/commit/cb0dd91))
* chore(deps): upgrading oas-to-har and oas (#361) ([b6ee52c](https://github.com/readmeio/api/commit/b6ee52c)), closes [#361](https://github.com/readmeio/api/issues/361)



## <small>4.1.2 (2021-12-10)</small>

* v4.1.2 ([7845886](https://github.com/readmeio/api/commit/7845886))
* fix: crash where multipart/form-data requests dont have params (#360) ([5762c22](https://github.com/readmeio/api/commit/5762c22)), closes [#360](https://github.com/readmeio/api/issues/360)



## <small>4.1.1 (2021-12-01)</small>

* v4.1.1 ([0731728](https://github.com/readmeio/api/commit/0731728))
* chore(deps-dev): bump @commitlint/cli from 13.2.1 to 15.0.0 (#353) ([240ee49](https://github.com/readmeio/api/commit/240ee49)), closes [#353](https://github.com/readmeio/api/issues/353)
* chore(deps-dev): bump @commitlint/config-conventional (#354) ([49fe5c0](https://github.com/readmeio/api/commit/49fe5c0)), closes [#354](https://github.com/readmeio/api/issues/354)
* chore(deps-dev): bump jest from 27.3.1 to 27.4.2 (#358) ([c9b7bc7](https://github.com/readmeio/api/commit/c9b7bc7)), closes [#358](https://github.com/readmeio/api/issues/358)
* chore(deps-dev): bump memfs from 3.3.0 to 3.4.0 (#357) ([c73cc93](https://github.com/readmeio/api/commit/c73cc93)), closes [#357](https://github.com/readmeio/api/issues/357)
* chore(deps-dev): bump nock from 13.1.4 to 13.2.1 (#352) ([0ad6778](https://github.com/readmeio/api/commit/0ad6778)), closes [#352](https://github.com/readmeio/api/issues/352)
* chore(deps-dev): bump prettier from 2.4.1 to 2.5.0 (#356) ([0fb9cdd](https://github.com/readmeio/api/commit/0fb9cdd)), closes [#356](https://github.com/readmeio/api/issues/356)
* chore(deps-dev): upgrading eslint and @readme/eslint-config ([693f52d](https://github.com/readmeio/api/commit/693f52d))
* chore(deps): bump @readme/oas-to-har from 14.0.0 to 14.0.1 (#359) ([3048ec9](https://github.com/readmeio/api/commit/3048ec9)), closes [#359](https://github.com/readmeio/api/issues/359)
* chore(deps): bump actions/checkout from 2.3.5 to 2.4.0 (#351) ([61af132](https://github.com/readmeio/api/commit/61af132)), closes [#351](https://github.com/readmeio/api/issues/351)
* chore(deps): bump actions/setup-node from 2.4.1 to 2.5.0 (#350) ([9b53392](https://github.com/readmeio/api/commit/9b53392)), closes [#350](https://github.com/readmeio/api/issues/350)
* chore(deps): bump oas from 17.1.0 to 17.1.6 (#355) ([916bab1](https://github.com/readmeio/api/commit/916bab1)), closes [#355](https://github.com/readmeio/api/issues/355)



## 4.1.0 (2021-11-08)

* v4.1.0 ([057c930](https://github.com/readmeio/api/commit/057c930))
* chore(deps-dev): bump nock from 13.1.3 to 13.1.4 (#346) ([de4ba12](https://github.com/readmeio/api/commit/de4ba12)), closes [#346](https://github.com/readmeio/api/issues/346)
* chore(deps): bump actions/checkout from 2.3.4 to 2.3.5 (#345) ([30b7101](https://github.com/readmeio/api/commit/30b7101)), closes [#345](https://github.com/readmeio/api/issues/345)
* chore(deps): bump node-fetch from 2.6.5 to 2.6.6 (#348) ([fba1514](https://github.com/readmeio/api/commit/fba1514)), closes [#348](https://github.com/readmeio/api/issues/348)
* chore(deps): bump oas from 16.0.3 to 16.0.4 (#347) ([b66675f](https://github.com/readmeio/api/commit/b66675f)), closes [#347](https://github.com/readmeio/api/issues/347)
* chore(deps): running npm audit ([04f5d5b](https://github.com/readmeio/api/commit/04f5d5b))
* feat: upgrading oas to v17 (#349) ([a88fb8b](https://github.com/readmeio/api/commit/a88fb8b)), closes [#349](https://github.com/readmeio/api/issues/349)



## 4.0.0 (2021-10-29)

* v4.0.0 ([f1d2c25](https://github.com/readmeio/api/commit/f1d2c25))
* feat: support for OpenAPI 3.1 (#344) ([4e5b9ba](https://github.com/readmeio/api/commit/4e5b9ba)), closes [#344](https://github.com/readmeio/api/issues/344)



## <small>3.4.2 (2021-10-08)</small>

* v3.4.2 ([a072112](https://github.com/readmeio/api/commit/a072112))
* fix: issues with circular references being dereferenced and unable to be stringified (#343) ([5c68896](https://github.com/readmeio/api/commit/5c68896)), closes [#343](https://github.com/readmeio/api/issues/343)



## <small>3.4.1 (2021-10-04)</small>

* v3.4.1 ([ebed0fc](https://github.com/readmeio/api/commit/ebed0fc))
* chore(deps-dev): bump @commitlint/cli from 13.1.0 to 13.2.0 (#337) ([33c95e6](https://github.com/readmeio/api/commit/33c95e6)), closes [#337](https://github.com/readmeio/api/issues/337)
* chore(deps-dev): bump @commitlint/config-conventional (#333) ([3136aff](https://github.com/readmeio/api/commit/3136aff)), closes [#333](https://github.com/readmeio/api/issues/333)
* chore(deps-dev): bump @readme/eslint-config from 7.1.0 to 7.2.0 (#334) ([8fd366d](https://github.com/readmeio/api/commit/8fd366d)), closes [#334](https://github.com/readmeio/api/issues/334)
* chore(deps-dev): bump jest from 27.2.0 to 27.2.4 (#341) ([17cba71](https://github.com/readmeio/api/commit/17cba71)), closes [#341](https://github.com/readmeio/api/issues/341)
* chore(deps-dev): bump memfs from 3.2.4 to 3.3.0 (#342) ([2f7e89f](https://github.com/readmeio/api/commit/2f7e89f)), closes [#342](https://github.com/readmeio/api/issues/342)
* chore(deps-dev): bump prettier from 2.4.0 to 2.4.1 (#340) ([d2c634a](https://github.com/readmeio/api/commit/d2c634a)), closes [#340](https://github.com/readmeio/api/issues/340)
* chore(deps): bump @readme/oas-to-har from 13.7.2 to 13.7.3 (#338) ([7cd53c3](https://github.com/readmeio/api/commit/7cd53c3)), closes [#338](https://github.com/readmeio/api/issues/338)
* chore(deps): bump actions/setup-node from 2.4.0 to 2.4.1 (#332) ([1ac85c7](https://github.com/readmeio/api/commit/1ac85c7)), closes [#332](https://github.com/readmeio/api/issues/332)
* chore(deps): bump fetch-har from 5.0.2 to 5.0.3 (#339) ([cabdd8f](https://github.com/readmeio/api/commit/cabdd8f)), closes [#339](https://github.com/readmeio/api/issues/339)
* chore(deps): bump node-fetch from 2.6.1 to 2.6.5 (#336) ([dab087b](https://github.com/readmeio/api/commit/dab087b)), closes [#336](https://github.com/readmeio/api/issues/336)
* chore(deps): bump oas from 14.5.1 to 14.6.1 (#335) ([b40d217](https://github.com/readmeio/api/commit/b40d217)), closes [#335](https://github.com/readmeio/api/issues/335)
* docs: adding a security policy ([420584f](https://github.com/readmeio/api/commit/420584f))



## 3.4.0 (2021-09-14)

* v3.4.0 ([142ce11](https://github.com/readmeio/api/commit/142ce11))
* chore(deps-dev): bumping dev deps ([69dcca3](https://github.com/readmeio/api/commit/69dcca3))
* chore(deps): bumping oas-to-har and oas deps ([a958511](https://github.com/readmeio/api/commit/a958511))
* chore(deps): upgrading the @readme/httpsnippet peerDep requirements ([3814721](https://github.com/readmeio/api/commit/3814721))
* fix: quirks in oas-to-har where query params are not being URI encoded (#331) ([fe43a41](https://github.com/readmeio/api/commit/fe43a41)), closes [#331](https://github.com/readmeio/api/issues/331)



## <small>3.3.2 (2021-09-01)</small>

* v3.3.2 ([0781286](https://github.com/readmeio/api/commit/0781286))
* chore(deps-dev): bump @readme/eslint-config from 6.0.0 to 6.1.0 (#329) ([716b0af](https://github.com/readmeio/api/commit/716b0af)), closes [#329](https://github.com/readmeio/api/issues/329)
* chore(deps-dev): bump jest from 27.0.6 to 27.1.0 (#326) ([1c7188a](https://github.com/readmeio/api/commit/1c7188a)), closes [#326](https://github.com/readmeio/api/issues/326)
* chore(deps-dev): bump memfs from 3.2.2 to 3.2.3 (#324) ([a1c689e](https://github.com/readmeio/api/commit/a1c689e)), closes [#324](https://github.com/readmeio/api/issues/324)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([9a7a05e](https://github.com/readmeio/api/commit/9a7a05e))
* chore(deps-dev): removing lerna in favor of npx ([1e237ac](https://github.com/readmeio/api/commit/1e237ac))
* chore(deps): bump fetch-har from 5.0.1 to 5.0.2 (#330) ([ca00fec](https://github.com/readmeio/api/commit/ca00fec)), closes [#330](https://github.com/readmeio/api/issues/330)
* chore(deps): bump find-cache-dir from 3.3.1 to 3.3.2 (#325) ([1255449](https://github.com/readmeio/api/commit/1255449)), closes [#325](https://github.com/readmeio/api/issues/325)
* chore(deps): bump oas from 14.3.1 to 14.4.0 (#328) ([7fc0996](https://github.com/readmeio/api/commit/7fc0996)), closes [#328](https://github.com/readmeio/api/issues/328)
* chore(deps): running npm audit ([6f07b41](https://github.com/readmeio/api/commit/6f07b41))
* ci: ignoring node-fetch updates as its now an esm package ([b3222a4](https://github.com/readmeio/api/commit/b3222a4))



## <small>3.3.1 (2021-08-26)</small>

* v3.3.1 ([3ab90c1](https://github.com/readmeio/api/commit/3ab90c1))
* chore: running npm audit ([50428b2](https://github.com/readmeio/api/commit/50428b2))
* chore(deps-dev): bump husky from 7.0.1 to 7.0.2 (#319) ([876bf46](https://github.com/readmeio/api/commit/876bf46)), closes [#319](https://github.com/readmeio/api/issues/319)
* chore(deps-dev): bump nock from 13.1.1 to 13.1.3 (#316) ([2cef19f](https://github.com/readmeio/api/commit/2cef19f)), closes [#316](https://github.com/readmeio/api/issues/316)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.2 to 10.0.3 (#320) ([380f369](https://github.com/readmeio/api/commit/380f369)), closes [#320](https://github.com/readmeio/api/issues/320)
* chore(deps): bump @readme/oas-to-har from 13.6.0 to 13.6.1 (#322) ([2c49d5f](https://github.com/readmeio/api/commit/2c49d5f)), closes [#322](https://github.com/readmeio/api/issues/322)
* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#312) ([e4a907d](https://github.com/readmeio/api/commit/e4a907d)), closes [#312](https://github.com/readmeio/api/issues/312)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#314) ([c53578d](https://github.com/readmeio/api/commit/c53578d)), closes [#314](https://github.com/readmeio/api/issues/314)
* chore(deps): bump datauri from 3.0.0 to 4.1.0 (#318) ([445c4ad](https://github.com/readmeio/api/commit/445c4ad)), closes [#318](https://github.com/readmeio/api/issues/318)
* chore(deps): bump fetch-har from 5.0.0 to 5.0.1 (#323) ([c3feab1](https://github.com/readmeio/api/commit/c3feab1)), closes [#323](https://github.com/readmeio/api/issues/323)
* chore(deps): bump mimer from 1.1.0 to 2.0.2 (#317) ([d3da902](https://github.com/readmeio/api/commit/d3da902)), closes [#317](https://github.com/readmeio/api/issues/317)
* chore(deps): bump oas from 14.0.0 to 14.3.1 (#315) ([400e680](https://github.com/readmeio/api/commit/400e680)), closes [#315](https://github.com/readmeio/api/issues/315)
* ci: ignoring stringify-object because its an ESM pkg now ([bbaac03](https://github.com/readmeio/api/commit/bbaac03))
* ci: updating the dependabot label ([d07b3c0](https://github.com/readmeio/api/commit/d07b3c0))



## 3.3.0 (2021-07-31)

* v3.3.0 ([e2a1e40](https://github.com/readmeio/api/commit/e2a1e40))
* chore(deps-dev): bumping dev deps ([d34cb39](https://github.com/readmeio/api/commit/d34cb39))
* chore(deps-dev): bumping root pkg deps ([b585684](https://github.com/readmeio/api/commit/b585684))
* chore(deps): upgrading our oas and fetch-har deps ([6efcd05](https://github.com/readmeio/api/commit/6efcd05))
* docs: revisions to the pr template ([2ccb888](https://github.com/readmeio/api/commit/2ccb888))



## <small>3.2.6 (2021-07-06)</small>

* v3.2.6 ([5def722](https://github.com/readmeio/api/commit/5def722))
* chore(deps-dev): bump @readme/eslint-config from 5.0.5 to 5.1.0 (#306) ([ea4e2f0](https://github.com/readmeio/api/commit/ea4e2f0)), closes [#306](https://github.com/readmeio/api/issues/306)
* chore(deps-dev): bump eslint from 7.27.0 to 7.29.0 (#305) ([cc41ca7](https://github.com/readmeio/api/commit/cc41ca7)), closes [#305](https://github.com/readmeio/api/issues/305)
* chore(deps-dev): bump husky from 6.0.0 to 7.0.0 (#307) ([7a5e17a](https://github.com/readmeio/api/commit/7a5e17a)), closes [#307](https://github.com/readmeio/api/issues/307)
* chore(deps-dev): bump jest from 27.0.3 to 27.0.6 (#308) ([ec8261f](https://github.com/readmeio/api/commit/ec8261f)), closes [#308](https://github.com/readmeio/api/issues/308)
* chore(deps-dev): bump prettier from 2.3.0 to 2.3.2 (#311) ([9fbc5d6](https://github.com/readmeio/api/commit/9fbc5d6)), closes [#311](https://github.com/readmeio/api/issues/311)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#310) ([7874ea4](https://github.com/readmeio/api/commit/7874ea4)), closes [#310](https://github.com/readmeio/api/issues/310)
* chore(deps): bump @readme/oas-to-har from 13.4.10 to 13.4.17 (#309) ([3e36558](https://github.com/readmeio/api/commit/3e36558)), closes [#309](https://github.com/readmeio/api/issues/309)
* chore(deps): bump actions/setup-node from 2.1.5 to 2.2.0 (#304) ([6cb7a85](https://github.com/readmeio/api/commit/6cb7a85)), closes [#304](https://github.com/readmeio/api/issues/304)



## <small>3.2.5 (2021-06-30)</small>

* v3.2.5 ([cfda278](https://github.com/readmeio/api/commit/cfda278))
* chore(deps): upgrading oas to fix a server path matching quirk ([bb4a3bd](https://github.com/readmeio/api/commit/bb4a3bd))



## <small>3.2.4 (2021-06-28)</small>

* v3.2.4 ([624b385](https://github.com/readmeio/api/commit/624b385))
* chore(deps): upgrading oas to 13.0.3 ([a6531d3](https://github.com/readmeio/api/commit/a6531d3))



## <small>3.2.3 (2021-06-28)</small>

* v3.2.3 ([ba32a36](https://github.com/readmeio/api/commit/ba32a36))
* chore(deps): upgrading oas to 13.0.2 ([ca3ef7a](https://github.com/readmeio/api/commit/ca3ef7a))



## <small>3.2.2 (2021-06-11)</small>

* v3.2.2 ([b952087](https://github.com/readmeio/api/commit/b952087))
* chore(deps): upgrading `oas` to v13 (#303) ([e77cb20](https://github.com/readmeio/api/commit/e77cb20)), closes [#303](https://github.com/readmeio/api/issues/303)



## <small>3.2.1 (2021-06-08)</small>

* v3.2.1 ([df00ce6](https://github.com/readmeio/api/commit/df00ce6))
* chore(deps): upgrading oas-to-har and oas (#302) ([eef8895](https://github.com/readmeio/api/commit/eef8895)), closes [#302](https://github.com/readmeio/api/issues/302)



## 3.2.0 (2021-06-07)

* v3.2.0 ([3e67252](https://github.com/readmeio/api/commit/3e67252))
* chore: upgrading the `oas` dependency in httpsnippet-client-api ([98981b0](https://github.com/readmeio/api/commit/98981b0))
* chore(deps-dev): bump @commitlint/cli from 12.1.3 to 12.1.4 (#296) ([3d1a6df](https://github.com/readmeio/api/commit/3d1a6df)), closes [#296](https://github.com/readmeio/api/issues/296)
* chore(deps-dev): bump @commitlint/config-conventional (#297) ([87f2825](https://github.com/readmeio/api/commit/87f2825)), closes [#297](https://github.com/readmeio/api/issues/297)
* chore(deps-dev): bump eslint from 7.26.0 to 7.27.0 (#300) ([1ef52d8](https://github.com/readmeio/api/commit/1ef52d8)), closes [#300](https://github.com/readmeio/api/issues/300)
* chore(deps-dev): bump jest from 26.6.3 to 27.0.3 (#299) ([2b73cef](https://github.com/readmeio/api/commit/2b73cef)), closes [#299](https://github.com/readmeio/api/issues/299)
* chore(deps-dev): bump nock from 13.0.11 to 13.1.0 (#295) ([f118bb2](https://github.com/readmeio/api/commit/f118bb2)), closes [#295](https://github.com/readmeio/api/issues/295)
* chore(deps): bump @readme/oas-to-har from 13.4.5 to 13.4.6 (#301) ([0a15279](https://github.com/readmeio/api/commit/0a15279)), closes [#301](https://github.com/readmeio/api/issues/301)
* chore(deps): bump oas from 11.0.0 to 11.0.1 (#298) ([a35e430](https://github.com/readmeio/api/commit/a35e430)), closes [#298](https://github.com/readmeio/api/issues/298)
* feat: shorthand for readme-hosted APIs (@subdomain#uuid) (#176) ([bca6c23](https://github.com/readmeio/api/commit/bca6c23)), closes [#176](https://github.com/readmeio/api/issues/176)
* ci: adjusting the codeql workflow ([0bbf4d8](https://github.com/readmeio/api/commit/0bbf4d8))



## 3.1.0 (2021-05-13)

* v3.1.0 ([954f82b](https://github.com/readmeio/api/commit/954f82b))
* chore(deps-dev): bump @commitlint/cli from 12.1.1 to 12.1.3 (#288) ([23cdaf5](https://github.com/readmeio/api/commit/23cdaf5)), closes [#288](https://github.com/readmeio/api/issues/288)
* chore(deps-dev): bump @commitlint/config-conventional (#290) ([5d325b0](https://github.com/readmeio/api/commit/5d325b0)), closes [#290](https://github.com/readmeio/api/issues/290)
* chore(deps-dev): bump eslint from 7.25.0 to 7.26.0 (#291) ([f519b33](https://github.com/readmeio/api/commit/f519b33)), closes [#291](https://github.com/readmeio/api/issues/291)
* chore(deps-dev): bump prettier from 2.2.1 to 2.3.0 (#289) ([b423897](https://github.com/readmeio/api/commit/b423897)), closes [#289](https://github.com/readmeio/api/issues/289)
* chore(deps-dev): upgrading husky (#286) ([a6c12a8](https://github.com/readmeio/api/commit/a6c12a8)), closes [#286](https://github.com/readmeio/api/issues/286)
* chore(deps): bump fetch-har from 4.0.2 to 4.0.3 (#292) ([a8660df](https://github.com/readmeio/api/commit/a8660df)), closes [#292](https://github.com/readmeio/api/issues/292)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#294) ([47ecf81](https://github.com/readmeio/api/commit/47ecf81)), closes [#294](https://github.com/readmeio/api/issues/294)
* chore(deps): bump get-stream from 4.1.0 to 6.0.1 (#293) ([344c209](https://github.com/readmeio/api/commit/344c209)), closes [#293](https://github.com/readmeio/api/issues/293)
* chore(deps): bump js-yaml from 3.14.0 to 4.1.0 (#274) ([b8b4216](https://github.com/readmeio/api/commit/b8b4216)), closes [#274](https://github.com/readmeio/api/issues/274)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#287) ([347354d](https://github.com/readmeio/api/commit/347354d)), closes [#287](https://github.com/readmeio/api/issues/287)
* chore(deps): upgrading oas to 11.0.0 (#285) ([00c0288](https://github.com/readmeio/api/commit/00c0288)), closes [#285](https://github.com/readmeio/api/issues/285)
* feat: add a config() function that allows disabling of response parsing (#264) ([570049a](https://github.com/readmeio/api/commit/570049a)), closes [#264](https://github.com/readmeio/api/issues/264)
* feat: adding support for server variables (#284) ([1dd8a2e](https://github.com/readmeio/api/commit/1dd8a2e)), closes [#284](https://github.com/readmeio/api/issues/284)



## <small>3.0.3 (2021-05-07)</small>

* v3.0.3 ([343d9e9](https://github.com/readmeio/api/commit/343d9e9))
* chore(deps-dev): bump @commitlint/cli from 12.0.1 to 12.1.1 (#276) ([d675432](https://github.com/readmeio/api/commit/d675432)), closes [#276](https://github.com/readmeio/api/issues/276)
* chore(deps-dev): bump @commitlint/config-conventional (#275) ([42a507b](https://github.com/readmeio/api/commit/42a507b)), closes [#275](https://github.com/readmeio/api/issues/275)
* chore(deps-dev): bump @readme/eslint-config from 5.0.3 to 5.0.5 (#282) ([b2d159c](https://github.com/readmeio/api/commit/b2d159c)), closes [#282](https://github.com/readmeio/api/issues/282)
* chore(deps-dev): bump eslint from 7.23.0 to 7.25.0 (#280) ([94ca270](https://github.com/readmeio/api/commit/94ca270)), closes [#280](https://github.com/readmeio/api/issues/280)
* chore(deps-dev): bump memfs from 3.2.1 to 3.2.2 (#273) ([8d50610](https://github.com/readmeio/api/commit/8d50610)), closes [#273](https://github.com/readmeio/api/issues/273)
* chore(deps): bump @readme/oas-to-har from 13.2.0 to 13.2.4 (#278) ([cc097e0](https://github.com/readmeio/api/commit/cc097e0)), closes [#278](https://github.com/readmeio/api/issues/278)
* chore(deps): bump get-stream from 6.0.0 to 6.0.1 (#279) ([1dea6cc](https://github.com/readmeio/api/commit/1dea6cc)), closes [#279](https://github.com/readmeio/api/issues/279)
* chore(deps): upgrading oas ([f6369c6](https://github.com/readmeio/api/commit/f6369c6))



## <small>3.0.2 (2021-05-04)</small>

* v3.0.2 ([b52845c](https://github.com/readmeio/api/commit/b52845c))
* chore(deps): upgrading oas (#283) ([34655cb](https://github.com/readmeio/api/commit/34655cb)), closes [#283](https://github.com/readmeio/api/issues/283)
* fix: cleaning up a typo in an error message in httpsnippet-client-api ([341494f](https://github.com/readmeio/api/commit/341494f))



## <small>3.0.1 (2021-04-20)</small>

* v3.0.1 ([4728737](https://github.com/readmeio/api/commit/4728737))
* ci: allowing node 16 installs and builds (#271) ([e36fab1](https://github.com/readmeio/api/commit/e36fab1)), closes [#271](https://github.com/readmeio/api/issues/271)
* chore(deps-dev): bump eslint from 7.22.0 to 7.23.0 (#266) ([54c2fc2](https://github.com/readmeio/api/commit/54c2fc2)), closes [#266](https://github.com/readmeio/api/issues/266)
* chore(deps-dev): bump memfs from 3.2.0 to 3.2.1 (#268) ([d6905cd](https://github.com/readmeio/api/commit/d6905cd)), closes [#268](https://github.com/readmeio/api/issues/268)
* chore(deps): bump @readme/oas-to-har from 13.0.0 to 13.2.0 (#265) ([21bc2f7](https://github.com/readmeio/api/commit/21bc2f7)), closes [#265](https://github.com/readmeio/api/issues/265)
* chore(deps): bump oas from 10.4.0 to 10.4.1 (#267) ([855d931](https://github.com/readmeio/api/commit/855d931)), closes [#267](https://github.com/readmeio/api/issues/267)
* feat: cleaner snippets when body and metadata are present (#269) ([4869caf](https://github.com/readmeio/api/commit/4869caf)), closes [#269](https://github.com/readmeio/api/issues/269)



## 3.0.0 (2021-03-24)

* v3.0.0 ([260be3a](https://github.com/readmeio/api/commit/260be3a))
* chore: update deps and require npm@7 (#253) ([efa2705](https://github.com/readmeio/api/commit/efa2705)), closes [#253](https://github.com/readmeio/api/issues/253)
* chore(deps-dev): bump @commitlint/cli from 11.0.0 to 12.0.1 (#250) ([8b9b6a4](https://github.com/readmeio/api/commit/8b9b6a4)), closes [#250](https://github.com/readmeio/api/issues/250)
* chore(deps-dev): bump @commitlint/config-conventional (#248) ([12d734e](https://github.com/readmeio/api/commit/12d734e)), closes [#248](https://github.com/readmeio/api/issues/248)
* chore(deps-dev): bump @readme/eslint-config from 4.1.0 to 5.0.0 (#247) ([ef2023f](https://github.com/readmeio/api/commit/ef2023f)), closes [#247](https://github.com/readmeio/api/issues/247)
* chore(deps-dev): bump @readme/eslint-config from 5.0.0 to 5.0.3 (#258) ([440801e](https://github.com/readmeio/api/commit/440801e)), closes [#258](https://github.com/readmeio/api/issues/258)
* chore(deps-dev): bump eslint from 7.19.0 to 7.21.0 (#242) ([6875828](https://github.com/readmeio/api/commit/6875828)), closes [#242](https://github.com/readmeio/api/issues/242)
* chore(deps-dev): bump eslint from 7.21.0 to 7.22.0 (#255) ([1e48edc](https://github.com/readmeio/api/commit/1e48edc)), closes [#255](https://github.com/readmeio/api/issues/255)
* chore(deps-dev): bump nock from 13.0.7 to 13.0.9 (#251) ([f0bbc06](https://github.com/readmeio/api/commit/f0bbc06)), closes [#251](https://github.com/readmeio/api/issues/251)
* chore(deps-dev): bump nock from 13.0.9 to 13.0.11 (#260) ([fc8427f](https://github.com/readmeio/api/commit/fc8427f)), closes [#260](https://github.com/readmeio/api/issues/260)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.1 to 10.0.2 (#245) ([84b95a2](https://github.com/readmeio/api/commit/84b95a2)), closes [#245](https://github.com/readmeio/api/issues/245)
* chore(deps): bump @readme/httpsnippet from 2.4.1 to 2.4.3 (#249) ([494bbcd](https://github.com/readmeio/api/commit/494bbcd)), closes [#249](https://github.com/readmeio/api/issues/249)
* chore(deps): bump @readme/oas-to-har from 11.1.2 to 12.2.1 (#246) ([57625d0](https://github.com/readmeio/api/commit/57625d0)), closes [#246](https://github.com/readmeio/api/issues/246)
* chore(deps): bump actions/setup-node from v2.1.4 to v2.1.5 (#241) ([0498476](https://github.com/readmeio/api/commit/0498476)), closes [#241](https://github.com/readmeio/api/issues/241)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#259) ([f9910da](https://github.com/readmeio/api/commit/f9910da)), closes [#259](https://github.com/readmeio/api/issues/259)
* chore(deps): bump form-data from 3.0.0 to 4.0.0 (#244) ([47792bc](https://github.com/readmeio/api/commit/47792bc)), closes [#244](https://github.com/readmeio/api/issues/244)
* chore(deps): bump get-stream from 4.1.0 to 6.0.0 (#261) ([588fff7](https://github.com/readmeio/api/commit/588fff7)), closes [#261](https://github.com/readmeio/api/issues/261)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#256) ([ceec5c1](https://github.com/readmeio/api/commit/ceec5c1)), closes [#256](https://github.com/readmeio/api/issues/256)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#254) ([aed83e4](https://github.com/readmeio/api/commit/aed83e4)), closes [#254](https://github.com/readmeio/api/issues/254)
* chore(deps): bump oas from 10.0.1 to 10.2.0 (#243) ([e5934cc](https://github.com/readmeio/api/commit/e5934cc)), closes [#243](https://github.com/readmeio/api/issues/243)
* chore(deps): bump oas from 10.3.0 to 10.4.0 (#262) ([c7280d3](https://github.com/readmeio/api/commit/c7280d3)), closes [#262](https://github.com/readmeio/api/issues/262)
* ci: trying to fix codeql failures (#263) ([e3dd56b](https://github.com/readmeio/api/commit/e3dd56b)), closes [#263](https://github.com/readmeio/api/issues/263)
* feat: automatically parse the api response based on content-type  (#240) ([ae50813](https://github.com/readmeio/api/commit/ae50813)), closes [#240](https://github.com/readmeio/api/issues/240) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125) [/github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30](https://github.com//github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js/issues/L13-L30) [/github.com/readmeio/api/pull/240#discussion_r569829932](https://github.com//github.com/readmeio/api/pull/240/issues/discussion_r569829932)
* refactor: switch to using memfs instead of mock-fs (#239) ([6cb517f](https://github.com/readmeio/api/commit/6cb517f)), closes [#239](https://github.com/readmeio/api/issues/239) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125)


### BREAKING CHANGE

* this is a breaking change.

* chore: relax commitlint rules on body and footer length

Taken from main codebase

* feat: remove res.json() line from the httpsnippet client

* fix: always output `.then(res => console.log(res))` in code sample

Since we dont know if the response is json or not, we can't make
assumptions. In an ideal world we'd conditionally do this based
on the accept header in the response, but Operation.getHeaders() only
returns with an array of headers and not their actual values. I think
this is good enough for now!


## <small>2.7.1 (2021-02-02)</small>

* v2.7.1 ([1bb8664](https://github.com/readmeio/api/commit/1bb8664))
* chore(deps): upgrading `@readme/httpsnippet` to the latest release ([9164024](https://github.com/readmeio/api/commit/9164024))



## 2.7.0 (2021-02-02)

* v2.7.0 ([64bb202](https://github.com/readmeio/api/commit/64bb202))
* chore(deps): upgrading `@readme/httpsnippet` ([d184a14](https://github.com/readmeio/api/commit/d184a14))



## 2.6.0 (2021-02-02)

* v2.6.0 ([4cd3ed5](https://github.com/readmeio/api/commit/4cd3ed5))
* chore: rebuilding the root package-lock ([d0f8091](https://github.com/readmeio/api/commit/d0f8091))
* chore(deps-dev): bump @readme/eslint-config from 3.6.5 to 3.7.1 (#210) ([ddae88a](https://github.com/readmeio/api/commit/ddae88a)), closes [#210](https://github.com/readmeio/api/issues/210)
* chore(deps-dev): bump @readme/eslint-config from 3.7.1 to 3.8.0 (#214) ([1346192](https://github.com/readmeio/api/commit/1346192)), closes [#214](https://github.com/readmeio/api/issues/214)
* chore(deps-dev): bump @readme/eslint-config from 3.8.0 to 4.0.0 (#219) ([0741212](https://github.com/readmeio/api/commit/0741212)), closes [#219](https://github.com/readmeio/api/issues/219)
* chore(deps-dev): bump @readme/eslint-config from 4.0.0 to 4.1.0 (#229) ([608e855](https://github.com/readmeio/api/commit/608e855)), closes [#229](https://github.com/readmeio/api/issues/229)
* chore(deps-dev): bump eslint from 7.14.0 to 7.15.0 (#212) ([b340515](https://github.com/readmeio/api/commit/b340515)), closes [#212](https://github.com/readmeio/api/issues/212)
* chore(deps-dev): bump eslint from 7.15.0 to 7.16.0 (#220) ([69a0e0a](https://github.com/readmeio/api/commit/69a0e0a)), closes [#220](https://github.com/readmeio/api/issues/220)
* chore(deps-dev): bump eslint from 7.16.0 to 7.17.0 (#226) ([0bbdc05](https://github.com/readmeio/api/commit/0bbdc05)), closes [#226](https://github.com/readmeio/api/issues/226)
* chore(deps-dev): bump eslint from 7.17.0 to 7.19.0 (#234) ([0acb815](https://github.com/readmeio/api/commit/0acb815)), closes [#234](https://github.com/readmeio/api/issues/234)
* chore(deps-dev): bump husky from 4.3.0 to 4.3.6 (#217) ([571fa3f](https://github.com/readmeio/api/commit/571fa3f)), closes [#217](https://github.com/readmeio/api/issues/217)
* chore(deps-dev): bump husky from 4.3.6 to 4.3.7 (#228) ([6988708](https://github.com/readmeio/api/commit/6988708)), closes [#228](https://github.com/readmeio/api/issues/228)
* chore(deps-dev): bump husky from 4.3.7 to 4.3.8 (#238) ([82efe01](https://github.com/readmeio/api/commit/82efe01)), closes [#238](https://github.com/readmeio/api/issues/238)
* chore(deps-dev): bump nock from 13.0.5 to 13.0.7 (#235) ([9beb2ae](https://github.com/readmeio/api/commit/9beb2ae)), closes [#235](https://github.com/readmeio/api/issues/235)
* chore(deps-dev): bump prettier from 2.2.0 to 2.2.1 (#209) ([38fe2ff](https://github.com/readmeio/api/commit/38fe2ff)), closes [#209](https://github.com/readmeio/api/issues/209)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#237) ([db65c3b](https://github.com/readmeio/api/commit/db65c3b)), closes [#237](https://github.com/readmeio/api/issues/237)
* chore(deps): bump @readme/oas-to-har from 10.0.0 to 10.0.5 (#215) ([0462373](https://github.com/readmeio/api/commit/0462373)), closes [#215](https://github.com/readmeio/api/issues/215)
* chore(deps): bump @readme/oas-to-har from 11.1.0 to 11.1.2 (#236) ([611148f](https://github.com/readmeio/api/commit/611148f)), closes [#236](https://github.com/readmeio/api/issues/236)
* chore(deps): bump actions/checkout from v2.3.3 to v2.3.4 (#211) ([a88ec6c](https://github.com/readmeio/api/commit/a88ec6c)), closes [#211](https://github.com/readmeio/api/issues/211)
* chore(deps): bump actions/setup-node from v2.1.2 to v2.1.4 (#225) ([6697623](https://github.com/readmeio/api/commit/6697623)), closes [#225](https://github.com/readmeio/api/issues/225)
* chore(deps): bump ini from 1.3.5 to 1.3.8 (#232) ([17f4246](https://github.com/readmeio/api/commit/17f4246)), closes [#232](https://github.com/readmeio/api/issues/232)
* chore(deps): bump js-yaml from 3.14.0 to 3.14.1 (#218) ([a4cb9e7](https://github.com/readmeio/api/commit/a4cb9e7)), closes [#218](https://github.com/readmeio/api/issues/218)
* chore(deps): bump node-notifier from 8.0.0 to 8.0.1 in /packages/api (#224) ([c846af0](https://github.com/readmeio/api/commit/c846af0)), closes [#224](https://github.com/readmeio/api/issues/224)
* chore(deps): bump node-notifier in /packages/httpsnippet-client-api (#223) ([63fa1f9](https://github.com/readmeio/api/commit/63fa1f9)), closes [#223](https://github.com/readmeio/api/issues/223)
* chore(deps): bump oas from 10.0.0 to 10.0.1 (#233) ([af2d9fb](https://github.com/readmeio/api/commit/af2d9fb)), closes [#233](https://github.com/readmeio/api/issues/233)
* chore(deps): bump oas from 6.1.0 to 10.0.0 (#231) ([166000a](https://github.com/readmeio/api/commit/166000a)), closes [#231](https://github.com/readmeio/api/issues/231)
* ci: updating dependabot to run on a monthly schedule ([a081851](https://github.com/readmeio/api/commit/a081851))



## 2.5.0 (2020-11-27)

* v2.5.0 ([7f6622c](https://github.com/readmeio/api/commit/7f6622c))
* chore(deps-dev): bump @readme/eslint-config from 3.6.2 to 3.6.3 (#194) ([c53f2a0](https://github.com/readmeio/api/commit/c53f2a0)), closes [#194](https://github.com/readmeio/api/issues/194)
* chore(deps-dev): bump @readme/eslint-config from 3.6.3 to 3.6.5 (#204) ([accc1b3](https://github.com/readmeio/api/commit/accc1b3)), closes [#204](https://github.com/readmeio/api/issues/204)
* chore(deps-dev): bump conventional-changelog-cli from 2.1.0 to 2.1.1 (#195) ([82ec912](https://github.com/readmeio/api/commit/82ec912)), closes [#195](https://github.com/readmeio/api/issues/195)
* chore(deps-dev): bump eslint from 7.12.1 to 7.13.0 (#197) ([e4cae18](https://github.com/readmeio/api/commit/e4cae18)), closes [#197](https://github.com/readmeio/api/issues/197)
* chore(deps-dev): bump eslint from 7.13.0 to 7.14.0 (#206) ([a963391](https://github.com/readmeio/api/commit/a963391)), closes [#206](https://github.com/readmeio/api/issues/206)
* chore(deps-dev): bump jest from 26.6.1 to 26.6.3 (#199) ([64ca33f](https://github.com/readmeio/api/commit/64ca33f)), closes [#199](https://github.com/readmeio/api/issues/199)
* chore(deps-dev): bump nock from 13.0.4 to 13.0.5 (#201) ([b3d5198](https://github.com/readmeio/api/commit/b3d5198)), closes [#201](https://github.com/readmeio/api/issues/201)
* chore(deps-dev): bump prettier from 2.1.2 to 2.2.0 (#205) ([f26cf5f](https://github.com/readmeio/api/commit/f26cf5f)), closes [#205](https://github.com/readmeio/api/issues/205)
* chore(deps): bump @readme/httpsnippet from 2.2.3 to 2.3.1 (#207) ([ca2eeb0](https://github.com/readmeio/api/commit/ca2eeb0)), closes [#207](https://github.com/readmeio/api/issues/207)
* chore(deps): bump @readme/oas-to-har from 9.0.0 to 9.2.0 (#196) ([0b0f5ac](https://github.com/readmeio/api/commit/0b0f5ac)), closes [#196](https://github.com/readmeio/api/issues/196)
* chore(deps): bump @readme/oas-to-har from 9.2.0 to 9.2.2 (#202) ([a492210](https://github.com/readmeio/api/commit/a492210)), closes [#202](https://github.com/readmeio/api/issues/202)
* chore(deps): bump oas from 5.0.0 to 5.2.0 (#198) ([cb0b851](https://github.com/readmeio/api/commit/cb0b851)), closes [#198](https://github.com/readmeio/api/issues/198)
* chore(deps): upgrade oas and oas-to-har (#208) ([3daec70](https://github.com/readmeio/api/commit/3daec70)), closes [#208](https://github.com/readmeio/api/issues/208)



## <small>2.4.4 (2020-11-02)</small>

* v2.4.4 ([f040910](https://github.com/readmeio/api/commit/f040910))
* fix: adding better messaging when operations can't be found (#193) ([22b6dfd](https://github.com/readmeio/api/commit/22b6dfd)), closes [#193](https://github.com/readmeio/api/issues/193)
* chore(deps-dev): bump @readme/eslint-config from 3.6.1 to 3.6.2 (#189) ([eae818f](https://github.com/readmeio/api/commit/eae818f)), closes [#189](https://github.com/readmeio/api/issues/189)
* chore(deps-dev): bump eslint from 7.11.0 to 7.12.0 (#186) ([1661310](https://github.com/readmeio/api/commit/1661310)), closes [#186](https://github.com/readmeio/api/issues/186)
* chore(deps-dev): bump eslint from 7.12.0 to 7.12.1 (#192) ([d0d838d](https://github.com/readmeio/api/commit/d0d838d)), closes [#192](https://github.com/readmeio/api/issues/192)
* chore(deps-dev): bump jest from 26.5.3 to 26.6.1 (#188) ([e25388e](https://github.com/readmeio/api/commit/e25388e)), closes [#188](https://github.com/readmeio/api/issues/188)
* chore(deps): bump @readme/httpsnippet from 2.2.2 to 2.2.3 (#187) ([530fa45](https://github.com/readmeio/api/commit/530fa45)), closes [#187](https://github.com/readmeio/api/issues/187)
* chore(deps): bump @readme/oas-to-har from 8.1.0 to 9.0.0 (#191) ([f50bbb0](https://github.com/readmeio/api/commit/f50bbb0)), closes [#191](https://github.com/readmeio/api/issues/191)
* chore(deps): bump actions/setup-node from v2.1.1 to v2.1.2 (#190) ([f4745f9](https://github.com/readmeio/api/commit/f4745f9)), closes [#190](https://github.com/readmeio/api/issues/190)



## <small>2.4.3 (2020-10-21)</small>

* v2.4.3 ([621ed10](https://github.com/readmeio/api/commit/621ed10))
* chore(deps): upgrading @readme/oas-to-har to 8.1.0 ([f2d3af7](https://github.com/readmeio/api/commit/f2d3af7))
* chore(deps): upgrading oas to 5.0 ([0351595](https://github.com/readmeio/api/commit/0351595))



## <small>2.4.2 (2020-10-21)</small>

* v2.4.2 ([d707575](https://github.com/readmeio/api/commit/d707575))
* fix: pinning httpsnippet-client-api to oas@4.0.0 ([29af3be](https://github.com/readmeio/api/commit/29af3be))



## <small>2.4.1 (2020-10-20)</small>

* v2.4.1 ([3a49483](https://github.com/readmeio/api/commit/3a49483))
* chore(deps-dev): bump @readme/eslint-config from 3.6.0 to 3.6.1 (#183) ([33996b0](https://github.com/readmeio/api/commit/33996b0)), closes [#183](https://github.com/readmeio/api/issues/183)
* chore(deps): bump @readme/oas-to-har from 7.5.0 to 8.0.1 (#182) ([a2052bb](https://github.com/readmeio/api/commit/a2052bb)), closes [#182](https://github.com/readmeio/api/issues/182)
* chore(deps): bump @readme/oas-tooling from 3.6.0 to 3.6.1 (#184) ([3d86be9](https://github.com/readmeio/api/commit/3d86be9)), closes [#184](https://github.com/readmeio/api/issues/184)
* chore(deps): swapping `@readme/oas-tooling` for `oas` (#185) ([d9ced1c](https://github.com/readmeio/api/commit/d9ced1c)), closes [#185](https://github.com/readmeio/api/issues/185)



## 2.4.0 (2020-10-16)

* v2.4.0 ([2d65241](https://github.com/readmeio/api/commit/2d65241))
* chore: test cleanup (#181) ([1fe0e95](https://github.com/readmeio/api/commit/1fe0e95)), closes [#181](https://github.com/readmeio/api/issues/181)
* fix: adding support for non-alphanumerical operation ids (#180) ([fd075a0](https://github.com/readmeio/api/commit/fd075a0)), closes [#180](https://github.com/readmeio/api/issues/180)
* fix: basic auth headers now decoded and exploded into `.auth()` calls (#179) ([2351b95](https://github.com/readmeio/api/commit/2351b95)), closes [#179](https://github.com/readmeio/api/issues/179)



## <small>2.3.3 (2020-10-15)</small>

* v2.3.3 ([17b475b](https://github.com/readmeio/api/commit/17b475b))
* fix: adding a `.catch()` statement to code snippets (#177) ([d7c8613](https://github.com/readmeio/api/commit/d7c8613)), closes [#177](https://github.com/readmeio/api/issues/177)
* chore(deps-dev): bump @readme/eslint-config from 3.5.0 to 3.6.0 (#173) ([9f8d0f2](https://github.com/readmeio/api/commit/9f8d0f2)), closes [#173](https://github.com/readmeio/api/issues/173)
* chore(deps-dev): bump @readme/oas-examples from 3.5.13 to 3.6.0 (#174) ([9c4b118](https://github.com/readmeio/api/commit/9c4b118)), closes [#174](https://github.com/readmeio/api/issues/174)
* chore(deps-dev): bump eslint from 7.10.0 to 7.11.0 (#175) ([be9393f](https://github.com/readmeio/api/commit/be9393f)), closes [#175](https://github.com/readmeio/api/issues/175)
* chore(deps-dev): bump jest from 26.4.2 to 26.5.3 (#171) ([b4cbc9f](https://github.com/readmeio/api/commit/b4cbc9f)), closes [#171](https://github.com/readmeio/api/issues/171)
* chore(deps): bump @readme/oas-to-har from 7.3.0 to 7.5.0 (#170) ([f26bb01](https://github.com/readmeio/api/commit/f26bb01)), closes [#170](https://github.com/readmeio/api/issues/170)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.14 (#169) ([524915a](https://github.com/readmeio/api/commit/524915a)), closes [#169](https://github.com/readmeio/api/issues/169)
* chore(deps): bump @readme/oas-tooling from 3.5.14 to 3.6.0 (#172) ([6bd2fb3](https://github.com/readmeio/api/commit/6bd2fb3)), closes [#172](https://github.com/readmeio/api/issues/172)



## <small>2.3.2 (2020-10-05)</small>

* v2.3.2 ([627cb28](https://github.com/readmeio/api/commit/627cb28))
* chore(deps-dev): bump @commitlint/cli from 9.1.2 to 11.0.0 (#158) ([a068e8f](https://github.com/readmeio/api/commit/a068e8f)), closes [#158](https://github.com/readmeio/api/issues/158)
* chore(deps-dev): bump @commitlint/config-conventional (#159) ([c084c27](https://github.com/readmeio/api/commit/c084c27)), closes [#159](https://github.com/readmeio/api/issues/159)
* chore(deps-dev): bump @readme/eslint-config from 3.4.2 to 3.4.3 (#155) ([efb446e](https://github.com/readmeio/api/commit/efb446e)), closes [#155](https://github.com/readmeio/api/issues/155)
* chore(deps-dev): bump @readme/eslint-config from 3.4.3 to 3.5.0 (#161) ([68d69ee](https://github.com/readmeio/api/commit/68d69ee)), closes [#161](https://github.com/readmeio/api/issues/161)
* chore(deps-dev): bump @readme/oas-examples from 3.5.5 to 3.5.13 (#164) ([1f5d2f1](https://github.com/readmeio/api/commit/1f5d2f1)), closes [#164](https://github.com/readmeio/api/issues/164)
* chore(deps-dev): bump eslint from 7.8.1 to 7.9.0 (#157) ([3f04da5](https://github.com/readmeio/api/commit/3f04da5)), closes [#157](https://github.com/readmeio/api/issues/157)
* chore(deps-dev): bump eslint from 7.9.0 to 7.10.0 (#166) ([d021965](https://github.com/readmeio/api/commit/d021965)), closes [#166](https://github.com/readmeio/api/issues/166)
* chore(deps-dev): bump husky from 4.2.5 to 4.3.0 (#160) ([54c9c0c](https://github.com/readmeio/api/commit/54c9c0c)), closes [#160](https://github.com/readmeio/api/issues/160)
* chore(deps-dev): bump prettier from 2.1.1 to 2.1.2 (#162) ([6d31ded](https://github.com/readmeio/api/commit/6d31ded)), closes [#162](https://github.com/readmeio/api/issues/162)
* chore(deps): bump @readme/oas-to-har from 7.2.1 to 7.3.0 (#163) ([5a915ca](https://github.com/readmeio/api/commit/5a915ca)), closes [#163](https://github.com/readmeio/api/issues/163)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.13 (#165) ([5b8cd08](https://github.com/readmeio/api/commit/5b8cd08)), closes [#165](https://github.com/readmeio/api/issues/165)
* chore(deps): bump actions/checkout from v2.3.2 to v2.3.3 (#167) ([3f12362](https://github.com/readmeio/api/commit/3f12362)), closes [#167](https://github.com/readmeio/api/issues/167)
* chore(deps): bump fetch-har from 4.0.1 to 4.0.2 (#156) ([2c3314e](https://github.com/readmeio/api/commit/2c3314e)), closes [#156](https://github.com/readmeio/api/issues/156)
* chore(deps): bump path-to-regexp from 6.1.0 to 6.2.0 (#168) ([7ccf66c](https://github.com/readmeio/api/commit/7ccf66c)), closes [#168](https://github.com/readmeio/api/issues/168)



## <small>2.3.1 (2020-09-08)</small>

* v2.3.1 ([be10f84](https://github.com/readmeio/api/commit/be10f84))
* fix: if no cache dir is determined, fallback to the os temp dir (#154) ([e0525f0](https://github.com/readmeio/api/commit/e0525f0)), closes [#154](https://github.com/readmeio/api/issues/154) [#107](https://github.com/readmeio/api/issues/107)
* chore(deps-dev): bump @readme/eslint-config from 3.4.1 to 3.4.2 (#144) ([5e7bc96](https://github.com/readmeio/api/commit/5e7bc96)), closes [#144](https://github.com/readmeio/api/issues/144)
* chore(deps-dev): bump eslint from 7.7.0 to 7.8.1 (#152) ([be44467](https://github.com/readmeio/api/commit/be44467)), closes [#152](https://github.com/readmeio/api/issues/152)
* chore(deps-dev): bump jest from 26.4.0 to 26.4.2 (#143) ([831d12c](https://github.com/readmeio/api/commit/831d12c)), closes [#143](https://github.com/readmeio/api/issues/143)
* chore(deps-dev): bump mock-fs from 4.12.0 to 4.13.0 (#145) ([69a87fa](https://github.com/readmeio/api/commit/69a87fa)), closes [#145](https://github.com/readmeio/api/issues/145)
* chore(deps-dev): bump prettier from 2.0.5 to 2.1.1 (#147) ([565939e](https://github.com/readmeio/api/commit/565939e)), closes [#147](https://github.com/readmeio/api/issues/147)
* chore(deps): bump @readme/httpsnippet from 2.0.1 to 2.1.1 (#148) ([4046808](https://github.com/readmeio/api/commit/4046808)), closes [#148](https://github.com/readmeio/api/issues/148)
* chore(deps): bump @readme/oas-to-har from 7.0.0 to 7.2.0 (#146) ([53a08a5](https://github.com/readmeio/api/commit/53a08a5)), closes [#146](https://github.com/readmeio/api/issues/146)
* chore(deps): bump @readme/oas-to-har from 7.2.0 to 7.2.1 (#153) ([7368d93](https://github.com/readmeio/api/commit/7368d93)), closes [#153](https://github.com/readmeio/api/issues/153)
* chore(deps): bump @readme/oas-tooling from 3.5.8 to 3.5.11 (#149) ([845e147](https://github.com/readmeio/api/commit/845e147)), closes [#149](https://github.com/readmeio/api/issues/149)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#151) ([d740da5](https://github.com/readmeio/api/commit/d740da5)), closes [#151](https://github.com/readmeio/api/issues/151)
* chore(deps): update actions/checkout requirement to v2.3.2 (#150) ([aacc532](https://github.com/readmeio/api/commit/aacc532)), closes [#150](https://github.com/readmeio/api/issues/150)



## 2.3.0 (2020-08-17)

* v2.3.0 ([bb65e11](https://github.com/readmeio/api/commit/bb65e11))
* feat: support multipart/form-data (#132) ([8f28341](https://github.com/readmeio/api/commit/8f28341)), closes [#132](https://github.com/readmeio/api/issues/132)
* chore(deps-dev): bump @commitlint/cli from 9.1.1 to 9.1.2 (#142) ([a4f70bf](https://github.com/readmeio/api/commit/a4f70bf)), closes [#142](https://github.com/readmeio/api/issues/142)
* chore(deps-dev): bump @commitlint/config-conventional (#138) ([125a08a](https://github.com/readmeio/api/commit/125a08a)), closes [#138](https://github.com/readmeio/api/issues/138)
* chore(deps-dev): bump @readme/eslint-config from 3.4.0 to 3.4.1 (#133) ([d65621b](https://github.com/readmeio/api/commit/d65621b)), closes [#133](https://github.com/readmeio/api/issues/133)
* chore(deps-dev): bump conventional-changelog-cli from 2.0.34 to 2.1.0 (#134) ([432dba7](https://github.com/readmeio/api/commit/432dba7)), closes [#134](https://github.com/readmeio/api/issues/134)
* chore(deps-dev): bump eslint from 7.6.0 to 7.7.0 (#137) ([baf6fe0](https://github.com/readmeio/api/commit/baf6fe0)), closes [#137](https://github.com/readmeio/api/issues/137)
* chore(deps-dev): bump jest from 26.2.2 to 26.4.0 (#141) ([16bc760](https://github.com/readmeio/api/commit/16bc760)), closes [#141](https://github.com/readmeio/api/issues/141)
* chore(deps-dev): bump nock from 13.0.3 to 13.0.4 (#135) ([34f7cf7](https://github.com/readmeio/api/commit/34f7cf7)), closes [#135](https://github.com/readmeio/api/issues/135)
* chore(deps-dev): upgrading @readme/eslint-config and eslint ([992651c](https://github.com/readmeio/api/commit/992651c))
* chore(deps): bump @readme/oas-to-har from 6.15.2 to 6.16.1 (#139) ([47db45a](https://github.com/readmeio/api/commit/47db45a)), closes [#139](https://github.com/readmeio/api/issues/139)
* chore(deps): bump @readme/oas-tooling from 3.5.6 to 3.5.8 (#136) ([4416c87](https://github.com/readmeio/api/commit/4416c87)), closes [#136](https://github.com/readmeio/api/issues/136)



## <small>2.2.3 (2020-08-03)</small>

* v2.2.3 ([3b20492](https://github.com/readmeio/api/commit/3b20492))
* fix: auth keys not being properly escaped (#129) ([b0923eb](https://github.com/readmeio/api/commit/b0923eb)), closes [#129](https://github.com/readmeio/api/issues/129)



## <small>2.2.2 (2020-08-03)</small>

* v2.2.2 ([6efa4e0](https://github.com/readmeio/api/commit/6efa4e0))
* ci: setting up codeql workflows (#127) ([62707be](https://github.com/readmeio/api/commit/62707be)), closes [#127](https://github.com/readmeio/api/issues/127)
* chore(deps-dev): bump @readme/eslint-config from 3.3.3 to 3.4.0 (#121) ([f393edc](https://github.com/readmeio/api/commit/f393edc)), closes [#121](https://github.com/readmeio/api/issues/121)
* chore(deps-dev): bump eslint from 7.5.0 to 7.6.0 (#122) ([0eb173b](https://github.com/readmeio/api/commit/0eb173b)), closes [#122](https://github.com/readmeio/api/issues/122)
* chore(deps-dev): bump jest from 26.1.0 to 26.2.2 (#126) ([4229c34](https://github.com/readmeio/api/commit/4229c34)), closes [#126](https://github.com/readmeio/api/issues/126)
* chore(deps-dev): bump nock from 13.0.2 to 13.0.3 (#125) ([fcc2d45](https://github.com/readmeio/api/commit/fcc2d45)), closes [#125](https://github.com/readmeio/api/issues/125)
* chore(deps): bump @readme/oas-to-har from 6.14.0 to 6.15.2 (#123) ([c6203a6](https://github.com/readmeio/api/commit/c6203a6)), closes [#123](https://github.com/readmeio/api/issues/123)
* chore(deps): bump @readme/oas-tooling from 3.5.5 to 3.5.6 (#124) ([1c179d8](https://github.com/readmeio/api/commit/1c179d8)), closes [#124](https://github.com/readmeio/api/issues/124)
* chore(deps): bump actions/setup-node from v2.1.0 to v2.1.1 (#120) ([6b915cf](https://github.com/readmeio/api/commit/6b915cf)), closes [#120](https://github.com/readmeio/api/issues/120)



## <small>2.2.1 (2020-07-27)</small>

* v2.2.1 ([09667db](https://github.com/readmeio/api/commit/09667db))
* chore: cleaning up the package-lock ([7d4ec59](https://github.com/readmeio/api/commit/7d4ec59))
* chore(deps-dev): bump @commitlint/cli from 9.0.1 to 9.1.1 (#109) ([7f0eaec](https://github.com/readmeio/api/commit/7f0eaec)), closes [#109](https://github.com/readmeio/api/issues/109)
* chore(deps-dev): bump @commitlint/config-conventional (#116) ([ee0f79c](https://github.com/readmeio/api/commit/ee0f79c)), closes [#116](https://github.com/readmeio/api/issues/116)
* chore(deps-dev): bump @readme/eslint-config from 3.3.2 to 3.3.3 (#118) ([963a235](https://github.com/readmeio/api/commit/963a235)), closes [#118](https://github.com/readmeio/api/issues/118)
* chore(deps-dev): bump @readme/oas-examples from 3.4.0 to 3.5.5 (#113) ([a7b4561](https://github.com/readmeio/api/commit/a7b4561)), closes [#113](https://github.com/readmeio/api/issues/113)
* chore(deps-dev): bump eslint from 7.4.0 to 7.5.0 (#110) ([cd29a03](https://github.com/readmeio/api/commit/cd29a03)), closes [#110](https://github.com/readmeio/api/issues/110)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#115) ([a129798](https://github.com/readmeio/api/commit/a129798)), closes [#115](https://github.com/readmeio/api/issues/115)
* chore(deps): bump @apidevtools/swagger-parser from 9.0.1 to 10.0.1 (#112) ([a3aed98](https://github.com/readmeio/api/commit/a3aed98)), closes [#112](https://github.com/readmeio/api/issues/112)
* chore(deps): bump @readme/oas-tooling from 3.5.0 to 3.5.5 (#111) ([5621fad](https://github.com/readmeio/api/commit/5621fad)), closes [#111](https://github.com/readmeio/api/issues/111)
* chore(deps): bump fetch-har from 3.0.0 to 3.0.2 (#114) ([41efd8b](https://github.com/readmeio/api/commit/41efd8b)), closes [#114](https://github.com/readmeio/api/issues/114)
* chore(deps): bump httpsnippet from 1.20.0 to 1.21.0 (#117) ([e5d5082](https://github.com/readmeio/api/commit/e5d5082)), closes [#117](https://github.com/readmeio/api/issues/117)
* chore(deps): bump lodash from 4.17.15 to 4.17.19 (#108) ([9d4c12a](https://github.com/readmeio/api/commit/9d4c12a)), closes [#108](https://github.com/readmeio/api/issues/108)



## 2.2.0 (2020-07-13)

* v2.2.0 ([fa9fa64](https://github.com/readmeio/api/commit/fa9fa64))
* feat: automatically reject the sdk promise for error statuses (#105) ([827f32a](https://github.com/readmeio/api/commit/827f32a)), closes [#105](https://github.com/readmeio/api/issues/105)
* feat: setting a custom user agent for all requests (#106) ([25cefef](https://github.com/readmeio/api/commit/25cefef)), closes [#106](https://github.com/readmeio/api/issues/106)



## <small>2.1.6 (2020-07-06)</small>

* v2.1.6 ([cc67a0c](https://github.com/readmeio/api/commit/cc67a0c))
* chore(deps-dev): bump @commitlint/cli from 8.3.5 to 9.0.1 (#87) ([5e99252](https://github.com/readmeio/api/commit/5e99252)), closes [#87](https://github.com/readmeio/api/issues/87)
* chore(deps-dev): bump @commitlint/config-conventional (#88) ([a08be1f](https://github.com/readmeio/api/commit/a08be1f)), closes [#88](https://github.com/readmeio/api/issues/88)
* chore(deps-dev): bump @readme/eslint-config from 3.2.0 to 3.3.0 (#90) ([7c286ac](https://github.com/readmeio/api/commit/7c286ac)), closes [#90](https://github.com/readmeio/api/issues/90)
* chore(deps-dev): bump @readme/eslint-config from 3.3.0 to 3.3.2 (#99) ([038e6e2](https://github.com/readmeio/api/commit/038e6e2)), closes [#99](https://github.com/readmeio/api/issues/99)
* chore(deps-dev): bump eslint from 7.2.0 to 7.3.1 (#93) ([d96b2c9](https://github.com/readmeio/api/commit/d96b2c9)), closes [#93](https://github.com/readmeio/api/issues/93)
* chore(deps-dev): bump eslint from 7.3.1 to 7.4.0 (#95) ([a1d7eed](https://github.com/readmeio/api/commit/a1d7eed)), closes [#95](https://github.com/readmeio/api/issues/95)
* chore(deps-dev): bump jest from 26.0.1 to 26.1.0 (#92) ([c388924](https://github.com/readmeio/api/commit/c388924)), closes [#92](https://github.com/readmeio/api/issues/92)
* chore(deps-dev): bump nock from 12.0.3 to 13.0.0 (#91) ([52c9202](https://github.com/readmeio/api/commit/52c9202)), closes [#91](https://github.com/readmeio/api/issues/91)
* chore(deps-dev): bump nock from 13.0.0 to 13.0.2 (#97) ([cafd323](https://github.com/readmeio/api/commit/cafd323)), closes [#97](https://github.com/readmeio/api/issues/97)
* chore(deps): bump @readme/oas-to-har from 6.10.2 to 6.11.1 (#85) ([0d0c59e](https://github.com/readmeio/api/commit/0d0c59e)), closes [#85](https://github.com/readmeio/api/issues/85)
* chore(deps): bump @readme/oas-to-har from 6.11.1 to 6.14.0 (#98) ([a3b7b7d](https://github.com/readmeio/api/commit/a3b7b7d)), closes [#98](https://github.com/readmeio/api/issues/98)
* chore(deps): bump @readme/oas-tooling from 3.4.5 to 3.4.7 (#83) ([c341070](https://github.com/readmeio/api/commit/c341070)), closes [#83](https://github.com/readmeio/api/issues/83)
* chore(deps): bump @readme/oas-tooling from 3.4.7 to 3.5.0 (#96) ([32aa6d5](https://github.com/readmeio/api/commit/32aa6d5)), closes [#96](https://github.com/readmeio/api/issues/96)
* chore(deps): bump actions/checkout from v2.2.0 to v2.3.1 (#89) ([51d9be7](https://github.com/readmeio/api/commit/51d9be7)), closes [#89](https://github.com/readmeio/api/issues/89)
* chore(deps): bump actions/setup-node from v2.0.0 to v2.1.0 (#94) ([d5a18ce](https://github.com/readmeio/api/commit/d5a18ce)), closes [#94](https://github.com/readmeio/api/issues/94)
* chore(deps): bump fetch-har from 2.3.2 to 3.0.0 (#100) ([6fbe358](https://github.com/readmeio/api/commit/6fbe358)), closes [#100](https://github.com/readmeio/api/issues/100)
* feat: cleaning up api snippets by breaking off the auth call (#101) ([d76ba9e](https://github.com/readmeio/api/commit/d76ba9e)), closes [#101](https://github.com/readmeio/api/issues/101)
* docs: cleaning up the pr template ([6539d14](https://github.com/readmeio/api/commit/6539d14))
* ci: changing the label that dependabot uses ([57917ce](https://github.com/readmeio/api/commit/57917ce))



## <small>2.1.5 (2020-06-19)</small>

* v2.1.5 ([e5bfdca](https://github.com/readmeio/api/commit/e5bfdca))
* build: some more attempts at changelog improvements ([ddcb46d](https://github.com/readmeio/api/commit/ddcb46d))
* chore(deps): upgrading @readme/oas-tooling to 3.4.7 (#82) ([1e19988](https://github.com/readmeio/api/commit/1e19988)), closes [#82](https://github.com/readmeio/api/issues/82)
* docs: changelog typo resolutions ([cbd7862](https://github.com/readmeio/api/commit/cbd7862))



## <small>2.1.4 (2020-06-19)</small>

* v2.1.4 ([386d713](https://github.com/readmeio/api/commit/386d713))
* build: setting an empty version in the root package file for changelogs ([f7e5db6](https://github.com/readmeio/api/commit/f7e5db6))
* fix: minor cleanup and clarification on the fix in 996da5b ([8fbe624](https://github.com/readmeio/api/commit/8fbe624))
* docs: fixing a typo in the changelog ([996da5b](https://github.com/readmeio/api/commit/996da5b))



## <small>2.1.3 (2020-06-19)</small>

* v2.1.3 ([33fc797](https://github.com/readmeio/api/commit/33fc797))
* build: working to get changelogs automatically updated ([074cbb8](https://github.com/readmeio/api/commit/074cbb8))
* fix: issues where path params wouldn't always get added as metadata (#80) ([5215366](https://github.com/readmeio/api/commit/5215366)), closes [#80](https://github.com/readmeio/api/issues/80)
* docs: updating the changelog ([27e23c4](https://github.com/readmeio/api/commit/27e23c4))



## <small>2.1.2 (2020-06-18)</small>

* v2.1.2 ([22dec18](https://github.com/readmeio/api/commit/22dec18))
* fix: bug where path params wouldn't be included in snippets (#79) ([719e2e0](https://github.com/readmeio/api/commit/719e2e0)), closes [#79](https://github.com/readmeio/api/issues/79)
* docs: updating the changelog ([aad2cf4](https://github.com/readmeio/api/commit/aad2cf4))



## <small>2.1.1 (2020-06-17)</small>

* v2.1.1 ([e855892](https://github.com/readmeio/api/commit/e855892))
* fix: snippet paths should not include the server url (#77) ([a812f0b](https://github.com/readmeio/api/commit/a812f0b)), closes [#77](https://github.com/readmeio/api/issues/77)
* chore(deps-dev): bump lerna from 3.22.0 to 3.22.1 (#74) ([7c270c2](https://github.com/readmeio/api/commit/7c270c2)), closes [#74](https://github.com/readmeio/api/issues/74)
* chore(deps): bump @readme/oas-to-har from 6.10.0 to 6.10.2 (#73) ([1b4568c](https://github.com/readmeio/api/commit/1b4568c)), closes [#73](https://github.com/readmeio/api/issues/73)
* chore(deps): bump @readme/oas-tooling from 3.4.3 to 3.4.5 (#75) ([05e5204](https://github.com/readmeio/api/commit/05e5204)), closes [#75](https://github.com/readmeio/api/issues/75)



## 2.1.0 (2020-06-12)

* v2.1.0 ([3802a50](https://github.com/readmeio/api/commit/3802a50))
* fix: relative paths in parent parent directories not being supported (#67) ([dba888b](https://github.com/readmeio/api/commit/dba888b)), closes [#67](https://github.com/readmeio/api/issues/67)
* fix: various code snippet issues and deficiencies (#72) ([c5e4eeb](https://github.com/readmeio/api/commit/c5e4eeb)), closes [#72](https://github.com/readmeio/api/issues/72)
* chore: configuring dependabot to also update our github actions ([e8a90ea](https://github.com/readmeio/api/commit/e8a90ea))
* chore: moving off our httpsnippet fork and to v1.20.x (#64) ([45b0e2a](https://github.com/readmeio/api/commit/45b0e2a)), closes [#64](https://github.com/readmeio/api/issues/64)
* chore(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#57) ([2d4fa96](https://github.com/readmeio/api/commit/2d4fa96)), closes [#57](https://github.com/readmeio/api/issues/57)
* chore(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#63) ([919bdd9](https://github.com/readmeio/api/commit/919bdd9)), closes [#63](https://github.com/readmeio/api/issues/63)
* chore(deps-dev): upgrading @readme/eslint-config to 3.2.0 (#70) ([3b26c2e](https://github.com/readmeio/api/commit/3b26c2e)), closes [#70](https://github.com/readmeio/api/issues/70)
* chore(deps): bump @readme/oas-to-har from 6.9.6 to 6.10.0 (#59) ([9ef271a](https://github.com/readmeio/api/commit/9ef271a)), closes [#59](https://github.com/readmeio/api/issues/59)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#54) ([b58e8e3](https://github.com/readmeio/api/commit/b58e8e3)), closes [#54](https://github.com/readmeio/api/issues/54)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#58) ([f66cae2](https://github.com/readmeio/api/commit/f66cae2)), closes [#58](https://github.com/readmeio/api/issues/58)
* chore(deps): bump actions/checkout from v1 to v2.2.0 (#65) ([47d99e4](https://github.com/readmeio/api/commit/47d99e4)), closes [#65](https://github.com/readmeio/api/issues/65)
* chore(deps): bump actions/setup-node from v1 to v2.0.0 (#66) ([6a46c6c](https://github.com/readmeio/api/commit/6a46c6c)), closes [#66](https://github.com/readmeio/api/issues/66)
* chore(deps): bump fetch-har from 2.3.1 to 2.3.2 (#60) ([1a1ebe7](https://github.com/readmeio/api/commit/1a1ebe7)), closes [#60](https://github.com/readmeio/api/issues/60)
* chore(deps): swapping yaml for js-yaml (#69) ([fc04a9f](https://github.com/readmeio/api/commit/fc04a9f)), closes [#69](https://github.com/readmeio/api/issues/69)
* feat: adding test cases for supporting unchained auth usage (#68) ([0a73b49](https://github.com/readmeio/api/commit/0a73b49)), closes [#68](https://github.com/readmeio/api/issues/68)
* style: updating dependabot to follow our commit standards ([b6a29be](https://github.com/readmeio/api/commit/b6a29be))
* ci: changing the dep update frequency to weekly ([285d042](https://github.com/readmeio/api/commit/285d042))
* ci: create Dependabot config file (#56) ([38110a0](https://github.com/readmeio/api/commit/38110a0)), closes [#56](https://github.com/readmeio/api/issues/56)



## <small>2.0.2 (2020-05-30)</small>

* Bump eslint from 7.0.0 to 7.1.0 (#48) ([fcd657b](https://github.com/readmeio/api/commit/fcd657b)), closes [#48](https://github.com/readmeio/api/issues/48)
* Bump jest from 25.5.4 to 26.0.1 (#46) ([adf39a1](https://github.com/readmeio/api/commit/adf39a1)), closes [#46](https://github.com/readmeio/api/issues/46)
* Bump yaml from 1.9.2 to 1.10.0 (#45) ([26d3edd](https://github.com/readmeio/api/commit/26d3edd)), closes [#45](https://github.com/readmeio/api/issues/45)
* v2.0.2 ([c504232](https://github.com/readmeio/api/commit/c504232))
* chore: moving the repository over to a monorepo directory tree (#51) ([a82fcdd](https://github.com/readmeio/api/commit/a82fcdd)), closes [#51](https://github.com/readmeio/api/issues/51)
* chore: setting the base lerna version to the current version ([063a449](https://github.com/readmeio/api/commit/063a449))
* feat: HTTP Snippet client for Node samples (#52) ([cf72740](https://github.com/readmeio/api/commit/cf72740)), closes [#52](https://github.com/readmeio/api/issues/52)
* docs: updating our CoC enforcement email address ([5609db4](https://github.com/readmeio/api/commit/5609db4))



## <small>2.0.1 (2020-05-26)</small>

* build: 2.0.1 release ([e663a9c](https://github.com/readmeio/api/commit/e663a9c))
* fix(package.main): specify the entry point file (#50) ([05727c4](https://github.com/readmeio/api/commit/05727c4)), closes [#50](https://github.com/readmeio/api/issues/50)



## 2.0.0 (2020-05-21)

* build: 2.0.0 release ([7b66318](https://github.com/readmeio/api/commit/7b66318))
* docs: adding a changelog and enforcing commit styles (#44) ([cc07150](https://github.com/readmeio/api/commit/cc07150)), closes [#44](https://github.com/readmeio/api/issues/44)
* docs: adding a code of conduct and contribution guide ([f023b41](https://github.com/readmeio/api/commit/f023b41))
* SDK Generation (#28) ([adab436](https://github.com/readmeio/api/commit/adab436)), closes [#28](https://github.com/readmeio/api/issues/28)
* chore: pulling over our common pull request template ([609c1ba](https://github.com/readmeio/api/commit/609c1ba))
* chore: relicensing under the MIT license ([5253c44](https://github.com/readmeio/api/commit/5253c44))
* chore: wiping the slate clean for a rewrite (#27) ([a27e006](https://github.com/readmeio/api/commit/a27e006)), closes [#27](https://github.com/readmeio/api/issues/27)



## 1.0.0 (2018-01-20)

* 1.0.0 ([083dd18](https://github.com/readmeio/api/commit/083dd18))
* Add babel compilation on prepublish ([afca7ca](https://github.com/readmeio/api/commit/afca7ca))
* Add output functionality (#24) ([617aa52](https://github.com/readmeio/api/commit/617aa52)), closes [#24](https://github.com/readmeio/api/issues/24)
* Bugfix/incorrect wrap (#25) ([645b6e9](https://github.com/readmeio/api/commit/645b6e9)), closes [#25](https://github.com/readmeio/api/issues/25)
* Build the src using babel pre-test for non watching mocha ([ff0b488](https://github.com/readmeio/api/commit/ff0b488))
* Fix local linking ([a68e514](https://github.com/readmeio/api/commit/a68e514))
* Move all code into src/ folder ([1ed313d](https://github.com/readmeio/api/commit/1ed313d))
* Run tests from dist/ to make sure babel has done it's job properly ([61dd4d0](https://github.com/readmeio/api/commit/61dd4d0))
* Support sending files to build services (#23) ([1213368](https://github.com/readmeio/api/commit/1213368)), closes [#23](https://github.com/readmeio/api/issues/23)
* Turn off babel module transformation ([6b47c7d](https://github.com/readmeio/api/commit/6b47c7d)), closes [/github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js#L71](https://github.com//github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js/issues/L71)



## 1.0.0-8 (2017-09-25)

* 1.0.0-8 ([e0de537](https://github.com/readmeio/api/commit/e0de537))
* Add circleci badge to the readme ([8f1d813](https://github.com/readmeio/api/commit/8f1d813))
* Clean up error messages by not showing error stack ([a672245](https://github.com/readmeio/api/commit/a672245))



## 1.0.0-7 (2017-09-21)

* 1.0.0-7 ([17c39ee](https://github.com/readmeio/api/commit/17c39ee))
* Add code coverage to codeclimate ([95b49f0](https://github.com/readmeio/api/commit/95b49f0))
* Fix bug with deploying private services ([550ac03](https://github.com/readmeio/api/commit/550ac03))
* Remove secrets from api help ([00f8b20](https://github.com/readmeio/api/commit/00f8b20))



## 1.0.0-6 (2017-09-07)

* 1.0.0-6 ([9ac6a7a](https://github.com/readmeio/api/commit/9ac6a7a))
* Fix spacing for init ([df5596d](https://github.com/readmeio/api/commit/df5596d))



## 1.0.0-5 (2017-09-07)

* 1.0.0-5 ([db451aa](https://github.com/readmeio/api/commit/db451aa))
* Ask to create new directory if api init is run with files already existing ([1367246](https://github.com/readmeio/api/commit/1367246))



## 1.0.0-4 (2017-09-05)

* 1.0.0-4 ([c3b875f](https://github.com/readmeio/api/commit/c3b875f))
* Add metadata to package.json ([dbe5de6](https://github.com/readmeio/api/commit/dbe5de6))



## 1.0.0-3 (2017-09-05)

* 1.0.0-3 ([6ac40df](https://github.com/readmeio/api/commit/6ac40df))
* Add docs and fix tests ([b11804f](https://github.com/readmeio/api/commit/b11804f))
* Add message if they try to deploy without editing comments ([235e2bc](https://github.com/readmeio/api/commit/235e2bc))
* Add nicer message if they need to upgrade to do something ([d5981e0](https://github.com/readmeio/api/commit/d5981e0))
* Add test ([c62190f](https://github.com/readmeio/api/commit/c62190f))
* Add warning private services requires paid plan ([8b4bc2b](https://github.com/readmeio/api/commit/8b4bc2b))
* Added tests ([a933796](https://github.com/readmeio/api/commit/a933796))
* Clean code up ([f76b1b5](https://github.com/readmeio/api/commit/f76b1b5))
* cleanup ([8cad8ce](https://github.com/readmeio/api/commit/8cad8ce))
* Don't need imports in tests anymore ([f08bbf8](https://github.com/readmeio/api/commit/f08bbf8))
* Don't need this since we are loading from the home directory ([2f52e88](https://github.com/readmeio/api/commit/2f52e88))
* Fix bug where linked service was always used, even without running `api link service` ([5273229](https://github.com/readmeio/api/commit/5273229))
* Fixes if no comments exist at all ([50a0974](https://github.com/readmeio/api/commit/50a0974))
* link -> unlink ([0d7fee3](https://github.com/readmeio/api/commit/0d7fee3))
* Make sure shared directory exists first ([986cdf3](https://github.com/readmeio/api/commit/986cdf3))
* Refactor `api link` to use a folder in the home directory ([18aefa3](https://github.com/readmeio/api/commit/18aefa3))
* Update build-docs ([5f8ba74](https://github.com/readmeio/api/commit/5f8ba74))
* update test ([e0badd4](https://github.com/readmeio/api/commit/e0badd4))
* Update to circleci2 ([1fbb21c](https://github.com/readmeio/api/commit/1fbb21c))
* Use home directory for login cookie ([1af5fa8](https://github.com/readmeio/api/commit/1af5fa8))



## 1.0.0-2 (2017-08-23)

* 1.0.0-2 ([07d0e9d](https://github.com/readmeio/api/commit/07d0e9d))
* Another readme fix ([7045e38](https://github.com/readmeio/api/commit/7045e38))
* Make sure we tell them to edit the file in endpoints/ ([722211f](https://github.com/readmeio/api/commit/722211f))
* Whoops. Removing more not needed readme stuff ([0765446](https://github.com/readmeio/api/commit/0765446))



## 1.0.0-1 (2017-08-23)

* 1.0.0-1 ([70eaf91](https://github.com/readmeio/api/commit/70eaf91))
* Update readme. Remove api.create stuff ([81f5cb9](https://github.com/readmeio/api/commit/81f5cb9))



## 1.0.0-0 (2017-08-23)

* 1.0.0-0 ([2761be6](https://github.com/readmeio/api/commit/2761be6))
* Action -> Endpoint ([c2a959d](https://github.com/readmeio/api/commit/c2a959d))
* Add a default to the generated code ([56541cf](https://github.com/readmeio/api/commit/56541cf))
* Add a way to see your keys ([a858e3b](https://github.com/readmeio/api/commit/a858e3b))
* Add higher coverage thresholds ([6b0c2ff](https://github.com/readmeio/api/commit/6b0c2ff))
* bump ([d2a91b6](https://github.com/readmeio/api/commit/d2a91b6))
* Bump ([5aa6879](https://github.com/readmeio/api/commit/5aa6879))
* Bump version of build-docs to 2.0.0 ([4faec3c](https://github.com/readmeio/api/commit/4faec3c))
* Clean up a bit ([c3ae266](https://github.com/readmeio/api/commit/c3ae266))
* I don't think the post-install step works all the time ([6b9c732](https://github.com/readmeio/api/commit/6b9c732))
* If the user attempts to use a key starting with `demo` then print a warning ([4c3ab01](https://github.com/readmeio/api/commit/4c3ab01))
* Let's not get too excited... ([c35d126](https://github.com/readmeio/api/commit/c35d126))
* Lowercase current folder name on `api init` ([82d33b5](https://github.com/readmeio/api/commit/82d33b5))
* Make sure brand new services can be created ([a5182c1](https://github.com/readmeio/api/commit/a5182c1))
* Refactor api module to use module.exports in seperate files ([f5bedba](https://github.com/readmeio/api/commit/f5bedba))
* Remove version from docs link in stub ([81a0afa](https://github.com/readmeio/api/commit/81a0afa))
* Should pass through team to fetch available versions on deploy ([3848b5b](https://github.com/readmeio/api/commit/3848b5b))
* Show better error message on signup ([8cfd84e](https://github.com/readmeio/api/commit/8cfd84e))
* Update the stub ([e98bf9a](https://github.com/readmeio/api/commit/e98bf9a))



## <small>0.13.4 (2017-08-03)</small>

* 0.13.4 ([f2b259a](https://github.com/readmeio/api/commit/f2b259a))
* update build-docs ([ee2e5af](https://github.com/readmeio/api/commit/ee2e5af))



## <small>0.13.3 (2017-08-03)</small>

* 0.13.3 ([6e50763](https://github.com/readmeio/api/commit/6e50763))
* Fix error handling for async called with api.error ([88cf6ef](https://github.com/readmeio/api/commit/88cf6ef))



## <small>0.13.2 (2017-08-03)</small>

* 0.13.2 ([68760b4](https://github.com/readmeio/api/commit/68760b4))



## <small>0.13.1 (2017-08-03)</small>

* 0.13.1 ([63f050a](https://github.com/readmeio/api/commit/63f050a))
* build-docs 1.4.1 ([58283b1](https://github.com/readmeio/api/commit/58283b1))



## 0.13.0 (2017-08-03)

* 0.13.0 ([60eef5c](https://github.com/readmeio/api/commit/60eef5c))
* Fix issue with errors in async code ([ac9355e](https://github.com/readmeio/api/commit/ac9355e))
* Update build-docs to support defaults ([a0c10f7](https://github.com/readmeio/api/commit/a0c10f7))
* Update stub to be more useful ([637cde5](https://github.com/readmeio/api/commit/637cde5))



## <small>0.12.8 (2017-08-01)</small>

* -v consoles the BUILD_HOST if set ([c6d3a76](https://github.com/readmeio/api/commit/c6d3a76))
* 0.12.8 ([ed76e3b](https://github.com/readmeio/api/commit/ed76e3b))
* Add -t shortcut for --team ([af18aa0](https://github.com/readmeio/api/commit/af18aa0))
* Fix bug deploying private service with only 1 team ([897e538](https://github.com/readmeio/api/commit/897e538))
* Should be .name ([07e1d8e](https://github.com/readmeio/api/commit/07e1d8e))



## <small>0.12.7 (2017-08-01)</small>

* 0.12.7 ([cf7b3b1](https://github.com/readmeio/api/commit/cf7b3b1))
* Actually installed updated version ([915e49d](https://github.com/readmeio/api/commit/915e49d))



## <small>0.12.6 (2017-08-01)</small>

* 0.12.6 ([6a85ec4](https://github.com/readmeio/api/commit/6a85ec4))
* Update build-docs ([9ed2849](https://github.com/readmeio/api/commit/9ed2849))



## <small>0.12.5 (2017-08-01)</small>

* 0.12.5 ([1583920](https://github.com/readmeio/api/commit/1583920))
* Update build-docs to fix issue with es6 syntax ([4b868f2](https://github.com/readmeio/api/commit/4b868f2))



## <small>0.12.4 (2017-07-31)</small>

* 0.12.4 ([412d22b](https://github.com/readmeio/api/commit/412d22b))
* Add a notice about what an action is ([a1ed38b](https://github.com/readmeio/api/commit/a1ed38b))
* Add a post-install script ([bf37f4d](https://github.com/readmeio/api/commit/bf37f4d))
* Better messages when deploying ([d4af7cd](https://github.com/readmeio/api/commit/d4af7cd))
* Better setup messaging ([3b30510](https://github.com/readmeio/api/commit/3b30510))
* Improve error message for docs ([40e834d](https://github.com/readmeio/api/commit/40e834d))
* Update build-docs so type is no longer case sensitive ([3ab61ac](https://github.com/readmeio/api/commit/3ab61ac))
* Whoops, testing ([66b7f08](https://github.com/readmeio/api/commit/66b7f08))



## <small>0.12.1 (2017-07-28)</small>

* 0.12.1 ([85ccd0a](https://github.com/readmeio/api/commit/85ccd0a))
* Fix failing tests ([c038070](https://github.com/readmeio/api/commit/c038070))



## 0.12.0 (2017-07-28)

* 0.12.0 ([cff0fcd](https://github.com/readmeio/api/commit/cff0fcd))
* Don't ask if you only have one team ([54b6e75](https://github.com/readmeio/api/commit/54b6e75))
* Update docs to match example ([ac707c6](https://github.com/readmeio/api/commit/ac707c6))
* Validate semver version during init ([183f1a3](https://github.com/readmeio/api/commit/183f1a3))



## 0.11.0 (2017-07-28)

* 0.11.0 ([ee13d9b](https://github.com/readmeio/api/commit/ee13d9b))
* Also prompt signup if they arent logged in but try to deploy ([69d0d6f](https://github.com/readmeio/api/commit/69d0d6f))
* Attempt to guess their username ([15a318e](https://github.com/readmeio/api/commit/15a318e))
* bump ([f784fe0](https://github.com/readmeio/api/commit/f784fe0))
* bump ([b1eb7f7](https://github.com/readmeio/api/commit/b1eb7f7))
* Bump ([2804fee](https://github.com/readmeio/api/commit/2804fee))
* Bump ([f4409a4](https://github.com/readmeio/api/commit/f4409a4))
* Bump bump ([19ce78c](https://github.com/readmeio/api/commit/19ce78c))
* Change .do to .run ([48a60bf](https://github.com/readmeio/api/commit/48a60bf))
* Change colors ([8e6b2f2](https://github.com/readmeio/api/commit/8e6b2f2))
* Change intro text ([e1a453f](https://github.com/readmeio/api/commit/e1a453f))
* Clean up the api help screen ([ceeba12](https://github.com/readmeio/api/commit/ceeba12))
* I don't think people will know what an 'action' is without context ([986f514](https://github.com/readmeio/api/commit/986f514))
* Put API back ([d3e8f39](https://github.com/readmeio/api/commit/d3e8f39))
* Send metadata from the Node module ([865e9f0](https://github.com/readmeio/api/commit/865e9f0))
* Simple ReadMe file intro ([73a61bf](https://github.com/readmeio/api/commit/73a61bf))
* There is no way this will work... ([4fe4232](https://github.com/readmeio/api/commit/4fe4232))
* Unbreak the breaks ([2c661f4](https://github.com/readmeio/api/commit/2c661f4))
* Update readme ([34b9015](https://github.com/readmeio/api/commit/34b9015))



## 0.10.0 (2017-07-25)

* 0.10.0 ([502ef36](https://github.com/readmeio/api/commit/502ef36))
* Change invoke url ([4cbf588](https://github.com/readmeio/api/commit/4cbf588))



## <small>0.9.2 (2017-07-24)</small>

* 0.9.2 ([3dfa1e2](https://github.com/readmeio/api/commit/3dfa1e2))
* Update package.lock ([8442f96](https://github.com/readmeio/api/commit/8442f96))



## <small>0.9.1 (2017-07-24)</small>

* 0.9.1 ([d078597](https://github.com/readmeio/api/commit/d078597))
* Update to v1 of the api ([2ae8c48](https://github.com/readmeio/api/commit/2ae8c48))
* Update to v1.3.1 of build-docs ([25d1a18](https://github.com/readmeio/api/commit/25d1a18))



## 0.9.0 (2017-07-19)

* 0.8.0 ([4ed8555](https://github.com/readmeio/api/commit/4ed8555))
* 0.9.0 ([2866b2e](https://github.com/readmeio/api/commit/2866b2e))
* Add better docs and tests for secrets ([564cec2](https://github.com/readmeio/api/commit/564cec2))
* Fix api module to v0 of api ([0236f02](https://github.com/readmeio/api/commit/0236f02))
* Fix some other tests ([35dd7e7](https://github.com/readmeio/api/commit/35dd7e7))
* Update to npm5 ([379796a](https://github.com/readmeio/api/commit/379796a))



## 0.8.0 (2017-06-21)

* 0.8.0 ([baa51e4](https://github.com/readmeio/api/commit/baa51e4))
* Fix test ([3f37f8a](https://github.com/readmeio/api/commit/3f37f8a))
* response.body.result -> response.body ([a328761](https://github.com/readmeio/api/commit/a328761))
* update gitignore ([ce72d6d](https://github.com/readmeio/api/commit/ce72d6d))



## <small>0.7.1 (2017-05-17)</small>

* 0.7.1 ([d7a72ad](https://github.com/readmeio/api/commit/d7a72ad))
* Only ask for invite code on sign up, not login ([fda5c63](https://github.com/readmeio/api/commit/fda5c63))



## 0.7.0 (2017-05-17)

* 0.7.0 ([6500175](https://github.com/readmeio/api/commit/6500175))
* Add inviteCode to command line signup ([a59592c](https://github.com/readmeio/api/commit/a59592c))
* Add support for `api.error(new Error('message'))` ([e49636a](https://github.com/readmeio/api/commit/e49636a))



## <small>0.6.1 (2017-05-16)</small>

* 0.6.1 ([bda076b](https://github.com/readmeio/api/commit/bda076b))
* Add documentation for login and signup ([249df23](https://github.com/readmeio/api/commit/249df23))
* api-build -> api ([9e7d163](https://github.com/readmeio/api/commit/9e7d163))
* Increase version of build-docs to throw on invalid json schema types ([9c0d40b](https://github.com/readmeio/api/commit/9c0d40b))
* Support `throw new Error('message')` from services ([8d2c51d](https://github.com/readmeio/api/commit/8d2c51d))



## 0.6.0 (2017-05-16)

* 0.6.0 ([51ac766](https://github.com/readmeio/api/commit/51ac766))
* Add --version and -v ([908db4d](https://github.com/readmeio/api/commit/908db4d))
* Fix bug with missing readme.md file ([bf6f4d5](https://github.com/readmeio/api/commit/bf6f4d5))
* Fix deprecated warning ([2bd2b8d](https://github.com/readmeio/api/commit/2bd2b8d))
* Signup from cli ([981adcd](https://github.com/readmeio/api/commit/981adcd))
* Use api instead of api-build ([13d2877](https://github.com/readmeio/api/commit/13d2877))



## 0.5.0 (2017-05-12)

* 0.5.0 ([d3d8e3c](https://github.com/readmeio/api/commit/d3d8e3c))
* Able to set secrets for service ([757db02](https://github.com/readmeio/api/commit/757db02))
* Add `#set()` and `#write()` to PackageJson class ([76e4c39](https://github.com/readmeio/api/commit/76e4c39))
* Add `api whoami` to return the current logged in user ([f980712](https://github.com/readmeio/api/commit/f980712))
* Add `build` property to package.json if existing property exists and does not match ([84fb912](https://github.com/readmeio/api/commit/84fb912))
* Add a couple more tests for `api init` ([08f541b](https://github.com/readmeio/api/commit/08f541b))
* Add a heading to the readme markdown ([2cea1f1](https://github.com/readmeio/api/commit/2cea1f1))
* Add a proper `api logout` ([e661b72](https://github.com/readmeio/api/commit/e661b72))
* Add a user-agent header which contains the `api` version, node version and platform ([ca42b63](https://github.com/readmeio/api/commit/ca42b63))
* Add capability to update property prioritising a root update first ([97bc69f](https://github.com/readmeio/api/commit/97bc69f))
* Add comment ([9d23768](https://github.com/readmeio/api/commit/9d23768))
* Add documentation for local and ls ([e51d1a2](https://github.com/readmeio/api/commit/e51d1a2))
* Add global request override which adds an error handler ([42a27b7](https://github.com/readmeio/api/commit/42a27b7))
* Add missing password prompt type ([f714e2d](https://github.com/readmeio/api/commit/f714e2d))
* Add more tests for `api init` and support existing package.json ([7067729](https://github.com/readmeio/api/commit/7067729))
* Add new `invoke` file which is used from both `run` and `api.do` ([bbcd26e](https://github.com/readmeio/api/commit/bbcd26e))
* Add some more tests for on deploy team selection ([ad81e04](https://github.com/readmeio/api/commit/ad81e04))
* Add tests and docs for `api update` ([b95eef0](https://github.com/readmeio/api/commit/b95eef0))
* Allowing running from cli on different team ([331a1e6](https://github.com/readmeio/api/commit/331a1e6))
* api.do returns promise or callback ([b798c2c](https://github.com/readmeio/api/commit/b798c2c))
* Ask for `team` and `private` on service deploy ([dd48ad1](https://github.com/readmeio/api/commit/dd48ad1))
* Better error handling ([2b43e55](https://github.com/readmeio/api/commit/2b43e55))
* Bump version of build-docs to 1.1.0 to support a full description ([da8d091](https://github.com/readmeio/api/commit/da8d091))
* Data is assumed to be {} if not passed in ([3549778](https://github.com/readmeio/api/commit/3549778))
* Document `run` and add support for private services ([5c83a86](https://github.com/readmeio/api/commit/5c83a86))
* Fix for new versions array format returned from api ([fdb1174](https://github.com/readmeio/api/commit/fdb1174))
* Fix formatting of readme file ([889efd3](https://github.com/readmeio/api/commit/889efd3))
* Fix help test ([20f0473](https://github.com/readmeio/api/commit/20f0473))
* Fix other enquirer usages ([2ceb606](https://github.com/readmeio/api/commit/2ceb606))
* Generate docs for all actions ([59a18c4](https://github.com/readmeio/api/commit/59a18c4))
* Lint ([be3a8cb](https://github.com/readmeio/api/commit/be3a8cb))
* Lint ([7c71d90](https://github.com/readmeio/api/commit/7c71d90))
* Make sure our request wrapper returns an actual promise ([0cd2343](https://github.com/readmeio/api/commit/0cd2343))
* Make tests better for init ([c82575e](https://github.com/readmeio/api/commit/c82575e))
* Move entrypoint require into try..catch block ([cb2b500](https://github.com/readmeio/api/commit/cb2b500))
* Output correct error from `api run` ([4a71ab6](https://github.com/readmeio/api/commit/4a71ab6))
* Pick a team to update service on ([61507b5](https://github.com/readmeio/api/commit/61507b5))
* Prefixing team name onto package.json name for private non-personal packages ([d33c5a3](https://github.com/readmeio/api/commit/d33c5a3))
* Print out location header for the URL to the hosted service ([b78e680](https://github.com/readmeio/api/commit/b78e680))
* Re-add back in the public/private question on first deploy ([f193130](https://github.com/readmeio/api/commit/f193130))
* Refactor the deployment process ([d325bb4](https://github.com/readmeio/api/commit/d325bb4))
* Remove asking of `private` in the cli ([05473ee](https://github.com/readmeio/api/commit/05473ee))
* Remove async/await ([bdede9e](https://github.com/readmeio/api/commit/bdede9e))
* Remove dependencies from package json object ([995f2b9](https://github.com/readmeio/api/commit/995f2b9))
* Remove signup ([e4db693](https://github.com/readmeio/api/commit/e4db693))
* Send private flag to the API ([afb54ca](https://github.com/readmeio/api/commit/afb54ca))
* Show prompt to update if on an old version ([aa770bb](https://github.com/readmeio/api/commit/aa770bb))
* Skip broken test ([3c6773a](https://github.com/readmeio/api/commit/3c6773a))
* Swap out inquirer for enquirer ([327a8a8](https://github.com/readmeio/api/commit/327a8a8))
* Switch logout to use async/await ([724992d](https://github.com/readmeio/api/commit/724992d))
* Tests ([97f119d](https://github.com/readmeio/api/commit/97f119d))
* Tidy up private question. Rename internal to private ([59ed258](https://github.com/readmeio/api/commit/59ed258))
* Update dependencies ([e8fcfb1](https://github.com/readmeio/api/commit/e8fcfb1))
* Update docs for deploy ([59f2853](https://github.com/readmeio/api/commit/59f2853))
* Use prod url by default ([9b58b31](https://github.com/readmeio/api/commit/9b58b31))
* Validate package name ([b122167](https://github.com/readmeio/api/commit/b122167))
* Versions can be marked as deprecated ([226a81f](https://github.com/readmeio/api/commit/226a81f))



## <small>0.4.1 (2017-03-31)</small>

* 0.4.1 ([ffd17b9](https://github.com/readmeio/api/commit/ffd17b9))
* Add `api docs` command to show generated docs ([11a2e08](https://github.com/readmeio/api/commit/11a2e08))
* Add build-docs comment block to stub.js ([d8d8587](https://github.com/readmeio/api/commit/d8d8587))
* Add circle.yml file ([0850643](https://github.com/readmeio/api/commit/0850643))
* Add readme.md ([6b34546](https://github.com/readmeio/api/commit/6b34546))
* Add testing setup and add tests for help command ([601e8a3](https://github.com/readmeio/api/commit/601e8a3))
* Better deployment with versions ([02fa41f](https://github.com/readmeio/api/commit/02fa41f))
* Fix commands for new api response format ([25a4d9a](https://github.com/readmeio/api/commit/25a4d9a))
* Fix header ([dd3c390](https://github.com/readmeio/api/commit/dd3c390))
* Log if you're not logged in before doing actions ([01f87ca](https://github.com/readmeio/api/commit/01f87ca))
* Pass minimists args into `action.run()` ([48b82c2](https://github.com/readmeio/api/commit/48b82c2))
* Removing lodash dependency ([8b9deea](https://github.com/readmeio/api/commit/8b9deea))
* Show link to dash after deploy ([aced1c4](https://github.com/readmeio/api/commit/aced1c4))
* Takes the web url from utils ([648ca4b](https://github.com/readmeio/api/commit/648ca4b))
* Temp fix for deploying a new service that hasn't been deployed before ([fa2aba5](https://github.com/readmeio/api/commit/fa2aba5))



## 0.4.0 (2017-03-22)

* 0.4.0 ([c8b1010](https://github.com/readmeio/api/commit/c8b1010))
* Add progress bar for uploader! ([eb18151](https://github.com/readmeio/api/commit/eb18151))



## <small>0.3.3 (2017-03-22)</small>

* 0.3.3 ([5b16f0a](https://github.com/readmeio/api/commit/5b16f0a))



## <small>0.3.2 (2017-03-21)</small>

* 0.3.2 ([06aecaa](https://github.com/readmeio/api/commit/06aecaa))
* Bump build-docs version to 1.0.2 ([c29da07](https://github.com/readmeio/api/commit/c29da07))



## <small>0.3.1 (2017-03-21)</small>

* 0.3.1 ([8cabf32](https://github.com/readmeio/api/commit/8cabf32))
* Bump build-docs version to 1.0.1 ([d0533c7](https://github.com/readmeio/api/commit/d0533c7))



## 0.3.0 (2017-03-21)

* 0.3.0 ([8159ef8](https://github.com/readmeio/api/commit/8159ef8))
* Add help usage for `api`, `api help` and `api help <command>` ([900cc39](https://github.com/readmeio/api/commit/900cc39))



## <small>0.2.2 (2017-03-21)</small>

* 0.2.2 ([d10c15a](https://github.com/readmeio/api/commit/d10c15a))
* Checks semver version ([748a09b](https://github.com/readmeio/api/commit/748a09b))
* Request is required by request-promise ([884eb0b](https://github.com/readmeio/api/commit/884eb0b))
* Update version via cli ([cc2d38a](https://github.com/readmeio/api/commit/cc2d38a))



## <small>0.2.1 (2017-03-21)</small>

* 0.2.1 ([8802c9d](https://github.com/readmeio/api/commit/8802c9d))
* Deploy readme.md ([f7f893b](https://github.com/readmeio/api/commit/f7f893b))
* Fetch BUILD_URL from env variable ([26e4da4](https://github.com/readmeio/api/commit/26e4da4))
* Remove unused dependencies and fix handler.js ([d885ea7](https://github.com/readmeio/api/commit/d885ea7))
* Rename 'api' to 'api-build' in handler local ([5e9b4dc](https://github.com/readmeio/api/commit/5e9b4dc))
* Save cookie on login and signup ([6353d4d](https://github.com/readmeio/api/commit/6353d4d))
* Send docs to registry ([0f33d5e](https://github.com/readmeio/api/commit/0f33d5e))



## 0.2.0 (2017-03-20)

* 0.2.0 ([be11dd0](https://github.com/readmeio/api/commit/be11dd0))
* Add command for running remotely ([4d20036](https://github.com/readmeio/api/commit/4d20036))
* Fix keys command ([5dae4f6](https://github.com/readmeio/api/commit/5dae4f6))
* Fix logs to work with new auth, and not stop lambda from quiting ([fc904a4](https://github.com/readmeio/api/commit/fc904a4))
* Improvements to api init ([5ed8581](https://github.com/readmeio/api/commit/5ed8581))
* use stage url ([518715d](https://github.com/readmeio/api/commit/518715d))



## <small>0.1.1 (2017-03-16)</small>

* 0.1.1 ([00d00c2](https://github.com/readmeio/api/commit/00d00c2))
* Update package.json name ([8709337](https://github.com/readmeio/api/commit/8709337))



## 0.1.0 (2017-03-16)

* 0.1.0 ([f87c48e](https://github.com/readmeio/api/commit/f87c48e))
* Ability to use staging url ([2f40fe0](https://github.com/readmeio/api/commit/2f40fe0))
* Add alias for invoke ([16574f1](https://github.com/readmeio/api/commit/16574f1))
* Add list command to show deployed versions ([4664860](https://github.com/readmeio/api/commit/4664860))
* Add way to output keys on cli ([d22a8cf](https://github.com/readmeio/api/commit/d22a8cf))
* api init ([a61647f](https://github.com/readmeio/api/commit/a61647f))
* api link ([0b3b1a8](https://github.com/readmeio/api/commit/0b3b1a8))
* api log ([4647c27](https://github.com/readmeio/api/commit/4647c27))
* api unlink ([6146766](https://github.com/readmeio/api/commit/6146766))
* api.do ([62133c8](https://github.com/readmeio/api/commit/62133c8))
* better un-tracking? ([1395319](https://github.com/readmeio/api/commit/1395319))
* Clean up console ([7c6501a](https://github.com/readmeio/api/commit/7c6501a))
* Clean up eslint ([0d65954](https://github.com/readmeio/api/commit/0d65954))
* e2e working with services registry, needs to un-hardcode the endpoint ([c67d252](https://github.com/readmeio/api/commit/c67d252))
* Fix a bunch of login stuff with users ([e029edb](https://github.com/readmeio/api/commit/e029edb))
* Fix build url to staging ([1e70e00](https://github.com/readmeio/api/commit/1e70e00))
* Fix issues with logger ([a3019f3](https://github.com/readmeio/api/commit/a3019f3))
* Fix ls ([34df489](https://github.com/readmeio/api/commit/34df489))
* Fix running locally ([3dfd627](https://github.com/readmeio/api/commit/3dfd627))
* Fixes for ls ([7bf009a](https://github.com/readmeio/api/commit/7bf009a))
* Initial commit ([0dbe429](https://github.com/readmeio/api/commit/0dbe429))
* initial commit of skeleton, needs POST route, and handler ([9924cd7](https://github.com/readmeio/api/commit/9924cd7))
* Invoking and deploying ([4f4b30e](https://github.com/readmeio/api/commit/4f4b30e))
* it's all working now ([62c775f](https://github.com/readmeio/api/commit/62c775f))
* keep git from tracking changes to cred file ([c7ff98e](https://github.com/readmeio/api/commit/c7ff98e))
* list all deployed services ([d094242](https://github.com/readmeio/api/commit/d094242))
* Login with username or email ([dd593bd](https://github.com/readmeio/api/commit/dd593bd))
* make sure data dir is part of package so it won't need to be created ([8186db2](https://github.com/readmeio/api/commit/8186db2))
* Move handler into module ([7c4e8f3](https://github.com/readmeio/api/commit/7c4e8f3))
* no way to untrack changes to cred file, just commiting dir ([07b87ad](https://github.com/readmeio/api/commit/07b87ad))
* Run locally ([3dd7b46](https://github.com/readmeio/api/commit/3dd7b46))
* Should be staging url ([882df8f](https://github.com/readmeio/api/commit/882df8f))
* Update how api key is passed ([2191617](https://github.com/readmeio/api/commit/2191617))
* Use new login style ([a2bb2bc](https://github.com/readmeio/api/commit/a2bb2bc))
* yarn ([1945f2f](https://github.com/readmeio/api/commit/1945f2f))



## 6.0.0 (2023-06-26)

* fix: getting unit tests passing again (#659) ([94e73e3](https://github.com/readmeio/api/commit/94e73e3)), closes [#659](https://github.com/readmeio/api/issues/659)
* chore: bumping up our peerdep for httpsnippet ([bc4e2ee](https://github.com/readmeio/api/commit/bc4e2ee))
* feat: dropping support for node 14 (#655) ([8e7515c](https://github.com/readmeio/api/commit/8e7515c)), closes [#655](https://github.com/readmeio/api/issues/655)



## <small>5.0.8 (2023-03-17)</small>

* v5.0.8 ([bd15ecc](https://github.com/readmeio/api/commit/bd15ecc))
* chore(deps): bump http-cache-semantics from 4.1.0 to 4.1.1 (#613) ([ebb90af](https://github.com/readmeio/api/commit/ebb90af)), closes [#613](https://github.com/readmeio/api/issues/613)
* chore(deps): bumping out of date deps (#611) ([287a708](https://github.com/readmeio/api/commit/287a708)), closes [#611](https://github.com/readmeio/api/issues/611)
* chore(test): refreshing the smoketest dataset ([1a457e4](https://github.com/readmeio/api/commit/1a457e4))
* feat: add install flag to bypass prompt (#625) ([415fb8e](https://github.com/readmeio/api/commit/415fb8e)), closes [#625](https://github.com/readmeio/api/issues/625)



## <small>5.0.7 (2023-01-23)</small>

* Adds ESM usage instructions (#606) ([6fadba7](https://github.com/readmeio/api/commit/6fadba7)), closes [#606](https://github.com/readmeio/api/issues/606)
* v5.0.7 ([b003a05](https://github.com/readmeio/api/commit/b003a05))
* fix: moving off `fs/promises` to `fs` in client-side code (#605) ([1d9c87e](https://github.com/readmeio/api/commit/1d9c87e)), closes [#605](https://github.com/readmeio/api/issues/605)
* chore: bumping deps (#607) ([21bd60a](https://github.com/readmeio/api/commit/21bd60a)), closes [#607](https://github.com/readmeio/api/issues/607)



## <small>5.0.6 (2023-01-09)</small>

* v5.0.6 ([33d0a4e](https://github.com/readmeio/api/commit/33d0a4e))
* chore: bumping out of date deps (#603) ([66cfec9](https://github.com/readmeio/api/commit/66cfec9)), closes [#603](https://github.com/readmeio/api/issues/603)
* fix: broken badge, remove unnecessary `.svg` extension ([7c5224c](https://github.com/readmeio/api/commit/7c5224c)), closes [badges/shields#8671](https://github.com/badges/shields/issues/8671)
* fix: failing tests (#602) ([c19a991](https://github.com/readmeio/api/commit/c19a991)), closes [#602](https://github.com/readmeio/api/issues/602)



## <small>5.0.5 (2022-12-09)</small>

* v5.0.5 ([2d39949](https://github.com/readmeio/api/commit/2d39949))
* fix: resolving typing issues in JS codegen (#593) ([ab97a70](https://github.com/readmeio/api/commit/ab97a70)), closes [#593](https://github.com/readmeio/api/issues/593)
* test: updating the smoketest dataset (#594) ([bf57315](https://github.com/readmeio/api/commit/bf57315)), closes [#594](https://github.com/readmeio/api/issues/594)
* chore(deps-dev): bump eslint from 8.28.0 to 8.29.0 (#592) ([deaa5ba](https://github.com/readmeio/api/commit/deaa5ba)), closes [#592](https://github.com/readmeio/api/issues/592)
* chore(deps): bump readmeio/rdme from 8.1.1 to 8.2.0 (#587) ([2c6144e](https://github.com/readmeio/api/commit/2c6144e)), closes [#587](https://github.com/readmeio/api/issues/587)
* chore(deps): bumping out of date deps (#591) ([54754da](https://github.com/readmeio/api/commit/54754da)), closes [#591](https://github.com/readmeio/api/issues/591)
* chore(deps): use rdme@v8 ([a730908](https://github.com/readmeio/api/commit/a730908))



## <small>5.0.4 (2022-11-30)</small>

* v5.0.4 ([e566a19](https://github.com/readmeio/api/commit/e566a19))
* chore(deps): bumping out of date deps across all packages (#576) ([1255dd6](https://github.com/readmeio/api/commit/1255dd6)), closes [#576](https://github.com/readmeio/api/issues/576)



## <small>5.0.3 (2022-11-28)</small>

* v5.0.3 ([7aba675](https://github.com/readmeio/api/commit/7aba675))
* test: refreshing the unit test dataset ([4dad793](https://github.com/readmeio/api/commit/4dad793))
* chore(deps-dev): bump husky from 8.0.1 to 8.0.2 (#568) ([113e898](https://github.com/readmeio/api/commit/113e898)), closes [#568](https://github.com/readmeio/api/issues/568)
* chore(deps): bump readmeio/rdme from 8.0.0 to 8.1.1 (#573) ([6f96efa](https://github.com/readmeio/api/commit/6f96efa)), closes [#573](https://github.com/readmeio/api/issues/573)
* chore(deps): bumping out of date deps (#575) ([ae55a13](https://github.com/readmeio/api/commit/ae55a13)), closes [#575](https://github.com/readmeio/api/issues/575)
* fix: compatibility with yarn installs where `package.json` needs `version` (#574) ([0913923](https://github.com/readmeio/api/commit/0913923)), closes [#574](https://github.com/readmeio/api/issues/574)
* ci: disabling updates to `find-cache-dir` as it's esm-only now ([e21a975](https://github.com/readmeio/api/commit/e21a975))



## <small>5.0.2 (2022-11-25)</small>

* v5.0.2 ([f51774f](https://github.com/readmeio/api/commit/f51774f))
* fix: installs not actually installing the api (#562) ([909a9fd](https://github.com/readmeio/api/commit/909a9fd)), closes [#562](https://github.com/readmeio/api/issues/562)
* chore(deps): bump readmeio/rdme from 7.5.0 to 8.0.0 (#558) ([08d3ac5](https://github.com/readmeio/api/commit/08d3ac5)), closes [#558](https://github.com/readmeio/api/issues/558)



## <small>5.0.1 (2022-10-31)</small>

* v5.0.1 ([81bb654](https://github.com/readmeio/api/commit/81bb654))
* fix: bug where `@api/identifier` wasn't being installed properly (#557) ([20228d2](https://github.com/readmeio/api/commit/20228d2)), closes [#557](https://github.com/readmeio/api/issues/557)
* docs: tweaks to the v4 upgrade docs ([f752c66](https://github.com/readmeio/api/commit/f752c66))



## 5.0.0 (2022-10-31)

* Fix example in README (#529) ([bd10fad](https://github.com/readmeio/api/commit/bd10fad)), closes [#529](https://github.com/readmeio/api/issues/529)
* v5.0.0 ([bb044ec](https://github.com/readmeio/api/commit/bb044ec))
* docs: adding a callout about v5 not being out yet ([c36fdb1](https://github.com/readmeio/api/commit/c36fdb1))
* docs: fixing some typos in a few docs ([e766707](https://github.com/readmeio/api/commit/e766707))
* docs: installation clarifications on the registry UUID ([a9c6ce2](https://github.com/readmeio/api/commit/a9c6ce2))
* docs: v5 (#553) ([5faaa11](https://github.com/readmeio/api/commit/5faaa11)), closes [#553](https://github.com/readmeio/api/issues/553)
* chore: refreshing the smoketest dataset and excluding all google apis (#554) ([5b6a86a](https://github.com/readmeio/api/commit/5b6a86a)), closes [#554](https://github.com/readmeio/api/issues/554)
* chore: updating packageInfo ([b507b38](https://github.com/readmeio/api/commit/b507b38))
* chore(deps-dev): bump @commitlint/cli from 17.0.3 to 17.1.2 (#515) ([1b84f6e](https://github.com/readmeio/api/commit/1b84f6e)), closes [#515](https://github.com/readmeio/api/issues/515)
* chore(deps-dev): bump @commitlint/cli from 17.1.2 to 17.2.0 (#555) ([71ae361](https://github.com/readmeio/api/commit/71ae361)), closes [#555](https://github.com/readmeio/api/issues/555)
* chore(deps-dev): bump @commitlint/config-conventional (#514) ([9699657](https://github.com/readmeio/api/commit/9699657)), closes [#514](https://github.com/readmeio/api/issues/514)
* chore(deps-dev): bump @commitlint/config-conventional (#556) ([09b43ce](https://github.com/readmeio/api/commit/09b43ce)), closes [#556](https://github.com/readmeio/api/issues/556)
* chore(deps-dev): bump @readme/eslint-config from 10.1.0 to 10.1.1 (#528) ([aae1d87](https://github.com/readmeio/api/commit/aae1d87)), closes [#528](https://github.com/readmeio/api/issues/528)
* chore(deps-dev): bump @readme/eslint-config from 9.0.0 to 10.1.0 (#519) ([9ab7829](https://github.com/readmeio/api/commit/9ab7829)), closes [#519](https://github.com/readmeio/api/issues/519)
* chore(deps-dev): bump @readme/oas-examples from 5.4.1 to 5.5.0 (#503) ([6a59efb](https://github.com/readmeio/api/commit/6a59efb)), closes [#503](https://github.com/readmeio/api/issues/503)
* chore(deps-dev): bump @types/mocha from 9.1.1 to 10.0.0 (#526) ([6a40663](https://github.com/readmeio/api/commit/6a40663)), closes [#526](https://github.com/readmeio/api/issues/526)
* chore(deps-dev): bump eslint from 8.21.0 to 8.23.0 (#517) ([827b71d](https://github.com/readmeio/api/commit/827b71d)), closes [#517](https://github.com/readmeio/api/issues/517)
* chore(deps-dev): bump eslint from 8.23.0 to 8.24.0 (#525) ([4ca9c8f](https://github.com/readmeio/api/commit/4ca9c8f)), closes [#525](https://github.com/readmeio/api/issues/525)
* chore(deps-dev): bump eslint from 8.24.0 to 8.25.0 (#531) ([3c1645b](https://github.com/readmeio/api/commit/3c1645b)), closes [#531](https://github.com/readmeio/api/issues/531)
* chore(deps-dev): bump eslint from 8.25.0 to 8.26.0 (#541) ([0621068](https://github.com/readmeio/api/commit/0621068)), closes [#541](https://github.com/readmeio/api/issues/541)
* chore(deps): bump @readme/oas-to-har from 17.1.2 to 18.0.0 (#518) ([9d88aea](https://github.com/readmeio/api/commit/9d88aea)), closes [#518](https://github.com/readmeio/api/issues/518)
* chore(deps): bump ssri from 9.0.0 to 10.0.0 (#534) ([33dd5bb](https://github.com/readmeio/api/commit/33dd5bb)), closes [#534](https://github.com/readmeio/api/issues/534)
* chore(deps): bump ts-morph from 15.1.0 to 16.0.0 (#527) ([501941d](https://github.com/readmeio/api/commit/501941d)), closes [#527](https://github.com/readmeio/api/issues/527)
* chore(deps): bump validate-npm-package-name from 4.0.0 to 5.0.0 (#535) ([d150055](https://github.com/readmeio/api/commit/d150055)), closes [#535](https://github.com/readmeio/api/issues/535)
* chore(deps): bumping oas deps (#552) ([3f7b625](https://github.com/readmeio/api/commit/3f7b625)), closes [#552](https://github.com/readmeio/api/issues/552)
* chore(deps): bumping out of date deps (#510) ([c37fbcc](https://github.com/readmeio/api/commit/c37fbcc)), closes [#510](https://github.com/readmeio/api/issues/510)
* fix: minor tweak to how we generate the packageInfo file ([980dd9d](https://github.com/readmeio/api/commit/980dd9d))
* fix: prefix schema titles that start with numbers to fix a type generation bug (#530) ([b17a261](https://github.com/readmeio/api/commit/b17a261)), closes [#530](https://github.com/readmeio/api/issues/530)
* fix: quirks with OR auth configurations not working right (#543) ([af4c0e9](https://github.com/readmeio/api/commit/af4c0e9)), closes [#543](https://github.com/readmeio/api/issues/543)
* feat: addition of a new `timeout` config option (#542) ([dad0dbe](https://github.com/readmeio/api/commit/dad0dbe)), closes [#542](https://github.com/readmeio/api/issues/542) [#432](https://github.com/readmeio/api/issues/432)
* feat: allow original operationIDs to be used in dynamic SDKs (#509) ([0d52b72](https://github.com/readmeio/api/commit/0d52b72)), closes [#509](https://github.com/readmeio/api/issues/509)
* feat: allowing `accept` headers to always be sent through as metadata (#538) ([826368a](https://github.com/readmeio/api/commit/826368a)), closes [#538](https://github.com/readmeio/api/issues/538)
* feat: allowing users to manually specify an `authorization` header (#546) ([11e2435](https://github.com/readmeio/api/commit/11e2435)), closes [#546](https://github.com/readmeio/api/issues/546)
* feat: completely overhauling how we're handling response data (#539) ([18ddbfb](https://github.com/readmeio/api/commit/18ddbfb)), closes [#539](https://github.com/readmeio/api/issues/539)
* feat(testing): codegen smoketest suite + fixes (#550) ([ab94a7e](https://github.com/readmeio/api/commit/ab94a7e)), closes [#550](https://github.com/readmeio/api/issues/550)
* refactor: json schema type generation and handling (#533) ([b257fe1](https://github.com/readmeio/api/commit/b257fe1)), closes [#533](https://github.com/readmeio/api/issues/533)
* ci: formdata-node is esm only now ([67f44cd](https://github.com/readmeio/api/commit/67f44cd))



## 5.0.0-beta.3 (2022-08-01)

* v5.0.0-beta.3 ([24d5b83](https://github.com/readmeio/api/commit/24d5b83))
* chore: updating packageInfo ([9b43093](https://github.com/readmeio/api/commit/9b43093))
* chore(deps-dev): bump @readme/eslint-config from 8.8.3 to 9.0.0 (#502) ([d084273](https://github.com/readmeio/api/commit/d084273)), closes [#502](https://github.com/readmeio/api/issues/502)
* chore(deps-dev): bump eslint from 8.19.0 to 8.21.0 (#501) ([ab18053](https://github.com/readmeio/api/commit/ab18053)), closes [#501](https://github.com/readmeio/api/issues/501)
* chore(deps): bump readmeio/rdme from 7.3.0 to 7.5.0 (#500) ([404fddf](https://github.com/readmeio/api/commit/404fddf)), closes [#500](https://github.com/readmeio/api/issues/500)
* fix: bug where operationIDs with underscores were being modified (#497) ([6519b4f](https://github.com/readmeio/api/commit/6519b4f)), closes [#497](https://github.com/readmeio/api/issues/497)
* fix: generated SDKs now ship an IFEE (#494) ([9d1247f](https://github.com/readmeio/api/commit/9d1247f)), closes [#494](https://github.com/readmeio/api/issues/494)
* fix: removing undefined objects from incoming metadata parameters (#496) ([3183a8e](https://github.com/readmeio/api/commit/3183a8e)), closes [#496](https://github.com/readmeio/api/issues/496)
* feat: adding support for case-insensitive header parameters (#495) ([895f8d5](https://github.com/readmeio/api/commit/895f8d5)), closes [#495](https://github.com/readmeio/api/issues/495)
* docs: minor doc change to test something in production ([8aaef93](https://github.com/readmeio/api/commit/8aaef93))
* docs: revert change ([b580517](https://github.com/readmeio/api/commit/b580517))



## 5.0.0-beta.2 (2022-07-19)

* v5.0.0-beta.2 ([aa738b1](https://github.com/readmeio/api/commit/aa738b1))
* feat: add support for github blob URLs (#484) ([f8b20a8](https://github.com/readmeio/api/commit/f8b20a8)), closes [#484](https://github.com/readmeio/api/issues/484)
* feat: improved typescript method acecssor `path` type generation (#482) ([8db66e7](https://github.com/readmeio/api/commit/8db66e7)), closes [#482](https://github.com/readmeio/api/issues/482)
* feat: updating httpsnippet-client-api to be compatible with httpsnippet v4 (#491) ([cb357f2](https://github.com/readmeio/api/commit/cb357f2)), closes [#491](https://github.com/readmeio/api/issues/491)
* feat: updating httpsnippet-client-api to work on httpsnippet v4 + TS rewrite (#492) ([8b11be6](https://github.com/readmeio/api/commit/8b11be6)), closes [#492](https://github.com/readmeio/api/issues/492)
* fix: making sure that packageInfo file updates get committed on release ([1b770b4](https://github.com/readmeio/api/commit/1b770b4))
* fix: rearrange markdown comment ([a992a86](https://github.com/readmeio/api/commit/a992a86))
* fix: typescript crashes (#480) ([78dc3b2](https://github.com/readmeio/api/commit/78dc3b2)), closes [#480](https://github.com/readmeio/api/issues/480)
* ci: getting started content reuse using hercule (#490) ([7803460](https://github.com/readmeio/api/commit/7803460)), closes [#490](https://github.com/readmeio/api/issues/490)
* docs: fixing a bad url ([618fee3](https://github.com/readmeio/api/commit/618fee3))
* docs: tweaks to callouts so they look better on our docs ([fc25a5e](https://github.com/readmeio/api/commit/fc25a5e))
* docs: updating documentation for v5 (#469) ([c77e900](https://github.com/readmeio/api/commit/c77e900)), closes [#469](https://github.com/readmeio/api/issues/469) [#475](https://github.com/readmeio/api/issues/475) [#479](https://github.com/readmeio/api/issues/479) [#473](https://github.com/readmeio/api/issues/473)
* docs: updating relative image paths to be absolute in our docs ([1f49792](https://github.com/readmeio/api/commit/1f49792))
* chore(deps-dev): bump typescript from 4.6.4 to 4.7.4 (#473) ([4aea544](https://github.com/readmeio/api/commit/4aea544)), closes [#473](https://github.com/readmeio/api/issues/473)
* chore(deps-dev): bumping dev deps (#479) ([1434753](https://github.com/readmeio/api/commit/1434753)), closes [#479](https://github.com/readmeio/api/issues/479)



## 5.0.0-beta.1 (2022-07-10)

* v5.0.0-beta.1 ([5970a1f](https://github.com/readmeio/api/commit/5970a1f))
* fix: downgrading json-schema-to-typescript to v10 (#475) ([31a1091](https://github.com/readmeio/api/commit/31a1091)), closes [#475](https://github.com/readmeio/api/issues/475)
* feat: updating the packageInfo file for v5 beta0 ([a4df246](https://github.com/readmeio/api/commit/a4df246))



## 5.0.0-beta.0 (2022-07-08)

* v5.0.0-beta.0 ([d18f7e3](https://github.com/readmeio/api/commit/d18f7e3))
* fix: cleaning up some unnecessarily complicated promises ([db41fd3](https://github.com/readmeio/api/commit/db41fd3))
* fix: cleanup of assorted snippet generation quirks (#420) ([44a6f11](https://github.com/readmeio/api/commit/44a6f11)), closes [#420](https://github.com/readmeio/api/issues/420)
* fix: fixing how we generate the dist to work under CJS imports (#397) ([358bde4](https://github.com/readmeio/api/commit/358bde4)), closes [#397](https://github.com/readmeio/api/issues/397)
* fix: improper paths in the unit test tsconfig ([6c6c044](https://github.com/readmeio/api/commit/6c6c044))
* fix: issue where formData would sometimes be sent twice (#389) ([d4e309c](https://github.com/readmeio/api/commit/d4e309c)), closes [#389](https://github.com/readmeio/api/issues/389)
* fix: moving us off the unstable node12 module resolution with a paths hack (#400) ([aa44884](https://github.com/readmeio/api/commit/aa44884)), closes [#400](https://github.com/readmeio/api/issues/400)
* fix: quirk with node 16 and `response.clone()` (#419) ([9fe5f2a](https://github.com/readmeio/api/commit/9fe5f2a)), closes [#419](https://github.com/readmeio/api/issues/419)
* fix: the codeql workflow so it runs properly (#379) ([ebcd3ce](https://github.com/readmeio/api/commit/ebcd3ce)), closes [#379](https://github.com/readmeio/api/issues/379)
* fix: updating the TS installer to install the upcoming `api@beta` release ([8c7388f](https://github.com/readmeio/api/commit/8c7388f))
* fix: use existing API methods (#447) ([fe01b6e](https://github.com/readmeio/api/commit/fe01b6e)), closes [#447](https://github.com/readmeio/api/issues/447)
* fix(auth): remove the ability to have auth chained with each request (#431) ([b7fc800](https://github.com/readmeio/api/commit/b7fc800)), closes [#431](https://github.com/readmeio/api/issues/431)
* chore: bumping the license year ([c7f1c76](https://github.com/readmeio/api/commit/c7f1c76))
* chore: delete redundant docs (#417) ([fbcfd26](https://github.com/readmeio/api/commit/fbcfd26)), closes [#417](https://github.com/readmeio/api/issues/417)
* chore: excluding esm-only packages from dependabot ([09420a0](https://github.com/readmeio/api/commit/09420a0))
* chore(deps-dev): bump @commitlint/cli from 16.2.1 to 16.2.4 (#441) ([628d90e](https://github.com/readmeio/api/commit/628d90e)), closes [#441](https://github.com/readmeio/api/issues/441)
* chore(deps-dev): bump @commitlint/cli from 16.2.4 to 17.0.2 (#452) ([ccc25d1](https://github.com/readmeio/api/commit/ccc25d1)), closes [#452](https://github.com/readmeio/api/issues/452)
* chore(deps-dev): bump @commitlint/cli from 17.0.2 to 17.0.3 (#463) ([e1bdea4](https://github.com/readmeio/api/commit/e1bdea4)), closes [#463](https://github.com/readmeio/api/issues/463)
* chore(deps-dev): bump @commitlint/config-conventional (#438) ([597b180](https://github.com/readmeio/api/commit/597b180)), closes [#438](https://github.com/readmeio/api/issues/438)
* chore(deps-dev): bump @commitlint/config-conventional (#450) ([5e29521](https://github.com/readmeio/api/commit/5e29521)), closes [#450](https://github.com/readmeio/api/issues/450)
* chore(deps-dev): bump @commitlint/config-conventional (#461) ([3b61e30](https://github.com/readmeio/api/commit/3b61e30)), closes [#461](https://github.com/readmeio/api/issues/461)
* chore(deps-dev): bump @types/validate-npm-package-name (#467) ([367495c](https://github.com/readmeio/api/commit/367495c)), closes [#467](https://github.com/readmeio/api/issues/467)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#454) ([a094b3f](https://github.com/readmeio/api/commit/a094b3f)), closes [#454](https://github.com/readmeio/api/issues/454)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#456) ([838bc54](https://github.com/readmeio/api/commit/838bc54)), closes [#456](https://github.com/readmeio/api/issues/456)
* chore(deps-dev): bump sinon from 13.0.2 to 14.0.0 (#451) ([5f127d1](https://github.com/readmeio/api/commit/5f127d1)), closes [#451](https://github.com/readmeio/api/issues/451)
* chore(deps-dev): bumping all dev deps (#384) ([874a91d](https://github.com/readmeio/api/commit/874a91d)), closes [#384](https://github.com/readmeio/api/issues/384)
* chore(deps-dev): bumping all out of date dev deps (#381) ([fb53f57](https://github.com/readmeio/api/commit/fb53f57)), closes [#381](https://github.com/readmeio/api/issues/381)
* chore(deps-dev): bumping some dev dependencie ([c5b4a49](https://github.com/readmeio/api/commit/c5b4a49))
* chore(deps-dev): removing alex as a dep, its better suited as a GH action ([9b9a9ea](https://github.com/readmeio/api/commit/9b9a9ea))
* chore(deps): bump @readme/oas-to-har from 14.1.0 to 15.0.0 (#390) ([fbad503](https://github.com/readmeio/api/commit/fbad503)), closes [#390](https://github.com/readmeio/api/issues/390)
* chore(deps): bump actions/checkout from 2.4.0 to 3 (#425) ([7669751](https://github.com/readmeio/api/commit/7669751)), closes [#425](https://github.com/readmeio/api/issues/425)
* chore(deps): bump actions/setup-node from 2.5.1 to 3 (#405) ([d761624](https://github.com/readmeio/api/commit/d761624)), closes [#405](https://github.com/readmeio/api/issues/405)
* chore(deps): bump github/codeql-action from 1 to 2 (#437) ([5e13314](https://github.com/readmeio/api/commit/5e13314)), closes [#437](https://github.com/readmeio/api/issues/437)
* chore(deps): bump json-schema-to-typescript from 10.1.5 to 11.0.1 (#464) ([04c4082](https://github.com/readmeio/api/commit/04c4082)), closes [#464](https://github.com/readmeio/api/issues/464)
* chore(deps): bump ts-morph from 14.0.0 to 15.1.0 (#459) ([9bbf46f](https://github.com/readmeio/api/commit/9bbf46f)), closes [#459](https://github.com/readmeio/api/issues/459)
* chore(deps): bumping node-fetch (#377) ([eec72cd](https://github.com/readmeio/api/commit/eec72cd)), closes [#377](https://github.com/readmeio/api/issues/377)
* chore(deps): bumping out of date deps (#443) ([66e5e69](https://github.com/readmeio/api/commit/66e5e69)), closes [#443](https://github.com/readmeio/api/issues/443)
* chore(deps): upgrading oas and @readme/openapi-parser ([2b3c07c](https://github.com/readmeio/api/commit/2b3c07c))
* chore(deps): upgrading oas to v18 (#407) ([a817eef](https://github.com/readmeio/api/commit/a817eef)), closes [#407](https://github.com/readmeio/api/issues/407)
* chore(deps): upgrading out of date deps ([8027f55](https://github.com/readmeio/api/commit/8027f55))
* feat: adding support for cookie parameters (#393) ([7252e5f](https://github.com/readmeio/api/commit/7252e5f)), closes [#393](https://github.com/readmeio/api/issues/393)
* feat: adding support for cookies in snippets (#421) ([a355800](https://github.com/readmeio/api/commit/a355800)), closes [#421](https://github.com/readmeio/api/issues/421)
* feat: changing the readme api url from .io to .com (#383) ([d64ee16](https://github.com/readmeio/api/commit/d64ee16)), closes [#383](https://github.com/readmeio/api/issues/383)
* feat: clenaing up how we access paths out of the OAS (#394) ([356248c](https://github.com/readmeio/api/commit/356248c)), closes [#394](https://github.com/readmeio/api/issues/394)
* feat: cli installer (#427) ([6b1e472](https://github.com/readmeio/api/commit/6b1e472)), closes [#427](https://github.com/readmeio/api/issues/427)
* feat: creating a new test suite for running snippet datasets within a VM (#422) ([0d23afc](https://github.com/readmeio/api/commit/0d23afc)), closes [#422](https://github.com/readmeio/api/issues/422)
* feat: creation of a new APICore class to handle fetching (#410) ([abf83ae](https://github.com/readmeio/api/commit/abf83ae)), closes [#410](https://github.com/readmeio/api/issues/410)
* feat: decoupling the spec fetching process from the caching library (#428) ([eb276b4](https://github.com/readmeio/api/commit/eb276b4)), closes [#428](https://github.com/readmeio/api/issues/428)
* feat: dropping support for node 12 (#382) ([d04c89d](https://github.com/readmeio/api/commit/d04c89d)), closes [#382](https://github.com/readmeio/api/issues/382)
* feat: extending support to node 18 (#435) ([4ba3917](https://github.com/readmeio/api/commit/4ba3917)), closes [#435](https://github.com/readmeio/api/issues/435)
* feat: improved handling of file uploads (#380) ([cd3c2ec](https://github.com/readmeio/api/commit/cd3c2ec)), closes [#380](https://github.com/readmeio/api/issues/380)
* feat: moving `api-core` back into the main `api` package (#409) ([8ce96f5](https://github.com/readmeio/api/commit/8ce96f5)), closes [#409](https://github.com/readmeio/api/issues/409)
* feat: moving the test suite over to mocha (#402) ([bc6952f](https://github.com/readmeio/api/commit/bc6952f)), closes [#402](https://github.com/readmeio/api/issues/402)
* feat: overhauling how we process parameters to support required defaults (#396) ([6ee4906](https://github.com/readmeio/api/commit/6ee4906)), closes [#396](https://github.com/readmeio/api/issues/396)
* feat: splitting core api functionality out into a separate package (#399) ([84da97a](https://github.com/readmeio/api/commit/84da97a)), closes [#399](https://github.com/readmeio/api/issues/399)
* feat: supporting configurable cache dirs in the dynamic SDK (#446) ([8f19be9](https://github.com/readmeio/api/commit/8f19be9)), closes [#446](https://github.com/readmeio/api/issues/446)
* feat: typescript rewrite (#392) ([a2241b0](https://github.com/readmeio/api/commit/a2241b0)), closes [#392](https://github.com/readmeio/api/issues/392)
* feat: TypeScript SDK code generation 🧙  (#411) ([77dbd34](https://github.com/readmeio/api/commit/77dbd34)), closes [#411](https://github.com/readmeio/api/issues/411)
* ci: form-data-encoder is now ESM-only so we can't use it (yet) ([934582f](https://github.com/readmeio/api/commit/934582f))
* docs: adding tickets to the pr template ([a4979e6](https://github.com/readmeio/api/commit/a4979e6))
* docs: incorporating alex into our documentation workflow (#408) ([cf55006](https://github.com/readmeio/api/commit/cf55006)), closes [#408](https://github.com/readmeio/api/issues/408)
* docs: minor contrib updates ([4d18c36](https://github.com/readmeio/api/commit/4d18c36))
* docs: small revision to the pr template ([e271dcf](https://github.com/readmeio/api/commit/e271dcf))
* docs: updating the changelog ([289c872](https://github.com/readmeio/api/commit/289c872))
* test: run `build` in pretest (#430) ([cfcbf00](https://github.com/readmeio/api/commit/cfcbf00)), closes [#430](https://github.com/readmeio/api/issues/430)
* test: SDK codegeneration test suite (#413) ([849c78c](https://github.com/readmeio/api/commit/849c78c)), closes [#413](https://github.com/readmeio/api/issues/413)
* test: upgrading `@readme/oas-examples` to the latest release and fixing issues (#424) ([2e8988c](https://github.com/readmeio/api/commit/2e8988c)), closes [#424](https://github.com/readmeio/api/issues/424)
* perf: codegen performance improvements (#429) ([7b341a2](https://github.com/readmeio/api/commit/7b341a2)), closes [#429](https://github.com/readmeio/api/issues/429)
* style: capping all long comments to 100 character lines so they're easier to read (#395) ([98ff3aa](https://github.com/readmeio/api/commit/98ff3aa)), closes [#395](https://github.com/readmeio/api/issues/395)



## 4.2.0 (2022-01-03)

* v4.2.0 ([eb3b741](https://github.com/readmeio/api/commit/eb3b741))
* chore(deps-dev): bump @commitlint/cli from 15.0.0 to 16.0.1 (#372) ([2279bcf](https://github.com/readmeio/api/commit/2279bcf)), closes [#372](https://github.com/readmeio/api/issues/372)
* chore(deps-dev): bump @commitlint/config-conventional (#365) ([eddaec1](https://github.com/readmeio/api/commit/eddaec1)), closes [#365](https://github.com/readmeio/api/issues/365)
* chore(deps-dev): bump @readme/eslint-config from 8.0.2 to 8.1.1 (#373) ([c781941](https://github.com/readmeio/api/commit/c781941)), closes [#373](https://github.com/readmeio/api/issues/373)
* chore(deps-dev): bump eslint from 8.3.0 to 8.6.0 (#369) ([1c5f2b1](https://github.com/readmeio/api/commit/1c5f2b1)), closes [#369](https://github.com/readmeio/api/issues/369)
* chore(deps-dev): bump jest from 27.4.2 to 27.4.5 (#370) ([81c8874](https://github.com/readmeio/api/commit/81c8874)), closes [#370](https://github.com/readmeio/api/issues/370)
* chore(deps-dev): bump memfs from 3.4.0 to 3.4.1 (#367) ([2f5f2f1](https://github.com/readmeio/api/commit/2f5f2f1)), closes [#367](https://github.com/readmeio/api/issues/367)
* chore(deps-dev): bump prettier from 2.5.0 to 2.5.1 (#371) ([55ce743](https://github.com/readmeio/api/commit/55ce743)), closes [#371](https://github.com/readmeio/api/issues/371)
* chore(deps): bump actions/setup-node from 2.5.0 to 2.5.1 (#364) ([343c5b7](https://github.com/readmeio/api/commit/343c5b7)), closes [#364](https://github.com/readmeio/api/issues/364)
* chore(deps): bump fetch-har from 5.0.3 to 5.0.4 (#366) ([53f0b61](https://github.com/readmeio/api/commit/53f0b61)), closes [#366](https://github.com/readmeio/api/issues/366)
* chore(deps): bump oas from 17.3.2 to 17.4.0 (#368) ([410f6ca](https://github.com/readmeio/api/commit/410f6ca)), closes [#368](https://github.com/readmeio/api/issues/368)
* chore(deps): upgrading various oas-related deps (#374) ([8a31118](https://github.com/readmeio/api/commit/8a31118)), closes [#374](https://github.com/readmeio/api/issues/374)



## <small>4.1.3 (2021-12-16)</small>

* v4.1.3 ([cb0dd91](https://github.com/readmeio/api/commit/cb0dd91))
* chore(deps): upgrading oas-to-har and oas (#361) ([b6ee52c](https://github.com/readmeio/api/commit/b6ee52c)), closes [#361](https://github.com/readmeio/api/issues/361)



## <small>4.1.2 (2021-12-10)</small>

* v4.1.2 ([7845886](https://github.com/readmeio/api/commit/7845886))
* fix: crash where multipart/form-data requests dont have params (#360) ([5762c22](https://github.com/readmeio/api/commit/5762c22)), closes [#360](https://github.com/readmeio/api/issues/360)



## <small>4.1.1 (2021-12-01)</small>

* v4.1.1 ([0731728](https://github.com/readmeio/api/commit/0731728))
* chore(deps-dev): bump @commitlint/cli from 13.2.1 to 15.0.0 (#353) ([240ee49](https://github.com/readmeio/api/commit/240ee49)), closes [#353](https://github.com/readmeio/api/issues/353)
* chore(deps-dev): bump @commitlint/config-conventional (#354) ([49fe5c0](https://github.com/readmeio/api/commit/49fe5c0)), closes [#354](https://github.com/readmeio/api/issues/354)
* chore(deps-dev): bump jest from 27.3.1 to 27.4.2 (#358) ([c9b7bc7](https://github.com/readmeio/api/commit/c9b7bc7)), closes [#358](https://github.com/readmeio/api/issues/358)
* chore(deps-dev): bump memfs from 3.3.0 to 3.4.0 (#357) ([c73cc93](https://github.com/readmeio/api/commit/c73cc93)), closes [#357](https://github.com/readmeio/api/issues/357)
* chore(deps-dev): bump nock from 13.1.4 to 13.2.1 (#352) ([0ad6778](https://github.com/readmeio/api/commit/0ad6778)), closes [#352](https://github.com/readmeio/api/issues/352)
* chore(deps-dev): bump prettier from 2.4.1 to 2.5.0 (#356) ([0fb9cdd](https://github.com/readmeio/api/commit/0fb9cdd)), closes [#356](https://github.com/readmeio/api/issues/356)
* chore(deps-dev): upgrading eslint and @readme/eslint-config ([693f52d](https://github.com/readmeio/api/commit/693f52d))
* chore(deps): bump @readme/oas-to-har from 14.0.0 to 14.0.1 (#359) ([3048ec9](https://github.com/readmeio/api/commit/3048ec9)), closes [#359](https://github.com/readmeio/api/issues/359)
* chore(deps): bump actions/checkout from 2.3.5 to 2.4.0 (#351) ([61af132](https://github.com/readmeio/api/commit/61af132)), closes [#351](https://github.com/readmeio/api/issues/351)
* chore(deps): bump actions/setup-node from 2.4.1 to 2.5.0 (#350) ([9b53392](https://github.com/readmeio/api/commit/9b53392)), closes [#350](https://github.com/readmeio/api/issues/350)
* chore(deps): bump oas from 17.1.0 to 17.1.6 (#355) ([916bab1](https://github.com/readmeio/api/commit/916bab1)), closes [#355](https://github.com/readmeio/api/issues/355)



## 4.1.0 (2021-11-08)

* v4.1.0 ([057c930](https://github.com/readmeio/api/commit/057c930))
* chore(deps-dev): bump nock from 13.1.3 to 13.1.4 (#346) ([de4ba12](https://github.com/readmeio/api/commit/de4ba12)), closes [#346](https://github.com/readmeio/api/issues/346)
* chore(deps): bump actions/checkout from 2.3.4 to 2.3.5 (#345) ([30b7101](https://github.com/readmeio/api/commit/30b7101)), closes [#345](https://github.com/readmeio/api/issues/345)
* chore(deps): bump node-fetch from 2.6.5 to 2.6.6 (#348) ([fba1514](https://github.com/readmeio/api/commit/fba1514)), closes [#348](https://github.com/readmeio/api/issues/348)
* chore(deps): bump oas from 16.0.3 to 16.0.4 (#347) ([b66675f](https://github.com/readmeio/api/commit/b66675f)), closes [#347](https://github.com/readmeio/api/issues/347)
* chore(deps): running npm audit ([04f5d5b](https://github.com/readmeio/api/commit/04f5d5b))
* feat: upgrading oas to v17 (#349) ([a88fb8b](https://github.com/readmeio/api/commit/a88fb8b)), closes [#349](https://github.com/readmeio/api/issues/349)



## 4.0.0 (2021-10-29)

* v4.0.0 ([f1d2c25](https://github.com/readmeio/api/commit/f1d2c25))
* feat: support for OpenAPI 3.1 (#344) ([4e5b9ba](https://github.com/readmeio/api/commit/4e5b9ba)), closes [#344](https://github.com/readmeio/api/issues/344)



## <small>3.4.2 (2021-10-08)</small>

* v3.4.2 ([a072112](https://github.com/readmeio/api/commit/a072112))
* fix: issues with circular references being dereferenced and unable to be stringified (#343) ([5c68896](https://github.com/readmeio/api/commit/5c68896)), closes [#343](https://github.com/readmeio/api/issues/343)



## <small>3.4.1 (2021-10-04)</small>

* v3.4.1 ([ebed0fc](https://github.com/readmeio/api/commit/ebed0fc))
* chore(deps-dev): bump @commitlint/cli from 13.1.0 to 13.2.0 (#337) ([33c95e6](https://github.com/readmeio/api/commit/33c95e6)), closes [#337](https://github.com/readmeio/api/issues/337)
* chore(deps-dev): bump @commitlint/config-conventional (#333) ([3136aff](https://github.com/readmeio/api/commit/3136aff)), closes [#333](https://github.com/readmeio/api/issues/333)
* chore(deps-dev): bump @readme/eslint-config from 7.1.0 to 7.2.0 (#334) ([8fd366d](https://github.com/readmeio/api/commit/8fd366d)), closes [#334](https://github.com/readmeio/api/issues/334)
* chore(deps-dev): bump jest from 27.2.0 to 27.2.4 (#341) ([17cba71](https://github.com/readmeio/api/commit/17cba71)), closes [#341](https://github.com/readmeio/api/issues/341)
* chore(deps-dev): bump memfs from 3.2.4 to 3.3.0 (#342) ([2f7e89f](https://github.com/readmeio/api/commit/2f7e89f)), closes [#342](https://github.com/readmeio/api/issues/342)
* chore(deps-dev): bump prettier from 2.4.0 to 2.4.1 (#340) ([d2c634a](https://github.com/readmeio/api/commit/d2c634a)), closes [#340](https://github.com/readmeio/api/issues/340)
* chore(deps): bump @readme/oas-to-har from 13.7.2 to 13.7.3 (#338) ([7cd53c3](https://github.com/readmeio/api/commit/7cd53c3)), closes [#338](https://github.com/readmeio/api/issues/338)
* chore(deps): bump actions/setup-node from 2.4.0 to 2.4.1 (#332) ([1ac85c7](https://github.com/readmeio/api/commit/1ac85c7)), closes [#332](https://github.com/readmeio/api/issues/332)
* chore(deps): bump fetch-har from 5.0.2 to 5.0.3 (#339) ([cabdd8f](https://github.com/readmeio/api/commit/cabdd8f)), closes [#339](https://github.com/readmeio/api/issues/339)
* chore(deps): bump node-fetch from 2.6.1 to 2.6.5 (#336) ([dab087b](https://github.com/readmeio/api/commit/dab087b)), closes [#336](https://github.com/readmeio/api/issues/336)
* chore(deps): bump oas from 14.5.1 to 14.6.1 (#335) ([b40d217](https://github.com/readmeio/api/commit/b40d217)), closes [#335](https://github.com/readmeio/api/issues/335)
* docs: adding a security policy ([420584f](https://github.com/readmeio/api/commit/420584f))



## 3.4.0 (2021-09-14)

* v3.4.0 ([142ce11](https://github.com/readmeio/api/commit/142ce11))
* chore(deps-dev): bumping dev deps ([69dcca3](https://github.com/readmeio/api/commit/69dcca3))
* chore(deps): bumping oas-to-har and oas deps ([a958511](https://github.com/readmeio/api/commit/a958511))
* chore(deps): upgrading the @readme/httpsnippet peerDep requirements ([3814721](https://github.com/readmeio/api/commit/3814721))
* fix: quirks in oas-to-har where query params are not being URI encoded (#331) ([fe43a41](https://github.com/readmeio/api/commit/fe43a41)), closes [#331](https://github.com/readmeio/api/issues/331)



## <small>3.3.2 (2021-09-01)</small>

* v3.3.2 ([0781286](https://github.com/readmeio/api/commit/0781286))
* chore(deps-dev): bump @readme/eslint-config from 6.0.0 to 6.1.0 (#329) ([716b0af](https://github.com/readmeio/api/commit/716b0af)), closes [#329](https://github.com/readmeio/api/issues/329)
* chore(deps-dev): bump jest from 27.0.6 to 27.1.0 (#326) ([1c7188a](https://github.com/readmeio/api/commit/1c7188a)), closes [#326](https://github.com/readmeio/api/issues/326)
* chore(deps-dev): bump memfs from 3.2.2 to 3.2.3 (#324) ([a1c689e](https://github.com/readmeio/api/commit/a1c689e)), closes [#324](https://github.com/readmeio/api/issues/324)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([9a7a05e](https://github.com/readmeio/api/commit/9a7a05e))
* chore(deps-dev): removing lerna in favor of npx ([1e237ac](https://github.com/readmeio/api/commit/1e237ac))
* chore(deps): bump fetch-har from 5.0.1 to 5.0.2 (#330) ([ca00fec](https://github.com/readmeio/api/commit/ca00fec)), closes [#330](https://github.com/readmeio/api/issues/330)
* chore(deps): bump find-cache-dir from 3.3.1 to 3.3.2 (#325) ([1255449](https://github.com/readmeio/api/commit/1255449)), closes [#325](https://github.com/readmeio/api/issues/325)
* chore(deps): bump oas from 14.3.1 to 14.4.0 (#328) ([7fc0996](https://github.com/readmeio/api/commit/7fc0996)), closes [#328](https://github.com/readmeio/api/issues/328)
* chore(deps): running npm audit ([6f07b41](https://github.com/readmeio/api/commit/6f07b41))
* ci: ignoring node-fetch updates as its now an esm package ([b3222a4](https://github.com/readmeio/api/commit/b3222a4))



## <small>3.3.1 (2021-08-26)</small>

* v3.3.1 ([3ab90c1](https://github.com/readmeio/api/commit/3ab90c1))
* chore: running npm audit ([50428b2](https://github.com/readmeio/api/commit/50428b2))
* chore(deps-dev): bump husky from 7.0.1 to 7.0.2 (#319) ([876bf46](https://github.com/readmeio/api/commit/876bf46)), closes [#319](https://github.com/readmeio/api/issues/319)
* chore(deps-dev): bump nock from 13.1.1 to 13.1.3 (#316) ([2cef19f](https://github.com/readmeio/api/commit/2cef19f)), closes [#316](https://github.com/readmeio/api/issues/316)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.2 to 10.0.3 (#320) ([380f369](https://github.com/readmeio/api/commit/380f369)), closes [#320](https://github.com/readmeio/api/issues/320)
* chore(deps): bump @readme/oas-to-har from 13.6.0 to 13.6.1 (#322) ([2c49d5f](https://github.com/readmeio/api/commit/2c49d5f)), closes [#322](https://github.com/readmeio/api/issues/322)
* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#312) ([e4a907d](https://github.com/readmeio/api/commit/e4a907d)), closes [#312](https://github.com/readmeio/api/issues/312)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#314) ([c53578d](https://github.com/readmeio/api/commit/c53578d)), closes [#314](https://github.com/readmeio/api/issues/314)
* chore(deps): bump datauri from 3.0.0 to 4.1.0 (#318) ([445c4ad](https://github.com/readmeio/api/commit/445c4ad)), closes [#318](https://github.com/readmeio/api/issues/318)
* chore(deps): bump fetch-har from 5.0.0 to 5.0.1 (#323) ([c3feab1](https://github.com/readmeio/api/commit/c3feab1)), closes [#323](https://github.com/readmeio/api/issues/323)
* chore(deps): bump mimer from 1.1.0 to 2.0.2 (#317) ([d3da902](https://github.com/readmeio/api/commit/d3da902)), closes [#317](https://github.com/readmeio/api/issues/317)
* chore(deps): bump oas from 14.0.0 to 14.3.1 (#315) ([400e680](https://github.com/readmeio/api/commit/400e680)), closes [#315](https://github.com/readmeio/api/issues/315)
* ci: ignoring stringify-object because its an ESM pkg now ([bbaac03](https://github.com/readmeio/api/commit/bbaac03))
* ci: updating the dependabot label ([d07b3c0](https://github.com/readmeio/api/commit/d07b3c0))



## 3.3.0 (2021-07-31)

* v3.3.0 ([e2a1e40](https://github.com/readmeio/api/commit/e2a1e40))
* chore(deps-dev): bumping dev deps ([d34cb39](https://github.com/readmeio/api/commit/d34cb39))
* chore(deps-dev): bumping root pkg deps ([b585684](https://github.com/readmeio/api/commit/b585684))
* chore(deps): upgrading our oas and fetch-har deps ([6efcd05](https://github.com/readmeio/api/commit/6efcd05))
* docs: revisions to the pr template ([2ccb888](https://github.com/readmeio/api/commit/2ccb888))



## <small>3.2.6 (2021-07-06)</small>

* v3.2.6 ([5def722](https://github.com/readmeio/api/commit/5def722))
* chore(deps-dev): bump @readme/eslint-config from 5.0.5 to 5.1.0 (#306) ([ea4e2f0](https://github.com/readmeio/api/commit/ea4e2f0)), closes [#306](https://github.com/readmeio/api/issues/306)
* chore(deps-dev): bump eslint from 7.27.0 to 7.29.0 (#305) ([cc41ca7](https://github.com/readmeio/api/commit/cc41ca7)), closes [#305](https://github.com/readmeio/api/issues/305)
* chore(deps-dev): bump husky from 6.0.0 to 7.0.0 (#307) ([7a5e17a](https://github.com/readmeio/api/commit/7a5e17a)), closes [#307](https://github.com/readmeio/api/issues/307)
* chore(deps-dev): bump jest from 27.0.3 to 27.0.6 (#308) ([ec8261f](https://github.com/readmeio/api/commit/ec8261f)), closes [#308](https://github.com/readmeio/api/issues/308)
* chore(deps-dev): bump prettier from 2.3.0 to 2.3.2 (#311) ([9fbc5d6](https://github.com/readmeio/api/commit/9fbc5d6)), closes [#311](https://github.com/readmeio/api/issues/311)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#310) ([7874ea4](https://github.com/readmeio/api/commit/7874ea4)), closes [#310](https://github.com/readmeio/api/issues/310)
* chore(deps): bump @readme/oas-to-har from 13.4.10 to 13.4.17 (#309) ([3e36558](https://github.com/readmeio/api/commit/3e36558)), closes [#309](https://github.com/readmeio/api/issues/309)
* chore(deps): bump actions/setup-node from 2.1.5 to 2.2.0 (#304) ([6cb7a85](https://github.com/readmeio/api/commit/6cb7a85)), closes [#304](https://github.com/readmeio/api/issues/304)



## <small>3.2.5 (2021-06-30)</small>

* v3.2.5 ([cfda278](https://github.com/readmeio/api/commit/cfda278))
* chore(deps): upgrading oas to fix a server path matching quirk ([bb4a3bd](https://github.com/readmeio/api/commit/bb4a3bd))



## <small>3.2.4 (2021-06-28)</small>

* v3.2.4 ([624b385](https://github.com/readmeio/api/commit/624b385))
* chore(deps): upgrading oas to 13.0.3 ([a6531d3](https://github.com/readmeio/api/commit/a6531d3))



## <small>3.2.3 (2021-06-28)</small>

* v3.2.3 ([ba32a36](https://github.com/readmeio/api/commit/ba32a36))
* chore(deps): upgrading oas to 13.0.2 ([ca3ef7a](https://github.com/readmeio/api/commit/ca3ef7a))



## <small>3.2.2 (2021-06-11)</small>

* v3.2.2 ([b952087](https://github.com/readmeio/api/commit/b952087))
* chore(deps): upgrading `oas` to v13 (#303) ([e77cb20](https://github.com/readmeio/api/commit/e77cb20)), closes [#303](https://github.com/readmeio/api/issues/303)



## <small>3.2.1 (2021-06-08)</small>

* v3.2.1 ([df00ce6](https://github.com/readmeio/api/commit/df00ce6))
* chore(deps): upgrading oas-to-har and oas (#302) ([eef8895](https://github.com/readmeio/api/commit/eef8895)), closes [#302](https://github.com/readmeio/api/issues/302)



## 3.2.0 (2021-06-07)

* v3.2.0 ([3e67252](https://github.com/readmeio/api/commit/3e67252))
* chore: upgrading the `oas` dependency in httpsnippet-client-api ([98981b0](https://github.com/readmeio/api/commit/98981b0))
* chore(deps-dev): bump @commitlint/cli from 12.1.3 to 12.1.4 (#296) ([3d1a6df](https://github.com/readmeio/api/commit/3d1a6df)), closes [#296](https://github.com/readmeio/api/issues/296)
* chore(deps-dev): bump @commitlint/config-conventional (#297) ([87f2825](https://github.com/readmeio/api/commit/87f2825)), closes [#297](https://github.com/readmeio/api/issues/297)
* chore(deps-dev): bump eslint from 7.26.0 to 7.27.0 (#300) ([1ef52d8](https://github.com/readmeio/api/commit/1ef52d8)), closes [#300](https://github.com/readmeio/api/issues/300)
* chore(deps-dev): bump jest from 26.6.3 to 27.0.3 (#299) ([2b73cef](https://github.com/readmeio/api/commit/2b73cef)), closes [#299](https://github.com/readmeio/api/issues/299)
* chore(deps-dev): bump nock from 13.0.11 to 13.1.0 (#295) ([f118bb2](https://github.com/readmeio/api/commit/f118bb2)), closes [#295](https://github.com/readmeio/api/issues/295)
* chore(deps): bump @readme/oas-to-har from 13.4.5 to 13.4.6 (#301) ([0a15279](https://github.com/readmeio/api/commit/0a15279)), closes [#301](https://github.com/readmeio/api/issues/301)
* chore(deps): bump oas from 11.0.0 to 11.0.1 (#298) ([a35e430](https://github.com/readmeio/api/commit/a35e430)), closes [#298](https://github.com/readmeio/api/issues/298)
* feat: shorthand for readme-hosted APIs (@subdomain#uuid) (#176) ([bca6c23](https://github.com/readmeio/api/commit/bca6c23)), closes [#176](https://github.com/readmeio/api/issues/176)
* ci: adjusting the codeql workflow ([0bbf4d8](https://github.com/readmeio/api/commit/0bbf4d8))



## 3.1.0 (2021-05-13)

* v3.1.0 ([954f82b](https://github.com/readmeio/api/commit/954f82b))
* chore(deps-dev): bump @commitlint/cli from 12.1.1 to 12.1.3 (#288) ([23cdaf5](https://github.com/readmeio/api/commit/23cdaf5)), closes [#288](https://github.com/readmeio/api/issues/288)
* chore(deps-dev): bump @commitlint/config-conventional (#290) ([5d325b0](https://github.com/readmeio/api/commit/5d325b0)), closes [#290](https://github.com/readmeio/api/issues/290)
* chore(deps-dev): bump eslint from 7.25.0 to 7.26.0 (#291) ([f519b33](https://github.com/readmeio/api/commit/f519b33)), closes [#291](https://github.com/readmeio/api/issues/291)
* chore(deps-dev): bump prettier from 2.2.1 to 2.3.0 (#289) ([b423897](https://github.com/readmeio/api/commit/b423897)), closes [#289](https://github.com/readmeio/api/issues/289)
* chore(deps-dev): upgrading husky (#286) ([a6c12a8](https://github.com/readmeio/api/commit/a6c12a8)), closes [#286](https://github.com/readmeio/api/issues/286)
* chore(deps): bump fetch-har from 4.0.2 to 4.0.3 (#292) ([a8660df](https://github.com/readmeio/api/commit/a8660df)), closes [#292](https://github.com/readmeio/api/issues/292)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#294) ([47ecf81](https://github.com/readmeio/api/commit/47ecf81)), closes [#294](https://github.com/readmeio/api/issues/294)
* chore(deps): bump get-stream from 4.1.0 to 6.0.1 (#293) ([344c209](https://github.com/readmeio/api/commit/344c209)), closes [#293](https://github.com/readmeio/api/issues/293)
* chore(deps): bump js-yaml from 3.14.0 to 4.1.0 (#274) ([b8b4216](https://github.com/readmeio/api/commit/b8b4216)), closes [#274](https://github.com/readmeio/api/issues/274)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#287) ([347354d](https://github.com/readmeio/api/commit/347354d)), closes [#287](https://github.com/readmeio/api/issues/287)
* chore(deps): upgrading oas to 11.0.0 (#285) ([00c0288](https://github.com/readmeio/api/commit/00c0288)), closes [#285](https://github.com/readmeio/api/issues/285)
* feat: add a config() function that allows disabling of response parsing (#264) ([570049a](https://github.com/readmeio/api/commit/570049a)), closes [#264](https://github.com/readmeio/api/issues/264)
* feat: adding support for server variables (#284) ([1dd8a2e](https://github.com/readmeio/api/commit/1dd8a2e)), closes [#284](https://github.com/readmeio/api/issues/284)



## <small>3.0.3 (2021-05-07)</small>

* v3.0.3 ([343d9e9](https://github.com/readmeio/api/commit/343d9e9))
* chore(deps-dev): bump @commitlint/cli from 12.0.1 to 12.1.1 (#276) ([d675432](https://github.com/readmeio/api/commit/d675432)), closes [#276](https://github.com/readmeio/api/issues/276)
* chore(deps-dev): bump @commitlint/config-conventional (#275) ([42a507b](https://github.com/readmeio/api/commit/42a507b)), closes [#275](https://github.com/readmeio/api/issues/275)
* chore(deps-dev): bump @readme/eslint-config from 5.0.3 to 5.0.5 (#282) ([b2d159c](https://github.com/readmeio/api/commit/b2d159c)), closes [#282](https://github.com/readmeio/api/issues/282)
* chore(deps-dev): bump eslint from 7.23.0 to 7.25.0 (#280) ([94ca270](https://github.com/readmeio/api/commit/94ca270)), closes [#280](https://github.com/readmeio/api/issues/280)
* chore(deps-dev): bump memfs from 3.2.1 to 3.2.2 (#273) ([8d50610](https://github.com/readmeio/api/commit/8d50610)), closes [#273](https://github.com/readmeio/api/issues/273)
* chore(deps): bump @readme/oas-to-har from 13.2.0 to 13.2.4 (#278) ([cc097e0](https://github.com/readmeio/api/commit/cc097e0)), closes [#278](https://github.com/readmeio/api/issues/278)
* chore(deps): bump get-stream from 6.0.0 to 6.0.1 (#279) ([1dea6cc](https://github.com/readmeio/api/commit/1dea6cc)), closes [#279](https://github.com/readmeio/api/issues/279)
* chore(deps): upgrading oas ([f6369c6](https://github.com/readmeio/api/commit/f6369c6))



## <small>3.0.2 (2021-05-04)</small>

* v3.0.2 ([b52845c](https://github.com/readmeio/api/commit/b52845c))
* chore(deps): upgrading oas (#283) ([34655cb](https://github.com/readmeio/api/commit/34655cb)), closes [#283](https://github.com/readmeio/api/issues/283)
* fix: cleaning up a typo in an error message in httpsnippet-client-api ([341494f](https://github.com/readmeio/api/commit/341494f))



## <small>3.0.1 (2021-04-20)</small>

* v3.0.1 ([4728737](https://github.com/readmeio/api/commit/4728737))
* ci: allowing node 16 installs and builds (#271) ([e36fab1](https://github.com/readmeio/api/commit/e36fab1)), closes [#271](https://github.com/readmeio/api/issues/271)
* chore(deps-dev): bump eslint from 7.22.0 to 7.23.0 (#266) ([54c2fc2](https://github.com/readmeio/api/commit/54c2fc2)), closes [#266](https://github.com/readmeio/api/issues/266)
* chore(deps-dev): bump memfs from 3.2.0 to 3.2.1 (#268) ([d6905cd](https://github.com/readmeio/api/commit/d6905cd)), closes [#268](https://github.com/readmeio/api/issues/268)
* chore(deps): bump @readme/oas-to-har from 13.0.0 to 13.2.0 (#265) ([21bc2f7](https://github.com/readmeio/api/commit/21bc2f7)), closes [#265](https://github.com/readmeio/api/issues/265)
* chore(deps): bump oas from 10.4.0 to 10.4.1 (#267) ([855d931](https://github.com/readmeio/api/commit/855d931)), closes [#267](https://github.com/readmeio/api/issues/267)
* feat: cleaner snippets when body and metadata are present (#269) ([4869caf](https://github.com/readmeio/api/commit/4869caf)), closes [#269](https://github.com/readmeio/api/issues/269)



## 3.0.0 (2021-03-24)

* v3.0.0 ([260be3a](https://github.com/readmeio/api/commit/260be3a))
* chore: update deps and require npm@7 (#253) ([efa2705](https://github.com/readmeio/api/commit/efa2705)), closes [#253](https://github.com/readmeio/api/issues/253)
* chore(deps-dev): bump @commitlint/cli from 11.0.0 to 12.0.1 (#250) ([8b9b6a4](https://github.com/readmeio/api/commit/8b9b6a4)), closes [#250](https://github.com/readmeio/api/issues/250)
* chore(deps-dev): bump @commitlint/config-conventional (#248) ([12d734e](https://github.com/readmeio/api/commit/12d734e)), closes [#248](https://github.com/readmeio/api/issues/248)
* chore(deps-dev): bump @readme/eslint-config from 4.1.0 to 5.0.0 (#247) ([ef2023f](https://github.com/readmeio/api/commit/ef2023f)), closes [#247](https://github.com/readmeio/api/issues/247)
* chore(deps-dev): bump @readme/eslint-config from 5.0.0 to 5.0.3 (#258) ([440801e](https://github.com/readmeio/api/commit/440801e)), closes [#258](https://github.com/readmeio/api/issues/258)
* chore(deps-dev): bump eslint from 7.19.0 to 7.21.0 (#242) ([6875828](https://github.com/readmeio/api/commit/6875828)), closes [#242](https://github.com/readmeio/api/issues/242)
* chore(deps-dev): bump eslint from 7.21.0 to 7.22.0 (#255) ([1e48edc](https://github.com/readmeio/api/commit/1e48edc)), closes [#255](https://github.com/readmeio/api/issues/255)
* chore(deps-dev): bump nock from 13.0.7 to 13.0.9 (#251) ([f0bbc06](https://github.com/readmeio/api/commit/f0bbc06)), closes [#251](https://github.com/readmeio/api/issues/251)
* chore(deps-dev): bump nock from 13.0.9 to 13.0.11 (#260) ([fc8427f](https://github.com/readmeio/api/commit/fc8427f)), closes [#260](https://github.com/readmeio/api/issues/260)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.1 to 10.0.2 (#245) ([84b95a2](https://github.com/readmeio/api/commit/84b95a2)), closes [#245](https://github.com/readmeio/api/issues/245)
* chore(deps): bump @readme/httpsnippet from 2.4.1 to 2.4.3 (#249) ([494bbcd](https://github.com/readmeio/api/commit/494bbcd)), closes [#249](https://github.com/readmeio/api/issues/249)
* chore(deps): bump @readme/oas-to-har from 11.1.2 to 12.2.1 (#246) ([57625d0](https://github.com/readmeio/api/commit/57625d0)), closes [#246](https://github.com/readmeio/api/issues/246)
* chore(deps): bump actions/setup-node from v2.1.4 to v2.1.5 (#241) ([0498476](https://github.com/readmeio/api/commit/0498476)), closes [#241](https://github.com/readmeio/api/issues/241)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#259) ([f9910da](https://github.com/readmeio/api/commit/f9910da)), closes [#259](https://github.com/readmeio/api/issues/259)
* chore(deps): bump form-data from 3.0.0 to 4.0.0 (#244) ([47792bc](https://github.com/readmeio/api/commit/47792bc)), closes [#244](https://github.com/readmeio/api/issues/244)
* chore(deps): bump get-stream from 4.1.0 to 6.0.0 (#261) ([588fff7](https://github.com/readmeio/api/commit/588fff7)), closes [#261](https://github.com/readmeio/api/issues/261)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#256) ([ceec5c1](https://github.com/readmeio/api/commit/ceec5c1)), closes [#256](https://github.com/readmeio/api/issues/256)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#254) ([aed83e4](https://github.com/readmeio/api/commit/aed83e4)), closes [#254](https://github.com/readmeio/api/issues/254)
* chore(deps): bump oas from 10.0.1 to 10.2.0 (#243) ([e5934cc](https://github.com/readmeio/api/commit/e5934cc)), closes [#243](https://github.com/readmeio/api/issues/243)
* chore(deps): bump oas from 10.3.0 to 10.4.0 (#262) ([c7280d3](https://github.com/readmeio/api/commit/c7280d3)), closes [#262](https://github.com/readmeio/api/issues/262)
* ci: trying to fix codeql failures (#263) ([e3dd56b](https://github.com/readmeio/api/commit/e3dd56b)), closes [#263](https://github.com/readmeio/api/issues/263)
* feat: automatically parse the api response based on content-type  (#240) ([ae50813](https://github.com/readmeio/api/commit/ae50813)), closes [#240](https://github.com/readmeio/api/issues/240) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125) [/github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30](https://github.com//github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js/issues/L13-L30) [/github.com/readmeio/api/pull/240#discussion_r569829932](https://github.com//github.com/readmeio/api/pull/240/issues/discussion_r569829932)
* refactor: switch to using memfs instead of mock-fs (#239) ([6cb517f](https://github.com/readmeio/api/commit/6cb517f)), closes [#239](https://github.com/readmeio/api/issues/239) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125)


### BREAKING CHANGE

* this is a breaking change.

* chore: relax commitlint rules on body and footer length

Taken from main codebase

* feat: remove res.json() line from the httpsnippet client

* fix: always output `.then(res => console.log(res))` in code sample

Since we dont know if the response is json or not, we can't make
assumptions. In an ideal world we'd conditionally do this based
on the accept header in the response, but Operation.getHeaders() only
returns with an array of headers and not their actual values. I think
this is good enough for now!


## <small>2.7.1 (2021-02-02)</small>

* v2.7.1 ([1bb8664](https://github.com/readmeio/api/commit/1bb8664))
* chore(deps): upgrading `@readme/httpsnippet` to the latest release ([9164024](https://github.com/readmeio/api/commit/9164024))



## 2.7.0 (2021-02-02)

* v2.7.0 ([64bb202](https://github.com/readmeio/api/commit/64bb202))
* chore(deps): upgrading `@readme/httpsnippet` ([d184a14](https://github.com/readmeio/api/commit/d184a14))



## 2.6.0 (2021-02-02)

* v2.6.0 ([4cd3ed5](https://github.com/readmeio/api/commit/4cd3ed5))
* chore: rebuilding the root package-lock ([d0f8091](https://github.com/readmeio/api/commit/d0f8091))
* chore(deps-dev): bump @readme/eslint-config from 3.6.5 to 3.7.1 (#210) ([ddae88a](https://github.com/readmeio/api/commit/ddae88a)), closes [#210](https://github.com/readmeio/api/issues/210)
* chore(deps-dev): bump @readme/eslint-config from 3.7.1 to 3.8.0 (#214) ([1346192](https://github.com/readmeio/api/commit/1346192)), closes [#214](https://github.com/readmeio/api/issues/214)
* chore(deps-dev): bump @readme/eslint-config from 3.8.0 to 4.0.0 (#219) ([0741212](https://github.com/readmeio/api/commit/0741212)), closes [#219](https://github.com/readmeio/api/issues/219)
* chore(deps-dev): bump @readme/eslint-config from 4.0.0 to 4.1.0 (#229) ([608e855](https://github.com/readmeio/api/commit/608e855)), closes [#229](https://github.com/readmeio/api/issues/229)
* chore(deps-dev): bump eslint from 7.14.0 to 7.15.0 (#212) ([b340515](https://github.com/readmeio/api/commit/b340515)), closes [#212](https://github.com/readmeio/api/issues/212)
* chore(deps-dev): bump eslint from 7.15.0 to 7.16.0 (#220) ([69a0e0a](https://github.com/readmeio/api/commit/69a0e0a)), closes [#220](https://github.com/readmeio/api/issues/220)
* chore(deps-dev): bump eslint from 7.16.0 to 7.17.0 (#226) ([0bbdc05](https://github.com/readmeio/api/commit/0bbdc05)), closes [#226](https://github.com/readmeio/api/issues/226)
* chore(deps-dev): bump eslint from 7.17.0 to 7.19.0 (#234) ([0acb815](https://github.com/readmeio/api/commit/0acb815)), closes [#234](https://github.com/readmeio/api/issues/234)
* chore(deps-dev): bump husky from 4.3.0 to 4.3.6 (#217) ([571fa3f](https://github.com/readmeio/api/commit/571fa3f)), closes [#217](https://github.com/readmeio/api/issues/217)
* chore(deps-dev): bump husky from 4.3.6 to 4.3.7 (#228) ([6988708](https://github.com/readmeio/api/commit/6988708)), closes [#228](https://github.com/readmeio/api/issues/228)
* chore(deps-dev): bump husky from 4.3.7 to 4.3.8 (#238) ([82efe01](https://github.com/readmeio/api/commit/82efe01)), closes [#238](https://github.com/readmeio/api/issues/238)
* chore(deps-dev): bump nock from 13.0.5 to 13.0.7 (#235) ([9beb2ae](https://github.com/readmeio/api/commit/9beb2ae)), closes [#235](https://github.com/readmeio/api/issues/235)
* chore(deps-dev): bump prettier from 2.2.0 to 2.2.1 (#209) ([38fe2ff](https://github.com/readmeio/api/commit/38fe2ff)), closes [#209](https://github.com/readmeio/api/issues/209)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#237) ([db65c3b](https://github.com/readmeio/api/commit/db65c3b)), closes [#237](https://github.com/readmeio/api/issues/237)
* chore(deps): bump @readme/oas-to-har from 10.0.0 to 10.0.5 (#215) ([0462373](https://github.com/readmeio/api/commit/0462373)), closes [#215](https://github.com/readmeio/api/issues/215)
* chore(deps): bump @readme/oas-to-har from 11.1.0 to 11.1.2 (#236) ([611148f](https://github.com/readmeio/api/commit/611148f)), closes [#236](https://github.com/readmeio/api/issues/236)
* chore(deps): bump actions/checkout from v2.3.3 to v2.3.4 (#211) ([a88ec6c](https://github.com/readmeio/api/commit/a88ec6c)), closes [#211](https://github.com/readmeio/api/issues/211)
* chore(deps): bump actions/setup-node from v2.1.2 to v2.1.4 (#225) ([6697623](https://github.com/readmeio/api/commit/6697623)), closes [#225](https://github.com/readmeio/api/issues/225)
* chore(deps): bump ini from 1.3.5 to 1.3.8 (#232) ([17f4246](https://github.com/readmeio/api/commit/17f4246)), closes [#232](https://github.com/readmeio/api/issues/232)
* chore(deps): bump js-yaml from 3.14.0 to 3.14.1 (#218) ([a4cb9e7](https://github.com/readmeio/api/commit/a4cb9e7)), closes [#218](https://github.com/readmeio/api/issues/218)
* chore(deps): bump node-notifier from 8.0.0 to 8.0.1 in /packages/api (#224) ([c846af0](https://github.com/readmeio/api/commit/c846af0)), closes [#224](https://github.com/readmeio/api/issues/224)
* chore(deps): bump node-notifier in /packages/httpsnippet-client-api (#223) ([63fa1f9](https://github.com/readmeio/api/commit/63fa1f9)), closes [#223](https://github.com/readmeio/api/issues/223)
* chore(deps): bump oas from 10.0.0 to 10.0.1 (#233) ([af2d9fb](https://github.com/readmeio/api/commit/af2d9fb)), closes [#233](https://github.com/readmeio/api/issues/233)
* chore(deps): bump oas from 6.1.0 to 10.0.0 (#231) ([166000a](https://github.com/readmeio/api/commit/166000a)), closes [#231](https://github.com/readmeio/api/issues/231)
* ci: updating dependabot to run on a monthly schedule ([a081851](https://github.com/readmeio/api/commit/a081851))



## 2.5.0 (2020-11-27)

* v2.5.0 ([7f6622c](https://github.com/readmeio/api/commit/7f6622c))
* chore(deps-dev): bump @readme/eslint-config from 3.6.2 to 3.6.3 (#194) ([c53f2a0](https://github.com/readmeio/api/commit/c53f2a0)), closes [#194](https://github.com/readmeio/api/issues/194)
* chore(deps-dev): bump @readme/eslint-config from 3.6.3 to 3.6.5 (#204) ([accc1b3](https://github.com/readmeio/api/commit/accc1b3)), closes [#204](https://github.com/readmeio/api/issues/204)
* chore(deps-dev): bump conventional-changelog-cli from 2.1.0 to 2.1.1 (#195) ([82ec912](https://github.com/readmeio/api/commit/82ec912)), closes [#195](https://github.com/readmeio/api/issues/195)
* chore(deps-dev): bump eslint from 7.12.1 to 7.13.0 (#197) ([e4cae18](https://github.com/readmeio/api/commit/e4cae18)), closes [#197](https://github.com/readmeio/api/issues/197)
* chore(deps-dev): bump eslint from 7.13.0 to 7.14.0 (#206) ([a963391](https://github.com/readmeio/api/commit/a963391)), closes [#206](https://github.com/readmeio/api/issues/206)
* chore(deps-dev): bump jest from 26.6.1 to 26.6.3 (#199) ([64ca33f](https://github.com/readmeio/api/commit/64ca33f)), closes [#199](https://github.com/readmeio/api/issues/199)
* chore(deps-dev): bump nock from 13.0.4 to 13.0.5 (#201) ([b3d5198](https://github.com/readmeio/api/commit/b3d5198)), closes [#201](https://github.com/readmeio/api/issues/201)
* chore(deps-dev): bump prettier from 2.1.2 to 2.2.0 (#205) ([f26cf5f](https://github.com/readmeio/api/commit/f26cf5f)), closes [#205](https://github.com/readmeio/api/issues/205)
* chore(deps): bump @readme/httpsnippet from 2.2.3 to 2.3.1 (#207) ([ca2eeb0](https://github.com/readmeio/api/commit/ca2eeb0)), closes [#207](https://github.com/readmeio/api/issues/207)
* chore(deps): bump @readme/oas-to-har from 9.0.0 to 9.2.0 (#196) ([0b0f5ac](https://github.com/readmeio/api/commit/0b0f5ac)), closes [#196](https://github.com/readmeio/api/issues/196)
* chore(deps): bump @readme/oas-to-har from 9.2.0 to 9.2.2 (#202) ([a492210](https://github.com/readmeio/api/commit/a492210)), closes [#202](https://github.com/readmeio/api/issues/202)
* chore(deps): bump oas from 5.0.0 to 5.2.0 (#198) ([cb0b851](https://github.com/readmeio/api/commit/cb0b851)), closes [#198](https://github.com/readmeio/api/issues/198)
* chore(deps): upgrade oas and oas-to-har (#208) ([3daec70](https://github.com/readmeio/api/commit/3daec70)), closes [#208](https://github.com/readmeio/api/issues/208)



## <small>2.4.4 (2020-11-02)</small>

* v2.4.4 ([f040910](https://github.com/readmeio/api/commit/f040910))
* fix: adding better messaging when operations can't be found (#193) ([22b6dfd](https://github.com/readmeio/api/commit/22b6dfd)), closes [#193](https://github.com/readmeio/api/issues/193)
* chore(deps-dev): bump @readme/eslint-config from 3.6.1 to 3.6.2 (#189) ([eae818f](https://github.com/readmeio/api/commit/eae818f)), closes [#189](https://github.com/readmeio/api/issues/189)
* chore(deps-dev): bump eslint from 7.11.0 to 7.12.0 (#186) ([1661310](https://github.com/readmeio/api/commit/1661310)), closes [#186](https://github.com/readmeio/api/issues/186)
* chore(deps-dev): bump eslint from 7.12.0 to 7.12.1 (#192) ([d0d838d](https://github.com/readmeio/api/commit/d0d838d)), closes [#192](https://github.com/readmeio/api/issues/192)
* chore(deps-dev): bump jest from 26.5.3 to 26.6.1 (#188) ([e25388e](https://github.com/readmeio/api/commit/e25388e)), closes [#188](https://github.com/readmeio/api/issues/188)
* chore(deps): bump @readme/httpsnippet from 2.2.2 to 2.2.3 (#187) ([530fa45](https://github.com/readmeio/api/commit/530fa45)), closes [#187](https://github.com/readmeio/api/issues/187)
* chore(deps): bump @readme/oas-to-har from 8.1.0 to 9.0.0 (#191) ([f50bbb0](https://github.com/readmeio/api/commit/f50bbb0)), closes [#191](https://github.com/readmeio/api/issues/191)
* chore(deps): bump actions/setup-node from v2.1.1 to v2.1.2 (#190) ([f4745f9](https://github.com/readmeio/api/commit/f4745f9)), closes [#190](https://github.com/readmeio/api/issues/190)



## <small>2.4.3 (2020-10-21)</small>

* v2.4.3 ([621ed10](https://github.com/readmeio/api/commit/621ed10))
* chore(deps): upgrading @readme/oas-to-har to 8.1.0 ([f2d3af7](https://github.com/readmeio/api/commit/f2d3af7))
* chore(deps): upgrading oas to 5.0 ([0351595](https://github.com/readmeio/api/commit/0351595))



## <small>2.4.2 (2020-10-21)</small>

* v2.4.2 ([d707575](https://github.com/readmeio/api/commit/d707575))
* fix: pinning httpsnippet-client-api to oas@4.0.0 ([29af3be](https://github.com/readmeio/api/commit/29af3be))



## <small>2.4.1 (2020-10-20)</small>

* v2.4.1 ([3a49483](https://github.com/readmeio/api/commit/3a49483))
* chore(deps-dev): bump @readme/eslint-config from 3.6.0 to 3.6.1 (#183) ([33996b0](https://github.com/readmeio/api/commit/33996b0)), closes [#183](https://github.com/readmeio/api/issues/183)
* chore(deps): bump @readme/oas-to-har from 7.5.0 to 8.0.1 (#182) ([a2052bb](https://github.com/readmeio/api/commit/a2052bb)), closes [#182](https://github.com/readmeio/api/issues/182)
* chore(deps): bump @readme/oas-tooling from 3.6.0 to 3.6.1 (#184) ([3d86be9](https://github.com/readmeio/api/commit/3d86be9)), closes [#184](https://github.com/readmeio/api/issues/184)
* chore(deps): swapping `@readme/oas-tooling` for `oas` (#185) ([d9ced1c](https://github.com/readmeio/api/commit/d9ced1c)), closes [#185](https://github.com/readmeio/api/issues/185)



## 2.4.0 (2020-10-16)

* v2.4.0 ([2d65241](https://github.com/readmeio/api/commit/2d65241))
* chore: test cleanup (#181) ([1fe0e95](https://github.com/readmeio/api/commit/1fe0e95)), closes [#181](https://github.com/readmeio/api/issues/181)
* fix: adding support for non-alphanumerical operation ids (#180) ([fd075a0](https://github.com/readmeio/api/commit/fd075a0)), closes [#180](https://github.com/readmeio/api/issues/180)
* fix: basic auth headers now decoded and exploded into `.auth()` calls (#179) ([2351b95](https://github.com/readmeio/api/commit/2351b95)), closes [#179](https://github.com/readmeio/api/issues/179)



## <small>2.3.3 (2020-10-15)</small>

* v2.3.3 ([17b475b](https://github.com/readmeio/api/commit/17b475b))
* fix: adding a `.catch()` statement to code snippets (#177) ([d7c8613](https://github.com/readmeio/api/commit/d7c8613)), closes [#177](https://github.com/readmeio/api/issues/177)
* chore(deps-dev): bump @readme/eslint-config from 3.5.0 to 3.6.0 (#173) ([9f8d0f2](https://github.com/readmeio/api/commit/9f8d0f2)), closes [#173](https://github.com/readmeio/api/issues/173)
* chore(deps-dev): bump @readme/oas-examples from 3.5.13 to 3.6.0 (#174) ([9c4b118](https://github.com/readmeio/api/commit/9c4b118)), closes [#174](https://github.com/readmeio/api/issues/174)
* chore(deps-dev): bump eslint from 7.10.0 to 7.11.0 (#175) ([be9393f](https://github.com/readmeio/api/commit/be9393f)), closes [#175](https://github.com/readmeio/api/issues/175)
* chore(deps-dev): bump jest from 26.4.2 to 26.5.3 (#171) ([b4cbc9f](https://github.com/readmeio/api/commit/b4cbc9f)), closes [#171](https://github.com/readmeio/api/issues/171)
* chore(deps): bump @readme/oas-to-har from 7.3.0 to 7.5.0 (#170) ([f26bb01](https://github.com/readmeio/api/commit/f26bb01)), closes [#170](https://github.com/readmeio/api/issues/170)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.14 (#169) ([524915a](https://github.com/readmeio/api/commit/524915a)), closes [#169](https://github.com/readmeio/api/issues/169)
* chore(deps): bump @readme/oas-tooling from 3.5.14 to 3.6.0 (#172) ([6bd2fb3](https://github.com/readmeio/api/commit/6bd2fb3)), closes [#172](https://github.com/readmeio/api/issues/172)



## <small>2.3.2 (2020-10-05)</small>

* v2.3.2 ([627cb28](https://github.com/readmeio/api/commit/627cb28))
* chore(deps-dev): bump @commitlint/cli from 9.1.2 to 11.0.0 (#158) ([a068e8f](https://github.com/readmeio/api/commit/a068e8f)), closes [#158](https://github.com/readmeio/api/issues/158)
* chore(deps-dev): bump @commitlint/config-conventional (#159) ([c084c27](https://github.com/readmeio/api/commit/c084c27)), closes [#159](https://github.com/readmeio/api/issues/159)
* chore(deps-dev): bump @readme/eslint-config from 3.4.2 to 3.4.3 (#155) ([efb446e](https://github.com/readmeio/api/commit/efb446e)), closes [#155](https://github.com/readmeio/api/issues/155)
* chore(deps-dev): bump @readme/eslint-config from 3.4.3 to 3.5.0 (#161) ([68d69ee](https://github.com/readmeio/api/commit/68d69ee)), closes [#161](https://github.com/readmeio/api/issues/161)
* chore(deps-dev): bump @readme/oas-examples from 3.5.5 to 3.5.13 (#164) ([1f5d2f1](https://github.com/readmeio/api/commit/1f5d2f1)), closes [#164](https://github.com/readmeio/api/issues/164)
* chore(deps-dev): bump eslint from 7.8.1 to 7.9.0 (#157) ([3f04da5](https://github.com/readmeio/api/commit/3f04da5)), closes [#157](https://github.com/readmeio/api/issues/157)
* chore(deps-dev): bump eslint from 7.9.0 to 7.10.0 (#166) ([d021965](https://github.com/readmeio/api/commit/d021965)), closes [#166](https://github.com/readmeio/api/issues/166)
* chore(deps-dev): bump husky from 4.2.5 to 4.3.0 (#160) ([54c9c0c](https://github.com/readmeio/api/commit/54c9c0c)), closes [#160](https://github.com/readmeio/api/issues/160)
* chore(deps-dev): bump prettier from 2.1.1 to 2.1.2 (#162) ([6d31ded](https://github.com/readmeio/api/commit/6d31ded)), closes [#162](https://github.com/readmeio/api/issues/162)
* chore(deps): bump @readme/oas-to-har from 7.2.1 to 7.3.0 (#163) ([5a915ca](https://github.com/readmeio/api/commit/5a915ca)), closes [#163](https://github.com/readmeio/api/issues/163)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.13 (#165) ([5b8cd08](https://github.com/readmeio/api/commit/5b8cd08)), closes [#165](https://github.com/readmeio/api/issues/165)
* chore(deps): bump actions/checkout from v2.3.2 to v2.3.3 (#167) ([3f12362](https://github.com/readmeio/api/commit/3f12362)), closes [#167](https://github.com/readmeio/api/issues/167)
* chore(deps): bump fetch-har from 4.0.1 to 4.0.2 (#156) ([2c3314e](https://github.com/readmeio/api/commit/2c3314e)), closes [#156](https://github.com/readmeio/api/issues/156)
* chore(deps): bump path-to-regexp from 6.1.0 to 6.2.0 (#168) ([7ccf66c](https://github.com/readmeio/api/commit/7ccf66c)), closes [#168](https://github.com/readmeio/api/issues/168)



## <small>2.3.1 (2020-09-08)</small>

* v2.3.1 ([be10f84](https://github.com/readmeio/api/commit/be10f84))
* fix: if no cache dir is determined, fallback to the os temp dir (#154) ([e0525f0](https://github.com/readmeio/api/commit/e0525f0)), closes [#154](https://github.com/readmeio/api/issues/154) [#107](https://github.com/readmeio/api/issues/107)
* chore(deps-dev): bump @readme/eslint-config from 3.4.1 to 3.4.2 (#144) ([5e7bc96](https://github.com/readmeio/api/commit/5e7bc96)), closes [#144](https://github.com/readmeio/api/issues/144)
* chore(deps-dev): bump eslint from 7.7.0 to 7.8.1 (#152) ([be44467](https://github.com/readmeio/api/commit/be44467)), closes [#152](https://github.com/readmeio/api/issues/152)
* chore(deps-dev): bump jest from 26.4.0 to 26.4.2 (#143) ([831d12c](https://github.com/readmeio/api/commit/831d12c)), closes [#143](https://github.com/readmeio/api/issues/143)
* chore(deps-dev): bump mock-fs from 4.12.0 to 4.13.0 (#145) ([69a87fa](https://github.com/readmeio/api/commit/69a87fa)), closes [#145](https://github.com/readmeio/api/issues/145)
* chore(deps-dev): bump prettier from 2.0.5 to 2.1.1 (#147) ([565939e](https://github.com/readmeio/api/commit/565939e)), closes [#147](https://github.com/readmeio/api/issues/147)
* chore(deps): bump @readme/httpsnippet from 2.0.1 to 2.1.1 (#148) ([4046808](https://github.com/readmeio/api/commit/4046808)), closes [#148](https://github.com/readmeio/api/issues/148)
* chore(deps): bump @readme/oas-to-har from 7.0.0 to 7.2.0 (#146) ([53a08a5](https://github.com/readmeio/api/commit/53a08a5)), closes [#146](https://github.com/readmeio/api/issues/146)
* chore(deps): bump @readme/oas-to-har from 7.2.0 to 7.2.1 (#153) ([7368d93](https://github.com/readmeio/api/commit/7368d93)), closes [#153](https://github.com/readmeio/api/issues/153)
* chore(deps): bump @readme/oas-tooling from 3.5.8 to 3.5.11 (#149) ([845e147](https://github.com/readmeio/api/commit/845e147)), closes [#149](https://github.com/readmeio/api/issues/149)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#151) ([d740da5](https://github.com/readmeio/api/commit/d740da5)), closes [#151](https://github.com/readmeio/api/issues/151)
* chore(deps): update actions/checkout requirement to v2.3.2 (#150) ([aacc532](https://github.com/readmeio/api/commit/aacc532)), closes [#150](https://github.com/readmeio/api/issues/150)



## 2.3.0 (2020-08-17)

* v2.3.0 ([bb65e11](https://github.com/readmeio/api/commit/bb65e11))
* feat: support multipart/form-data (#132) ([8f28341](https://github.com/readmeio/api/commit/8f28341)), closes [#132](https://github.com/readmeio/api/issues/132)
* chore(deps-dev): bump @commitlint/cli from 9.1.1 to 9.1.2 (#142) ([a4f70bf](https://github.com/readmeio/api/commit/a4f70bf)), closes [#142](https://github.com/readmeio/api/issues/142)
* chore(deps-dev): bump @commitlint/config-conventional (#138) ([125a08a](https://github.com/readmeio/api/commit/125a08a)), closes [#138](https://github.com/readmeio/api/issues/138)
* chore(deps-dev): bump @readme/eslint-config from 3.4.0 to 3.4.1 (#133) ([d65621b](https://github.com/readmeio/api/commit/d65621b)), closes [#133](https://github.com/readmeio/api/issues/133)
* chore(deps-dev): bump conventional-changelog-cli from 2.0.34 to 2.1.0 (#134) ([432dba7](https://github.com/readmeio/api/commit/432dba7)), closes [#134](https://github.com/readmeio/api/issues/134)
* chore(deps-dev): bump eslint from 7.6.0 to 7.7.0 (#137) ([baf6fe0](https://github.com/readmeio/api/commit/baf6fe0)), closes [#137](https://github.com/readmeio/api/issues/137)
* chore(deps-dev): bump jest from 26.2.2 to 26.4.0 (#141) ([16bc760](https://github.com/readmeio/api/commit/16bc760)), closes [#141](https://github.com/readmeio/api/issues/141)
* chore(deps-dev): bump nock from 13.0.3 to 13.0.4 (#135) ([34f7cf7](https://github.com/readmeio/api/commit/34f7cf7)), closes [#135](https://github.com/readmeio/api/issues/135)
* chore(deps-dev): upgrading @readme/eslint-config and eslint ([992651c](https://github.com/readmeio/api/commit/992651c))
* chore(deps): bump @readme/oas-to-har from 6.15.2 to 6.16.1 (#139) ([47db45a](https://github.com/readmeio/api/commit/47db45a)), closes [#139](https://github.com/readmeio/api/issues/139)
* chore(deps): bump @readme/oas-tooling from 3.5.6 to 3.5.8 (#136) ([4416c87](https://github.com/readmeio/api/commit/4416c87)), closes [#136](https://github.com/readmeio/api/issues/136)



## <small>2.2.3 (2020-08-03)</small>

* v2.2.3 ([3b20492](https://github.com/readmeio/api/commit/3b20492))
* fix: auth keys not being properly escaped (#129) ([b0923eb](https://github.com/readmeio/api/commit/b0923eb)), closes [#129](https://github.com/readmeio/api/issues/129)



## <small>2.2.2 (2020-08-03)</small>

* v2.2.2 ([6efa4e0](https://github.com/readmeio/api/commit/6efa4e0))
* ci: setting up codeql workflows (#127) ([62707be](https://github.com/readmeio/api/commit/62707be)), closes [#127](https://github.com/readmeio/api/issues/127)
* chore(deps-dev): bump @readme/eslint-config from 3.3.3 to 3.4.0 (#121) ([f393edc](https://github.com/readmeio/api/commit/f393edc)), closes [#121](https://github.com/readmeio/api/issues/121)
* chore(deps-dev): bump eslint from 7.5.0 to 7.6.0 (#122) ([0eb173b](https://github.com/readmeio/api/commit/0eb173b)), closes [#122](https://github.com/readmeio/api/issues/122)
* chore(deps-dev): bump jest from 26.1.0 to 26.2.2 (#126) ([4229c34](https://github.com/readmeio/api/commit/4229c34)), closes [#126](https://github.com/readmeio/api/issues/126)
* chore(deps-dev): bump nock from 13.0.2 to 13.0.3 (#125) ([fcc2d45](https://github.com/readmeio/api/commit/fcc2d45)), closes [#125](https://github.com/readmeio/api/issues/125)
* chore(deps): bump @readme/oas-to-har from 6.14.0 to 6.15.2 (#123) ([c6203a6](https://github.com/readmeio/api/commit/c6203a6)), closes [#123](https://github.com/readmeio/api/issues/123)
* chore(deps): bump @readme/oas-tooling from 3.5.5 to 3.5.6 (#124) ([1c179d8](https://github.com/readmeio/api/commit/1c179d8)), closes [#124](https://github.com/readmeio/api/issues/124)
* chore(deps): bump actions/setup-node from v2.1.0 to v2.1.1 (#120) ([6b915cf](https://github.com/readmeio/api/commit/6b915cf)), closes [#120](https://github.com/readmeio/api/issues/120)



## <small>2.2.1 (2020-07-27)</small>

* v2.2.1 ([09667db](https://github.com/readmeio/api/commit/09667db))
* chore: cleaning up the package-lock ([7d4ec59](https://github.com/readmeio/api/commit/7d4ec59))
* chore(deps-dev): bump @commitlint/cli from 9.0.1 to 9.1.1 (#109) ([7f0eaec](https://github.com/readmeio/api/commit/7f0eaec)), closes [#109](https://github.com/readmeio/api/issues/109)
* chore(deps-dev): bump @commitlint/config-conventional (#116) ([ee0f79c](https://github.com/readmeio/api/commit/ee0f79c)), closes [#116](https://github.com/readmeio/api/issues/116)
* chore(deps-dev): bump @readme/eslint-config from 3.3.2 to 3.3.3 (#118) ([963a235](https://github.com/readmeio/api/commit/963a235)), closes [#118](https://github.com/readmeio/api/issues/118)
* chore(deps-dev): bump @readme/oas-examples from 3.4.0 to 3.5.5 (#113) ([a7b4561](https://github.com/readmeio/api/commit/a7b4561)), closes [#113](https://github.com/readmeio/api/issues/113)
* chore(deps-dev): bump eslint from 7.4.0 to 7.5.0 (#110) ([cd29a03](https://github.com/readmeio/api/commit/cd29a03)), closes [#110](https://github.com/readmeio/api/issues/110)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#115) ([a129798](https://github.com/readmeio/api/commit/a129798)), closes [#115](https://github.com/readmeio/api/issues/115)
* chore(deps): bump @apidevtools/swagger-parser from 9.0.1 to 10.0.1 (#112) ([a3aed98](https://github.com/readmeio/api/commit/a3aed98)), closes [#112](https://github.com/readmeio/api/issues/112)
* chore(deps): bump @readme/oas-tooling from 3.5.0 to 3.5.5 (#111) ([5621fad](https://github.com/readmeio/api/commit/5621fad)), closes [#111](https://github.com/readmeio/api/issues/111)
* chore(deps): bump fetch-har from 3.0.0 to 3.0.2 (#114) ([41efd8b](https://github.com/readmeio/api/commit/41efd8b)), closes [#114](https://github.com/readmeio/api/issues/114)
* chore(deps): bump httpsnippet from 1.20.0 to 1.21.0 (#117) ([e5d5082](https://github.com/readmeio/api/commit/e5d5082)), closes [#117](https://github.com/readmeio/api/issues/117)
* chore(deps): bump lodash from 4.17.15 to 4.17.19 (#108) ([9d4c12a](https://github.com/readmeio/api/commit/9d4c12a)), closes [#108](https://github.com/readmeio/api/issues/108)



## 2.2.0 (2020-07-13)

* v2.2.0 ([fa9fa64](https://github.com/readmeio/api/commit/fa9fa64))
* feat: automatically reject the sdk promise for error statuses (#105) ([827f32a](https://github.com/readmeio/api/commit/827f32a)), closes [#105](https://github.com/readmeio/api/issues/105)
* feat: setting a custom user agent for all requests (#106) ([25cefef](https://github.com/readmeio/api/commit/25cefef)), closes [#106](https://github.com/readmeio/api/issues/106)



## <small>2.1.6 (2020-07-06)</small>

* v2.1.6 ([cc67a0c](https://github.com/readmeio/api/commit/cc67a0c))
* chore(deps-dev): bump @commitlint/cli from 8.3.5 to 9.0.1 (#87) ([5e99252](https://github.com/readmeio/api/commit/5e99252)), closes [#87](https://github.com/readmeio/api/issues/87)
* chore(deps-dev): bump @commitlint/config-conventional (#88) ([a08be1f](https://github.com/readmeio/api/commit/a08be1f)), closes [#88](https://github.com/readmeio/api/issues/88)
* chore(deps-dev): bump @readme/eslint-config from 3.2.0 to 3.3.0 (#90) ([7c286ac](https://github.com/readmeio/api/commit/7c286ac)), closes [#90](https://github.com/readmeio/api/issues/90)
* chore(deps-dev): bump @readme/eslint-config from 3.3.0 to 3.3.2 (#99) ([038e6e2](https://github.com/readmeio/api/commit/038e6e2)), closes [#99](https://github.com/readmeio/api/issues/99)
* chore(deps-dev): bump eslint from 7.2.0 to 7.3.1 (#93) ([d96b2c9](https://github.com/readmeio/api/commit/d96b2c9)), closes [#93](https://github.com/readmeio/api/issues/93)
* chore(deps-dev): bump eslint from 7.3.1 to 7.4.0 (#95) ([a1d7eed](https://github.com/readmeio/api/commit/a1d7eed)), closes [#95](https://github.com/readmeio/api/issues/95)
* chore(deps-dev): bump jest from 26.0.1 to 26.1.0 (#92) ([c388924](https://github.com/readmeio/api/commit/c388924)), closes [#92](https://github.com/readmeio/api/issues/92)
* chore(deps-dev): bump nock from 12.0.3 to 13.0.0 (#91) ([52c9202](https://github.com/readmeio/api/commit/52c9202)), closes [#91](https://github.com/readmeio/api/issues/91)
* chore(deps-dev): bump nock from 13.0.0 to 13.0.2 (#97) ([cafd323](https://github.com/readmeio/api/commit/cafd323)), closes [#97](https://github.com/readmeio/api/issues/97)
* chore(deps): bump @readme/oas-to-har from 6.10.2 to 6.11.1 (#85) ([0d0c59e](https://github.com/readmeio/api/commit/0d0c59e)), closes [#85](https://github.com/readmeio/api/issues/85)
* chore(deps): bump @readme/oas-to-har from 6.11.1 to 6.14.0 (#98) ([a3b7b7d](https://github.com/readmeio/api/commit/a3b7b7d)), closes [#98](https://github.com/readmeio/api/issues/98)
* chore(deps): bump @readme/oas-tooling from 3.4.5 to 3.4.7 (#83) ([c341070](https://github.com/readmeio/api/commit/c341070)), closes [#83](https://github.com/readmeio/api/issues/83)
* chore(deps): bump @readme/oas-tooling from 3.4.7 to 3.5.0 (#96) ([32aa6d5](https://github.com/readmeio/api/commit/32aa6d5)), closes [#96](https://github.com/readmeio/api/issues/96)
* chore(deps): bump actions/checkout from v2.2.0 to v2.3.1 (#89) ([51d9be7](https://github.com/readmeio/api/commit/51d9be7)), closes [#89](https://github.com/readmeio/api/issues/89)
* chore(deps): bump actions/setup-node from v2.0.0 to v2.1.0 (#94) ([d5a18ce](https://github.com/readmeio/api/commit/d5a18ce)), closes [#94](https://github.com/readmeio/api/issues/94)
* chore(deps): bump fetch-har from 2.3.2 to 3.0.0 (#100) ([6fbe358](https://github.com/readmeio/api/commit/6fbe358)), closes [#100](https://github.com/readmeio/api/issues/100)
* feat: cleaning up api snippets by breaking off the auth call (#101) ([d76ba9e](https://github.com/readmeio/api/commit/d76ba9e)), closes [#101](https://github.com/readmeio/api/issues/101)
* docs: cleaning up the pr template ([6539d14](https://github.com/readmeio/api/commit/6539d14))
* ci: changing the label that dependabot uses ([57917ce](https://github.com/readmeio/api/commit/57917ce))



## <small>2.1.5 (2020-06-19)</small>

* v2.1.5 ([e5bfdca](https://github.com/readmeio/api/commit/e5bfdca))
* build: some more attempts at changelog improvements ([ddcb46d](https://github.com/readmeio/api/commit/ddcb46d))
* chore(deps): upgrading @readme/oas-tooling to 3.4.7 (#82) ([1e19988](https://github.com/readmeio/api/commit/1e19988)), closes [#82](https://github.com/readmeio/api/issues/82)
* docs: changelog typo resolutions ([cbd7862](https://github.com/readmeio/api/commit/cbd7862))



## <small>2.1.4 (2020-06-19)</small>

* v2.1.4 ([386d713](https://github.com/readmeio/api/commit/386d713))
* build: setting an empty version in the root package file for changelogs ([f7e5db6](https://github.com/readmeio/api/commit/f7e5db6))
* fix: minor cleanup and clarification on the fix in 996da5b ([8fbe624](https://github.com/readmeio/api/commit/8fbe624))
* docs: fixing a typo in the changelog ([996da5b](https://github.com/readmeio/api/commit/996da5b))



## <small>2.1.3 (2020-06-19)</small>

* v2.1.3 ([33fc797](https://github.com/readmeio/api/commit/33fc797))
* build: working to get changelogs automatically updated ([074cbb8](https://github.com/readmeio/api/commit/074cbb8))
* fix: issues where path params wouldn't always get added as metadata (#80) ([5215366](https://github.com/readmeio/api/commit/5215366)), closes [#80](https://github.com/readmeio/api/issues/80)
* docs: updating the changelog ([27e23c4](https://github.com/readmeio/api/commit/27e23c4))



## <small>2.1.2 (2020-06-18)</small>

* v2.1.2 ([22dec18](https://github.com/readmeio/api/commit/22dec18))
* fix: bug where path params wouldn't be included in snippets (#79) ([719e2e0](https://github.com/readmeio/api/commit/719e2e0)), closes [#79](https://github.com/readmeio/api/issues/79)
* docs: updating the changelog ([aad2cf4](https://github.com/readmeio/api/commit/aad2cf4))



## <small>2.1.1 (2020-06-17)</small>

* v2.1.1 ([e855892](https://github.com/readmeio/api/commit/e855892))
* fix: snippet paths should not include the server url (#77) ([a812f0b](https://github.com/readmeio/api/commit/a812f0b)), closes [#77](https://github.com/readmeio/api/issues/77)
* chore(deps-dev): bump lerna from 3.22.0 to 3.22.1 (#74) ([7c270c2](https://github.com/readmeio/api/commit/7c270c2)), closes [#74](https://github.com/readmeio/api/issues/74)
* chore(deps): bump @readme/oas-to-har from 6.10.0 to 6.10.2 (#73) ([1b4568c](https://github.com/readmeio/api/commit/1b4568c)), closes [#73](https://github.com/readmeio/api/issues/73)
* chore(deps): bump @readme/oas-tooling from 3.4.3 to 3.4.5 (#75) ([05e5204](https://github.com/readmeio/api/commit/05e5204)), closes [#75](https://github.com/readmeio/api/issues/75)



## 2.1.0 (2020-06-12)

* v2.1.0 ([3802a50](https://github.com/readmeio/api/commit/3802a50))
* fix: relative paths in parent parent directories not being supported (#67) ([dba888b](https://github.com/readmeio/api/commit/dba888b)), closes [#67](https://github.com/readmeio/api/issues/67)
* fix: various code snippet issues and deficiencies (#72) ([c5e4eeb](https://github.com/readmeio/api/commit/c5e4eeb)), closes [#72](https://github.com/readmeio/api/issues/72)
* chore: configuring dependabot to also update our github actions ([e8a90ea](https://github.com/readmeio/api/commit/e8a90ea))
* chore: moving off our httpsnippet fork and to v1.20.x (#64) ([45b0e2a](https://github.com/readmeio/api/commit/45b0e2a)), closes [#64](https://github.com/readmeio/api/issues/64)
* chore(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#57) ([2d4fa96](https://github.com/readmeio/api/commit/2d4fa96)), closes [#57](https://github.com/readmeio/api/issues/57)
* chore(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#63) ([919bdd9](https://github.com/readmeio/api/commit/919bdd9)), closes [#63](https://github.com/readmeio/api/issues/63)
* chore(deps-dev): upgrading @readme/eslint-config to 3.2.0 (#70) ([3b26c2e](https://github.com/readmeio/api/commit/3b26c2e)), closes [#70](https://github.com/readmeio/api/issues/70)
* chore(deps): bump @readme/oas-to-har from 6.9.6 to 6.10.0 (#59) ([9ef271a](https://github.com/readmeio/api/commit/9ef271a)), closes [#59](https://github.com/readmeio/api/issues/59)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#54) ([b58e8e3](https://github.com/readmeio/api/commit/b58e8e3)), closes [#54](https://github.com/readmeio/api/issues/54)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#58) ([f66cae2](https://github.com/readmeio/api/commit/f66cae2)), closes [#58](https://github.com/readmeio/api/issues/58)
* chore(deps): bump actions/checkout from v1 to v2.2.0 (#65) ([47d99e4](https://github.com/readmeio/api/commit/47d99e4)), closes [#65](https://github.com/readmeio/api/issues/65)
* chore(deps): bump actions/setup-node from v1 to v2.0.0 (#66) ([6a46c6c](https://github.com/readmeio/api/commit/6a46c6c)), closes [#66](https://github.com/readmeio/api/issues/66)
* chore(deps): bump fetch-har from 2.3.1 to 2.3.2 (#60) ([1a1ebe7](https://github.com/readmeio/api/commit/1a1ebe7)), closes [#60](https://github.com/readmeio/api/issues/60)
* chore(deps): swapping yaml for js-yaml (#69) ([fc04a9f](https://github.com/readmeio/api/commit/fc04a9f)), closes [#69](https://github.com/readmeio/api/issues/69)
* feat: adding test cases for supporting unchained auth usage (#68) ([0a73b49](https://github.com/readmeio/api/commit/0a73b49)), closes [#68](https://github.com/readmeio/api/issues/68)
* style: updating dependabot to follow our commit standards ([b6a29be](https://github.com/readmeio/api/commit/b6a29be))
* ci: changing the dep update frequency to weekly ([285d042](https://github.com/readmeio/api/commit/285d042))
* ci: create Dependabot config file (#56) ([38110a0](https://github.com/readmeio/api/commit/38110a0)), closes [#56](https://github.com/readmeio/api/issues/56)



## <small>2.0.2 (2020-05-30)</small>

* Bump eslint from 7.0.0 to 7.1.0 (#48) ([fcd657b](https://github.com/readmeio/api/commit/fcd657b)), closes [#48](https://github.com/readmeio/api/issues/48)
* Bump jest from 25.5.4 to 26.0.1 (#46) ([adf39a1](https://github.com/readmeio/api/commit/adf39a1)), closes [#46](https://github.com/readmeio/api/issues/46)
* Bump yaml from 1.9.2 to 1.10.0 (#45) ([26d3edd](https://github.com/readmeio/api/commit/26d3edd)), closes [#45](https://github.com/readmeio/api/issues/45)
* v2.0.2 ([c504232](https://github.com/readmeio/api/commit/c504232))
* chore: moving the repository over to a monorepo directory tree (#51) ([a82fcdd](https://github.com/readmeio/api/commit/a82fcdd)), closes [#51](https://github.com/readmeio/api/issues/51)
* chore: setting the base lerna version to the current version ([063a449](https://github.com/readmeio/api/commit/063a449))
* feat: HTTP Snippet client for Node samples (#52) ([cf72740](https://github.com/readmeio/api/commit/cf72740)), closes [#52](https://github.com/readmeio/api/issues/52)
* docs: updating our CoC enforcement email address ([5609db4](https://github.com/readmeio/api/commit/5609db4))



## <small>2.0.1 (2020-05-26)</small>

* build: 2.0.1 release ([e663a9c](https://github.com/readmeio/api/commit/e663a9c))
* fix(package.main): specify the entry point file (#50) ([05727c4](https://github.com/readmeio/api/commit/05727c4)), closes [#50](https://github.com/readmeio/api/issues/50)



## 2.0.0 (2020-05-21)

* build: 2.0.0 release ([7b66318](https://github.com/readmeio/api/commit/7b66318))
* docs: adding a changelog and enforcing commit styles (#44) ([cc07150](https://github.com/readmeio/api/commit/cc07150)), closes [#44](https://github.com/readmeio/api/issues/44)
* docs: adding a code of conduct and contribution guide ([f023b41](https://github.com/readmeio/api/commit/f023b41))
* SDK Generation (#28) ([adab436](https://github.com/readmeio/api/commit/adab436)), closes [#28](https://github.com/readmeio/api/issues/28)
* chore: pulling over our common pull request template ([609c1ba](https://github.com/readmeio/api/commit/609c1ba))
* chore: relicensing under the MIT license ([5253c44](https://github.com/readmeio/api/commit/5253c44))
* chore: wiping the slate clean for a rewrite (#27) ([a27e006](https://github.com/readmeio/api/commit/a27e006)), closes [#27](https://github.com/readmeio/api/issues/27)



## 1.0.0 (2018-01-20)

* 1.0.0 ([083dd18](https://github.com/readmeio/api/commit/083dd18))
* Add babel compilation on prepublish ([afca7ca](https://github.com/readmeio/api/commit/afca7ca))
* Add output functionality (#24) ([617aa52](https://github.com/readmeio/api/commit/617aa52)), closes [#24](https://github.com/readmeio/api/issues/24)
* Bugfix/incorrect wrap (#25) ([645b6e9](https://github.com/readmeio/api/commit/645b6e9)), closes [#25](https://github.com/readmeio/api/issues/25)
* Build the src using babel pre-test for non watching mocha ([ff0b488](https://github.com/readmeio/api/commit/ff0b488))
* Fix local linking ([a68e514](https://github.com/readmeio/api/commit/a68e514))
* Move all code into src/ folder ([1ed313d](https://github.com/readmeio/api/commit/1ed313d))
* Run tests from dist/ to make sure babel has done it's job properly ([61dd4d0](https://github.com/readmeio/api/commit/61dd4d0))
* Support sending files to build services (#23) ([1213368](https://github.com/readmeio/api/commit/1213368)), closes [#23](https://github.com/readmeio/api/issues/23)
* Turn off babel module transformation ([6b47c7d](https://github.com/readmeio/api/commit/6b47c7d)), closes [/github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js#L71](https://github.com//github.com/readmeio/api/blob/e0de5379b2d9e6a7762a30386ad68ff504f878cf/api.js/issues/L71)



## 1.0.0-8 (2017-09-25)

* 1.0.0-8 ([e0de537](https://github.com/readmeio/api/commit/e0de537))
* Add circleci badge to the readme ([8f1d813](https://github.com/readmeio/api/commit/8f1d813))
* Clean up error messages by not showing error stack ([a672245](https://github.com/readmeio/api/commit/a672245))



## 1.0.0-7 (2017-09-21)

* 1.0.0-7 ([17c39ee](https://github.com/readmeio/api/commit/17c39ee))
* Add code coverage to codeclimate ([95b49f0](https://github.com/readmeio/api/commit/95b49f0))
* Fix bug with deploying private services ([550ac03](https://github.com/readmeio/api/commit/550ac03))
* Remove secrets from api help ([00f8b20](https://github.com/readmeio/api/commit/00f8b20))



## 1.0.0-6 (2017-09-07)

* 1.0.0-6 ([9ac6a7a](https://github.com/readmeio/api/commit/9ac6a7a))
* Fix spacing for init ([df5596d](https://github.com/readmeio/api/commit/df5596d))



## 1.0.0-5 (2017-09-07)

* 1.0.0-5 ([db451aa](https://github.com/readmeio/api/commit/db451aa))
* Ask to create new directory if api init is run with files already existing ([1367246](https://github.com/readmeio/api/commit/1367246))



## 1.0.0-4 (2017-09-05)

* 1.0.0-4 ([c3b875f](https://github.com/readmeio/api/commit/c3b875f))
* Add metadata to package.json ([dbe5de6](https://github.com/readmeio/api/commit/dbe5de6))



## 1.0.0-3 (2017-09-05)

* 1.0.0-3 ([6ac40df](https://github.com/readmeio/api/commit/6ac40df))
* Add docs and fix tests ([b11804f](https://github.com/readmeio/api/commit/b11804f))
* Add message if they try to deploy without editing comments ([235e2bc](https://github.com/readmeio/api/commit/235e2bc))
* Add nicer message if they need to upgrade to do something ([d5981e0](https://github.com/readmeio/api/commit/d5981e0))
* Add test ([c62190f](https://github.com/readmeio/api/commit/c62190f))
* Add warning private services requires paid plan ([8b4bc2b](https://github.com/readmeio/api/commit/8b4bc2b))
* Added tests ([a933796](https://github.com/readmeio/api/commit/a933796))
* Clean code up ([f76b1b5](https://github.com/readmeio/api/commit/f76b1b5))
* cleanup ([8cad8ce](https://github.com/readmeio/api/commit/8cad8ce))
* Don't need imports in tests anymore ([f08bbf8](https://github.com/readmeio/api/commit/f08bbf8))
* Don't need this since we are loading from the home directory ([2f52e88](https://github.com/readmeio/api/commit/2f52e88))
* Fix bug where linked service was always used, even without running `api link service` ([5273229](https://github.com/readmeio/api/commit/5273229))
* Fixes if no comments exist at all ([50a0974](https://github.com/readmeio/api/commit/50a0974))
* link -> unlink ([0d7fee3](https://github.com/readmeio/api/commit/0d7fee3))
* Make sure shared directory exists first ([986cdf3](https://github.com/readmeio/api/commit/986cdf3))
* Refactor `api link` to use a folder in the home directory ([18aefa3](https://github.com/readmeio/api/commit/18aefa3))
* Update build-docs ([5f8ba74](https://github.com/readmeio/api/commit/5f8ba74))
* update test ([e0badd4](https://github.com/readmeio/api/commit/e0badd4))
* Update to circleci2 ([1fbb21c](https://github.com/readmeio/api/commit/1fbb21c))
* Use home directory for login cookie ([1af5fa8](https://github.com/readmeio/api/commit/1af5fa8))



## 1.0.0-2 (2017-08-23)

* 1.0.0-2 ([07d0e9d](https://github.com/readmeio/api/commit/07d0e9d))
* Another readme fix ([7045e38](https://github.com/readmeio/api/commit/7045e38))
* Make sure we tell them to edit the file in endpoints/ ([722211f](https://github.com/readmeio/api/commit/722211f))
* Whoops. Removing more not needed readme stuff ([0765446](https://github.com/readmeio/api/commit/0765446))



## 1.0.0-1 (2017-08-23)

* 1.0.0-1 ([70eaf91](https://github.com/readmeio/api/commit/70eaf91))
* Update readme. Remove api.create stuff ([81f5cb9](https://github.com/readmeio/api/commit/81f5cb9))



## 1.0.0-0 (2017-08-23)

* 1.0.0-0 ([2761be6](https://github.com/readmeio/api/commit/2761be6))
* Action -> Endpoint ([c2a959d](https://github.com/readmeio/api/commit/c2a959d))
* Add a default to the generated code ([56541cf](https://github.com/readmeio/api/commit/56541cf))
* Add a way to see your keys ([a858e3b](https://github.com/readmeio/api/commit/a858e3b))
* Add higher coverage thresholds ([6b0c2ff](https://github.com/readmeio/api/commit/6b0c2ff))
* bump ([d2a91b6](https://github.com/readmeio/api/commit/d2a91b6))
* Bump ([5aa6879](https://github.com/readmeio/api/commit/5aa6879))
* Bump version of build-docs to 2.0.0 ([4faec3c](https://github.com/readmeio/api/commit/4faec3c))
* Clean up a bit ([c3ae266](https://github.com/readmeio/api/commit/c3ae266))
* I don't think the post-install step works all the time ([6b9c732](https://github.com/readmeio/api/commit/6b9c732))
* If the user attempts to use a key starting with `demo` then print a warning ([4c3ab01](https://github.com/readmeio/api/commit/4c3ab01))
* Let's not get too excited... ([c35d126](https://github.com/readmeio/api/commit/c35d126))
* Lowercase current folder name on `api init` ([82d33b5](https://github.com/readmeio/api/commit/82d33b5))
* Make sure brand new services can be created ([a5182c1](https://github.com/readmeio/api/commit/a5182c1))
* Refactor api module to use module.exports in seperate files ([f5bedba](https://github.com/readmeio/api/commit/f5bedba))
* Remove version from docs link in stub ([81a0afa](https://github.com/readmeio/api/commit/81a0afa))
* Should pass through team to fetch available versions on deploy ([3848b5b](https://github.com/readmeio/api/commit/3848b5b))
* Show better error message on signup ([8cfd84e](https://github.com/readmeio/api/commit/8cfd84e))
* Update the stub ([e98bf9a](https://github.com/readmeio/api/commit/e98bf9a))



## <small>0.13.4 (2017-08-03)</small>

* 0.13.4 ([f2b259a](https://github.com/readmeio/api/commit/f2b259a))
* update build-docs ([ee2e5af](https://github.com/readmeio/api/commit/ee2e5af))



## <small>0.13.3 (2017-08-03)</small>

* 0.13.3 ([6e50763](https://github.com/readmeio/api/commit/6e50763))
* Fix error handling for async called with api.error ([88cf6ef](https://github.com/readmeio/api/commit/88cf6ef))



## <small>0.13.2 (2017-08-03)</small>

* 0.13.2 ([68760b4](https://github.com/readmeio/api/commit/68760b4))



## <small>0.13.1 (2017-08-03)</small>

* 0.13.1 ([63f050a](https://github.com/readmeio/api/commit/63f050a))
* build-docs 1.4.1 ([58283b1](https://github.com/readmeio/api/commit/58283b1))



## 0.13.0 (2017-08-03)

* 0.13.0 ([60eef5c](https://github.com/readmeio/api/commit/60eef5c))
* Fix issue with errors in async code ([ac9355e](https://github.com/readmeio/api/commit/ac9355e))
* Update build-docs to support defaults ([a0c10f7](https://github.com/readmeio/api/commit/a0c10f7))
* Update stub to be more useful ([637cde5](https://github.com/readmeio/api/commit/637cde5))



## <small>0.12.8 (2017-08-01)</small>

* -v consoles the BUILD_HOST if set ([c6d3a76](https://github.com/readmeio/api/commit/c6d3a76))
* 0.12.8 ([ed76e3b](https://github.com/readmeio/api/commit/ed76e3b))
* Add -t shortcut for --team ([af18aa0](https://github.com/readmeio/api/commit/af18aa0))
* Fix bug deploying private service with only 1 team ([897e538](https://github.com/readmeio/api/commit/897e538))
* Should be .name ([07e1d8e](https://github.com/readmeio/api/commit/07e1d8e))



## <small>0.12.7 (2017-08-01)</small>

* 0.12.7 ([cf7b3b1](https://github.com/readmeio/api/commit/cf7b3b1))
* Actually installed updated version ([915e49d](https://github.com/readmeio/api/commit/915e49d))



## <small>0.12.6 (2017-08-01)</small>

* 0.12.6 ([6a85ec4](https://github.com/readmeio/api/commit/6a85ec4))
* Update build-docs ([9ed2849](https://github.com/readmeio/api/commit/9ed2849))



## <small>0.12.5 (2017-08-01)</small>

* 0.12.5 ([1583920](https://github.com/readmeio/api/commit/1583920))
* Update build-docs to fix issue with es6 syntax ([4b868f2](https://github.com/readmeio/api/commit/4b868f2))



## <small>0.12.4 (2017-07-31)</small>

* 0.12.4 ([412d22b](https://github.com/readmeio/api/commit/412d22b))
* Add a notice about what an action is ([a1ed38b](https://github.com/readmeio/api/commit/a1ed38b))
* Add a post-install script ([bf37f4d](https://github.com/readmeio/api/commit/bf37f4d))
* Better messages when deploying ([d4af7cd](https://github.com/readmeio/api/commit/d4af7cd))
* Better setup messaging ([3b30510](https://github.com/readmeio/api/commit/3b30510))
* Improve error message for docs ([40e834d](https://github.com/readmeio/api/commit/40e834d))
* Update build-docs so type is no longer case sensitive ([3ab61ac](https://github.com/readmeio/api/commit/3ab61ac))
* Whoops, testing ([66b7f08](https://github.com/readmeio/api/commit/66b7f08))



## <small>0.12.1 (2017-07-28)</small>

* 0.12.1 ([85ccd0a](https://github.com/readmeio/api/commit/85ccd0a))
* Fix failing tests ([c038070](https://github.com/readmeio/api/commit/c038070))



## 0.12.0 (2017-07-28)

* 0.12.0 ([cff0fcd](https://github.com/readmeio/api/commit/cff0fcd))
* Don't ask if you only have one team ([54b6e75](https://github.com/readmeio/api/commit/54b6e75))
* Update docs to match example ([ac707c6](https://github.com/readmeio/api/commit/ac707c6))
* Validate semver version during init ([183f1a3](https://github.com/readmeio/api/commit/183f1a3))



## 0.11.0 (2017-07-28)

* 0.11.0 ([ee13d9b](https://github.com/readmeio/api/commit/ee13d9b))
* Also prompt signup if they arent logged in but try to deploy ([69d0d6f](https://github.com/readmeio/api/commit/69d0d6f))
* Attempt to guess their username ([15a318e](https://github.com/readmeio/api/commit/15a318e))
* bump ([f784fe0](https://github.com/readmeio/api/commit/f784fe0))
* bump ([b1eb7f7](https://github.com/readmeio/api/commit/b1eb7f7))
* Bump ([2804fee](https://github.com/readmeio/api/commit/2804fee))
* Bump ([f4409a4](https://github.com/readmeio/api/commit/f4409a4))
* Bump bump ([19ce78c](https://github.com/readmeio/api/commit/19ce78c))
* Change .do to .run ([48a60bf](https://github.com/readmeio/api/commit/48a60bf))
* Change colors ([8e6b2f2](https://github.com/readmeio/api/commit/8e6b2f2))
* Change intro text ([e1a453f](https://github.com/readmeio/api/commit/e1a453f))
* Clean up the api help screen ([ceeba12](https://github.com/readmeio/api/commit/ceeba12))
* I don't think people will know what an 'action' is without context ([986f514](https://github.com/readmeio/api/commit/986f514))
* Put API back ([d3e8f39](https://github.com/readmeio/api/commit/d3e8f39))
* Send metadata from the Node module ([865e9f0](https://github.com/readmeio/api/commit/865e9f0))
* Simple ReadMe file intro ([73a61bf](https://github.com/readmeio/api/commit/73a61bf))
* There is no way this will work... ([4fe4232](https://github.com/readmeio/api/commit/4fe4232))
* Unbreak the breaks ([2c661f4](https://github.com/readmeio/api/commit/2c661f4))
* Update readme ([34b9015](https://github.com/readmeio/api/commit/34b9015))



## 0.10.0 (2017-07-25)

* 0.10.0 ([502ef36](https://github.com/readmeio/api/commit/502ef36))
* Change invoke url ([4cbf588](https://github.com/readmeio/api/commit/4cbf588))



## <small>0.9.2 (2017-07-24)</small>

* 0.9.2 ([3dfa1e2](https://github.com/readmeio/api/commit/3dfa1e2))
* Update package.lock ([8442f96](https://github.com/readmeio/api/commit/8442f96))



## <small>0.9.1 (2017-07-24)</small>

* 0.9.1 ([d078597](https://github.com/readmeio/api/commit/d078597))
* Update to v1 of the api ([2ae8c48](https://github.com/readmeio/api/commit/2ae8c48))
* Update to v1.3.1 of build-docs ([25d1a18](https://github.com/readmeio/api/commit/25d1a18))



## 0.9.0 (2017-07-19)

* 0.8.0 ([4ed8555](https://github.com/readmeio/api/commit/4ed8555))
* 0.9.0 ([2866b2e](https://github.com/readmeio/api/commit/2866b2e))
* Add better docs and tests for secrets ([564cec2](https://github.com/readmeio/api/commit/564cec2))
* Fix api module to v0 of api ([0236f02](https://github.com/readmeio/api/commit/0236f02))
* Fix some other tests ([35dd7e7](https://github.com/readmeio/api/commit/35dd7e7))
* Update to npm5 ([379796a](https://github.com/readmeio/api/commit/379796a))



## 0.8.0 (2017-06-21)

* 0.8.0 ([baa51e4](https://github.com/readmeio/api/commit/baa51e4))
* Fix test ([3f37f8a](https://github.com/readmeio/api/commit/3f37f8a))
* response.body.result -> response.body ([a328761](https://github.com/readmeio/api/commit/a328761))
* update gitignore ([ce72d6d](https://github.com/readmeio/api/commit/ce72d6d))



## <small>0.7.1 (2017-05-17)</small>

* 0.7.1 ([d7a72ad](https://github.com/readmeio/api/commit/d7a72ad))
* Only ask for invite code on sign up, not login ([fda5c63](https://github.com/readmeio/api/commit/fda5c63))



## 0.7.0 (2017-05-17)

* 0.7.0 ([6500175](https://github.com/readmeio/api/commit/6500175))
* Add inviteCode to command line signup ([a59592c](https://github.com/readmeio/api/commit/a59592c))
* Add support for `api.error(new Error('message'))` ([e49636a](https://github.com/readmeio/api/commit/e49636a))



## <small>0.6.1 (2017-05-16)</small>

* 0.6.1 ([bda076b](https://github.com/readmeio/api/commit/bda076b))
* Add documentation for login and signup ([249df23](https://github.com/readmeio/api/commit/249df23))
* api-build -> api ([9e7d163](https://github.com/readmeio/api/commit/9e7d163))
* Increase version of build-docs to throw on invalid json schema types ([9c0d40b](https://github.com/readmeio/api/commit/9c0d40b))
* Support `throw new Error('message')` from services ([8d2c51d](https://github.com/readmeio/api/commit/8d2c51d))



## 0.6.0 (2017-05-16)

* 0.6.0 ([51ac766](https://github.com/readmeio/api/commit/51ac766))
* Add --version and -v ([908db4d](https://github.com/readmeio/api/commit/908db4d))
* Fix bug with missing readme.md file ([bf6f4d5](https://github.com/readmeio/api/commit/bf6f4d5))
* Fix deprecated warning ([2bd2b8d](https://github.com/readmeio/api/commit/2bd2b8d))
* Signup from cli ([981adcd](https://github.com/readmeio/api/commit/981adcd))
* Use api instead of api-build ([13d2877](https://github.com/readmeio/api/commit/13d2877))



## 0.5.0 (2017-05-12)

* 0.5.0 ([d3d8e3c](https://github.com/readmeio/api/commit/d3d8e3c))
* Able to set secrets for service ([757db02](https://github.com/readmeio/api/commit/757db02))
* Add `#set()` and `#write()` to PackageJson class ([76e4c39](https://github.com/readmeio/api/commit/76e4c39))
* Add `api whoami` to return the current logged in user ([f980712](https://github.com/readmeio/api/commit/f980712))
* Add `build` property to package.json if existing property exists and does not match ([84fb912](https://github.com/readmeio/api/commit/84fb912))
* Add a couple more tests for `api init` ([08f541b](https://github.com/readmeio/api/commit/08f541b))
* Add a heading to the readme markdown ([2cea1f1](https://github.com/readmeio/api/commit/2cea1f1))
* Add a proper `api logout` ([e661b72](https://github.com/readmeio/api/commit/e661b72))
* Add a user-agent header which contains the `api` version, node version and platform ([ca42b63](https://github.com/readmeio/api/commit/ca42b63))
* Add capability to update property prioritising a root update first ([97bc69f](https://github.com/readmeio/api/commit/97bc69f))
* Add comment ([9d23768](https://github.com/readmeio/api/commit/9d23768))
* Add documentation for local and ls ([e51d1a2](https://github.com/readmeio/api/commit/e51d1a2))
* Add global request override which adds an error handler ([42a27b7](https://github.com/readmeio/api/commit/42a27b7))
* Add missing password prompt type ([f714e2d](https://github.com/readmeio/api/commit/f714e2d))
* Add more tests for `api init` and support existing package.json ([7067729](https://github.com/readmeio/api/commit/7067729))
* Add new `invoke` file which is used from both `run` and `api.do` ([bbcd26e](https://github.com/readmeio/api/commit/bbcd26e))
* Add some more tests for on deploy team selection ([ad81e04](https://github.com/readmeio/api/commit/ad81e04))
* Add tests and docs for `api update` ([b95eef0](https://github.com/readmeio/api/commit/b95eef0))
* Allowing running from cli on different team ([331a1e6](https://github.com/readmeio/api/commit/331a1e6))
* api.do returns promise or callback ([b798c2c](https://github.com/readmeio/api/commit/b798c2c))
* Ask for `team` and `private` on service deploy ([dd48ad1](https://github.com/readmeio/api/commit/dd48ad1))
* Better error handling ([2b43e55](https://github.com/readmeio/api/commit/2b43e55))
* Bump version of build-docs to 1.1.0 to support a full description ([da8d091](https://github.com/readmeio/api/commit/da8d091))
* Data is assumed to be {} if not passed in ([3549778](https://github.com/readmeio/api/commit/3549778))
* Document `run` and add support for private services ([5c83a86](https://github.com/readmeio/api/commit/5c83a86))
* Fix for new versions array format returned from api ([fdb1174](https://github.com/readmeio/api/commit/fdb1174))
* Fix formatting of readme file ([889efd3](https://github.com/readmeio/api/commit/889efd3))
* Fix help test ([20f0473](https://github.com/readmeio/api/commit/20f0473))
* Fix other enquirer usages ([2ceb606](https://github.com/readmeio/api/commit/2ceb606))
* Generate docs for all actions ([59a18c4](https://github.com/readmeio/api/commit/59a18c4))
* Lint ([be3a8cb](https://github.com/readmeio/api/commit/be3a8cb))
* Lint ([7c71d90](https://github.com/readmeio/api/commit/7c71d90))
* Make sure our request wrapper returns an actual promise ([0cd2343](https://github.com/readmeio/api/commit/0cd2343))
* Make tests better for init ([c82575e](https://github.com/readmeio/api/commit/c82575e))
* Move entrypoint require into try..catch block ([cb2b500](https://github.com/readmeio/api/commit/cb2b500))
* Output correct error from `api run` ([4a71ab6](https://github.com/readmeio/api/commit/4a71ab6))
* Pick a team to update service on ([61507b5](https://github.com/readmeio/api/commit/61507b5))
* Prefixing team name onto package.json name for private non-personal packages ([d33c5a3](https://github.com/readmeio/api/commit/d33c5a3))
* Print out location header for the URL to the hosted service ([b78e680](https://github.com/readmeio/api/commit/b78e680))
* Re-add back in the public/private question on first deploy ([f193130](https://github.com/readmeio/api/commit/f193130))
* Refactor the deployment process ([d325bb4](https://github.com/readmeio/api/commit/d325bb4))
* Remove asking of `private` in the cli ([05473ee](https://github.com/readmeio/api/commit/05473ee))
* Remove async/await ([bdede9e](https://github.com/readmeio/api/commit/bdede9e))
* Remove dependencies from package json object ([995f2b9](https://github.com/readmeio/api/commit/995f2b9))
* Remove signup ([e4db693](https://github.com/readmeio/api/commit/e4db693))
* Send private flag to the API ([afb54ca](https://github.com/readmeio/api/commit/afb54ca))
* Show prompt to update if on an old version ([aa770bb](https://github.com/readmeio/api/commit/aa770bb))
* Skip broken test ([3c6773a](https://github.com/readmeio/api/commit/3c6773a))
* Swap out inquirer for enquirer ([327a8a8](https://github.com/readmeio/api/commit/327a8a8))
* Switch logout to use async/await ([724992d](https://github.com/readmeio/api/commit/724992d))
* Tests ([97f119d](https://github.com/readmeio/api/commit/97f119d))
* Tidy up private question. Rename internal to private ([59ed258](https://github.com/readmeio/api/commit/59ed258))
* Update dependencies ([e8fcfb1](https://github.com/readmeio/api/commit/e8fcfb1))
* Update docs for deploy ([59f2853](https://github.com/readmeio/api/commit/59f2853))
* Use prod url by default ([9b58b31](https://github.com/readmeio/api/commit/9b58b31))
* Validate package name ([b122167](https://github.com/readmeio/api/commit/b122167))
* Versions can be marked as deprecated ([226a81f](https://github.com/readmeio/api/commit/226a81f))



## <small>0.4.1 (2017-03-31)</small>

* 0.4.1 ([ffd17b9](https://github.com/readmeio/api/commit/ffd17b9))
* Add `api docs` command to show generated docs ([11a2e08](https://github.com/readmeio/api/commit/11a2e08))
* Add build-docs comment block to stub.js ([d8d8587](https://github.com/readmeio/api/commit/d8d8587))
* Add circle.yml file ([0850643](https://github.com/readmeio/api/commit/0850643))
* Add readme.md ([6b34546](https://github.com/readmeio/api/commit/6b34546))
* Add testing setup and add tests for help command ([601e8a3](https://github.com/readmeio/api/commit/601e8a3))
* Better deployment with versions ([02fa41f](https://github.com/readmeio/api/commit/02fa41f))
* Fix commands for new api response format ([25a4d9a](https://github.com/readmeio/api/commit/25a4d9a))
* Fix header ([dd3c390](https://github.com/readmeio/api/commit/dd3c390))
* Log if you're not logged in before doing actions ([01f87ca](https://github.com/readmeio/api/commit/01f87ca))
* Pass minimists args into `action.run()` ([48b82c2](https://github.com/readmeio/api/commit/48b82c2))
* Removing lodash dependency ([8b9deea](https://github.com/readmeio/api/commit/8b9deea))
* Show link to dash after deploy ([aced1c4](https://github.com/readmeio/api/commit/aced1c4))
* Takes the web url from utils ([648ca4b](https://github.com/readmeio/api/commit/648ca4b))
* Temp fix for deploying a new service that hasn't been deployed before ([fa2aba5](https://github.com/readmeio/api/commit/fa2aba5))



## 0.4.0 (2017-03-22)

* 0.4.0 ([c8b1010](https://github.com/readmeio/api/commit/c8b1010))
* Add progress bar for uploader! ([eb18151](https://github.com/readmeio/api/commit/eb18151))



## <small>0.3.3 (2017-03-22)</small>

* 0.3.3 ([5b16f0a](https://github.com/readmeio/api/commit/5b16f0a))



## <small>0.3.2 (2017-03-21)</small>

* 0.3.2 ([06aecaa](https://github.com/readmeio/api/commit/06aecaa))
* Bump build-docs version to 1.0.2 ([c29da07](https://github.com/readmeio/api/commit/c29da07))



## <small>0.3.1 (2017-03-21)</small>

* 0.3.1 ([8cabf32](https://github.com/readmeio/api/commit/8cabf32))
* Bump build-docs version to 1.0.1 ([d0533c7](https://github.com/readmeio/api/commit/d0533c7))



## 0.3.0 (2017-03-21)

* 0.3.0 ([8159ef8](https://github.com/readmeio/api/commit/8159ef8))
* Add help usage for `api`, `api help` and `api help <command>` ([900cc39](https://github.com/readmeio/api/commit/900cc39))



## <small>0.2.2 (2017-03-21)</small>

* 0.2.2 ([d10c15a](https://github.com/readmeio/api/commit/d10c15a))
* Checks semver version ([748a09b](https://github.com/readmeio/api/commit/748a09b))
* Request is required by request-promise ([884eb0b](https://github.com/readmeio/api/commit/884eb0b))
* Update version via cli ([cc2d38a](https://github.com/readmeio/api/commit/cc2d38a))



## <small>0.2.1 (2017-03-21)</small>

* 0.2.1 ([8802c9d](https://github.com/readmeio/api/commit/8802c9d))
* Deploy readme.md ([f7f893b](https://github.com/readmeio/api/commit/f7f893b))
* Fetch BUILD_URL from env variable ([26e4da4](https://github.com/readmeio/api/commit/26e4da4))
* Remove unused dependencies and fix handler.js ([d885ea7](https://github.com/readmeio/api/commit/d885ea7))
* Rename 'api' to 'api-build' in handler local ([5e9b4dc](https://github.com/readmeio/api/commit/5e9b4dc))
* Save cookie on login and signup ([6353d4d](https://github.com/readmeio/api/commit/6353d4d))
* Send docs to registry ([0f33d5e](https://github.com/readmeio/api/commit/0f33d5e))



## 0.2.0 (2017-03-20)

* 0.2.0 ([be11dd0](https://github.com/readmeio/api/commit/be11dd0))
* Add command for running remotely ([4d20036](https://github.com/readmeio/api/commit/4d20036))
* Fix keys command ([5dae4f6](https://github.com/readmeio/api/commit/5dae4f6))
* Fix logs to work with new auth, and not stop lambda from quiting ([fc904a4](https://github.com/readmeio/api/commit/fc904a4))
* Improvements to api init ([5ed8581](https://github.com/readmeio/api/commit/5ed8581))
* use stage url ([518715d](https://github.com/readmeio/api/commit/518715d))



## <small>0.1.1 (2017-03-16)</small>

* 0.1.1 ([00d00c2](https://github.com/readmeio/api/commit/00d00c2))
* Update package.json name ([8709337](https://github.com/readmeio/api/commit/8709337))



## 0.1.0 (2017-03-16)

* 0.1.0 ([f87c48e](https://github.com/readmeio/api/commit/f87c48e))
* Ability to use staging url ([2f40fe0](https://github.com/readmeio/api/commit/2f40fe0))
* Add alias for invoke ([16574f1](https://github.com/readmeio/api/commit/16574f1))
* Add list command to show deployed versions ([4664860](https://github.com/readmeio/api/commit/4664860))
* Add way to output keys on cli ([d22a8cf](https://github.com/readmeio/api/commit/d22a8cf))
* api init ([a61647f](https://github.com/readmeio/api/commit/a61647f))
* api link ([0b3b1a8](https://github.com/readmeio/api/commit/0b3b1a8))
* api log ([4647c27](https://github.com/readmeio/api/commit/4647c27))
* api unlink ([6146766](https://github.com/readmeio/api/commit/6146766))
* api.do ([62133c8](https://github.com/readmeio/api/commit/62133c8))
* better un-tracking? ([1395319](https://github.com/readmeio/api/commit/1395319))
* Clean up console ([7c6501a](https://github.com/readmeio/api/commit/7c6501a))
* Clean up eslint ([0d65954](https://github.com/readmeio/api/commit/0d65954))
* e2e working with services registry, needs to un-hardcode the endpoint ([c67d252](https://github.com/readmeio/api/commit/c67d252))
* Fix a bunch of login stuff with users ([e029edb](https://github.com/readmeio/api/commit/e029edb))
* Fix build url to staging ([1e70e00](https://github.com/readmeio/api/commit/1e70e00))
* Fix issues with logger ([a3019f3](https://github.com/readmeio/api/commit/a3019f3))
* Fix ls ([34df489](https://github.com/readmeio/api/commit/34df489))
* Fix running locally ([3dfd627](https://github.com/readmeio/api/commit/3dfd627))
* Fixes for ls ([7bf009a](https://github.com/readmeio/api/commit/7bf009a))
* Initial commit ([0dbe429](https://github.com/readmeio/api/commit/0dbe429))
* initial commit of skeleton, needs POST route, and handler ([9924cd7](https://github.com/readmeio/api/commit/9924cd7))
* Invoking and deploying ([4f4b30e](https://github.com/readmeio/api/commit/4f4b30e))
* it's all working now ([62c775f](https://github.com/readmeio/api/commit/62c775f))
* keep git from tracking changes to cred file ([c7ff98e](https://github.com/readmeio/api/commit/c7ff98e))
* list all deployed services ([d094242](https://github.com/readmeio/api/commit/d094242))
* Login with username or email ([dd593bd](https://github.com/readmeio/api/commit/dd593bd))
* make sure data dir is part of package so it won't need to be created ([8186db2](https://github.com/readmeio/api/commit/8186db2))
* Move handler into module ([7c4e8f3](https://github.com/readmeio/api/commit/7c4e8f3))
* no way to untrack changes to cred file, just commiting dir ([07b87ad](https://github.com/readmeio/api/commit/07b87ad))
* Run locally ([3dd7b46](https://github.com/readmeio/api/commit/3dd7b46))
* Should be staging url ([882df8f](https://github.com/readmeio/api/commit/882df8f))
* Update how api key is passed ([2191617](https://github.com/readmeio/api/commit/2191617))
* Use new login style ([a2bb2bc](https://github.com/readmeio/api/commit/a2bb2bc))
* yarn ([1945f2f](https://github.com/readmeio/api/commit/1945f2f))



## <small>5.0.8 (2023-03-17)</small>

* chore(deps): bump http-cache-semantics from 4.1.0 to 4.1.1 (#613) ([ebb90af](https://github.com/readmeio/api/commit/ebb90af)), closes [#613](https://github.com/readmeio/api/issues/613)
* chore(deps): bumping out of date deps (#611) ([287a708](https://github.com/readmeio/api/commit/287a708)), closes [#611](https://github.com/readmeio/api/issues/611)
* chore(test): refreshing the smoketest dataset ([1a457e4](https://github.com/readmeio/api/commit/1a457e4))
* feat: add install flag to bypass prompt (#625) ([415fb8e](https://github.com/readmeio/api/commit/415fb8e)), closes [#625](https://github.com/readmeio/api/issues/625)



## <small>5.0.7 (2023-01-23)</small>

* fix: moving off `fs/promises` to `fs` in client-side code (#605) ([1d9c87e](https://github.com/readmeio/api/commit/1d9c87e)), closes [#605](https://github.com/readmeio/api/issues/605)
* chore: bumping deps (#607) ([21bd60a](https://github.com/readmeio/api/commit/21bd60a)), closes [#607](https://github.com/readmeio/api/issues/607)
* Adds ESM usage instructions (#606) ([6fadba7](https://github.com/readmeio/api/commit/6fadba7)), closes [#606](https://github.com/readmeio/api/issues/606)



## <small>5.0.6 (2023-01-09)</small>

* chore: bumping out of date deps (#603) ([66cfec9](https://github.com/readmeio/api/commit/66cfec9)), closes [#603](https://github.com/readmeio/api/issues/603)
* fix: broken badge, remove unnecessary `.svg` extension ([7c5224c](https://github.com/readmeio/api/commit/7c5224c)), closes [badges/shields#8671](https://github.com/badges/shields/issues/8671)
* fix: failing tests (#602) ([c19a991](https://github.com/readmeio/api/commit/c19a991)), closes [#602](https://github.com/readmeio/api/issues/602)



## <small>5.0.5 (2022-12-09)</small>

* fix: resolving typing issues in JS codegen (#593) ([ab97a70](https://github.com/readmeio/api/commit/ab97a70)), closes [#593](https://github.com/readmeio/api/issues/593)
* test: updating the smoketest dataset (#594) ([bf57315](https://github.com/readmeio/api/commit/bf57315)), closes [#594](https://github.com/readmeio/api/issues/594)
* chore(deps-dev): bump eslint from 8.28.0 to 8.29.0 (#592) ([deaa5ba](https://github.com/readmeio/api/commit/deaa5ba)), closes [#592](https://github.com/readmeio/api/issues/592)
* chore(deps): bump readmeio/rdme from 8.1.1 to 8.2.0 (#587) ([2c6144e](https://github.com/readmeio/api/commit/2c6144e)), closes [#587](https://github.com/readmeio/api/issues/587)
* chore(deps): bumping out of date deps (#591) ([54754da](https://github.com/readmeio/api/commit/54754da)), closes [#591](https://github.com/readmeio/api/issues/591)
* chore(deps): use rdme@v8 ([a730908](https://github.com/readmeio/api/commit/a730908))



## <small>5.0.4 (2022-11-30)</small>

* chore(deps): bumping out of date deps across all packages (#576) ([1255dd6](https://github.com/readmeio/api/commit/1255dd6)), closes [#576](https://github.com/readmeio/api/issues/576)



## <small>5.0.3 (2022-11-28)</small>

* test: refreshing the unit test dataset ([4dad793](https://github.com/readmeio/api/commit/4dad793))
* chore(deps-dev): bump husky from 8.0.1 to 8.0.2 (#568) ([113e898](https://github.com/readmeio/api/commit/113e898)), closes [#568](https://github.com/readmeio/api/issues/568)
* chore(deps): bump readmeio/rdme from 8.0.0 to 8.1.1 (#573) ([6f96efa](https://github.com/readmeio/api/commit/6f96efa)), closes [#573](https://github.com/readmeio/api/issues/573)
* chore(deps): bumping out of date deps (#575) ([ae55a13](https://github.com/readmeio/api/commit/ae55a13)), closes [#575](https://github.com/readmeio/api/issues/575)
* fix: compatibility with yarn installs where `package.json` needs `version` (#574) ([0913923](https://github.com/readmeio/api/commit/0913923)), closes [#574](https://github.com/readmeio/api/issues/574)
* ci: disabling updates to `find-cache-dir` as it's esm-only now ([e21a975](https://github.com/readmeio/api/commit/e21a975))



## <small>5.0.2 (2022-11-25)</small>

* fix: installs not actually installing the api (#562) ([909a9fd](https://github.com/readmeio/api/commit/909a9fd)), closes [#562](https://github.com/readmeio/api/issues/562)
* chore(deps): bump readmeio/rdme from 7.5.0 to 8.0.0 (#558) ([08d3ac5](https://github.com/readmeio/api/commit/08d3ac5)), closes [#558](https://github.com/readmeio/api/issues/558)



## <small>5.0.1 (2022-10-31)</small>

* fix: bug where `@api/identifier` wasn't being installed properly (#557) ([20228d2](https://github.com/readmeio/api/commit/20228d2)), closes [#557](https://github.com/readmeio/api/issues/557)
* docs: tweaks to the v4 upgrade docs ([f752c66](https://github.com/readmeio/api/commit/f752c66))



## 5.0.0 (2022-10-31)

* docs: adding a callout about v5 not being out yet ([c36fdb1](https://github.com/readmeio/api/commit/c36fdb1))
* docs: fixing some typos in a few docs ([e766707](https://github.com/readmeio/api/commit/e766707))
* docs: installation clarifications on the registry UUID ([a9c6ce2](https://github.com/readmeio/api/commit/a9c6ce2))
* docs: v5 (#553) ([5faaa11](https://github.com/readmeio/api/commit/5faaa11)), closes [#553](https://github.com/readmeio/api/issues/553)
* chore: refreshing the smoketest dataset and excluding all google apis (#554) ([5b6a86a](https://github.com/readmeio/api/commit/5b6a86a)), closes [#554](https://github.com/readmeio/api/issues/554)
* chore: updating packageInfo ([b507b38](https://github.com/readmeio/api/commit/b507b38))
* chore(deps-dev): bump @commitlint/cli from 17.0.3 to 17.1.2 (#515) ([1b84f6e](https://github.com/readmeio/api/commit/1b84f6e)), closes [#515](https://github.com/readmeio/api/issues/515)
* chore(deps-dev): bump @commitlint/cli from 17.1.2 to 17.2.0 (#555) ([71ae361](https://github.com/readmeio/api/commit/71ae361)), closes [#555](https://github.com/readmeio/api/issues/555)
* chore(deps-dev): bump @commitlint/config-conventional (#514) ([9699657](https://github.com/readmeio/api/commit/9699657)), closes [#514](https://github.com/readmeio/api/issues/514)
* chore(deps-dev): bump @commitlint/config-conventional (#556) ([09b43ce](https://github.com/readmeio/api/commit/09b43ce)), closes [#556](https://github.com/readmeio/api/issues/556)
* chore(deps-dev): bump @readme/eslint-config from 10.1.0 to 10.1.1 (#528) ([aae1d87](https://github.com/readmeio/api/commit/aae1d87)), closes [#528](https://github.com/readmeio/api/issues/528)
* chore(deps-dev): bump @readme/eslint-config from 9.0.0 to 10.1.0 (#519) ([9ab7829](https://github.com/readmeio/api/commit/9ab7829)), closes [#519](https://github.com/readmeio/api/issues/519)
* chore(deps-dev): bump @readme/oas-examples from 5.4.1 to 5.5.0 (#503) ([6a59efb](https://github.com/readmeio/api/commit/6a59efb)), closes [#503](https://github.com/readmeio/api/issues/503)
* chore(deps-dev): bump @types/mocha from 9.1.1 to 10.0.0 (#526) ([6a40663](https://github.com/readmeio/api/commit/6a40663)), closes [#526](https://github.com/readmeio/api/issues/526)
* chore(deps-dev): bump eslint from 8.21.0 to 8.23.0 (#517) ([827b71d](https://github.com/readmeio/api/commit/827b71d)), closes [#517](https://github.com/readmeio/api/issues/517)
* chore(deps-dev): bump eslint from 8.23.0 to 8.24.0 (#525) ([4ca9c8f](https://github.com/readmeio/api/commit/4ca9c8f)), closes [#525](https://github.com/readmeio/api/issues/525)
* chore(deps-dev): bump eslint from 8.24.0 to 8.25.0 (#531) ([3c1645b](https://github.com/readmeio/api/commit/3c1645b)), closes [#531](https://github.com/readmeio/api/issues/531)
* chore(deps-dev): bump eslint from 8.25.0 to 8.26.0 (#541) ([0621068](https://github.com/readmeio/api/commit/0621068)), closes [#541](https://github.com/readmeio/api/issues/541)
* chore(deps): bump @readme/oas-to-har from 17.1.2 to 18.0.0 (#518) ([9d88aea](https://github.com/readmeio/api/commit/9d88aea)), closes [#518](https://github.com/readmeio/api/issues/518)
* chore(deps): bump ssri from 9.0.0 to 10.0.0 (#534) ([33dd5bb](https://github.com/readmeio/api/commit/33dd5bb)), closes [#534](https://github.com/readmeio/api/issues/534)
* chore(deps): bump ts-morph from 15.1.0 to 16.0.0 (#527) ([501941d](https://github.com/readmeio/api/commit/501941d)), closes [#527](https://github.com/readmeio/api/issues/527)
* chore(deps): bump validate-npm-package-name from 4.0.0 to 5.0.0 (#535) ([d150055](https://github.com/readmeio/api/commit/d150055)), closes [#535](https://github.com/readmeio/api/issues/535)
* chore(deps): bumping oas deps (#552) ([3f7b625](https://github.com/readmeio/api/commit/3f7b625)), closes [#552](https://github.com/readmeio/api/issues/552)
* chore(deps): bumping out of date deps (#510) ([c37fbcc](https://github.com/readmeio/api/commit/c37fbcc)), closes [#510](https://github.com/readmeio/api/issues/510)
* fix: minor tweak to how we generate the packageInfo file ([980dd9d](https://github.com/readmeio/api/commit/980dd9d))
* fix: prefix schema titles that start with numbers to fix a type generation bug (#530) ([b17a261](https://github.com/readmeio/api/commit/b17a261)), closes [#530](https://github.com/readmeio/api/issues/530)
* fix: quirks with OR auth configurations not working right (#543) ([af4c0e9](https://github.com/readmeio/api/commit/af4c0e9)), closes [#543](https://github.com/readmeio/api/issues/543)
* feat: addition of a new `timeout` config option (#542) ([dad0dbe](https://github.com/readmeio/api/commit/dad0dbe)), closes [#542](https://github.com/readmeio/api/issues/542) [#432](https://github.com/readmeio/api/issues/432)
* feat: allow original operationIDs to be used in dynamic SDKs (#509) ([0d52b72](https://github.com/readmeio/api/commit/0d52b72)), closes [#509](https://github.com/readmeio/api/issues/509)
* feat: allowing `accept` headers to always be sent through as metadata (#538) ([826368a](https://github.com/readmeio/api/commit/826368a)), closes [#538](https://github.com/readmeio/api/issues/538)
* feat: allowing users to manually specify an `authorization` header (#546) ([11e2435](https://github.com/readmeio/api/commit/11e2435)), closes [#546](https://github.com/readmeio/api/issues/546)
* feat: completely overhauling how we're handling response data (#539) ([18ddbfb](https://github.com/readmeio/api/commit/18ddbfb)), closes [#539](https://github.com/readmeio/api/issues/539)
* feat(testing): codegen smoketest suite + fixes (#550) ([ab94a7e](https://github.com/readmeio/api/commit/ab94a7e)), closes [#550](https://github.com/readmeio/api/issues/550)
* refactor: json schema type generation and handling (#533) ([b257fe1](https://github.com/readmeio/api/commit/b257fe1)), closes [#533](https://github.com/readmeio/api/issues/533)
* Fix example in README (#529) ([bd10fad](https://github.com/readmeio/api/commit/bd10fad)), closes [#529](https://github.com/readmeio/api/issues/529)
* ci: formdata-node is esm only now ([67f44cd](https://github.com/readmeio/api/commit/67f44cd))



## 5.0.0-beta.3 (2022-08-01)

* chore: updating packageInfo ([9b43093](https://github.com/readmeio/api/commit/9b43093))
* chore(deps-dev): bump @readme/eslint-config from 8.8.3 to 9.0.0 (#502) ([d084273](https://github.com/readmeio/api/commit/d084273)), closes [#502](https://github.com/readmeio/api/issues/502)
* chore(deps-dev): bump eslint from 8.19.0 to 8.21.0 (#501) ([ab18053](https://github.com/readmeio/api/commit/ab18053)), closes [#501](https://github.com/readmeio/api/issues/501)
* chore(deps): bump readmeio/rdme from 7.3.0 to 7.5.0 (#500) ([404fddf](https://github.com/readmeio/api/commit/404fddf)), closes [#500](https://github.com/readmeio/api/issues/500)
* fix: bug where operationIDs with underscores were being modified (#497) ([6519b4f](https://github.com/readmeio/api/commit/6519b4f)), closes [#497](https://github.com/readmeio/api/issues/497)
* fix: generated SDKs now ship an IFEE (#494) ([9d1247f](https://github.com/readmeio/api/commit/9d1247f)), closes [#494](https://github.com/readmeio/api/issues/494)
* fix: removing undefined objects from incoming metadata parameters (#496) ([3183a8e](https://github.com/readmeio/api/commit/3183a8e)), closes [#496](https://github.com/readmeio/api/issues/496)
* feat: adding support for case-insensitive header parameters (#495) ([895f8d5](https://github.com/readmeio/api/commit/895f8d5)), closes [#495](https://github.com/readmeio/api/issues/495)
* docs: minor doc change to test something in production ([8aaef93](https://github.com/readmeio/api/commit/8aaef93))
* docs: revert change ([b580517](https://github.com/readmeio/api/commit/b580517))



## 5.0.0-beta.2 (2022-07-19)

* feat: add support for github blob URLs (#484) ([f8b20a8](https://github.com/readmeio/api/commit/f8b20a8)), closes [#484](https://github.com/readmeio/api/issues/484)
* feat: improved typescript method acecssor `path` type generation (#482) ([8db66e7](https://github.com/readmeio/api/commit/8db66e7)), closes [#482](https://github.com/readmeio/api/issues/482)
* feat: updating httpsnippet-client-api to be compatible with httpsnippet v4 (#491) ([cb357f2](https://github.com/readmeio/api/commit/cb357f2)), closes [#491](https://github.com/readmeio/api/issues/491)
* feat: updating httpsnippet-client-api to work on httpsnippet v4 + TS rewrite (#492) ([8b11be6](https://github.com/readmeio/api/commit/8b11be6)), closes [#492](https://github.com/readmeio/api/issues/492)
* fix: making sure that packageInfo file updates get committed on release ([1b770b4](https://github.com/readmeio/api/commit/1b770b4))
* fix: rearrange markdown comment ([a992a86](https://github.com/readmeio/api/commit/a992a86))
* fix: typescript crashes (#480) ([78dc3b2](https://github.com/readmeio/api/commit/78dc3b2)), closes [#480](https://github.com/readmeio/api/issues/480)
* ci: getting started content reuse using hercule (#490) ([7803460](https://github.com/readmeio/api/commit/7803460)), closes [#490](https://github.com/readmeio/api/issues/490)
* docs: fixing a bad url ([618fee3](https://github.com/readmeio/api/commit/618fee3))
* docs: tweaks to callouts so they look better on our docs ([fc25a5e](https://github.com/readmeio/api/commit/fc25a5e))
* docs: updating documentation for v5 (#469) ([c77e900](https://github.com/readmeio/api/commit/c77e900)), closes [#469](https://github.com/readmeio/api/issues/469) [#475](https://github.com/readmeio/api/issues/475) [#479](https://github.com/readmeio/api/issues/479) [#473](https://github.com/readmeio/api/issues/473)
* docs: updating relative image paths to be absolute in our docs ([1f49792](https://github.com/readmeio/api/commit/1f49792))
* chore(deps-dev): bump typescript from 4.6.4 to 4.7.4 (#473) ([4aea544](https://github.com/readmeio/api/commit/4aea544)), closes [#473](https://github.com/readmeio/api/issues/473)
* chore(deps-dev): bumping dev deps (#479) ([1434753](https://github.com/readmeio/api/commit/1434753)), closes [#479](https://github.com/readmeio/api/issues/479)



## 5.0.0-beta.1 (2022-07-10)

* fix: downgrading json-schema-to-typescript to v10 (#475) ([31a1091](https://github.com/readmeio/api/commit/31a1091)), closes [#475](https://github.com/readmeio/api/issues/475)
* feat: updating the packageInfo file for v5 beta0 ([a4df246](https://github.com/readmeio/api/commit/a4df246))



## 5.0.0-beta.0 (2022-07-08)

* fix: cleaning up some unnecessarily complicated promises ([db41fd3](https://github.com/readmeio/api/commit/db41fd3))
* fix: cleanup of assorted snippet generation quirks (#420) ([44a6f11](https://github.com/readmeio/api/commit/44a6f11)), closes [#420](https://github.com/readmeio/api/issues/420)
* fix: fixing how we generate the dist to work under CJS imports (#397) ([358bde4](https://github.com/readmeio/api/commit/358bde4)), closes [#397](https://github.com/readmeio/api/issues/397)
* fix: improper paths in the unit test tsconfig ([6c6c044](https://github.com/readmeio/api/commit/6c6c044))
* fix: issue where formData would sometimes be sent twice (#389) ([d4e309c](https://github.com/readmeio/api/commit/d4e309c)), closes [#389](https://github.com/readmeio/api/issues/389)
* fix: moving us off the unstable node12 module resolution with a paths hack (#400) ([aa44884](https://github.com/readmeio/api/commit/aa44884)), closes [#400](https://github.com/readmeio/api/issues/400)
* fix: quirk with node 16 and `response.clone()` (#419) ([9fe5f2a](https://github.com/readmeio/api/commit/9fe5f2a)), closes [#419](https://github.com/readmeio/api/issues/419)
* fix: the codeql workflow so it runs properly (#379) ([ebcd3ce](https://github.com/readmeio/api/commit/ebcd3ce)), closes [#379](https://github.com/readmeio/api/issues/379)
* fix: updating the TS installer to install the upcoming `api@beta` release ([8c7388f](https://github.com/readmeio/api/commit/8c7388f))
* fix: use existing API methods (#447) ([fe01b6e](https://github.com/readmeio/api/commit/fe01b6e)), closes [#447](https://github.com/readmeio/api/issues/447)
* fix(auth): remove the ability to have auth chained with each request (#431) ([b7fc800](https://github.com/readmeio/api/commit/b7fc800)), closes [#431](https://github.com/readmeio/api/issues/431)
* chore: bumping the license year ([c7f1c76](https://github.com/readmeio/api/commit/c7f1c76))
* chore: delete redundant docs (#417) ([fbcfd26](https://github.com/readmeio/api/commit/fbcfd26)), closes [#417](https://github.com/readmeio/api/issues/417)
* chore: excluding esm-only packages from dependabot ([09420a0](https://github.com/readmeio/api/commit/09420a0))
* chore(deps-dev): bump @commitlint/cli from 16.2.1 to 16.2.4 (#441) ([628d90e](https://github.com/readmeio/api/commit/628d90e)), closes [#441](https://github.com/readmeio/api/issues/441)
* chore(deps-dev): bump @commitlint/cli from 16.2.4 to 17.0.2 (#452) ([ccc25d1](https://github.com/readmeio/api/commit/ccc25d1)), closes [#452](https://github.com/readmeio/api/issues/452)
* chore(deps-dev): bump @commitlint/cli from 17.0.2 to 17.0.3 (#463) ([e1bdea4](https://github.com/readmeio/api/commit/e1bdea4)), closes [#463](https://github.com/readmeio/api/issues/463)
* chore(deps-dev): bump @commitlint/config-conventional (#438) ([597b180](https://github.com/readmeio/api/commit/597b180)), closes [#438](https://github.com/readmeio/api/issues/438)
* chore(deps-dev): bump @commitlint/config-conventional (#450) ([5e29521](https://github.com/readmeio/api/commit/5e29521)), closes [#450](https://github.com/readmeio/api/issues/450)
* chore(deps-dev): bump @commitlint/config-conventional (#461) ([3b61e30](https://github.com/readmeio/api/commit/3b61e30)), closes [#461](https://github.com/readmeio/api/issues/461)
* chore(deps-dev): bump @types/validate-npm-package-name (#467) ([367495c](https://github.com/readmeio/api/commit/367495c)), closes [#467](https://github.com/readmeio/api/issues/467)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#454) ([a094b3f](https://github.com/readmeio/api/commit/a094b3f)), closes [#454](https://github.com/readmeio/api/issues/454)
* chore(deps-dev): bump husky from 7.0.4 to 8.0.1 (#456) ([838bc54](https://github.com/readmeio/api/commit/838bc54)), closes [#456](https://github.com/readmeio/api/issues/456)
* chore(deps-dev): bump sinon from 13.0.2 to 14.0.0 (#451) ([5f127d1](https://github.com/readmeio/api/commit/5f127d1)), closes [#451](https://github.com/readmeio/api/issues/451)
* chore(deps-dev): bumping all dev deps (#384) ([874a91d](https://github.com/readmeio/api/commit/874a91d)), closes [#384](https://github.com/readmeio/api/issues/384)
* chore(deps-dev): bumping all out of date dev deps (#381) ([fb53f57](https://github.com/readmeio/api/commit/fb53f57)), closes [#381](https://github.com/readmeio/api/issues/381)
* chore(deps-dev): bumping some dev dependencie ([c5b4a49](https://github.com/readmeio/api/commit/c5b4a49))
* chore(deps-dev): removing alex as a dep, its better suited as a GH action ([9b9a9ea](https://github.com/readmeio/api/commit/9b9a9ea))
* chore(deps): bump @readme/oas-to-har from 14.1.0 to 15.0.0 (#390) ([fbad503](https://github.com/readmeio/api/commit/fbad503)), closes [#390](https://github.com/readmeio/api/issues/390)
* chore(deps): bump actions/checkout from 2.4.0 to 3 (#425) ([7669751](https://github.com/readmeio/api/commit/7669751)), closes [#425](https://github.com/readmeio/api/issues/425)
* chore(deps): bump actions/setup-node from 2.5.1 to 3 (#405) ([d761624](https://github.com/readmeio/api/commit/d761624)), closes [#405](https://github.com/readmeio/api/issues/405)
* chore(deps): bump github/codeql-action from 1 to 2 (#437) ([5e13314](https://github.com/readmeio/api/commit/5e13314)), closes [#437](https://github.com/readmeio/api/issues/437)
* chore(deps): bump json-schema-to-typescript from 10.1.5 to 11.0.1 (#464) ([04c4082](https://github.com/readmeio/api/commit/04c4082)), closes [#464](https://github.com/readmeio/api/issues/464)
* chore(deps): bump ts-morph from 14.0.0 to 15.1.0 (#459) ([9bbf46f](https://github.com/readmeio/api/commit/9bbf46f)), closes [#459](https://github.com/readmeio/api/issues/459)
* chore(deps): bumping node-fetch (#377) ([eec72cd](https://github.com/readmeio/api/commit/eec72cd)), closes [#377](https://github.com/readmeio/api/issues/377)
* chore(deps): bumping out of date deps (#443) ([66e5e69](https://github.com/readmeio/api/commit/66e5e69)), closes [#443](https://github.com/readmeio/api/issues/443)
* chore(deps): upgrading oas and @readme/openapi-parser ([2b3c07c](https://github.com/readmeio/api/commit/2b3c07c))
* chore(deps): upgrading oas to v18 (#407) ([a817eef](https://github.com/readmeio/api/commit/a817eef)), closes [#407](https://github.com/readmeio/api/issues/407)
* chore(deps): upgrading out of date deps ([8027f55](https://github.com/readmeio/api/commit/8027f55))
* feat: adding support for cookie parameters (#393) ([7252e5f](https://github.com/readmeio/api/commit/7252e5f)), closes [#393](https://github.com/readmeio/api/issues/393)
* feat: adding support for cookies in snippets (#421) ([a355800](https://github.com/readmeio/api/commit/a355800)), closes [#421](https://github.com/readmeio/api/issues/421)
* feat: changing the readme api url from .io to .com (#383) ([d64ee16](https://github.com/readmeio/api/commit/d64ee16)), closes [#383](https://github.com/readmeio/api/issues/383)
* feat: clenaing up how we access paths out of the OAS (#394) ([356248c](https://github.com/readmeio/api/commit/356248c)), closes [#394](https://github.com/readmeio/api/issues/394)
* feat: cli installer (#427) ([6b1e472](https://github.com/readmeio/api/commit/6b1e472)), closes [#427](https://github.com/readmeio/api/issues/427)
* feat: creating a new test suite for running snippet datasets within a VM (#422) ([0d23afc](https://github.com/readmeio/api/commit/0d23afc)), closes [#422](https://github.com/readmeio/api/issues/422)
* feat: creation of a new APICore class to handle fetching (#410) ([abf83ae](https://github.com/readmeio/api/commit/abf83ae)), closes [#410](https://github.com/readmeio/api/issues/410)
* feat: decoupling the spec fetching process from the caching library (#428) ([eb276b4](https://github.com/readmeio/api/commit/eb276b4)), closes [#428](https://github.com/readmeio/api/issues/428)
* feat: dropping support for node 12 (#382) ([d04c89d](https://github.com/readmeio/api/commit/d04c89d)), closes [#382](https://github.com/readmeio/api/issues/382)
* feat: extending support to node 18 (#435) ([4ba3917](https://github.com/readmeio/api/commit/4ba3917)), closes [#435](https://github.com/readmeio/api/issues/435)
* feat: improved handling of file uploads (#380) ([cd3c2ec](https://github.com/readmeio/api/commit/cd3c2ec)), closes [#380](https://github.com/readmeio/api/issues/380)
* feat: moving `api-core` back into the main `api` package (#409) ([8ce96f5](https://github.com/readmeio/api/commit/8ce96f5)), closes [#409](https://github.com/readmeio/api/issues/409)
* feat: moving the test suite over to mocha (#402) ([bc6952f](https://github.com/readmeio/api/commit/bc6952f)), closes [#402](https://github.com/readmeio/api/issues/402)
* feat: overhauling how we process parameters to support required defaults (#396) ([6ee4906](https://github.com/readmeio/api/commit/6ee4906)), closes [#396](https://github.com/readmeio/api/issues/396)
* feat: splitting core api functionality out into a separate package (#399) ([84da97a](https://github.com/readmeio/api/commit/84da97a)), closes [#399](https://github.com/readmeio/api/issues/399)
* feat: supporting configurable cache dirs in the dynamic SDK (#446) ([8f19be9](https://github.com/readmeio/api/commit/8f19be9)), closes [#446](https://github.com/readmeio/api/issues/446)
* feat: typescript rewrite (#392) ([a2241b0](https://github.com/readmeio/api/commit/a2241b0)), closes [#392](https://github.com/readmeio/api/issues/392)
* feat: TypeScript SDK code generation 🧙  (#411) ([77dbd34](https://github.com/readmeio/api/commit/77dbd34)), closes [#411](https://github.com/readmeio/api/issues/411)
* ci: form-data-encoder is now ESM-only so we can't use it (yet) ([934582f](https://github.com/readmeio/api/commit/934582f))
* docs: adding tickets to the pr template ([a4979e6](https://github.com/readmeio/api/commit/a4979e6))
* docs: incorporating alex into our documentation workflow (#408) ([cf55006](https://github.com/readmeio/api/commit/cf55006)), closes [#408](https://github.com/readmeio/api/issues/408)
* docs: minor contrib updates ([4d18c36](https://github.com/readmeio/api/commit/4d18c36))
* docs: small revision to the pr template ([e271dcf](https://github.com/readmeio/api/commit/e271dcf))
* docs: updating the changelog ([289c872](https://github.com/readmeio/api/commit/289c872))
* test: run `build` in pretest (#430) ([cfcbf00](https://github.com/readmeio/api/commit/cfcbf00)), closes [#430](https://github.com/readmeio/api/issues/430)
* test: SDK codegeneration test suite (#413) ([849c78c](https://github.com/readmeio/api/commit/849c78c)), closes [#413](https://github.com/readmeio/api/issues/413)
* test: upgrading `@readme/oas-examples` to the latest release and fixing issues (#424) ([2e8988c](https://github.com/readmeio/api/commit/2e8988c)), closes [#424](https://github.com/readmeio/api/issues/424)
* perf: codegen performance improvements (#429) ([7b341a2](https://github.com/readmeio/api/commit/7b341a2)), closes [#429](https://github.com/readmeio/api/issues/429)
* style: capping all long comments to 100 character lines so they're easier to read (#395) ([98ff3aa](https://github.com/readmeio/api/commit/98ff3aa)), closes [#395](https://github.com/readmeio/api/issues/395)



## 4.4.0 (2022-04-25)

* feat: backporting #431 to the v4 series ([4a1e077](https://github.com/readmeio/api/commit/4a1e077)), closes [#431](https://github.com/readmeio/api/issues/431)



## 4.3.0 (2022-04-05)

* feat: ugprading oas dependencies on v4.2.1 ([c328fd4](https://github.com/readmeio/api/commit/c328fd4))



## <small>4.2.1 (2022-03-18)</small>

* fix: quirk with node 16 and `response.clone()` ([de8d964](https://github.com/readmeio/api/commit/de8d964))



## 4.2.0 (2022-01-03)

* chore(deps-dev): bump @commitlint/cli from 15.0.0 to 16.0.1 (#372) ([2279bcf](https://github.com/readmeio/api/commit/2279bcf)), closes [#372](https://github.com/readmeio/api/issues/372)
* chore(deps-dev): bump @commitlint/config-conventional (#365) ([eddaec1](https://github.com/readmeio/api/commit/eddaec1)), closes [#365](https://github.com/readmeio/api/issues/365)
* chore(deps-dev): bump @readme/eslint-config from 8.0.2 to 8.1.1 (#373) ([c781941](https://github.com/readmeio/api/commit/c781941)), closes [#373](https://github.com/readmeio/api/issues/373)
* chore(deps-dev): bump eslint from 8.3.0 to 8.6.0 (#369) ([1c5f2b1](https://github.com/readmeio/api/commit/1c5f2b1)), closes [#369](https://github.com/readmeio/api/issues/369)
* chore(deps-dev): bump jest from 27.4.2 to 27.4.5 (#370) ([81c8874](https://github.com/readmeio/api/commit/81c8874)), closes [#370](https://github.com/readmeio/api/issues/370)
* chore(deps-dev): bump memfs from 3.4.0 to 3.4.1 (#367) ([2f5f2f1](https://github.com/readmeio/api/commit/2f5f2f1)), closes [#367](https://github.com/readmeio/api/issues/367)
* chore(deps-dev): bump prettier from 2.5.0 to 2.5.1 (#371) ([55ce743](https://github.com/readmeio/api/commit/55ce743)), closes [#371](https://github.com/readmeio/api/issues/371)
* chore(deps): bump actions/setup-node from 2.5.0 to 2.5.1 (#364) ([343c5b7](https://github.com/readmeio/api/commit/343c5b7)), closes [#364](https://github.com/readmeio/api/issues/364)
* chore(deps): bump fetch-har from 5.0.3 to 5.0.4 (#366) ([53f0b61](https://github.com/readmeio/api/commit/53f0b61)), closes [#366](https://github.com/readmeio/api/issues/366)
* chore(deps): bump oas from 17.3.2 to 17.4.0 (#368) ([410f6ca](https://github.com/readmeio/api/commit/410f6ca)), closes [#368](https://github.com/readmeio/api/issues/368)
* chore(deps): upgrading various oas-related deps (#374) ([8a31118](https://github.com/readmeio/api/commit/8a31118)), closes [#374](https://github.com/readmeio/api/issues/374)



## <small>4.1.3 (2021-12-16)</small>

* chore(deps): upgrading oas-to-har and oas (#361) ([b6ee52c](https://github.com/readmeio/api/commit/b6ee52c)), closes [#361](https://github.com/readmeio/api/issues/361)



## <small>4.1.2 (2021-12-10)</small>

* fix: crash where multipart/form-data requests dont have params (#360) ([5762c22](https://github.com/readmeio/api/commit/5762c22)), closes [#360](https://github.com/readmeio/api/issues/360)



## <small>4.1.1 (2021-12-01)</small>

* chore(deps-dev): bump @commitlint/cli from 13.2.1 to 15.0.0 (#353) ([240ee49](https://github.com/readmeio/api/commit/240ee49)), closes [#353](https://github.com/readmeio/api/issues/353)
* chore(deps-dev): bump @commitlint/config-conventional (#354) ([49fe5c0](https://github.com/readmeio/api/commit/49fe5c0)), closes [#354](https://github.com/readmeio/api/issues/354)
* chore(deps-dev): bump jest from 27.3.1 to 27.4.2 (#358) ([c9b7bc7](https://github.com/readmeio/api/commit/c9b7bc7)), closes [#358](https://github.com/readmeio/api/issues/358)
* chore(deps-dev): bump memfs from 3.3.0 to 3.4.0 (#357) ([c73cc93](https://github.com/readmeio/api/commit/c73cc93)), closes [#357](https://github.com/readmeio/api/issues/357)
* chore(deps-dev): bump nock from 13.1.4 to 13.2.1 (#352) ([0ad6778](https://github.com/readmeio/api/commit/0ad6778)), closes [#352](https://github.com/readmeio/api/issues/352)
* chore(deps-dev): bump prettier from 2.4.1 to 2.5.0 (#356) ([0fb9cdd](https://github.com/readmeio/api/commit/0fb9cdd)), closes [#356](https://github.com/readmeio/api/issues/356)
* chore(deps-dev): upgrading eslint and @readme/eslint-config ([693f52d](https://github.com/readmeio/api/commit/693f52d))
* chore(deps): bump @readme/oas-to-har from 14.0.0 to 14.0.1 (#359) ([3048ec9](https://github.com/readmeio/api/commit/3048ec9)), closes [#359](https://github.com/readmeio/api/issues/359)
* chore(deps): bump actions/checkout from 2.3.5 to 2.4.0 (#351) ([61af132](https://github.com/readmeio/api/commit/61af132)), closes [#351](https://github.com/readmeio/api/issues/351)
* chore(deps): bump actions/setup-node from 2.4.1 to 2.5.0 (#350) ([9b53392](https://github.com/readmeio/api/commit/9b53392)), closes [#350](https://github.com/readmeio/api/issues/350)
* chore(deps): bump oas from 17.1.0 to 17.1.6 (#355) ([916bab1](https://github.com/readmeio/api/commit/916bab1)), closes [#355](https://github.com/readmeio/api/issues/355)



## 4.1.0 (2021-11-08)

* chore(deps-dev): bump nock from 13.1.3 to 13.1.4 (#346) ([de4ba12](https://github.com/readmeio/api/commit/de4ba12)), closes [#346](https://github.com/readmeio/api/issues/346)
* chore(deps): bump actions/checkout from 2.3.4 to 2.3.5 (#345) ([30b7101](https://github.com/readmeio/api/commit/30b7101)), closes [#345](https://github.com/readmeio/api/issues/345)
* chore(deps): bump node-fetch from 2.6.5 to 2.6.6 (#348) ([fba1514](https://github.com/readmeio/api/commit/fba1514)), closes [#348](https://github.com/readmeio/api/issues/348)
* chore(deps): bump oas from 16.0.3 to 16.0.4 (#347) ([b66675f](https://github.com/readmeio/api/commit/b66675f)), closes [#347](https://github.com/readmeio/api/issues/347)
* chore(deps): running npm audit ([04f5d5b](https://github.com/readmeio/api/commit/04f5d5b))
* feat: upgrading oas to v17 (#349) ([a88fb8b](https://github.com/readmeio/api/commit/a88fb8b)), closes [#349](https://github.com/readmeio/api/issues/349)



## 4.0.0 (2021-10-29)

* feat: support for OpenAPI 3.1 (#344) ([4e5b9ba](https://github.com/readmeio/api/commit/4e5b9ba)), closes [#344](https://github.com/readmeio/api/issues/344)



## <small>3.4.2 (2021-10-08)</small>

* fix: issues with circular references being dereferenced and unable to be stringified (#343) ([5c68896](https://github.com/readmeio/api/commit/5c68896)), closes [#343](https://github.com/readmeio/api/issues/343)



## <small>3.4.1 (2021-10-04)</small>

* chore(deps-dev): bump @commitlint/cli from 13.1.0 to 13.2.0 (#337) ([33c95e6](https://github.com/readmeio/api/commit/33c95e6)), closes [#337](https://github.com/readmeio/api/issues/337)
* chore(deps-dev): bump @commitlint/config-conventional (#333) ([3136aff](https://github.com/readmeio/api/commit/3136aff)), closes [#333](https://github.com/readmeio/api/issues/333)
* chore(deps-dev): bump @readme/eslint-config from 7.1.0 to 7.2.0 (#334) ([8fd366d](https://github.com/readmeio/api/commit/8fd366d)), closes [#334](https://github.com/readmeio/api/issues/334)
* chore(deps-dev): bump jest from 27.2.0 to 27.2.4 (#341) ([17cba71](https://github.com/readmeio/api/commit/17cba71)), closes [#341](https://github.com/readmeio/api/issues/341)
* chore(deps-dev): bump memfs from 3.2.4 to 3.3.0 (#342) ([2f7e89f](https://github.com/readmeio/api/commit/2f7e89f)), closes [#342](https://github.com/readmeio/api/issues/342)
* chore(deps-dev): bump prettier from 2.4.0 to 2.4.1 (#340) ([d2c634a](https://github.com/readmeio/api/commit/d2c634a)), closes [#340](https://github.com/readmeio/api/issues/340)
* chore(deps): bump @readme/oas-to-har from 13.7.2 to 13.7.3 (#338) ([7cd53c3](https://github.com/readmeio/api/commit/7cd53c3)), closes [#338](https://github.com/readmeio/api/issues/338)
* chore(deps): bump actions/setup-node from 2.4.0 to 2.4.1 (#332) ([1ac85c7](https://github.com/readmeio/api/commit/1ac85c7)), closes [#332](https://github.com/readmeio/api/issues/332)
* chore(deps): bump fetch-har from 5.0.2 to 5.0.3 (#339) ([cabdd8f](https://github.com/readmeio/api/commit/cabdd8f)), closes [#339](https://github.com/readmeio/api/issues/339)
* chore(deps): bump node-fetch from 2.6.1 to 2.6.5 (#336) ([dab087b](https://github.com/readmeio/api/commit/dab087b)), closes [#336](https://github.com/readmeio/api/issues/336)
* chore(deps): bump oas from 14.5.1 to 14.6.1 (#335) ([b40d217](https://github.com/readmeio/api/commit/b40d217)), closes [#335](https://github.com/readmeio/api/issues/335)
* docs: adding a security policy ([420584f](https://github.com/readmeio/api/commit/420584f))



## 3.4.0 (2021-09-14)

* chore(deps-dev): bumping dev deps ([69dcca3](https://github.com/readmeio/api/commit/69dcca3))
* chore(deps): bumping oas-to-har and oas deps ([a958511](https://github.com/readmeio/api/commit/a958511))
* chore(deps): upgrading the @readme/httpsnippet peerDep requirements ([3814721](https://github.com/readmeio/api/commit/3814721))
* fix: quirks in oas-to-har where query params are not being URI encoded (#331) ([fe43a41](https://github.com/readmeio/api/commit/fe43a41)), closes [#331](https://github.com/readmeio/api/issues/331)



## <small>3.3.2 (2021-09-01)</small>

* chore(deps-dev): bump @readme/eslint-config from 6.0.0 to 6.1.0 (#329) ([716b0af](https://github.com/readmeio/api/commit/716b0af)), closes [#329](https://github.com/readmeio/api/issues/329)
* chore(deps-dev): bump jest from 27.0.6 to 27.1.0 (#326) ([1c7188a](https://github.com/readmeio/api/commit/1c7188a)), closes [#326](https://github.com/readmeio/api/issues/326)
* chore(deps-dev): bump memfs from 3.2.2 to 3.2.3 (#324) ([a1c689e](https://github.com/readmeio/api/commit/a1c689e)), closes [#324](https://github.com/readmeio/api/issues/324)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([9a7a05e](https://github.com/readmeio/api/commit/9a7a05e))
* chore(deps-dev): removing lerna in favor of npx ([1e237ac](https://github.com/readmeio/api/commit/1e237ac))
* chore(deps): bump fetch-har from 5.0.1 to 5.0.2 (#330) ([ca00fec](https://github.com/readmeio/api/commit/ca00fec)), closes [#330](https://github.com/readmeio/api/issues/330)
* chore(deps): bump find-cache-dir from 3.3.1 to 3.3.2 (#325) ([1255449](https://github.com/readmeio/api/commit/1255449)), closes [#325](https://github.com/readmeio/api/issues/325)
* chore(deps): bump oas from 14.3.1 to 14.4.0 (#328) ([7fc0996](https://github.com/readmeio/api/commit/7fc0996)), closes [#328](https://github.com/readmeio/api/issues/328)
* chore(deps): running npm audit ([6f07b41](https://github.com/readmeio/api/commit/6f07b41))
* ci: ignoring node-fetch updates as its now an esm package ([b3222a4](https://github.com/readmeio/api/commit/b3222a4))



## <small>3.3.1 (2021-08-26)</small>

* chore: running npm audit ([50428b2](https://github.com/readmeio/api/commit/50428b2))
* chore(deps-dev): bump husky from 7.0.1 to 7.0.2 (#319) ([876bf46](https://github.com/readmeio/api/commit/876bf46)), closes [#319](https://github.com/readmeio/api/issues/319)
* chore(deps-dev): bump nock from 13.1.1 to 13.1.3 (#316) ([2cef19f](https://github.com/readmeio/api/commit/2cef19f)), closes [#316](https://github.com/readmeio/api/issues/316)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.2 to 10.0.3 (#320) ([380f369](https://github.com/readmeio/api/commit/380f369)), closes [#320](https://github.com/readmeio/api/issues/320)
* chore(deps): bump @readme/oas-to-har from 13.6.0 to 13.6.1 (#322) ([2c49d5f](https://github.com/readmeio/api/commit/2c49d5f)), closes [#322](https://github.com/readmeio/api/issues/322)
* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#312) ([e4a907d](https://github.com/readmeio/api/commit/e4a907d)), closes [#312](https://github.com/readmeio/api/issues/312)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#314) ([c53578d](https://github.com/readmeio/api/commit/c53578d)), closes [#314](https://github.com/readmeio/api/issues/314)
* chore(deps): bump datauri from 3.0.0 to 4.1.0 (#318) ([445c4ad](https://github.com/readmeio/api/commit/445c4ad)), closes [#318](https://github.com/readmeio/api/issues/318)
* chore(deps): bump fetch-har from 5.0.0 to 5.0.1 (#323) ([c3feab1](https://github.com/readmeio/api/commit/c3feab1)), closes [#323](https://github.com/readmeio/api/issues/323)
* chore(deps): bump mimer from 1.1.0 to 2.0.2 (#317) ([d3da902](https://github.com/readmeio/api/commit/d3da902)), closes [#317](https://github.com/readmeio/api/issues/317)
* chore(deps): bump oas from 14.0.0 to 14.3.1 (#315) ([400e680](https://github.com/readmeio/api/commit/400e680)), closes [#315](https://github.com/readmeio/api/issues/315)
* ci: ignoring stringify-object because its an ESM pkg now ([bbaac03](https://github.com/readmeio/api/commit/bbaac03))
* ci: updating the dependabot label ([d07b3c0](https://github.com/readmeio/api/commit/d07b3c0))



## 3.3.0 (2021-07-31)

* chore(deps-dev): bumping dev deps ([d34cb39](https://github.com/readmeio/api/commit/d34cb39))
* chore(deps-dev): bumping root pkg deps ([b585684](https://github.com/readmeio/api/commit/b585684))
* chore(deps): upgrading our oas and fetch-har deps ([6efcd05](https://github.com/readmeio/api/commit/6efcd05))
* docs: revisions to the pr template ([2ccb888](https://github.com/readmeio/api/commit/2ccb888))



## <small>3.2.6 (2021-07-06)</small>

* chore(deps-dev): bump @readme/eslint-config from 5.0.5 to 5.1.0 (#306) ([ea4e2f0](https://github.com/readmeio/api/commit/ea4e2f0)), closes [#306](https://github.com/readmeio/api/issues/306)
* chore(deps-dev): bump eslint from 7.27.0 to 7.29.0 (#305) ([cc41ca7](https://github.com/readmeio/api/commit/cc41ca7)), closes [#305](https://github.com/readmeio/api/issues/305)
* chore(deps-dev): bump husky from 6.0.0 to 7.0.0 (#307) ([7a5e17a](https://github.com/readmeio/api/commit/7a5e17a)), closes [#307](https://github.com/readmeio/api/issues/307)
* chore(deps-dev): bump jest from 27.0.3 to 27.0.6 (#308) ([ec8261f](https://github.com/readmeio/api/commit/ec8261f)), closes [#308](https://github.com/readmeio/api/issues/308)
* chore(deps-dev): bump prettier from 2.3.0 to 2.3.2 (#311) ([9fbc5d6](https://github.com/readmeio/api/commit/9fbc5d6)), closes [#311](https://github.com/readmeio/api/issues/311)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#310) ([7874ea4](https://github.com/readmeio/api/commit/7874ea4)), closes [#310](https://github.com/readmeio/api/issues/310)
* chore(deps): bump @readme/oas-to-har from 13.4.10 to 13.4.17 (#309) ([3e36558](https://github.com/readmeio/api/commit/3e36558)), closes [#309](https://github.com/readmeio/api/issues/309)
* chore(deps): bump actions/setup-node from 2.1.5 to 2.2.0 (#304) ([6cb7a85](https://github.com/readmeio/api/commit/6cb7a85)), closes [#304](https://github.com/readmeio/api/issues/304)



## <small>3.2.5 (2021-06-30)</small>

* chore(deps): upgrading oas to fix a server path matching quirk ([bb4a3bd](https://github.com/readmeio/api/commit/bb4a3bd))



## <small>3.2.4 (2021-06-28)</small>

* chore(deps): upgrading oas to 13.0.3 ([a6531d3](https://github.com/readmeio/api/commit/a6531d3))



## <small>3.2.3 (2021-06-28)</small>

* chore(deps): upgrading oas to 13.0.2 ([ca3ef7a](https://github.com/readmeio/api/commit/ca3ef7a))



## <small>3.2.2 (2021-06-11)</small>

* chore(deps): upgrading `oas` to v13 (#303) ([e77cb20](https://github.com/readmeio/api/commit/e77cb20)), closes [#303](https://github.com/readmeio/api/issues/303)



## <small>3.2.1 (2021-06-08)</small>

* chore(deps): upgrading oas-to-har and oas (#302) ([eef8895](https://github.com/readmeio/api/commit/eef8895)), closes [#302](https://github.com/readmeio/api/issues/302)



## 3.2.0 (2021-06-07)

* chore: upgrading the `oas` dependency in httpsnippet-client-api ([98981b0](https://github.com/readmeio/api/commit/98981b0))
* chore(deps-dev): bump @commitlint/cli from 12.1.3 to 12.1.4 (#296) ([3d1a6df](https://github.com/readmeio/api/commit/3d1a6df)), closes [#296](https://github.com/readmeio/api/issues/296)
* chore(deps-dev): bump @commitlint/config-conventional (#297) ([87f2825](https://github.com/readmeio/api/commit/87f2825)), closes [#297](https://github.com/readmeio/api/issues/297)
* chore(deps-dev): bump eslint from 7.26.0 to 7.27.0 (#300) ([1ef52d8](https://github.com/readmeio/api/commit/1ef52d8)), closes [#300](https://github.com/readmeio/api/issues/300)
* chore(deps-dev): bump jest from 26.6.3 to 27.0.3 (#299) ([2b73cef](https://github.com/readmeio/api/commit/2b73cef)), closes [#299](https://github.com/readmeio/api/issues/299)
* chore(deps-dev): bump nock from 13.0.11 to 13.1.0 (#295) ([f118bb2](https://github.com/readmeio/api/commit/f118bb2)), closes [#295](https://github.com/readmeio/api/issues/295)
* chore(deps): bump @readme/oas-to-har from 13.4.5 to 13.4.6 (#301) ([0a15279](https://github.com/readmeio/api/commit/0a15279)), closes [#301](https://github.com/readmeio/api/issues/301)
* chore(deps): bump oas from 11.0.0 to 11.0.1 (#298) ([a35e430](https://github.com/readmeio/api/commit/a35e430)), closes [#298](https://github.com/readmeio/api/issues/298)
* feat: shorthand for readme-hosted APIs (@subdomain#uuid) (#176) ([bca6c23](https://github.com/readmeio/api/commit/bca6c23)), closes [#176](https://github.com/readmeio/api/issues/176)
* ci: adjusting the codeql workflow ([0bbf4d8](https://github.com/readmeio/api/commit/0bbf4d8))



## 3.1.0 (2021-05-13)

* chore(deps-dev): bump @commitlint/cli from 12.1.1 to 12.1.3 (#288) ([23cdaf5](https://github.com/readmeio/api/commit/23cdaf5)), closes [#288](https://github.com/readmeio/api/issues/288)
* chore(deps-dev): bump @commitlint/config-conventional (#290) ([5d325b0](https://github.com/readmeio/api/commit/5d325b0)), closes [#290](https://github.com/readmeio/api/issues/290)
* chore(deps-dev): bump eslint from 7.25.0 to 7.26.0 (#291) ([f519b33](https://github.com/readmeio/api/commit/f519b33)), closes [#291](https://github.com/readmeio/api/issues/291)
* chore(deps-dev): bump prettier from 2.2.1 to 2.3.0 (#289) ([b423897](https://github.com/readmeio/api/commit/b423897)), closes [#289](https://github.com/readmeio/api/issues/289)
* chore(deps-dev): upgrading husky (#286) ([a6c12a8](https://github.com/readmeio/api/commit/a6c12a8)), closes [#286](https://github.com/readmeio/api/issues/286)
* chore(deps): bump fetch-har from 4.0.2 to 4.0.3 (#292) ([a8660df](https://github.com/readmeio/api/commit/a8660df)), closes [#292](https://github.com/readmeio/api/issues/292)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#294) ([47ecf81](https://github.com/readmeio/api/commit/47ecf81)), closes [#294](https://github.com/readmeio/api/issues/294)
* chore(deps): bump get-stream from 4.1.0 to 6.0.1 (#293) ([344c209](https://github.com/readmeio/api/commit/344c209)), closes [#293](https://github.com/readmeio/api/issues/293)
* chore(deps): bump js-yaml from 3.14.0 to 4.1.0 (#274) ([b8b4216](https://github.com/readmeio/api/commit/b8b4216)), closes [#274](https://github.com/readmeio/api/issues/274)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#287) ([347354d](https://github.com/readmeio/api/commit/347354d)), closes [#287](https://github.com/readmeio/api/issues/287)
* chore(deps): upgrading oas to 11.0.0 (#285) ([00c0288](https://github.com/readmeio/api/commit/00c0288)), closes [#285](https://github.com/readmeio/api/issues/285)
* feat: add a config() function that allows disabling of response parsing (#264) ([570049a](https://github.com/readmeio/api/commit/570049a)), closes [#264](https://github.com/readmeio/api/issues/264)
* feat: adding support for server variables (#284) ([1dd8a2e](https://github.com/readmeio/api/commit/1dd8a2e)), closes [#284](https://github.com/readmeio/api/issues/284)



## <small>3.0.3 (2021-05-07)</small>

* chore(deps-dev): bump @commitlint/cli from 12.0.1 to 12.1.1 (#276) ([d675432](https://github.com/readmeio/api/commit/d675432)), closes [#276](https://github.com/readmeio/api/issues/276)
* chore(deps-dev): bump @commitlint/config-conventional (#275) ([42a507b](https://github.com/readmeio/api/commit/42a507b)), closes [#275](https://github.com/readmeio/api/issues/275)
* chore(deps-dev): bump @readme/eslint-config from 5.0.3 to 5.0.5 (#282) ([b2d159c](https://github.com/readmeio/api/commit/b2d159c)), closes [#282](https://github.com/readmeio/api/issues/282)
* chore(deps-dev): bump eslint from 7.23.0 to 7.25.0 (#280) ([94ca270](https://github.com/readmeio/api/commit/94ca270)), closes [#280](https://github.com/readmeio/api/issues/280)
* chore(deps-dev): bump memfs from 3.2.1 to 3.2.2 (#273) ([8d50610](https://github.com/readmeio/api/commit/8d50610)), closes [#273](https://github.com/readmeio/api/issues/273)
* chore(deps): bump @readme/oas-to-har from 13.2.0 to 13.2.4 (#278) ([cc097e0](https://github.com/readmeio/api/commit/cc097e0)), closes [#278](https://github.com/readmeio/api/issues/278)
* chore(deps): bump get-stream from 6.0.0 to 6.0.1 (#279) ([1dea6cc](https://github.com/readmeio/api/commit/1dea6cc)), closes [#279](https://github.com/readmeio/api/issues/279)
* chore(deps): upgrading oas ([f6369c6](https://github.com/readmeio/api/commit/f6369c6))



## <small>3.0.2 (2021-05-04)</small>

* chore(deps): upgrading oas (#283) ([34655cb](https://github.com/readmeio/api/commit/34655cb)), closes [#283](https://github.com/readmeio/api/issues/283)
* fix: cleaning up a typo in an error message in httpsnippet-client-api ([341494f](https://github.com/readmeio/api/commit/341494f))



## <small>3.0.1 (2021-04-20)</small>

* ci: allowing node 16 installs and builds (#271) ([e36fab1](https://github.com/readmeio/api/commit/e36fab1)), closes [#271](https://github.com/readmeio/api/issues/271)
* chore(deps-dev): bump eslint from 7.22.0 to 7.23.0 (#266) ([54c2fc2](https://github.com/readmeio/api/commit/54c2fc2)), closes [#266](https://github.com/readmeio/api/issues/266)
* chore(deps-dev): bump memfs from 3.2.0 to 3.2.1 (#268) ([d6905cd](https://github.com/readmeio/api/commit/d6905cd)), closes [#268](https://github.com/readmeio/api/issues/268)
* chore(deps): bump @readme/oas-to-har from 13.0.0 to 13.2.0 (#265) ([21bc2f7](https://github.com/readmeio/api/commit/21bc2f7)), closes [#265](https://github.com/readmeio/api/issues/265)
* chore(deps): bump oas from 10.4.0 to 10.4.1 (#267) ([855d931](https://github.com/readmeio/api/commit/855d931)), closes [#267](https://github.com/readmeio/api/issues/267)
* feat: cleaner snippets when body and metadata are present (#269) ([4869caf](https://github.com/readmeio/api/commit/4869caf)), closes [#269](https://github.com/readmeio/api/issues/269)



## 3.0.0 (2021-03-24)

* chore: update deps and require npm@7 (#253) ([efa2705](https://github.com/readmeio/api/commit/efa2705)), closes [#253](https://github.com/readmeio/api/issues/253)
* chore(deps-dev): bump @commitlint/cli from 11.0.0 to 12.0.1 (#250) ([8b9b6a4](https://github.com/readmeio/api/commit/8b9b6a4)), closes [#250](https://github.com/readmeio/api/issues/250)
* chore(deps-dev): bump @commitlint/config-conventional (#248) ([12d734e](https://github.com/readmeio/api/commit/12d734e)), closes [#248](https://github.com/readmeio/api/issues/248)
* chore(deps-dev): bump @readme/eslint-config from 4.1.0 to 5.0.0 (#247) ([ef2023f](https://github.com/readmeio/api/commit/ef2023f)), closes [#247](https://github.com/readmeio/api/issues/247)
* chore(deps-dev): bump @readme/eslint-config from 5.0.0 to 5.0.3 (#258) ([440801e](https://github.com/readmeio/api/commit/440801e)), closes [#258](https://github.com/readmeio/api/issues/258)
* chore(deps-dev): bump eslint from 7.19.0 to 7.21.0 (#242) ([6875828](https://github.com/readmeio/api/commit/6875828)), closes [#242](https://github.com/readmeio/api/issues/242)
* chore(deps-dev): bump eslint from 7.21.0 to 7.22.0 (#255) ([1e48edc](https://github.com/readmeio/api/commit/1e48edc)), closes [#255](https://github.com/readmeio/api/issues/255)
* chore(deps-dev): bump nock from 13.0.7 to 13.0.9 (#251) ([f0bbc06](https://github.com/readmeio/api/commit/f0bbc06)), closes [#251](https://github.com/readmeio/api/issues/251)
* chore(deps-dev): bump nock from 13.0.9 to 13.0.11 (#260) ([fc8427f](https://github.com/readmeio/api/commit/fc8427f)), closes [#260](https://github.com/readmeio/api/issues/260)
* chore(deps): bump @apidevtools/swagger-parser from 10.0.1 to 10.0.2 (#245) ([84b95a2](https://github.com/readmeio/api/commit/84b95a2)), closes [#245](https://github.com/readmeio/api/issues/245)
* chore(deps): bump @readme/httpsnippet from 2.4.1 to 2.4.3 (#249) ([494bbcd](https://github.com/readmeio/api/commit/494bbcd)), closes [#249](https://github.com/readmeio/api/issues/249)
* chore(deps): bump @readme/oas-to-har from 11.1.2 to 12.2.1 (#246) ([57625d0](https://github.com/readmeio/api/commit/57625d0)), closes [#246](https://github.com/readmeio/api/issues/246)
* chore(deps): bump actions/setup-node from v2.1.4 to v2.1.5 (#241) ([0498476](https://github.com/readmeio/api/commit/0498476)), closes [#241](https://github.com/readmeio/api/issues/241)
* chore(deps): bump form-data from 2.3.3 to 4.0.0 (#259) ([f9910da](https://github.com/readmeio/api/commit/f9910da)), closes [#259](https://github.com/readmeio/api/issues/259)
* chore(deps): bump form-data from 3.0.0 to 4.0.0 (#244) ([47792bc](https://github.com/readmeio/api/commit/47792bc)), closes [#244](https://github.com/readmeio/api/issues/244)
* chore(deps): bump get-stream from 4.1.0 to 6.0.0 (#261) ([588fff7](https://github.com/readmeio/api/commit/588fff7)), closes [#261](https://github.com/readmeio/api/issues/261)
* chore(deps): bump make-dir from 1.3.0 to 3.1.0 (#256) ([ceec5c1](https://github.com/readmeio/api/commit/ceec5c1)), closes [#256](https://github.com/readmeio/api/issues/256)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#254) ([aed83e4](https://github.com/readmeio/api/commit/aed83e4)), closes [#254](https://github.com/readmeio/api/issues/254)
* chore(deps): bump oas from 10.0.1 to 10.2.0 (#243) ([e5934cc](https://github.com/readmeio/api/commit/e5934cc)), closes [#243](https://github.com/readmeio/api/issues/243)
* chore(deps): bump oas from 10.3.0 to 10.4.0 (#262) ([c7280d3](https://github.com/readmeio/api/commit/c7280d3)), closes [#262](https://github.com/readmeio/api/issues/262)
* ci: trying to fix codeql failures (#263) ([e3dd56b](https://github.com/readmeio/api/commit/e3dd56b)), closes [#263](https://github.com/readmeio/api/issues/263)
* feat: automatically parse the api response based on content-type  (#240) ([ae50813](https://github.com/readmeio/api/commit/ae50813)), closes [#240](https://github.com/readmeio/api/issues/240) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125) [/github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js#L13-L30](https://github.com//github.com/readmeio/api-explorer/blob/77b90ebed4673f168354cdcd730e34b7ee016360/packages/api-explorer/src/lib/parse-response.js/issues/L13-L30) [/github.com/readmeio/api/pull/240#discussion_r569829932](https://github.com//github.com/readmeio/api/pull/240/issues/discussion_r569829932)
* refactor: switch to using memfs instead of mock-fs (#239) ([6cb517f](https://github.com/readmeio/api/commit/6cb517f)), closes [#239](https://github.com/readmeio/api/issues/239) [/github.com/tschaub/mock-fs/issues/234#issuecomment-653529125](https://github.com//github.com/tschaub/mock-fs/issues/234/issues/issuecomment-653529125)


### BREAKING CHANGE

* this is a breaking change.

* chore: relax commitlint rules on body and footer length

Taken from main codebase

* feat: remove res.json() line from the httpsnippet client

* fix: always output `.then(res => console.log(res))` in code sample

Since we dont know if the response is json or not, we can't make
assumptions. In an ideal world we'd conditionally do this based
on the accept header in the response, but Operation.getHeaders() only
returns with an array of headers and not their actual values. I think
this is good enough for now!


## <small>2.7.1 (2021-02-02)</small>

* chore(deps): upgrading `@readme/httpsnippet` to the latest release ([9164024](https://github.com/readmeio/api/commit/9164024))



## 2.7.0 (2021-02-02)

* chore(deps): upgrading `@readme/httpsnippet` ([d184a14](https://github.com/readmeio/api/commit/d184a14))



## 2.6.0 (2021-02-02)

* chore: rebuilding the root package-lock ([d0f8091](https://github.com/readmeio/api/commit/d0f8091))
* chore(deps-dev): bump @readme/eslint-config from 3.6.5 to 3.7.1 (#210) ([ddae88a](https://github.com/readmeio/api/commit/ddae88a)), closes [#210](https://github.com/readmeio/api/issues/210)
* chore(deps-dev): bump @readme/eslint-config from 3.7.1 to 3.8.0 (#214) ([1346192](https://github.com/readmeio/api/commit/1346192)), closes [#214](https://github.com/readmeio/api/issues/214)
* chore(deps-dev): bump @readme/eslint-config from 3.8.0 to 4.0.0 (#219) ([0741212](https://github.com/readmeio/api/commit/0741212)), closes [#219](https://github.com/readmeio/api/issues/219)
* chore(deps-dev): bump @readme/eslint-config from 4.0.0 to 4.1.0 (#229) ([608e855](https://github.com/readmeio/api/commit/608e855)), closes [#229](https://github.com/readmeio/api/issues/229)
* chore(deps-dev): bump eslint from 7.14.0 to 7.15.0 (#212) ([b340515](https://github.com/readmeio/api/commit/b340515)), closes [#212](https://github.com/readmeio/api/issues/212)
* chore(deps-dev): bump eslint from 7.15.0 to 7.16.0 (#220) ([69a0e0a](https://github.com/readmeio/api/commit/69a0e0a)), closes [#220](https://github.com/readmeio/api/issues/220)
* chore(deps-dev): bump eslint from 7.16.0 to 7.17.0 (#226) ([0bbdc05](https://github.com/readmeio/api/commit/0bbdc05)), closes [#226](https://github.com/readmeio/api/issues/226)
* chore(deps-dev): bump eslint from 7.17.0 to 7.19.0 (#234) ([0acb815](https://github.com/readmeio/api/commit/0acb815)), closes [#234](https://github.com/readmeio/api/issues/234)
* chore(deps-dev): bump husky from 4.3.0 to 4.3.6 (#217) ([571fa3f](https://github.com/readmeio/api/commit/571fa3f)), closes [#217](https://github.com/readmeio/api/issues/217)
* chore(deps-dev): bump husky from 4.3.6 to 4.3.7 (#228) ([6988708](https://github.com/readmeio/api/commit/6988708)), closes [#228](https://github.com/readmeio/api/issues/228)
* chore(deps-dev): bump husky from 4.3.7 to 4.3.8 (#238) ([82efe01](https://github.com/readmeio/api/commit/82efe01)), closes [#238](https://github.com/readmeio/api/issues/238)
* chore(deps-dev): bump nock from 13.0.5 to 13.0.7 (#235) ([9beb2ae](https://github.com/readmeio/api/commit/9beb2ae)), closes [#235](https://github.com/readmeio/api/issues/235)
* chore(deps-dev): bump prettier from 2.2.0 to 2.2.1 (#209) ([38fe2ff](https://github.com/readmeio/api/commit/38fe2ff)), closes [#209](https://github.com/readmeio/api/issues/209)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#237) ([db65c3b](https://github.com/readmeio/api/commit/db65c3b)), closes [#237](https://github.com/readmeio/api/issues/237)
* chore(deps): bump @readme/oas-to-har from 10.0.0 to 10.0.5 (#215) ([0462373](https://github.com/readmeio/api/commit/0462373)), closes [#215](https://github.com/readmeio/api/issues/215)
* chore(deps): bump @readme/oas-to-har from 11.1.0 to 11.1.2 (#236) ([611148f](https://github.com/readmeio/api/commit/611148f)), closes [#236](https://github.com/readmeio/api/issues/236)
* chore(deps): bump actions/checkout from v2.3.3 to v2.3.4 (#211) ([a88ec6c](https://github.com/readmeio/api/commit/a88ec6c)), closes [#211](https://github.com/readmeio/api/issues/211)
* chore(deps): bump actions/setup-node from v2.1.2 to v2.1.4 (#225) ([6697623](https://github.com/readmeio/api/commit/6697623)), closes [#225](https://github.com/readmeio/api/issues/225)
* chore(deps): bump ini from 1.3.5 to 1.3.8 (#232) ([17f4246](https://github.com/readmeio/api/commit/17f4246)), closes [#232](https://github.com/readmeio/api/issues/232)
* chore(deps): bump js-yaml from 3.14.0 to 3.14.1 (#218) ([a4cb9e7](https://github.com/readmeio/api/commit/a4cb9e7)), closes [#218](https://github.com/readmeio/api/issues/218)
* chore(deps): bump node-notifier from 8.0.0 to 8.0.1 in /packages/api (#224) ([c846af0](https://github.com/readmeio/api/commit/c846af0)), closes [#224](https://github.com/readmeio/api/issues/224)
* chore(deps): bump node-notifier in /packages/httpsnippet-client-api (#223) ([63fa1f9](https://github.com/readmeio/api/commit/63fa1f9)), closes [#223](https://github.com/readmeio/api/issues/223)
* chore(deps): bump oas from 10.0.0 to 10.0.1 (#233) ([af2d9fb](https://github.com/readmeio/api/commit/af2d9fb)), closes [#233](https://github.com/readmeio/api/issues/233)
* chore(deps): bump oas from 6.1.0 to 10.0.0 (#231) ([166000a](https://github.com/readmeio/api/commit/166000a)), closes [#231](https://github.com/readmeio/api/issues/231)
* ci: updating dependabot to run on a monthly schedule ([a081851](https://github.com/readmeio/api/commit/a081851))



## 2.5.0 (2020-11-27)

* chore(deps-dev): bump @readme/eslint-config from 3.6.2 to 3.6.3 (#194) ([c53f2a0](https://github.com/readmeio/api/commit/c53f2a0)), closes [#194](https://github.com/readmeio/api/issues/194)
* chore(deps-dev): bump @readme/eslint-config from 3.6.3 to 3.6.5 (#204) ([accc1b3](https://github.com/readmeio/api/commit/accc1b3)), closes [#204](https://github.com/readmeio/api/issues/204)
* chore(deps-dev): bump conventional-changelog-cli from 2.1.0 to 2.1.1 (#195) ([82ec912](https://github.com/readmeio/api/commit/82ec912)), closes [#195](https://github.com/readmeio/api/issues/195)
* chore(deps-dev): bump eslint from 7.12.1 to 7.13.0 (#197) ([e4cae18](https://github.com/readmeio/api/commit/e4cae18)), closes [#197](https://github.com/readmeio/api/issues/197)
* chore(deps-dev): bump eslint from 7.13.0 to 7.14.0 (#206) ([a963391](https://github.com/readmeio/api/commit/a963391)), closes [#206](https://github.com/readmeio/api/issues/206)
* chore(deps-dev): bump jest from 26.6.1 to 26.6.3 (#199) ([64ca33f](https://github.com/readmeio/api/commit/64ca33f)), closes [#199](https://github.com/readmeio/api/issues/199)
* chore(deps-dev): bump nock from 13.0.4 to 13.0.5 (#201) ([b3d5198](https://github.com/readmeio/api/commit/b3d5198)), closes [#201](https://github.com/readmeio/api/issues/201)
* chore(deps-dev): bump prettier from 2.1.2 to 2.2.0 (#205) ([f26cf5f](https://github.com/readmeio/api/commit/f26cf5f)), closes [#205](https://github.com/readmeio/api/issues/205)
* chore(deps): bump @readme/httpsnippet from 2.2.3 to 2.3.1 (#207) ([ca2eeb0](https://github.com/readmeio/api/commit/ca2eeb0)), closes [#207](https://github.com/readmeio/api/issues/207)
* chore(deps): bump @readme/oas-to-har from 9.0.0 to 9.2.0 (#196) ([0b0f5ac](https://github.com/readmeio/api/commit/0b0f5ac)), closes [#196](https://github.com/readmeio/api/issues/196)
* chore(deps): bump @readme/oas-to-har from 9.2.0 to 9.2.2 (#202) ([a492210](https://github.com/readmeio/api/commit/a492210)), closes [#202](https://github.com/readmeio/api/issues/202)
* chore(deps): bump oas from 5.0.0 to 5.2.0 (#198) ([cb0b851](https://github.com/readmeio/api/commit/cb0b851)), closes [#198](https://github.com/readmeio/api/issues/198)
* chore(deps): upgrade oas and oas-to-har (#208) ([3daec70](https://github.com/readmeio/api/commit/3daec70)), closes [#208](https://github.com/readmeio/api/issues/208)



## <small>2.4.4 (2020-11-02)</small>

* fix: adding better messaging when operations can't be found (#193) ([22b6dfd](https://github.com/readmeio/api/commit/22b6dfd)), closes [#193](https://github.com/readmeio/api/issues/193)
* chore(deps-dev): bump @readme/eslint-config from 3.6.1 to 3.6.2 (#189) ([eae818f](https://github.com/readmeio/api/commit/eae818f)), closes [#189](https://github.com/readmeio/api/issues/189)
* chore(deps-dev): bump eslint from 7.11.0 to 7.12.0 (#186) ([1661310](https://github.com/readmeio/api/commit/1661310)), closes [#186](https://github.com/readmeio/api/issues/186)
* chore(deps-dev): bump eslint from 7.12.0 to 7.12.1 (#192) ([d0d838d](https://github.com/readmeio/api/commit/d0d838d)), closes [#192](https://github.com/readmeio/api/issues/192)
* chore(deps-dev): bump jest from 26.5.3 to 26.6.1 (#188) ([e25388e](https://github.com/readmeio/api/commit/e25388e)), closes [#188](https://github.com/readmeio/api/issues/188)
* chore(deps): bump @readme/httpsnippet from 2.2.2 to 2.2.3 (#187) ([530fa45](https://github.com/readmeio/api/commit/530fa45)), closes [#187](https://github.com/readmeio/api/issues/187)
* chore(deps): bump @readme/oas-to-har from 8.1.0 to 9.0.0 (#191) ([f50bbb0](https://github.com/readmeio/api/commit/f50bbb0)), closes [#191](https://github.com/readmeio/api/issues/191)
* chore(deps): bump actions/setup-node from v2.1.1 to v2.1.2 (#190) ([f4745f9](https://github.com/readmeio/api/commit/f4745f9)), closes [#190](https://github.com/readmeio/api/issues/190)



## <small>2.4.3 (2020-10-21)</small>

* chore(deps): upgrading @readme/oas-to-har to 8.1.0 ([f2d3af7](https://github.com/readmeio/api/commit/f2d3af7))
* chore(deps): upgrading oas to 5.0 ([0351595](https://github.com/readmeio/api/commit/0351595))



## <small>2.4.2 (2020-10-21)</small>

* fix: pinning httpsnippet-client-api to oas@4.0.0 ([29af3be](https://github.com/readmeio/api/commit/29af3be))



## <small>2.4.1 (2020-10-20)</small>

* chore(deps-dev): bump @readme/eslint-config from 3.6.0 to 3.6.1 (#183) ([33996b0](https://github.com/readmeio/api/commit/33996b0)), closes [#183](https://github.com/readmeio/api/issues/183)
* chore(deps): bump @readme/oas-to-har from 7.5.0 to 8.0.1 (#182) ([a2052bb](https://github.com/readmeio/api/commit/a2052bb)), closes [#182](https://github.com/readmeio/api/issues/182)
* chore(deps): bump @readme/oas-tooling from 3.6.0 to 3.6.1 (#184) ([3d86be9](https://github.com/readmeio/api/commit/3d86be9)), closes [#184](https://github.com/readmeio/api/issues/184)
* chore(deps): swapping `@readme/oas-tooling` for `oas` (#185) ([d9ced1c](https://github.com/readmeio/api/commit/d9ced1c)), closes [#185](https://github.com/readmeio/api/issues/185)



## 2.4.0 (2020-10-16)

* chore: test cleanup (#181) ([1fe0e95](https://github.com/readmeio/api/commit/1fe0e95)), closes [#181](https://github.com/readmeio/api/issues/181)
* fix: adding support for non-alphanumerical operation ids (#180) ([fd075a0](https://github.com/readmeio/api/commit/fd075a0)), closes [#180](https://github.com/readmeio/api/issues/180)
* fix: basic auth headers now decoded and exploded into `.auth()` calls (#179) ([2351b95](https://github.com/readmeio/api/commit/2351b95)), closes [#179](https://github.com/readmeio/api/issues/179)



## <small>2.3.3 (2020-10-15)</small>

* fix: adding a `.catch()` statement to code snippets (#177) ([d7c8613](https://github.com/readmeio/api/commit/d7c8613)), closes [#177](https://github.com/readmeio/api/issues/177)
* chore(deps-dev): bump @readme/eslint-config from 3.5.0 to 3.6.0 (#173) ([9f8d0f2](https://github.com/readmeio/api/commit/9f8d0f2)), closes [#173](https://github.com/readmeio/api/issues/173)
* chore(deps-dev): bump @readme/oas-examples from 3.5.13 to 3.6.0 (#174) ([9c4b118](https://github.com/readmeio/api/commit/9c4b118)), closes [#174](https://github.com/readmeio/api/issues/174)
* chore(deps-dev): bump eslint from 7.10.0 to 7.11.0 (#175) ([be9393f](https://github.com/readmeio/api/commit/be9393f)), closes [#175](https://github.com/readmeio/api/issues/175)
* chore(deps-dev): bump jest from 26.4.2 to 26.5.3 (#171) ([b4cbc9f](https://github.com/readmeio/api/commit/b4cbc9f)), closes [#171](https://github.com/readmeio/api/issues/171)
* chore(deps): bump @readme/oas-to-har from 7.3.0 to 7.5.0 (#170) ([f26bb01](https://github.com/readmeio/api/commit/f26bb01)), closes [#170](https://github.com/readmeio/api/issues/170)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.14 (#169) ([524915a](https://github.com/readmeio/api/commit/524915a)), closes [#169](https://github.com/readmeio/api/issues/169)
* chore(deps): bump @readme/oas-tooling from 3.5.14 to 3.6.0 (#172) ([6bd2fb3](https://github.com/readmeio/api/commit/6bd2fb3)), closes [#172](https://github.com/readmeio/api/issues/172)



## <small>2.3.2 (2020-10-05)</small>

* chore(deps-dev): bump @commitlint/cli from 9.1.2 to 11.0.0 (#158) ([a068e8f](https://github.com/readmeio/api/commit/a068e8f)), closes [#158](https://github.com/readmeio/api/issues/158)
* chore(deps-dev): bump @commitlint/config-conventional (#159) ([c084c27](https://github.com/readmeio/api/commit/c084c27)), closes [#159](https://github.com/readmeio/api/issues/159)
* chore(deps-dev): bump @readme/eslint-config from 3.4.2 to 3.4.3 (#155) ([efb446e](https://github.com/readmeio/api/commit/efb446e)), closes [#155](https://github.com/readmeio/api/issues/155)
* chore(deps-dev): bump @readme/eslint-config from 3.4.3 to 3.5.0 (#161) ([68d69ee](https://github.com/readmeio/api/commit/68d69ee)), closes [#161](https://github.com/readmeio/api/issues/161)
* chore(deps-dev): bump @readme/oas-examples from 3.5.5 to 3.5.13 (#164) ([1f5d2f1](https://github.com/readmeio/api/commit/1f5d2f1)), closes [#164](https://github.com/readmeio/api/issues/164)
* chore(deps-dev): bump eslint from 7.8.1 to 7.9.0 (#157) ([3f04da5](https://github.com/readmeio/api/commit/3f04da5)), closes [#157](https://github.com/readmeio/api/issues/157)
* chore(deps-dev): bump eslint from 7.9.0 to 7.10.0 (#166) ([d021965](https://github.com/readmeio/api/commit/d021965)), closes [#166](https://github.com/readmeio/api/issues/166)
* chore(deps-dev): bump husky from 4.2.5 to 4.3.0 (#160) ([54c9c0c](https://github.com/readmeio/api/commit/54c9c0c)), closes [#160](https://github.com/readmeio/api/issues/160)
* chore(deps-dev): bump prettier from 2.1.1 to 2.1.2 (#162) ([6d31ded](https://github.com/readmeio/api/commit/6d31ded)), closes [#162](https://github.com/readmeio/api/issues/162)
* chore(deps): bump @readme/oas-to-har from 7.2.1 to 7.3.0 (#163) ([5a915ca](https://github.com/readmeio/api/commit/5a915ca)), closes [#163](https://github.com/readmeio/api/issues/163)
* chore(deps): bump @readme/oas-tooling from 3.5.11 to 3.5.13 (#165) ([5b8cd08](https://github.com/readmeio/api/commit/5b8cd08)), closes [#165](https://github.com/readmeio/api/issues/165)
* chore(deps): bump actions/checkout from v2.3.2 to v2.3.3 (#167) ([3f12362](https://github.com/readmeio/api/commit/3f12362)), closes [#167](https://github.com/readmeio/api/issues/167)
* chore(deps): bump fetch-har from 4.0.1 to 4.0.2 (#156) ([2c3314e](https://github.com/readmeio/api/commit/2c3314e)), closes [#156](https://github.com/readmeio/api/issues/156)
* chore(deps): bump path-to-regexp from 6.1.0 to 6.2.0 (#168) ([7ccf66c](https://github.com/readmeio/api/commit/7ccf66c)), closes [#168](https://github.com/readmeio/api/issues/168)



## <small>2.3.1 (2020-09-08)</small>

* fix: if no cache dir is determined, fallback to the os temp dir (#154) ([e0525f0](https://github.com/readmeio/api/commit/e0525f0)), closes [#154](https://github.com/readmeio/api/issues/154) [#107](https://github.com/readmeio/api/issues/107)
* chore(deps-dev): bump @readme/eslint-config from 3.4.1 to 3.4.2 (#144) ([5e7bc96](https://github.com/readmeio/api/commit/5e7bc96)), closes [#144](https://github.com/readmeio/api/issues/144)
* chore(deps-dev): bump eslint from 7.7.0 to 7.8.1 (#152) ([be44467](https://github.com/readmeio/api/commit/be44467)), closes [#152](https://github.com/readmeio/api/issues/152)
* chore(deps-dev): bump jest from 26.4.0 to 26.4.2 (#143) ([831d12c](https://github.com/readmeio/api/commit/831d12c)), closes [#143](https://github.com/readmeio/api/issues/143)
* chore(deps-dev): bump mock-fs from 4.12.0 to 4.13.0 (#145) ([69a87fa](https://github.com/readmeio/api/commit/69a87fa)), closes [#145](https://github.com/readmeio/api/issues/145)
* chore(deps-dev): bump prettier from 2.0.5 to 2.1.1 (#147) ([565939e](https://github.com/readmeio/api/commit/565939e)), closes [#147](https://github.com/readmeio/api/issues/147)
* chore(deps): bump @readme/httpsnippet from 2.0.1 to 2.1.1 (#148) ([4046808](https://github.com/readmeio/api/commit/4046808)), closes [#148](https://github.com/readmeio/api/issues/148)
* chore(deps): bump @readme/oas-to-har from 7.0.0 to 7.2.0 (#146) ([53a08a5](https://github.com/readmeio/api/commit/53a08a5)), closes [#146](https://github.com/readmeio/api/issues/146)
* chore(deps): bump @readme/oas-to-har from 7.2.0 to 7.2.1 (#153) ([7368d93](https://github.com/readmeio/api/commit/7368d93)), closes [#153](https://github.com/readmeio/api/issues/153)
* chore(deps): bump @readme/oas-tooling from 3.5.8 to 3.5.11 (#149) ([845e147](https://github.com/readmeio/api/commit/845e147)), closes [#149](https://github.com/readmeio/api/issues/149)
* chore(deps): bump node-fetch from 2.6.0 to 2.6.1 (#151) ([d740da5](https://github.com/readmeio/api/commit/d740da5)), closes [#151](https://github.com/readmeio/api/issues/151)
* chore(deps): update actions/checkout requirement to v2.3.2 (#150) ([aacc532](https://github.com/readmeio/api/commit/aacc532)), closes [#150](https://github.com/readmeio/api/issues/150)



## 2.3.0 (2020-08-17)

* feat: support multipart/form-data (#132) ([8f28341](https://github.com/readmeio/api/commit/8f28341)), closes [#132](https://github.com/readmeio/api/issues/132)
* chore(deps-dev): bump @commitlint/cli from 9.1.1 to 9.1.2 (#142) ([a4f70bf](https://github.com/readmeio/api/commit/a4f70bf)), closes [#142](https://github.com/readmeio/api/issues/142)
* chore(deps-dev): bump @commitlint/config-conventional (#138) ([125a08a](https://github.com/readmeio/api/commit/125a08a)), closes [#138](https://github.com/readmeio/api/issues/138)
* chore(deps-dev): bump @readme/eslint-config from 3.4.0 to 3.4.1 (#133) ([d65621b](https://github.com/readmeio/api/commit/d65621b)), closes [#133](https://github.com/readmeio/api/issues/133)
* chore(deps-dev): bump conventional-changelog-cli from 2.0.34 to 2.1.0 (#134) ([432dba7](https://github.com/readmeio/api/commit/432dba7)), closes [#134](https://github.com/readmeio/api/issues/134)
* chore(deps-dev): bump eslint from 7.6.0 to 7.7.0 (#137) ([baf6fe0](https://github.com/readmeio/api/commit/baf6fe0)), closes [#137](https://github.com/readmeio/api/issues/137)
* chore(deps-dev): bump jest from 26.2.2 to 26.4.0 (#141) ([16bc760](https://github.com/readmeio/api/commit/16bc760)), closes [#141](https://github.com/readmeio/api/issues/141)
* chore(deps-dev): bump nock from 13.0.3 to 13.0.4 (#135) ([34f7cf7](https://github.com/readmeio/api/commit/34f7cf7)), closes [#135](https://github.com/readmeio/api/issues/135)
* chore(deps-dev): upgrading @readme/eslint-config and eslint ([992651c](https://github.com/readmeio/api/commit/992651c))
* chore(deps): bump @readme/oas-to-har from 6.15.2 to 6.16.1 (#139) ([47db45a](https://github.com/readmeio/api/commit/47db45a)), closes [#139](https://github.com/readmeio/api/issues/139)
* chore(deps): bump @readme/oas-tooling from 3.5.6 to 3.5.8 (#136) ([4416c87](https://github.com/readmeio/api/commit/4416c87)), closes [#136](https://github.com/readmeio/api/issues/136)



## <small>2.2.3 (2020-08-03)</small>

* fix: auth keys not being properly escaped (#129) ([b0923eb](https://github.com/readmeio/api/commit/b0923eb)), closes [#129](https://github.com/readmeio/api/issues/129)



## <small>2.2.2 (2020-08-03)</small>

* ci: setting up codeql workflows (#127) ([62707be](https://github.com/readmeio/api/commit/62707be)), closes [#127](https://github.com/readmeio/api/issues/127)
* chore(deps-dev): bump @readme/eslint-config from 3.3.3 to 3.4.0 (#121) ([f393edc](https://github.com/readmeio/api/commit/f393edc)), closes [#121](https://github.com/readmeio/api/issues/121)
* chore(deps-dev): bump eslint from 7.5.0 to 7.6.0 (#122) ([0eb173b](https://github.com/readmeio/api/commit/0eb173b)), closes [#122](https://github.com/readmeio/api/issues/122)
* chore(deps-dev): bump jest from 26.1.0 to 26.2.2 (#126) ([4229c34](https://github.com/readmeio/api/commit/4229c34)), closes [#126](https://github.com/readmeio/api/issues/126)
* chore(deps-dev): bump nock from 13.0.2 to 13.0.3 (#125) ([fcc2d45](https://github.com/readmeio/api/commit/fcc2d45)), closes [#125](https://github.com/readmeio/api/issues/125)
* chore(deps): bump @readme/oas-to-har from 6.14.0 to 6.15.2 (#123) ([c6203a6](https://github.com/readmeio/api/commit/c6203a6)), closes [#123](https://github.com/readmeio/api/issues/123)
* chore(deps): bump @readme/oas-tooling from 3.5.5 to 3.5.6 (#124) ([1c179d8](https://github.com/readmeio/api/commit/1c179d8)), closes [#124](https://github.com/readmeio/api/issues/124)
* chore(deps): bump actions/setup-node from v2.1.0 to v2.1.1 (#120) ([6b915cf](https://github.com/readmeio/api/commit/6b915cf)), closes [#120](https://github.com/readmeio/api/issues/120)



## <small>2.2.1 (2020-07-27)</small>

* chore: cleaning up the package-lock ([7d4ec59](https://github.com/readmeio/api/commit/7d4ec59))
* chore(deps-dev): bump @commitlint/cli from 9.0.1 to 9.1.1 (#109) ([7f0eaec](https://github.com/readmeio/api/commit/7f0eaec)), closes [#109](https://github.com/readmeio/api/issues/109)
* chore(deps-dev): bump @commitlint/config-conventional (#116) ([ee0f79c](https://github.com/readmeio/api/commit/ee0f79c)), closes [#116](https://github.com/readmeio/api/issues/116)
* chore(deps-dev): bump @readme/eslint-config from 3.3.2 to 3.3.3 (#118) ([963a235](https://github.com/readmeio/api/commit/963a235)), closes [#118](https://github.com/readmeio/api/issues/118)
* chore(deps-dev): bump @readme/oas-examples from 3.4.0 to 3.5.5 (#113) ([a7b4561](https://github.com/readmeio/api/commit/a7b4561)), closes [#113](https://github.com/readmeio/api/issues/113)
* chore(deps-dev): bump eslint from 7.4.0 to 7.5.0 (#110) ([cd29a03](https://github.com/readmeio/api/commit/cd29a03)), closes [#110](https://github.com/readmeio/api/issues/110)
* chore(deps): bump @apidevtools/json-schema-ref-parser (#115) ([a129798](https://github.com/readmeio/api/commit/a129798)), closes [#115](https://github.com/readmeio/api/issues/115)
* chore(deps): bump @apidevtools/swagger-parser from 9.0.1 to 10.0.1 (#112) ([a3aed98](https://github.com/readmeio/api/commit/a3aed98)), closes [#112](https://github.com/readmeio/api/issues/112)
* chore(deps): bump @readme/oas-tooling from 3.5.0 to 3.5.5 (#111) ([5621fad](https://github.com/readmeio/api/commit/5621fad)), closes [#111](https://github.com/readmeio/api/issues/111)
* chore(deps): bump fetch-har from 3.0.0 to 3.0.2 (#114) ([41efd8b](https://github.com/readmeio/api/commit/41efd8b)), closes [#114](https://github.com/readmeio/api/issues/114)
* chore(deps): bump httpsnippet from 1.20.0 to 1.21.0 (#117) ([e5d5082](https://github.com/readmeio/api/commit/e5d5082)), closes [#117](https://github.com/readmeio/api/issues/117)
* chore(deps): bump lodash from 4.17.15 to 4.17.19 (#108) ([9d4c12a](https://github.com/readmeio/api/commit/9d4c12a)), closes [#108](https://github.com/readmeio/api/issues/108)



## 2.2.0 (2020-07-13)

* feat: automatically reject the sdk promise for error statuses (#105) ([827f32a](https://github.com/readmeio/api/commit/827f32a)), closes [#105](https://github.com/readmeio/api/issues/105)
* feat: setting a custom user agent for all requests (#106) ([25cefef](https://github.com/readmeio/api/commit/25cefef)), closes [#106](https://github.com/readmeio/api/issues/106)



## <small>2.1.6 (2020-07-06)</small>

* chore(deps-dev): bump @commitlint/cli from 8.3.5 to 9.0.1 (#87) ([5e99252](https://github.com/readmeio/api/commit/5e99252)), closes [#87](https://github.com/readmeio/api/issues/87)
* chore(deps-dev): bump @commitlint/config-conventional (#88) ([a08be1f](https://github.com/readmeio/api/commit/a08be1f)), closes [#88](https://github.com/readmeio/api/issues/88)
* chore(deps-dev): bump @readme/eslint-config from 3.2.0 to 3.3.0 (#90) ([7c286ac](https://github.com/readmeio/api/commit/7c286ac)), closes [#90](https://github.com/readmeio/api/issues/90)
* chore(deps-dev): bump @readme/eslint-config from 3.3.0 to 3.3.2 (#99) ([038e6e2](https://github.com/readmeio/api/commit/038e6e2)), closes [#99](https://github.com/readmeio/api/issues/99)
* chore(deps-dev): bump eslint from 7.2.0 to 7.3.1 (#93) ([d96b2c9](https://github.com/readmeio/api/commit/d96b2c9)), closes [#93](https://github.com/readmeio/api/issues/93)
* chore(deps-dev): bump eslint from 7.3.1 to 7.4.0 (#95) ([a1d7eed](https://github.com/readmeio/api/commit/a1d7eed)), closes [#95](https://github.com/readmeio/api/issues/95)
* chore(deps-dev): bump jest from 26.0.1 to 26.1.0 (#92) ([c388924](https://github.com/readmeio/api/commit/c388924)), closes [#92](https://github.com/readmeio/api/issues/92)
* chore(deps-dev): bump nock from 12.0.3 to 13.0.0 (#91) ([52c9202](https://github.com/readmeio/api/commit/52c9202)), closes [#91](https://github.com/readmeio/api/issues/91)
* chore(deps-dev): bump nock from 13.0.0 to 13.0.2 (#97) ([cafd323](https://github.com/readmeio/api/commit/cafd323)), closes [#97](https://github.com/readmeio/api/issues/97)
* chore(deps): bump @readme/oas-to-har from 6.10.2 to 6.11.1 (#85) ([0d0c59e](https://github.com/readmeio/api/commit/0d0c59e)), closes [#85](https://github.com/readmeio/api/issues/85)
* chore(deps): bump @readme/oas-to-har from 6.11.1 to 6.14.0 (#98) ([a3b7b7d](https://github.com/readmeio/api/commit/a3b7b7d)), closes [#98](https://github.com/readmeio/api/issues/98)
* chore(deps): bump @readme/oas-tooling from 3.4.5 to 3.4.7 (#83) ([c341070](https://github.com/readmeio/api/commit/c341070)), closes [#83](https://github.com/readmeio/api/issues/83)
* chore(deps): bump @readme/oas-tooling from 3.4.7 to 3.5.0 (#96) ([32aa6d5](https://github.com/readmeio/api/commit/32aa6d5)), closes [#96](https://github.com/readmeio/api/issues/96)
* chore(deps): bump actions/checkout from v2.2.0 to v2.3.1 (#89) ([51d9be7](https://github.com/readmeio/api/commit/51d9be7)), closes [#89](https://github.com/readmeio/api/issues/89)
* chore(deps): bump actions/setup-node from v2.0.0 to v2.1.0 (#94) ([d5a18ce](https://github.com/readmeio/api/commit/d5a18ce)), closes [#94](https://github.com/readmeio/api/issues/94)
* chore(deps): bump fetch-har from 2.3.2 to 3.0.0 (#100) ([6fbe358](https://github.com/readmeio/api/commit/6fbe358)), closes [#100](https://github.com/readmeio/api/issues/100)
* feat: cleaning up api snippets by breaking off the auth call (#101) ([d76ba9e](https://github.com/readmeio/api/commit/d76ba9e)), closes [#101](https://github.com/readmeio/api/issues/101)
* docs: cleaning up the pr template ([6539d14](https://github.com/readmeio/api/commit/6539d14))
* ci: changing the label that dependabot uses ([57917ce](https://github.com/readmeio/api/commit/57917ce))



## <small>2.1.5 (2020-06-19)</small>

* build: some more attempts at changelog improvements ([ddcb46d](https://github.com/readmeio/api/commit/ddcb46d))
* chore(deps): upgrading @readme/oas-tooling to 3.4.7 (#82) ([1e19988](https://github.com/readmeio/api/commit/1e19988)), closes [#82](https://github.com/readmeio/api/issues/82)
* docs: changelog typo resolutions ([cbd7862](https://github.com/readmeio/api/commit/cbd7862))



## <small>2.1.4 (2020-06-19)</small>

* build: setting an empty version in the root package file for changelogs ([f7e5db6](https://github.com/readmeio/api/commit/f7e5db6))
* fix: minor cleanup and clarification on the fix in 996da5b ([8fbe624](https://github.com/readmeio/api/commit/8fbe624))
* docs: fixing a typo in the changelog ([996da5b](https://github.com/readmeio/api/commit/996da5b))



## <small>2.1.3 (2020-06-19)</small>

* build: working to get changelogs automatically updated ([074cbb8](https://github.com/readmeio/api/commit/074cbb8))
* fix: issues where path params wouldn't always get added as metadata (#80) ([5215366](https://github.com/readmeio/api/commit/5215366)), closes [#80](https://github.com/readmeio/api/issues/80)
* docs: updating the changelog ([27e23c4](https://github.com/readmeio/api/commit/27e23c4))



## <small>2.1.2 (2020-06-18)</small>

* fix: bug where path params wouldn't be included in snippets (#79) ([719e2e0](https://github.com/readmeio/api/commit/719e2e0)), closes [#79](https://github.com/readmeio/api/issues/79)



## <small>2.1.1 (2020-06-17)</small>

* fix: snippet paths should not include the server url (#77) ([a812f0b](https://github.com/readmeio/api/commit/a812f0b)), closes [#77](https://github.com/readmeio/api/issues/77)
* chore(deps-dev): bump lerna from 3.22.0 to 3.22.1 (#74) ([7c270c2](https://github.com/readmeio/api/commit/7c270c2)), closes [#74](https://github.com/readmeio/api/issues/74)
* chore(deps): bump @readme/oas-to-har from 6.10.0 to 6.10.2 (#73) ([1b4568c](https://github.com/readmeio/api/commit/1b4568c)), closes [#73](https://github.com/readmeio/api/issues/73)
* chore(deps): bump @readme/oas-tooling from 3.4.3 to 3.4.5 (#75) ([05e5204](https://github.com/readmeio/api/commit/05e5204)), closes [#75](https://github.com/readmeio/api/issues/75)



## 2.1.0 (2020-06-12)

* fix: relative paths in parent parent directories not being supported (#67) ([dba888b](https://github.com/readmeio/api/commit/dba888b)), closes [#67](https://github.com/readmeio/api/issues/67)
* fix: various code snippet issues and deficiencies (#72) ([c5e4eeb](https://github.com/readmeio/api/commit/c5e4eeb)), closes [#72](https://github.com/readmeio/api/issues/72)
* chore: configuring dependabot to also update our github actions ([e8a90ea](https://github.com/readmeio/api/commit/e8a90ea))
* chore: moving off our httpsnippet fork and to v1.20.x (#64) ([45b0e2a](https://github.com/readmeio/api/commit/45b0e2a)), closes [#64](https://github.com/readmeio/api/issues/64)
* chore(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#57) ([2d4fa96](https://github.com/readmeio/api/commit/2d4fa96)), closes [#57](https://github.com/readmeio/api/issues/57)
* chore(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#63) ([919bdd9](https://github.com/readmeio/api/commit/919bdd9)), closes [#63](https://github.com/readmeio/api/issues/63)
* chore(deps-dev): upgrading @readme/eslint-config to 3.2.0 (#70) ([3b26c2e](https://github.com/readmeio/api/commit/3b26c2e)), closes [#70](https://github.com/readmeio/api/issues/70)
* chore(deps): bump @readme/oas-to-har from 6.9.6 to 6.10.0 (#59) ([9ef271a](https://github.com/readmeio/api/commit/9ef271a)), closes [#59](https://github.com/readmeio/api/issues/59)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#54) ([b58e8e3](https://github.com/readmeio/api/commit/b58e8e3)), closes [#54](https://github.com/readmeio/api/issues/54)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#58) ([f66cae2](https://github.com/readmeio/api/commit/f66cae2)), closes [#58](https://github.com/readmeio/api/issues/58)
* chore(deps): bump actions/checkout from v1 to v2.2.0 (#65) ([47d99e4](https://github.com/readmeio/api/commit/47d99e4)), closes [#65](https://github.com/readmeio/api/issues/65)
* chore(deps): bump actions/setup-node from v1 to v2.0.0 (#66) ([6a46c6c](https://github.com/readmeio/api/commit/6a46c6c)), closes [#66](https://github.com/readmeio/api/issues/66)
* chore(deps): bump fetch-har from 2.3.1 to 2.3.2 (#60) ([1a1ebe7](https://github.com/readmeio/api/commit/1a1ebe7)), closes [#60](https://github.com/readmeio/api/issues/60)
* chore(deps): swapping yaml for js-yaml (#69) ([fc04a9f](https://github.com/readmeio/api/commit/fc04a9f)), closes [#69](https://github.com/readmeio/api/issues/69)
* feat: adding test cases for supporting unchained auth usage (#68) ([0a73b49](https://github.com/readmeio/api/commit/0a73b49)), closes [#68](https://github.com/readmeio/api/issues/68)
* style: updating dependabot to follow our commit standards ([b6a29be](https://github.com/readmeio/api/commit/b6a29be))
* ci: changing the dep update frequency to weekly ([285d042](https://github.com/readmeio/api/commit/285d042))
* ci: create Dependabot config file (#56) ([38110a0](https://github.com/readmeio/api/commit/38110a0)), closes [#56](https://github.com/readmeio/api/issues/56)




## <small>2.0.2 (2020-05-30)</small>

* chore(deps-dev): bump eslint from 7.0.0 to 7.1.0 (#48) ([fcd657b](https://github.com/readmeio/api/commit/fcd657b)), closes [#48](https://github.com/readmeio/api/issues/48)
* chore(deps-dev): bump jest from 25.5.4 to 26.0.1 (#46) ([adf39a1](https://github.com/readmeio/api/commit/adf39a1)), closes [#46](https://github.com/readmeio/api/issues/46)
* chore(deps-dev): bump yaml from 1.9.2 to 1.10.0 (#45) ([26d3edd](https://github.com/readmeio/api/commit/26d3edd)), closes [#45](https://github.com/readmeio/api/issues/45)
* chore: moving the repository over to a monorepo directory tree (#51) ([a82fcdd](https://github.com/readmeio/api/commit/a82fcdd)), closes [#51](https://github.com/readmeio/api/issues/51)
* chore: setting the base lerna version to the current version ([063a449](https://github.com/readmeio/api/commit/063a449))
* feat: HTTP Snippet client for Node samples (#52) ([cf72740](https://github.com/readmeio/api/commit/cf72740)), closes [#52](https://github.com/readmeio/api/issues/52)
* docs: updating our CoC enforcement email address ([5609db4](https://github.com/readmeio/api/commit/5609db4))




## <small>2.1.1 (2020-06-17)</small>

* v2.1.1 ([e855892](https://github.com/readmeio/api/commit/e855892))
* fix: snippet paths should not include the server url (#77) ([a812f0b](https://github.com/readmeio/api/commit/a812f0b)), closes [#77](https://github.com/readmeio/api/issues/77)
* chore(deps-dev): bump lerna from 3.22.0 to 3.22.1 (#74) ([7c270c2](https://github.com/readmeio/api/commit/7c270c2)), closes [#74](https://github.com/readmeio/api/issues/74)
* chore(deps): bump @readme/oas-to-har from 6.10.0 to 6.10.2 (#73) ([1b4568c](https://github.com/readmeio/api/commit/1b4568c)), closes [#73](https://github.com/readmeio/api/issues/73)
* chore(deps): bump @readme/oas-tooling from 3.4.3 to 3.4.5 (#75) ([05e5204](https://github.com/readmeio/api/commit/05e5204)), closes [#75](https://github.com/readmeio/api/issues/75)



## 2.1.0 (2020-06-12)

* v2.1.0 ([3802a50](https://github.com/readmeio/api/commit/3802a50))
* fix: relative paths in parent parent directories not being supported (#67) ([dba888b](https://github.com/readmeio/api/commit/dba888b)), closes [#67](https://github.com/readmeio/api/issues/67)
* fix: various code snippet issues and deficiencies (#72) ([c5e4eeb](https://github.com/readmeio/api/commit/c5e4eeb)), closes [#72](https://github.com/readmeio/api/issues/72)
* chore: configuring dependabot to also update our github actions ([e8a90ea](https://github.com/readmeio/api/commit/e8a90ea))
* chore: moving off our httpsnippet fork and to v1.20.x (#64) ([45b0e2a](https://github.com/readmeio/api/commit/45b0e2a)), closes [#64](https://github.com/readmeio/api/issues/64)
* chore(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#57) ([2d4fa96](https://github.com/readmeio/api/commit/2d4fa96)), closes [#57](https://github.com/readmeio/api/issues/57)
* chore(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#63) ([919bdd9](https://github.com/readmeio/api/commit/919bdd9)), closes [#63](https://github.com/readmeio/api/issues/63)
* chore(deps-dev): upgrading @readme/eslint-config to 3.2.0 (#70) ([3b26c2e](https://github.com/readmeio/api/commit/3b26c2e)), closes [#70](https://github.com/readmeio/api/issues/70)
* chore(deps): bump @readme/oas-to-har from 6.9.6 to 6.10.0 (#59) ([9ef271a](https://github.com/readmeio/api/commit/9ef271a)), closes [#59](https://github.com/readmeio/api/issues/59)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#54) ([b58e8e3](https://github.com/readmeio/api/commit/b58e8e3)), closes [#54](https://github.com/readmeio/api/issues/54)
* chore(deps): bump @readme/oas-tooling from 3.4.1 to 3.4.3 (#58) ([f66cae2](https://github.com/readmeio/api/commit/f66cae2)), closes [#58](https://github.com/readmeio/api/issues/58)
* chore(deps): bump actions/checkout from v1 to v2.2.0 (#65) ([47d99e4](https://github.com/readmeio/api/commit/47d99e4)), closes [#65](https://github.com/readmeio/api/issues/65)
* chore(deps): bump actions/setup-node from v1 to v2.0.0 (#66) ([6a46c6c](https://github.com/readmeio/api/commit/6a46c6c)), closes [#66](https://github.com/readmeio/api/issues/66)
* chore(deps): bump fetch-har from 2.3.1 to 2.3.2 (#60) ([1a1ebe7](https://github.com/readmeio/api/commit/1a1ebe7)), closes [#60](https://github.com/readmeio/api/issues/60)
* chore(deps): swapping yaml for js-yaml (#69) ([fc04a9f](https://github.com/readmeio/api/commit/fc04a9f)), closes [#69](https://github.com/readmeio/api/issues/69)
* feat: adding test cases for supporting unchained auth usage (#68) ([0a73b49](https://github.com/readmeio/api/commit/0a73b49)), closes [#68](https://github.com/readmeio/api/issues/68)
* style: updating dependabot to follow our commit standards ([b6a29be](https://github.com/readmeio/api/commit/b6a29be))
* ci: changing the dep update frequency to weekly ([285d042](https://github.com/readmeio/api/commit/285d042))
* ci: create Dependabot config file (#56) ([38110a0](https://github.com/readmeio/api/commit/38110a0)), closes [#56](https://github.com/readmeio/api/issues/56)



## <small>2.0.2 (2020-05-30)</small>

* Bump eslint from 7.0.0 to 7.1.0 (#48) ([fcd657b](https://github.com/readmeio/api/commit/fcd657b)), closes [#48](https://github.com/readmeio/api/issues/48)
* Bump jest from 25.5.4 to 26.0.1 (#46) ([adf39a1](https://github.com/readmeio/api/commit/adf39a1)), closes [#46](https://github.com/readmeio/api/issues/46)
* Bump yaml from 1.9.2 to 1.10.0 (#45) ([26d3edd](https://github.com/readmeio/api/commit/26d3edd)), closes [#45](https://github.com/readmeio/api/issues/45)
* v2.0.2 ([c504232](https://github.com/readmeio/api/commit/c504232))
* chore: moving the repository over to a monorepo directory tree (#51) ([a82fcdd](https://github.com/readmeio/api/commit/a82fcdd)), closes [#51](https://github.com/readmeio/api/issues/51)
* chore: setting the base lerna version to the current version ([063a449](https://github.com/readmeio/api/commit/063a449))
* feat: HTTP Snippet client for Node samples (#52) ([cf72740](https://github.com/readmeio/api/commit/cf72740)), closes [#52](https://github.com/readmeio/api/issues/52)
* docs: updating our CoC enforcement email address ([5609db4](https://github.com/readmeio/api/commit/5609db4))



## <small>2.0.1 (2020-05-26)</small>

* fix(package.main): specify the entry point file (#50) ([05727c4](https://github.com/readmeio/api/commit/05727c4)), closes [#50](https://github.com/readmeio/api/issues/50)



## 2.0.0 (2020-05-21)

**BREAKING:** With the v2 release of `api`, the focus of this module has shifted to automatic generation of API SDKs off of an OpenAPI definition. Check out the project [readme](https://github.com/readmeio/api/blob/master/README.md) for more details.

* docs: adding a changelog and enforcing commit styles (#44) ([cc07150](https://github.com/readmeio/api/commit/cc07150)), closes [#44](https://github.com/readmeio/api/issues/44)
* docs: adding a code of conduct and contribution guide ([f023b41](https://github.com/readmeio/api/commit/f023b41))
* feat: SDK Generation (#28) ([adab436](https://github.com/readmeio/api/commit/adab436)), closes [#28](https://github.com/readmeio/api/issues/28)
* docs: adding a code of conduct and contribution guide ([f023b41](https://github.com/readmeio/api/commit/f023b41))
* chore: pulling over our common pull request template ([609c1ba](https://github.com/readmeio/api/commit/609c1ba))
* chore: relicensing under the MIT license ([5253c44](https://github.com/readmeio/api/commit/5253c44))
* chore: wiping the slate clean for a rewrite (#27) ([a27e006](https://github.com/readmeio/api/commit/a27e006)), closes [#27](https://github.com/readmeio/api/issues/27)
