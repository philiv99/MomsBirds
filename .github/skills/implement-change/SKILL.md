---
name: implement-change
description: 'Implement an approved issue plan in a single repo. Use when editing code for a planned change: edit only the assigned branch/repo, add or update unit and integration tests per the stack profile, run all PROJECT.md test suites, and report changed files and test results.'
---

# Implement a change

Use the issue plan from `plan-issue` to deliver the smallest change and its
tests in a single repo.

## Steps

1. Read the repo's `AGENTS.md` and `PROJECT.md`. Use `PROJECT.md` for the exact
   build, run, and **test commands** — never assume they match another repo.
2. **Read the issue and branch.** Read issue #N and its plan (via the GitHub MCP
   or `gh`). Create a short-lived branch off the repo's **default branch** named
   `<type>/<N>-<slug>` (`feat` / `fix` / `chore` / `docs`), and work only in
   **this** repo. For cross-repo work, land the backward-compatible producer/API
   change first.
3. Make a small, focused edit. Change only what the plan requires; do not
   refactor or touch unrelated code.
4. Add or update both **unit** and **integration** tests per the stack profile
   and the repo's test layout:
   - Unit: business logic / Managers / Models, or reducers / selectors / thunks /
     components — external calls and the database mocked.
   - Integration: controller routes end-to-end against the test database, or
     connected components against a mocked API; assert status/shape (and a CORS
     preflight for the API).
5. Run the unit and integration suites from `PROJECT.md` while you work; fix
   failures as you go.
6. Keep secrets out of source — config comes from git-ignored settings/`.env`
   with a committed `*.example`.
7. **Record the change in release notes.** Add an entry under an *Unreleased*
   heading in the repo's `CHANGELOG*.md` describing what shipped, and note the
   intended semantic version bump (`MAJOR.MINOR.PATCH`). Do **not** bump the
   version file(s) here — that happens at release (`review-release`).
8. **Verify green (local gate).** Run the repo's `verify.ps1` and confirm it is
   **green** — it installs, builds, and runs the unit + integration suites. This
   must pass **before** you commit or push; CI does **not** run `verify.ps1`, so
   this local run is the authoritative gate.
9. **Commit and push.** Make small, reviewable commits with imperative messages
   that reference the issue (`#N`), then push the branch to the remote.
10. **Open a pull request that links the issue.** Open a PR (via the GitHub MCP or
    `gh`) from the branch to the default branch; title it for the outcome and
    write a body that summarizes the change, lists the exact test commands and
    their results, and includes `Closes #N` so the merge closes the issue. Do
    **not** merge, approve, or close the issue — a person merges, and the merge
    closes the linked issue.

## Output

Report the issue addressed, the **branch name** and **pull-request URL**, the
list of changed files, the CHANGELOG entry added, and the **`verify.ps1` result**
(green) plus the exact test commands run. Request human review; do not merge or
deploy.
