(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle: flips between light and dark, remembered per browser.
  var themeBtn = document.querySelector('.theme-toggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Mobile navigation.
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Email: mailto does nothing on machines without a mail app, so also
  // copy the address and confirm on the page.
  var status = document.querySelector('.copy-status');
  document.querySelectorAll('.js-email').forEach(function (link) {
    link.addEventListener('click', function () {
      var email = link.getAttribute('data-email');
      if (!status || !navigator.clipboard) return;
      navigator.clipboard.writeText(email).then(function () {
        status.textContent = 'Email address copied: ' + email;
        status.classList.add('is-visible');
        clearTimeout(status._t);
        status._t = setTimeout(function () { status.classList.remove('is-visible'); }, 4000);
      }, function () {});
    });
  });

  // Subtle reveal on scroll.
  var targets = document.querySelectorAll('.section-head, .steps li, .panel, .tool, .area, .card, .why-grid, .callout, .role-box');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
