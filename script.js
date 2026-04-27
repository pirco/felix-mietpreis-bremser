// Felix der Mietpreisbremser — slideshow + i18n + footer year

// ============== i18n ==============
const enDict = {
  'alert-text': 'LANDLORD OVERREACHING? FELIX REACHES BACK.',
  'hero-line2': 'THE&nbsp;RENT<span class="brake">BUSTER</span>',
  'hero-tagline': 'Felix gets <span class="tagline__hl">your money</span> back.',
  'hero-lead':
    'Renting an <strong>Altbau</strong> in Berlin?<br/>' +
    'Is a <strong>property company</strong> your landlord?<br/>' +
    'Paying <em>too much</em> every single month?',
  'hero-lead-cta': 'Then <span class="hl">DON’T STAY SILENT</span> – pick up the phone now!',
  'phone-pre': '📞 FREE FIRST CONSULTATION',
  'phone-number': '0800 – TOO PRICEY',
  'phone-post': 'ON CALL 24 / 7',
  'hero-micro': 'No win? No fee.* No excuses. No nonsense.',
  'portrait-stamp': '100 % WIN RATE',

  'stat1-label': 'Landlords taken off the streets',
  'stat2-num': '€20,000',
  'stat2-label': 'Recovered in rent',
  'stat3-label': 'Win rate on Altbau cases',
  'stat4-num': '€0',
  'stat4-label': 'Risk to you',

  'right-kicker': 'THIS IS YOUR LEGAL RIGHT',
  'right-title':
    'Stucco above.<br/>Parquet below.<br/>' +
    '<span class="hl">Profiteering on the bill.</span>',
  'right-lead':
    'If you live in a Berlin Altbau, the odds you’re overpaying are high. ' +
    'Felix reads your contract, runs the numbers against the Mietspiegel ' +
    '— and brings back what is yours. <strong>No ifs. No buts.</strong>',

  'cap1': 'LIVING ROOM · Prenzlauer Berg · <span class="case-won">CASE WON</span>',
  'cap2': 'STUCCO & SUN · Mitte · <span class="case-won">€4,200 RECOVERED</span>',
  'cap3': 'HERRINGBONE KITCHEN · Friedrichshain · <span class="case-won">CASE WON</span>',
  'cap4': 'GRÜNDERZEIT · Kreuzberg · <span class="case-won">LANDLORD DEFEATED</span>',
  'cap5': 'BALCONY ROW · Schöneberg · <span class="case-won">€7,800 RECOVERED</span>',
  'cap6': 'OLD VS. NEW · everywhere · <span class="case-won">FELIX ALWAYS PICKS LEFT</span>',

  'steps-kicker': 'HOW WE STRIKE BACK',
  'steps-title': 'Three steps to your money.',
  'step1-title': 'Call',
  'step1-body': 'You pick up the phone. Felix picks up too. First consultation — free, blunt, clear.',
  'step2-title': 'Send the contract',
  'step2-body': 'Photo of the lease. Photo of the stucco. Felix calculates exactly what your landlord owes you.',
  'step3-title': 'Get your money',
  'step3-body': 'Felix sues. Felix wins. You get paid. Sometimes even with interest.',

  'test-kicker': 'VOICES OF SATISFIED TENANTS',
  'test-title': '“I couldn’t believe it.”',
  'test1-body':
    '“Felix did in two weeks what I had failed at for three years. My landlord is still ' +
    'fuming. <strong>I have a new balcony.</strong>”',
  'test1-author': '— Ines K., Pankow',
  'test2-body':
    '“First I was skeptical. Then there were <strong>€6,400 in my account.</strong> Felix is a force of nature.”',
  'test2-author': '— Markus T., Neukölln',
  'test3-body':
    '“My property manager started sweating the moment I just said the name <em>Felix</em>.”',
  'test3-author': '— Yvonne B., Wedding',

  'cta-title': 'Every day you don’t call, you keep paying.',
  'cta-phone-pre': '📞 CALL FELIX NOW',
  'cta-phone-post': 'FREE CONSULTATION · NO WIN, NO FEE*',

  'footer-brand': 'FELIX · THE RENT BUSTER',
  'footer-line': 'Berlin’s sharpest weapon against rent-gouging — since yesterday, with a flawless record.',
  'footer-disclaimer':
    '* This page is a <strong>parody</strong> and a birthday gift to Felix. ' +
    'Felix is not a lawyer — but he has, in fact, successfully sued several Berlin landlords. ' +
    'No legal advice. No real phone number. A great deal of love.',
  'footer-copy': '© <span id="year"></span> Felix M. · Made in Berlin · With stucco and pride.',
};

(function () {
  const i18nEls = Array.from(document.querySelectorAll('[data-i18n]'));
  const captured = {};
  i18nEls.forEach((el) => {
    const key = el.dataset.i18n;
    // If a key appears more than once (e.g. phone-number), capture once.
    if (!(key in captured)) captured[key] = el.innerHTML;
  });

  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    i18nEls.forEach((el) => {
      const key = el.dataset.i18n;
      const value = lang === 'en' ? enDict[key] : captured[key];
      if (value != null) el.innerHTML = value;
    });
    document.querySelectorAll('.lang-switch button').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
    setYear();
    try { localStorage.setItem('felix-lang', lang); } catch (_) {}
  }

  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  let initial = 'de';
  try {
    const saved = localStorage.getItem('felix-lang');
    if (saved === 'de' || saved === 'en') initial = saved;
    else if ((navigator.language || '').toLowerCase().startsWith('en')) initial = 'en';
  } catch (_) {}
  setLang(initial);
})();

// ============== SLIDESHOW ==============
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.slide-nav--prev');
  const nextBtn = document.querySelector('.slide-nav--next');
  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === index) dot.classList.add('is-active');
    dot.addEventListener('click', () => { go(i); restartAuto(); });
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function go(next) {
    slides[index].classList.remove('is-active');
    dots[index].classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dots[index].classList.add('is-active');
  }

  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(index + 1), 5000);
  }
  function stopAuto() { if (timer) clearInterval(timer); }
  function restartAuto() { startAuto(); }

  prevBtn.addEventListener('click', () => { go(index - 1); restartAuto(); });
  nextBtn.addEventListener('click', () => { go(index + 1); restartAuto(); });

  const slideshow = document.querySelector('.slideshow');
  slideshow.addEventListener('mouseenter', stopAuto);
  slideshow.addEventListener('mouseleave', startAuto);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(index - 1); restartAuto(); }
    if (e.key === 'ArrowRight') { go(index + 1); restartAuto(); }
  });

  startAuto();
})();
