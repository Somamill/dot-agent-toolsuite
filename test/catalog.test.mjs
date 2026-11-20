import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterTools, validateReceipt, readReceipts, mergeReceipts } from '../lib/catalog.mjs';

const tools = JSON.parse(await readFile(new URL('../data/tools.json', import.meta.url), 'utf8'));
const receipt = { id:'c1120a14-3000-4000-8000-000000000001', date:'2026-11-20', tool:'gitleaks', kind:'check', outcome:'passed' };
test('catalog IDs are unique and official links use HTTPS', () => {
  assert.equal(new Set(tools.map(tool => tool.id)).size, tools.length);
  for (const tool of tools) {
    assert.equal(new URL(tool.url).protocol, 'https:');
    assert.ok(['Verified','Installed','Evaluated'].includes(tool.status));
    assert.ok(tool.evidence && tool.limit && tool.summary);
    assert.ok(['Essential','Specialist','Optional'].includes(tool.rating));
  }
});
test('search combines case-insensitive terms and category selection', () => {
  assert.deepEqual(filterTools(tools, { query:'SECRET', category:'Quality' }).map(tool => tool.id), ['gitleaks']);
  assert.equal(filterTools(tools, { query:'no-such-tool' }).length, 0);
  assert.equal(filterTools(tools, { query:'  ' }).length, tools.length);
  assert.ok(filterTools(tools, { category:'Creative' }).every(tool => tool.category === 'Creative'));
  assert.ok(filterTools(tools, { query:'Essential', category:'Native' }).every(tool => tool.rating === 'Essential'));
});
test('safe receipt round-trips; blank lines do not create events', () => {
  assert.deepEqual(readReceipts(JSON.stringify(receipt)+'\n\n', tools), [receipt]);
});
test('raw arguments, paths, output and unknown fields cannot enter the public log', () => {
  for (const field of ['arguments','output','cwd','repository','secret']) {
    assert.throws(() => validateReceipt({ ...receipt, [field]:'private material' }, tools), /rejected/);
  }
});
test('unknown tools, outcomes and kinds fail closed', () => {
  for (const value of [{ tool:'unknown' }, { outcome:'probably' }, { kind:'raw-output' }]) {
    assert.throws(() => validateReceipt({ ...receipt, ...value }, tools), /rejected/);
  }
});
test('concurrent receipt sets merge without duplication', () => {
  const another = { ...receipt, id:'c1120a14-3000-4000-8000-000000000002', outcome:'failed' };
  assert.equal(mergeReceipts([receipt], [receipt, another]).length, 2);
  assert.throws(() => mergeReceipts([receipt], [{ ...receipt, outcome:'failed' }]), /Conflicting/);
});
