// --- Scroll Reveal Animations for Elements ---
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.tree-step-item, .polaroid-card, .herb-dish-card, .culinary-dish-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- Quality Carousel: Auto-Sliding Animation & Active Dot Tracker ---
  const carouselTrack = document.getElementById('qualityCarousel');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (carouselTrack && carouselDots.length) {
    const cards = carouselTrack.querySelectorAll('.quality-carousel-card');
    let currentIdx = 0;
    let autoPlayTimer = null;
    let pauseTimer = null;
    let isUserInteracting = false;

    // Function to scroll smoothly to a specific card
    function scrollToCard(index) {
      if (!cards[index]) return;
      const targetCard = cards[index];
      // Center the card in the viewport
      const offsetLeft = targetCard.offsetLeft - (carouselTrack.offsetWidth - targetCard.offsetWidth) / 2;
      carouselTrack.scrollTo({
        left: Math.max(0, offsetLeft),
        behavior: 'smooth'
      });
    }

    // Advance to next card and loop
    function autoAdvance() {
      if (isUserInteracting) return;
      currentIdx = (currentIdx + 1) % cards.length;
      scrollToCard(currentIdx);
    }

    // Start auto-play timer (slides every 2.6 seconds)
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(autoAdvance, 2600);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    // Pause autoplay on user touch/scroll, then resume
    function handleUserTouch() {
      isUserInteracting = true;
      if (pauseTimer) clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        isUserInteracting = false;
      }, 3500);
    }

    // Sync active dot on scroll
    carouselTrack.addEventListener('scroll', () => {
      const trackCenter = carouselTrack.scrollLeft + carouselTrack.offsetWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(trackCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      currentIdx = closestIdx;
      carouselDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIdx);
      });
    }, { passive: true });

    // Touch & pointer interaction listeners
    carouselTrack.addEventListener('touchstart', handleUserTouch, { passive: true });
    carouselTrack.addEventListener('pointerdown', handleUserTouch, { passive: true });

    // Click dot to navigate directly
    carouselDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        handleUserTouch();
        currentIdx = idx;
        scrollToCard(idx);
      });
    });

    // Start auto-slide after brief initial delay
    setTimeout(startAutoPlay, 1000);
  }

  // --- Testimonials Carousel: Swipe & Dots Tracker ---
  const testiTrack = document.getElementById('testimonialsTrack');
  const testiDots = document.querySelectorAll('.testi-dot');

  if (testiTrack && testiDots.length) {
    const testiCards = testiTrack.querySelectorAll('.testimonial-card');
    let currentTestiIdx = 0;
    let testiAutoTimer = null;
    let isTestiInteracting = false;
    let testiPauseTimer = null;

    function scrollTestiTo(index) {
      if (!testiCards[index]) return;
      const targetCard = testiCards[index];
      const offsetLeft = targetCard.offsetLeft - (testiTrack.offsetWidth - targetCard.offsetWidth) / 2;
      testiTrack.scrollTo({
        left: Math.max(0, offsetLeft),
        behavior: 'smooth'
      });
    }

    function autoAdvanceTesti() {
      if (isTestiInteracting) return;
      currentTestiIdx = (currentTestiIdx + 1) % testiCards.length;
      scrollTestiTo(currentTestiIdx);
    }

    function startTestiAuto() {
      stopTestiAuto();
      testiAutoTimer = setInterval(autoAdvanceTesti, 3800);
    }

    function stopTestiAuto() {
      if (testiAutoTimer) {
        clearInterval(testiAutoTimer);
        testiAutoTimer = null;
      }
    }

    function handleTestiTouch() {
      isTestiInteracting = true;
      if (testiPauseTimer) clearTimeout(testiPauseTimer);
      testiPauseTimer = setTimeout(() => {
        isTestiInteracting = false;
      }, 4000);
    }

    testiTrack.addEventListener('scroll', () => {
      const trackCenter = testiTrack.scrollLeft + testiTrack.offsetWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      testiCards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(trackCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      currentTestiIdx = closestIdx;
      testiDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIdx);
      });
    }, { passive: true });

    testiTrack.addEventListener('touchstart', handleTestiTouch, { passive: true });
    testiTrack.addEventListener('pointerdown', handleTestiTouch, { passive: true });

    testiDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        handleTestiTouch();
        currentTestiIdx = idx;
        scrollTestiTo(idx);
      });
    });

    setTimeout(startTestiAuto, 1800);
  }

  // --- FAQ Accordion Toggle Interaction ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items first for clean accordion
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
