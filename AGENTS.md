# dot-agent-toolsuite

This public repository is a living field guide. Read PRODUCT.md and DESIGN.md before editing. Run `npm test` and `npm run build`; inspect desktop and mobile renders for UI changes. Preserve the static, dependency-free architecture unless a real requirement needs more.

## Record, learn, publish

For a supported tool run, use `node /path/to/dot-agent-toolsuite/scripts/run-tool.mjs <tool-id> -- <command> [args...]`. It records an allowlisted receipt without recording the command arguments, output, working directory, project name or credentials. A passed receipt means the process exited successfully, not that every capability is verified.

If an agent tool cannot run through that wrapper, append its outcome with `node scripts/record.mjs <tool-id> <kind> <passed|failed>`. Do not invent coverage. Unsupported or unrecorded calls remain outside the log. Review useful new lessons in data/lessons.json rather than turning raw output into public prose.

At task completion, run `npm run sync:kit`, tests/build, and `npm run publish:learning` when authenticated publication is available. After changing the approved dot-kit requirements, run that same sync/publication path. The publisher merges safe receipt IDs and source provenance; it publishes only data/activity.jsonl and data/kit.json. It never publishes arbitrary working-tree files. Keep pending records locally on failure and report the pending publication.

For this Mac, use the existing approved non-graphical GitHub wrapper in the ignored .toolsuite-local.json. Never commit that local config, a token, private key, raw logs or personal paths. Do not enable GitHub Actions, add a poller, expand credentials, or restart a paused service.

These instructions cover participating agents and the provided wrapper. There is no universal tool interception or instant cross-repository webhook. Source freshness updates at agent/task boundaries and explicit syncs; state that limitation honestly.
