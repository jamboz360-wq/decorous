/* ============================================================
   Décorous Plus — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STICKY NAV SHADOW ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── MOBILE MENU TOGGLE ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';

      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[1].style.transform = 'scaleX(0)';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = ''; s.style.opacity = '';
        });
      });
    });
  }

  /* ── SCROLL REVEAL (FADE UP) ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── ORDER FORM SUBMISSION ── */
  const form  = document.getElementById('order-form');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✓ Order submitted! We\'ll contact you on WhatsApp shortly.');
      form.reset();
    });
  }

  /* ── TOAST HELPER ── */
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 4500);
  }

  /* ── LIVE PRICE CALCULATOR ── */
  const qtyInput    = document.getElementById('quantity');
  const priceOutput = document.getElementById('estimated-price');
  const addonSelect = document.getElementById('addon');

  function getBasePrice(qty) {
    if (qty < 10)        return 329;
    if (qty <= 40)       return 199;
    if (qty <= 100)      return 175;
    return 150;
  }

  function updatePrice() {
    if (!qtyInput || !priceOutput) return;
    const qty     = parseInt(qtyInput.value) || 1;
    const addon   = addonSelect && addonSelect.value !== '' ? 35 : 0;
    const base    = getBasePrice(qty);
    const total   = (base + addon) * qty;
    priceOutput.textContent = `Estimated total: ${total.toLocaleString()} QAR (${base + addon} QAR × ${qty})`;
  }

  if (qtyInput)    qtyInput.addEventListener('input', updatePrice);
  if (addonSelect) addonSelect.addEventListener('change', updatePrice);
  updatePrice();

});

  /* ── INCLUDED SLIDESHOW (mobile only) ── */
  (function() {
    const grid = document.getElementById('included-grid');
    const nav  = document.getElementById('included-nav');
    const dots = document.querySelectorAll('.included-dot');
    const prev = document.getElementById('slide-prev');
    const next = document.getElementById('slide-next');
    if (!grid) return;

    let current = 0;
    const total = 3;

    function isMobile() { return window.innerWidth <= 900; }

    function goTo(idx) {
      current = (idx + total) % total;
      grid.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function setup() {
      if (isMobile()) {
        grid.style.transition = 'transform 0.42s cubic-bezier(0.4,0,0.2,1)';
        nav.style.display = 'flex';
        goTo(0);

        // touch swipe
        let startX = 0;
        grid.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        grid.addEventListener('touchend', e => {
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });
      } else {
        grid.style.transform = '';
        grid.style.transition = '';
        nav.style.display = 'none';
      }
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));

    setup();
    window.addEventListener('resize', setup);

    // auto-advance on mobile
    setInterval(() => { if (isMobile()) goTo(current + 1); }, 4000);
  })();

