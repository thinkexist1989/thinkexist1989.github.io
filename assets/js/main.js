/* Homepage interactions. Project detail pages retain legacy.js until phase two. */
(function () {
  'use strict';
  if (!document.body.classList.contains('site-home')) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var menuButton = document.querySelector('.menu-toggle');
  var navigation = document.querySelector('#site-links');
  var desktop = window.matchMedia('(min-width: 992px)');

  function closeMenu(restoreFocus) {
    var wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menuButton.querySelector('span').textContent = '+';
    if (wasOpen && restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', function () {
    var open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? '−' : '+';
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu(true);
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.site-nav')) {
      closeMenu(navigation.contains(document.activeElement));
    }
  });
  desktop.addEventListener('change', function () {
    var focused = document.activeElement;
    closeMenu(false);
    if (desktop.matches && focused === menuButton) navigation.querySelector('a').focus();
    if (!desktop.matches && navigation.contains(focused)) menuButton.focus();
  });
  document.body.classList.add('nav-enhanced');
  menuButton.hidden = false;

  // Native anchors own URL/history. Scroll tracking only updates the current label.
  var navLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  var navSections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  var scrollQueued = false;
  function updateNavigation() {
    var current = null;
    var offset = document.querySelector('.site-nav').getBoundingClientRect().height + 96;
    navSections.forEach(function (section, index) {
      if (section.getBoundingClientRect().top <= offset) current = index;
    });
    navLinks.forEach(function (link, index) {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('hashchange', updateNavigation);
  updateNavigation();

  var grid = document.querySelector('.project-list');
  var items = Array.from(grid.querySelectorAll('.project-item'));
  var buttons = Array.from(document.querySelectorAll('[data-filter]'));
  var count = document.querySelector('#project-count');
  var selected = '*';
  var layout = null;
  var filteredItems = items;

  if (typeof window.Isotope === 'function') {
    try {
      grid.classList.add('isotope-ready');
      layout = new window.Isotope(grid, {
        itemSelector: '.project-item',
        layoutMode: 'fitRows',
        fitRows: { gutter: 32 },
        transitionDuration: reducedMotion.matches ? '0s' : '0.25s'
      });
    } catch (error) {
      if (layout) layout.destroy();
      layout = null;
      grid.classList.remove('isotope-ready');
    }
  }

  function announceFilter() {
    count.textContent = filteredItems.length + (filteredItems.length === 1 ? ' project' : ' projects');
    document.querySelector('.filter-empty').hidden = filteredItems.length !== 0;
    updateNavigation();
  }
  if (layout) layout.on('arrangeComplete', announceFilter);

  function filterProjects(value) {
    selected = value;
    filteredItems = items.filter(function (item) { return value === '*' || item.matches(value); });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === value));
    });
    items.forEach(function (item) {
      var visible = filteredItems.indexOf(item) !== -1;
      item.inert = !visible;
      item.setAttribute('aria-hidden', String(!visible));
      item.querySelector('a').tabIndex = visible ? 0 : -1;
      if (!layout) item.hidden = !visible;
    });
    if (layout) layout.arrange({ filter: value });
    else announceFilter();
    document.dispatchEvent(new CustomEvent('projects:filtered', {
      detail: { elements: filteredItems.map(function (item) { return item.querySelector('.project-preview'); }) }
    }));
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { filterProjects(button.dataset.filter); });
  });
  document.querySelector('#reset-filter').addEventListener('click', function () {
    filterProjects('*');
    buttons[0].focus();
  });
  document.querySelector('.filter-bar').hidden = false;
  if (layout) {
    grid.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('load', function () { layout.layout(); });
      img.addEventListener('error', function () { layout.layout(); });
    });
    if (document.fonts) document.fonts.ready.then(function () { layout.layout(); });
  }
  reducedMotion.addEventListener('change', function () {
    if (layout) {
      layout.option({ transitionDuration: reducedMotion.matches ? '0s' : '0.25s' });
      layout.arrange({ filter: selected });
    }
  });

  // Map is optional and only fetched when the visitor opens its disclosure.
  var disclosure = document.querySelector('.map-disclosure');
  var mapElement = document.querySelector('#osm-map');
  var map = null;
  var mapStarted = false;
  disclosure.addEventListener('toggle', function () {
    if (!disclosure.open) return;
    if (map) { map.invalidateSize(); return; }
    if (mapStarted) return;
    mapStarted = true;
    var status = mapElement.querySelector('.map-status');
    status.textContent = 'Loading the map…';
    status.setAttribute('role', 'status');
    var timeout = window.setTimeout(fail, 10000);
    var failed = false;
    function fail() {
      if (map) return;
      failed = true;
      window.clearTimeout(timeout);
      status.textContent = 'The map could not be loaded. The address and OpenStreetMap link above are still available.';
    }
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(css);
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onerror = fail;
    script.onload = function () {
      if (failed || !window.L) { fail(); return; }
      window.clearTimeout(timeout);
      status.remove();
      map = window.L.map(mapElement, { scrollWheelZoom: false }).setView([41.7611127, 123.4420878], 15);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);
      window.L.marker([41.7611127, 123.4420878]).addTo(map).bindPopup('Shenyang Institute of Automation, CAS');
      if (disclosure.open) map.invalidateSize();
    };
    document.head.appendChild(script);
  });
})();
