---
name: Feature / change request
about: Propose one user-visible outcome for the agentic workflow to plan and deliver.
title: ''
labels: ''
assignees: ''
---

<!--
One issue = one outcome. Keep it small. If it spans repos, the plan-issue step
will split it into linked issues (API/producer first). You do not need to
specify tests, branch names, or file paths — the plan derives those from each
repo's PROJECT.md.
-->

## Outcome

<!-- 1–2 sentences: who benefits and what they can now do. Describe the outcome,
not the implementation. -->

## Owning repo(s)

<!-- Your best guess: MomsBirds, api.infogoer.com, or both. If both, say so —
the plan will land the backward-compatible API/producer change first. -->

## Acceptance checks

<!-- Observable "done" conditions a reviewer can confirm. -->

- [ ]
- [ ]

## Out of scope

<!-- Anything you explicitly do NOT want touched. -->

## Notes / constraints

<!-- API-contract, CORS, data, or design constraints you already know.
If this touches a shared API contract (an endpoint multiple SPAs will read),
say so — the contract is defined once. -->

## Release checklist (filled at ship time, not now)

- [ ] `CHANGELOG*.md` entry added for what shipped.
- [ ] Version bumped where it applies (`package.json` / `VERSION` /
      `schema_version.sql`).
- [ ] Paired commit IDs and rollback choice recorded (`review-release`).
