/* Componentes simples, sem dependências. Edite os textos em content.js. */
(() => {
  const data = window.ONCAS;
  if (!data) {
    console.error('Onças Prod: content.js precisa carregar antes de script.js.');
    return;
  }

  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
  const safeURL = (value = '') => {
    try {
      const url = new URL(value, window.location.href);
      return ['http:', 'https:', 'file:'].includes(url.protocol) ? escapeHTML(url.href) : '';
    } catch { return ''; }
  };
  const brand = '<a class="brand" href="#inicio" aria-label="Onças Prod — início"><span class="brand-crop"><img src="assets/icone-onca.png" alt="Onças Prod"></span></a>';

  function Header() {
    return `<div class="header-inner container">${brand}<a class="sticky-brand" href="#inicio" aria-label="Onças Prod, início"><img src="assets/simbolo.png" alt="Onças Prod"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navegacao">Menu</button><nav id="navegacao" aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#trabalhos">Galeria</a><a class="nav-desktop-only" href="#sobre">Sobre</a><a class="nav-contact nav-desktop-only" href="#contato"><span class="button-content">Vamos conversar</span></a><a class="nav-contact nav-mobile-only" href="#contato">Contato</a></nav></div>`;
  }
  function Hero() {
    const photo = data.fotoHero
      ? `<img class="hero-photo hero-photo-image" src="${escapeHTML(data.fotoHero)}" alt="${escapeHTML(data.fotoHeroAlt || 'As duas profissionais da Onças Prod')}" fetchpriority="high">`
      : '<div class="hero-photo hero-photo-placeholder" role="img" aria-label="Espaço reservado para a fotografia real das duas profissionais"><span class="placeholder-kicker">Retrato da dupla</span><span class="placeholder-note">A foto real entra aqui</span></div>';
    return `<div class="hero-copy">${data.descricao ? `<p class="eyebrow"><span class="tiny-dot"></span> ${escapeHTML(data.descricao)}</p>` : ""}
      <h1 id="titulo"><span class="hero-title-desktop">${escapeHTML(data.titulo)}</span><span class="hero-title-mobile">Produtora artística e cultural</span></h1>${data.introducao ? `<p class="lead">${escapeHTML(data.introducao)}</p>` : ""}</div>
      <figure class="hero-visual"><div class="hero-photo-stack"><img class="hero-stack-photo hero-stack-photo--back" src="assets/IMG_3132-stack.jpg" alt="" aria-hidden="true" loading="lazy"><img class="hero-stack-photo hero-stack-photo--middle" src="assets/IMG_3142-stack.jpg" alt="" aria-hidden="true" loading="lazy"><div class="hero-photo-frame">${photo}</div></div>
      <span class="visual-sticker" aria-hidden="true">feito<br>por nós</span></figure><a class="hero-explore" href="#servicos">EXPLORAR</a>`;
  }

  function Services() {
    const services = Array.isArray(data.servicos) ? data.servicos : [];
    return `<div class="section-heading"><div><h2 id="titulo-servicos">Serviços</h2></div></div><div class="services-grid">${services.map((item) => `<article class="service service-window"><div class="service-windowbar" aria-hidden="true"><span class="window-controls"><i></i><i></i><i></i></span><span class="window-address"><span class="window-search-icon"></span> oncasprod.com/servicos</span><span class="window-menu">...</span></div><div class="service-body"><h3>${escapeHTML(item.titulo)}</h3><p>${escapeHTML(item.texto)}</p></div></article>`).join('')}</div>`;
  }

  function Works() {
    const projects = Array.isArray(data.trabalhos) ? data.trabalhos : [];
    const works = projects.length ? projects : Array.from({ length: 3 }, (_, i) => ({ titulo: 'Baile das Onças', categoria: '', imagem: '' }));
    const projectTitle = works[0]?.titulo || 'Baile das Onças';
    const photoMarkup = (item, className = '') => {
      const image = item.imagem ? safeURL(item.imagem) : '';
      return image
        ? `<img class="${className}" src="${image}" alt="${escapeHTML(item.alt || projectTitle)}" loading="lazy" width="900" height="900">`
        : `<div class="${className} gallery-image-placeholder" role="img" aria-label="Fotografia do projeto em breve">Fotografia em breve</div>`;
    };
    return `<div class="section-heading"><div><h2 id="titulo-trabalhos"><span class="gallery-title-top">Galeria</span><span class="gallery-title-bottom">em cena</span></h2></div></div>
      <div class="gallery-experience" data-gallery-experience>
        <article class="gallery-feature">
          <div class="gallery-feature-copy"><p class="eyebrow">Projeto em destaque</p><h3 data-feature-title>${escapeHTML(projectTitle)}</h3><p class="gallery-feature-hint">Clique para ver as fotos</p><button class="gallery-open-button" type="button" data-open-gallery>Abrir galeria</button></div>
          <div class="gallery-feature-media"><button class="gallery-feature-arrow" type="button" data-feature-step="-1" aria-label="Foto anterior">&#8249;</button><div class="gallery-feature-image-wrap">${photoMarkup(works[0], 'gallery-feature-image')}</div><button class="gallery-feature-arrow" type="button" data-feature-step="1" aria-label="Próxima foto">&#8250;</button></div>
        </article>
        <section class="gallery-popup" data-gallery-popup role="dialog" aria-modal="false" aria-labelledby="gallery-popup-title" hidden>
          <div class="gallery-popup-heading"><div><p class="eyebrow">Galeria do projeto</p><h3 id="gallery-popup-title">${escapeHTML(projectTitle)}</h3></div><button class="gallery-close-button" type="button" data-close-gallery>Fechar galeria</button></div>
          <div class="gallery-popup-grid">${works.map((item, index) => `<button class="gallery-popup-photo" type="button" data-modal-photo="${index}" aria-label="Exibir foto ${index + 1} no destaque">${photoMarkup(item)}</button>`).join('')}</div>
        </section>
        <div class="gallery-preview-grid">${Array.from({ length: 9 }, (_, slot) => { const page = Math.floor(slot / 3) + 1; return `<article class="gallery-preview-card" data-project-page="${page}"${page === 1 ? '' : ' hidden'}><div class="gallery-preview-placeholder">Outros projetos</div><div class="gallery-preview-actions"><span>Clique para ver as fotos</span><button type="button" data-preview-photo="0">Abrir galeria</button></div></article>`; }).join('')}</div>
        <nav class="gallery-pagination" aria-label="Páginas de projetos"><span>Página</span>${[1, 2, 3].map((page) => `<button type="button" data-project-page-button="${page}" aria-label="Página ${page}" aria-current="${page === 1 ? 'page' : 'false'}">${page}</button>`).join('')}</nav>
      </div>`;
  }
  function About() {
    const copy = escapeHTML(data.sobre)
      .replace('Onças Prod', '<span class="about-highlight">Onças Prod</span>')
      .replace('criar, registrar e fortalecer', '<span class="about-highlight">criar, registrar e fortalecer</span>')
      .replace('imagem', '<span class="about-highlight">imagem</span>')
      .replace('projetos culturais', '<span class="about-highlight">projetos culturais</span>');
    return `<div class="about-section-bg" aria-hidden="true"><svg class="about-section-divider" viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#fff7e3" d="M0 0H1440V30 C1360 25 1300 40 1220 31 C1130 20 1080 41 1000 33 C910 26 850 42 770 31 C675 20 620 41 530 32 C445 24 370 41 285 31 C190 20 125 39 0 29 Z V0 Z"/></svg></div><div class="about"><div class="about-heading"><h2 id="titulo-sobre"><span class="about-intro">Prazer,<br>somos as</span><br><span class="about-oncas">Onças</span><span class="pink">.</span></h2><div class="about-portraits" aria-label="Espaços reservados para as fotos das duas profissionais"><span></span><span></span></div></div><div class="about-copy"><p>${copy}</p></div></div>`;
  }
  function Contact() {
    const whatsapp = String(data.whatsapp || '').replace(/\D/g, '');
        const validWhatsapp = /^\d{10,15}$/.test(whatsapp);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');
    const validInstagram = data.instagram && /^https:\/\/(www\.)?instagram\.com\//.test(data.instagram);
    const channels = [
      { label: 'WhatsApp', href: validWhatsapp ? `https://wa.me/${whatsapp}` : '', note: 'Mensagem ou ligação pelo WhatsApp', icon: '<path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.3c-.4.2-.7.6-.7 1.1 0 2.8 3.5 6.3 6.3 6.3.5 0 .9-.3 1.1-.7l.5-.9-2.1-1-.9.9a8.3 8.3 0 0 1-3.2-3.2l.9-.9-1-2.1-.9.5Z"/>' },
      { label: 'Instagram', href: validInstagram ? safeURL(data.instagram) : '', note: 'Veja nossos trabalhos', icon: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.7" cy="6.7" r=".8" fill="currentColor" stroke="none"/>' },
      { label: 'E-mail', href: validEmail ? `mailto:${escapeHTML(data.email)}` : '', note: 'Envie sua mensagem', icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>' },
    ];
    const actions = channels.map(({ label, href, note, icon }, index) => {
      const content = `<span class="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></span><span class="contact-label"><strong>${label}</strong><small>${note}</small></span><span class="contact-arrow" aria-hidden="true">→</span>`;
      return href
        ? `<a class="contact-button${index === 0 ? ' is-primary' : ''}" href="${href}"${label === 'WhatsApp' || label === 'Instagram' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content}</a>`
        : `<span class="contact-button is-pending${index === 0 ? ' is-primary' : ''}" aria-disabled="true">${content}</span>`;
    }).join('');
    return `<div class="contact"><div class="contact-copy"><h2 id="titulo-contato">Vamos registrar?</h2><p>Entre em contato para consultar datas e conversar sobre detalhes do seu projeto.</p></div><div class="contact-links" aria-label="Canais de contato">${actions}</div></div>`;
  }
  function Footer() {
    return `<a class="footer-brand" href="#inicio" aria-label="Onças Prod, início"><img src="assets/icone-onca.png" alt="Símbolo da Onça Prod"><img src="assets/simbolo.png" alt="Logo Onças Prod"></a><p>© ${new Date().getFullYear()} Onças Prod. Todos os direitos reservados.</p><a class="text-link" href="#inicio">Voltar ao início</a>`;
  }

  const components = { cabecalho: Header, inicio: Hero, servicos: Services, trabalhos: Works, sobre: About, contato: Contact, rodape: Footer };
  for (const [id, component] of Object.entries(components)) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = component();
  }

  document.querySelectorAll('.brand, .sticky-brand, .footer-brand, #rodape .text-link[href="#inicio"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const destination = `${window.location.pathname}${window.location.search}#inicio`;
      if (window.location.hash !== '#inicio') history.replaceState(null, '', destination);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  });
  const exploreButton = document.querySelector('.hero-explore');
  exploreButton?.addEventListener('click', (event) => {
    const target = document.querySelector('#servicos');
    if (!target) return;
    event.preventDefault();
    const destination = target.getBoundingClientRect().top + window.scrollY - 92;
    const startPosition = window.scrollY;
    const distance = destination - startPosition;

    try { history.pushState(null, '', '#servicos'); } catch {}
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const startTime = performance.now();
    const duration = 1800;
    const animateScroll = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress < .5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, startPosition + distance * eased);
      if (progress < 1) window.requestAnimationFrame(animateScroll);
      else document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
    window.requestAnimationFrame(animateScroll);
  });
    document.querySelectorAll('[data-gallery-experience]').forEach((experience) => {
    const works = Array.isArray(data.trabalhos) ? data.trabalhos : [];
    const popup = experience.querySelector('[data-gallery-popup]');
    const featureWrap = experience.querySelector('.gallery-feature-image-wrap');
    const openButtons = experience.querySelectorAll('[data-open-gallery], [data-preview-photo]');
    let activeIndex = 0;
    let lastTrigger = null;
    const featureImage = experience.querySelector('.gallery-feature-image');
    const updateFeature = (index) => {
      if (!works.length) return;
      activeIndex = (index + works.length) % works.length;
      experience.querySelector('.gallery-feature-media')?.classList.toggle('has-previous-photo', activeIndex > 0);
      const item = works[activeIndex];
      const image = item.imagem ? safeURL(item.imagem) : '';
      if (image) {
        if (featureImage) {
          featureImage.src = image;
          featureImage.alt = item.alt || item.titulo || 'Fotografia do projeto';
        } else {
          featureWrap.innerHTML = `<img class="gallery-feature-image" src="${image}" alt="${escapeHTML(item.alt || item.titulo || 'Fotografia do projeto')}">`;
        }
      }
      experience.querySelectorAll('[data-modal-photo]').forEach((button, photoIndex) => {
        button.classList.toggle('is-current', photoIndex === activeIndex);
      });
    };
    const openGallery = (trigger) => {
      lastTrigger = trigger || experience.querySelector('[data-open-gallery]');
      popup.hidden = false;
      requestAnimationFrame(() => experience.querySelector('[data-close-gallery]')?.focus());
    };
    const closeGallery = () => {
      popup.hidden = true;
      lastTrigger?.focus();
    };
    openButtons.forEach((button) => button.addEventListener('click', () => {
      if (button.hasAttribute('data-preview-photo')) updateFeature(Number(button.dataset.previewPhoto));
      openGallery(button);
    }));
    experience.querySelectorAll('[data-feature-step]').forEach((button) => button.addEventListener('click', () => {
      updateFeature(activeIndex + Number(button.dataset.featureStep));
    }));
    experience.querySelector('[data-close-gallery]')?.addEventListener('click', closeGallery);
    experience.querySelectorAll('[data-modal-photo]').forEach((button) => button.addEventListener('click', () => {
      updateFeature(Number(button.dataset.modalPhoto));
    }));
    const pagination = experience.querySelector('.gallery-pagination');
    const previewCards = Array.from(experience.querySelectorAll('[data-project-page]'));
    const mobileLayout = window.matchMedia('(max-width: 760px)');
    let activeProjectPage = 1;
    const renderProjectPages = () => {
      const perPage = mobileLayout.matches ? 2 : 3;
      const pageCount = mobileLayout.matches ? 3 : Math.ceil(previewCards.length / perPage);
      activeProjectPage = Math.min(activeProjectPage, pageCount);
      previewCards.forEach((card, index) => {
        const isHiddenMobileExtra = mobileLayout.matches && index >= 6;
        const page = Math.floor(index / perPage) + 1;
        card.dataset.projectPage = String(page);
        card.hidden = isHiddenMobileExtra || page !== activeProjectPage;
      });
      const pageButtons = Array.from({ length: pageCount }, (_, index) => {
        const page = index + 1;
        return `<button type="button" data-project-page-button="${page}" aria-label="Página ${page}" aria-current="${page === activeProjectPage ? 'page' : 'false'}">${page}</button>`;
      }).join('');
      const nextButton = mobileLayout.matches
        ? `<button type="button" class="gallery-page-next" data-project-next aria-label="Próxima página"${activeProjectPage === pageCount ? ' disabled' : ''}>&#8250;</button>`
        : '';
      pagination.innerHTML = `<span>Página</span>${pageButtons}${nextButton}`;
    };
    pagination?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-project-page-button], [data-project-next]');
      if (!button || button.disabled) return;
      activeProjectPage = button.hasAttribute('data-project-next')
        ? Math.min(activeProjectPage + 1, mobileLayout.matches ? 3 : Math.ceil(previewCards.length / 3))
        : Number(button.dataset.projectPageButton);
      renderProjectPages();
      pagination.querySelector(`[data-project-page-button="${activeProjectPage}"]`)?.focus();
    });
    mobileLayout.addEventListener('change', () => {
      activeProjectPage = 1;
      renderProjectPages();
    });
    renderProjectPages();
    experience.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !popup.hidden) closeGallery();
    });
    updateFeature(0);
  });

  const heroImage = document.querySelector('.hero-photo-image');
  heroImage?.addEventListener('error', () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'hero-photo hero-photo-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', 'Espaço reservado para a fotografia real da hero');
    placeholder.innerHTML = '<span class="placeholder-kicker">Retrato da dupla</span><span class="placeholder-note">Confira se assets/IMG_2751-hero.jpg está presente</span>';
    heroImage.replaceWith(placeholder);
  }, { once: true });

  const pageHeader = document.getElementById('cabecalho');
  const updateScrolledHeader = () => pageHeader?.classList.toggle('is-scrolled', window.scrollY > 72);
  updateScrolledHeader();
  window.addEventListener('scroll', updateScrolledHeader, { passive: true });

  const mobileHero = document.getElementById('inicio');
  if (mobileHero) {
    let sequenceReady = false;
    let sequenceVisible = false;
    let sequenceStarted = false;
    const setPending = (pending) => {
      mobileHero.classList.toggle('hero-sequence-pending', pending);
      pageHeader?.classList.toggle('hero-sequence-pending', pending);
    };
    const startSequence = () => {
      if (!sequenceReady || !sequenceVisible || sequenceStarted) return;
      sequenceStarted = true;
      window.requestAnimationFrame(() => {
        mobileHero.classList.add('is-entering');
        pageHeader?.classList.add('hero-entering');
        if (window.matchMedia('(max-width: 760px)').matches && pageHeader) {
          pageHeader.classList.add('nav-intro-wait');
          window.setTimeout(() => {
            pageHeader.classList.remove('nav-intro-wait');
            pageHeader.classList.add('nav-intro-reveal');
            window.setTimeout(() => pageHeader.classList.remove('nav-intro-reveal'), 2300);
          }, 2400);

          const brandElement = pageHeader.querySelector(pageHeader.classList.contains('is-scrolled') ? '.sticky-brand' : '.brand');
          const heroCopy = mobileHero.querySelector('.hero-copy');
          const explore = mobileHero.querySelector('.hero-explore');
          [brandElement, heroCopy, explore].filter(Boolean).forEach((element) => element.classList.add('mobile-fade-ready'));
          window.setTimeout(() => {
            brandElement?.classList.add('mobile-fade-visible');
            heroCopy?.classList.add('mobile-fade-visible');
          }, 1500);
          window.setTimeout(() => explore?.classList.add('mobile-fade-visible'), 2400);
        }
        setPending(false);
        document.documentElement.classList.remove('mobile-intro-pending');
      });
    };
    const isMobileOpening = window.matchMedia('(max-width: 760px)').matches;
    const bounds = mobileHero.getBoundingClientRect();
    sequenceVisible = isMobileOpening || (bounds.top < window.innerHeight && bounds.bottom > 0);
    if (sequenceVisible) setPending(true);
    const pageLoaded = () => {
      sequenceReady = true;
      startSequence();
    };
    if (document.readyState === 'complete') window.setTimeout(pageLoaded, 0);
    else window.addEventListener('load', pageLoaded, { once: true });
    if (!isMobileOpening && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          sequenceVisible = entry.isIntersecting;
          if (sequenceVisible && !sequenceStarted) setPending(true);
          startSequence();
        }
      }, { threshold: 0 });
      heroObserver.observe(mobileHero);
    }
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navegacao');
  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    const media = window.matchMedia?.('(min-width: 761px)');
    media?.addEventListener?.('change', closeMenu);
  }
})();
















