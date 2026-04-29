/* =============================================
   DÉCOROUS PLUS — Main JavaScript
   ============================================= */

'use strict';

// ---- CART STATE ----
const CART_KEY = 'decorous_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

const ZONES = [
  { name: 'Doha & Greater Doha', fee: 30 },
  { name: 'Al Rayyan / Al Waab / Al Aziziya', fee: 30 },
  { name: 'West Bay / Lusail / Al Dafna', fee: 30 },
  { name: 'Ras Abu Fontas / Industrial Area', fee: 40 },
  { name: 'Jelaiah / Lusail North / Umm Salal', fee: 40 },
  { name: 'Al Wakrah / Al Wukair', fee: 40 },
  { name: 'Al Khor / Simaisma / Al Thakhira', fee: 50 },
  { name: 'Al Shahaniya / Mesaieed / Al Kharrara', fee: 50 },
  { name: 'North Qatar / Dukhan / Umm Bab / Far areas', fee: 70 },
  { name: 'Pickup — Free', fee: 0 },
];

let selectedZone = 0;

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  cart.push(item);
  saveCart();
  updateCartUI();
  showToast(`${item.name} added`, `Size ${item.size} · QR ${(item.price + (item.velvetAddon ? 35 : 0)) * item.qty}`);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartUI();
}

function updateQty(idx, qty) {
  if (qty < 1) { removeFromCart(idx); return; }
  cart[idx].qty = qty;
  saveCart();
  updateCartUI();
}

function cartTotal() {
  return cart.reduce((s, i) => s + (i.price + (i.velvetAddon ? 35 : 0)) * i.qty, 0);
}

function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

// ---- CART UI ----
function updateCartUI() {
  const count = cartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderCartItems();
  renderCartSummary();
}

function renderCartItems() {
  const list = document.getElementById('cartItemsList');
  const empty = document.getElementById('cartEmpty');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  list.innerHTML = cart.map((item, idx) => {
    const names = (item.sashNames || []).filter(n => n.trim());
    const namesHtml = names.length > 1
      ? `<div class="cart-item-names">${names.map((n, i) => `${i + 1}. ${n}`).join(' · ')}</div>` : '';
    const singleName = names.length === 1 ? ` · ${names[0]}` : '';
    return `
      <div class="cart-item">
        <img src="assets/images/${item.img}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-det">Size ${item.size}${singleName}${item.velvetAddon ? ' · +Velvet' : ''}</div>
          ${namesHtml}
          <div class="cart-item-foot">
            <div class="cart-item-price">QR ${(item.price + (item.velvetAddon ? 35 : 0)) * item.qty}</div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="cart-qty-row">
                <button class="cart-qty-btn" onclick="updateQty(${idx}, ${item.qty - 1})">−</button>
                <div class="cart-qty-num">${item.qty}</div>
                <button class="cart-qty-btn" onclick="updateQty(${idx}, ${item.qty + 1})">+</button>
              </div>
              <button class="cart-rm-btn" onclick="removeFromCart(${idx})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderCartSummary() {
  const sub = cartTotal();
  const fee = ZONES[selectedZone].fee;
  const total = sub + fee;
  const totalSets = cartCount();
  const isBulk = totalSets >= 10;

  const subEl = document.getElementById('cartSub');
  const feeEl = document.getElementById('cartFee');
  const totalEl = document.getElementById('cartTotal');
  if (subEl) subEl.textContent = `QR ${sub}`;
  if (feeEl) {
    feeEl.textContent = fee === 0 ? 'Free' : `QR ${fee}`;
    feeEl.className = `cart-sum-value${fee === 0 ? ' sum-free' : ''}`;
  }
  if (totalEl) totalEl.textContent = `QR ${total}`;

  const paySection = document.getElementById('paySection');
  if (!paySection) return;

  const orderLines = cart.map(i => {
    const names = (i.sashNames || []).filter(n => n.trim());
    const nameStr = names.length ? '\nNames: ' + names.map((n, j) => `${j + 1}. ${n}`).join(', ') : '';
    return `• ${i.name} x${i.qty}, Size ${i.size}${i.velvetAddon ? ', +Velvet' : ''}${nameStr} — QR ${(i.price + (i.velvetAddon ? 35 : 0)) * i.qty}`;
  }).join('\n');

  const waMsg = encodeURIComponent(`Hi Décorous Plus — I'd like to order:\n\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}\nTotal: QR ${total}`);
  const sadadMsg = encodeURIComponent(`Hi Décorous Plus — I'd like to pay via SADAD.\n\nOrder:\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}\nTotal: QR ${total}\n\nPlease send me the SADAD bill number.`);
  const bulkMsg = encodeURIComponent(`Hi Décorous Plus — Bulk order request (${totalSets} sets):\n\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}`);

  if (isBulk) {
    paySection.innerHTML = `
      <div class="pay-label">Bulk order (${totalSets} sets)</div>
      <p style="font-size:13px;color:var(--ink-l);line-height:1.6;margin-bottom:12px;">For 10+ sets we coordinate directly — from QR 199/set, free velvet included.</p>
      <button class="pay-btn bulk" onclick="window.open('https://wa.me/97450393653?text=${bulkMsg}','_blank')">
        ${waIcon()} Get bulk quote on WhatsApp
      </button>`;
  } else {
    paySection.innerHTML = `
      <div class="pay-label">Payment method</div>
      <button class="pay-btn sadad" onclick="window.open('https://wa.me/97450393653?text=${sadadMsg}','_blank')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        Request SADAD bill · QR ${total}
      </button>
      <button class="pay-btn whatsapp" style="margin-top:8px;" onclick="window.open('https://wa.me/97450393653?text=${waMsg}','_blank')">
        ${waIcon()} Confirm order on WhatsApp
      </button>`;
  }
}

function waIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.1-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.083-1.12l-.29-.174-3.027.783.804-2.946-.19-.302A8 8 0 1112 20z"/></svg>`;
}

// ---- ZONE SELECTION ----
function selectZone(idx) {
  selectedZone = idx;
  document.querySelectorAll('.zone-chip').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  renderCartSummary();
}

// ---- CART DRAWER ----
function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

// ---- PRODUCT MODAL ----
let modalProduct = null;
let modalSize = 'M';
let modalQty = 1;
let modalSashes = [''];
let modalVelvet = false;
let modalGalleryIdx = 0;
let modalTab = 'order';

const PRODUCTS = [
  { id: 1, name: 'Black Classic', set: 'Set 1', sash: 'Gold sash', price: 329, bestseller: true,
    img: 'product-set-black.png',
    gallery: ['set1-1.webp','set1-2.webp','set1-3.webp','set1-4.webp'],
    velvet: true, velvetImg: 'addon-velvet-black.png' },
  { id: 2, name: 'Navy Blue', set: 'Set 2', sash: 'Silver sash', price: 329,
    img: 'product-set-navy.png',
    gallery: ['set2-1.webp','set2-2.webp','set2-3.webp','set2-4.webp'],
    velvet: true, velvetImg: 'addon-velvet-navy.png' },
  { id: 3, name: 'White Ivory', set: 'Set 3', sash: 'Grey sash', price: 329,
    img: 'product-set-white.png', gallery: ['set3-1.webp','set3-2.webp'], velvet: false },
  { id: 4, name: 'Brown Earthy', set: 'Set 4', sash: 'White sash', price: 329,
    img: 'product-set-brown.png', gallery: ['set4-1.webp','set4-2.webp'], velvet: false },
  { id: 5, name: 'Maroon Heritage', set: 'Set 5', sash: 'White sash', price: 329,
    img: 'product-set-maroon.png', gallery: ['set5-1.webp','set5-2.webp'], velvet: false },
  { id: 6, name: 'Dark Purple', set: 'Set 6', sash: 'Black sash', price: 329,
    img: 'product-set-purple.png', gallery: ['set6-1.webp','set6-2.webp'], velvet: false },
];

function openProductModal(productId) {
  modalProduct = PRODUCTS.find(p => p.id === productId);
  if (!modalProduct) return;
  modalSize = 'M';
  modalQty = 1;
  modalSashes = [''];
  modalVelvet = false;
  modalGalleryIdx = 0;
  modalTab = 'order';
  renderModal();
  document.getElementById('productModal')?.classList.add('open');
}

function closeProductModal() {
  document.getElementById('productModal')?.classList.remove('open');
}

function renderModal() {
  const modal = document.getElementById('productModal');
  if (!modal || !modalProduct) return;
  const p = modalProduct;
  const total = (p.price + (modalVelvet ? 35 : 0)) * modalQty;

  modal.querySelector('.modal-set-label').textContent = `${p.set} · ${p.sash}`;
  modal.querySelector('.modal-name').textContent = p.name;
  modal.querySelector('.modal-price').innerHTML = `QR ${total} <span>total</span>`;

  // Gallery
  const galleryEl = modal.querySelector('.modal-gallery');
  if (galleryEl) {
    galleryEl.innerHTML = p.gallery.map(img =>
      `<img src="assets/images/${img}" alt="${p.name}">`
    ).join('');
    galleryEl.scrollTo({ left: 0 });
  }
  renderModalDots();

  // Tabs
  modal.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('on', t.dataset.tab === modalTab));

  const orderContent = modal.querySelector('#modalOrderContent');
  const sizesContent = modal.querySelector('#modalSizesContent');
  if (orderContent) orderContent.style.display = modalTab === 'order' ? 'block' : 'none';
  if (sizesContent) sizesContent.style.display = modalTab === 'sizes' ? 'block' : 'none';

  // Sizes
  modal.querySelectorAll('.modal-sz').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.size === modalSize);
  });

  // Qty
  const qtyEl = modal.querySelector('.modal-qty-num');
  if (qtyEl) qtyEl.textContent = modalQty;

  // Sash names
  const namesContainer = modal.querySelector('#modalNamesContainer');
  if (namesContainer) {
    if (modalQty === 1) {
      namesContainer.innerHTML = `<input class="form-input" placeholder="e.g. محمد علي — optional" value="${modalSashes[0] || ''}" oninput="updateModalSash(0, this.value)" dir="rtl">`;
    } else {
      namesContainer.innerHTML = `<div class="modal-names-list">${
        Array.from({length: modalQty}, (_, i) => `
          <div class="modal-name-row">
            <div class="modal-name-num">${i + 1}</div>
            <input class="form-input" style="flex:1;" placeholder="Graduate ${i+1} — optional" value="${modalSashes[i] || ''}" oninput="updateModalSash(${i}, this.value)" dir="rtl">
          </div>`).join('')
      }</div>`;
    }
  }

  // Velvet
  const velvetRow = modal.querySelector('#modalVelvetRow');
  if (velvetRow) {
    velvetRow.style.display = p.velvet ? 'flex' : 'none';
    velvetRow.classList.toggle('on', modalVelvet);
    const img = velvetRow.querySelector('img');
    if (img) img.src = `assets/images/${p.velvetImg}`;
    const chk = velvetRow.querySelector('.modal-vcheck');
    if (chk) {
      chk.classList.toggle('on', modalVelvet);
      chk.innerHTML = modalVelvet ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : '';
    }
  }

  // Add btn
  const addBtn = modal.querySelector('.modal-add-btn');
  if (addBtn) addBtn.textContent = `Add to order · QR ${total}`;
}

function renderModalDots() {
  const modal = document.getElementById('productModal');
  if (!modal || !modalProduct) return;
  const dotsEl = modal.querySelector('.modal-gallery-dots');
  if (!dotsEl) return;
  dotsEl.innerHTML = modalProduct.gallery.map((_, i) =>
    `<div class="modal-gdot ${i === modalGalleryIdx ? 'on' : ''}"></div>`
  ).join('');
}

function setModalSize(size) { modalSize = size; renderModal(); }
function setModalQty(qty) {
  modalQty = Math.max(1, Math.min(9, qty));
  modalSashes = Array.from({length: modalQty}, (_, i) => modalSashes[i] || '');
  renderModal();
}
function updateModalSash(idx, val) { modalSashes[idx] = val; }
function toggleModalVelvet() { modalVelvet = !modalVelvet; renderModal(); }
function setModalTab(tab) { modalTab = tab; renderModal(); }

function confirmAddToCart() {
  if (!modalProduct) return;
  addToCart({
    ...modalProduct,
    size: modalSize,
    qty: modalQty,
    sashNames: [...modalSashes],
    velvetAddon: modalVelvet,
  });
  closeProductModal();
}

// ---- GALLERY SCROLL ----
function initGalleryScroll() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  const gallery = modal.querySelector('.modal-gallery');
  if (!gallery) return;
  gallery.addEventListener('scroll', () => {
    modalGalleryIdx = Math.round(gallery.scrollLeft / gallery.offsetWidth);
    renderModalDots();
  });
}

// ---- TOAST ----
function showToast(msg, sub) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <div class="toast-icon">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8922A" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div><div class="toast-msg">${msg}</div><div class="toast-sub">${sub}</div></div>`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ---- ANNOUNCEMENT ----
function closeAnn() {
  const ann = document.getElementById('annBar');
  if (ann) ann.style.display = 'none';
}

// ---- VIEWING WIDGET ----
function initViewing() {
  const els = document.querySelectorAll('.viewing-count');
  let n = 12;
  setInterval(() => {
    n = Math.max(6, Math.min(24, n + (Math.random() < 0.5 ? 1 : -1)));
    els.forEach(el => el.textContent = n);
  }, 4000);
}

// ---- ORDER FORM ----
function initOrderForm() {
  const form = document.getElementById('orderForm');
  if (!form) return;
  let orderQty = 1;

  const qtyNum = document.getElementById('orderQtyNum');
  document.getElementById('orderQtyMinus')?.addEventListener('click', () => {
    orderQty = Math.max(1, orderQty - 1);
    if (qtyNum) qtyNum.textContent = orderQty;
  });
  document.getElementById('orderQtyPlus')?.addEventListener('click', () => {
    orderQty = Math.min(9, orderQty + 1);
    if (qtyNum) qtyNum.textContent = orderQty;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const msg = `Hi Décorous Plus — Order request:\n\nName: ${data.name}\nPhone: ${data.phone}\nSet: ${data.set}\nSize: ${data.size}\nQty: ${orderQty}\nVelvet: ${data.velvet || 'None'}\nArabic name: ${data.arabicName || '—'}\nGrad year: ${data.year || '2025'}\nNotes: ${data.notes || '—'}`;
    window.open(`https://wa.me/97450393653?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initViewing();
  initGalleryScroll();
  initOrderForm();

  // Cart overlay close
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  // Modal overlay close
  document.getElementById('productModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeProductModal();
  });

  // Zone chips
  document.querySelectorAll('.zone-chip').forEach((chip, i) => {
    chip.addEventListener('click', () => selectZone(i));
  });
  document.querySelector('.zone-chip')?.classList.add('active');
});
