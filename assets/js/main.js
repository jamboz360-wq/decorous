/* ============================================================
   Décorous Plus — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── STICKY NAV SHADOW ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── MOBILE DRAWER MENU ── */
  const mnuBtn      = document.getElementById('mnuBtn');
  const mnu         = document.getElementById('mnu');
  const mnuBackdrop = document.getElementById('mnuBackdrop');

  function mnuOpen() {
    if (!mnu) return;
    mnu.classList.add('open');
    mnu.setAttribute('aria-hidden', 'false');
    if (mnuBtn) { mnuBtn.setAttribute('aria-expanded', 'true'); mnuBtn.classList.add('is-open'); }
    document.body.style.overflow = 'hidden';
  }

  function mnuClose() {
    if (!mnu) return;
    mnu.classList.remove('open');
    mnu.setAttribute('aria-hidden', 'true');
    if (mnuBtn) { mnuBtn.setAttribute('aria-expanded', 'false'); mnuBtn.classList.remove('is-open'); }
    document.body.style.overflow = '';
  }

  if (mnuBtn) mnuBtn.addEventListener('click', () => mnu.classList.contains('open') ? mnuClose() : mnuOpen());
  if (mnuBackdrop) mnuBackdrop.addEventListener('click', mnuClose);
  if (mnu) mnu.querySelectorAll('.mnu-link').forEach(a => a.addEventListener('click', mnuClose));
  if (mnu) mnu.querySelector('.mnu-wa') && mnu.querySelector('.mnu-wa').addEventListener('click', mnuClose);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') mnuClose(); });

  /* ── SCROLL REVEAL ── */
  const fadeObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ═══════════════════════════════════
     CART SYSTEM
  ═══════════════════════════════════ */
  let cart = [];

  const cartSidebar   = document.getElementById('cartSidebar');
  const cartOverlay   = document.getElementById('cartOverlay');
  const cartIcon      = document.getElementById('cartIcon');
  const closeCartBtn  = document.getElementById('closeCart');
  const cartItemsEl   = document.getElementById('cartItems');
  const cartSummaryEl = document.getElementById('cartSummary');
  const cartCountEl   = document.getElementById('cartCount');
  const cartSubtotalEl= document.getElementById('cartSubtotal');
  const cartDeliveryEl= document.getElementById('cartDelivery');
  const cartTotalEl   = document.getElementById('cartTotal');
  const deliverySelEl = document.getElementById('deliveryLocation');
  const addonRowEl    = document.getElementById('addonSavingRow');
  const addonSavingEl = document.getElementById('addonSaving');
  const checkoutBtn   = document.getElementById('checkoutBtn');

  function openCart() {
    if (!cartSidebar) return;
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (!cartSidebar) return;
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartIcon)     cartIcon.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);
  if (deliverySelEl) deliverySelEl.addEventListener('change', renderCart);

  function getBasePrice(qty) {
    if (qty < 10)   return 329;
    if (qty <= 40)  return 199;
    if (qty <= 100) return 175;
    return 150;
  }

  function totalCartQty() { return cart.reduce((s, i) => s + i.qty, 0); }

  function renderCart() {
    if (!cartItemsEl) return;
    const totalQty  = totalCartQty();
    const basePrice = getBasePrice(totalQty);
    const isBulk    = totalQty >= 10;

    if (cartCountEl) {
      cartCountEl.textContent = totalQty;
      cartCountEl.classList.toggle('empty', totalQty === 0);
    }

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a href="index.html#products" class="cart-browse-link" id="cartBrowseLink">Browse Collections \u2192</a></div>';
      const browseLink = cartItemsEl.querySelector('#cartBrowseLink');
      if (browseLink) {
        browseLink.addEventListener('click', e => {
          e.preventDefault();
          closeCart();
          // Short delay so the close animation starts, then navigate
          setTimeout(() => { window.location.href = 'index.html#products'; }, 200);
        });
      }
      if (cartSummaryEl) cartSummaryEl.style.display = 'none';
      if (checkoutBtn)   checkoutBtn.style.display    = 'none';
      return;
    }

    if (cartSummaryEl) cartSummaryEl.style.display = '';
    if (checkoutBtn)   checkoutBtn.style.display    = '';

    cartItemsEl.innerHTML = cart.map((item, idx) => {
      const addonCost  = item.addon && !isBulk ? 35 : 0;
      const lineTotal  = (basePrice + addonCost) * item.qty;
      const addonLabel = item.addon
        ? '<span class="ci-addon">' + (item.addon === 'black-velvet' ? 'Black Velvet Hands' : 'Navy Velvet Hands') + (isBulk ? ' <em>(free!)</em>' : ' +35 QAR') + '</span>'
        : '';
      const filledNames = (item.names || []).filter(n => n.trim());
      const missingCount = item.qty - filledNames.length;
      const namesHtml = filledNames.length > 0
        ? '<div class="ci-names">'
          + filledNames.map((n, i) => '<span class="ci-name-tag">' + (i+1) + '. ' + n + '</span>').join('')
          + (missingCount > 0 ? '<span class="ci-name-missing">' + missingCount + ' name(s) pending — edit below</span>' : '')
          + '</div>'
        : '<div class="ci-names-empty"><span>\u270f\ufe0f ' + item.qty + ' name(s) needed — <button class="ci-edit-names" data-idx="' + idx + '">Add names</button></span></div>';
      return '<div class="cart-item" data-idx="' + idx + '">'
        + '<div class="ci-info">'
        + '<div class="ci-name">' + item.name + '</div>'
        + '<div class="ci-meta">Size: ' + item.size.toUpperCase() + ' \u00b7 ' + basePrice + ' QAR each</div>'
        + addonLabel
        + namesHtml
        + '</div>'
        + '<div class="ci-controls">'
        + '<button class="ci-qty-btn" data-action="dec" data-idx="' + idx + '" aria-label="Decrease">\u2212</button>'
        + '<span class="ci-qty">' + item.qty + '</span>'
        + '<button class="ci-qty-btn" data-action="inc" data-idx="' + idx + '" aria-label="Increase">+</button>'
        + '<button class="ci-remove" data-idx="' + idx + '" aria-label="Remove">\u2715</button>'
        + '</div>'
        + '<div class="ci-total">' + lineTotal.toLocaleString() + ' QAR</div>'
        + '</div>';
    }).join('');

    cartItemsEl.querySelectorAll('[data-action="inc"]').forEach(btn => {
      btn.addEventListener('click', () => { cart[+btn.dataset.idx].qty++; renderCart(); });
    });
    cartItemsEl.querySelectorAll('[data-action="dec"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.idx;
        cart[idx].qty--;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        renderCart();
      });
    });
    cartItemsEl.querySelectorAll('.ci-remove').forEach(btn => {
      btn.addEventListener('click', () => { cart.splice(+btn.dataset.idx, 1); renderCart(); });
    });
    cartItemsEl.querySelectorAll('.ci-edit-names').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.idx;
        const item = cart[idx];
        closeCart();
        showQuickAdd(item.set, item.name, item.priceEach);
        cart.splice(idx, 1);
      });
    });

    let trueSubtotal = 0;
    let addonSaving  = 0;
    cart.forEach(item => {
      const addonCost = item.addon && !isBulk ? 35 : 0;
      trueSubtotal += (basePrice + addonCost) * item.qty;
      if (isBulk && item.addon) addonSaving += 35 * item.qty;
    });

    const deliveryFee = parseInt(deliverySelEl ? deliverySelEl.value : 15) || 0;
    if (cartSubtotalEl)  cartSubtotalEl.textContent = trueSubtotal.toLocaleString() + ' QAR';
    if (cartDeliveryEl)  cartDeliveryEl.textContent = deliveryFee === 0 ? 'Free' : deliveryFee + ' QAR';
    if (cartTotalEl)     cartTotalEl.textContent    = (trueSubtotal + deliveryFee).toLocaleString() + ' QAR';
    if (addonRowEl)      addonRowEl.style.display   = addonSaving > 0 ? '' : 'none';
    if (addonSavingEl)   addonSavingEl.textContent  = '\u2013' + addonSaving + ' QAR';

    let tierNote = '';
    if (totalQty < 10)       tierNote = '<div class="cart-tier-note">Add ' + (10 - totalQty) + ' more for bulk pricing (199 QAR each)</div>';
    else if (totalQty < 41)  tierNote = '<div class="cart-tier-note cart-tier-active">\uD83C\uDF89 Bulk price applied: 199 QAR/set \u00b7 Velvet add-ons free!</div>';
    else if (totalQty < 101) tierNote = '<div class="cart-tier-note cart-tier-active">\uD83C\uDF89 Large bulk: 175 QAR/set \u00b7 Velvet add-ons free!</div>';
    else                     tierNote = '<div class="cart-tier-note cart-tier-active">\uD83C\uDF89 Best price: 150 QAR/set \u00b7 Velvet add-ons free!</div>';

    cartItemsEl.insertAdjacentHTML('beforeend', tierNote);
  }

  /* Quick-add modal */
  function showQuickAdd(setId, setName, price, preSize) {
    const existing = document.getElementById('quickAddModal');
    if (existing) existing.remove();

    const addonHtml = setId === 'set1'
      ? '<label class="qa-label">Velvet Hands Add-On <span class="qa-label-note">+35 QAR</span></label>'
        + '<select class="qa-select" id="qaAddon"><option value="">No add-on</option>'
        + '<option value="black-velvet">Black Velvet Hands (+35 QAR)</option></select>'
      : setId === 'set2'
      ? '<label class="qa-label">Velvet Hands Add-On <span class="qa-label-note">+35 QAR</span></label>'
        + '<select class="qa-select" id="qaAddon"><option value="">No add-on</option>'
        + '<option value="navy-velvet">Navy-Blue Velvet Hands (+35 QAR)</option></select>'
      : '<input type="hidden" id="qaAddon" value="">';

    const modal = document.createElement('div');
    modal.id = 'quickAddModal';
    modal.className = 'modal-overlay';
    modal.innerHTML =
      '<div class="modal-box quick-add-box">'
      + '<button class="modal-x" id="qaClose">\u2715</button>'
      + '<p class="qa-eyebrow">Customise Your Order</p>'
      + '<h3 class="qa-title">' + setName + '</h3>'
      + '<p class="qa-price">From <strong>150 QAR</strong> / set</p>'

      + '<div class="qa-row-2col">'
      + '<div>'
      + '<label class="qa-label">Size</label>'
      + '<select class="qa-select" id="qaSize">'
      + '<option value="" disabled selected>Select\u2026</option>'
      + '<option value="xs">XS \u2014 48\u2033</option>'
      + '<option value="s">S \u2014 50\u2033</option>'
      + '<option value="m">M \u2014 52\u2033</option>'
      + '<option value="l">L \u2014 54\u2033</option>'
      + '<option value="xl">XL \u2014 56\u2033</option>'
      + '</select>'
      + '</div>'
      + '<div>'
      + '<label class="qa-label">Quantity <span class="qa-label-note">(max 9 online)</span></label>'
      + '<div class="qa-qty-row">'
      + '<button class="qa-qty-btn" id="qaMinus">\u2212</button>'
      + '<input type="number" class="qa-qty-input" id="qaQty" value="1" min="1" max="9">'
      + '<button class="qa-qty-btn" id="qaPlus">+</button>'
      + '</div>'
      + '</div>'
      + '</div>'

      + '<div id="qaBulkBanner" style="display:none;margin:12px 0 4px;padding:12px 14px;background:#fdf8ee;border:1px solid var(--gold);font-size:11px;line-height:1.6;color:var(--text-dark)">'
      + '🎁 <strong>Ordering 10 or more?</strong> You qualify for bulk pricing from <strong>199 QAR/set</strong> with free velvet add-ons. '
      + '<a id="qaBulkWaLink" href="https://wa.me/97450393653?text=Hi%20D%C3%A9corous%20Plus%20%E2%80%94%20I%27d%20like%20a%20bulk%20quote%20for%2010%2B%20sets." target="_blank" rel="noopener" style="color:var(--gold);font-weight:700;text-decoration:underline">Message us on WhatsApp →</a>'
      + '</div>'

      + addonHtml

      + '<div id="qaNamesSection">'
      + '<div class="qa-names-header">'
      + '<label class="qa-label">Names for Sash Embroidery</label>'
      + '<span class="qa-names-hint">Arabic \u2022 one per robe</span>'
      + '</div>'
      + '<div id="qaNamesList"></div>'
      + '</div>'

      + '<button class="qa-confirm" id="qaConfirm">Add to Cart</button>'
      + '<p class="qa-note">\u2139\ufe0f Names are embroidered on the sash. Leave blank to provide later via WhatsApp.</p>'
      + '</div>';

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('open'), 10);

    /* Pre-select size if passed from robes page */
    if (preSize) {
      const sizeEl = modal.querySelector('#qaSize');
      if (sizeEl) { sizeEl.value = preSize; }
    }

    const qtyInput   = modal.querySelector('#qaQty');
    const namesList  = modal.querySelector('#qaNamesList');

    const MAX_QTY = 9;
    const bulkBanner = modal.querySelector('#qaBulkBanner');

    function buildNameFields() {
      const qty = Math.min(parseInt(qtyInput.value) || 1, MAX_QTY);
      const existing = Array.from(namesList.querySelectorAll('.qa-name-input')).map(i => i.value);
      namesList.innerHTML = '';
      for (let n = 0; n < qty; n++) {
        const wrap = document.createElement('div');
        wrap.className = 'qa-name-row';
        wrap.innerHTML = '<span class="qa-name-num">' + (n + 1) + '</span>'
          + '<input type="text" class="qa-name-input" placeholder="\u0627\u0643\u062a\u0628 \u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u2026" dir="auto" maxlength="40" value="' + (existing[n] || '') + '">';
        namesList.appendChild(wrap);
      }
      if (bulkBanner) bulkBanner.style.display = qty >= MAX_QTY ? '' : 'none';
    }

    buildNameFields();

    function updateQty(delta) {
      const cur = parseInt(qtyInput.value) || 1;
      const next = Math.max(1, Math.min(MAX_QTY, cur + delta));
      qtyInput.value = next;
      buildNameFields();
      const plusBtn = modal.querySelector('#qaPlus');
      if (plusBtn) plusBtn.disabled = next >= MAX_QTY;
    }

    /* Sync typed values too */
    qtyInput.addEventListener('input', () => {
      let v = parseInt(qtyInput.value) || 1;
      if (v > MAX_QTY) { v = MAX_QTY; qtyInput.value = MAX_QTY; }
      if (v < 1) { v = 1; qtyInput.value = 1; }
      buildNameFields();
      const plusBtn = modal.querySelector('#qaPlus');
      if (plusBtn) plusBtn.disabled = v >= MAX_QTY;
    });

    modal.querySelector('#qaMinus').addEventListener('click', () => updateQty(-1));
    modal.querySelector('#qaPlus').addEventListener('click',  () => updateQty(+1));

    function dismissModal() {
      modal.classList.remove('open');
      setTimeout(() => modal.remove(), 300);
    }
    modal.querySelector('#qaClose').addEventListener('click', dismissModal);
    modal.addEventListener('click', e => { if (e.target === modal) dismissModal(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { dismissModal(); document.removeEventListener('keydown', onKey); }
    });

    modal.querySelector('#qaConfirm').addEventListener('click', () => {
      const size  = modal.querySelector('#qaSize').value;
      const qty   = parseInt(qtyInput.value) || 1;
      const addon = modal.querySelector('#qaAddon').value;
      const names = Array.from(namesList.querySelectorAll('.qa-name-input')).map(i => i.value.trim());

      if (!size) {
        const sel = modal.querySelector('#qaSize');
        sel.style.borderColor = 'var(--gold)';
        sel.focus();
        return;
      }

      // Always add as new line item (names make each entry unique)
      cart.push({ id: Date.now(), set: setId, name: setName, qty, size, addon, names, priceEach: price });

      dismissModal();
      renderCart();
      openCart();
    });
  }

  /* Bind product Add to Cart buttons */
  window.showQuickAdd = showQuickAdd; // expose for robes.js
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => showQuickAdd(btn.dataset.set, btn.dataset.name, parseInt(btn.dataset.price)));
  });

  /* Checkout */
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      const totalQty  = totalCartQty();
      const basePrice = getBasePrice(totalQty);
      const isBulk    = totalQty >= 10;
      const deliveryFee = parseInt(deliverySelEl ? deliverySelEl.value : 15) || 0;
      let trueSubtotal = 0;
      cart.forEach(item => {
        trueSubtotal += (basePrice + (item.addon && !isBulk ? 35 : 0)) * item.qty;
      });
      const total   = trueSubtotal + deliveryFee;
      const lines = cart.map(i => {
        const nameList = (i.names || []).filter(n => n.trim());
        const nameStr = nameList.length > 0
          ? '\n   Names: ' + nameList.map((n, idx) => (idx+1) + '. ' + n).join(' | ')
          : '\n   Names: TBD via WhatsApp';
        const addonStr = i.addon ? ' + ' + (i.addon === 'black-velvet' ? 'Black Velvet' : 'Navy Velvet') : '';
        return '\u2022 ' + i.name + ' (Size ' + i.size.toUpperCase() + addonStr + ') x' + i.qty + nameStr;
      });
      const waText = encodeURIComponent(
        'Hello! I\'d like to place an order:\n\n'
        + lines.join('\n\n')
        + '\n\nDelivery: ' + (deliveryFee === 0 ? 'Free' : deliveryFee + ' QAR')
        + '\nTotal: ' + total.toLocaleString() + ' QAR'
      );
      const modalBody = document.getElementById('modalBody');
      if (modalBody) {
        modalBody.innerHTML = lines.map(l => '<div style="margin-bottom:10px;white-space:pre-wrap;font-size:13px">' + l + '</div>').join('')
          + '<div style="margin-top:14px;font-weight:600">Total: ' + total.toLocaleString() + ' QAR</div>';
      }
      const waBtn = document.getElementById('modalWaBtn');
      if (waBtn) waBtn.href = 'https://wa.me/97450393653?text=' + waText;
      const checkoutModal = document.getElementById('checkoutModal');
      if (checkoutModal) checkoutModal.style.display = 'flex';
      closeCart();
      cart = [];
      renderCart();
    });
  }

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      document.getElementById('checkoutModal').style.display = 'none';
    });
  }

  renderCart();

  /* ── ORDER FORM (pricing.html) ── */
  const form  = document.getElementById('order-form');
  const toast = document.getElementById('toast');

  if (form) {
    const qtyInput    = document.getElementById('quantity');
    const priceOutput = document.getElementById('estimated-price');
    const addonSelect = document.getElementById('addon');

    function updatePrice() {
      if (!qtyInput || !priceOutput) return;
      const qty      = parseInt(qtyInput.value) || 1;
      const isBulk   = qty >= 10;
      const addonAmt = addonSelect && addonSelect.value !== '' && !isBulk ? 35 : 0;
      const base     = getBasePrice(qty);
      const total    = (base + addonAmt) * qty;
      const freeNote = isBulk && addonSelect && addonSelect.value !== '' ? ' <span style="color:var(--gold-light);font-size:12px">(velvet add-on free for bulk!)</span>' : '';
      priceOutput.innerHTML = 'Estimated total: ' + total.toLocaleString() + ' QAR (' + (base + addonAmt) + ' QAR \xd7 ' + qty + ')' + freeNote;
    }

    if (qtyInput)    qtyInput.addEventListener('input', updatePrice);
    if (addonSelect) addonSelect.addEventListener('change', updatePrice);
    updatePrice();

    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('\u2713 Order submitted! We\'ll contact you on WhatsApp shortly.');
      form.reset();
      updatePrice();
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 4500);
  }

  /* ── ANNOUNCEMENT BAR ── */
  (function() {
    const bar   = document.getElementById('announceBar');
    const close = document.getElementById('announceClose');
    if (!bar) return;
    document.body.classList.add('has-announce');
    if (close) {
      close.addEventListener('click', () => {
        bar.classList.add('hidden');
        document.body.classList.remove('has-announce');
      });
    }
  })();

  /* ── BULK POPUP ── */
  (function() {
    const popup = document.getElementById('bulkPopup');
    const closeBtn = document.getElementById('bulkPopupClose');
    if (!popup) return;
    setTimeout(() => { popup.style.display = 'flex'; }, 2500);
    if (closeBtn) closeBtn.addEventListener('click', () => { popup.style.display = 'none'; });
    popup.addEventListener('click', e => { if (e.target === popup) popup.style.display = 'none'; });
  })();



});

/* ── INCLUDED SLIDESHOW ── */
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

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));
  setup();
  window.addEventListener('resize', setup);
  setInterval(() => { if (isMobile()) goTo(current + 1); }, 4000);
})();

/* ══════════════════════════════════════════════════════════════
   ROBE DETAIL MODAL  (was robes.js — merged after page removal)
══════════════════════════════════════════════════════════════ */
(function() {

  const ROBE_DATA = {
    set1: {
      name: 'Black Classic Set',
      badge: 'Most Popular',
      badgeClass: 'product-badge-popular',
      tagline: 'The definitive graduation statement.',
      images: ['assets/images/set1-3.webp','assets/images/set1-4.webp','assets/images/set1-1.webp','assets/images/set1-2.webp','assets/images/size-reference.png'],
      sash: 'Gold sash with Arabic name embroidery',
      hat: 'Classic mortarboard with gold tassel',
      addon: true,
      details: ['Premium flowing fabric','Gold sash with personalised Arabic name','Classic mortarboard — gold tassel','Velvet hands add-on available'],
    },
    set2: {
      name: 'Navy Blue Set',
      badge: 'Most Popular',
      badgeClass: 'product-badge-navy',
      tagline: 'Refined. Distinguished. Unforgettable.',
      images: ['assets/images/set2-3.webp','assets/images/set2-4.webp','assets/images/set2-1.webp','assets/images/set2-2.webp','assets/images/size-reference.png'],
      sash: 'Navy sash with silver Arabic name embroidery',
      hat: 'Classic mortarboard with silver tassel',
      addon: true,
      details: ['Premium flowing fabric','Navy sash with silver Arabic name embroidery','Classic mortarboard — silver tassel','Velvet hands add-on available'],
    },
    set3: {
      name: 'White Ivory Set',
      badge: null,
      images: ['assets/images/set3-1.webp','assets/images/set3-2.webp','assets/images/size-reference.png'],
      sash: 'Grey sash · Black writing · Silver brooche',
      hat: 'Classic mortarboard with silver tassel',
      addon: false,
      details: ['Crisp ivory flowing fabric','Grey sash with black Arabic name embroidery','Classic mortarboard — silver tassel'],
    },
    set4: {
      name: 'Brown Earthy Set',
      badge: null,
      images: ['assets/images/set4-1.webp','assets/images/set4-2.webp','assets/images/size-reference.png'],
      sash: 'White sash · Black writing · Brooche',
      hat: 'Classic mortarboard with gold tassel',
      addon: false,
      details: ['Rich earthy-tone fabric','White sash with black Arabic name embroidery','Classic mortarboard — gold tassel'],
    },
    set5: {
      name: 'Maroon Heritage Set',
      badge: null,
      images: ['assets/images/set5-1.webp','assets/images/set5-2.webp','assets/images/size-reference.png'],
      sash: 'White sash · Black writing · White brooche',
      hat: 'Classic mortarboard with gold tassel',
      addon: false,
      details: ['Deep maroon flowing fabric','White sash with black Arabic name embroidery','Classic mortarboard — gold tassel'],
    },
    set6: {
      name: 'Dark Purple Set',
      badge: null,
      images: ['assets/images/set6-1.webp','assets/images/set6-2.webp','assets/images/size-reference.png'],
      sash: 'Black sash · White writing · White brooche',
      hat: 'Classic mortarboard with gold tassel',
      addon: false,
      details: ['Luxurious dark purple flowing fabric','Black sash with white Arabic name embroidery','Classic mortarboard — gold tassel'],
    },
  };

  const SIZES = [
    { code:'xs', label:'XS', length:'48″ / 122cm', chest:'Up to 34″', fits:'Petite frames' },
    { code:'s',  label:'S',  length:'50″ / 127cm', chest:'34–36″',    fits:'Slim / average' },
    { code:'m',  label:'M',  length:'52″ / 132cm', chest:'36–40″',    fits:'Average / regular' },
    { code:'l',  label:'L',  length:'54″ / 137cm', chest:'40–44″',    fits:'Tall / broad' },
    { code:'xl', label:'XL', length:'56″ / 142cm', chest:'44″+',      fits:'XL frames' },
  ];

  function openRobeModal(setId) {
    const d = ROBE_DATA[setId];
    if (!d) return;

    const existing = document.getElementById('robeDetailModal');
    if (existing) existing.remove();

    let activeImg = 0;

    const thumbsHtml = d.images.map((src, i) =>
      '<div class="rm-thumb' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '" style="background-image:url(\'' + src + '\')"></div>'
    ).join('');

    const detailsHtml = d.details.map(item =>
      '<div class="rm-detail-item">' + item + '</div>'
    ).join('');

    const addonHtml = d.addon
      ? '<div class="rm-addon-box"><div class="rm-addon-title">Optional Add-On</div><p class="rm-addon-price">Velvet Hands: <strong>+35 QAR</strong> · <span style="color:#25d366;font-weight:600">Free with 10+ pieces</span></p></div>'
      : '';

    const badgeHtml = d.badge
      ? '<span class="rm-badge ' + (d.badgeClass || '') + '">' + d.badge + '</span>'
      : '';

    const sizesHtml = SIZES.map(s =>
      '<tr><td>' + s.label + '</td><td>' + s.length + '</td><td>' + s.chest + '</td><td>' + s.fits + '</td></tr>'
    ).join('');

    const overlay = document.createElement('div');
    overlay.id = 'robeDetailModal';
    overlay.className = 'robe-modal-overlay';
    overlay.innerHTML =
      '<div class="robe-modal-box">' +
        '<button class="robe-modal-close" id="rmClose" aria-label="Close">\u2715</button>' +
        '<div class="robe-modal-inner">' +
          '<div class="rm-layout">' +

            // Left: image gallery
            '<div class="rm-gallery">' +
              '<div class="rm-main-img-wrap">' +
                '<img src="' + d.images[0] + '" class="rm-main-img" id="rmMainImg" alt="' + d.name + '">' +
              '</div>' +
              '<div class="rm-thumbs" id="rmThumbs">' + thumbsHtml + '</div>' +
            '</div>' +

            // Right: info
            '<div class="rm-info">' +
              badgeHtml +
              '<h2 class="rm-title">' + d.name + '</h2>' +
              '<p class="rm-tagline">' + (d.tagline || '') + '</p>' +
              '<ul class="rm-details">' + detailsHtml + '</ul>' +
              '<div class="rm-detail-item"><strong>Sash:</strong> ' + d.sash + '</div>' +
              '<div class="rm-detail-item"><strong>Hat:</strong> ' + d.hat + '</div>' +
              addonHtml +
              '<p class="rm-price">From <strong>150 QAR</strong> · per set</p>' +
              '<button class="rm-add-cart" id="rmAddBtn">Add to Cart</button>' +
            '</div>' +

          '</div>' +

          // Size chart
          '<div class="rm-size-section">' +
            '<div class="rm-size-title">Size Guide</div>' +
            '<table class="rm-size-table">' +
              '<thead><tr><th>Size</th><th>Robe Length</th><th>Chest</th><th>Best For</th></tr></thead>' +
              '<tbody>' + sizesHtml + '</tbody>' +
            '</table>' +
            '<p class="rm-size-note">Sizes are approximate. When between sizes, size up. The robe drapes — a little extra length is always better.</p>' +
          '</div>' +

        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('open'), 10);

    // Thumbnail switching
    overlay.querySelectorAll('.rm-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        activeImg = +thumb.dataset.idx;
        overlay.querySelector('#rmMainImg').src = d.images[activeImg];
        overlay.querySelectorAll('.rm-thumb').forEach((t, i) => t.classList.toggle('active', i === activeImg));
      });
    });

    // Close
    function closeModal() {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 300);
    }
    overlay.querySelector('#rmClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', onKey); }
    });

    // Add to cart from modal
    overlay.querySelector('#rmAddBtn').addEventListener('click', () => {
      closeModal();
      setTimeout(() => {
        if (typeof window.showQuickAdd === 'function') {
          window.showQuickAdd(setId, d.name, 329);
        }
      }, 320);
    });
  }

  // Bind all "Details & Size Chart" buttons
  document.querySelectorAll('.btn-robe-detail').forEach(btn => {
    btn.addEventListener('click', () => openRobeModal(btn.dataset.robe));
  });

  // Also bind the hover CTA on the card image
  document.querySelectorAll('.robe-hover-cta').forEach(cta => {
    cta.addEventListener('click', e => {
      const card = cta.closest('[data-robe]');
      if (card) openRobeModal(card.dataset.robe);
    });
  });

})();
