import { filterTools } from './lib/catalog.mjs';

const form = document.querySelector('#tool-filters');
try {
  const response = await fetch(new URL('./data/tools.json', import.meta.url));
  if (!response.ok) throw new Error('Catalog request failed');
  const tools = await response.json();
  const entries = [...document.querySelectorAll('[data-tool-id]')];
  const search = document.querySelector('#tool-search');
  const category = document.querySelector('#tool-category');
  function update() {
    const matches = new Set(filterTools(tools, { query: search.value, category: category.value }).map(tool => tool.id));
    entries.forEach(entry => { entry.hidden = !matches.has(entry.dataset.toolId); });
    document.querySelector('#tool-count').textContent = `Showing ${matches.size} of ${tools.length} tools`;
    document.querySelector('#empty-state').hidden = matches.size !== 0;
  }
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
} catch {
  document.querySelector('#tool-count').textContent += '. Search is unavailable; the full catalog is still readable below.';
}

document.querySelectorAll('[data-copy]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    const code = button.closest('.tool-entry').querySelector('.tool-command');
    code.hidden = false;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = 'Command copied. Review its arguments before running it.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange(); range.selectNodeContents(code);
      selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Clipboard access is unavailable. The command is selected for manual copying.';
    }
  });
});

const tabs = [...document.querySelectorAll('[data-workflow]')];
const panels = [...document.querySelectorAll('[data-panel]')];
document.querySelector('.workflow-tabs').setAttribute('role', 'tablist');
function activate(tab, focus = false) {
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tab.dataset.workflow; });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.setAttribute('role', 'tab'); tab.id = `tab-${tab.dataset.workflow}`; tab.setAttribute('aria-controls', `flow-${tab.dataset.workflow}`);
  tab.addEventListener('click', event => { event.preventDefault(); activate(tab); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
  });
});
panels.forEach(panel => { panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', `tab-${panel.dataset.panel}`); });
activate(tabs[0]);
