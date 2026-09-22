// Mobile menu, footer year, and the contact form hand-off. No tracking, no third-party scripts.
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('main-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // The site is static, so the form composes an email instead of pretending to submit to a server.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var missing = Array.prototype.filter.call(form.querySelectorAll('[required]'), function (f) {
        return !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      });
      form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
      if (missing.length) {
        missing.forEach(function (f) { f.setAttribute('aria-invalid', 'true'); });
        status.textContent = 'Add your name, a valid email and a message, then try again.';
        missing[0].focus();
        return;
      }
      var v = function (n) { return form.elements[n].value.trim(); };
      var body = v('message') + '\n\nName: ' + v('name') + '\nEmail: ' + v('email') + (v('phone') ? '\nPhone: ' + v('phone') : '');
      window.location.href = 'mailto:sales@swiftfp.com?subject=' + encodeURIComponent('Website: ' + v('topic')) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app should open with the message ready to send. If it does not, email sales@swiftfp.com or call (888) 550-6119.';
    });
  }
})();
