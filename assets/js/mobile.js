/* =============================================
   DÉCOROUS PLUS — Mobile Enhancement JS
   Injects mobile-prototype UI elements when
   screen width ≤ 768px
   ============================================= */

(function () {
  'use strict';

  const BREAKPOINT = 768;
  const WA = 'https://wa.me/97450393653';

  // SVG icons
  const ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    price: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
    order: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.1-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.083-1.12l-.29-.174-3.027.783.804-2.946-.19-.302A8 8 0 1112 20z"/></svg>`,
    ham: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  };

  // Determine current page
  function currentPage() {
    const p = window.location.pathname;
    if (p.includes('collections')) return 'shop';
    if (p.includes('pricing')) return 'pricing';
    if (p.includes('order')) return 'order';
    return 'home';
  }

  const PAGE = currentPage();

  // Nav items
  const NAV_ITEMS = [
    { id: 'home',    label: 'Home',        href: 'index.html',       icon: ICONS.home  },
    { id: 'shop',    label: 'Collections', href: 'collections.html', icon: ICONS.shop  },
    { id: 'pricing', label: 'Pricing',     href: 'pricing.html',     icon: ICONS.price },
    { id: 'order',   label: 'Order',       href: 'order.html',       icon: ICONS.order },
    { id: 'cart',    label: 'Cart',        href: '#cart',            icon: ICONS.cart  },
  ];

  // ---- CART COUNT ----
  function getCartCount() {
    try {
      const c = JSON.parse(localStorage.getItem('decorous_cart') || '[]');
      return c.reduce((s, i) => s + (i.qty || 1), 0);
    } catch { return 0; }
  }

  // ---- INJECT MOBILE ELEMENTS ----
  function init() {
    if (window.innerWidth > BREAKPOINT) return;
    injectHamburgerBtn();
    injectMobileCartBtn();
    injectDrawer();
    injectBottomNav();
    injectFloatingWA();
    injectStatsBar();
    injectWABanner();
    fixAnnBar();
    updateAllBadges();
    // Update badges whenever cart changes
    window.addEventListener('cartUpdated', updateAllBadges);
    // Also poll for cart changes from main.js
    setInterval(updateAllBadges, 1000);
  }

  // ---- HAMBURGER BUTTON ---- (inject into nav-inner)
  function injectHamburgerBtn() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner || document.getElementById('mobHamBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'mobHamBtn';
    btn.className = 'mob-ham-btn';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = ICONS.ham;
    btn.addEventListener('click', openDrawer);
    navInner.insertBefore(btn, navInner.firstChild);
  }

  // ---- MOBILE CART BUTTON ---- (inject into nav-inner)
  function injectMobileCartBtn() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner || document.getElementById('mobCartBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'mobCartBtn';
    btn.className = 'mob-cart-btn';
    btn.setAttribute('aria-label', 'Cart');
    btn.innerHTML = ICONS.cart + `<span class="mob-cart-badge cart-badge" style="display:none">0</span>`;
    btn.addEventListener('click', () => {
      if (typeof openCart === 'function') openCart();
    });
    navInner.appendChild(btn);
  }

  // ---- DRAWER ----
  function injectDrawer() {
    if (document.getElementById('mobDrawer')) return;
    const overlay = document.createElement('div');
    overlay.id = 'mobDrawer';
    overlay.className = 'mob-drawer-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });

    const navItems = NAV_ITEMS.filter(n => n.id !== 'cart').map(n => `
      <a href="${n.href}" class="mob-drawer-item ${PAGE === n.id ? 'active' : ''}">
        ${n.icon}
        <span class="mob-drawer-label">${n.label}</span>
        ${n.id === 'cart' ? `<span class="mob-drawer-cart-badge cart-badge" style="display:none">0</span>` : ''}
      </a>
    `).join('');

    overlay.innerHTML = `
      <div class="mob-drawer">
        <div class="mob-drawer-top">
          <img src="assets/images/logo-with-text.png" alt="Décorous Plus">
          <div class="mob-drawer-tagline">Quality · Luxury · Exclusivity</div>
        </div>
        <nav class="mob-drawer-nav">
          ${navItems}
          <a href="#cart" class="mob-drawer-item" id="drawerCartLink">
            ${ICONS.cart}
            <span class="mob-drawer-label">My Cart</span>
            <span class="mob-drawer-cart-badge cart-badge" style="display:none">0</span>
          </a>
        </nav>
        <div class="mob-drawer-bottom">
          <button class="mob-drawer-wa" onclick="window.open('${WA}','_blank')">
            ${ICONS.wa} Chat on WhatsApp
          </button>
        </div>
      </div>
    `;

    document.getElementById('drawerCartLink') && document.getElementById('drawerCartLink').addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      setTimeout(() => { if (typeof openCart === 'function') openCart(); }, 200);
    });

    document.body.appendChild(overlay);

    // Set up cart link in drawer after DOM ready
    overlay.querySelector('#drawerCartLink') && overlay.querySelector('#drawerCartLink').addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      setTimeout(() => { if (typeof openCart === 'function') openCart(); }, 200);
    });
  }

  function openDrawer() {
    const d = document.getElementById('mobDrawer');
    if (d) d.classList.add('open');
  }
  function closeDrawer() {
    const d = document.getElementById('mobDrawer');
    if (d) d.classList.remove('open');
  }

  // ---- BOTTOM NAV ----
  function injectBottomNav() {
    if (document.getElementById('mobBottomNav')) return;
    const nav = document.createElement('nav');
    nav.id = 'mobBottomNav';
    nav.className = 'mob-bottom-nav';

    const tabs = NAV_ITEMS.map(n => {
      if (n.id === 'cart') {
        return `<button class="mob-tab ${PAGE === n.id ? 'active' : ''}" onclick="(function(){if(typeof openCart==='function')openCart();})()" aria-label="${n.label}">
          ${n.icon}
          <span class="mob-tab-badge cart-badge" style="display:none">0</span>
          <span>${n.label}</span>
        </button>`;
      }
      return `<a href="${n.href}" class="mob-tab ${PAGE === n.id ? 'active' : ''}" aria-label="${n.label}">
        ${n.icon}
        <span>${n.label}</span>
      </a>`;
    }).join('');

    nav.innerHTML = tabs;
    document.body.appendChild(nav);
  }

  // ---- FLOATING WA BUTTON ----
  function injectFloatingWA() {
    if (document.getElementById('mobFloatWA')) return;
    const btn = document.createElement('a');
    btn.id = 'mobFloatWA';
    btn.className = 'mob-float-wa';
    btn.href = WA;
    btn.target = '_blank';
    btn.setAttribute('aria-label', 'WhatsApp');
    btn.innerHTML = ICONS.wa;
    document.body.appendChild(btn);
  }

  // ---- STATS BAR (home page only) ----
  function injectStatsBar() {
    if (PAGE !== 'home') return;
    if (document.getElementById('mobStatsBar')) return;

    // Find hero section to insert after
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const bar = document.createElement('div');
    bar.id = 'mobStatsBar';
    bar.className = 'mob-stats-bar';
    bar.innerHTML = `
      <div class="mob-stat">
        <div class="mob-stat-num">6</div>
        <div class="mob-stat-lbl">Robe styles</div>
      </div>
      <div class="mob-stats-divider"></div>
      <div class="mob-stat">
        <div class="mob-stat-num">5,000+</div>
        <div class="mob-stat-lbl">Sets sold</div>
      </div>
      <div class="mob-stats-divider"></div>
      <div class="mob-stat">
        <div class="mob-stat-num">2–7</div>
        <div class="mob-stat-lbl">Day delivery</div>
      </div>
    `;
    hero.insertAdjacentElement('afterend', bar);
  }

  // ---- WA BANNER (home page only, before footer) ----
  function injectWABanner() {
    if (PAGE !== 'home') return;
    if (document.getElementById('mobWABanner')) return;

    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const banner = document.createElement('a');
    banner.id = 'mobWABanner';
    banner.className = 'mob-wa-banner';
    banner.href = WA;
    banner.target = '_blank';
    banner.innerHTML = `
      <div class="mob-wa-banner-icon">${ICONS.wa}</div>
      <div style="flex:1">
        <div class="mob-wa-banner-title">Ordering for a group?</div>
        <div class="mob-wa-banner-sub">10+ sets — from QR 150 per set</div>
      </div>
      <div class="mob-wa-banner-arrow">${ICONS.arrow}</div>
    `;
    footer.insertAdjacentElement('beforebegin', banner);
  }

  // ---- ANNOUNCEMENT BAR FIX ----
  function fixAnnBar() {
    const ann = document.getElementById('annBar');
    if (!ann) return;
    if (ann.style.display !== 'none' && !ann.dataset.hidden) {
      document.body.classList.add('ann-visible');
    }
    // Watch for close
    const closeBtn = ann.querySelector('.ann-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.classList.remove('ann-visible');
      }, { capture: true });
    }
  }

  // ---- UPDATE BADGES ----
  function updateAllBadges() {
    const count = getCartCount();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
    // Also update existing cart-count elements (from main.js)
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ---- PRODUCT CARD ENHANCEMENTS (collections page) ----
  function enhanceCollectionCards() {
    if (window.innerWidth > BREAKPOINT) return;
    if (PAGE !== 'shop') return;

    // Make the products grid scrollable on home, grid on collections
    const grids = document.querySelectorAll('.products-grid');
    grids.forEach(grid => {
      // On collections page, keep 2-col grid (already handled by CSS)
      // Just ensure add buttons are circular
      grid.querySelectorAll('.product-card-cta .btn').forEach(btn => {
        if (btn.textContent.trim().includes('+') || btn.classList.contains('btn-icon')) {
          btn.classList.add('btn-add-circle');
        }
      });
    });
  }

  // ---- RUN ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); enhanceCollectionCards(); });
  } else {
    init();
    enhanceCollectionCards();
  }

  // Re-run if resized into mobile
  let lastMobile = window.innerWidth <= BREAKPOINT;
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= BREAKPOINT;
    if (isMobile && !lastMobile) { init(); enhanceCollectionCards(); }
    lastMobile = isMobile;
  });

})();
