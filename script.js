// ===== Edite aqui =====
const CONFIG = {
  // Seu número com DDI + DDD, só números. Ex.: 5511987654321
  whatsapp: '5500000000000',
  // Mensagem que abre pronta quando alguém toca em "Chamar no WhatsApp"
  mensagemPadrao: 'Olá! Vi seu site e quero saber mais sobre automação de WhatsApp para o meu negócio.',
};
// ======================

const waLink = (text) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

// Links de WhatsApp em todo o site
document.querySelectorAll('[data-wa]').forEach((el) => {
  const plan = el.dataset.plan;
  const text = plan
    ? `Olá! Tenho interesse no plano ${plan}. Pode me explicar como funciona?`
    : CONFIG.mensagemPadrao;
  el.href = waLink(text);
});

// Número visível na seção de contato
const numberEl = document.getElementById('wa-number');
if (numberEl) {
  const n = CONFIG.whatsapp;
  numberEl.textContent = n.length >= 12
    ? `+${n.slice(0, 2)} (${n.slice(2, 4)}) ${n.slice(4, -4)}-${n.slice(-4)}`
    : `+${n}`;
}

// Ano no rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Formulário: monta a mensagem e abre o WhatsApp
const form = document.getElementById('lead-form');
const formError = document.getElementById('form-error');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  if (!nome) {
    formError.hidden = false;
    form.nome.focus();
    return;
  }
  formError.hidden = true;
  const objetivo = form.objetivo.value.trim();
  const text = [
    `Olá! Meu nome é ${nome}.`,
    `Tenho um negócio do tipo: ${form.negocio.value}.`,
    objetivo ? `Quero automatizar: ${objetivo}` : 'Quero entender o que dá para automatizar no meu WhatsApp.',
  ].join('\n');
  window.location.href = waLink(text);
});
form?.nome.addEventListener('input', () => { formError.hidden = true; });

// Demonstração do chat: a conversa completa já aparece no HTML.
// Com movimento permitido, ela é reproduzida mensagem por mensagem.
(function playChat() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chat = document.getElementById('chat');
  const typing = document.getElementById('typing');
  if (reduce || !chat || !typing) return;

  const steps = [...chat.querySelectorAll('[data-step]')];
  const KEEP = 1; // a primeira mensagem do cliente fica visível desde o início
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function run() {
    steps.forEach((s, i) => {
      s.classList.remove('is-shown');
      s.classList.toggle('is-waiting', i >= KEEP);
    });
    for (let i = KEEP; i < steps.length; i++) {
      const s = steps[i];
      if (s.hasAttribute('data-bot')) {
        typing.hidden = false;
        await wait(1100);
        typing.hidden = true;
      } else {
        await wait(i === KEEP ? 700 : 900);
      }
      s.classList.remove('is-waiting');
      s.classList.add('is-shown');
    }
    await wait(6000);
    run();
  }

  // Só começa quando o celular está visível na tela
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      run();
    }
  }, { threshold: 0.3 });
  io.observe(chat);
})();
