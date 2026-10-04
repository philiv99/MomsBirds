# Agent rules (shared)

These common rules are **synced from the `agentic` repo** — do not edit them in
place. Change them in `agentic/templates/AGENTS.md`, re-run the sync, and commit
the refreshed copy here. The synced revision is recorded in `.agentic-version`.

## Always start here

1. **Read `PROJECT.md` first.** It holds this repo's stack, build/run/deploy
   commands, hosts, paths, URLs, database, ports, credential locations, and test
   commands. Never assume two repos share build or deploy commands — different
   stacks build and deploy differently.
2. **Work from one issue and one named repo.** Do not span repositories in a
   single change. For cross-repo work, make the API change backward-compatible
   first and land it before the consumer change.

## Make the change

3. **Make a small, focused change** on a branch for this repo (see *Branch,
   commit, and pull request*). Edit only what the issue requires. Do not
   refactor, rename, or "improve" unrelated code.
4. **Ship tests with behavior.** Any new or changed behavior ships with tests.
   Add or update both **unit** and **integration** tests per this repo's stack
   profile and test layout (see `PROJECT.md`).
5. **Run this repo's full test suites** using the commands in `PROJECT.md`. Both
   unit and integration suites must pass locally. A failing or missing test
   blocks the change.

## Branch, commit, and pull request

6. **Branch per issue.** Before editing, create a short-lived branch off the
   repo's **default branch**, named `<type>/<issue-number>-<slug>` (type =
   `feat`, `fix`, `chore`, or `docs`). Never commit the change directly to the
   default branch.
7. **Commit and push.** Make small, reviewable commits with imperative messages
   that reference the issue (`#<n>`); keep unrelated changes out. Push the branch
   to the remote.
8. **Open a linked pull request; never merge it yourself.** Open a pull request
   (via the GitHub MCP or `gh`) from the branch to the default branch, with a
   clear title and a body that summarizes the change, lists the tests run, and
   includes `Closes #<n>` so merging closes the issue. Keep it a **draft** until
   the repo's checks pass, then mark it ready for review. A person reviews,
   approves, and merges — do **not** merge, approve, close the issue, or deploy.
   (`Closes` affects only issues in the pull request's own repo; for a cross-repo
   pair, each repo's pull request closes its own issue.)

## Secrets and configuration

9. **No credentials in source, ever.** Secrets come from git-ignored settings
   files or the shell environment at deploy time, with a committed `*.example`
   template. Committed config files carry no credentials. If a secret was ever
   committed, flag it for rotation at its source.
10. **Keep detailed error output off in production** and respect each stack's
    configuration model (config-source connection strings, prod XDT transforms,
    dev/prod config module switching).

## Finish

11. **Summarize evidence**: the issue addressed, the **branch name** and
    **pull-request URL**, files changed, and unit + integration test results
    (commands run and their outcome).
12. **Request human review before release.** CI builds each repo independently
    and runs its suites; a **person** decides merges and merges the pull request,
    which closes the linked issue. Deployment stays in the human-run scripts — do
    not deploy from an agent or from CI.
13. **Two environments only**: development (local) and production. There is no
    staging environment. Before a production release, verify the local SPA
    against the local API, then approve the production deploy separately and
    record the paired commit IDs and rollback choice.
