# dot-agent-toolsuite

This public repository is a living field guide. Read PRODUCT.md and DESIGN.md before editing. Run `npm test` and `npm run build`; inspect desktop and mobile renders for UI changes. Preserve the static, dependency-free architecture unless a real requirement needs more.

## Work-PC skills

Maintain the canonical portable instructions under `skills/work/` and the individual upload packages under `packages/work-pc/`. The target is a Windows 11 work PC using Copilot and Gemini; a user must not need a local coding agent, terminal, package installer, API key, or additional service to use these instructions. Use only capabilities already available in the selected host and state when a requested operation could not be executed.

After changing work skills, their catalog, or packaging code, run `npm run skills:check`, `npm run skills:package`, and `npm run skills:verify` as well as tests/build. Commit the regenerated per-skill ZIPs and manifest with the source change. Keep one root `SKILL.md` per ZIP and no dependencies on sibling skills. The standalone-text profile intentionally excludes scripts, private templates, and extra files. Review upstream sources and licences before changing that policy.

Keep employer data, internal guides, assets, credentials, and user-specific work outputs out of this public repository. Record researched source snapshots and adaptation limits in `docs/SKILL_SOURCES.md`. Update `docs/WORK_PC_SKILLS.md` when verified import paths change. Package checks establish file integrity, not successful tenant installation or real task behavior. GitHub is the source of truth; imported copies do not automatically update.

## Record, learn, publish

For a supported tool run, use `node /path/to/dot-agent-toolsuite/scripts/run-tool.mjs <tool-id> -- <command> [args...]`. It records an allowlisted receipt without recording the command arguments, output, working directory, project name or credentials. A passed receipt means the process exited successfully, not that every capability is verified.

If an agent tool cannot run through that wrapper, append its outcome with `node scripts/record.mjs <tool-id> <kind> <passed|failed>`. Do not invent coverage. Unsupported or unrecorded calls remain outside the log. Review useful new lessons in data/lessons.json rather than turning raw output into public prose.

At task completion, run `npm run sync:kit`, tests/build, and `npm run publish:learning` when authenticated publication is available. After changing the approved dot-kit requirements, run that same sync/publication path. The publisher merges safe receipt IDs and source provenance; it publishes only data/activity.jsonl and data/kit.json. It never publishes arbitrary working-tree files. Keep pending records locally on failure and report the pending publication.

For this Mac, use the existing approved non-graphical GitHub wrapper in the ignored .toolsuite-local.json. Never commit that local config, a token, private key, raw logs or personal paths. Do not enable GitHub Actions, add a poller, expand credentials, or restart a paused service.

These instructions cover participating agents and the provided wrapper. There is no universal tool interception or instant cross-repository webhook. Source freshness updates at agent/task boundaries and explicit syncs; state that limitation honestly.
