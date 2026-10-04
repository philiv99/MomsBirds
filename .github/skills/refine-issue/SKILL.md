---
name: refine-issue
description: 'Groom a GitHub issue until it is ready for plan-issue: a clear single outcome, observable acceptance checks, a named owning repo, and explicit scope. Read and write the issue via the GitHub MCP or gh; do not write code.'
---

# Refine an issue

Bring one issue up to "ready for `plan-issue`" quality. Do not write code or a
plan here — only sharpen the issue.

## Ready checklist

An issue is **ready** when it has:

- [ ] A single, user-visible **Outcome** (not an implementation), small enough
      for one focused change. Oversized issues are split (producer-first for
      cross-repo).
- [ ] A named **owning repo** (one). Cross-repo work is split into linked issues.
- [ ] **Acceptance checks** a reviewer can observe, including that unit and
      integration suites pass.
- [ ] **Out of scope** and any **API-contract / CORS / data** constraints noted.
- [ ] Correct **labels**: a `type`, a priority (`P1` / `P2` / `P3`), and — once
      it meets this checklist — `ready`.

## Steps

1. **Read** the issue and any linked issues/PRs via the GitHub MCP or `gh`.
2. **Edit the issue body** to satisfy the ready checklist, keeping the
   feature-template structure. Ask the product owner only about genuine
   ambiguities (behavioral choices, scope boundaries).
3. **Split if needed.** If it spans repos or is too big, create the linked issues
   (see `create-issue`) and reduce this one to a single slice.
4. **Mark it `ready`** when the checklist passes.

## Output

The refined issue (updated body), the label changes, any issues split off, and
the readiness verdict. Hand off with: "Run `plan-issue` on issue #N."
