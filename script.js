// ===== Edite aqui =====
const CONFIG = {
  // Seu número com DDI + DDD, só números. Ex.: 5511987654321
  whatsapp: '5519992950124',
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

// ===== Demonstração do chat =====
// Sem JavaScript, o HTML mostra a primeira conversa completa.
// Com JavaScript, quatro conversas se revezam, mensagem por mensagem.
// Se o aparelho pede menos animação, as mensagens chegam do mesmo jeito,
// só sem os movimentos (o styles.css desliga os efeitos).
// Para mudar os exemplos, edite CENAS abaixo.
// Regras do WhatsApp para ficar fiel ao real: no máximo 3 botões por mensagem
// e até 20 letras em cada botão. Use <br> para quebrar linha e <strong> para negrito.
// "aviso" aparece na faixa "Nos bastidores", fora do chat: é o que o robô faz por trás.
const CENAS = [
  {
    aba: 'Agendamento',
    nome: 'Clínica Sorriso',
    sigla: 'CS',
    legenda: 'Demonstração. Atendimento às 22:47, sem ninguém da clínica acordado.',
    descricao: 'Exemplo de conversa: cliente agenda uma limpeza com o robô às 22:47',
    passos: [
      { cliente: 'Oi, boa noite! Queria marcar uma limpeza', hora: '22:47' },
      {
        robo: 'Olá! Sou a assistente virtual da Clínica Sorriso. Tenho estes horários livres para limpeza:', hora: '22:47',
        opcoes: ['Sex 23/10 · 09:00', 'Seg 26/10 · 14:30', 'Ter 27/10 · 10:00'], escolha: 1, horaEscolha: '22:48',
      },
      { robo: 'Pronto, Mariana! Sua limpeza está confirmada para <strong>segunda, 26/10, às 14:30</strong>. Vou te lembrar um dia antes.', hora: '22:48' },
      { aviso: 'Salvo no Google Agenda · lembrete para 25/10', icone: 'agenda' },
    ],
  },
  {
    aba: 'Pedido',
    nome: 'Burger da Praça',
    sigla: 'BP',
    legenda: 'Demonstração. Pedido montado e pago sem ninguém precisar digitar.',
    descricao: 'Exemplo de conversa: cliente monta um pedido de delivery e paga com Pix',
    passos: [
      { cliente: 'Boa noite! Quero pedir um lanche', hora: '20:14' },
      {
        robo: 'Oi! Estes são os combos mais pedidos de hoje:', hora: '20:14',
        opcoes: ['Clássico · R$ 32', 'Duplo · R$ 41', 'Açaí 500 ml · R$ 22'], escolha: 1, horaEscolha: '20:14',
      },
      {
        robo: 'Boa escolha! Vai querer bebida?', hora: '20:14',
        opcoes: ['Refri lata · R$ 6', 'Suco natural · R$ 9', 'Sem bebida'], escolha: 0, horaEscolha: '20:15',
      },
      { robo: 'Qual o endereço de entrega?', hora: '20:15' },
      { cliente: 'Rua das Flores, 120, apto 32', hora: '20:15' },
      {
        robo: 'Confere o seu pedido:<br><br>1x Combo Duplo: R$ 41,00<br>1x Refri lata: R$ 6,00<br>Entrega: R$ 5,00<br><strong>Total: R$ 52,00</strong>', hora: '20:15',
        opcoes: ['Pagar com Pix', 'Cartão na entrega'], escolha: 0, horaEscolha: '20:16',
      },
      { robo: 'Aqui está o Pix copia e cola. Assim que o pagamento cair, eu confirmo:<br><span class="mono">00020126580014br.gov.bcb.pix…</span>', hora: '20:16' },
      { aviso: 'Pix de R$ 52,00 recebido', icone: 'ok' },
      { robo: 'Pagamento confirmado! Previsão de entrega: <strong>35 minutos</strong>.', hora: '20:17' },
      { aviso: 'Pedido enviado para a cozinha', icone: 'ok' },
    ],
  },
  {
    aba: 'Rastreio',
    nome: 'Bella Moda',
    sigla: 'BM',
    legenda: 'Demonstração. O robô consulta a loja e responde na hora.',
    descricao: 'Exemplo de conversa: cliente pergunta do pedido e recebe o rastreio na hora',
    passos: [
      { cliente: 'Oi! Cadê meu pedido? Comprei semana passada', hora: '10:32' },
      { robo: 'Oi! Me passa o número do pedido ou o CPF da compra, por favor.', hora: '10:32' },
      { cliente: 'Pedido 48213', hora: '10:33' },
      { aviso: 'Pedido 48213 consultado no sistema da loja', icone: 'busca' },
      {
        robo: 'Achei! Seu pedido já está a caminho:<br><br>✓ Pagamento aprovado<br>✓ Separado no estoque<br>✓ Enviado<br><strong>➜ Saiu para entrega</strong>', hora: '10:33', pensando: 1600,
      },
      {
        robo: 'Chega hoje até as 18h. Quer que eu avise quando for entregue?', hora: '10:33',
        opcoes: ['Sim, me avise', 'Não precisa'], escolha: 0, horaEscolha: '10:34',
      },
      { aviso: 'Aviso de entrega agendado', icone: 'sino' },
    ],
  },
  {
    aba: 'IA + humano',
    nome: 'Lar Imóveis',
    sigla: 'LI',
    legenda: 'Demonstração. A IA tira as dúvidas e chama a corretora na hora certa.',
    descricao: 'Exemplo de conversa: atendente com IA responde sobre imóveis e passa a conversa para a corretora',
    passos: [
      { cliente: 'Vocês têm apartamento de 2 quartos perto do centro, até R$ 2 mil de aluguel?', hora: '14:05' },
      { aviso: 'IA consultou a lista de imóveis', icone: 'busca' },
      {
        robo: 'Temos 3 opções nessa faixa! A mais perto do centro fica na Rua XV: 2 quartos, 1 vaga, <strong>R$ 1.850</strong> com condomínio. Quer agendar uma visita?',
        hora: '14:05', pensando: 1800,
      },
      { cliente: 'Quero sim, sábado de manhã', hora: '14:06' },
      { robo: 'Ótimo! Vou te passar para a Juliana, nossa corretora, para combinar o horário.', hora: '14:06' },
      { aviso: 'Conversa passada para a corretora Juliana', icone: 'pessoa' },
      { robo: 'Oi! Aqui é a Juliana. Sábado às 10h fica bom? Já te mando a localização.', hora: '14:07', autor: 'Juliana · corretora', pensando: 1600 },
      { aviso: 'Contato salvo na planilha · bairro, preço e visita', icone: 'planilha' },
    ],
  },
];

const ICONES = {
  agenda: 'M7 3v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2V3h-2v2H9V3H7zm-2 7h14v9H5v-9z',
  ok: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z',
  sino: 'M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 0 0-5-5.9V4a1 1 0 0 0-2 0v1.1A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z',
  busca: 'M10 4a6 6 0 1 0 3.7 10.7l4.8 4.8 1.4-1.4-4.8-4.8A6 6 0 0 0 10 4zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  pessoa: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z',
  planilha: 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 5v4h6V9H5zm8 0v4h6V9h-6zm-8 6v3h6v-3H5zm8 0v3h6v-3h-6z',
};

(function chatDemo() {
  const chat = document.getElementById('chat');
  const phone = chat?.closest('.phone');
  if (!chat || !phone) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const avatar = phone.querySelector('.chat__avatar');
  const nome = phone.querySelector('.chat__who strong');
  const status = phone.querySelector('.chat__who small');
  const legenda = phone.querySelector('figcaption');
  const STOP = Symbol('stop');
  let token = 0;
  let paused = true;

  // A animação fica parada enquanto o celular está fora da tela ou a aba está escondida
  let visible = true;
  const sync = () => { paused = !visible || document.hidden; };
  new IntersectionObserver((e) => { visible = e.some((x) => x.isIntersecting); sync(); }, { threshold: 0.3 }).observe(phone);
  document.addEventListener('visibilitychange', sync);

  chat.classList.add('is-live');
  chat.setAttribute('aria-hidden', 'true');

  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<i></i><i></i><i></i>';

  // Barra de digitação do cliente (só na versão animada)
  const composer = document.createElement('div');
  composer.className = 'composer';
  composer.setAttribute('aria-hidden', 'true');
  composer.innerHTML = `
    <span class="composer__field"><span class="composer__text"></span><span class="composer__placeholder">Mensagem</span></span>
    <span class="composer__btn">
      <svg class="composer__mic" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>
      <svg class="composer__send" viewBox="0 0 24 24"><path d="M3 20l18-8L3 4v6l12 2-12 2z"/></svg>
    </span>`;
  const composerText = composer.querySelector('.composer__text');
  const composerBtn = composer.querySelector('.composer__btn');
  phone.querySelector('.phone__screen').append(composer);
  const clearComposer = () => {
    composerText.textContent = '';
    composer.classList.remove('has-text');
    composerBtn.classList.remove('is-press');
  };

  // Botões para escolher o exemplo
  const tabs = document.createElement('div');
  tabs.className = 'chat__tabs';
  tabs.setAttribute('role', 'group');
  tabs.setAttribute('aria-label', 'Escolha um exemplo de conversa');
  CENAS.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = c.aba;
    b.addEventListener('click', () => start(i));
    tabs.append(b);
  });
  legenda.before(tabs);

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const scrollDown = () => chat.scrollTo({ top: chat.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  const add = (node) => { chat.append(node); scrollDown(); return node; };

  function bubbleOut(text, hora, read) {
    const m = el('div', 'msg msg--out', text);
    const meta = el('span', 'msg__meta', `${hora} `);
    const ticks = el('span', read ? 'ticks' : 'ticks is-sent', read ? '✓✓' : '✓');
    meta.append(ticks);
    m.append(meta);
    return { m, read: () => { ticks.className = 'ticks is-read'; ticks.textContent = '✓✓'; } };
  }

  function bubbleIn(p) {
    const m = el('div', 'msg msg--in');
    if (p.autor) m.append(el('strong', 'msg__author', `${p.autor}:`));
    m.append(el('span', null, p.robo));
    m.append(el('span', 'msg__meta', p.hora));
    return m;
  }

  function options(p) {
    const box = el('div', 'msg__buttons');
    p.opcoes.forEach((o) => box.append(el('span', null, o)));
    return box;
  }

  const replay = (node, cls) => {
    node.classList.remove(cls);
    void node.offsetWidth; // reinicia a animação
    node.classList.add(cls);
  };

  // Faixa "Nos bastidores" abaixo do celular
  const backstage = phone.querySelector('.backstage__item');
  const showBackstage = (p) => {
    backstage.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONES[p.icone]}"/></svg>${p.aviso}`;
    backstage.classList.remove('is-empty');
    replay(backstage, 'is-new');
  };
  const clearBackstage = () => {
    backstage.textContent = 'o que o robô faz por trás aparece aqui';
    backstage.classList.add('is-empty');
    backstage.classList.remove('is-new');
  };

  function setScene(i) {
    const c = CENAS[i];
    clearComposer();
    clearBackstage();
    chat.classList.remove('is-leaving');
    replay(phone.querySelector('.chat__head'), 'is-swapping');
    avatar.textContent = c.sigla;
    nome.textContent = c.nome;
    status.textContent = 'Conta comercial · online';
    legenda.textContent = c.legenda;
    phone.setAttribute('aria-label', c.descricao);
    [...tabs.children].forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    chat.replaceChildren(el('p', 'chat__day', 'Hoje'));
  }

  async function play(i) {
    const my = ++token;
    const sleep = async (ms) => {
      await new Promise((r) => setTimeout(r, ms));
      while (paused && my === token) await new Promise((r) => setTimeout(r, 250));
      if (my !== token) throw STOP;
    };
    // Digita letra por letra na barra de mensagem e toca em enviar
    const typeOut = async (text) => {
      composer.classList.add('has-text');
      const delay = Math.min(45, 1800 / text.length);
      for (const ch of text) {
        composerText.textContent += ch;
        composerText.scrollLeft = composerText.scrollWidth; // mostra o fim do texto
        await sleep(delay);
      }
      await sleep(350);
      composerBtn.classList.add('is-press');
      await sleep(160);
      clearComposer();
    };
    const customer = async (text, hora, typed) => {
      if (typed) await typeOut(text);
      const b = bubbleOut(text, hora, false);
      add(b.m);
      await sleep(500);
      b.read();
    };
    const botTyping = async (ms) => {
      status.textContent = 'Conta comercial · digitando…';
      add(typing);
      await sleep(ms);
      typing.remove();
      status.textContent = 'Conta comercial · online';
    };

    try {
      if (chat.childElementCount > 1 && !reduce) {
        chat.classList.add('is-leaving');
        await sleep(350);
      }
      setScene(i);
      await sleep(500);
      for (const p of CENAS[i].passos) {
        if (p.cliente) {
          await sleep(500);
          await customer(p.cliente, p.hora, true);
        } else if (p.robo) {
          await sleep(300);
          await botTyping(p.pensando || 1100);
          add(bubbleIn(p));
          if (p.opcoes) {
            await sleep(350);
            const box = add(options(p));
            await sleep(1400);
            const picked = box.children[p.escolha];
            picked.classList.add('is-tapping');
            await sleep(350);
            picked.classList.replace('is-tapping', 'is-picked');
            await sleep(300);
            await customer(p.opcoes[p.escolha], p.horaEscolha || p.hora);
          }
        } else if (p.aviso) {
          await sleep(600);
          showBackstage(p);
          await sleep(900);
        }
      }
      await sleep(5000);
      play((i + 1) % CENAS.length);
    } catch (e) {
      if (e !== STOP) throw e;
    }
  }

  const start = (i) => play(i);

  start(0);
})();
