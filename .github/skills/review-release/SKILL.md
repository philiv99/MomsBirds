---
name: review-release
description: 'Review a pull request against its acceptance checks and prepare a production release record. Use when reviewing a PR or coordinating a release: confirm unit and integration tests pass, verify the SPA reads live API data, and record the paired deployed commit IDs and rollback choice. Read-only.'
---

# Review and release

Compare the pull request to the issue's acceptance checks and prepare the
release record. Read-only — a person decides merges and approves deploys.

## Review

1. Read the issue, its plan, the **pull request**, and the repo's `AGENTS.md` /
   `PROJECT.md`.
2. Confirm the diff matches the plan's scope and nothing unrelated changed.
3. Confirm **API compatibility**: routes, request/response shape, and CORS
   origins; any breaking change is backward compatible and the producer landed
   first.
4. Confirm both **unit and integration** tests were added/updated and **pass** —
   the author ran the repo's `verify.ps1` green locally (there is no CI verify to
   confirm it, so check the pull request records the verify result).
5. Confirm configuration follows the stack model, production error detail is
   off, **no credentials** appear in the diff or committed config, and the pull
   request **links its issue** with `Closes #<n>`.

## Merge (a person decides)

6. A **person** approves and merges the pull request — the agent never merges,
   approves, or closes the issue. Merging the pull request (which carries
   `Closes #<n>`) **closes the linked issue** automatically; confirm the issue
   closed and delete the merged branch. For a cross-repo pair, each repo's pull
   request closes its own issue.

## Release (production only — no staging)

7. Verify the pair locally first: the **local** SPA reads live data from the
   **local** API with the configured local CORS origin.
8. **Finalize release notes and version.** Promote the `CHANGELOG*.md`
   *Unreleased* entry to a dated, versioned heading, and bump the version file(s)
   for this repo's stack as recorded in `PROJECT.md` (for example `package.json`
   for a web app, a `VERSION` file for an API, or a schema-version row and
   database changelog for a schema change). A release without an updated
   changelog/version is a blocker.
9. Deploy each merged component to production by its own human-run script, then
   run the API smoke test and a browser check.
10. **Record** the paired API and SPA commit IDs and the rollback choice in the
    linked issue or pull request.

## Output

A short verdict per review area (pass / concern / blocker), confirmation that the
pull request merged and its issue closed, and the release record: the finalized
version(s), two commit IDs, and the rollback choice.
