/* Anime.js v4 enhancement. Core navigation, filtering and content do not depend on it. */
(function () {
  'use strict';
  if (!document.body.classList.contains('site-home')) return;
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var active = new Set();
  var observed = new Set();
  var observer = null;
  var filterAnimation = null;
  var researchAnimation = null;
  var anime = window.anime;

  function animate(targets, settings) {
    if (preference.matches || !anime || !targets.length) return null;
    var animation = anime.animate(targets, Object.assign({}, settings, {
      onComplete: function (self) {
        active.delete(self);
        self.revert();
      }
    }));
    active.add(animation);
    return animation;
  }
  function reveal(group) {
    if (observed.has(group)) return;
    observed.add(group);
    var targets = Array.from(group.querySelectorAll('[data-reveal]'));
    if (!targets.length) return;
    // The initial document is visible. Only currently entering elements receive a transient start state.
    animate(targets, {
      opacity: [0, 1],
      y: [group.closest('.hero') ? 24 : 16, 0],
      duration: group.closest('.hero') ? 600 : 440,
      delay: anime.stagger(70),
      ease: 'outQuint'
    });
  }
  function stopMotion() {
    if (observer) observer.disconnect();
    active.forEach(function (animation) { animation.revert(); });
    active.clear();
    filterAnimation = null;
    researchAnimation = null;
  }
  function startMotion() {
    if (!anime || preference.matches) return;
    var groups = document.querySelectorAll('[data-reveal-group]');
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    groups.forEach(function (group) {
      if (!observed.has(group)) observer.observe(group);
    });
  }
  startMotion();
  preference.addEventListener('change', function () {
    stopMotion();
    if (!preference.matches) startMotion();
  });
  document.addEventListener('projects:filtered', function (event) {
    if (filterAnimation) {
      filterAnimation.revert();
      active.delete(filterAnimation);
    }
    filterAnimation = animate(event.detail.elements, {
      opacity: [0.45, 1],
      y: [8, 0],
      duration: 260,
      ease: 'outQuad'
    });
  });
  document.addEventListener('research:changed', function (event) {
    if (researchAnimation) {
      researchAnimation.revert();
      active.delete(researchAnimation);
    }
    var visible = event.detail.elements.filter(function (element) {
      var bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    });
    researchAnimation = animate(visible, { opacity: [0.65, 1], duration: 220, ease: 'outQuad' });
  });
  document.querySelectorAll('.button').forEach(function (button) {
    var pressed = null;
    function release() {
      if (pressed) {
        pressed.revert();
        active.delete(pressed);
        pressed = null;
      }
    }
    button.addEventListener('pointerdown', function () {
      release();
      pressed = animate([button], { scale: [1, 0.98], duration: 150, ease: 'outQuad' });
    });
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('blur', release);
  });

  // The native controls remain available even without Anime.js or with JavaScript disabled.
  var video = document.querySelector('#hero-video');
  var mediaObserver = null;
  var autoAttempted = false;
  var userPaused = false;
  var desktop = window.matchMedia('(min-width: 992px)');
  var connection = navigator.connection;
  var allowed = function () {
    return !preference.matches && desktop.matches && !(connection && connection.saveData);
  };
  video.addEventListener('pause', function () { userPaused = true; });
  video.addEventListener('error', function () {
    document.querySelector('.media-error').hidden = false;
  });
  var source = video.querySelector('source');
  if (source) source.addEventListener('error', function () {
    document.querySelector('.media-error').hidden = false;
  });
  if ('IntersectionObserver' in window) {
    mediaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (!autoAttempted && !userPaused && allowed() && !document.hidden) {
          autoAttempted = true;
          var promise = video.play();
          if (promise) promise.catch(function () { /* Keep the poster and native play control. */ });
        }
      });
    }, { threshold: 0.4 });
    mediaObserver.observe(video);
  }
  preference.addEventListener('change', function () {
    if (preference.matches) video.pause();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      video.pause();
      stopMotion();
    } else if (!preference.matches) startMotion();
  });
  window.addEventListener('pagehide', function () {
    stopMotion();
    if (mediaObserver) mediaObserver.disconnect();
    video.pause();
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      if (!preference.matches) startMotion();
      if (mediaObserver) mediaObserver.observe(video);
    }
  });
})();
