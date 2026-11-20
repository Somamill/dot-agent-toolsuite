# How this journal grows

## What we record

The public activity log is append-only JSONL. Each event has exactly five fields: a random ID, a date, an allowlisted tool ID, an operation kind and a passed/failed outcome. The schema rejects extra fields. We do not store arguments, output, source code, project/repository names, personal paths, credentials or precise timestamps.

A passed receipt means a command completed successfully. It does not automatically promote a catalog entry to “Verified.” That requires a reviewed explanation of the operation that passed and the limits of its evidence. The learning path is manually reviewed prose in data/lessons.json.

## When it updates

1. Run supported commands through scripts/run-tool.mjs. Native connector/MCP operations can be recorded explicitly with scripts/record.mjs when an agent has observed the result.
2. Review meaningful new lessons, failures and changed assumptions. Do not fabricate a receipt for an unobserved result or backfill unknown historical counts.
3. At task completion, sync the approved dot-kit source, run tests/build, and publish the safe data.
4. After an approved dot-kit requirements change, the publishing agent runs the same sync/publication path. All six source files are checked against the versioned SHA-256 manifest.

The local Mac validator can use this wrapper for its Gitleaks and Ruff subprocesses when this repository is installed. Other agents must follow the shared instructions or adopt the wrapper. The journal cannot guarantee capture from unrelated agents, uninstrumented calls or machines where it is not installed.

## Public publication

The publisher uses an existing authenticated GitHub CLI route. It merges remote and local receipt IDs, rejects conflicting events, preserves unrelated repository files, and uses a non-forced branch update. Concurrent branch changes are retried up to three times. Branch protections and authentication failures are reported; they are never bypassed. Local data is preserved on failure.

Only data/activity.jsonl and data/kit.json can be sent by this command. Contributions to tool evidence, prose or code use the normal reviewed source workflow. The contents API is suitable for a small journal; shard/archive the activity log before its API size limit becomes a constraint. There is no new scheduler, external telemetry system or GitHub Actions workflow.

## Source freshness

The site shows the last verified kit revision and check date, not a promise of real-time synchronization. Run `npm run sync:kit` at the start/end of relevant agent tasks. Without an always-on event receiver, updates made outside participating agent workflows appear on the next sync. A failed or offline sync must be reported as pending.
