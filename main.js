/* ============================================
   AI HOUSE — MADEby.agency
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- STATE ---- */
  let currentLang = 'pl';

  /* ---- UTILS ---- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  /* ============================================
     LANGUAGE SYSTEM
     ============================================ */
  function applyLang(lang) {
    currentLang = lang;

    /* All elements with data-pl / data-en */
    $$('[data-pl],[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;

      /* Inputs, selects, textareas → placeholder */
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'LABEL') {
        el.textContent = text;
      } else if (el.tagName === 'BUTTON') {
        el.textContent = text;
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    });

    /* Hidden input subject */
    const subjectInput = $('input[name="_subject"]');
    if (subjectInput) {
      subjectInput.value = subjectInput.getAttribute(`data-${lang}`) || '';
    }

    /* Blog category buttons */
    $$('.cat-btn').forEach(btn => {
      const text = btn.getAttribute(`data-${lang}`);
      if (text) btn.textContent = text;
    });

    /* Lang toggle button */
    const langBtn = $('#langToggle');
    if (langBtn) langBtn.textContent = lang === 'pl' ? 'EN' : 'PL';

    /* Store */
    localStorage.setItem('aihouse-lang', lang);
  }

  function initLang() {
    const saved = localStorage.getItem('aihouse-lang');
    const lang = saved || 'pl';
    applyLang(lang);

    const langBtn = $('#langToggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        applyLang(currentLang === 'pl' ? 'en' : 'pl');
      });
    }
  }

  /* ============================================
     NAVBAR — scroll behaviour
     ============================================ */
  function initNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Smooth nav links */
    $$('.nav-links a').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          closeMenu();
        }
      });
    });
  }

  /* ============================================
     HAMBURGER MENU
     ============================================ */
  function initHamburger() {
    const btn = $('#hamburger');
    const navLinks = $('#navLinks');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      navLinks.classList.toggle('mobile-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  function closeMenu() {
    const btn = $('#hamburger');
    const navLinks = $('#navLinks');
    if (!btn || !navLinks) return;
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('mobile-open');
    document.body.style.overflow = '';
  }

  /* ============================================
     DEMO REEL MODAL
     ============================================ */
  function initModal() {
    const modal = $('#reelModal');
    const backdrop = $('#modalBackdrop');
    const closeBtn = $('#modalClose');
    const watchBtn = $('#watchReelBtn');
    const modalVideo = $('#modalVideo');
    if (!modal) return;

    function openModal() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (modalVideo) {
        modalVideo.currentTime = 0;
        modalVideo.play().catch(() => {});
      }
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }

    if (watchBtn) watchBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function initScrollReveal() {
    /* Add reveal class to elements */
    const targets = [
      '.about-intro',
      '.founder-card',
      '.service-card',
      '.stat-item',
      '.bar-item',
      '.partner-logo',
      '.blog-card',
      '.contact-text',
      '.contact-form',
      '.section-header'
    ];

    targets.forEach(sel => {
      $$(sel).forEach((el, i) => {
        el.classList.add('reveal');
        /* Stagger delay for grid children */
        const delay = (i % 5) * 0.1;
        el.style.transitionDelay = `${delay}s`;
      });
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.reveal').forEach(el => observer.observe(el));
  }

  /* ============================================
     COUNTER ANIMATION
     ============================================ */
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out quart */
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(eased * target);
      el.textContent = value + (suffix || '') + '%';
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const statNums = $$('.stat-num');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          /* Skip static elements like 3x */
          if (el.classList.contains('stat-num--x')) {
            observer.unobserve(el);
            return;
          }

          const target = parseInt(el.getAttribute('data-value'), 10);
          el.textContent = '0%';
          animateCounter(el, target);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    statNums.forEach(el => observer.observe(el));
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(eased * target);
      el.textContent = value + '%';
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ============================================
     BACK TO TOP
     ============================================ */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     PROGRESS BARS
     ============================================ */
  function initBars() {
    const bars = $$('.bar-fill');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          observer.unobserve(bar);
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(b => observer.observe(b));
  }

  /* ============================================
     BLOG FILTER
     ============================================ */
  function initBlogFilter() {
    const catBtns = $$('.cat-btn');
    const cards = $$('.blog-card');

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        /* Active state */
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-cat');

        cards.forEach((card, i) => {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.classList.remove('hidden');
            /* Stagger re-appear */
            card.style.animationDelay = `${(i % 6) * 0.05}s`;
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ============================================
     CONTACT FORM (Formspree)
     ============================================ */
  function initContactForm() {
    const form = $('#contactForm');
    const successMsg = $('#formSuccess');
    const submitBtn = $('#formSubmitBtn');
    if (!form) return;

    /* Set proper Formspree endpoint */
    form.action = 'https://formspree.io/f/malgorzata@madeby.agency';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = submitBtn.textContent;
      submitBtn.textContent = currentLang === 'pl' ? 'Wysyłam…' : 'Sending…';
      submitBtn.disabled = true;

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          if (successMsg) {
            successMsg.classList.add('show');
            setTimeout(() => successMsg.classList.remove('show'), 5000);
          }
        } else {
          throw new Error('Network response not ok');
        }
      } catch (err) {
        alert(currentLang === 'pl'
          ? 'Błąd wysyłania. Spróbuj ponownie lub wyślij email bezpośrednio na malgorzata@madeby.agency'
          : 'Send error. Please try again or email malgorzata@madeby.agency directly.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ============================================
     HERO VIDEO — fallback
     ============================================ */
  function initHeroVideo() {
    const video = $('#heroVideo');
    if (!video) return;

    video.addEventListener('error', () => {
      /* Graceful fallback — show gradient bg */
      const hero = $('#hero');
      if (hero) {
        hero.style.background = 'linear-gradient(135deg, #080808 0%, #1a0800 50%, #2d1000 100%)';
      }
    });
  }

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.length <= 1) return;
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================
     ACTIVE NAV LINK on scroll
     ============================================ */
  function initActiveNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.style.color = link.getAttribute('href') === `#${id}`
                ? 'var(--white)'
                : '';
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }
  /* ============================================
     BLOG READER OVERLAY (Direct from BLOG_DATA)
     ============================================ */
  const parsedArticles = typeof BLOG_DATA !== 'undefined' ? BLOG_DATA : [];

  function initBlogReader() {
    const reader = $('#blogReaderModal');
    const closeBtn = $('#blogReaderClose');
    const contentWrap = $('.blog-reader-content-wrap');
    const progressBar = $('#blogReaderProgress');
    const cards = $$('.blog-card');

    if (!reader) return;

    // Setup reader progress bar tracking
    if (contentWrap && progressBar) {
      contentWrap.addEventListener('scroll', () => {
        const scrollHeight = contentWrap.scrollHeight - contentWrap.clientHeight;
        if (scrollHeight > 0) {
          const pct = (contentWrap.scrollTop / scrollHeight) * 100;
          progressBar.style.width = pct + '%';
        }
      });
    }

    function openArticle(index) {
      if (!parsedArticles[index]) return;
      const art = parsedArticles[index];
      const card = cards[index];

      // Grab dynamic category and read time based on language from card
      const categoryTag = card ? card.querySelector('.blog-cat-tag') : null;
      const metaSpan = card ? card.querySelector('.blog-meta span:last-child') : null;
      
      const catText = categoryTag ? categoryTag.textContent : art.category;
      const timeText = metaSpan ? metaSpan.textContent : '5 min read';

      // Set fields
      $('#blogReaderCat').textContent = catText;
      $('#blogReaderTime').textContent = timeText;
      $('#blogReaderTitle').textContent = card ? card.querySelector('.blog-title').textContent : art.title;
      $('#blogReaderBody').innerHTML = art.bodyHtml;

      // Populate related articles sidebar
      const relatedContainer = $('#blogReaderRelated');
      if (relatedContainer) {
        relatedContainer.innerHTML = '';
        
        // Show other articles
        parsedArticles.forEach((otherArt, otherIdx) => {
          if (otherIdx === index) return; // skip active

          const otherCard = cards[otherIdx];
          if (!otherCard) return; // absolute safeguard!

          const otherTitle = otherCard.querySelector('.blog-title') ? otherCard.querySelector('.blog-title').textContent : otherArt.title;
          const otherCatText = otherCard.querySelector('.blog-cat-tag') ? otherCard.querySelector('.blog-cat-tag').textContent : otherArt.category;

          const relatedCard = document.createElement('div');
          relatedCard.className = 'related-card';
          relatedCard.innerHTML = `
            <span class="related-cat">${otherCatText}</span>
            <span class="related-title">${otherTitle}</span>
          `;

          relatedCard.addEventListener('click', () => {
            openArticle(otherIdx);
            if (contentWrap) contentWrap.scrollTop = 0;
          });

          relatedContainer.appendChild(relatedCard);
        });
      }

      // Open reader with premium animation
      reader.classList.add('open');
      document.body.classList.add('reader-open');
      if (contentWrap) contentWrap.scrollTop = 0;
      if (progressBar) progressBar.style.width = '0%';
    }

    function closeReader() {
      reader.classList.remove('open');
      document.body.classList.remove('reader-open');
    }

    // Attach click events to blog cards
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        openArticle(idx);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeReader);

    // Escape key support
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && reader.classList.contains('open')) {
        closeReader();
      }
    });
  }

  /* ============================================
     INIT ALL
     ============================================ */
  function init() {
    initLang();
    initNavbar();
    initHamburger();
    initModal();
    initScrollReveal();
    initCounters();
    initBars();
    initBlogFilter();
    initBlogReader();
    initContactForm();
    initHeroVideo();
    initSmoothScroll();
    initActiveNav();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
