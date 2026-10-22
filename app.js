(function () {
  var toggle = document.getElementById('languageToggle');
  var lang = 'en';
  try {
    var saved = localStorage.getItem('te-lang');
    if (saved === 'en' || saved === 'ne') lang = saved;
  } catch (e) {}

  function apply(next) {
    lang = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-en][data-ne]').forEach(function (el) {
      el.textContent = el.dataset[next];
    });
    document.querySelectorAll('[data-aria-en][data-aria-ne]').forEach(function (el) {
      el.setAttribute('aria-label', next === 'en' ? el.dataset.ariaEn : el.dataset.ariaNe);
    });
    var b = document.body;
    if (b.dataset.titleEn && b.dataset.titleNe) {
      document.title = next === 'en' ? b.dataset.titleEn : b.dataset.titleNe;
    }
    toggle.textContent = next === 'en' ? 'नेपाली' : 'English';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Nepali' : 'Switch to English');
    try { localStorage.setItem('te-lang', next); } catch (e) {}
  }

  toggle.addEventListener('click', function () {
    apply(lang === 'en' ? 'ne' : 'en');
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  if (lang !== 'en') apply(lang);
})();
