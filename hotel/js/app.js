/**
 * HOTEL STARBASE & ORBITAL RESORT — APPLICATION LOGIC
 * Dynamic Starfield, Grok AI Concierge, Multi-Currency Engine & Booking Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initCountdown();
  initTelemetry();
  initCurrencyEngine();
  initSuiteFilters();
  initDestinations();
  initBookingEngine();
  initGrokConcierge();
  initMobileNav();
  initFaqAccordion();
  initScrollNav();
});

/* ==========================================================================
   1. Interactive Animated Starfield Canvas
   ========================================================================== */
function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  });

  const stars = [];
  const starCount = Math.floor((width * height) / 3200);

  function createStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.25 + 0.05,
        twinkleRate: Math.random() * 0.02 + 0.005,
        increasing: Math.random() > 0.5
      });
    }
  }

  // Shooting star
  let shootingStar = null;
  function spawnShootingStar() {
    shootingStar = {
      x: Math.random() * width * 0.7,
      y: Math.random() * height * 0.3,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 10 + 12,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      alpha: 1
    };
  }
  setInterval(() => {
    if (!shootingStar && Math.random() > 0.3) spawnShootingStar();
  }, 4500);

  createStars();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render twinkling stars
    for (const star of stars) {
      if (star.increasing) {
        star.alpha += star.twinkleRate;
        if (star.alpha >= 1) star.increasing = false;
      } else {
        star.alpha -= star.twinkleRate;
        if (star.alpha <= 0.2) star.increasing = true;
      }

      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 232, 240, ${star.alpha})`;
      ctx.fill();
    }

    // Render shooting star
    if (shootingStar) {
      const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
      const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(1, `rgba(0, 240, 255, ${shootingStar.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(shootingStar.x, shootingStar.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
      shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
      shootingStar.alpha -= 0.02;

      if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
        shootingStar = null;
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. Live SpaceX Starship Launch Countdown
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  // Set target launch 4 days, 16 hours, 42 mins from now
  const targetLaunch = new Date(Date.now() + (4 * 24 * 60 * 60 + 16 * 60 * 60 + 42 * 60 + 10) * 1000);

  function update() {
    const now = new Date();
    const diff = targetLaunch - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = d.toString().padStart(2, '0');
    hoursEl.textContent = h.toString().padStart(2, '0');
    minsEl.textContent = m.toString().padStart(2, '0');
    secsEl.textContent = s.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Live Orbital Telemetry Simulator
   ========================================================================== */
function initTelemetry() {
  const velEl = document.getElementById('telemetry-velocity');
  const altEl = document.getElementById('telemetry-altitude');
  const starlinkEl = document.getElementById('telemetry-starlink');
  const solarEl = document.getElementById('telemetry-solar');

  if (!velEl) return;

  let baseVel = 7.66;
  let baseAlt = 412.4;
  let baseStarlink = 6428;
  let basePower = 99.8;

  setInterval(() => {
    // Subtle realistic micro-fluctuations
    const velJitter = (Math.random() * 0.04 - 0.02).toFixed(2);
    const altJitter = (Math.random() * 0.2 - 0.1).toFixed(1);
    
    velEl.textContent = (baseVel + parseFloat(velJitter)).toFixed(2) + ' km/s';
    altEl.textContent = (baseAlt + parseFloat(altJitter)).toFixed(1) + ' km';
    
    if (Math.random() > 0.85) {
      baseStarlink += 1;
      starlinkEl.textContent = baseStarlink.toLocaleString();
    }
  }, 3000);
}

/* ==========================================================================
   4. Multi-Currency Engine (USD, DOGE, TSLA)
   ========================================================================== */
let activeCurrency = 'USD';
const conversionRates = {
  USD: { symbol: '$', rate: 1, suffix: '/night', dec: 0 },
  DOGE: { symbol: 'Ð', rate: 7.25, suffix: ' DOGE', dec: 0 },
  TSLA: { symbol: '', rate: 0.0041, suffix: ' TSLA', dec: 2 }
};

function initCurrencyEngine() {
  const currencyBtns = document.querySelectorAll('.currency-btn');

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.currency;
      if (!selected || selected === activeCurrency) return;

      activeCurrency = selected;
      currencyBtns.forEach(b => b.classList.toggle('active', b.dataset.currency === selected));

      updateAllPrices();
      showToast(`Currency updated to ${selected} (${conversionRates[selected].symbol || selected})`);
    });
  });

  updateAllPrices();
}

function formatPrice(baseUsd) {
  const c = conversionRates[activeCurrency];
  const converted = baseUsd * c.rate;
  if (activeCurrency === 'TSLA') {
    return `${converted.toFixed(2)}${c.suffix}`;
  } else if (activeCurrency === 'DOGE') {
    return `${c.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${c.symbol}${baseUsd.toLocaleString()}`;
}

function updateAllPrices() {
  const priceElements = document.querySelectorAll('[data-base-price]');
  priceElements.forEach(el => {
    const base = parseFloat(el.dataset.basePrice);
    if (!isNaN(base)) {
      el.innerHTML = `${formatPrice(base)} <span>/ night</span>`;
    }
  });
}

/* ==========================================================================
   5. Habitation Suites Showcase & Filtering
   ========================================================================== */
function initSuiteFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const suiteCards = document.querySelectorAll('.suite-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      suiteCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Multi-Planetary Destinations Interactive Map
   ========================================================================== */
const destinationsData = {
  starbase: {
    title: 'Starbase Resort • Boca Chica, Texas',
    coords: '25.9971° N, 97.1554° W • Sea Level',
    img: 'https://images.unsplash.com/photo-1517976487504-570224b422d4?auto=format&fit=crop&w=1400&q=80',
    desc: 'The ground-zero proving ground of humanity’s interplanetary dream. Stay adjacent to the Starship orbital launch pad, explore South Bay dunes in your complimentary Cybertruck, and dine at the Raptor Sky Bar with uninhibited views of rocket test fires.',
    flight: 'Commercial Aviation or Tesla Hyperloop direct transfer',
    gravity: '1.0 G (Earth Normal)'
  },
  orbital: {
    title: 'Orbital Station Alpha • Low Earth Orbit',
    coords: '412 km Altitude • 51.6° Inclination • 27,600 km/h',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
    desc: 'Floating 400 kilometers above Earth in silent luxury. Watch sixteen sunrises and sunsets every single day through expansive panoramic cupolas. Features our patented Zero-G floating suites and artificial gravity sleeping rings.',
    flight: 'Falcon 9 or Starship Human-Rated Launch: 45 Minutes',
    gravity: 'Micro-Gravity & 0.38G Centrifuge Deck'
  },
  mars: {
    title: 'Olympus Base Biosphere • Mars',
    coords: '18.65° N, 226.2° W • Chryse Planitia Gateway',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    desc: 'The ultimate interplanetary destination. Geodesic biospheres with native hydroponic flora, subterranean radiation shielding, Tesla solar microgrid, and guided excursions to Olympus Mons and Valles Marineris canyons.',
    flight: 'Starship Interplanetary Transfer: ~4 Months',
    gravity: '0.38 G (Martian Surface)'
  }
};

function initDestinations() {
  const destButtons = document.querySelectorAll('.dest-nav-btn');
  const previewImg = document.getElementById('dest-preview-img');
  const previewTitle = document.getElementById('dest-preview-title');
  const previewCoords = document.getElementById('dest-preview-coords');
  const previewDesc = document.getElementById('dest-preview-desc');
  const previewFlight = document.getElementById('dest-preview-flight');
  const previewGravity = document.getElementById('dest-preview-gravity');

  if (!previewImg) return;

  destButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const destKey = btn.dataset.destination;
      const data = destinationsData[destKey];
      if (!data) return;

      destButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      previewImg.style.opacity = '0.3';
      setTimeout(() => {
        previewImg.src = data.img;
        previewImg.style.opacity = '1';
        previewTitle.textContent = data.title;
        previewCoords.textContent = data.coords;
        if (previewDesc) previewDesc.textContent = data.desc;
        if (previewFlight) previewFlight.textContent = data.flight;
        if (previewGravity) previewGravity.textContent = data.gravity;
      }, 200);
    });
  });
}

/* ==========================================================================
   7. Booking Engine, Checkout Modal & Boarding Pass Generator
   ========================================================================== */
function initBookingEngine() {
  const heroForm = document.getElementById('hero-booking-form');
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close-btn');

  // Trigger modal from any .btn-book-suite
  const bookBtns = document.querySelectorAll('.btn-book-suite, .btn-book-trigger');
  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const suiteName = btn.dataset.suiteName || 'Starship Penthouse';
      const suitePrice = btn.dataset.suitePrice || '4200';
      openBookingModal(suiteName, suitePrice);
    });
  });

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('book-destination').value;
      const pod = document.getElementById('book-pod').value;
      const checkin = document.getElementById('book-checkin').value;
      const guests = document.getElementById('book-guests').value;
      openBookingModal(pod, '3500', { dest, checkin, guests });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => closeModal());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Confirm booking button
  const confirmBtn = document.getElementById('btn-confirm-launch');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      generateBoardingPass();
    });
  }

  // Priority pass subscribe form
  const ctaForm = document.getElementById('cta-subscribe-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('cta-email').value;
      if (email) {
        showToast(`Priority Pass Confirmed! Access code sent to ${email}`);
        ctaForm.reset();
      }
    });
  }
}

let currentBookingState = {
  suite: 'Starship Orbital Penthouse',
  price: 4200,
  dest: 'Starbase Texas & Orbital Gateway',
  guests: '2 Astronauts',
  dates: 'Oct 14 - Oct 19, 2026'
};

function openBookingModal(suiteName, basePrice, customData = {}) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  currentBookingState.suite = suiteName;
  currentBookingState.price = parseFloat(basePrice) || 3500;
  if (customData.dest) currentBookingState.dest = customData.dest;
  if (customData.guests) currentBookingState.guests = `${customData.guests} Astronaut(s)`;

  document.getElementById('modal-suite-name').textContent = currentBookingState.suite;
  document.getElementById('modal-calc-price').textContent = formatPrice(currentBookingState.price);

  // Reset to form view
  document.getElementById('modal-step-form').style.display = 'block';
  document.getElementById('modal-step-ticket').style.display = 'none';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function generateBoardingPass() {
  const passengerName = document.getElementById('pass-name').value.trim() || 'Commander Guest';
  const flightNo = 'STAR-' + Math.floor(1000 + Math.random() * 9000);
  const seatNo = 'POD-' + String.fromCharCode(65 + Math.floor(Math.random() * 4)) + Math.floor(1 + Math.random() * 12);

  document.getElementById('ticket-passenger').textContent = passengerName.toUpperCase();
  document.getElementById('ticket-flight').textContent = flightNo;
  document.getElementById('ticket-seat').textContent = seatNo;
  document.getElementById('ticket-destination').textContent = currentBookingState.dest.toUpperCase();
  document.getElementById('ticket-habitation').textContent = currentBookingState.suite.toUpperCase();
  document.getElementById('ticket-price-paid').textContent = formatPrice(currentBookingState.price * 3);

  document.getElementById('modal-step-form').style.display = 'none';
  document.getElementById('modal-step-ticket').style.display = 'block';

  showToast(`Launch Reserved! Welcome aboard Starship Flight ${flightNo}.`);
}

/* ==========================================================================
   8. Floating Grok AI Concierge Interactive Chat
   ========================================================================== */
function initGrokConcierge() {
  const triggerBtn = document.getElementById('grok-trigger-btn');
  const chatWindow = document.getElementById('grok-chat-window');
  const closeBtn = document.getElementById('grok-close-btn');
  const inputEl = document.getElementById('grok-chat-input');
  const sendBtn = document.getElementById('grok-send-btn');
  const messagesArea = document.getElementById('grok-messages-area');
  const quickChips = document.querySelectorAll('.grok-prompt-chip');

  if (!triggerBtn || !chatWindow) return;

  triggerBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.prompt;
      if (!prompt) return;
      handleUserGrokMessage(prompt);
    });
  });

  sendBtn.addEventListener('click', () => {
    submitGrokMessage();
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitGrokMessage();
    }
  });

  function submitGrokMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    handleUserGrokMessage(text);
  }

  function handleUserGrokMessage(userText) {
    appendGrokMessage(userText, 'user');

    // Simulate typing and response
    setTimeout(() => {
      const response = generateGrokResponse(userText);
      appendGrokMessage(response, 'bot');
    }, 600);
  }

  function appendGrokMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `grok-msg ${sender}`;
    msgDiv.textContent = text;
    messagesArea.appendChild(msgDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  function generateGrokResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('doge') || q.includes('crypto') || q.includes('payment') || q.includes('pay')) {
      return "Naturally, Dogecoin is accepted at Hotel Starbase, alongside USD and Tesla stock. Actually, Doge gets you a 5% discount at the Raptor Sky Bar. To the moon!";
    }
    if (q.includes('cybertruck') || q.includes('car') || q.includes('valet') || q.includes('drive')) {
      return "Every Penthouse suite includes a complimentary 2026 Tri-Motor Cybertruck with Full Self-Driving and Powershare bidirectional charging. Armor glass holds up against virtually anything, except maybe Franz throwing a steel ball.";
    }
    if (q.includes('launch') || q.includes('rocket') || q.includes('watch') || q.includes('starship')) {
      return "All Starbase ocean-view suites feature blast-rated sound dampening and direct line-of-sight to Pad 39A / Orbital Pad B. When 33 Raptor engines ignite, you don't just see the launch—you feel the physics in your bones.";
    }
    if (q.includes('mars') || q.includes('olympus') || q.includes('ticket')) {
      return "Mars bookings are currently opening for the 2028 transfer window. Includes high-radiation shielding, hydroponic dining, and zero-latency Starlink laser interconnects. Bring sunscreen (or rather, a space helmet).";
    }
    if (q.includes('wifi') || q.includes('internet') || q.includes('speed') || q.includes('starlink')) {
      return "We run direct optical laser Starlink uplinks right to the resort roof. You'll get 10 Gbps with 5ms latency, even in low Earth orbit. You can stream 8K video while re-entering the atmosphere.";
    }
    if (q.includes('food') || q.includes('eat') || q.includes('dinner') || q.includes('bar')) {
      return "The Raptor Sky Bar features synthesized molecular cuisine and liquid nitrogen smoked cocktails. Our hydroponic greenhouse produces fresh greens grown right on site, powered 100% by Tesla Solar.";
    }
    if (q.includes('elon') || q.includes('who are you') || q.includes('grok')) {
      return "I'm Grok, your first-principles AI Concierge at Hotel Starbase! Designed to maximize humanity's fun coefficient across planetary bodies. What can I calculate for your stay?";
    }

    return "From a first-principles perspective, that's an excellent question. Our Optimus robot butler staff and concierge teams are ready 24/7. Shall I lock in your Starship launch suite reservation?";
  }
}

/* ==========================================================================
   9. Mobile Responsive Navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !drawer) return;

  function toggleDrawer() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  toggle.addEventListener('click', toggleDrawer);
  backdrop.addEventListener('click', toggleDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   10. FAQ Accordion Interaction
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ==========================================================================
   11. Scroll Header & Active Spy
   ========================================================================== */
function initScrollNav() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   12. Toast Notification System
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
