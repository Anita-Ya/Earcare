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

  // --- Smooth Scroll for Internal Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Focus name input if navigating to order section
          if (targetId === '#order') {
            const nameInput = document.getElementById('userName');
            if (nameInput) {
              setTimeout(() => nameInput.focus(), 400);
            }
          }
        }
      }
    });
  });

  // --- Order Form Validation (Matching Reference Image) ---
  const orderForm = document.getElementById('orderForm');
  const userNameInput = document.getElementById('userName');
  const userPhoneInput = document.getElementById('userPhone');
  const groupName = document.getElementById('groupName');
  const groupPhone = document.getElementById('groupPhone');

  // Name Regex: Letters only (English & Hindi Devanagari), spaces and dots, min 2 chars
  const nameRegex = /^[A-Za-z\u0900-\u097F\s.]{2,50}$/;
  // Phone Regex: Exactly 10 digits starting with 6, 7, 8, or 9
  const phoneRegex = /^[6-9]\d{9}$/;

  function validateName() {
    if (!userNameInput || !groupName) return true;
    const val = userNameInput.value.trim();
    if (!val || !nameRegex.test(val)) {
      groupName.classList.add('has-error');
      groupName.classList.remove('has-success');
      return false;
    } else {
      groupName.classList.remove('has-error');
      groupName.classList.add('has-success');
      return true;
    }
  }

  function validatePhone() {
    if (!userPhoneInput || !groupPhone) return true;
    const val = userPhoneInput.value.trim();
    if (!phoneRegex.test(val)) {
      groupPhone.classList.add('has-error');
      groupPhone.classList.remove('has-success');
      return false;
    } else {
      groupPhone.classList.remove('has-error');
      groupPhone.classList.add('has-success');
      return true;
    }
  }

  if (userNameInput) {
    userNameInput.addEventListener('input', () => {
      if (groupName.classList.contains('has-error')) {
        validateName();
      }
    });
    userNameInput.addEventListener('blur', () => {
      if (userNameInput.value.trim()) {
        validateName();
      }
    });
  }

  if (userPhoneInput) {
    // Restrict input to digits only
    userPhoneInput.addEventListener('input', () => {
      userPhoneInput.value = userPhoneInput.value.replace(/\D/g, '');
      if (groupPhone.classList.contains('has-error')) {
        validatePhone();
      }
    });
    userPhoneInput.addEventListener('blur', () => {
      if (userPhoneInput.value.trim()) {
        validatePhone();
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isNameValid = validateName();
      const isPhoneValid = validatePhone();

      if (!isNameValid || !isPhoneValid) {
        if (!isNameValid && userNameInput) {
          userNameInput.focus();
        } else if (!isPhoneValid && userPhoneInput) {
          userPhoneInput.focus();
        }
        return false;
      }

      // Valid submission: Collect values before resetting
      const enteredName = userNameInput ? userNameInput.value.trim() : '';
      const enteredPhone = userPhoneInput ? userPhoneInput.value.trim() : '';

      // Generate random order ID
      const randomOrderId = 'EC-' + Math.floor(100000 + Math.random() * 900000);

      // Populate Thank You Modal
      const modalCustName = document.getElementById('modalCustomerName');
      const modalOrderId = document.getElementById('modalOrderId');
      const modalMobile = document.getElementById('modalMobile');
      const thankYouModal = document.getElementById('thankYouModal');

      if (modalCustName) modalCustName.textContent = enteredName || 'Customer';
      if (modalOrderId) modalOrderId.textContent = randomOrderId;
      if (modalMobile) modalMobile.textContent = enteredPhone ? ('+91 ' + enteredPhone) : '+91 ----------';

      // Open Modal
      if (thankYouModal) {
        thankYouModal.classList.add('is-open');
        thankYouModal.setAttribute('aria-hidden', 'false');
      }

      // Reset form
      orderForm.reset();
      if (groupName) groupName.classList.remove('has-success');
      if (groupPhone) groupPhone.classList.remove('has-success');
    });
  }

  // --- Thank You Modal Close Handlers ---
  const thankYouModal = document.getElementById('thankYouModal');
  const modalCloseX = document.getElementById('modalCloseX');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');

  function closeModal() {
    if (thankYouModal) {
      thankYouModal.classList.remove('is-open');
      thankYouModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseX) {
    modalCloseX.addEventListener('click', closeModal);
  }

  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', closeModal);
  }

  if (thankYouModal) {
    // Close on clicking backdrop outside the dialog card
    thankYouModal.addEventListener('click', (e) => {
      if (e.target === thankYouModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && thankYouModal && thankYouModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // --- Sticky Floating Order Bar Observer ---
  const stickyOrderBar = document.getElementById('stickyOrderBar');
  const orderSection = document.getElementById('order');

  if (stickyOrderBar && orderSection && 'IntersectionObserver' in window) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When order form section is visible, hide sticky bottom bar
        if (entry.isIntersecting) {
          stickyOrderBar.classList.add('is-hidden');
        } else {
          stickyOrderBar.classList.remove('is-hidden');
        }
      });
    }, {
      root: null,
      threshold: 0.15
    });

    stickyObserver.observe(orderSection);
  }
});
