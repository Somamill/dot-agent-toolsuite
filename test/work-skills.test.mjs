import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { inspectWorkSkills, parseSkill } from '../lib/work-skills.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const good = '---\nname: sample-skill\ndescription: "Use for a synthetic test: preserve sources."\n---\n\n# Sample skill\n\nRead the supplied source and state what was checked.\n';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'work-skills-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, 'skills/work/sample-skill'), { recursive: true });
  await writeFile(join(directory, 'skills/work/sample-skill/SKILL.md'), good);
  await writeFile(join(directory, 'skills/work/catalog.json'), JSON.stringify({
    schemaVersion: 1, packVersion: '1.0.0', profile: 'standalone-text',
    skills: [{ name: 'sample-skill', title: 'Sample', group: 'core', preferredHosts: ['gemini'], files: ['SKILL.md'] }],
  }));
  return directory;
}

test('work pack has independently importable source files and bounded host selections', async () => {
  const report = await inspectWorkSkills(root);
  assert.equal(report.skills.length, 16);
  assert.equal(report.skills.filter(skill => skill.group === 'core').length, 8);
  assert.equal(report.skills.filter(skill => skill.group === 'extended').length, 8);
  assert.ok(report.skills.every(skill => skill.preferredHosts.includes('gemini')));
  assert.ok(report.skills.every(skill => skill.characters < 20000 && skill.bytes > 0));
});

test('reject invalid metadata and unresolved resources before creating an upload', () => {
  assert.equal(parseSkill(good, 'sample-skill').name, 'sample-skill');
  assert.throws(() => parseSkill(good, 'different-name'), /mismatched/);
  assert.throws(() => parseSkill(good.replace('sample-skill', '../private'), '../private'), /invalid/);
  assert.throws(() => parseSkill(good.replace('sample-skill', 'sample--skill'), 'sample--skill'), /invalid/);
  assert.throws(() => parseSkill(good.replace('"Use for a synthetic test: preserve sources."', JSON.stringify('x'.repeat(1025))), 'sample-skill'), /1024/);
  assert.throws(() => parseSkill(good + '\n[Required workbook](../payroll.xlsx)\n', 'sample-skill'), /unresolved local reference/);
  assert.throws(() => parseSkill('\uFEFF' + good, 'sample-skill'), /BOM/);
});

test('reject unintended files instead of quietly bundling private work material', async t => {
  const directory = await fixture(t);
  await inspectWorkSkills(directory);
  await writeFile(join(directory, 'skills/work/sample-skill/payroll.csv'), 'synthetic-private-fixture\n');
  await assert.rejects(inspectWorkSkills(directory), /unexpected files/);
});

test('reject linked skill files and uncataloged skill folders', async t => {
  const directory = await fixture(t);
  const path = join(directory, 'skills/work/sample-skill/SKILL.md');
  await rm(path);
  await writeFile(join(directory, 'outside.md'), good);
  await symlink(join(directory, 'outside.md'), path);
  await assert.rejects(inspectWorkSkills(directory), /regular file/);
  await rm(path);
  await writeFile(path, good);
  await mkdir(join(directory, 'skills/work/unlisted'));
  await assert.rejects(inspectWorkSkills(directory), /Uncataloged/);
});

test('packaged uploads contain exactly root SKILL.md and reproduce byte for byte', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'work-skills-zips-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const script = join(root, 'scripts/package-work-skills.py');
  for (const name of ['first', 'second']) {
    const result = spawnSync('python3', [script, '--output', join(directory, name)], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.stdout);
  }
  const firstManifest = await readFile(join(directory, 'first/manifest.json'));
  assert.deepEqual(firstManifest, await readFile(join(directory, 'second/manifest.json')));
  const manifest = JSON.parse(firstManifest);
  for (const item of manifest.packages) {
    assert.deepEqual(await readFile(join(directory, 'first', item.package)), await readFile(join(directory, 'second', item.package)));
  }
  // Inspect the real archives independently of the writer, including the uploaded name and bytes.
  const inspect = spawnSync('python3', ['-c', [
    'import hashlib,json,pathlib,sys,zipfile',
    'root=pathlib.Path(sys.argv[1]); output=pathlib.Path(sys.argv[2])',
    'manifest=json.loads((output/"manifest.json").read_text())',
    'for item in manifest["packages"]:',
    '    package=output/item["package"]',
    '    assert hashlib.sha256(package.read_bytes()).hexdigest()==item["packageSha256"]',
    '    with zipfile.ZipFile(package) as archive:',
    '        assert archive.namelist()==["SKILL.md"]',
    '        content=archive.read("SKILL.md")',
    '        assert content==(root/item["sourcePath"]).read_bytes()',
    '        assert hashlib.sha256(content).hexdigest()==item["sourceSha256"]',
  ].join('\n'), root, join(directory, 'first')], { encoding: 'utf8' });
  assert.equal(inspect.status, 0, inspect.stderr);
  await writeFile(join(directory, 'first', manifest.packages[0].package), 'stale package');
  const stale = spawnSync('python3', [script, '--output', join(directory, 'first'), '--check'], { cwd: root, encoding: 'utf8' });
  assert.notEqual(stale.status, 0);
  assert.match(stale.stderr, /stale/);
});
