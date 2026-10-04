---
name: prioritize-backlog
description: 'Triage a repo backlog of open GitHub issues and rank them with priority labels (P1/P2/P3). Read and write issue labels via the GitHub MCP or gh; do not write code.'
---

# Prioritize the backlog

Triage a single repo's open issues into a ranked, labeled backlog so the next
piece of work is obvious. Do not write code here.

## Label convention

- **Priority** (exactly one per issue): `P1` (do first), `P2`, `P3` (lowest).
- **Type:** `enhancement`, `bug`, `documentation`.
- **Status:** `ready` (groomed for `plan-issue`), `in-progress`, `blocked`. Omit
  status on raw/untriaged issues.

See agentic's `issue-process.md` for the full convention and board columns, and
create the labels in a repo with agentic's `scripts/setup-labels.ps1`.

## Steps

1. **List open issues** for the repo via the GitHub MCP or `gh issue list`.
2. **Assign exactly one priority** label to each by value and urgency: `P1`
   unblocks or ships the most important outcome (a producer/API issue that gates
   a consumer is usually `P1`); `P3` is nice-to-have. Keep cross-repo pairs
   consistent — the producer is at least as high as its consumer.
3. **Confirm type and status.** Mark clearly groomed issues `ready`; flag
   `blocked` ones with a one-line reason in a comment.
4. **Report the ranked order** — the top `P1`s are the next work.

## Output

The ranked list (number, title, priority, status), the label changes made, and a
recommended next action (usually "Run `refine-issue` on #N", then "Run
`plan-issue` on #N").
