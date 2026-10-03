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

3. **Make a small, focused change** on a branch for this repo. Edit only what the
   issue requires. Do not refactor, rename, or "improve" unrelated code.
4. **Ship tests with behavior.** Any new or changed behavior ships with tests.
   Add or update both **unit** and **integration** tests per this repo's stack
   profile and test layout (see `PROJECT.md`).
5. **Run this repo's full test suites** using the commands in `PROJECT.md`. Both
   unit and integration suites must pass locally. A failing or missing test
   blocks the change.

## Secrets and configuration

6. **No credentials in source, ever.** Secrets come from git-ignored settings
   files or the shell environment at deploy time, with a committed `*.example`
   template. Committed config files carry no credentials. If a secret was ever
   committed, flag it for rotation at its source.
7. **Keep detailed error output off in production** and respect each stack's
   configuration model (config-source connection strings, prod XDT transforms,
   dev/prod config module switching).

## Finish

8. **Summarize evidence**: the issue addressed, files changed, and unit +
   integration test results (commands run and their outcome).
9. **Request human review before release.** CI builds each repo independently and
   runs its suites; a person decides merges. Deployment stays in the human-run
   scripts — do not deploy from an agent or from CI.
10. **Two environments only**: development (local) and production. There is no
    staging environment. Before a production release, verify the local SPA
    against the local API, then approve the production deploy separately and
    record the paired commit IDs and rollback choice.
