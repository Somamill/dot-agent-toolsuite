import { appendFile, readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { validateReceipt } from '../lib/catalog.mjs';

export const root = new URL('../', import.meta.url);
export const tools = JSON.parse(await readFile(new URL('data/tools.json', root), 'utf8'));
export async function record(tool, kind, outcome) {
  const receipt = validateReceipt({ id: randomUUID(), date: new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Tokyo' }).format(new Date()), tool, kind, outcome }, tools);
  await appendFile(new URL('data/activity.jsonl', root), `${JSON.stringify(receipt)}\n`, { mode: 0o600 });
  return receipt;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [tool, kind, outcome] = process.argv.slice(2);
  try { await record(tool, kind, outcome); console.log('Safe receipt recorded; public publication is pending.'); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
