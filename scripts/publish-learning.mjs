import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root, tools } from './record.mjs';
import { readReceipts, mergeReceipts } from '../lib/catalog.mjs';
import { syncKit } from './sync-kit.mjs';
import { atomicWrite } from '../lib/storage.mjs';

let local = {};
try { local = JSON.parse(await readFile(new URL('.toolsuite-local.json', root), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const executable = local.githubCommand || 'gh';
const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const match = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)$/.exec(pkg.repository);
if (!match) throw new Error('A GitHub owner/repository URL is required.');
const repository = match[1];
function api(endpoint, method = 'GET', body) {
  const args = ['api', '--method', method, `repos/${repository}/${endpoint}`];
  let directory;
  let result;
  try {
    // Non-graphical credential runners intentionally disconnect standard input.
    if (body) {
      directory = mkdtempSync(join(tmpdir(), 'toolsuite-publication-'));
      const payload = join(directory, 'payload.json');
      writeFileSync(payload, JSON.stringify(body), { mode:0o600 });
      args.push('--input', payload);
    }
    result = spawnSync(executable, args, { encoding:'utf8', timeout:60000, maxBuffer:8000000, env:{ ...process.env, GH_PROMPT_DISABLED:'1', GIT_TERMINAL_PROMPT:'0' } });
  } finally { if (directory) rmSync(directory, { recursive:true, force:true }); }
  if (result.status !== 0) throw new Error('GitHub operation did not complete. Safe local records are preserved; check approved authentication and branch protections.');
  return JSON.parse(result.stdout);
}

try {
  const kit = await syncKit();
  const ours = readReceipts(await readFile(new URL('data/activity.jsonl', root), 'utf8'), tools);
  let published = false;
  for (let attempt = 0; attempt < 3 && !published; attempt++) {
    const head = api('git/ref/heads/main').object.sha;
    const commit = api(`git/commits/${head}`);
    const remote = api(`contents/data/activity.jsonl?ref=${head}`);
    // shortcut: the contents API serves a small receipt log; shard before its size limit.
    if (remote.encoding !== 'base64') throw new Error('Receipt log needs archival before further publication. Local records are preserved.');
    const theirs = readReceipts(Buffer.from(remote.content, 'base64').toString('utf8'), tools);
    const merged = mergeReceipts(theirs, ours);
    const activity = merged.map(row => JSON.stringify(row)).join('\n') + (merged.length ? '\n' : '');
    const tree = api('git/trees', 'POST', { base_tree:commit.tree.sha, tree:[
      { path:'data/activity.jsonl', mode:'100644', type:'blob', content:activity },
      { path:'data/kit.json', mode:'100644', type:'blob', content:JSON.stringify(kit, null, 2)+'\n' }
    ] });
    if (tree.sha === commit.tree.sha) { console.log('Public learning data is already current.'); published = true; continue; }
    const next = api('git/commits', 'POST', { message:'Update safe tool receipts and verified kit provenance', tree:tree.sha, parents:[head] });
    try { api('git/refs/heads/main', 'PATCH', { sha:next.sha, force:false }); }
    catch (error) { if (attempt === 2) throw error; continue; }
    await atomicWrite(new URL('data/activity.jsonl', root), activity);
    console.log(`Published safe learning data: ${next.sha.slice(0, 12)}. No raw logs or working-tree files were uploaded.`);
    published = true;
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
