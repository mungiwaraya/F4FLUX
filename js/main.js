/* ============================================================
   F4FLUX — main.js
   Global JS: loading screen, cursor, particles, navbar,
   scroll reveal, back-to-top, ripple, page transitions
   ============================================================ */

/* ── Loading Screen ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) ls.classList.add('hidden');
  }, 700);
});

/* ── Custom Cursor ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('mouse-glow');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (dot)  { dot.style.left  = mouseX + 'px'; dot.style.top  = mouseY + 'px'; }
  if (glow) { glow.style.left = mouseX + 'px'; glow.style.top = mouseY + 'px'; }
});

// Smooth ring follow
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor on mobile
if ('ontouchstart' in window) {
  if (dot)  dot.style.display  = 'none';
  if (ring) ring.style.display = 'none';
  document.body.style.cursor   = 'auto';
}

/* ── Floating Particles ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });

  const COUNT = 55;
  const particles = Array.from({ length: COUNT }, () => createParticle());

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(123,47,255,${p.opacity})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

/* ── Sticky Navbar ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ── Hamburger Menu ── */
const hamburger  = document.querySelector('.hamburger');
const mobileNav  = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Back to Top ── */
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Ripple Effect on Buttons ── */
document.addEventListener('click', e => {
  const target = e.target.closest('.btn, .sc-btn, .account-open-btn');
  if (!target) return;
  const ripple   = document.createElement('span');
  ripple.className = 'ripple-effect';
  const rect     = target.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + 'px';
  ripple.style.top  = (e.clientY - rect.top)  + 'px';
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

/* ── Page Transition Links ── */
const overlay = document.getElementById('page-transition');
if (overlay) {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    
    // Resolve absolute URLs to check if the target is the same page (ignoring hashes)
    try {
      const linkUrl = new URL(link.href);
      const currentUrl = new URL(window.location.href);
      
      const normalizePath = (p) => p.replace(/\/index\.html$/, '/').replace(/\/$/, '');
      const isSamePage = linkUrl.origin === currentUrl.origin && normalizePath(linkUrl.pathname) === normalizePath(currentUrl.pathname);
      
      if (isSamePage) {
        // If same page, skip transition animation and let default scroll/hash navigation work
        return;
      }
    } catch (e) {
      // In case URL parsing fails, fallback to default behavior (no transition)
      return;
    }

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('slide-in');
      setTimeout(() => { window.location.href = href; }, 500);
    });
  });
  // Fade out on page load
  window.addEventListener('pageshow', () => {
    overlay.classList.remove('slide-in');
    overlay.classList.add('slide-out');
    setTimeout(() => overlay.classList.remove('slide-out'), 600);
  });
}

/* ── Active Nav Link ── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
