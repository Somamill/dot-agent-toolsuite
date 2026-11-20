# dot. agent toolsuite

[![Tool guide: Open](https://img.shields.io/badge/Tool%20guide-Open-26374D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Somamill/dot-agent-toolsuite/blob/main/docs/LEARNING.md) [![Reddit: dot. apps](https://img.shields.io/badge/Reddit-dot.%20apps-AD3000?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/user/dot-app/)

[Tool guide](https://github.com/Somamill/dot-agent-toolsuite/blob/main/docs/LEARNING.md) | [Reddit](https://www.reddit.com/user/dot-app/) | [Contact](#contact)

**An experience-led, growing library of agent tools.**

![The agent toolsuite field guide](docs/preview.png)

We curate and rate tools from hands-on app-development experience, with a growing record of what works and where it stops. The goal is a shorter path from a request to an inspected result—not a larger list of installed software.

Ratings distinguish **Essential**, **Specialist** and **Optional** tools within their relevant workflows. They are editorial recommendations, not numerical benchmarks. Separately, the catalog distinguishes **Verified** (a specific operation passed), **Installed** (available, without a completed workflow claim) and **Evaluated** (researched, not installed/tested here). Open each tool's evidence and limits. Native platform tools are identified alongside the open-source tooling.

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
