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

<!-- Name the repo(s) you believe this change belongs to. If it spans repos, say
so — the plan will split it and land the backward-compatible producer/API change
first. -->

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
- [ ] Version bumped where it applies — the version file(s) for this repo's stack
      (see `PROJECT.md`; e.g. `package.json`, a `VERSION` file, or a
      schema-version row).
- [ ] Paired commit IDs and rollback choice recorded (`review-release`).
