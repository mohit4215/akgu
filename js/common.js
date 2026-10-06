/**
 * AKGU University Portal — Shared Client Script
 * Controls mobile drawer, modals (Search, Enquiry, ERP, Video), and UI shortcuts
 */

// Mobile Navigation
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.toggle('hidden');
}

function toggleMobileAccordion(id) {
  const content = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');
  if (!content) return;
  if (content.classList.contains('open')) {
    content.classList.remove('open');
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('open');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// FAQ Accordion Toggle
function toggleFaq(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById(id + '-icon');
  if (el) {
    el.classList.toggle('hidden');
    if (icon) icon.classList.toggle('rotate-180');
  }
}

// Video Tour Modal
function openVideoTourModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  if (iframe) iframe.src = "https://www.youtube.com/embed/videoseries?list=PL_XvB3vW22hQ0V6S5w_dC3H-4aX_Y9j6-&autoplay=1";
  if (modal) modal.classList.remove('hidden');
}
function closeVideoTourModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  if (iframe) iframe.src = "";
  if (modal) modal.classList.add('hidden');
}

// Lead Enquiry Modal (Yellow Highlight Theme)
function openEnquiryModal(prog) {
  const modal = document.getElementById('enquiryModal');
  const form = document.getElementById('enquiryForm');
  const success = document.getElementById('enquirySuccess');
  if (modal) modal.classList.remove('hidden');
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  
  if (prog && document.getElementById('enquiryProgramSelect')) {
    const select = document.getElementById('enquiryProgramSelect');
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase().includes(prog.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  if (modal) modal.classList.add('hidden');
  try {
    sessionStorage.setItem('akgu_apply_popup_dismissed', 'true');
  } catch(e) {}
}

function handleEnquirySubmit(e) {
  e.preventDefault();
  const form = document.getElementById('enquiryForm');
  const success = document.getElementById('enquirySuccess');
  if (form) form.classList.add('hidden');
  if (success) success.classList.remove('hidden');
  try {
    sessionStorage.setItem('akgu_apply_popup_dismissed', 'true');
  } catch(e) {}
}

// Auto Pop-up Apply Now form when opening the website
function initAutoApplyModal() {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;

  try {
    const dismissed = sessionStorage.getItem('akgu_apply_popup_dismissed');
    if (!dismissed) {
      setTimeout(() => {
        openEnquiryModal('Admissions 2026–27 Open');
      }, 1400); // 1.4s delay for a smooth visitor experience
    }
  } catch(e) {
    setTimeout(() => {
      openEnquiryModal('Admissions 2026–27 Open');
    }, 1400);
  }
}

// Student Portal ERP Modal
function openStudentPortalModal() {
  const modal = document.getElementById('studentPortalModal');
  const alertEl = document.getElementById('erpAlert');
  if (modal) modal.classList.remove('hidden');
  if (alertEl) alertEl.classList.add('hidden');
}
function closeStudentPortalModal() {
  const modal = document.getElementById('studentPortalModal');
  if (modal) modal.classList.add('hidden');
}
function handleErpSubmit(e) {
  e.preventDefault();
  const alertEl = document.getElementById('erpAlert');
  if (alertEl) alertEl.classList.remove('hidden');
  setTimeout(() => {
    closeStudentPortalModal();
  }, 1500);
}

// Search Modal
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  if (modal) modal.classList.remove('hidden');
  if (input) setTimeout(() => input.focus(), 100);
}
function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.classList.add('hidden');
}

// Campus Video Tour Modal (Method 3 + 4 combined)
function openVideoTourModal(videoSrc = "videos/campus-tour.mp4") {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideoPlayer');
  const modalIframe = document.getElementById('videoModalIframe');
  const heroVideo = document.getElementById('heroBgVideo');

  // Pause background hero video when opening modal
  if (heroVideo && !heroVideo.paused) {
    heroVideo.pause();
  }

  if (!modal) return;
  modal.classList.remove('hidden');

  // Check if src is YouTube or external URL
  if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.classList.add('hidden');
    }
    if (modalIframe) {
      modalIframe.classList.remove('hidden');
      modalIframe.src = videoSrc.includes('autoplay') ? videoSrc : `${videoSrc}?autoplay=1&rel=0`;
    }
  } else {
    // Local HTML5 Video (Method 3)
    if (modalIframe) {
      modalIframe.src = '';
      modalIframe.classList.add('hidden');
    }
    if (modalVideo) {
      modalVideo.classList.remove('hidden');
      const source = modalVideo.querySelector('source');
      if (source && !source.src.endsWith(videoSrc)) {
        source.src = videoSrc;
        modalVideo.load();
      }
      modalVideo.currentTime = 0;
      modalVideo.play().catch(() => {});
    }
  }
}

function closeVideoTourModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideoPlayer');
  const modalIframe = document.getElementById('videoModalIframe');
  const heroVideo = document.getElementById('heroBgVideo');

  if (modalVideo) {
    modalVideo.pause();
  }
  if (modalIframe) {
    modalIframe.src = '';
  }
  if (modal) {
    modal.classList.add('hidden');
  }

  // Resume background hero video if available
  if (heroVideo) {
    heroVideo.play().catch(() => {});
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  }
  if (e.key === 'Escape') {
    closeSearchModal();
    closeEnquiryModal();
    closeVideoTourModal();
    closeStudentPortalModal();
  }
});

// Dynamic Counting Statistics Engine (Dual Trigger: Viewport Check + Scroll Fallback + IntersectionObserver)
function initDynamicCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters || !counters.length) return;

  const animateCounter = (el) => {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseFloat(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);

    const startTime = performance.now();
    const startValue = 0;

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for energetic start and silky smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = startValue + (target - startValue) * easeProgress;

      let formattedNumber = '';
      if (decimals > 0) {
        formattedNumber = currentValue.toFixed(decimals);
      } else {
        formattedNumber = Math.floor(currentValue).toLocaleString('en-IN');
      }

      el.textContent = `${prefix}${formattedNumber}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        const finalFormatted = decimals > 0 ? target.toFixed(decimals) : Math.floor(target).toLocaleString('en-IN');
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const checkCountersInView = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    counters.forEach(counter => {
      if (counter.dataset.animated === 'true') return;
      const rect = counter.getBoundingClientRect();
      if (rect.top <= windowHeight + 60 && rect.bottom >= -60) {
        animateCounter(counter);
      }
    });
  };

  // 1. Immediate viewport check
  checkCountersInView();

  // 2. Scroll and resize listeners as dependable fallbacks
  window.addEventListener('scroll', checkCountersInView, { passive: true });
  window.addEventListener('resize', checkCountersInView, { passive: true });

  // 3. IntersectionObserver for high-performance viewport detection
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '60px 0px 60px 0px' });

    counters.forEach(counter => {
      if (counter.dataset.animated !== 'true') {
        observer.observe(counter);
      }
    });
  }
}

// Ensure startup runs whether DOMContentLoaded is pending or already fired
function startCommonScripts() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  initAutoApplyModal();
  initDynamicCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startCommonScripts);
} else {
  startCommonScripts();
}
