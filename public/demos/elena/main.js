/* ==========================================================================
   ELENA ORLOVA — skin is living light
   Choreography: GSAP + ScrollTrigger (CDN), optional Lenis smoothing,
   Three.js membrane with graceful fallbacks. Everything is progressive:
   if any of this fails, the document remains fully readable and usable.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var CFG = window.SITE_CONFIG || {};
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(pointer: fine)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* ------------------------------------------------------------------
     1 · CONFIG → DOM (contacts, socials, year)
  ------------------------------------------------------------------ */
  (function applyConfig() {
    var c = CFG.contact || {};
    $$('[data-config="tel"]').forEach(function (a) {
      if (c.phone) { a.textContent = c.phone; a.href = 'tel:' + c.phone.replace(/[^+\d]/g, ''); }
    });
    $$('[data-config="mail"]').forEach(function (a) {
      if (c.email) { a.textContent = c.email; a.href = 'mailto:' + c.email; }
    });
    $$('[data-config="address"]').forEach(function (n) { if (c.address) n.textContent = c.address; });
    $$('[data-config="hours"]').forEach(function (n) { if (c.hours) n.textContent = c.hours; });

    var soc = $('#socials');
    if (soc && Array.isArray(CFG.socials)) {
      soc.innerHTML = '';
      CFG.socials.forEach(function (s) {
        var li = doc.createElement('li');
        if (s.url && s.url !== '#') {
          var a = doc.createElement('a');
          a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.textContent = s.label;
          li.appendChild(a);
        } else {
          var sp = doc.createElement('span');
          sp.className = 'socials__pending mono';
          sp.textContent = s.label + ' — [add link]';
          li.appendChild(sp);
        }
        soc.appendChild(li);
      });
    }
    var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());
  })();

  /* ------------------------------------------------------------------
     2 · THEME MORPH (body class follows sections)
  ------------------------------------------------------------------ */
  var THEMES = ['t-light', 't-bone', 't-dark', 't-plum'];
  function setTheme(t) {
    THEMES.forEach(function (k) { doc.body.classList.remove(k); });
    doc.body.classList.add('t-' + t);
  }
  (function themeWatch() {
    var secs = $$('[data-theme]');
    if (!secs.length) return;
    var pending = false;
    function resolve() {
      pending = false;
      var line = window.innerHeight * .52;
      for (var i = 0; i < secs.length; i++) {
        var r = secs[i].getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) {
          setTheme(secs[i].getAttribute('data-theme'));
          return;
        }
      }
    }
    function queue() { if (!pending) { pending = true; requestAnimationFrame(resolve); } }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    resolve();
  })();

  /* ------------------------------------------------------------------
     3 · SMOOTH SCROLL (Lenis, desktop + motion allowed) & ANCHORS
  ------------------------------------------------------------------ */
  var lenis = null;
  if (window.Lenis && hasGSAP && !RM && FINE) {
    try {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      doc.documentElement.classList.add('lenis-native-off');
    } catch (e) { lenis = null; }
  }

  function goTo(target) {
    if (lenis) { lenis.scrollTo(target, { offset: -64 }); }
    else {
      try { target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
      catch (e) { target.scrollIntoView(); }
    }
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  doc.addEventListener('click', function (ev) {
    var a = ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var target = $(id);
    if (!target) return;
    ev.preventDefault();
    closeNav();
    goTo(target);
  });

  /* ------------------------------------------------------------------
     4 · NAV (scrolled state + mobile panel)
  ------------------------------------------------------------------ */
  var nav = $('#site-nav'), navToggle = $('#nav-toggle'), navPanel = $('#nav-panel');
  var navOpen = false;

  function onScrollNav() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  function openNav() {
    if (!navPanel || navOpen) return;
    navOpen = true;
    navPanel.hidden = false;
    doc.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (hasGSAP && !RM) {
      gsap.fromTo(navPanel, { autoAlpha: 0 }, { autoAlpha: 1, duration: .45, ease: 'power2.out' });
      gsap.fromTo($$('.nav-panel nav a'), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6, stagger: .05, ease: 'power3.out', delay: .08 });
    }
  }
  function closeNav() {
    if (!navPanel || !navOpen) return;
    navOpen = false;
    doc.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (hasGSAP && !RM) {
      gsap.to(navPanel, { autoAlpha: 0, duration: .3, ease: 'power2.in', onComplete: function () { navPanel.hidden = true; gsap.set(navPanel, { clearProps: 'all' }); } });
    } else { navPanel.hidden = true; }
  }
  if (navToggle) navToggle.addEventListener('click', function () { navOpen ? closeNav() : openNav(); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ------------------------------------------------------------------
     5 · HERO — opening reveal + scroll exit
  ------------------------------------------------------------------ */
  var heroVideo = $('#hero-video');
  if (heroVideo && RM) { try { heroVideo.autoplay = false; heroVideo.pause(); heroVideo.currentTime = 0; } catch (e) {} }
  if (heroVideo && 'IntersectionObserver' in window && !RM) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
        else heroVideo.pause();
      });
    }, { threshold: 0.05 }).observe(heroVideo);
  }

  if (hasGSAP && !RM) {
    var intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .fromTo(heroVideo, { scale: 1.07 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
      .fromTo('.wordmark .mask__i', { yPercent: 112 }, { yPercent: 0, duration: 1.35, stagger: .14 }, .2)
      .fromTo('#hero-kicker', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .9 }, .75)
      .fromTo('#hero-statement', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .9 }, .95)
      .fromTo('#hero-actions', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .9 }, 1.1)
      .fromTo('#hero-scroll', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, 1.5);

    gsap.timeline({
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 25%', scrub: .6 }
    })
      .to('.hero__content', { yPercent: -12, autoAlpha: 0, ease: 'none' }, 0)
      .to(heroVideo, { scale: 1.06, ease: 'none' }, 0)
      .to('#hero-scroll', { autoAlpha: 0, ease: 'none' }, 0);
  }

  /* ------------------------------------------------------------------
     6 · EDITORIAL REVEALS (masked lines, paragraphs, rows, parallax)
  ------------------------------------------------------------------ */
  if (hasGSAP && !RM) {
    $$('h2 .mask__i, .lightstudy__title .mask__i').forEach(function (el) {
      if (el.closest('.wordmark')) return;
    });
    $$('.manifesto, .expertise__title, .protocol__title, .about__title, .booking__title, .lightstudy__title').forEach(function (h) {
      var lines = $$('.mask__i', h);
      if (!lines.length) return;
      gsap.fromTo(lines, { yPercent: 112 }, {
        yPercent: 0, duration: 1.15, stagger: .13, ease: 'power4.out',
        scrollTrigger: { trigger: h, start: 'top 82%', once: true }
      });
    });
    $$('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 26 }, {
        autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
    });
    $$('.sec-head').forEach(function (el) {
      gsap.fromTo(el, { autoAlpha: 0 }, {
        autoAlpha: 1, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
    var rows = $$('.outcome');
    if (rows.length) {
      gsap.fromTo(rows, { autoAlpha: 0, y: 30 }, {
        autoAlpha: 1, y: 0, duration: .9, stagger: .08, ease: 'power3.out',
        scrollTrigger: { trigger: '#outcomes', start: 'top 80%', once: true }
      });
    }
    $$('.parallax img').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: img.closest('.parallax'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    $$('.creds, .contact-list, .socials').forEach(function (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 22 }, {
        autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  }

  /* ------------------------------------------------------------------
     7 · THE LIGHT STUDY — signature pointer-light interaction
  ------------------------------------------------------------------ */
  (function lightStudy() {
    var stage = $('#ls-stage');
    if (!stage) return;
    var tx = 62, ty = 44, cx = 62, cy = 44, live = false, raf = null;

    function apply() {
      stage.style.setProperty('--lx', cx.toFixed(2) + '%');
      stage.style.setProperty('--ly', cy.toFixed(2) + '%');
    }
    function tick() {
      cx += (tx - cx) * .12; cy += (ty - cy) * .12;
      apply();
      if (Math.abs(tx - cx) > .05 || Math.abs(ty - cy) > .05 || live) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      tx = Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100));
      ty = Math.min(100, Math.max(0, (e.clientY - r.top) / r.height * 100));
      if (RM) { cx = tx; cy = ty; apply(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    stage.addEventListener('pointerenter', function () { live = true; }, { passive: true });
    stage.addEventListener('pointerleave', function () { live = false; }, { passive: true });
  })();

  /* ------------------------------------------------------------------
     8 · EXPERTISE — outcome list ↔ shared surface / mobile accordion
  ------------------------------------------------------------------ */
  (function expertise() {
    var outcomes = $$('.outcome');
    if (!outcomes.length) return;
    var mqDesk = window.matchMedia('(min-width: 1024px)');
    var imgs = $$('.surface__img');
    var num = $('#surface-num'), desc = $('#surface-desc'),
        sFor = $('#surface-for'), sTime = $('#surface-time');
    var onImg = 0, activeIdx = 0;

    function setActive(i, animate) {
      activeIdx = i;
      outcomes.forEach(function (o, k) { o.classList.toggle('is-active', k === i); });
      var b = $('.outcome__head', outcomes[i]);
      if (!b || !imgs.length) return;
      var next = imgs[1 - onImg];
      next.src = b.getAttribute('data-img');
      var swap = function () {
        imgs[onImg].classList.remove('is-on');
        next.classList.add('is-on');
        onImg = 1 - onImg;
      };
      if (next.complete) swap(); else next.onload = swap;
      if (num) num.textContent = b.getAttribute('data-num');
      var put = function () {
        if (desc) desc.textContent = b.getAttribute('data-desc');
        if (sFor) sFor.textContent = b.getAttribute('data-for');
        if (sTime) sTime.textContent = b.getAttribute('data-time');
      };
      if (hasGSAP && !RM && animate) {
        gsap.fromTo([desc, sFor, sTime], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .05, ease: 'power2.out', onStart: put, overwrite: 'auto' });
      } else put();
    }

    function toggleAccordion(o) {
      var open = o.classList.toggle('is-open');
      var head = $('.outcome__head', o), panel = $('.outcome__panel', o);
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (hasGSAP) {
        gsap.to(panel, { height: open ? 'auto' : 0, duration: RM ? 0 : .55, ease: 'power3.inOut' });
      } else {
        panel.style.height = open ? 'auto' : '0';
      }
    }

    outcomes.forEach(function (o, i) {
      var head = $('.outcome__head', o);
      head.addEventListener('click', function () {
        if (mqDesk.matches) setActive(i, true); else toggleAccordion(o);
      });
      head.addEventListener('mouseenter', function () { if (mqDesk.matches) setActive(i, true); });
      head.addEventListener('focus', function () { if (mqDesk.matches) setActive(i, true); });
    });

    function onMQ() {
      if (mqDesk.matches) {
        outcomes.forEach(function (o) {
          o.classList.remove('is-open');
          $('.outcome__head', o).setAttribute('aria-expanded', 'false');
          var p = $('.outcome__panel', o);
          if (hasGSAP) gsap.set(p, { height: 0 }); else p.style.height = '0';
        });
        setActive(activeIdx, false);
      }
    }
    if (mqDesk.addEventListener) mqDesk.addEventListener('change', onMQ);
    setActive(0, false);
  })();

  /* ------------------------------------------------------------------
     9 · PROTOCOL — pinned three-movement sequence (desktop, motion ok)
  ------------------------------------------------------------------ */
  (function protocol() {
    var section = $('#protocol'), wrapEl = $('#protocol-stagewrap');
    if (!section || !wrapEl || !hasGSAP) return;
    var stages = $$('.stage', wrapEl);

    var mm = gsap.matchMedia();
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', function () {
      section.classList.add('is-pinned');
      gsap.set(stages[1], { autoAlpha: 0 });
      gsap.set(stages[2], { autoAlpha: 0 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapEl, start: 'top top', end: '+=230%',
          pin: true, scrub: .65, anticipatePin: 1,
          onUpdate: function (self) {
            if (window.__membrane) window.__membrane.setTension(self.progress);
          }
        }
      });
      tl.to('#rail-fill', { scaleY: 1, ease: 'none', duration: 3 }, 0);

      [0, 1].forEach(function (i) {
        var at = i + 1;
        tl.to($('.stage__text', stages[i]), { autoAlpha: 0, y: -48, duration: .4, ease: 'power2.in' }, at);
        tl.to($('.stage__media', stages[i]), { autoAlpha: 0, scale: 1.04, duration: .4, ease: 'power2.in' }, at);
        tl.set(stages[i], { autoAlpha: 0 }, at + .42);
        tl.set(stages[i + 1], { autoAlpha: 1 }, at + .42);
        tl.fromTo($('.stage__text', stages[i + 1]), { autoAlpha: 0, y: 64 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'power3.out' }, at + .45);
        tl.fromTo($('.stage__media', stages[i + 1]),
          { clipPath: 'inset(0 0 0 100%)', autoAlpha: 1 },
          { clipPath: 'inset(0 0 0 0%)', duration: .55, ease: 'power3.inOut', immediateRender: false }, at + .45);
      });
      tl.to({}, { duration: .5 }); // settle beat on Maintain

      return function () { section.classList.remove('is-pinned'); };
    });

    // Static reveal for stacked (mobile / reduced-motion) presentation
    mm.add('(max-width: 999.98px), (prefers-reduced-motion: reduce)', function () {
      if (RM) return;
      stages.forEach(function (st) {
        gsap.fromTo(st, { autoAlpha: 0, y: 34 }, {
          autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: st, start: 'top 82%', once: true }
        });
      });
    });
  })();

  /* ------------------------------------------------------------------
     10 · MEMBRANE — one lightweight 3D object, travelling with scroll
  ------------------------------------------------------------------ */
  (function membrane() {
    var zone = $('#membrane-zone');
    if (!zone || RM || !hasGSAP) return;
    if (!window.matchMedia('(min-width: 900px)').matches) return;

    var testCanvas = doc.createElement('canvas');
    var gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) return;

    import('three').then(function (THREE) {
      return Promise.all([
        THREE,
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/environments/RoomEnvironment.js')
      ]);
    }).then(function (mods) {
      var THREE = mods[0], GLTFLoader = mods[1].GLTFLoader, RoomEnvironment = mods[2].RoomEnvironment;

      var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(zone.clientWidth, zone.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(38, 1, .1, 20);
      camera.position.set(0, 0, 2.7);

      var pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;

      var key = new THREE.DirectionalLight(0xfff1e2, 1.15);
      key.position.set(2.2, 3, 4);
      scene.add(key);
      var glow = new THREE.PointLight(0xb4776b, 14, 7, 2);
      glow.position.set(-.7, -.25, -.9);
      scene.add(glow);

      var mat = new THREE.MeshPhysicalMaterial({
        color: 0xf6efe8,
        transmission: .98, thickness: 1.1, ior: 1.36,
        roughness: .30, clearcoat: .45, clearcoatRoughness: .42,
        attenuationColor: new THREE.Color(0xc98a76), attenuationDistance: 2.4,
        envMapIntensity: .75
      });

      var mesh = null;
      var state = { tension: 0, visible: 1, px: 0, py: 0, sx: 0, sy: 0 };

      var loader = new GLTFLoader();
      function loadGLB(onDone, onFail) {
        /* Published single-file build embeds the model as base64 so no
           cross-origin fetch is ever needed; local build loads the file. */
        if (window.MEMBRANE_GLB_B64) {
          try {
            var bin = atob(window.MEMBRANE_GLB_B64);
            var buf = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
            loader.parse(buf.buffer, '', onDone, onFail);
          } catch (e) { onFail(e); }
        } else {
          loader.load('assets/membrane.glb', onDone, undefined, onFail);
        }
      }

      loadGLB(function (glb) {
        glb.scene.traverse(function (o) { if (o.isMesh) mesh = o; });
        if (!mesh) return;
        mesh.material = mat;
        mesh.scale.setScalar(1.05);
        scene.add(mesh);
        zone.classList.add('has-canvas');
        zone.appendChild(renderer.domElement);

        gsap.fromTo(zone, { autoAlpha: 0, scale: .93 }, { autoAlpha: 1, scale: 1, duration: 1.8, ease: 'power3.out', delay: .7 });

        // — scroll windows —
        var heroExit = gsap.timeline({
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 15%', scrub: .5 }
        });
        heroExit.to(zone, { y: -170, autoAlpha: 0, ease: 'none', onUpdate: trackVis }, 0);

        var pw = $('#protocol-stagewrap');
        if (pw) {
          gsap.fromTo(zone,
            { autoAlpha: 0, x: 0, y: -170, scale: .8 },
            {
              autoAlpha: .88, ease: 'none', immediateRender: false,
              x: function () { return -(window.innerWidth * .58); },
              y: function () { return window.innerHeight * .27; },
              scale: .5,
              scrollTrigger: { trigger: pw, start: 'top 55%', end: 'top top', scrub: .5 },
              onUpdate: trackVis
            });
          gsap.to(zone, {
            autoAlpha: 0, ease: 'none', immediateRender: false,
            scrollTrigger: { trigger: pw, start: 'bottom 60%', end: 'bottom 20%', scrub: .5 },
            onUpdate: trackVis
          });
        }
        function trackVis() { state.visible = parseFloat(getComputedStyle(zone).opacity) || 0; }

        window.addEventListener('pointermove', function (e) {
          state.px = (e.clientX / window.innerWidth - .5) * 2;
          state.py = (e.clientY / window.innerHeight - .5) * 2;
        }, { passive: true });

        window.__membrane = {
          setTension: function (t) { state.tension = Math.max(0, Math.min(1, t)); }
        };

        var clock = new THREE.Clock();
        renderer.setAnimationLoop(function () {
          if (doc.hidden || state.visible < .02 || !mesh) return;
          var t = clock.getElapsedTime();
          state.sx += (state.px - state.sx) * .05;
          state.sy += (state.py - state.sy) * .05;
          var breathe = 1 + .014 * Math.sin(t * .55);
          var tension = state.tension;
          mesh.rotation.y = t * .07 + state.sx * .22;
          mesh.rotation.x = -.12 + state.sy * .16 + tension * .35;
          mesh.rotation.z = -.08 + tension * .42;
          mesh.scale.set(1.05 * breathe, 1.05 * breathe * (1 - .16 * tension), 1.05 * breathe);
          mat.roughness = .34 - .12 * tension;
          glow.intensity = 14 + 10 * tension;
          renderer.render(scene, camera);
        });

        window.addEventListener('resize', function () {
          var w = zone.clientWidth, h = zone.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        });
      }, function () { /* GLB failed — fallback image stays */ });
    }).catch(function () { /* module load failed — fallback image stays */ });
  })();

  /* ------------------------------------------------------------------
     11 · BOOKING FORM — honest states, no fake success
  ------------------------------------------------------------------ */
  (function booking() {
    var form = $('#booking-form');
    if (!form) return;
    var status = $('#form-status'), submit = $('#form-submit'), label = $('#submit-label');
    var name = $('#f-name'), contact = $('#f-contact'), concern = $('#f-concern'), consent = $('#f-consent');
    var pending = false, done = false;
    var token = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random();

    function err(input, id, show) {
      var e = $('#' + id);
      if (e) e.hidden = !show;
      if (input) input.setAttribute('aria-invalid', show ? 'true' : 'false');
      return !show;
    }
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
    function validPhone(v) { return /^[+()\-\s\d]{7,20}$/.test(v) && (v.match(/\d/g) || []).length >= 7; }

    function setStatus(cls, html) {
      status.className = 'form__status ' + cls;
      status.innerHTML = html;
    }
    function setPending(on) {
      pending = on;
      submit.disabled = on || done;
      label.textContent = on ? 'Sending…' : (done ? 'Request sent' : 'Request a consultation');
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (pending || done) return;
      if (form.website && form.website.value) return; // honeypot

      var ok = true, first = null;
      var vName = name.value.trim().length >= 2;
      ok = err(name, 'err-name', !vName) && ok; if (!vName && !first) first = name;
      var cv = contact.value.trim();
      var vContact = validEmail(cv) || validPhone(cv);
      ok = err(contact, 'err-contact', !vContact) && ok; if (!vContact && !first) first = contact;
      var vConcern = !!concern.value;
      ok = err(concern, 'err-concern', !vConcern) && ok; if (!vConcern && !first) first = concern;
      var vConsent = consent.checked;
      ok = err(consent, 'err-consent', !vConsent) && ok; if (!vConsent && !first) first = consent;
      if (!ok) { setStatus('is-error', 'Please review the highlighted fields.'); if (first) first.focus(); return; }

      var endpoint = ((CFG.booking || {}).endpoint || '').trim();
      var c = CFG.contact || {};
      if (!endpoint) {
        setStatus('is-info',
          'Direct booking isn’t connected on this demonstration build — nothing was sent, and no success is faked. ' +
          'To configure it, set <code>booking.endpoint</code> in <code>config.js</code>. ' +
          'Meanwhile, reach Elena directly: <a href="mailto:' + (c.email || '') + '">' + (c.email || 'email') + '</a>' +
          (c.phone ? ' · <a href="tel:' + c.phone.replace(/[^+\d]/g, '') + '">' + c.phone + '</a>' : '') + '.');
        return;
      }

      setPending(true);
      setStatus('', '');
      var payload = {
        name: name.value.trim(), contact: cv, concern: concern.value,
        format: (form.querySelector('input[name="format"]:checked') || {}).value || '',
        consent: true, requestId: token, source: 'elena-orlova-site', sentAt: new Date().toISOString()
      };
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Request-Id': token },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        done = true;
        setPending(false);
        form.classList.add('is-done');
        setStatus('is-success', '<strong>Thank you — your request is in.</strong> I read every message myself and will reply personally. If it’s urgent, call or write directly using the contacts on the left.');
      }).catch(function () {
        setPending(false);
        setStatus('is-error', 'Something interrupted the connection and your request was not sent. Please try again — or write directly to <a href="mailto:' + (c.email || '') + '">' + (c.email || 'the studio email') + '</a>.');
      });
    });
  })();

  /* ------------------------------------------------------------------
     12 · SETTLE — refresh triggers once everything has real dimensions
  ------------------------------------------------------------------ */
  if (hasGSAP) {
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
