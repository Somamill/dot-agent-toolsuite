# Work-skill sources and adaptation decisions

Research date: **25 November 2026**. Target: **Windows 11 with Microsoft Copilot and Gemini**, using the capabilities provided by the employer's accounts. The pack contains original, standalone instructions in [skills/work](../skills/work/). It does not require Node, Python, a terminal, a personal API subscription, or a local coding agent on the work PC.

## What was reviewed

The [AgenorIT repository index](https://www.agenorit.com.au/insights/top-github-repositories) was used to identify relevant skill and workflow projects. Relevant repositories and representative files were inspected at the commits below; this is not an audit of every project in its top-100 list. “Official,” “Verified,” and “Community” labels in discovery catalogues are source labels, not evidence of installation, execution, or compatibility in the user's tenant.

The portable files are independently written workflows. No upstream source files, skill text, themes, scripts, hooks, or libraries are redistributed inside the upload packages. Upstream licences are recorded for future maintenance, not used to imply that every file in every repository has the same terms. The toolsuite's own original work remains under its [MIT licence](../LICENSE).

## The four requested repositories

| Upstream and inspected snapshot | Useful part adopted | Work-PC delivery | Runtime boundary |
| --- | --- | --- | --- |
| [Nutlope/hallmark](https://github.com/Nutlope/hallmark/tree/04977e15f3dfd6ee4b74c887dac3eb52665d6c92), MIT | Establish the real task and audience; review hierarchy, readability, accessibility, content credibility, and the actual rendered result. | [design-review](../skills/work/design-review/SKILL.md), alongside [corporate-style](../skills/work/corporate-style/SKILL.md). | Upstream Node/browser checks, theme selection, hooks, and prompt logging are not part of the portable skill. Approved company design takes precedence. |
| [anthropics/skills](https://github.com/anthropics/skills/tree/e4bb5d960d87126ff3b3a8af1a104b7db67560ba), document skills Apache 2.0 | Editable, formula-driven spreadsheet models; explicit assumptions and units; recalculation and error checks; preservation of existing workbook features. | [spreadsheet-modeling](../skills/work/spreadsheet-modeling/SKILL.md), complementing coverage, reconciliation, document, and presentation skills. | The original XLSX workflow assumes Python packages and LibreOffice. The work version uses native Excel or a confirmed host capability and reports unexecuted checks. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem/tree/4dc8e48cddee663edc3e401109f836d11f926a45), Apache 2.0 | Concise, explicit continuity: decisions, evidence, current state, unresolved issues, and next actions. | [project-context](../skills/work/project-context/SKILL.md), a user-controlled handoff in an approved work document. | This does not install the Bun worker, SQLite store, observer, lifecycle hooks, analytics, or automatic cross-session memory. A saved document must be supplied or retrieved in a later session. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes/tree/3865262ba347aaa10eaaec9f9194859570ac664e), Apache 2.0 | Scene structure, pacing, editable content, asset inventory, captions, and evidence-based visual review. | [video-storyboard](../skills/work/video-storyboard/SKILL.md), producing a timed production plan or supported presentation artifact. | The Node/Chrome/FFmpeg rendering engine and usage telemetry are not installed. A storyboard is not an MP4; claim rendering only when a supported tool produces and verifies it. |

Primary files supporting these choices:

- Hallmark: [skill](https://github.com/Nutlope/hallmark/blob/04977e15f3dfd6ee4b74c887dac3eb52665d6c92/skills/hallmark/SKILL.md), [installer](https://github.com/Nutlope/hallmark/blob/04977e15f3dfd6ee4b74c887dac3eb52665d6c92/skills/hallmark/scripts/install.mjs), [licence](https://github.com/Nutlope/hallmark/blob/04977e15f3dfd6ee4b74c887dac3eb52665d6c92/LICENSE).
- Anthropic: [XLSX skill](https://github.com/anthropics/skills/blob/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/xlsx/SKILL.md), [XLSX licence](https://github.com/anthropics/skills/blob/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/xlsx/LICENSE.txt). The inspected DOCX, PDF, and PPTX folders carry the same Apache 2.0 licence text; older descriptions of these document skills as source-available-only are out of date for this snapshot.
- Claude-mem: [README](https://github.com/thedotmack/claude-mem/blob/4dc8e48cddee663edc3e401109f836d11f926a45/README.md), [package manifest](https://github.com/thedotmack/claude-mem/blob/4dc8e48cddee663edc3e401109f836d11f926a45/package.json), [installation docs](https://github.com/thedotmack/claude-mem/blob/4dc8e48cddee663edc3e401109f836d11f926a45/docs/public/installation.mdx).
- HyperFrames: [core skill](https://github.com/heygen-com/hyperframes/blob/3865262ba347aaa10eaaec9f9194859570ac664e/skills/hyperframes/SKILL.md), [CLI skill](https://github.com/heygen-com/hyperframes/blob/3865262ba347aaa10eaaec9f9194859570ac664e/skills/hyperframes-cli/SKILL.md), [plugin guide](https://github.com/heygen-com/hyperframes/blob/3865262ba347aaa10eaaec9f9194859570ac664e/docs/guides/plugins.mdx).

## The highlighted analytical skills

| Source and snapshot | Actual source skill / licence evidence | Adaptation and limits |
| --- | --- | --- |
| [duckdb/duckdb-skills](https://github.com/duckdb/duckdb-skills/tree/44dfbbb414e54187964a2212eae28495f6ae21d9) | [read-file](https://github.com/duckdb/duckdb-skills/blob/44dfbbb414e54187964a2212eae28495f6ae21d9/skills/read-file/SKILL.md) and [query](https://github.com/duckdb/duckdb-skills/blob/44dfbbb414e54187964a2212eae28495f6ae21d9/skills/query/SKILL.md); MIT. | [analytical-sql](../skills/work/analytical-sql/SKILL.md): schema, grain, join cardinality, bounded output, and control totals. Execute only in an available compatible engine; otherwise provide SQL and checks. No assertion that either chat host can process 1–100 GB. Upstream uses Bash/DuckDB CLI and reports incomplete Windows support. |
| [valyuAI/skills](https://github.com/valyuAI/skills/tree/be57c51696fa74a0fce129e3dc165c93c599a0c9) | [valyu-best-practices](https://github.com/valyuAI/skills/blob/be57c51696fa74a0fce129e3dc165c93c599a0c9/valyu-search/valyu-best-practices/SKILL.md); MIT declared in skill/README, no separate licence file verified. | [evidence-research](../skills/work/evidence-research/SKILL.md): claim/source/date/confidence records, primary-source selection, and explicit inference. Use enabled host search or supplied sources; no Valyu SDK, API key, paid-source access, or external API calls are implied. |
| [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill/tree/e198c87d03f1c9811acbff681886fac24baee53d) | Actual [skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill/blob/e198c87d03f1c9811acbff681886fac24baee53d/SKILL.md) name is `d3-viz`; no licence file or licence declaration verified. | [interactive-visualization](../skills/work/interactive-visualization/SKILL.md) is independently written; no upstream text/code is copied. Use native charts, a supported interactive artifact, or a clearly marked specification with a table/static fallback. No D3 installation or network-loaded library is assumed. |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills/tree/c21d13b3cc2894680229ba9959a53281acb9200e) | [statistical-analysis](https://github.com/K-Dense-AI/scientific-agent-skills/blob/c21d13b3cc2894680229ba9959a53281acb9200e/skills/statistical-analysis/SKILL.md), exploratory-data-analysis, scientific-critical-thinking, scientific-visualization; MIT for inspected modules. | [reproducible-analysis](../skills/work/reproducible-analysis/SKILL.md): record data selection, methods, assumptions, uncertainty, and reproduction steps. No Python environment, external figure service, or scientific-database access is installed. The original long statistical skill is condensed into an original workflow that fits the work-host instruction limits. |

The scientific repository was previously named `claude-scientific-skills`. Skills that require tools still require those tools after a Markdown import. Never copy a source workflow's successful execution label into this pack's status.

## Additional candidates from the index

These candidates informed the selection rather than adding a new skill for every repository:

| Reviewed source snapshot | Decision |
| --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7), verification-before-completion | Fold observed-evidence checks into work-tool-routing and every artifact skill; omit terminal-specific requirements. |
| [mattpocock/skills](https://github.com/mattpocock/skills/tree/d65391149dbb5fe76478e76fa8d5122b2aa5a70e), productivity/handoff | Use concise handoffs in project-context with explicit saved/unsaved status. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/tree/e997ac5b9a74eab332d5e9793bb38a38c8cfdd74), documentation-and-adrs | Preserve decisions, alternatives, consequences, and evidence in business-document/project-context. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC/tree/4adeee6732a12d1540f49a4d50a38ce8c97f9a53), market/deep research | Retain research discipline in evidence-research; omit required external search MCPs. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown/tree/ed178952a6672abdfd35b5f9e76a80b6cefc086e) | Use source/extraction coverage checks in document and Excel workflows. It is a Python utility, not a browser-installable skill. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design/tree/1acb8776bab34f5055399fbac96a693c8d5cf7b3) | Apply appropriate visual structure and inspection in presentation/visualization workflows; do not import its large file and renderer dependencies unchanged. |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills/tree/2c606141936f1eeef17fa3043a72095b4765b9c2) | Scope, assumptions, and verifiable outcomes are already covered by work-tool-routing. |

## Keeping the pack maintainable

Maintain the canonical instruction files in GitHub, update this source review when upstream assumptions change, and rebuild the [upload packages](../packages/work-pc/). Package checks verify exact source bytes, valid names, supported text-only structure, and root `SKILL.md`; they do not certify business correctness or successful installation in any account. Follow the [work-PC guide](WORK_PC_SKILLS.md) to import and test the relevant skill in each supported host.
