/**
 * AKGU University Portal — Main JavaScript
 * ES6+ | Vanilla JS | No external dependencies
 * -----------------------------------------------
 * Modules:
 *  1. Mobile Navigation Drawer
 *  2. Sticky Nav Shrink on Scroll
 *  3. Hero Headline Carousel
 *  4. Animated Stats Counters
 *  5. Academic Program Filter Grid
 *  6. Fee & Scholarship Calculator
 *  7. Enquiry Modal (auto-prompt + manual trigger)
 *  8. Search Modal (button + CMD/CTRL+K)
 *  9. Scroll Reveal Animations
 * 10. Back-to-Top Button
 * -----------------------------------------------
 */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */

/**
 * Shorthand querySelector
 * @param {string} sel - CSS selector
 * @param {Element} [ctx=document] - optional root
 */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Format a number as Indian currency string */
const inrFormat = (n) =>
  '₹' + Number(n).toLocaleString('en-IN');

/** Trap focus within a modal element */
function trapFocus(el) {
  const focusable = $$('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])', el)
    .filter(e => !e.disabled && e.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  el._trapHandler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };
  el.addEventListener('keydown', el._trapHandler);
  first.focus();
}

function releaseFocus(el) {
  if (el._trapHandler) el.removeEventListener('keydown', el._trapHandler);
}

/* ============================================================
   1. MOBILE NAVIGATION DRAWER
   ============================================================ */
(function initMobileNav() {
  const hamburger   = $('#hamburger');
  const drawer      = $('#mobileDrawer');
  const backdrop    = $('#drawerBackdrop');
  const closeBtn    = $('#drawerClose');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    trapFocus(drawer.querySelector('.drawer-panel'));
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    releaseFocus(drawer.querySelector('.drawer-panel'));
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  /* Mobile accordion inside drawer */
  $$('.mobile-acc').forEach(acc => {
    const btn = acc.querySelector('.mobile-acc-btn');
    btn?.addEventListener('click', () => {
      const isOpen = acc.classList.contains('open');
      // Close all others
      $$('.mobile-acc.open').forEach(a => {
        if (a !== acc) a.classList.remove('open');
      });
      acc.classList.toggle('open', !isOpen);
    });
  });
})();

/* ============================================================
   2. STICKY NAV SHRINK ON SCROLL
   ============================================================ */
(function initNavScroll() {
  const nav     = $('#mainNav');
  const topbar  = $('#topbar');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    // Hide top bar after scrolling 60px
    if (topbar) topbar.style.transform = y > 60 ? 'translateY(-100%)' : 'translateY(0)';
    // Shrink nav
    if (y > 40) {
      nav.classList.add('!h-14', 'shadow-lg');
      nav.classList.remove('shadow-sm');
    } else {
      nav.classList.remove('!h-14', 'shadow-lg');
      nav.classList.add('shadow-sm');
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

/* ============================================================
   3. HERO HEADLINE CAROUSEL
   ============================================================ */
(function initHeroCarousel() {
  const headlines = [
    'Pioneering Education 4.0<br class="hidden md:block" />&amp; Next-Gen Innovation',
    'Where Research Meets<br class="hidden md:block" />Real-World Impact',
    'Industry-Led Learning.<br class="hidden md:block" />Future-Ready Graduates.',
    'Autonomous University<br class="hidden md:block" />of Ghaziabad, Delhi-NCR',
  ];

  const el = $('#heroHeadline');
  if (!el) return;

  let idx = 0;
  el.innerHTML = headlines[0];

  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      idx = (idx + 1) % headlines.length;
      el.innerHTML = headlines[idx];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 500);
  }, 4500);

  // Set initial transition
  el.style.transition = 'opacity .5s ease, transform .5s ease';
})();

/* ============================================================
   4. ANIMATED STATS COUNTERS (IntersectionObserver)
   ============================================================ */
(function initCounters() {
  const items = $$('[data-target]');
  if (!items.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = 2000; // ms
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);
      el.textContent = value.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  items.forEach(el => observer.observe(el));
})();

/* ============================================================
   5. ACADEMIC PROGRAM FILTER GRID
   ============================================================ */
(function initProgramFilter() {
  const filterBtns = $$('.filter-btn');
  const cards      = $$('.program-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active-filter');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards with animation
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'flex';
          // Trigger reflow for animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .3s ease, transform .3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

/* ============================================================
   6. FEE & SCHOLARSHIP CALCULATOR
   ============================================================ */
(function initCalculator() {
  const courseSelect   = $('#calcCourse');
  const percentSlider  = $('#calcPercent');
  const percentDisplay = $('#percentDisplay');
  const emiToggle      = $('#emiToggle');
  const calcBtn        = $('#calcBtn');
  const calcPlaceholder= $('#calcPlaceholder');
  const calcOutput     = $('#calcOutput');
  const emiSection     = $('#emiSection');

  if (!courseSelect || !calcBtn) return;

  // Scholarship tiers based on percentage
  const getScholarship = (pct) => {
    if (pct >= 95) return { pct: 100, name: '🏆 Super-30 Full Scholarship (100%)' };
    if (pct >= 90) return { pct: 75,  name: '🥇 Gold Merit Scholarship (75%)' };
    if (pct >= 85) return { pct: 50,  name: '🥈 Silver Merit Scholarship (50%)' };
    if (pct >= 80) return { pct: 30,  name: '🥉 Bronze Merit Scholarship (30%)' };
    if (pct >= 75) return { pct: 15,  name: '⭐ Academic Excellence Award (15%)' };
    return { pct: 0, name: null };
  };

  // Live slider display
  percentSlider?.addEventListener('input', () => {
    if (percentDisplay) percentDisplay.textContent = percentSlider.value + '%';
  });

  // EMI toggle
  let emiEnabled = false;
  emiToggle?.addEventListener('click', () => {
    emiEnabled = !emiEnabled;
    emiToggle.setAttribute('aria-checked', String(emiEnabled));
  });

  // Calculate button
  calcBtn.addEventListener('click', () => {
    const selectedOption = courseSelect.options[courseSelect.selectedIndex];
    const feeRaw  = parseInt(selectedOption.dataset.fee, 10);
    const pct     = parseInt(percentSlider.value, 10);

    if (!feeRaw || isNaN(feeRaw)) {
      courseSelect.classList.add('error');
      courseSelect.focus();
      return;
    }
    courseSelect.classList.remove('error');

    const scholarship = getScholarship(pct);
    const discount    = Math.round(feeRaw * scholarship.pct / 100);
    const payable     = feeRaw - discount;
    const emi         = Math.ceil(payable / 12);

    // Show output
    calcPlaceholder.classList.add('hidden');
    calcOutput.classList.remove('hidden');

    $('#resFee').textContent      = inrFormat(feeRaw) + ' /year';
    $('#resDiscount').textContent = discount > 0 ? `-${inrFormat(discount)} (${scholarship.pct}% off)` : 'No scholarship applicable';
    $('#resPayable').textContent  = inrFormat(payable) + ' /year';
    $('#resEmi').textContent      = inrFormat(emi) + ' /month';

    const badge = $('#resScholarshipName');
    if (scholarship.name) {
      badge.textContent = scholarship.name;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    // EMI section visibility
    emiSection.classList.toggle('hidden', !emiEnabled);

    // Pulse the results panel
    calcOutput.style.animation = 'none';
    calcOutput.offsetHeight; // reflow
    calcOutput.style.animation = 'fadeIn .4s ease';
  });
})();

/* ============================================================
   7. ENQUIRY MODAL
   ============================================================ */
(function initEnquiryModal() {
  const modal     = $('#enquiryModal');
  const closeBtn  = $('#closeEnquiry');
  const form      = $('#enquiryForm');
  const backdrop  = modal?.querySelector('.modal-backdrop');

  if (!modal) return;

  // Triggers
  const triggers = [
    $('#heroApplyBtn'),
    $('#applyNowBtn'),
    $('#contactAdmissionsBtn'),
  ].filter(Boolean);

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    trapFocus(modal.querySelector('.modal-panel'));
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    releaseFocus(modal.querySelector('.modal-panel'));
  }

  triggers.forEach(t => t.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Auto-prompt after 10 seconds (only once per session)
  if (!sessionStorage.getItem('akgu_enquiry_shown')) {
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        openModal();
        sessionStorage.setItem('akgu_enquiry_shown', '1');
      }
    }, 10000);
  }

  // Form submission handler (demo — logs to console, would POST to server)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation
    let valid = true;
    ['name', 'phone', 'program'].forEach(field => {
      const el = form.elements[field];
      if (!el?.value.trim()) {
        el?.classList.add('error');
        valid = false;
      } else {
        el?.classList.remove('error');
      }
    });
    if (!valid) return;

    // Phone format check (basic Indian phone)
    const phone = form.elements['phone']?.value.replace(/\s/g, '');
    if (!/^[+]?[0-9]{10,13}$/.test(phone)) {
      form.elements['phone']?.classList.add('error');
      return;
    }

    console.log('[AKGU Enquiry]', data);

    // Replace form with success message
    form.innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="font-display font-bold text-xl text-navy">Thank You, ${escapeHtml(data.name || 'there')}!</h3>
        <p class="text-slate text-sm">Our admissions team will contact you within 24 hours.<br/>
        Check your email for a confirmation shortly.</p>
        <button type="button" onclick="document.getElementById('enquiryModal').classList.remove('active'); document.body.style.overflow='';"
          class="bg-amber hover:bg-amber-light text-white font-bold px-6 py-2.5 rounded-xl transition">
          Close
        </button>
      </div>
    `;
  });
})();

/* ============================================================
   8. SEARCH MODAL (button + CMD/CTRL + K)
   ============================================================ */
(function initSearchModal() {
  const modal    = $('#searchModal');
  const searchBtn= $('#searchBtn');
  const input    = $('#searchInput');
  const results  = $('#searchResults');
  const backdrop = modal?.querySelector('.modal-backdrop');

  if (!modal) return;

  // Searchable data index
  const searchIndex = [
    { title: 'B.Tech Computer Science & AI/ML', url: '#programs', category: 'Program' },
    { title: 'B.Tech Mechanical Engineering (Robotics)', url: '#programs', category: 'Program' },
    { title: 'B.Tech Cyber Security & Ethical Hacking', url: '#programs', category: 'Program' },
    { title: 'BBA – Business Administration', url: '#programs', category: 'Program' },
    { title: 'BCA – Computer Applications', url: '#programs', category: 'Program' },
    { title: 'MBA – Digital Business & Strategy', url: '#programs', category: 'Program' },
    { title: 'M.Tech – Data Science & Artificial Intelligence', url: '#programs', category: 'Program' },
    { title: 'MCA – Advanced Computing', url: '#programs', category: 'Program' },
    { title: 'Ph.D. – Computer Science & AI', url: '#programs', category: 'Research' },
    { title: 'Ph.D. – Mechanical & Robotics Engineering', url: '#programs', category: 'Research' },
    { title: 'KUKA Industrial Robotics Lab', url: '#coe', category: 'Centre of Excellence' },
    { title: 'Siemens/Bosch Smart Manufacturing Centre', url: '#coe', category: 'Centre of Excellence' },
    { title: '3D Printing & Additive Manufacturing', url: '#coe', category: 'Centre of Excellence' },
    { title: 'Virtual Instrumentation & Embedded Systems', url: '#coe', category: 'Centre of Excellence' },
    { title: 'IDEA Lab & Startup Incubation', url: '#research', category: 'Research' },
    { title: 'Research Council & Patents', url: '#research', category: 'Research' },
    { title: 'Placements & Recruiters 2025', url: '#placements', category: 'Placements' },
    { title: 'Fee & Scholarship Calculator', url: '#calculator', category: 'Admissions' },
    { title: 'Super-30 Merit Scholarship', url: '#calculator', category: 'Admissions' },
    { title: 'Campus Life & Student Clubs', url: '#campus', category: 'Campus' },
    { title: 'Universal Human Values Cell (UHV)', url: '#campus', category: 'Campus' },
    { title: 'Hostel & Accommodation', url: '#campus', category: 'Campus' },
    { title: 'Anti-Ragging Committee', url: '#', category: 'Compliance' },
    { title: 'IQAC & Accreditation', url: '#', category: 'Governance' },
    { title: 'Admissions 2026–27', url: '#', category: 'Admissions' },
  ];

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    renderResults('');
  }

  function renderResults(query) {
    if (!results) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      results.innerHTML = '<div class="px-5 py-3 text-sm text-gray-400">Start typing to search…</div>';
      return;
    }

    const hits = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 8);

    if (!hits.length) {
      results.innerHTML = '<div class="px-5 py-3 text-sm text-gray-400">No results found for <strong>' + escapeHtml(query) + '</strong></div>';
      return;
    }

    results.innerHTML = hits.map(item => `
      <a href="${item.url}" 
         class="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition group"
         onclick="document.getElementById('searchModal').classList.remove('active'); document.body.style.overflow='';">
        <span class="text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-full shrink-0">${escapeHtml(item.category)}</span>
        <span class="text-sm text-gray-800 group-hover:text-navy font-medium">${highlightMatch(item.title, q)}</span>
      </a>
    `).join('');
  }

  function highlightMatch(text, q) {
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return escapeHtml(text);
    return escapeHtml(text.slice(0, idx))
      + '<mark class="bg-amber/20 text-amber font-semibold rounded px-0.5">' + escapeHtml(text.slice(idx, idx + q.length)) + '</mark>'
      + escapeHtml(text.slice(idx + q.length));
  }

  searchBtn?.addEventListener('click', openSearch);
  backdrop?.addEventListener('click', closeSearch);
  input?.addEventListener('input', () => renderResults(input.value));

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) closeSearch();
  });
})();

/* ============================================================
   9. SCROLL REVEAL ANIMATIONS
   ============================================================ */
(function initScrollReveal() {
  const els = $$('.stat-item, .program-card, .coe-card, .research-metric, .phd-domain-card, .placement-metric, .testimonial-card, .campus-club-card, .campus-feature-box');

  if (!els.length) return;

  // Add reveal class to elements
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ============================================================
   10. BACK-TO-TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  // Create the button
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>`;
  document.body.appendChild(btn);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ============================================================
   UTILITY: HTML escape to prevent XSS in dynamic content
   ============================================================ */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ============================================================
   KEYBOARD SHORTCUT HINT (subtle, appears once)
   ============================================================ */
(function showSearchHint() {
  if (sessionStorage.getItem('akgu_search_hint')) return;

  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
  const hint  = document.createElement('div');
  hint.style.cssText = `
    position:fixed; bottom:5rem; left:50%; transform:translateX(-50%) translateY(8px);
    background:rgba(15,23,42,.9); color:#f8fafc; font-size:.75rem; padding:.5rem 1rem;
    border-radius:9999px; z-index:50; opacity:0; pointer-events:none;
    transition:opacity .4s ease, transform .4s ease;
    backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.1);
  `;
  hint.textContent = `Press ${isMac ? '⌘' : 'Ctrl'} + K to search`;
  document.body.appendChild(hint);

  setTimeout(() => {
    hint.style.opacity = '1';
    hint.style.transform = 'translateX(-50%) translateY(0)';
    sessionStorage.setItem('akgu_search_hint', '1');
  }, 2000);

  setTimeout(() => {
    hint.style.opacity = '0';
    hint.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => hint.remove(), 400);
  }, 6000);
})();
