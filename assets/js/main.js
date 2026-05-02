/* =============================================
   DÉCOROUS PLUS — Main JavaScript
   ============================================= */

'use strict';

// ---- CART STATE ----
const CART_KEY = 'decorous_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

// Delivery zones grouped by fee tier
const ZONES = [
  { name: 'Zone A — QR 30 (Most of Doha & Al Rayyan)', fee: 30 },
  { name: 'Zone B — QR 40 (Al Wakrah, Lusail, Umm Salal)', fee: 40 },
  { name: 'Zone C — QR 50 (Al Khor, Mesaieed, Al Shahaniya)', fee: 50 },
  { name: 'Zone D — QR 70 (Far North, Dukhan, Abu Samra)', fee: 70 },
];

// Full zone lookup by zone number for reference
const ALL_ZONES = [
  { num: 1, name: 'Al Jasrah', ar: 'الجسرة', fee: 30 },
  { num: 2, name: 'Al Bidda', ar: 'البدع', fee: 30 },
  { num: 3, name: 'Fereej Mohamed Bin Jasim', ar: 'فريج محمد بن جاسم', fee: 30 },
  { num: 4, name: 'Mushayrib', ar: 'مشيرب', fee: 30 },
  { num: 5, name: 'Al Najada / Barahat Al Jufairi', ar: 'النجادة / براحة الجفيري', fee: 30 },
  { num: 6, name: 'Old Al Ghanim', ar: 'الغانم العتيق', fee: 30 },
  { num: 7, name: 'Al Souq', ar: 'السوق', fee: 30 },
  { num: 10, name: 'Wadi Al Sail', ar: 'وادي السيل', fee: 30 },
  { num: 11, name: 'Ar Rumeilah', ar: 'الرميلة', fee: 30 },
  { num: 12, name: 'Al Bidda', ar: 'البدع', fee: 30 },
  { num: 13, name: 'Mushayrib', ar: 'مشيرب', fee: 30 },
  { num: 14, name: 'Fereej Abdel Aziz', ar: 'فريج عبد العزيز', fee: 30 },
  { num: 15, name: 'Ad Dawhah Al Jadeedah', ar: 'الدوحة الجديدة', fee: 30 },
  { num: 16, name: 'Old Al Ghanim', ar: 'الغانم العتيق', fee: 30 },
  { num: 17, name: 'Ar Rufaa / Old Al Hitmi', ar: 'الرفاع / الهتمي العتيق', fee: 30 },
  { num: 18, name: 'As Salatah / Al Mirqab', ar: 'اسلطة / المرقاب', fee: 30 },
  { num: 19, name: 'Doha Port', ar: 'ميناء الدوحة', fee: 30 },
  { num: 20, name: 'Wadi Al Sail', ar: 'وادي السيل', fee: 30 },
  { num: 21, name: 'Ar Rumeilah', ar: 'الرميلة', fee: 30 },
  { num: 22, name: 'Fereej Bin Mahmoud', ar: 'فريج بن محمود', fee: 30 },
  { num: 23, name: 'Fereej Bin Mahmoud', ar: 'فريج بن محمود', fee: 30 },
  { num: 24, name: 'Rawdat Al Khail', ar: 'روضة الخيل', fee: 30 },
  { num: 25, name: 'Al Mansoura / Bin Durham', ar: 'المنصورة / بن درهم', fee: 30 },
  { num: 26, name: 'Najma', ar: 'نجمة', fee: 30 },
  { num: 27, name: 'Umm Ghuwailina', ar: 'أم غويلينة', fee: 30 },
  { num: 28, name: 'Al Khulaifat / Ras Abu Aboud', ar: 'الخليفات / رأس أبو عبود', fee: 30 },
  { num: 30, name: 'Ad Duhail', ar: 'دحيل', fee: 30 },
  { num: 31, name: 'Umm Lekhba', ar: 'أم لخبا', fee: 30 },
  { num: 32, name: 'Madinat Khalifa North', ar: 'مدينة خليفة الشمالية', fee: 30 },
  { num: 33, name: 'Al Markhiya', ar: 'المرخية', fee: 30 },
  { num: 34, name: 'Madinat Khalifa South', ar: 'مدينة خليفة الجنوبية', fee: 30 },
  { num: 35, name: 'Fereej Kulaib', ar: 'فريج كليب', fee: 30 },
  { num: 36, name: 'Al Messila', ar: 'المسيلة', fee: 30 },
  { num: 37, name: 'Fereej Bin Omran / New Al Hitmi', ar: 'فريج بن عمران / الهتمي الجديد', fee: 30 },
  { num: 38, name: 'Al Sadd', ar: 'السد', fee: 30 },
  { num: 39, name: 'Al Nasr / Al Mirqab Al Jadeed', ar: 'النصر / المرقاب الجديد', fee: 30 },
  { num: 40, name: 'New Salatah', ar: 'اسلطة الجديدة', fee: 30 },
  { num: 41, name: 'Nuaija', ar: 'نعيجة', fee: 30 },
  { num: 42, name: 'Al Hilal', ar: 'الهلال', fee: 30 },
  { num: 43, name: 'Nuaija', ar: 'نعيجة', fee: 30 },
  { num: 44, name: 'Nuaija', ar: 'نعيجة', fee: 30 },
  { num: 45, name: 'Old Airport', ar: 'المطار العتيق', fee: 30 },
  { num: 46, name: 'Al Thumama', ar: 'الثمامة', fee: 30 },
  { num: 47, name: 'Al Thumama', ar: 'الثمامة', fee: 30 },
  { num: 48, name: 'Doha International Airport', ar: 'مطار الدوحة الدولي', fee: 30 },
  { num: 49, name: 'Ras Abu Fontas', ar: 'رأس أبو فنطاس', fee: 40 },
  { num: 50, name: 'Al Thumama', ar: 'الثمامة', fee: 30 },
  { num: 51, name: 'Al Gharrafa / Bani Hajer', ar: 'الغرافة / بني هاجر', fee: 30 },
  { num: 52, name: 'Al Luqta / Old Al Rayyan', ar: 'اللقطة / الريان العتيق', fee: 30 },
  { num: 53, name: 'New Al Rayyan / Al Wajba', ar: 'الريان الجديد / الوجبة', fee: 30 },
  { num: 54, name: 'Fereej Al Amir / Muraikh', ar: 'فريج الأمير / مريخ', fee: 30 },
  { num: 55, name: 'Al Waab / Al Aziziya', ar: 'الوعب / العزيزية', fee: 30 },
  { num: 56, name: 'Abu Hamour / Ain Khaled / Mesaimeer', ar: 'أبو هامور / عين خالد / مسيمير', fee: 30 },
  { num: 57, name: 'Industrial Area', ar: 'المنطقة الصناعية', fee: 40 },
  { num: 58, name: 'Wholesale Market', ar: 'السوق المركزي', fee: 30 },
  { num: 60, name: 'Al Dafna', ar: 'الدفنة', fee: 30 },
  { num: 61, name: 'Al Dafna / Al Qassar', ar: 'الدفنة / القصار', fee: 30 },
  { num: 62, name: 'Lekhwair', ar: 'لخواير', fee: 30 },
  { num: 63, name: 'Onaiza', ar: 'عنيزة', fee: 30 },
  { num: 64, name: 'Lejbailat', ar: 'لجبيلات', fee: 30 },
  { num: 65, name: 'Onaiza', ar: 'عنيزة', fee: 30 },
  { num: 66, name: 'Al Qassar / Leqtaifiya', ar: 'القصار / لقطيفية', fee: 30 },
  { num: 67, name: 'Hazm Al Markhiya', ar: 'حزم المرخية', fee: 30 },
  { num: 68, name: 'Jelaiah / Al Tarfa', ar: 'جليعة / الطرفة', fee: 40 },
  { num: 69, name: 'Lusail / Jabal Thuaileb', ar: 'لوسيل / جبل ثعيلب', fee: 40 },
  { num: 70, name: 'Al Kheesa / Rawdat Al Hamama', ar: 'الخيسة / روضة الحمامة', fee: 40 },
  { num: 71, name: 'Umm Salal / Al Kharaitiyat', ar: 'أم صلال / الخريطيات', fee: 40 },
  { num: 72, name: 'Al Utouriya', ar: 'العطورية', fee: 50 },
  { num: 73, name: 'Al Jemailiya', ar: 'الجميلية', fee: 50 },
  { num: 74, name: 'Al Khor City / Simaisma', ar: 'مدينة الخور / سميسمة', fee: 50 },
  { num: 75, name: 'Al Thakhira / Ras Laffan', ar: 'الذخيرة / رأس لفان', fee: 50 },
  { num: 76, name: 'Al Ghuwariyah', ar: 'الغويرية', fee: 50 },
  { num: 77, name: 'Madinat Al Kaaban / Fuwayrit', ar: 'مدينة الكعبان / فويرط', fee: 50 },
  { num: 78, name: 'Abu Dhalouf / Az Zubarah', ar: 'أبو ظلوف / الزبارة', fee: 70 },
  { num: 79, name: 'Madinat Ash Shamal / Ar Ruwais', ar: 'مدينة الشمال / الرويس', fee: 70 },
  { num: 80, name: 'Al Shahaniya', ar: 'الشيحانية', fee: 50 },
  { num: 81, name: 'Mebaireek', ar: 'مبيريك', fee: 50 },
  { num: 82, name: 'Rawdat Rashed', ar: 'روضة راشد', fee: 50 },
  { num: 83, name: 'Al Karaana', ar: 'الكرعانة', fee: 50 },
  { num: 84, name: 'Umm Bab', ar: 'أم باب', fee: 70 },
  { num: 85, name: 'Al Nasraniya', ar: 'النصرانية', fee: 50 },
  { num: 86, name: 'Dukhan', ar: 'دخان', fee: 70 },
  { num: 90, name: 'Al Wakrah', ar: 'الوكرة', fee: 40 },
  { num: 91, name: 'Al Wukair / Al Mashaf', ar: 'الوكير / المشاف', fee: 40 },
  { num: 92, name: 'Mesaieed', ar: 'مسيعيد', fee: 50 },
  { num: 93, name: 'Mesaieed Industrial Area', ar: 'مسيعيد الصناعية', fee: 50 },
  { num: 94, name: 'Shagra', ar: 'شقراء', fee: 50 },
  { num: 95, name: 'Al Kharrara', ar: 'الخرارة', fee: 50 },
  { num: 96, name: 'Abu Samra', ar: 'أبو سمرة', fee: 70 },
  { num: 97, name: 'Sawda Natheel', ar: 'سودا نثيل', fee: 70 },
  { num: 98, name: 'Khor Al Udaid', ar: 'خور العديد', fee: 70 },
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
    feeEl.textContent = fee === 0 ? t('cart_free') : `QR ${fee}`;
    feeEl.className = `cart-sum-value${fee === 0 ? ' sum-free' : ''}`;
  }
  if (totalEl) totalEl.textContent = `QR ${total}`;

  const paySection = document.getElementById('paySection');
  if (!paySection) return;

  if (isBulk) {
    paySection.innerHTML = `
      <div class="pay-label">${t('cart_bulk_label')} (${totalSets} ${t('cart_bulk_sets')})</div>
      <p style="font-size:13px;color:var(--ink-l);line-height:1.6;margin-bottom:12px;">${t('cart_bulk_desc')}</p>
      <button class="pay-btn bulk" id="payBulkBtn">
        ${waIcon()} ${t('cart_bulk_btn')}
      </button>`;
    document.getElementById('payBulkBtn')?.addEventListener('click', checkoutWhatsApp);
  } else {
    paySection.innerHTML = `
      <div class="pay-label">${t('cart_confirm_label')}</div>
      <button class="pay-btn whatsapp" id="payWaBtn">
        ${waIcon()} ${t('cart_confirm_btn')}
      </button>
      <button class="pay-btn sadad" id="paySadadBtn" style="margin-top:10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        ${t('cart_sadad_btn')}
      </button>`;
    document.getElementById('payWaBtn')?.addEventListener('click', checkoutWhatsApp);
    document.getElementById('paySadadBtn')?.addEventListener('click', checkoutSadad);
  }
}

// Build WhatsApp order message and open — called at click time, never embedded in HTML
function checkoutWhatsApp() {
  const sub = cartTotal();
  const fee = ZONES[selectedZone].fee;
  const total = sub + fee;
  const totalSets = cartCount();
  const isBulk = totalSets >= 10;

  const orderLines = cart.map(i => {
    const names = (i.sashNames || []).filter(n => n.trim());
    const nameStr = names.length ? '\nNames: ' + names.map((n, j) => `${j + 1}. ${n}`).join(', ') : '';
    return `• ${i.name} x${i.qty}, Size ${i.size}${i.velvetAddon ? ', +Velvet' : ''}${nameStr} — QR ${(i.price + (i.velvetAddon ? 35 : 0)) * i.qty}`;
  }).join('\n');

  // Build location line if user shared their location
  let locationLine = '';
  if (detectedLocation) {
    const { lat, lng, label } = detectedLocation;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    locationLine = `\nLocation: ${label ? label + ' — ' : ''}${mapsLink}`;
  }

  const msg = isBulk
    ? `Hi Décorous Plus — Bulk order request (${totalSets} sets):\n\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}${locationLine}`
    : `Hi Décorous Plus — I'd like to order:\n\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}${locationLine}\nTotal: QR ${total}`;

  window.open(`https://wa.me/97450393653?text=${encodeURIComponent(msg)}`, '_blank');
}

// SADAD: send WhatsApp requesting a bill (swap for API redirect once integrated)
function checkoutSadad() {
  const sub = cartTotal();
  const fee = ZONES[selectedZone].fee;
  const total = sub + fee;

  const orderLines = cart.map(i => {
    const names = (i.sashNames || []).filter(n => n.trim());
    const nameStr = names.length ? '\nNames: ' + names.map((n, j) => `${j + 1}. ${n}`).join(', ') : '';
    return `• ${i.name} x${i.qty}, Size ${i.size}${i.velvetAddon ? ', +Velvet' : ''}${nameStr} — QR ${(i.price + (i.velvetAddon ? 35 : 0)) * i.qty}`;
  }).join('\n');

  let locationLine = '';
  if (detectedLocation) {
    const { lat, lng, label } = detectedLocation;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    locationLine = `\nLocation: ${label ? label + ' — ' : ''}${mapsLink}`;
  }

  const msg = `Hi Décorous Plus — I'd like to pay via SADAD:\n\n${orderLines}\n\nDelivery: ${ZONES[selectedZone].name}${locationLine}\nTotal: QR ${total}\n\nPlease send me the SADAD payment link.`;
  window.open(`https://wa.me/97450393653?text=${encodeURIComponent(msg)}`, '_blank');
}

function waIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.1-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.083-1.12l-.29-.174-3.027.783.804-2.946-.19-.302A8 8 0 1112 20z"/></svg>`;
}

// ---- ZONE SELECTION ----
function selectZone(idx) {
  selectedZone = idx;
  // sync chips
  document.querySelectorAll('.zone-chip').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  // sync dropdown
  const sel = document.getElementById('zoneSelect');
  if (sel) sel.value = idx;
  renderCartSummary();
}

// ---- DETECT ZONE via Geolocation + Nominatim reverse geocode ----
// Stores last detected coordinates for WhatsApp sharing
let detectedLocation = null; // { lat, lng, label }

// Qatar bounding box (generous — covers all of Qatar incl. islands)
const QATAR_BOUNDS = { minLat: 24.47, maxLat: 26.20, minLng: 50.55, maxLng: 52.00 };

function isInQatar(lat, lng) {
  return lat >= QATAR_BOUNDS.minLat && lat <= QATAR_BOUNDS.maxLat &&
         lng >= QATAR_BOUNDS.minLng && lng <= QATAR_BOUNDS.maxLng;
}

function showOutOfZoneBanner(cityName) {
  let banner = document.getElementById('outOfZoneBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'outOfZoneBanner';
    banner.className = 'out-of-zone-banner';
    const zoneSection = document.querySelector('.cart-zone-section');
    if (zoneSection) zoneSection.after(banner);
  }
  const city = cityName || (typeof I18N !== 'undefined' ? I18N.get('cart_outside_unknown') : 'your location');
  const msg  = (typeof I18N !== 'undefined' ? I18N.get('cart_outside_msg') : 'We currently deliver within Qatar only.')
    .replace('{city}', city);
  const sub  = typeof I18N !== 'undefined' ? I18N.get('cart_outside_sub') : 'You can still browse and share the order details with someone in Qatar.';
  const dismiss = typeof I18N !== 'undefined' ? I18N.get('cart_outside_dismiss') : 'Got it';
  banner.innerHTML = `
    <div class="out-of-zone-icon">📍</div>
    <div class="out-of-zone-text">
      <strong>${msg}</strong>
      <span>${sub}</span>
    </div>
    <button class="out-of-zone-close" onclick="this.closest('.out-of-zone-banner').remove()">${dismiss}</button>`;
  banner.style.display = 'flex';
  requestAnimationFrame(() => banner.classList.add('show'));
}

function detectZone() {
  const btn = document.querySelector('.zone-locate-btn');
  if (!navigator.geolocation) {
    alert(typeof I18N !== 'undefined' ? I18N.get('cart_locate_unsupported') : 'Geolocation not supported');
    return;
  }
  if (btn) btn.classList.add('loading');

  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      // ── Outside Qatar entirely ──────────────────────────────────────────
      if (!isInQatar(lat, lng)) {
        if (btn) btn.classList.remove('loading');
        // Reverse geocode just to get the city name for the message
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`)
          .then(r => r.json())
          .then(d => {
            const city = d.address?.city || d.address?.town || d.address?.country || '';
            showOutOfZoneBanner(city);
          })
          .catch(() => showOutOfZoneBanner(''));
        return;
      }

      // ── Inside Qatar — store coords for WhatsApp link ───────────────────
      detectedLocation = { lat, lng, label: null };

      // Reverse geocode with Nominatim to get Qatar zone number
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=en`, {
        headers: { 'Accept': 'application/json' }
      })
      .then(r => r.json())
      .then(data => {
        if (btn) btn.classList.remove('loading');

        const addr = data.address || {};
        const rawArea = (addr.quarter || addr.suburb || addr.city_district || addr.neighbourhood || '').trim();
        const city    = (addr.city || addr.town || addr.village || '').trim();

        // Alias map: Nominatim popular names → canonical ALL_ZONES name fragment
        const ALIASES = {
          'west bay':              'al dafna',
          'the pearl':             'lekhwair',
          'the pearl-qatar island':'lekhwair',
          'pearl island':          'lekhwair',
          'msheireb':              'mushayrib',
          'msheireb downtown':     'mushayrib',
          'al msheireb':           'mushayrib',
          'old doha':              'al bidda',
          'souq waqif':            'al souq',
          'corniche':              'al bidda',
          'education city':        'al rayyan',
          'sports city':           'al rayyan',
          'aspire zone':           'al waab',
          'ain khaled':            'abu hamour',
          'new doha':              'al dafna',
          'diplomatic area':       'al dafna',
          'marina district':       'lusail',
          'qatar foundation':      'al rayyan',
          'hamad international airport': 'doha international airport',
          'hia':                   'doha international airport',
          'al gharafa':            'al gharrafa',
        };

        // Normalise and apply alias
        let areaName = rawArea.toLowerCase();
        areaName = ALIASES[areaName] || areaName;
        let cityName = city.toLowerCase();
        cityName = ALIASES[cityName] || cityName;

        // Match function: exact before partial, longer name wins
        function matchZone(query) {
          if (!query) return null;
          // 1. Exact full match
          for (const z of ALL_ZONES) {
            if (z.name.toLowerCase() === query) return z;
          }
          // 2. Exact match on first segment (before /)
          for (const z of ALL_ZONES) {
            const first = z.name.toLowerCase().split('/')[0].trim();
            if (first === query) return z;
          }
          // 3. Exact match on second segment (after /)
          for (const z of ALL_ZONES) {
            const parts = z.name.toLowerCase().split('/');
            if (parts[1] && parts[1].trim() === query) return z;
          }
          // 4. Zone name contains query (minimum 5 chars to avoid false positives)
          if (query.length >= 5) {
            for (const z of ALL_ZONES) {
              if (z.name.toLowerCase().includes(query)) return z;
            }
          }
          // 5. Query contains zone first segment (minimum 5 chars)
          if (query.length >= 5) {
            for (const z of ALL_ZONES) {
              const first = z.name.toLowerCase().split('/')[0].trim();
              if (first.length >= 5 && query.includes(first)) return z;
            }
          }
          return null;
        }

        let matched = matchZone(areaName) || matchZone(cityName);

        // Store human-readable label
        const displayName = rawArea || city || 'Your location';
        detectedLocation.label = displayName;

        if (matched) {
          const zoneIdx = matched.fee === 30 ? 0 : matched.fee === 40 ? 1 : matched.fee === 50 ? 2 : 3;
          selectZone(zoneIdx);
          if (btn) {
            const span = btn.querySelector('span');
            if (span) {
              span.textContent = matched.name;
              setTimeout(() => { if (I18N) span.textContent = I18N.get('cart_locate'); }, 3000);
            }
          }
        } else {
          const zone = coordZoneFallback(lat, lng);
          selectZone(zone);
        }
      })
      .catch(() => {
        if (btn) btn.classList.remove('loading');
        const zone = coordZoneFallback(lat, lng);
        selectZone(zone);
      });
    },
    err => {
      if (btn) btn.classList.remove('loading');
      console.warn('Geolocation error:', err.message);
    },
    { timeout: 8000, maximumAge: 60000 }
  );
}

// Coordinate fallback using tight zone bounds (used if Nominatim fails)
function coordZoneFallback(lat, lng) {
  const bounds = [
    // Zone 1 areas checked first (they overlap Doha's broad bounds)
    { zone: 1, minLat: 25.395, maxLat: 25.490, minLng: 51.455, maxLng: 51.560 }, // Lusail
    { zone: 1, minLat: 25.090, maxLat: 25.215, minLng: 51.535, maxLng: 51.680 }, // Al Wakrah
    { zone: 1, minLat: 25.390, maxLat: 25.540, minLng: 51.340, maxLng: 51.480 }, // Umm Salal
    { zone: 1, minLat: 25.100, maxLat: 25.270, minLng: 51.440, maxLng: 51.560 }, // Industrial Area
    // Zone 2
    { zone: 2, minLat: 25.650, maxLat: 25.760, minLng: 51.450, maxLng: 51.600 }, // Al Khor
    { zone: 2, minLat: 24.960, maxLat: 25.100, minLng: 51.500, maxLng: 51.620 }, // Mesaieed
    { zone: 2, minLat: 25.300, maxLat: 25.430, minLng: 51.050, maxLng: 51.340 }, // Al Shahaniya
    { zone: 2, minLat: 25.500, maxLat: 25.680, minLng: 51.520, maxLng: 51.620 }, // Simaisma
    // Zone 3
    { zone: 3, minLat: 25.370, maxLat: 25.500, minLng: 50.720, maxLng: 50.860 }, // Dukhan
    { zone: 3, minLat: 24.680, maxLat: 24.820, minLng: 50.780, maxLng: 50.920 }, // Abu Samra
    { zone: 3, minLat: 24.530, maxLat: 24.680, minLng: 51.280, maxLng: 51.450 }, // Khor Al Udaid
    { zone: 3, minLat: 25.750, maxLat: 26.200, minLng: 50.800, maxLng: 52.000 }, // Far north
    { zone: 3, minLat: 25.000, maxLat: 25.900, minLng: 50.600, maxLng: 51.050 }, // Far west
    // Zone 0 fallback
    { zone: 0, minLat: 25.150, maxLat: 25.420, minLng: 51.340, maxLng: 51.660 },
  ];
  for (const b of bounds) {
    if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) return b.zone;
  }
  return 0;
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
let modalSizes = ['M'];   // per-item sizes when qty > 1
let modalVelvet = false;
let modalGalleryIdx = 0;
let modalTab = 'order';

const PRODUCTS = [
  { id: 1,
    name: 'Black Classic',   name_ar: 'الكلاسيك الأسود',
    set: 'Set 1',            set_ar: 'الطقم 1',
    sash: 'Gold sash',       sash_ar: 'شريط ذهبي',
    badge: 'Best Seller',    badge_ar: 'الأكثر مبيعاً',
    cardSash: 'Black sash · Gold writing',
    cardSash_ar: 'شريط أسود · كتابة ذهبية',
    price: 329, bestseller: true,
    img: 'product-set-black.png',
    gallery: [
      'product-set-black.png','set1-1.webp','set1-2.webp',
      'addon-velvet-black.png','set1-3.webp','set1-4.webp','size-reference.png',
    ],
    velvet: true, velvetImg: 'addon-velvet-black.png' },
  { id: 2,
    name: 'Navy Blue',       name_ar: 'الأزرق الكحلي',
    set: 'Set 2',            set_ar: 'الطقم 2',
    sash: 'Silver sash',     sash_ar: 'شريط فضي',
    badge: 'Most Popular',   badge_ar: 'الأكثر طلباً',
    cardSash: 'Navy sash · Silver writing',
    cardSash_ar: 'شريط كحلي · كتابة فضية',
    price: 329,
    img: 'product-set-navy.png',
    gallery: [
      'product-set-navy.png','set2-1.webp','set2-2.webp',
      'addon-velvet-navy.png','set2-3.webp','set2-4.webp','size-reference.png',
    ],
    velvet: true, velvetImg: 'addon-velvet-navy.png' },
  { id: 3,
    name: 'White Ivory',     name_ar: 'الأبيض العاجي',
    set: 'Set 3',            set_ar: 'الطقم 3',
    sash: 'Grey sash',       sash_ar: 'شريط رمادي',
    cardSash: 'Grey sash · Silver brooche',
    cardSash_ar: 'شريط رمادي · مشبك فضي',
    price: 329,
    img: 'product-set-white.png',
    gallery: ['product-set-white.png','set3-1.webp','set3-2.webp','size-reference.png'],
    velvet: false },
  { id: 4,
    name: 'Brown Earthy',    name_ar: 'البني الترابي',
    set: 'Set 4',            set_ar: 'الطقم 4',
    sash: 'White sash',      sash_ar: 'شريط أبيض',
    cardSash: 'Brown sash · Gold writing',
    cardSash_ar: 'شريط بني · كتابة ذهبية',
    price: 329,
    img: 'product-set-brown.png',
    gallery: ['product-set-brown.png','set4-1.webp','set4-2.webp','size-reference.png'],
    velvet: false },
  { id: 5,
    name: 'Maroon Heritage', name_ar: 'الكرزي التراثي',
    set: 'Set 5',            set_ar: 'الطقم 5',
    sash: 'White sash',      sash_ar: 'شريط أبيض',
    cardSash: 'Maroon sash · Gold writing',
    cardSash_ar: 'شريط كرزي · كتابة ذهبية',
    price: 329,
    img: 'product-set-maroon.png',
    gallery: ['product-set-maroon.png','set5-1.webp','set5-2.webp','size-reference.png'],
    velvet: false },
  { id: 6,
    name: 'Dark Purple',     name_ar: 'البنفسجي الداكن',
    set: 'Set 6',            set_ar: 'الطقم 6',
    sash: 'Black sash',      sash_ar: 'شريط أسود',
    cardSash: 'Purple sash · Silver writing',
    cardSash_ar: 'شريط بنفسجي · كتابة فضية',
    price: 329,
    img: 'product-set-purple.png',
    gallery: ['product-set-purple.png','set6-1.webp','set6-2.webp','size-reference.png'],
    velvet: false },
];

/* Helper: return localised field from a product */
function pL(p, field) {
  const ar = typeof I18N !== 'undefined' && I18N.current() === 'ar';
  return ar && p[field + '_ar'] ? p[field + '_ar'] : p[field];
}
/* Helper: i18n string shortcut */
function t(key) {
  return typeof I18N !== 'undefined' ? I18N.get(key) : key;
}

function openProductModal(productId) {
  modalProduct = PRODUCTS.find(p => p.id === productId);
  if (!modalProduct) return;
  modalSize = 'M';
  modalQty = 1;
  modalSashes = [''];
  modalSizes = ['M'];
  modalVelvet = false;
  modalGalleryIdx = 0;
  modalTab = 'order';
  renderModal();
  document.getElementById('productModal')?.classList.add('open');
  startGalleryAuto();
}

function closeProductModal() {
  stopGalleryAuto();
  document.getElementById('productModal')?.classList.remove('open');
}

function renderModal() {
  const modal = document.getElementById('productModal');
  if (!modal || !modalProduct) return;
  const p = modalProduct;
  const total = (p.price + (modalVelvet ? 35 : 0)) * modalQty;

  modal.querySelector('.modal-set-label').textContent = `${pL(p,'set')} · ${pL(p,'sash')}`;
  modal.querySelector('.modal-name').textContent = pL(p,'name');
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

  // Sizes — hide global selector when qty > 1 (per-item selectors shown instead)
  const sizeBtnsEl = modal.querySelector('.modal-size-btns');
  const sizeSecEl  = sizeBtnsEl ? sizeBtnsEl.previousElementSibling : null;
  if (sizeBtnsEl) sizeBtnsEl.style.display = modalQty > 1 ? 'none' : '';
  if (sizeSecEl && sizeSecEl.classList.contains('modal-sec'))
    sizeSecEl.style.display = modalQty > 1 ? 'none' : '';
  modal.querySelectorAll('.modal-sz').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.size === modalSize);
  });

  // Qty
  const qtyEl = modal.querySelector('.modal-qty-num');
  if (qtyEl) qtyEl.textContent = modalQty;

  // Sash names
  const namesContainer = modal.querySelector('#modalNamesContainer');
  if (namesContainer) {
    const SIZES = ['XS','S','M','L','XL'];
    if (modalQty === 1) {
      namesContainer.innerHTML = `<input class="form-input" placeholder="${t('modal_name_placeholder')}" value="${modalSashes[0] || ''}" oninput="updateModalSash(0, this.value)" dir="rtl">`;
    } else {
      namesContainer.innerHTML = `<div class="modal-names-list">${
        Array.from({length: modalQty}, (_, i) => {
          const sz = modalSizes[i] || 'M';
          const szBtns = SIZES.map(s =>
            `<button class="modal-sz-sm${s === sz ? ' on' : ''}" onclick="updateModalItemSize(${i},'${s}')">${s}</button>`
          ).join('');
          return `<div class="modal-name-row">
            <div class="modal-name-num">${i + 1}</div>
            <div class="modal-item-sizes">${szBtns}</div>
            <input class="form-input" style="flex:1;" placeholder="${t('modal_name_placeholder').replace('— optional','').trim()} ${i+1}" value="${modalSashes[i] || ''}" oninput="updateModalSash(${i}, this.value)" dir="rtl">
          </div>`;
        }).join('')
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
  if (addBtn) addBtn.textContent = `${t('modal_add_btn').split('·')[0].trim()} · QR ${total}`;
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

function setModalSize(size) { modalSize = size; modalSizes = Array.from({length: modalQty}, () => size); renderModal(); }
function setModalQty(qty) {
  modalQty = Math.max(1, Math.min(9, qty));
  modalSashes = Array.from({length: modalQty}, (_, i) => modalSashes[i] || '');
  modalSizes  = Array.from({length: modalQty}, (_, i) => modalSizes[i]  || modalSize);
  renderModal();
}
function updateModalItemSize(idx, size) { modalSizes[idx] = size; renderModal(); }
function updateModalSash(idx, val) { modalSashes[idx] = val; }
function toggleModalVelvet() { modalVelvet = !modalVelvet; renderModal(); }
function setModalTab(tab) { modalTab = tab; renderModal(); }

function confirmAddToCart() {
  if (!modalProduct) return;
  if (modalQty === 1) {
    addToCart({
      ...modalProduct,
      size: modalSizes[0] || modalSize,
      qty: 1,
      sashNames: [modalSashes[0] || ''],
      velvetAddon: modalVelvet,
    });
  } else {
    // Group consecutive items with the same size into one cart entry
    let i = 0;
    while (i < modalQty) {
      const sz = modalSizes[i] || 'M';
      let j = i;
      while (j < modalQty && (modalSizes[j] || 'M') === sz) j++;
      addToCart({
        ...modalProduct,
        size: sz,
        qty: j - i,
        sashNames: modalSashes.slice(i, j),
        velvetAddon: modalVelvet,
      });
      i = j;
    }
  }
  closeProductModal();
}

// ---- GALLERY SCROLL ----
let galleryAutoTimer = null;

function startGalleryAuto() {
  stopGalleryAuto();
  galleryAutoTimer = setInterval(() => {
    if (!modalProduct) return;
    const gallery = document.querySelector('#productModal .modal-gallery');
    if (!gallery) return;
    const total = modalProduct.gallery.length;
    const next = (modalGalleryIdx + 1) % total;
    gallery.scrollTo({ left: next * gallery.offsetWidth, behavior: 'smooth' });
  }, 2800);
}

function stopGalleryAuto() {
  if (galleryAutoTimer) { clearInterval(galleryAutoTimer); galleryAutoTimer = null; }
}

function initGalleryScroll() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  const gallery = modal.querySelector('.modal-gallery');
  if (!gallery) return;
  gallery.addEventListener('scroll', () => {
    modalGalleryIdx = Math.round(gallery.scrollLeft / gallery.offsetWidth);
    renderModalDots();
  });
  // Pause auto-slide while user manually swipes, resume after
  gallery.addEventListener('touchstart', stopGalleryAuto, { passive: true });
  gallery.addEventListener('touchend', () => setTimeout(startGalleryAuto, 1200), { passive: true });
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

// ---- SPLASH SCREEN ----
(function() {
  const isStandalone = window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
  if (!isStandalone) return;

  const splash = document.getElementById('splashScreen');
  if (!splash) return;
  splash.classList.add('active');

  // Dismiss after bar fills + small buffer (bar takes ~2.6s total: 1s delay + 1.6s fill)
  setTimeout(() => {
    splash.classList.add('fade-out');
    splash.addEventListener('animationend', () => {
      splash.style.display = 'none';
    }, { once: true });
  }, 2800);
})();

// ---- PWA ----
let pwaInstallPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// Detect iOS Safari (no beforeinstallprompt support)
function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream;
}
function isInStandaloneMode() {
  return ('standalone' in window.navigator) && window.navigator.standalone;
}

// iOS: show manual instructions banner
function showIosBanner() {
  const banner = document.getElementById('pwaBannerIos');
  if (!banner) return;
  banner.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('show')));
}
function hideIosBanner() {
  const banner = document.getElementById('pwaBannerIos');
  if (!banner) return;
  banner.classList.remove('show');
  setTimeout(() => { banner.style.display = 'none'; }, 400);
  sessionStorage.setItem('pwaBannerDismissed', '1');
}

// Android/desktop: capture browser install prompt
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  pwaInstallPrompt = e;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  if (isMobile && !sessionStorage.getItem('pwaBannerDismissed')) {
    setTimeout(showPwaBanner, 3000);
  }
});

function showPwaBanner() {
  const banner = document.getElementById('pwaBanner');
  if (!banner) return;
  banner.style.display = 'flex';
  requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('show')));
}

function hidePwaBanner() {
  const banner = document.getElementById('pwaBanner');
  if (!banner) return;
  banner.classList.remove('show');
  setTimeout(() => { banner.style.display = 'none'; }, 400);
  sessionStorage.setItem('pwaBannerDismissed', '1');
}

// On page load: show iOS banner if on iOS Safari, not already installed, not dismissed
window.addEventListener('load', () => {
  if (isIos() && !isInStandaloneMode() && !sessionStorage.getItem('pwaBannerDismissed')) {
    setTimeout(showIosBanner, 3500);
  }
});

// ---- BULK POPUP ----
function openBulkPopup() {
  document.getElementById('bulkPopupOverlay')?.classList.add('open');
  document.getElementById('bulkPopup')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBulkPopup() {
  document.getElementById('bulkPopupOverlay')?.classList.remove('open');
  document.getElementById('bulkPopup')?.classList.remove('open');
  document.body.style.overflow = '';
  sessionStorage.setItem('bulkPopupSeen', '1');
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

  // Bulk popup — show once per session after a short delay
  if (!sessionStorage.getItem('bulkPopupSeen')) {
    setTimeout(openBulkPopup, 1200);
  }

  // PWA install banner buttons
  document.getElementById('pwaBannerInstall')?.addEventListener('click', async () => {
    hidePwaBanner();
    if (pwaInstallPrompt) {
      pwaInstallPrompt.prompt();
      await pwaInstallPrompt.userChoice;
      pwaInstallPrompt = null;
    }
  });
  document.getElementById('pwaBannerClose')?.addEventListener('click', hidePwaBanner);
  document.getElementById('pwaBannerIosClose')?.addEventListener('click', hideIosBanner);

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

/* ---- Re-translate dynamic content when language changes ---- */
document.addEventListener('langchange', function() {
  // Re-translate all static [data-i18n] product card elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (typeof I18N !== 'undefined') {
      var val = I18N.get(key);
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else if (el.tagName === 'OPTION') {
          el.textContent = val;
        } else {
          el.innerHTML = val;
        }
      }
    }
  });

  // Re-render open modal if any
  if (typeof renderModal === 'function' && typeof modalProduct !== 'undefined' && modalProduct) {
    renderModal();
  }

  // Re-render cart items (size label etc.)
  if (typeof updateCartUI === 'function') updateCartUI();

  // Re-render cart summary (pay section uses t() strings)
  if (typeof renderCartSummary === 'function') renderCartSummary();

  // Sync zone dropdown selected value
  const sel = document.getElementById('zoneSelect');
  if (sel && typeof selectedZone !== 'undefined') sel.value = selectedZone;
});
