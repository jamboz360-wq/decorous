/* ============================================================
   Décorous Plus — Signature Robes Page JavaScript
   ============================================================ */

const ROBE_DATA = {
  set1: {
    name: 'Black Classic Set',
    badge: 'Best Seller · Most Popular',
    tagline: 'The definitive graduation statement.',
    color: '#111111',
    images: [
      'assets/images/set1-1.webp',
      'assets/images/set1-2.webp',
      'assets/images/set1-3.webp',
      'assets/images/set1-4.webp',
    ],
    sash: 'Gold sash with Arabic name embroidery',
    hat: 'Classic mortarboard with gold tassel',
    addon: { available: true, black: 'assets/images/addon-velvet-black.png', navy: 'assets/images/addon-velvet-navy.png' },
    details: ['Premium flowing fabric', 'Gold sash with personalised Arabic name', 'Classic mortarboard — gold tassel', 'Velvet hands add-on available'],
  },
  set2: {
    name: 'Navy Blue Set',
    badge: 'Most Popular',
    tagline: 'Refined. Distinguished. Unforgettable.',
    color: '#1a2a4a',
    images: [
      'assets/images/set2-1.webp',
      'assets/images/set2-2.webp',
      'assets/images/set2-3.webp',
      'assets/images/set2-4.webp',
    ],
    sash: 'Navy sash with silver Arabic name embroidery',
    hat: 'Classic mortarboard with silver tassel',
    addon: { available: true, black: 'assets/images/addon-velvet-black.png', navy: 'assets/images/addon-velvet-navy.png' },
    details: ['Premium flowing fabric', 'Navy sash with silver Arabic name embroidery', 'Classic mortarboard — silver tassel', 'Velvet hands add-on available'],
  },
  set3: {
    name: 'White Ivory Set',
    badge: null,
    tagline: 'Pure elegance for your proudest moment.',
    color: '#f0f0f0',
    images: [
      'assets/images/set3-1.webp',
      'assets/images/set3-2.webp',
    ],
    sash: 'Grey sash · Black writing · Silver brooche',
    hat: 'Classic mortarboard with silver tassel',
    addon: { available: false },
    details: ['Crisp ivory flowing fabric', 'Grey sash with black Arabic name embroidery', 'Classic mortarboard — silver tassel'],
  },
  set4: {
    name: 'Brown Earthy Set',
    badge: null,
    tagline: 'Warmth and sophistication, crafted to order.',
    color: '#6b4c2a',
    images: [
      'assets/images/set4-1.webp',
      'assets/images/set4-2.webp',
    ],
    sash: 'White sash · Black writing · Brooche',
    hat: 'Classic mortarboard with gold tassel',
    addon: { available: false },
    details: ['Rich earthy-tone fabric', 'White sash with black Arabic name embroidery', 'Classic mortarboard — gold tassel'],
  },
  set5: {
    name: 'Maroon Heritage Set',
    badge: null,
    tagline: 'Deep tones that honour tradition.',
    color: '#7a1e2e',
    images: [
      'assets/images/set5-1.webp',
      'assets/images/set5-2.webp',
    ],
    sash: 'White sash · Black writing · White brooche',
    hat: 'Classic mortarboard with gold tassel',
    addon: { available: false },
    details: ['Deep maroon flowing fabric', 'White sash with black Arabic name embroidery', 'Classic mortarboard — gold tassel'],
  },
  set6: {
    name: 'Dark Purple Set',
    badge: null,
    tagline: 'Bold. Regal. Distinctly yours.',
    color: '#3b1f5e',
    images: [
      'assets/images/set6-1.webp',
      'assets/images/set6-2.webp',
    ],
    sash: 'Black sash · White writing · White brooche',
    hat: 'Classic mortarboard with gold tassel',
    addon: { available: false },
    details: ['Luxurious dark purple flowing fabric', 'Black sash with white Arabic name embroidery', 'Classic mortarboard — gold tassel'],
  },
};

const SIZE_CHART = [
  { size: 'XS', length: '48″', cm: '122cm', height: '150–160cm', chest: 'Up to 86cm' },
  { size: 'S',  length: '50″', cm: '127cm', height: '160–168cm', chest: '87–96cm'   },
  { size: 'M',  length: '52″', cm: '132cm', height: '168–175cm', chest: '97–106cm'  },
  { size: 'L',  length: '54″', cm: '137cm', height: '175–182cm', chest: '107–116cm' },
  { size: 'XL', length: '56″', cm: '142cm', height: '182–190cm', chest: '117–126cm' },
];

/* ── Open / close robe modal ── */
const robeModal    = document.getElementById('robeModal');
const robeModalBox = document.getElementById('robeModalBox');
const robeModalInner = document.getElementById('robeModalInner');
const robeModalClose = document.getElementById('robeModalClose');

function openRobeModal(setId) {
  const robe = ROBE_DATA[setId];
  if (!robe) return;

  let activeImg = 0;

  const addonSection = robe.addon.available
    ? `<div class="rm-addon-box">
        <p class="rm-addon-title">✦ Velvet Hands Add-On</p>
        <div class="rm-addon-imgs">
          <div class="rm-addon-item"><img src="${robe.addon.black}" alt="Black Velvet Hands"><span>Black Velvet</span></div>
          <div class="rm-addon-item"><img src="${robe.addon.navy}" alt="Navy Velvet Hands"><span>Navy Velvet</span></div>
        </div>
        <p class="rm-addon-price"><strong>Free</strong> with 10+ orders · <strong>+QR 35</strong> for under 10</p>
      </div>`
    : '';

  const sizeRows = SIZE_CHART.map(s =>
    `<tr><td><strong>${s.size}</strong></td><td>${s.length}</td><td>${s.cm}</td><td>${s.height}</td><td>${s.chest}</td></tr>`
  ).join('');

  const thumbsHtml = robe.images.map((img, i) =>
    `<button class="rm-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}" style="background-image:url(${img})"></button>`
  ).join('');

  robeModalInner.innerHTML = `
    <div class="rm-layout">

      <div class="rm-gallery">
        <div class="rm-main-img-wrap">
          <img class="rm-main-img" id="rmMainImg" src="${robe.images[0]}" alt="${robe.name}">
        </div>
        <div class="rm-thumbs">${thumbsHtml}</div>
      </div>

      <div class="rm-info">
        ${robe.badge ? `<span class="rm-badge">${robe.badge}</span>` : ''}
        <h2 class="rm-title">${robe.name}</h2>
        <p class="rm-tagline">${robe.tagline}</p>
        <p class="rm-price">From <strong>329 QAR</strong> / set &nbsp;·&nbsp; Bulk from <strong>150 QAR</strong></p>

        <div class="rm-details">
          ${robe.details.map(d => `<div class="rm-detail-item">✓ ${d}</div>`).join('')}
        </div>

        ${addonSection}

        <div class="rm-order-row">
          <button class="rm-add-cart btn-add-cart" data-set="${setId}" data-name="${robe.name}" data-price="329">Add to Cart</button>
          <a href="https://wa.me/97450393653?text=Hi%21%20I%27m%20interested%20in%20the%20${encodeURIComponent(robe.name)}." target="_blank" rel="noopener" class="rm-wa-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.02 0C5.42 0 .06 5.36.06 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.19-1.62a11.95 11.95 0 0 0 5.82 1.48h.01c6.6 0 11.96-5.36 11.96-11.97 0-3.2-1.24-6.2-3.46-8.41Z"/></svg>
            Enquire
          </a>
        </div>
      </div>
    </div>

    <div class="rm-size-section">
      <h3 class="rm-size-title">📏 Size Chart — Select Before Adding to Cart</h3>
      <div class="rm-size-selector">
        ${SIZE_CHART.map(s =>
          `<button class="rm-size-btn" data-size="${s.size.toLowerCase()}">
            <span class="rsb-size">${s.size}</span>
            <span class="rsb-len">${s.length}</span>
            <span class="rsb-height">${s.height}</span>
          </button>`
        ).join('')}
      </div>
      <div class="rm-size-table-wrap">
        <table class="rm-size-table">
          <thead><tr><th>Size</th><th>Length</th><th>cm</th><th>Height Guide</th><th>Chest Guide</th></tr></thead>
          <tbody>${sizeRows}</tbody>
        </table>
      </div>
      <p class="rm-size-note">💡 Not sure? We recommend measuring from shoulder to floor while wearing formal shoes. <a href="https://wa.me/97450393653?text=Hi%21%20Can%20you%20help%20me%20choose%20the%20right%20robe%20size%3F" target="_blank" rel="noopener">Ask us on WhatsApp</a>.</p>
    </div>
  `;

  /* Thumbnail switching */
  robeModalInner.querySelectorAll('.rm-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      activeImg = +btn.dataset.idx;
      document.getElementById('rmMainImg').src = robe.images[activeImg];
      robeModalInner.querySelectorAll('.rm-thumb').forEach((t, i) => t.classList.toggle('active', i === activeImg));
    });
  });

  /* Size selector highlight */
  robeModalInner.querySelectorAll('.rm-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      robeModalInner.querySelectorAll('.rm-size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  /* Re-bind Add to Cart inside modal */
  robeModalInner.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      /* Find selected size, pass it as preselected */
      const selectedSizeBtn = robeModalInner.querySelector('.rm-size-btn.selected');
      const preSize = selectedSizeBtn ? selectedSizeBtn.dataset.size : null;
      closeRobeModal();
      if (typeof showQuickAdd === 'function') {
        showQuickAdd(btn.dataset.set, btn.dataset.name, parseInt(btn.dataset.price), preSize);
      }
    });
  });

  robeModal.setAttribute('aria-hidden', 'false');
  robeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRobeModal() {
  robeModal.classList.remove('open');
  robeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (robeModalClose) robeModalClose.addEventListener('click', closeRobeModal);
if (robeModal) robeModal.addEventListener('click', e => { if (e.target === robeModal) closeRobeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRobeModal(); });

/* Bind all "Size Chart & Details" buttons */
document.querySelectorAll('.btn-robe-detail').forEach(btn => {
  btn.addEventListener('click', () => openRobeModal(btn.dataset.robe));
});

/* Bind robe card click (image area) */
document.querySelectorAll('.robe-card .robe-img-wrap').forEach(wrap => {
  wrap.style.cursor = 'pointer';
  wrap.addEventListener('click', () => {
    const card = wrap.closest('.robe-card');
    if (card) openRobeModal(card.dataset.robe);
  });
});
