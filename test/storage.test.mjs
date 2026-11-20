import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { atomicWrite } from '../lib/storage.mjs';

test('metadata replacement is complete and leaves no temporary file', async () => {
  const dir = await mkdtemp(join(tmpdir(),'toolsuite-storage-'));
  try {
    const file = pathToFileURL(join(dir,'kit.json'));
    await writeFile(file,'old'); await atomicWrite(file,'new');
    assert.equal(await readFile(file,'utf8'),'new');
    assert.deepEqual(await readdir(dir),['kit.json']);
  } finally { await rm(dir,{recursive:true,force:true}); }
});
test('failed replacement preserves the existing destination and cleans its scratch file', async () => {
  const dir = await mkdtemp(join(tmpdir(),'toolsuite-storage-'));
  try {
    const target = join(dir,'existing'); await mkdir(target);
    await assert.rejects(atomicWrite(pathToFileURL(target),'new'));
    assert.deepEqual(await readdir(dir),['existing']);
  } finally { await rm(dir,{recursive:true,force:true}); }
});
