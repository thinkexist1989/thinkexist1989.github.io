/* Detail pages: explicit media loading, pause off screen, and useful failure states. */
(function () {
  'use strict';
  var videos = Array.from(document.querySelectorAll('video'));
  function pauseAll() { videos.forEach(function (video) { video.pause(); }); }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (!entry.isIntersecting) entry.target.pause(); });
    }, { threshold: 0.1 });
    videos.forEach(function (video) { observer.observe(video); });
  }
  videos.forEach(function (video) {
    var reported = false;
    function reportError() {
      if (reported) return;
      reported = true;
      var message = document.createElement('p');
      message.className = 'media-unavailable';
      message.setAttribute('role', 'status');
      message.textContent = 'This video could not be loaded. Try the video file link below.';
      video.insertAdjacentElement('afterend', message);
    }
    video.addEventListener('error', reportError);
    video.querySelectorAll('source').forEach(function (source) { source.addEventListener('error', reportError); });
  });
  document.querySelectorAll('.external-video').forEach(function (disclosure) {
    disclosure.setAttribute('data-ready', '');
    var frame = disclosure.querySelector('iframe');
    disclosure.addEventListener('toggle', function () {
      if (disclosure.open) {
        frame.src = frame.dataset.src;
        frame.hidden = false;
      } else {
        frame.removeAttribute('src');
        frame.hidden = true;
      }
    });
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pauseAll(); });
  window.addEventListener('pagehide', pauseAll);
})();
