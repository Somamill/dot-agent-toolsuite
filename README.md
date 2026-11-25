# dot. agent toolsuite

[![Tool guide: Open](https://img.shields.io/badge/Tool%20guide-Open-26374D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Somamill/dot-agent-toolsuite/blob/main/docs/LEARNING.md) [![Reddit: dot. apps](https://img.shields.io/badge/Reddit-dot.%20apps-AD3000?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/user/dot-app/)

[Tool guide](https://github.com/Somamill/dot-agent-toolsuite/blob/main/docs/LEARNING.md) | [Reddit](https://www.reddit.com/user/dot-app/) | [Contact](#contact)

**An experience-led, growing library of agent tools.**

![The agent toolsuite field guide](docs/preview.png)

We curate and rate tools from hands-on app-development experience, with a growing record of what works and where it stops. The goal is a shorter path from a request to an inspected result—not a larger list of installed software.

Ratings distinguish **Essential**, **Specialist** and **Optional** tools within their relevant workflows. They are editorial recommendations, not numerical benchmarks. Separately, the catalog distinguishes **Verified** (a specific operation passed), **Installed** (available, without a completed workflow claim) and **Evaluated** (researched, not installed/tested here). Open each tool's evidence and limits. Native platform tools are identified alongside the open-source tooling.

## Finance skills

The expanded [Finance skills library](https://github.com/Somamill/dot-agent-toolsuite/tree/finance-skills) provides **24 finance workflows** with separate Copilot and Gemini editions, 48 individual import packages, a dot-styled catalogue, and optional Windows/Python tools. It adds Power Query ETL, SharePoint evidence, account mapping, close controls, cash/working-capital analysis, scenario planning, document extraction and process diagrams.

Start with the [finance setup and catalogue](https://github.com/Somamill/dot-agent-toolsuite/blob/finance-skills/README.md), review the [validation record](https://github.com/Somamill/dot-agent-toolsuite/blob/finance-skills/docs/VALIDATION.md), or follow the [maintenance workflow](https://github.com/Somamill/dot-agent-toolsuite/blob/finance-skills/docs/UPDATES.md). The complete finance project is published on the `finance-skills` branch; the toolsuite below remains available on `main`.

## Work skills for Copilot and Gemini

Use the [Windows 11 work-PC guide](docs/WORK_PC_SKILLS.md) for **16 standalone skills** that import into supported Microsoft 365 Copilot and Gemini skill interfaces. Each has its own `SKILL.md`; the [ready-to-upload packages](packages/work-pc/) contain exactly one skill per ZIP. No developer software or package installation is needed on the work PC.

The pack covers Excel data checks, headcount/FTE reconciliation, forecast bridges, spreadsheet models, Power BI/DAX, management presentations, business documents, corporate style, SQL planning, evidence-based research, reproducible analysis, design review, project handoffs, interactive visualizations, and video storyboards. [Browse the source catalog](skills/work/catalog.json) or [review the upstream research and adaptation decisions](docs/SKILL_SOURCES.md).

Instructions use the capabilities actually available in the selected host. Importing them does not install a renderer, enable a connector, or guarantee access to a workbook or model. Company data and approved templates remain in the employer's environment. This repository contains generic procedures and synthetic validation examples.

GitHub is the source of truth. Update the source, rebuild the per-skill packages, then replace the deployed copy in the work account. Changes here do not automatically update installed skills. Maintainer checks run locally with the repository's existing Node/Python requirements:

```sh
npm run skills:check
npm run skills:package
npm run skills:verify
npm test
npm run build
```

Package verification checks source hashes and archive contents. Successful import and execution in a company account must be checked in that account; they are not implied by a passing build. No GitHub Actions workflow is required.

## Explore locally

Requires Node.js 22+ and Python 3. No npm dependencies, account, API key or paid service is required to browse the guide.

```sh
npm test
npm run dev
```

Open `http://localhost:4173`. `npm run build` writes a portable static site to `dist/`. The site does not run tools, collect analytics or contact third-party services in the browser. Fonts are self-hosted.

## Start with the work

| Work | Start here |
| --- | --- |
| Native Apple app | MobileBuildMCP/native CLI for builds; Xcode MCP for relevant editor capabilities |
| Web interface | Isolated headless Playwright; Chrome DevTools for console/network/performance |
| Source safety | Gitleaks with fully redacted logs; targeted Ruff checks on changed Python |
| Creative asset | Blender for scripted 3D, HyperFrames for motion graphics, FFmpeg/ImageMagick/resvg for exports |
| GitHub or Store work | Approved connectors or background credential wrappers; existing authorization still applies |

## A growing learning path

See [how the journal grows](docs/LEARNING.md). Supported CLI runs can be recorded without their arguments, output, working directory or project name:

```sh
node scripts/run-tool.mjs gitleaks -- gitleaks dir --redact=100 .
node scripts/run-tool.mjs ruff -- ruff check --no-fix changed.py
npm run sync:kit
```

`npm run publish:learning` merges safe records and verified kit provenance into this repository using existing authorized GitHub access. It publishes only two fixed data files. Use a fork and update package.json's repository URL if publishing your own journal. On the owner's Mac, ignored local configuration selects the existing non-graphical credential wrapper. No credential is included in this repository.

This is task-driven synchronization, not a universal interceptor, webhook or always-on service. Participating agents record tool use, review new lessons and publish at task completion. Agents updating dot-kit requirements refresh the journal as part of that task. Unsupported calls remain outside coverage, and failed publication stays pending locally. GitHub API rate limits still apply.

## Contribute evidence

Open a [tool finding](https://github.com/Somamill/dot-agent-toolsuite/issues/new?template=tool-finding.yml). Include the task, supported environment, exact scope of the test and a limitation. Do not include tokens, private source, personal paths, private screenshots or raw logs. A process exit code is not a claim of app correctness, security or production quality.

Original code and writing: MIT. Font licenses and the visual reference are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). This project is not affiliated with Solid or the cataloged vendors.

Questions, ideas or bug reports? [Write to max@miller-max.com](mailto:max@miller-max.com?subject=Agent%20toolsuite%20feedback). The link opens a draft in your mail app; you choose what to send.

[Support Max on Ko-fi](https://ko-fi.com/somamill)
