/* =============================================
   DÉCOROUS PLUS — Mobile Init
   Injects bottom navigation bar + WhatsApp FAB
   Only activates on mobile (≤768px)
   ============================================= */

(function () {
  if (window.innerWidth > 768) return;

  // Determine active page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  function isActive(page) {
    if (page === 'index.html' && (path === '' || path === 'index.html')) return true;
    return path === page;
  }

  /* ---- Bottom Navigation ---- */
  var nav = document.createElement('nav');
  nav.className = 'mobile-bottom-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML = [
    { href: 'index.html',       label: 'Home',        icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
    { href: 'collections.html', label: 'Collections', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { href: 'pricing.html',     label: 'Pricing',     icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93C7.06 19.44 4.56 16.94 4.07 14H6v-2H4.07C4.56 9.06 7.06 6.56 10 6.07V8h2V6.07c2.94.49 5.44 2.99 5.93 5.93H16v2h1.93c-.49 2.94-2.99 5.44-5.93 5.93zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' },
    { href: 'order.html',       label: 'Order',       icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ].map(function(item) {
    var active = isActive(item.href) ? ' active' : '';
    // Use filled paths vs stroked for Pricing (complex SVG)
    var svgContent = item.href === 'pricing.html'
      ? '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="' + item.icon + '"/></svg>'
      : '<svg viewBox="0 0 24 24"><polyline points="' + (item.icon.includes('M') ? '' : item.icon) + '"/>' +
        '<path d="' + item.icon + '"/></svg>';
    return '<a href="' + item.href + '" class="mobile-nav-item' + active + '" aria-label="' + item.label + '">' +
      '<svg viewBox="0 0 24 24"><path d="' + item.icon + '"/></svg>' +
      '<span>' + item.label + '</span>' +
    '</a>';
  }).join('');

  // WhatsApp item
  var waItem = document.createElement('button');
  waItem.className = 'mobile-nav-item nav-wa';
  waItem.setAttribute('aria-label', 'WhatsApp');
  waItem.onclick = function() {
    window.open('https://wa.me/97450393653', '_blank');
  };
  waItem.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.1-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.083-1.12l-.29-.174-3.027.783.804-2.946-.19-.302A8 8 0 1112 20z"/></svg>' +
    '<span>Chat</span>';
  nav.appendChild(waItem);

  document.body.appendChild(nav);

  /* ---- WhatsApp FAB (floating action button) ---- */
  var fab = document.createElement('button');
  fab.className = 'mobile-wa-fab';
  fab.setAttribute('aria-label', 'Chat on WhatsApp');
  fab.onclick = function() {
    window.open('https://wa.me/97450393653', '_blank');
  };
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.1-1.32A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.083-1.12l-.29-.174-3.027.783.804-2.946-.19-.302A8 8 0 1112 20z"/></svg>';
  // Hide FAB if bottom nav is visible (redundant)
  fab.style.display = 'none';
  document.body.appendChild(fab);


  /* ---- Move viewing widget to body so it floats on all pages ---- */
  var widgetSrc = document.querySelector('.viewing-widget');
  if (widgetSrc) {
    var widgetClone = widgetSrc.cloneNode(true);
    widgetClone.style.display = '';
    document.body.appendChild(widgetClone);
    widgetSrc.style.display = 'none';
  }


  /* ---- Home page: infinite marquee for product grid ---- */
  if (document.body.dataset.page === 'home') {
    var grid = document.getElementById('homeProductsGrid');
    if (grid) {
      // Wrap all cards in a track div
      var cards = Array.from(grid.children);
      var track = document.createElement('div');
      track.className = 'products-marquee-track';
      cards.forEach(function(c) { track.appendChild(c); });

      // Clone the whole track for seamless loop
      var clone = track.cloneNode(true);
      // Cloned buttons won't fire — wire them up
      clone.querySelectorAll('[onclick]').forEach(function(el) {
        var fn = el.getAttribute('onclick');
        el.addEventListener('click', function() { eval(fn); });
      });

      grid.appendChild(track);
      grid.appendChild(clone);

      // Pause on touch
      grid.addEventListener('touchstart', function() { grid.classList.add('paused'); }, { passive: true });
      grid.addEventListener('touchend',   function() { setTimeout(function(){ grid.classList.remove('paused'); }, 1200); }, { passive: true });
    }
  }

})();
