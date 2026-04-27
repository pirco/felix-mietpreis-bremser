// Felix der Mietpreisbremser — slideshow + footer year

(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.slide-nav--prev');
  const nextBtn = document.querySelector('.slide-nav--next');
  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer;

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Bild ${i + 1}`);
    if (i === index) dot.classList.add('is-active');
    dot.addEventListener('click', () => go(i));
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
    stopAuto();
    timer = setInterval(() => go(index + 1), 5000);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  prevBtn.addEventListener('click', () => { go(index - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { go(index + 1); startAuto(); });

  const slideshow = document.querySelector('.slideshow');
  slideshow.addEventListener('mouseenter', stopAuto);
  slideshow.addEventListener('mouseleave', startAuto);

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(index - 1); startAuto(); }
    if (e.key === 'ArrowRight') { go(index + 1); startAuto(); }
  });

  startAuto();

  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
