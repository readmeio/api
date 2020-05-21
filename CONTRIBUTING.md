Contributing
===

<img align="right" width="25%" style="margin-bottom: 2em" src="https://owlbert.io/images/owlberts-png/Waiter.psd.png">

### Commit Conventions

When pushing or merging PRs in to master, your commit messages should follow the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). At it's simplest, this looks something like `{type}: change this, add that`, where the commit `{type}` can be one of the following:

| Commit Type | Description |
| :--- | :--- |
| `build` | creating a new release |
| `chore` | assorted minor changes |
| `ci` | updates related to the ci process |
| `docs` | documentation updates |
| `feat` | new elements; major features and updates |
| `fix` | bug fixes; security updates |
| `perf` | performance improvements |
| `refactor` | general refactors |
| `revert` | reverting a previous commit |
| `style` | aesthetic changes |
| `test` | adding or updating existing tests |

You can also optionally note the `{scope}` of your changes in an additional parenthetical. If your changes require a longer description, feel free to add a commit message with further details! Combining all of these together, you might end up with something like:

```text
feat(auth): add support for cookie auth

- some more details
- about the changes
```
