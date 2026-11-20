import { atomicWrite } from '../lib/storage.mjs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { root } from './record.mjs';

const names = ['AGENT_DEVELOPMENT.md', 'TOOL_CATALOG.md', 'LOCALIZATION.md', 'APP_STORE_PLAYBOOK.md', 'TREND_RESEARCH.md', 'LANGUAGES.json'];
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`Kit source request failed: HTTP ${response.status}`);
  const text = await response.text();
  if (text.length > 500000) throw new Error('Kit source exceeds the expected size.');
  return text;
}
export async function syncKit() {
  const ref = JSON.parse(await get('https://api.github.com/repos/Somamill/dot-brand-kit/git/ref/heads/main'));
  const revision = ref.object.sha;
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Invalid kit revision.');
  const base = `https://raw.githubusercontent.com/Somamill/dot-brand-kit/${revision}/`;
  const manifest = JSON.parse(await get(`${base}agent-policy/manifest.json`));
  if (manifest.schemaVersion !== 1 || Object.keys(manifest.files).sort().join() !== names.sort().join()) throw new Error('Unexpected kit manifest.');
  const files = await Promise.all(names.map(async name => {
    const entry = manifest.files[name];
    if (entry.path !== `docs/${name}` || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw new Error('Unexpected kit path or hash.');
    const text = await get(base + entry.path);
    const sha256 = createHash('sha256').update(text).digest('hex');
    if (sha256 !== entry.sha256) throw new Error(`Kit hash mismatch: ${name}`);
    return { name, sha256 };
  }));
  const result = { revision, policyVersion: manifest.policyVersion, checkedOn: new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Tokyo' }).format(new Date()), sourceUrl: `https://github.com/Somamill/dot-brand-kit/tree/${revision}`, files };
  await atomicWrite(new URL('data/kit.json', root), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { const kit = await syncKit(); console.log(`Reviewed kit source: policy ${kit.policyVersion}, ${kit.revision.slice(0, 12)}. Public publication is pending.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
