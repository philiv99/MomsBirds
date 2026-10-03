# Changelog — MomsBirds (SPA)

All notable changes to the "Mapping Mom's Life List" SPA are recorded here.
This component uses [semantic versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).
The current version is the `version` field in [package.json](package.json).

Each entry records what shipped to production and the paired commit IDs / rollback
choice (see the `review-release` skill).

## Unreleased

- **New feature:** "Versions & Release Notes" modal displays the deployed version of each component (SPA, API, database schema) and release-note history. Accessible via menu; gracefully handles unreachable endpoint. SPA version is compiled into the bundle via webpack DefinePlugin. (MINOR)

## 1.0.0 — 2026-09-27

Initial version.
