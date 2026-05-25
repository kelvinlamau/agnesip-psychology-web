// Language toggle
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  ['btn-en','btn-tc','mob-btn-en','mob-btn-tc'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('active', id.includes(lang === 'en' ? '-en' : '-tc'));
  });
  document.documentElement.lang = lang === 'tc' ? 'zh-Hant' : 'en';
  applyLang(lang);
  try { localStorage.setItem('lang', lang); } catch(e) {}
}

function applyLang(lang) {
  var attr = 'data-' + lang;
  document.querySelectorAll('[' + attr + ']').forEach(function(el) {
    if (el.tagName === 'OPTION') { el.textContent = el.getAttribute(attr); return; }
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    var val = el.getAttribute(attr);
    if (val === null) return;
    if (val.indexOf('<') !== -1 || val.indexOf('&') !== -1) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-ph-' + lang + ']').forEach(function(el) {
    el.placeholder = el.getAttribute('data-ph-' + lang);
  });
}

// Mobile menu
function toggleMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var btn = document.getElementById('hamburger');
  if (!menu || !btn) return;
  var isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  var btn = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

// Close on outside click
document.addEventListener('click', function(e) {
  var menu = document.getElementById('mobile-menu');
  var btn = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    closeMobileMenu();
  }
});

// Nav scroll shadow
window.addEventListener('scroll', function() {
  var nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Contact form
function submitForm() {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
}

// Maps grid responsive
(function() {
  var g = document.getElementById('maps-grid');
  if (!g) return;
  function resize() { g.style.gridTemplateColumns = window.innerWidth <= 640 ? '1fr' : '1fr 1fr'; }
  resize();
  window.addEventListener('resize', resize);
})();

// Restore language preference
(function() {
  try {
    var saved = localStorage.getItem('lang');
    if (saved === 'tc') setLang('tc');
  } catch(e) {}
})();
