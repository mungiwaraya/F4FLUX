/* ============================================================
   F4FLUX — loadSocial.js
   Reusable social profile card loader.
   Reads config from window.F4FLUX_PAGE_CONFIG and fetches
   the matching JSON file to populate the accounts grid.
   ============================================================ */

/**
 * F4FLUX_PAGE_CONFIG shape (set in each social HTML page):
 * {
 *   jsonFile:    'data/instagram.json',
 *   platform:    'Instagram',
 *   accentColor: '#E1306C',
 *   icon:        '📸',
 *   buttonLabel: 'Open Instagram',
 *   buttonIcon:  '↗'
 * }
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.F4FLUX_PAGE_CONFIG;
  if (!cfg) {
    console.warn('[F4FLUX] No page config found. Set window.F4FLUX_PAGE_CONFIG before loading this script.');
    return;
  }

  const grid       = document.getElementById('accounts-grid');
  const searchInput= document.getElementById('search-input');
  const countBadge = document.getElementById('account-count');
  let   allAccounts= [];

  // ── Fetch JSON ──────────────────────────────────────────────
  fetch(cfg.jsonFile)
    .then(r => { if (!r.ok) throw new Error('JSON load failed'); return r.json(); })
    .then(data => {
      allAccounts = data;
      if (countBadge) countBadge.textContent = data.length + ' account' + (data.length !== 1 ? 's' : '');
      renderCards(allAccounts);
      initScrollReveal();
    })
    .catch(err => {
      if (grid) grid.innerHTML = `<p class="no-results">⚠️ Could not load accounts. Please check the JSON file.</p>`;
      console.error('[F4FLUX] Error loading JSON:', err);
    });

  // ── Search ──────────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = q
        ? allAccounts.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.username.toLowerCase().includes(q) ||
            (a.description || '').toLowerCase().includes(q)
          )
        : allAccounts;
      renderCards(filtered);
      initScrollReveal();
    });
  }

  // ── Render Cards ─────────────────────────────────────────────
  function renderCards(accounts) {
    if (!grid) return;
    if (accounts.length === 0) {
      grid.innerHTML = '<p class="no-results">No accounts found matching your search.</p>';
      return;
    }
    grid.innerHTML = accounts.map((a, i) => buildCard(a, i)).join('');

    // Ripple on newly created buttons
    grid.querySelectorAll('.account-open-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect   = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top  = (e.clientY - rect.top)  + 'px';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ── Build a Single Card ──────────────────────────────────────
  function buildCard(account, index) {
    const delay     = (index * 0.08).toFixed(2);
    const initials  = account.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const avatarContent = `
      <div class="account-avatar">
        <img src="${account.profile}"
             alt="${escHtml(account.name)}"
             onerror="this.style.display='none';this.parentElement.querySelector('.avatar-fallback').style.display='flex';">
        <span class="avatar-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-weight:700;font-size:1.3rem;">${escHtml(initials)}</span>
      </div>`;

    const verifiedBadge = account.verified
      ? `<span class="verified-badge" title="Verified">✓</span>`
      : '';

    return `
      <div class="account-card reveal" style="transition-delay:${delay}s">
        ${avatarContent}
        <div class="account-name-row">
          <span class="account-name">${escHtml(account.name)}</span>
          ${verifiedBadge}
        </div>
        <span class="account-username">${escHtml(account.username)}</span>
        <p class="account-desc">${escHtml(account.description || '')}</p>
        <a href="${escHtml(account.url)}"
           target="_blank"
           rel="noopener noreferrer"
           class="account-open-btn">
          ${escHtml(cfg.buttonLabel || 'View Profile')} ${cfg.buttonIcon || '↗'}
        </a>
      </div>`;
  }

  // ── Scroll Reveal re-init for dynamic cards ──────────────────
  function initScrollReveal() {
    const newEls = document.querySelectorAll('.account-card.reveal:not(.observed)');
    const obs    = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    newEls.forEach(el => { el.classList.add('observed'); obs.observe(el); });
  }

  // ── Utility: escape HTML ─────────────────────────────────────
  function escHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
});
