import { readFile, readdir, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';

const validName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hosts = new Set(['copilot-chat', 'gemini', 'excel', 'powerpoint', 'cowork', 'agent-builder']);
export const sourceDirectory = 'skills/work';

// Deliberately accept this repository's two-scalar YAML profile, not arbitrary YAML.
// A JSON-quoted description is a valid YAML double-quoted scalar and needs no parser dependency.
export function parseSkill(text, folderName) {
  if (text.includes('\r') || text.startsWith('\uFEFF')) throw new Error(`${folderName}: use UTF-8 without BOM and LF line endings`);
  const match = /^---\nname: ([^\n]+)\ndescription: ("[^\n]*")\n---\n([\s\S]+)$/.exec(text);
  if (!match) throw new Error(`${folderName}: expected only name and a JSON-quoted description in YAML frontmatter`);
  const name = match[1];
  let description;
  try { description = JSON.parse(match[2]); }
  catch { throw new Error(`${folderName}: description must be a valid quoted string`); }
  if (!validName.test(name) || name.length > 64 || name !== folderName) throw new Error(`${folderName}: invalid or mismatched skill name`);
  if (typeof description !== 'string' || !description.trim() || [...description].length > 1024 || /[\r\n]/.test(description)) throw new Error(`${folderName}: description must contain 1–1024 characters on one line`);
  if (!match[3].trim() || !/^# /m.test(match[3])) throw new Error(`${folderName}: missing Markdown instructions`);
  if ([...text].length >= 20000) throw new Error(`${folderName}: standalone portability profile requires fewer than 20,000 characters`);
  // Every shipped skill is self-contained. Do not silently package a dangling local reference.
  for (const link of match[3].matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (!/^(?:https:\/\/|#)/.test(link[1])) throw new Error(`${folderName}: external resources must be optional HTTPS links; unresolved local reference ${link[1]}`);
  }
  return { name, description, characters: [...text].length, bytes: Buffer.byteLength(text), sha256: createHash('sha256').update(text).digest('hex') };
}

export async function inspectWorkSkills(repositoryRoot) {
  const sourceRoot = resolve(repositoryRoot, sourceDirectory);
  if (!(await lstat(sourceRoot)).isDirectory() || (await lstat(sourceRoot)).isSymbolicLink()) throw new Error('Skill source must be a real directory');
  const catalogFile = join(sourceRoot, 'catalog.json');
  if (!(await lstat(catalogFile)).isFile() || (await lstat(catalogFile)).isSymbolicLink()) throw new Error('Catalog must be a regular file');
  const catalog = JSON.parse(await readFile(catalogFile, 'utf8'));
  if (catalog.schemaVersion !== 1 || catalog.profile !== 'standalone-text' || !/^\d+\.\d+\.\d+$/.test(catalog.packVersion)) throw new Error('Unsupported skill catalog schema, version, or profile');
  if (!Array.isArray(catalog.skills) || catalog.skills.length === 0) throw new Error('Skill catalog is empty');
  const expected = new Set(['catalog.json']);
  const skills = [];
  for (const entry of catalog.skills) {
    if (typeof entry.name !== 'string' || !validName.test(entry.name) || entry.name.length > 64 || expected.has(entry.name)) throw new Error('Catalog contains an invalid or duplicate skill name');
    expected.add(entry.name);
    if (!entry.title?.trim() || !['core', 'extended'].includes(entry.group)) throw new Error(`${entry.name}: missing title or group`);
    if (!Array.isArray(entry.preferredHosts) || !entry.preferredHosts.length || entry.preferredHosts.some(host => !hosts.has(host))) throw new Error(`${entry.name}: unknown host hint`);
    if (JSON.stringify(entry.files) !== '["SKILL.md"]') throw new Error(`${entry.name}: this portable profile ships exactly one SKILL.md`);
    const directory = join(sourceRoot, entry.name);
    const stat = await lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`${entry.name}: skill directory must not be a symlink`);
    const entries = await readdir(directory);
    if (entries.length !== 1 || entries[0] !== 'SKILL.md') throw new Error(`${entry.name}: unexpected files; keep private assets, binaries, and scripts out of this profile`);
    const skillFile = join(directory, 'SKILL.md');
    const skillStat = await lstat(skillFile);
    if (!skillStat.isFile() || skillStat.isSymbolicLink()) throw new Error(`${entry.name}: SKILL.md must be a regular file`);
    const raw = await readFile(skillFile);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(raw);
    if (!Buffer.from(text, 'utf8').equals(raw)) throw new Error(`${entry.name}: noncanonical UTF-8`);
    skills.push({ ...entry, ...parseSkill(text, entry.name), sourcePath: `${sourceDirectory}/${entry.name}/SKILL.md` });
  }
  const actual = await readdir(sourceRoot);
  if (actual.some(name => !expected.has(name)) || actual.length !== expected.size) throw new Error('Uncataloged files or skill directories exist in the work pack');
  for (const group of ['core', 'extended']) {
    if (skills.filter(skill => skill.group === group).length > 8) throw new Error(`${group}: a suggested Agent Builder selection must contain at most eight skills`);
  }
  return { schemaVersion: 1, packVersion: catalog.packVersion, reviewedOn: catalog.reviewedOn, profile: catalog.profile, target: catalog.target, sourceRepository: catalog.sourceRepository, skills };
}
