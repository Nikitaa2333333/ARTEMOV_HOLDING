/* =============================================
   АРХАР КВАРЦ — script.js
   ============================================= */

'use strict';

// === Мобильное меню ===
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
  });

  // Закрываем меню при клике на ссылку
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// === Активная навигация при скролле ===
const navItems = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// === Fade-in анимации при скролле ===
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

// Применяем fade-in к нужным элементам
const animTargets = [
  '.section__label',
  '.section__title',
  '.subsection-title',
  '.facts-table',
  '.about__mission',
  '.adv-card',
  '.stage-card',
  '.partner-card',
  '.investors__intro',
  '.investors__conclusion',
  '.cta-banner',
  '.contacts__info',
  '.contacts__form',
  '.table-wrap',
  '.fact-banner',
  '.advantage-highlight',
  '.stats-grid',
  '.stat-card',
  '.growth-chart',
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });
});

// === Плавная подсветка шапки при скролле ===
const navEl = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navEl.style.boxShadow = '0 1px 20px rgba(0,0,0,.08)';
  } else {
    navEl.style.boxShadow = 'none';
  }
}, { passive: true });

// === Форма обратной связи (заглушка) ===
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Заявка отправлена';
    btn.style.background = '#16A34A';
    btn.style.borderColor = '#16A34A';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Отправить';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

// === Анимация диаграмм роста спроса ===
const chartObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const barFills = entry.target.querySelectorAll('.chart-bar__fill');
        barFills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width');
          }, i * 200 + 300); // 300ms delay to let fade-in start first
        });
        chartObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const growthChart = document.querySelector('.growth-chart');
if (growthChart) chartObserver.observe(growthChart);
