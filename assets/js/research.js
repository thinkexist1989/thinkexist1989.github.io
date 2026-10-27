/* Progressive research tools. All source content is already in the HTML. */
(function () {
  'use strict';
  var controls = document.querySelector('.architecture-controls');
  var modules = Array.from(document.querySelectorAll('[data-module]'));
  var panels = Array.from(document.querySelectorAll('.module-panel'));
  function selectModule(name, announce) {
    modules.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.module === name));
    });
    panels.forEach(function (panel) { panel.hidden = panel.id !== 'module-' + name; });
    document.querySelectorAll('[data-edge]').forEach(function (edge) {
      edge.classList.toggle('is-active', edge.dataset.edge.split(' ').includes(name));
    });
    if (announce) document.querySelector('#architecture-status').textContent = 'Showing ROCOS-' + name.toUpperCase();
    document.dispatchEvent(new CustomEvent('research:changed', {
      detail: { elements: [document.querySelector('#module-' + name)] }
    }));
  }
  if (controls && modules.length && panels.length) {
    modules.forEach(function (button) {
      button.addEventListener('click', function () { selectModule(button.dataset.module, true); });
    });
    selectModule('viz', false);
    controls.hidden = false;
    document.querySelector('#architecture-static').hidden = true;
  }

  var form = document.querySelector('#publication-filters');
  if (!form) return;
  var query = form.querySelector('input');
  var year = form.querySelector('#publication-year');
  var type = form.querySelector('#publication-type');
  var entries = Array.from(document.querySelectorAll('.publication-entry'));
  var searchText = entries.map(function (entry) {
    return (entry.querySelector('h3').textContent + ' ' + entry.querySelector('.publication-citation').textContent)
      .normalize('NFKC').toLocaleLowerCase();
  });
  var timer;
  function filterWorks() {
    window.clearTimeout(timer);
    var words = query.value.normalize('NFKC').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    var visible = [];
    entries.forEach(function (entry, index) {
      var match = (year.value === 'all' || year.value === entry.dataset.year) &&
        (type.value === 'all' || type.value === entry.dataset.type) &&
        words.every(function (word) { return searchText[index].includes(word); });
      entry.hidden = !match;
      if (match) visible.push(entry);
    });
    document.querySelector('#publication-count').textContent = visible.length + (visible.length === 1 ? ' work' : ' works');
    document.querySelector('#publication-empty').hidden = visible.length !== 0;
    document.dispatchEvent(new CustomEvent('research:changed', { detail: { elements: visible } }));
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); filterWorks(); });
  query.addEventListener('input', function (event) {
    window.clearTimeout(timer);
    if (!event.isComposing) timer = window.setTimeout(filterWorks, 160);
  });
  query.addEventListener('compositionend', filterWorks);
  year.addEventListener('change', filterWorks);
  type.addEventListener('change', filterWorks);
  form.addEventListener('reset', function () { window.setTimeout(filterWorks, 0); });
  document.querySelector('#publication-reset').addEventListener('click', function () {
    form.reset();
    query.focus();
  });
  form.hidden = false;
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', async function () {
      var citation = document.getElementById(button.dataset.copy);
      var status = button.parentElement.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(citation.textContent);
        status.textContent = 'Citation copied.';
      } catch (error) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(citation);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Copy is unavailable. The citation is selected; use your device’s copy command.';
      }
    });
  });
})();
