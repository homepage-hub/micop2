// ---------------- MOBILE MENU ----------------
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// ---------------- SLIDER (robust, DOM-ready) ----------------
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  let dots = Array.from(document.querySelectorAll('.dot'));
  let index = 0;
  let slideInterval = null;
  const AUTO_MS = 4000;

  // If there are no slides, stop here (no errors)
  if (!slides.length) return;

  // Ensure there are as many dots as slides; if not, build them dynamically
  const dotsContainer = document.querySelector('.dots') || document.querySelector('.navigation-dots');
  if (!dots.length && dotsContainer) {
    dots = [];
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  // Safety: if dots still mismatch, trim or expand logically
  if (dots.length > slides.length) {
    dots = dots.slice(0, slides.length);
  } else if (dots.length < slides.length) {
    // create missing dots inside dotsContainer if available
    if (dotsContainer) {
      for (let i = dots.length; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    } else {
      // create a lightweight nav container if none exists
      const container = document.createElement('div');
      container.className = 'dots';
      slides[0].parentElement.appendChild(container);
      dots.length = 0;
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = i;
        container.appendChild(dot);
        dots.push(dot);
      });
    }
  }

  // Utility to apply active classes
  function showSlide(i) {
    // clamp index
    index = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle('active', n === index);
    });
    dots.forEach((d, n) => {
      d.classList.toggle('active', n === index);
    });
  }

  // next slide
  function nextSlide() {
    showSlide(index + 1);
  }

  // start auto-play
  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, AUTO_MS);
  }

  // stop auto-play
  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Add click handlers to dots (with autoplay restart)
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      // restart autoplay so user sees the current slide for the full duration
      startAutoplay();
    });
  });

  // Pause on hover (optional — uncomment if desired)
  const sliderEl = document.querySelector('.slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', () => stopAutoplay());
    sliderEl.addEventListener('mouseleave', () => startAutoplay());
  }

  // Initialize (set first slide active)
  showSlide(0);
  startAutoplay();
});


// Futuristic light flicker animation on footer background
const footer = document.querySelector('.footer');
setInterval(() => {
  const glow = document.createElement('div');
  glow.className = 'footer-glow';
  glow.style.left = Math.random() * window.innerWidth + 'px';
  glow.style.top = Math.random() * 100 + 'px';
  glow.style.background = `rgba(0,255,255,${Math.random() * 0.3 + 0.2})`;
  footer.appendChild(glow);

  setTimeout(() => glow.remove(), 2000);
}, 1200);
