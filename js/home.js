/**
 * AKGU University Portal — Homepage Interactions
 * Features authentic campus photography, scrollytelling, hero carousel, and animations
 */

const CAMPUS_STORIES = [
  {
    counter: '01 / 05',
    label: 'Academic Heritage Quad',
    title: 'The 40-Acre Monumental Smart Green Quad',
    location: 'Adhyatmik Nagar • Delhi-Meerut Expressway'
  },
  {
    counter: '02 / 05',
    label: 'Innovation & Incubation CoE',
    title: 'AKG Foundation Common Facility Center (CFC)',
    location: 'Innovation, Tool Room & Product Development Center'
  },
  {
    counter: '03 / 05',
    label: 'Industrial Machining Workcell',
    title: 'Advanced CNC Machining & Automation CoE',
    location: 'High-Precision Surface Grinding & CNC Turning Labs'
  },
  {
    counter: '04 / 05',
    label: 'Open-Air Amphitheatre',
    title: 'Monumental Fest Arena & Cultural Amphitheatre',
    location: 'Tiered Stone Amphitheatre • Surabhi Festival Hub'
  },
  {
    counter: '05 / 05',
    label: 'Materials Inspection & R&D',
    title: 'Advanced Material Testing & Sand Blasting Facility',
    location: 'Industrial Metallurgy & Materials Characterization Lab'
  }
];

let currentCampusStoryIndex = 0;

function setCampusStorySlide(idx) {
  if (idx === currentCampusStoryIndex) return;
  currentCampusStoryIndex = idx;

  for (let i = 0; i < 5; i++) {
    const slide = document.getElementById('campusSlide' + i);
    if (slide) {
      if (i === idx) slide.classList.add('active');
      else slide.classList.remove('active');
    }
  }

  const frame = document.getElementById('stickyCampusFrame');
  if (frame) {
    frame.classList.remove('flash-sweep');
    void frame.offsetWidth;
    frame.classList.add('flash-sweep');
  }

  const data = CAMPUS_STORIES[idx];
  if (data) {
    const counterEl = document.getElementById('campusSlideCounter');
    const labelEl = document.getElementById('campusSlideLabel');
    const titleEl = document.getElementById('campusSlideTitle');
    const locEl = document.getElementById('campusSlideLocation');
    if (counterEl) counterEl.textContent = data.counter;
    if (labelEl) labelEl.textContent = data.label;
    if (titleEl) titleEl.textContent = data.title;
    if (locEl) locEl.textContent = data.location;
  }

  for (let i = 0; i < 5; i++) {
    const tab = document.getElementById('campusTab' + i);
    if (tab) {
      tab.className = (i === idx)
        ? "campus-tab px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F59E0B] text-[#071E3D] shrink-0 transition-all shadow-sm"
        : "campus-tab px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#64748B] hover:text-[#003B73] shrink-0 transition-all border border-[#E2E8F0]";
    }
  }

  for (let i = 0; i < 5; i++) {
    const chap = document.getElementById('chapter' + i);
    if (chap) {
      if (i === idx) {
        chap.classList.add('active-chapter');
        chap.classList.remove('bg-white/70');
        chap.classList.add('bg-white');
      } else {
        chap.classList.remove('active-chapter');
        chap.classList.remove('bg-white');
        chap.classList.add('bg-white/70');
      }
    }
  }
}

function jumpToCampusChapter(idx) {
  setCampusStorySlide(idx);
  const chap = document.getElementById('chapter' + idx);
  if (chap) {
    chap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Hero Slider
let currentHeroIndex = 0;
const totalHeroSlides = 5;

function setHeroSlide(idx) {
  currentHeroIndex = idx;
  for (let i = 0; i < totalHeroSlides; i++) {
    const el = document.getElementById('heroImg' + i);
    if (el) {
      el.style.opacity = (i === idx) ? '1' : '0';
    }
  }
  const dots = document.querySelectorAll('.hero-dot');
  dots.forEach((dot, i) => {
    dot.className = (i === idx)
      ? 'w-3 h-3 rounded-full bg-[#F59E0B] cursor-pointer transition-all hero-dot shadow'
      : 'w-3 h-3 rounded-full bg-white/50 cursor-pointer transition-all hero-dot';
  });

  const heroBox = document.getElementById('heroPhotoFlash');
  if (heroBox) {
    heroBox.classList.remove('flash-sweep');
    void heroBox.offsetWidth;
    heroBox.classList.add('flash-sweep');
  }
}

setInterval(() => {
  setHeroSlide((currentHeroIndex + 1) % totalHeroSlides);
}, 4500);

// Scroll Animations
function initScrollAnimations() {
  const photoElements = document.querySelectorAll('.photo-reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const flashBox = entry.target.querySelector('.photo-flash-box') || entry.target;
        if (flashBox) {
          flashBox.classList.add('flash-sweep');
          setTimeout(() => flashBox.classList.remove('flash-sweep'), 1000);
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  photoElements.forEach(el => revealObserver.observe(el));

  const chapters = document.querySelectorAll('.story-chapter');
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = entry.target.getAttribute('data-chapter-idx');
        if (idx !== null) {
          setCampusStorySlide(parseInt(idx, 10));
        }
      }
    });
  }, { threshold: 0.5, rootMargin: '-10% 0px -20% 0px' });

  chapters.forEach(ch => chapterObserver.observe(ch));
}

// Hero Background Video Controller & Fallback (Methods 3 & 4 Combined)
function initHeroBgVideo() {
  const video = document.getElementById('heroBgVideo');
  if (!video) return;

  const source = video.querySelector('source');
  const handleVideoMissing = () => {
    // If no local video file exists yet, hide video smoothly so the photo carousel displays perfectly
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    const playToggle = document.getElementById('heroVideoPlayToggle');
    if (playToggle) {
      const parentPill = playToggle.closest('div');
      if (parentPill) parentPill.classList.add('hidden');
    }
  };

  if (source) {
    source.addEventListener('error', handleVideoMissing);
  }
  video.addEventListener('error', handleVideoMissing);
}

function toggleHeroBgVideoPlay() {
  const video = document.getElementById('heroBgVideo');
  const icon = document.getElementById('heroVideoPlayIcon');
  const text = document.getElementById('heroVideoPlayText');
  if (!video) return;

  if (video.paused) {
    video.play().then(() => {
      if (text) text.textContent = 'Pause Video';
      if (icon) icon.setAttribute('data-lucide', 'pause');
      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    }).catch(() => {});
  } else {
    video.pause();
    if (text) text.textContent = 'Play Video';
    if (icon) icon.setAttribute('data-lucide', 'play');
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }
}

function toggleHeroBgVideoMute() {
  const video = document.getElementById('heroBgVideo');
  const icon = document.getElementById('heroVideoMuteIcon');
  const text = document.getElementById('heroVideoMuteText');
  if (!video) return;

  video.muted = !video.muted;
  if (video.muted) {
    if (text) text.textContent = 'Muted';
    if (icon) icon.setAttribute('data-lucide', 'volume-x');
  } else {
    if (text) text.textContent = 'Sound On';
    if (icon) icon.setAttribute('data-lucide', 'volume-2');
  }
  if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeroBgVideo();
});
