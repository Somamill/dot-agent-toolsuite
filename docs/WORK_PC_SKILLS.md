# Use skills at work on Windows 11

**Download one skill ZIP, then import it through Copilot or Gemini. No developer software is needed on the work PC.** This pack contains 16 original, self-contained workflows for business analysis, documents, design, and project work.

Research checked **25 November 2026**. Use your company-approved account and the files and connections available to that account.

## Quick start

1. Open [`packages/work-pc/`](../packages/work-pc/) on GitHub. Select a skill ZIP, then use GitHub's **Download raw file** button to save it to the work PC.
2. Choose the matching installation route below:
   - **Copilot Chat:** Agents → More agents → Add dropdown → Upload skill.
   - **Gemini:** Customize → Skills → Create → Upload.
   - **Excel or PowerPoint:** use that app's own skill-management route below.
3. Upload **one individual skill ZIP** and review its instructions. Each ZIP contains a file named exactly **`SKILL.md`** at its root.
4. Select the skill explicitly and try a small task whose result you can check.
5. Add other skills as needed. Company templates and task data remain separate inputs.

Microsoft and Google document native skill imports. Importing a file into a chat as an attachment is different from installing it through the skill-management interface. [Copilot Chat](https://learn.microsoft.com/en-us/plugins/build-copilot-chat-skills); [Gemini skill transfer](https://support.google.com/gemini/answer/18977944?hl=en).

The GitHub repository ZIP contains the whole project. **Do not upload it as a skill**, or upload a ZIP containing other ZIPs. Use the individual packages linked below.

## Choose a skill

The maintained source files are in [`skills/work/`](../skills/work/). All use YAML `name` and `description`, followed by Markdown instructions. Each can be used independently.

### Core workflows

| Skill | What it helps you do | Download |
| --- | --- | --- |
| [`work-tool-routing`](../skills/work/work-tool-routing/SKILL.md) | Choose available tools and distinguish proposed work, completed actions, and verified results. | [ZIP](../packages/work-pc/work-tool-routing.zip) |
| [`excel-data-coverage`](../skills/work/excel-data-coverage/SKILL.md) | Check workbook scope, data grain, filters, missing values, and analysis limitations. | [ZIP](../packages/work-pc/excel-data-coverage.zip) |
| [`workforce-reconciliation`](../skills/work/workforce-reconciliation/SKILL.md) | Reconcile headcount and FTE across supplied sources, with matching rules and exceptions. | [ZIP](../packages/work-pc/workforce-reconciliation.zip) |
| [`forecast-variance`](../skills/work/forecast-variance/SKILL.md) | Explain actual-versus-plan changes and forecasts using traceable units, assumptions, and drivers. | [ZIP](../packages/work-pc/forecast-variance.zip) |
| [`power-bi-analysis`](../skills/work/power-bi-analysis/SKILL.md) | Review supplied model details, DAX, filter context, and reconciliation evidence. | [ZIP](../packages/work-pc/power-bi-analysis.zip) |
| [`management-presentation`](../skills/work/management-presentation/SKILL.md) | Turn supported findings into a management deck with an explicit decision or action. | [ZIP](../packages/work-pc/management-presentation.zip) |
| [`business-document`](../skills/work/business-document/SKILL.md) | Produce a structured business document from supplied evidence. | [ZIP](../packages/work-pc/business-document.zip) |
| [`corporate-style`](../skills/work/corporate-style/SKILL.md) | Apply the supplied company template and style rules consistently. | [ZIP](../packages/work-pc/corporate-style.zip) |

### Extended workflows

| Skill | What it helps you do | Download |
| --- | --- | --- |
| [`spreadsheet-modeling`](../skills/work/spreadsheet-modeling/SKILL.md) | Design transparent spreadsheet models with assumptions, formulas, and reconciliation checks. | [ZIP](../packages/work-pc/spreadsheet-modeling.zip) |
| [`analytical-sql`](../skills/work/analytical-sql/SKILL.md) | Plan and review SQL against supplied schemas, with bounded results and explicit execution status. | [ZIP](../packages/work-pc/analytical-sql.zip) |
| [`evidence-research`](../skills/work/evidence-research/SKILL.md) | Build a sourced research answer that separates evidence, uncertainty, and recommendations. | [ZIP](../packages/work-pc/evidence-research.zip) |
| [`reproducible-analysis`](../skills/work/reproducible-analysis/SKILL.md) | Document inputs, transformations, assumptions, and checks so an analysis can be reviewed or repeated. | [ZIP](../packages/work-pc/reproducible-analysis.zip) |
| [`design-review`](../skills/work/design-review/SKILL.md) | Review a supplied design or document for clarity, hierarchy, consistency, and accessibility. | [ZIP](../packages/work-pc/design-review.zip) |
| [`project-context`](../skills/work/project-context/SKILL.md) | Prepare a project handoff or context note with decisions, source links, open questions, and next steps. | [ZIP](../packages/work-pc/project-context.zip) |
| [`video-storyboard`](../skills/work/video-storyboard/SKILL.md) | Plan a video's purpose, scenes, narration, timing, and production requirements. | [ZIP](../packages/work-pc/video-storyboard.zip) |
| [`interactive-visualization`](../skills/work/interactive-visualization/SKILL.md) | Specify or create a data visualization with clear interactions, accessible alternatives, and validation. | [ZIP](../packages/work-pc/interactive-visualization.zip) |

For headcount work, start with `excel-data-coverage`, `workforce-reconciliation`, and `forecast-variance`. Add `management-presentation` and `corporate-style` when preparing the management output.

A skill name does not establish access to the named service. For example, `power-bi-analysis` can review a supplied measure or model description without a Power BI connection. A storyboard does not render a video, and a visualization specification does not prove that an interactive artifact runs.

## Install in Microsoft 365 Copilot Chat

1. Open Copilot Chat and select **Agents → More agents**.
2. Open the dropdown beside **Add**, then select **Upload skill**.
3. Upload one individual ZIP, or its standalone `SKILL.md`.
4. Review the name, description, and instructions; save the skill.
5. Select it explicitly for the first trial. Enable automatic use after checking that its scope matches your tasks.

Direct Chat skills are generally available for **Microsoft Copilot (Premium)** users, not **Copilot Chat (Basic)**. Microsoft also documents that Chat skills are unsupported in tenants using **Microsoft Purview Information Barriers**. Check the account and organization settings if the menu is absent. [Microsoft Learn, updated 19 November 2026](https://learn.microsoft.com/en-us/plugins/build-copilot-chat-skills); [Microsoft Support](https://support.microsoft.com/en-gb/microsoft-365-copilot/create-edit-skills-copilot).

## Install in Gemini in the browser

1. Open [gemini.google.com](https://gemini.google.com) with your approved work account.
2. In the sidebar, select **Customize**. If needed, open **More** first.
3. Select **Skills → Create → Upload**.
4. Choose one individual ZIP, one `SKILL.md`, or one folder containing it at the root, then select **Open**.
5. Select **Upload**, review the skill, then select **Create**.
6. In a chat, type **`/`** or **`@`** and choose the skill from the picker.

This is a native skill import. Google also provides **Create manually** with separate name, description, and instructions fields. [Create and manage Gemini skills](https://support.google.com/gemini/answer/17094296?hl=en).

Upload **one skill at a time**. Gemini requires nonempty instructions and YAML name/description; the limits are 64 characters for the name and 1,024 for the description. Skill uploads allow up to 100 files/100 MB, with `SKILL.md` up to 10 MB. `.skill`, nested archives, and separate `.sql`, `.ts`, `.tsx`, or `.jsx` files are unsupported. Internet/API-dependent scripts are blocked. This text-only pack avoids those dependencies; SQL examples remain inside Markdown. [Google's import requirements](https://support.google.com/gemini/answer/18977944?hl=en).

Google's work-account guidance makes Gemini-app skills available across Workspace editions, subject to organizational Gemini access. **Gemini app, Workspace apps, and Gemini Enterprise are separate surfaces**: an app skill is not automatically registered in the others. [Workspace transition guidance, updated 9 November 2026](https://knowledge.workspace.google.com/admin/generative-ai/gemini-app/about-the-transition-to-skills).

### Gems fallback, only if your account still offers it

Native Skills are the primary route. If your work account instead exposes **Settings → Gems → New Gem**, enter a name, paste the instruction body from `SKILL.md` into **Instructions**, and save. The instruction body starts after the closing YAML `---` delimiter. Preview a trial before relying on it.

Optional **Knowledge → Add files** supplies reference material; attaching `SKILL.md` there alone does not register a native skill. Google documents business/enterprise Gems remaining available until no earlier than March 2027. [Gem creation](https://support.google.com/gemini/answer/15146780?hl=en); [work-account transition](https://knowledge.workspace.google.com/admin/generative-ai/gemini-app/about-the-transition-to-skills).

## Install in Copilot in Excel

1. Open Excel's Copilot pane.
2. Select **… → Manage plugins & skills → Custom skills**.
3. Select **Create OneDrive folder**, then **Open skills folder**.
4. Copy the desired complete skill folders there. For example, create `workforce-reconciliation/` and put that skill's `SKILL.md` inside it. You can extract the corresponding ZIP into that folder using Windows Explorer.
5. Select **Refresh** after adding or renaming folders.
6. Use **Add → Choose plugins and skills**, or type `@workforce-reconciliation` in a prompt.

The folder name must match the YAML `name`. Let Excel open its correct OneDrive folder rather than guessing its location. Its built-in `@brandkit`, `@chart-design`, and `@clean-data` can complement these workflows when available. [Excel skill instructions](https://support.microsoft.com/en-gb/excel/copilot/copilot-in-excel-skills).

Excel skills use the capabilities already authorized in Excel. They do not add a new execution mechanism or access rights. [Excel FAQ](https://support.microsoft.com/en-gb/excel/copilot/frequently-asked-questions-about-copilot-in-excel).

## Install in Copilot in PowerPoint

1. Open the Copilot pane and select **+ → Choose skills**.
2. Open **Manage skills → Add skill** and upload the file, or use the form to paste its content.
3. Alternatively, select **… → Manage skills → Custom skills → Create OneDrive folder → Open skills folder**, then copy matching-name folders containing `SKILL.md`.
4. Refresh if needed, then select the skill or mention it as `@management-presentation`.

PowerPoint currently rejects PNG/PDF resources and nested ZIPs in custom-skill ZIP uploads. Keep company templates, working decks, and other task documents separate from the text-only skill upload. [PowerPoint skill requirements](https://support.microsoft.com/en-us/powerpoint/copilot/copilot-in-powerpoint-skills).

A Brand kit owner/editor can also add a skill to an approved company Brand kit. Users select that brand, then choose its skill in PowerPoint. [Brand Skill support](https://support.microsoft.com/en-us/powerpoint/copilot/brand-skill-support-copilot-powerpoint).

## Optional: Agent Builder and Cowork

### Agent Builder: select up to eight skills per agent

Open or create an agent, then choose **Configure → Skills → Add**. Upload complete individual ZIPs and test through **Try it**. This route does not accept standalone Markdown uploads.

Agent Builder allows **eight skills per agent**: choose a task-relevant subset of this 16-skill pack, or configure two agents with appropriate responsibilities. Do not attempt to attach all 16 to one agent. Its limits include instructions under 20,000 characters, a 50 MB ZIP, 25 MB per file, 350 files across all skills, and directory depth three. These are agent-attached limits, not direct Chat upload limits.

Builder access does not necessarily require the Copilot add-on, although particular capabilities can require licensing or pay-as-you-go. Information Barriers restrict end-user skill additions. [Agent Builder, updated 16 November 2026](https://learn.microsoft.com/en-us/plugins/agent-builder-add-skills); [support matrix, updated 19 November 2026](https://learn.microsoft.com/en-us/plugins/declarative-agent-skills).

### Cowork

Use **Plugins → Add → Upload**. Some interfaces/documentation call this **Customize → Skills → Add → Upload skill**. Alternatively, put each skill in work OneDrive at `/Documents/Cowork/skills/<skill-name>/SKILL.md`, then start a **new session**.

Cowork documents up to 50 custom skills and does not support custom skills on mobile. Its authoring guidance allows a 1 MB `SKILL.md`, 20 companion files, and 10 MB per skill; its upload guide separately lists 10 MB compressed/50 MB expanded and 100 files. This text-only pack avoids depending on the larger limits. [Use Cowork](https://learn.microsoft.com/en-us/copilot/cowork/use-cowork); [Customize and upload](https://learn.microsoft.com/en-us/copilot/cowork/cowork-customize), updated 17 November 2026.

## What these skills can do

The source repository is a tool field guide. It had no existing `SKILL.md` collection when this adaptation began. These original workflows translate its emphasis on evidence, appropriate tools, and verification into office tasks, informed by the reviewed upstream projects.

They instruct the host to inspect accessible inputs, state coverage, use available capabilities, and distinguish proposals from executed changes. They do not install Mac tools, coding agents, API clients, or persistent memory services. No skill grants additional file access or establishes a connection just by naming a product.

Chat skill scripts cannot install packages or make authenticated network calls; Microsoft documents a network exception for browser use. External actions use enabled host capabilities. [Microsoft runtime guidance](https://learn.microsoft.com/en-us/plugins/build-copilot-chat-skills).

Dataset size and completeness depend on the actual service, input limits, and session tools. **No 1–100 GB processing guarantee is made.** If only a sample or partial extraction was accessible, the result must say so.

## Company templates and source material

The public workflows are company-neutral. `corporate-style` explains how to apply supplied requirements; it does not contain an employer's brand guide or claim one was obtained.

Keep employer-only financial extracts, templates, logos, and instructions in approved work locations. Supply them to the work session or maintain an internal skill copy. Do not add them to this public repository. A personal app design system does not replace an employer's template.

## Test a skill before using it routinely

| Trial | What to check |
| --- | --- |
| “Use `workforce-reconciliation` to compare these two extracts by employee ID; report HC and FTE separately.” | Matching rules, duplicates, unmatched records, and control totals are visible. |
| “Use `spreadsheet-modeling` to build a staffing forecast from these assumptions.” | Inputs, formulas, periods, units, and checks are distinct; calculated results are actually verified. |
| “Use `analytical-sql` to write a query for this schema.” | Dialect and join grain are explicit; proposed SQL is not presented as executed. |
| “Use `evidence-research` to assess this supplier announcement.” | Material claims have sources and dates; facts and interpretation are separated. |
| “Use `management-presentation` with this report and company template.” | Slide claims trace to evidence; missing design rules are identified; rendered checks are claimed only if performed. |
| “Use `video-storyboard` to plan a 60-second project update.” | Scene timing and assets are clear; the answer does not claim a video was rendered. |

Also try a missing-input case and an unrelated request. For automatic selection, check that the intended skill triggers and unrelated skills stay out of the task.

**No installation or live execution in your employer's Copilot/Gemini tenant has been verified by this pack.** Local validation checks files and packages; it does not establish tenant availability, permissions, runtime behavior, or output quality.

## Update from GitHub

GitHub is the maintained source. Download an updated individual ZIP, review the changes, and replace the installed skill through the host's management flow. Keep matching folder names for Office imports. Refresh Excel/PowerPoint or begin a new Cowork session, then repeat a known-result trial.

Gemini supports **More → Replace skill** in its skill editor. Cowork can create a numbered duplicate when uploading an existing name, so use its edit/OneDrive flow for an intentional update. [Gemini management](https://support.google.com/gemini/answer/17094296?hl=en); [Cowork management](https://learn.microsoft.com/en-us/copilot/cowork/cowork-customize).

**GitHub changes do not automatically synchronize to imported skills.** Installation in one product also does not prove registration in another. Record the source commit in your work notes to identify the version you tested.

### Maintenance commands: outside the work PC

Maintainers with a local checkout and the required development tools can regenerate and verify the downloadable packages:

```sh
npm run skills:check
npm run skills:package
npm run skills:verify
```

Packages are maintained at `packages/work-pc/<skill-name>.zip`. These commands are for repository maintenance, not steps the work user must run. No GitHub Actions workflow is needed.

If a documented menu is missing, check the account, product, license, and organization settings against its official instructions. These import routes do not establish a universal installer for Word, Researcher, Analyst, or every Google Workspace app.
