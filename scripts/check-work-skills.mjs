import { fileURLToPath } from 'node:url';
import { inspectWorkSkills } from '../lib/work-skills.mjs';

try {
  if (process.argv.slice(2).some(arg => arg !== '--json')) throw new Error('Usage: node scripts/check-work-skills.mjs [--json]');
  const report = await inspectWorkSkills(fileURLToPath(new URL('../', import.meta.url)));
  if (process.argv.includes('--json')) console.log(JSON.stringify(report));
  else {
    console.log(`Validated ${report.skills.length} standalone work skills for Copilot and Gemini (pack ${report.packVersion}).`);
    console.log('Checked names, frontmatter, size, self-contained files, and catalog coverage. Tenant import and execution are not tested by this check.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
