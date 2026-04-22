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
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
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
