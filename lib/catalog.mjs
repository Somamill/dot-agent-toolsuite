export function filterTools(tools, { query = '', category = 'All' } = {}) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return tools.filter(tool => (category === 'All' || tool.category === category) &&
    terms.every(term => `${tool.name} ${tool.summary} ${tool.evidence} ${tool.limit} ${tool.category} ${tool.status} ${tool.rating}`.toLocaleLowerCase().includes(term)));
}

export const kinds = ['availability', 'check', 'build', 'test', 'render', 'automation'];
export function validateReceipt(value, tools) {
  const expected = ['id', 'date', 'tool', 'kind', 'outcome'].sort();
  if (!value || Object.keys(value).sort().join() !== expected.join() ||
      !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(value.id) || !/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
      !tools.some(tool => tool.id === value.tool) || !kinds.includes(value.kind) ||
      !['passed', 'failed'].includes(value.outcome)) throw new Error('Receipt rejected: only the public allowlisted schema is accepted.');
  return { id:value.id, date:value.date, tool:value.tool, kind:value.kind, outcome:value.outcome };
}

export function readReceipts(text, tools) {
  return text.split('\n').filter(line => line.trim()).map(line => validateReceipt(JSON.parse(line), tools));
}

export function mergeReceipts(...lists) {
  const map = new Map();
  for (const receipt of lists.flat()) {
    const existing = map.get(receipt.id);
    if (existing && JSON.stringify(existing) !== JSON.stringify(receipt)) throw new Error('Conflicting receipt ID; preserve both sources for review.');
    map.set(receipt.id, receipt);
  }
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
