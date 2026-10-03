---
name: plan-issue
description: 'Turn a GitHub issue into an executable plan. Use when starting work on an issue to identify the owning repo, API contract impact, the unit and integration tests to add or update, acceptance checks, and the smallest deliverable. Read-only planning; do not edit code.'
---

# Plan an issue

Given issue #N, produce a short plan before any code is written.

## Steps

1. Read the issue in full, plus any linked issues or pull requests.
2. Read the owning repo's `AGENTS.md` and `PROJECT.md` for the stack,
   build/run/deploy commands, routes, database, and test commands.
3. Identify the **owning repo**. If more than one repo is affected, mark the
   API/producer repo and require its change to be backward-compatible and landed
   first.
4. Determine the **API contract** touched: routes, request/response shape, and
   CORS origins. Note any breaking change. If the change adds an endpoint that
   **multiple SPAs** will read (a shared/meta endpoint), define its shape once
   and record it in the API repo's `PROJECT.md` so every consumer reads it the
   same way.
5. List the **tests to add or update** — the specific unit tests (business
   logic, reducers/selectors/thunks, components) and integration tests
   (controller routes against the test database; connected components against a
   mocked API), following the repo's test layout.
6. Define **acceptance checks** — observable "done" conditions, including that
   both unit and integration suites pass.
7. State the **smallest deliverable** and a short ordered implementation
   sequence.

## Output

The seven items above as a concise plan. Do not write code.
