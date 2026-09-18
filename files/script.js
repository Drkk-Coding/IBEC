// ============ ANO NO RODAPÉ ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ MENU MOBILE ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ REVEAL AO ROLAR ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============ BOTÃO VOLTAR AO TOPO ============
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ CARTÕES DE CONTRIBUIÇÃO (DÍZIMOS/OFERTAS) ============
const givingCards = document.querySelectorAll('.giving-card');
const pixSelectedLabel = document.getElementById('pixSelectedLabel');
const pixHintCode = document.getElementById('pixHintCode');
const pixHintLabel = document.getElementById('pixHintLabel');

function selectGiving(card) {
  givingCards.forEach(c => c.classList.remove('is-active'));
  card.classList.add('is-active');
  const code = card.dataset.code;
  const label = card.dataset.label;
  pixSelectedLabel.textContent = label;
  pixHintCode.textContent = code;
  pixHintLabel.textContent = label;
}

givingCards.forEach(card => {
  card.addEventListener('click', () => selectGiving(card));
});

// Seleciona "Dízimo" por padrão
if (givingCards.length) selectGiving(givingCards[0]);

// ============ COPIAR CHAVE PIX ============
const copyPixBtn = document.getElementById('copyPixBtn');
const pixKeyEl = document.getElementById('pixKey');
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2400);
}

copyPixBtn.addEventListener('click', async () => {
  const key = pixKeyEl.textContent.trim();
  try {
    await navigator.clipboard.writeText(key);
    showToast('Chave Pix copiada!');
  } catch (err) {
    // Fallback para navegadores sem suporte ao Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = key;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Chave Pix copiada!');
    } catch {
      showToast('Não foi possível copiar. Copie manualmente.');
    }
    document.body.removeChild(textarea);
  }
});

// ============ NAV ATIVA CONFORME SCROLL ============
const sections = document.querySelectorAll('main, section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('nav-link-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));
