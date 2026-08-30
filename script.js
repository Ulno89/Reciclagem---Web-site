// ============================================================
// PROGRESS RAIL — preenche conforme a rolagem
// ============================================================
const progressRail = document.getElementById('progressRail');

function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressRail.style.width = pct + '%';
  // desloca o gradiente para "percorrer" as cores dos materiais junto com a leitura
  progressRail.style.backgroundPosition = `${pct}% 0`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ============================================================
// CONTADORES ANIMADOS
// ============================================================
const statEls = document.querySelectorAll('.stat-num');

function animateCount(el){
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1){
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window){
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => statIo.observe(el));
} else {
  statEls.forEach(el => {
    el.textContent = el.dataset.target + (el.dataset.suffix || '');
  });
}

// ============================================================
// ACORDEÃO DE MITOS
// ============================================================
const accTriggers = document.querySelectorAll('.acc-trigger');

accTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // fecha os outros itens (comportamento de acordeão único)
    accTriggers.forEach(other => {
      if (other !== trigger) other.setAttribute('aria-expanded', 'false');
    });

    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});