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

// Lead Enquiry Modal
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
}
function handleEnquirySubmit(e) {
  e.preventDefault();
  const form = document.getElementById('enquiryForm');
  const success = document.getElementById('enquirySuccess');
  if (form) form.classList.add('hidden');
  if (success) success.classList.remove('hidden');
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

// Initialize Lucide icons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
