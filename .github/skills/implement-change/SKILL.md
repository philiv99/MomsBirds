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
2. Work on the branch for **this** repo only. For cross-repo work, land the
   backward-compatible API change first.
3. Make a small, focused edit. Change only what the plan requires; do not
   refactor or touch unrelated code.
4. Add or update both **unit** and **integration** tests per the stack profile
   and the repo's test layout:
   - Unit: business logic / Managers / Models, or reducers / selectors / thunks /
     components — external calls and the database mocked.
   - Integration: controller routes end-to-end against the test database, or
     connected components against a mocked API; assert status/shape (and a CORS
     preflight for the API).
5. Run **all** test suites from `PROJECT.md`. Both unit and integration must
   pass. Fix failures before finishing.
6. Keep secrets out of source — config comes from git-ignored settings/`.env`
   with a committed `*.example`.
7. **Record the change in release notes.** Add an entry under an *Unreleased*
   heading in the repo's `CHANGELOG*.md` describing what shipped, and note the
   intended semantic version bump (`MAJOR.MINOR.PATCH`). Do **not** bump the
   version file(s) here — that happens at release (`review-release`).

## Output

Report the issue addressed, the list of changed files, the CHANGELOG entry
added, and the exact test commands run with their results. Request human
review; do not deploy.
