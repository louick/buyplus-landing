/* Buy+ · interações da landing page
   Contato usado em todos os botões (WhatsApp da LM Soluções): */
const CONTATO = {
  whatsapp: '5591984791651',
  empresa: 'LM Soluções'
};

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const P = 'assets/photos/';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CATALOGO = {
    moda: { label: 'Moda', banner: { img: 'handmade-ladies-leather-handbag-designed.webp', pos: '60% 50%', t: 'Peças que contam a sua história' }, items: [
      { n: 'Jaqueta jeans manga curta', p: 229.9, img: 'denim-jacket-designed-arthur-mcgee.webp', pos: '50% 40%' },
      { n: 'Bolsa de lona azul', p: 189.9, img: 'handmade-ladies-leather-handbag-designed.webp', pos: '60% 50%' },
      { n: 'Tênis de lona verde', p: 159.9, img: 'beach-sand-shoe-green-yellow-product-shoes.jpg', pos: '50% 50%' }
    ]},
    cafe: { label: 'Alimentos', banner: { img: 'coffee-beans-bags.webp', pos: '40% 50%', t: 'Café especial, torrado toda semana' }, items: [
      { n: 'Café especial em grãos 500g', p: 54.9, img: 'coffee-beans-bags.webp', pos: '45% 50%' },
      { n: 'Caneca de cerâmica 300ml', p: 39.9, img: 'coffee-mug.jpg', pos: '50% 50%' },
      { n: 'Kit três origens', p: 139.9, img: 'coffee-beans-bags.webp', pos: '85% 40%' }
    ]},
    beleza: { label: 'Beleza', banner: { img: 'bars-handmade-soap-platter.webp', pos: '50% 55%', t: 'Cuidado artesanal para o dia a dia' }, items: [
      { n: 'Perfume floral 50ml', p: 169.9, img: 'perfume-bottle.jpg', pos: '50% 50%' },
      { n: 'Sabonete artesanal de lavanda', p: 24.9, img: 'bars-handmade-soap-platter.webp', pos: '50% 55%' },
      { n: 'Kit seis sabonetes', p: 129.9, img: 'bars-handmade-soap-platter.webp', pos: '20% 60%' }
    ]}
  };

  const state = { name: '', seg: 'moda', color: '#2B2EE6', pix: 5, coupon: 10, cart: 0 };
  const slug = s => (s || 'sualoja').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '') || 'sualoja';
  const setImg = (el, it) => { if (!el.src.endsWith(it.img)) el.src = P + it.img; el.style.objectPosition = it.pos; };

  function render() {
    const cat = CATALOGO[state.seg], f = cat.items[0];
    const nm = state.name || 'Sua Loja';
    $$('[data-bind="name"]').forEach(e => e.textContent = nm);
    $$('[data-bind="slug"]').forEach(e => e.textContent = slug(state.name));
    $$('[data-bind="seg"]').forEach(e => e.textContent = cat.label);
    $$('[data-bind="pct"]').forEach(e => e.textContent = state.coupon);
    $('#app').style.setProperty('--brand', state.color);
    $('#shop').style.setProperty('--brand', state.color);
    $('#appCoupon').hidden = state.coupon === 0;

    // celular da demo
    setImg($('#appImg'), f);
    $('#appName').textContent = f.n;
    $('#appPrice').textContent = brl(f.p);
    $('#appPix').textContent = state.pix ? `${brl(f.p * (1 - state.pix / 100))} no Pix (${state.pix}% off)` : 'Pix com aprovação na hora';
    $('#appInst').textContent = `ou 6x de ${brl(f.p / 6)} sem juros`;
    $('#appMore').innerHTML = cat.items.slice(1).map(it => `<div><img src="${P + it.img}" alt="${it.n}" style="object-position:${it.pos}" loading="lazy"><p>${it.n}</p></div>`).join('');

    // notebook do hero
    setImg($('#bannerImg'), cat.banner);
    $('.shop-title').textContent = cat.banner.t;
    $('#shopGrid').innerHTML = cat.items.map(it => `<div class="p-card"><img src="${P + it.img}" alt="${it.n}" style="object-position:${it.pos}"><div><b>${it.n}</b><span>${brl(it.p)}</span></div></div>`).join('');

    // celular do hero (checkout)
    setImg($('#phImg'), f);
    $('#phName').textContent = f.n;
    $('#phPrice').textContent = brl(f.p);
    $('#phPix').textContent = brl(f.p * (1 - state.pix / 100));

    $$('.cart-n').forEach(e => e.textContent = state.cart);
    // prévia compacta (celular)
    setImg($('#miniImg'), f);
    $('#miniName').textContent = f.n;
    $('#miniPix').textContent = $('#appPix').textContent;
    $('#miniCoupon').textContent = state.coupon ? `Cupom ${state.coupon}% off na 1ª compra` : 'Sem cupom ativo';
    $('#demoMini').style.setProperty('--brand', state.color);
    updateLinks();
  }

  /* controles */
  $('#storeName').addEventListener('input', e => { state.name = e.target.value.trim(); render(); });
  const group = (sel, key) => $$(sel).forEach(b => b.addEventListener('click', () => {
    $$(sel).forEach(x => x.setAttribute('aria-checked', String(x === b)));
    state[key] = b.dataset[key]; render();
  }));
  group('[data-seg]', 'seg');
  group('[data-color]', 'color');
  const fill = r => r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min) * 100) + '%');
  [['#pix', '#pixOut', 'pix'], ['#coupon', '#couponOut', 'coupon']].forEach(([id, out, key]) => {
    const r = $(id); fill(r);
    r.addEventListener('input', () => { state[key] = +r.value; $(out).textContent = r.value; fill(r); render(); });
  });
  $('#appBuy').addEventListener('click', () => {
    state.cart++; render();
    const c = $('#appCart'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    const a = $('#added'); a.innerHTML = ''; const s = document.createElement('span');
    s.textContent = '✓ Adicionado à sacola'; a.appendChild(s);
  });

  /* WhatsApp */
  function updateLinks() {
    const n = CONTATO.whatsapp;
    const msg = `Olá! Vim pelo site da Buy+ e quero criar a minha loja online.\nNome da loja: ${state.name || '(a definir)'}\nSegmento: ${CATALOGO[state.seg].label}`;
    const talk = `Olá! Vim pelo site da Buy+ e gostaria de tirar algumas dúvidas.`;
    $$('[data-cta]').forEach(a => { a.href = `https://wa.me/${n}?text=${encodeURIComponent(msg)}`; a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-cta-talk]').forEach(a => { a.href = `https://wa.me/${n}?text=${encodeURIComponent(talk)}`; a.target = '_blank'; a.rel = 'noopener'; });
  }

  /* menu mobile */
  const burger = $('#burger'), menu = $('#navMobile');
  burger.addEventListener('click', () => { const o = !menu.classList.contains('open'); menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', String(o)); });
  $$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));

  /* nav ao rolar */
  const nav = $('#nav');
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 20);
  }, { passive: true });

  /* revelar ao rolar */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .reveal-up').forEach(el => io.observe(el));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { $('#tilt').classList.add('show'); o.disconnect(); } }, { threshold: 0.15 }).observe($('#tilt'));

  /* linha dos passos e barras do painel */
  const once = (el, fn, th = 0.35) => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { fn(); o.disconnect(); } }, { threshold: th }); o.observe(el); };
  once($('#steps'), () => $('#steps').style.setProperty('--prog', 1));
  once($('#dash'), () => {
    $('.bars').classList.add('go');
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count; if (reduce) return;
      const t0 = performance.now();
      const tick = t => { const p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
      el.textContent = 0; requestAnimationFrame(tick);
    });
  });

  /* inclinação 3D dos aparelhos no hero */
  const tilt = $('#tilt'), dev = $('#devices');
  if (!reduce && matchMedia('(hover: hover)').matches) {
    dev.addEventListener('pointermove', e => {
      const r = dev.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    dev.addEventListener('pointerleave', () => tilt.style.transform = '');
    // parallax suave ao rolar
    addEventListener('scroll', () => {
      const y = Math.min(scrollY, 900);
      tilt.style.translate = `0 ${y * -0.06}px`;
    }, { passive: true });
  }

  /* brilho que segue o mouse nos cards */
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  /* faq: um aberto por vez */
  $$('.faq details').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) $$('.faq details').forEach(o => { if (o !== d) o.open = false; });
  }));

  $('#year').textContent = new Date().getFullYear();
  render();
})();
