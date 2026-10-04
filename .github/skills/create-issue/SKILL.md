---
name: create-issue
description: 'Capture a one-line outcome as a well-formed GitHub issue in the owning repo using the feature-template fields. Split cross-repo outcomes into linked, producer-first issues. Read and write issues via the GitHub MCP or gh; do not write code.'
---

# Create an issue

Turn a raw idea or one-line outcome into a well-formed GitHub issue on the
**owning repo's** own tracker. One issue = one outcome. Do not write code here.

## Steps

1. **Clarify the outcome.** Restate it as a user-visible result ("who can now do
   what"), not an implementation. If it is too big for one small change, note the
   smaller slices.
2. **Pick the owning repo(s).** Choose the single repo that owns the change. If
   it spans repos, split it **producer/API-first**: one issue per repo, the
   backward-compatible producer issue first and the consumer issue second. Each
   issue lives on its **own** repo's tracker.
3. **Fill the feature-template fields** (`.github/ISSUE_TEMPLATE/feature.md`):
   Outcome, Owning repo(s), Acceptance checks (observable "done" conditions),
   Out of scope, Notes / constraints (API-contract, CORS, data, design), and the
   release checklist. If it touches a shared API contract that multiple consumers
   read, say so — that contract is defined once.
4. **Create the issue(s)** on the owning repo via the GitHub MCP or
   `gh issue create`. Apply a `type` label now (`enhancement` / `bug` /
   `documentation`); the priority label is set during triage (`prioritize-backlog`).
   See the label convention in agentic's `issue-process.md` and create it in a
   repo with agentic's `scripts/setup-labels.ps1`.
5. **Link cross-repo pairs.** In each issue body, reference its partner with the
   fully-qualified `owner/repo#N` form and mark which lands first. Add a comment
   on the producer issue pointing to the consumer.

## Output

The created issue number(s) and URL(s), the owning repo(s), the labels applied,
and — for a cross-repo outcome — the producer-first order and the links between
the paired issues. Hand off with: "Run `prioritize-backlog`" or "Run `plan-issue`
on issue #N."
