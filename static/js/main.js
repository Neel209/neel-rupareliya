/**
 * Main Interactive Application Controller for Neel Rupareliya Portfolio
 * Features:
 * - Lenis Smooth Scrolling integration
 * - 3D Tilt Card physics with spotlight tracking
 * - Animated Stats Numerical Counters (Framer-style viewport triggers)
 * - Copy to Clipboard with animated icon checkmark feedback
 * - Toast notification engine
 * - AJAX Contact Transmission
 * - Advanced Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    window.lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Smooth Scroll Helper
  window.scrollToSection = function (selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -70, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. 3D Tilt Hover Physics for Project Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    const inner = card.querySelector('.tilt-inner') || card;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

      // Spotlight coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 3. Viewport Animated Numerical Counters
  const counterElements = document.querySelectorAll('[data-counter-target]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const suffix = el.getAttribute('data-counter-suffix') || '';
        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(start + (target - start) * easeProgress);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach((el) => counterObserver.observe(el));

  // 4. Scroll Reveal suite
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4b. Initialize Skill Progress Bars from data-level
  document.querySelectorAll('.skill-progress-fill').forEach((bar) => {
    const level = bar.getAttribute('data-level');
    if (level) {
      bar.style.width = level;
    }
  });

  // 5. Toast Notification System
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}"></span>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 320);
    }, 4000);
  };

  // 6. Copy to Clipboard Utility with Icon Checkmark Feedback
  window.copyToClipboard = function (text, btnElement) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
        animateCheckmark(btnElement);
      }).catch(() => {
        fallbackCopy(text, btnElement);
      });
    } else {
      fallbackCopy(text, btnElement);
    }
  };

  function fallbackCopy(text, btnElement) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied to clipboard: ${text}`);
      animateCheckmark(btnElement);
    } catch (e) {
      showToast(text);
    }
    document.body.removeChild(tempInput);
  }

  function animateCheckmark(btn) {
    if (!btn) return;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg class="w-4 h-4 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
      </svg>
    `;
    btn.classList.add('border-emerald-400', 'bg-emerald-500/20');
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('border-emerald-400', 'bg-emerald-500/20');
    }, 1800);
  }

  // Backward compatibility
  window.copyEmail = function (email = 'neelrupareliya09@gmail.com') {
    copyToClipboard(email);
  };

  // 7. Resume Direct Redirection (Redirect to Separate Dedicated Page)
  window.openResumeModal = function () {
    window.location.href = '/resume';
  };

  // Keyboard shortcut Ctrl+K opens resume page
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      window.location.href = '/resume';
    }
  });

  // 8. Advanced Mobile Navigation Drawer
  const mobileToggle = document.getElementById('navMobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileClose = document.getElementById('mobileDrawerClose');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('translate-x-full');
    if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
    if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 9. Contact Form AJAX Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('contactSubmitBtn');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Transmit Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="w-3.5 h-3.5 border-2 border-[#07090e] border-t-transparent rounded-full animate-spin inline-block"></span>
          <span>Transmitting...</span>
        `;
      }

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok) {
          showToast(data.message || 'Message transmitted — expect a reply within 24h.');
          contactForm.reset();
        } else {
          showToast(data.message || 'Transmission failed. Please check your fields.', 'error');
        }
      } catch (err) {
        showToast('Network error while transmitting. Please email directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }
});
