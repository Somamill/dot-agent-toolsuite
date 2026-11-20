import { spawn } from 'node:child_process';
import { basename } from 'node:path';
import { record, tools } from './record.mjs';

const [id, separator, executable, ...args] = process.argv.slice(2);
const tool = tools.find(tool => tool.id === id);
if (separator !== '--' || !executable || !tool?.executables.includes(basename(executable))) {
  console.error('Usage: run-tool.mjs <tool-id> -- <matching executable> [args...]. Arguments and output are never recorded.');
  process.exitCode = 2;
} else {
  const child = spawn(executable, args, { stdio: 'inherit' });
  const signals = ['SIGINT', 'SIGTERM'];
  const handlers = new Map(signals.map(signal => [signal, () => child.kill(signal)]));
  for (const [signal, handler] of handlers) process.on(signal, handler);
  const code = await new Promise(resolve => {
    child.once('error', () => resolve(127));
    child.once('close', code => resolve(code ?? 1));
  });
  for (const [signal, handler] of handlers) process.off(signal, handler);
  const kind = ['gitleaks', 'ruff', 'swiftlint', 'swiftformat'].includes(id) ? 'check' : 'automation';
  try { await record(id, kind, code === 0 ? 'passed' : 'failed'); }
  catch (error) { console.error('Tool finished, but receipt recording failed:', error.message); process.exitCode = code || 1; }
  process.exitCode ??= code;
}
