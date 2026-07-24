
/* ============================================================
   MOUNT — Interactions
   ============================================================ */
(function(){
  'use strict';

  // --- Boot guard: wait for DOM + GSAP, tolerate late script load ---
  function boot(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));
  // GSAP loads async; always read window.gsap at call time so late
  // arrivals are picked up. Calls degrade gracefully if missing.

  /* ---------- Toast ---------- */
  let toastT;
  window.toast = function(msg){
    const t = $('#toast'); if(!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), 2600);
  };

  /* ---------- Preloader ---------- */
  /* ---------- Preloader ---------- */
  function hidePreloader(){
    const pl = $('#preloader');
    if(pl){ pl.classList.add('done'); document.body.classList.remove('no-scroll'); }
    if(!prefersReduced && window.gsap){
      window.gsap.from('.hero-headline', {y:40, opacity:0, duration:1.2, ease:'power3.out', delay:.2});
      window.gsap.from('.hero-sub, .hero-ctas, .hero-bottom, .hero-top, .sound-toggle', {y:20, opacity:0, duration:1, ease:'power2.out', stagger:.08, delay:.5});
    }
  }
  if(document.readyState === 'complete'){
    setTimeout(hidePreloader, prefersReduced ? 200 : 1400);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, prefersReduced ? 200 : 1400));
  }
  // The local portfolio preview may defer the hero video indefinitely; never trap
  // visitors behind its preloader when the rest of the page is already interactive.
  setTimeout(hidePreloader, prefersReduced ? 200 : 2200);
  document.body.classList.add('no-scroll');

  /* ---------- Header scroll ---------- */
  const header = $('#header');
  const bookingBar = $('#booking-bar');
  let lastY = 0;
  function onScroll(){
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    // show booking bar after hero, hide near footer
    const hero = $('#hero');
    const footer = document.querySelector('footer');
    const pastHero = hero && y > hero.offsetHeight - 200;
    const nearFoot = footer && y + window.innerHeight > footer.offsetTop + 100;
    if(bookingBar){
      bookingBar.classList.toggle('show', pastHero && !nearFoot && window.innerWidth > 980);
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile nav ---------- */
  const mToggle = $('#menu-toggle');
  const mNav = $('#mobile-nav');
  function closeMobile(){
    mToggle.classList.remove('open');
    mNav.classList.remove('open');
    mToggle.setAttribute('aria-expanded','false');
    document.body.classList.remove('no-scroll');
  }
  function openMobile(){
    mToggle.classList.add('open');
    mNav.classList.add('open');
    mToggle.setAttribute('aria-expanded','true');
    document.body.classList.add('no-scroll');
  }
  if(mToggle){
    mToggle.addEventListener('click', () => {
      mNav.classList.contains('open') ? closeMobile() : openMobile();
    });
  }
  $$('[data-mclose]').forEach(a => a.addEventListener('click', closeMobile));

  /* ---------- Smooth anchor scroll ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if(id.length < 2) return;
      const el = $(id);
      if(!el) return;
      e.preventDefault();
      closeMobile();
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({top, behavior: prefersReduced ? 'auto' : 'smooth'});
    });
  });

  /* ---------- Reveal on scroll ---------- */
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    $$('.reveal, .reveal-img, .reveal-clip').forEach(el => io.observe(el));
  } else {
    $$('.reveal, .reveal-img, .reveal-clip').forEach(el => el.classList.add('in'));
  }

  /* ---------- GSAP parallax (light) ---------- */
  if(!prefersReduced && window.gsap && window.ScrollTrigger){
    const g = window.gsap;
    g.registerPlugin(window.ScrollTrigger);
    // subtle parallax on hero media
    g.to('#hero-media', {yPercent: 12, ease:'none', scrollTrigger:{trigger:'#hero', start:'top top', end:'bottom top', scrub:true}});
    // final image parallax
    g.to('#final .final-media img', {yPercent: -8, ease:'none', scrollTrigger:{trigger:'#final', start:'top bottom', end:'bottom top', scrub:true}});
  }

  /* ---------- Sound toggle ---------- */
  const sBtn = $('#sound-toggle');
  const video = $('#hero-media video');
  if(sBtn && video){
    sBtn.addEventListener('click', () => {
      const muted = video.muted;
      video.muted = !muted;
      if(!video.muted){ video.volume = 0.35; video.play().catch(()=>{}); }
      sBtn.classList.toggle('muted', video.muted);
      sBtn.setAttribute('aria-pressed', String(!video.muted));
      const txt = sBtn.querySelector('.st-txt');
      if(txt) txt.textContent = i18n.t(video.muted ? 'sound-on' : 'sound-off');
    });
  }

  /* ---------- View Finder ---------- */
  const vfData = [
    {name:'Valley Suite', size:'42 м²', guests:'2', view:{ru:'Долина',en:'Valley'}, price:'₽ 28 000',
      desc:{ru:'Тихий интерьер, обращённый к нижней долине. Свет приходит медленно, вместе с туманом.', en:'A quiet interior facing the lower valley. Light arrives slowly, with the mist.'}},
    {name:'Ridge Suite', size:'58 м²', guests:'2', view:{ru:'Гребень',en:'Ridge'}, price:'₽ 38 000',
      desc:{ru:'Выше по склону. Частная терраса и окно, в которое входит горный воздух.', en:'Higher on the slope. A private terrace and a window the mountain air walks through.'}},
    {name:'Stone House', size:'96 м²', guests:'4', view:{ru:'Гора',en:'Mountain'}, price:'₽ 64 000',
      desc:{ru:'Отдельная резиденция для семьи или небольшой компании. Две спальни, гостиная, очаг.', en:'A standalone residence for family or small group. Two bedrooms, a living room, a hearth.'}},
    {name:'Panorama Residence', size:'128 м²', guests:'4', view:{ru:'Долина 180°',en:'Valley 180°'}, price:'₽ 92 000',
      desc:{ru:'Самая уединённая резиденция. Полный вид на долину, частная сауна, персональный хост.', en:'The most private residence. Full valley view, a private sauna, a dedicated host.'}}
  ];
  const vfStage = $('#vf-stage');
  const vfViews = $$('.vf-view');
  const vfTabs = $$('.vf-tab');
  const vfBar = $('#vf-bar');
  let vfIndex = 0;
  let vfDragging = false, vfStartX = 0, vfStartIndex = 0;

  function setVF(i, silent){
    i = (i + 4) % 4;
    if(i === vfIndex && silent) return;
    vfIndex = i;
    const cur = i18n.current;
    vfViews.forEach((v,idx) => v.classList.toggle('active', idx === i));
    vfTabs.forEach((t,idx) => t.classList.toggle('active', idx === i));
    if(vfBar) vfBar.style.width = ((i+1)/4*100) + '%';
    const d = vfData[i];
    // animate info swap
    const info = $('#vf-info');
    if(info && !prefersReduced){
      window.gsap.to(info, {opacity:0, y:8, duration:.25, ease:'power2.in', onComplete:()=>{
        $('#vf-num-txt').textContent = String(i+1).padStart(2,'0') + ' / 04';
        $('#vf-name').textContent = d.name;
        $('#vf-desc').textContent = d.desc[cur];
        $('#vf-size').textContent = d.size;
        $('#vf-guests').textContent = d.guests;
        $('#vf-view').textContent = d.view[cur];
        $('#vf-price').textContent = d.price;
        window.gsap.to(info, {opacity:1, y:0, duration:.5, ease:'power2.out'});
      }});
    } else {
      $('#vf-num-txt').textContent = String(i+1).padStart(2,'0') + ' / 04';
      $('#vf-name').textContent = d.name;
      $('#vf-desc').textContent = d.desc[cur];
      $('#vf-size').textContent = d.size;
      $('#vf-guests').textContent = d.guests;
      $('#vf-view').textContent = d.view[cur];
      $('#vf-price').textContent = d.price;
    }
  }

  if(vfStage){
    // pointer drag
    vfStage.addEventListener('pointerdown', e => {
      if(e.pointerType === 'mouse' && e.button !== 0) return;
      vfDragging = true; vfStartX = e.clientX; vfStartIndex = vfIndex;
      vfStage.setPointerCapture(e.pointerId);
    });
    vfStage.addEventListener('pointermove', e => {
      if(!vfDragging) return;
      const dx = e.clientX - vfStartX;
      const w = vfStage.offsetWidth;
      const step = w / 4;
      const delta = -Math.round(dx / step);
      const target = vfStartIndex + delta;
      if(target !== vfIndex) setVF(target, true);
    });
    vfStage.addEventListener('pointerup', e => { vfDragging = false; });
    vfStage.addEventListener('pointercancel', () => { vfDragging = false; });
    // hover on desktop -> move toward pointer x
    if(!isTouch){
      vfStage.addEventListener('mousemove', e => {
        if(vfDragging) return;
        const r = vfStage.getBoundingClientRect();
        const ratio = (e.clientX - r.left) / r.width;
        const target = Math.max(0, Math.min(3, Math.floor(ratio * 4)));
        if(target !== vfIndex) setVF(target, true);
      });
    }
    // tabs
    vfTabs.forEach((t,idx) => t.addEventListener('click', () => setVF(idx)));
    // keyboard
    vfStage.addEventListener('keydown', e => {
      if(e.key === 'ArrowRight') setVF(vfIndex+1);
      if(e.key === 'ArrowLeft') setVF(vfIndex-1);
    });
    // wheel horizontal-ish: only when section in view, prevent page hijack by using delta small
    let wheelLock = false;
    vfStage.addEventListener('wheel', e => {
      // do not hijack vertical scroll; allow only trackpad horizontal
      if(Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8){
        e.preventDefault();
        if(wheelLock) return; wheelLock = true;
        setVF(vfIndex + (e.deltaX > 0 ? 1 : -1));
        setTimeout(()=>wheelLock=false, 350);
      }
    }, {passive:false});
  }

  /* ---------- Season selector ---------- */
  const seasons = {
    winter: {name:{ru:'Зима',en:'Winter'}, atm:{ru:'Молчаливая белизна. Дороги тише, воздух суше, огонь ярче.',en:'Silent whiteness. Quieter roads, drier air, brighter fire.'},
      temp:'−8 … +2°', stay:{ru:'3–4 ночи',en:'3–4 nights'}, pack:{ru:'Тёплая обувь, layers',en:'Warm boots, layers'},
      exps:{ru:['Снегоступные маршруты','Вечера у камина','Горная сауна','Зимние поездки'],en:['Snowshoe routes','Fireplace evenings','Mountain sauna','Winter drives']}},
    spring: {name:{ru:'Весна',en:'Spring'}, atm:{ru:'Вода просыпается. Снег сходит с гребней, долина зеленеет.',en:'Water wakes. Snow leaves the ridges, the valley turns green.'},
      temp:'+4 … +14°', stay:{ru:'2–3 ночи',en:'2–3 nights'}, pack:{ru:'Непромокаемая куртка',en:'Waterproof jacket'},
      exps:{ru:['Водопады','Зелёные прогулки','Деревенские визиты','Сезонная кухня'],en:['Waterfalls','Green valley walks','Village visits','Seasonal cuisine']}},
    summer: {name:{ru:'Лето',en:'Summer'}, atm:{ru:'Длинный свет. Альпийские луга цветут, тропы открыты до темноты.',en:'Long light. Alpine meadows bloom, trails stay open until dusk.'},
      temp:'+16 … +24°', stay:{ru:'4–5 ночей',en:'4–5 nights'}, pack:{ru:'Солнцезащита, треккинговая обувь',en:'Sun protection, hiking shoes'},
      exps:{ru:['Гид-хайкинг','Конные маршруты','Альпийские пикники','Восходы'],en:['Guided hiking','Horseback routes','Alpine picnics','Sunrise routes']}},
    autumn: {name:{ru:'Осень',en:'Autumn'}, atm:{ru:'Тёплый цвет и тихий воздух. Лес горит, потом медленно стихает.',en:'Warm colour and quiet air. The forest burns, then slowly settles.'},
      temp:'+6 … +16°', stay:{ru:'3 ночи',en:'3 nights'}, pack:{ru:'Слои, камера',en:'Layers, a camera'},
      exps:{ru:['Лесные тропы','Фото-прогулки','Урожайное меню','Тихий wellness'],en:['Forest trails','Photography walks','Harvest menu','Quiet wellness']}}
  };
  const sTabs = $$('.season-tab');
  const sImgs = $$('.season-img');
  function setSeason(key){
    const s = seasons[key]; if(!s) return;
    const cur = i18n.current;
    sImgs.forEach(img => img.classList.toggle('active', img.dataset.season === key));
    sTabs.forEach(t => { const on = t.dataset.stab === key; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    // text swap with fade
    const nameEl = $('#s-name'), atmEl = $('#s-atm'), expsEl = $('#s-exps');
    const swap = () => {
      nameEl.innerHTML = '<span>' + s.name[cur] + '</span>';
      atmEl.textContent = s.atm[cur];
      $('#s-temp').textContent = s.temp;
      $('#s-stay').textContent = s.stay[cur];
      $('#s-pack').textContent = s.pack[cur];
      expsEl.innerHTML = s.exps[cur].map(x => '<span class="se-chip">'+x+'</span>').join('');
    };
    if(prefersReduced){ swap(); return; }
    window.gsap.to([nameEl, atmEl, '#s-temp','#s-stay','#s-pack', expsEl], {opacity:0, duration:.3, onComplete:()=>{ swap(); window.gsap.to([nameEl, atmEl, '#s-temp','#s-stay','#s-pack', expsEl], {opacity:1, duration:.5}); }});
  }
  sTabs.forEach(t => t.addEventListener('click', () => setSeason(t.dataset.stab)));
  // init first season chips
  setSeason('winter');

  /* ---------- Reviews slider ---------- */
  const revSlides = $$('.rev-slide');
  const revDots = $$('.rev-dot');
  let revI = 0, revTimer;
  function setRev(i){
    revI = (i + revSlides.length) % revSlides.length;
    revSlides.forEach((s,idx) => {
      if(idx === revI){ s.style.display='block'; if(!prefersReduced) window.gsap.fromTo(s, {opacity:0,y:14}, {opacity:1,y:0,duration:.6,ease:'power2.out'}); }
      else s.style.display='none';
    });
    revDots.forEach((d,idx) => d.classList.toggle('active', idx === revI));
  }
  function startRev(){
    clearInterval(revTimer);
    if(prefersReduced) return;
    revTimer = setInterval(() => setRev(revI+1), 6000);
  }
  revDots.forEach((d,idx) => d.addEventListener('click', () => { setRev(idx); startRev(); }));
  setRev(0); startRev();

  /* ---------- Modals ---------- */
  function openModal(m){
    if(!m) return;
    m.classList.add('open');
    document.body.classList.add('no-scroll');
    const closeBtn = m.querySelector('[data-close], .modal-close, .gallery-close');
    if(closeBtn) setTimeout(()=>closeBtn.focus(), 100);
  }
  function closeModal(m){ m.classList.remove('open'); document.body.classList.remove('no-scroll'); }
  $$('.modal').forEach(m => {
    $$('[data-close]', m).forEach(b => b.addEventListener('click', () => closeModal(m)));
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      $$('.modal.open').forEach(m => closeModal(m));
      if(mNav && mNav.classList.contains('open')) closeMobile();
    }
  });

  /* ---------- Menu modal ---------- */
  const menuOpen = $('#menu-open');
  const menuModal = $('#menu-modal');
  if(menuOpen && menuModal) menuOpen.addEventListener('click', () => openModal(menuModal));

  /* ---------- Gallery modal ---------- */
  const gallerySets = [
    ['/demos/mount/images/room-valley.png','/demos/mount/images/room-bedroom.png','/demos/mount/images/room-bathroom.png','/demos/mount/images/material-stone.png'],
    ['/demos/mount/images/room-ridge.png','/demos/mount/images/room-valley.png','/demos/mount/images/material-oak.png','/demos/mount/images/material-stone.png'],
    ['/demos/mount/images/room-stonehouse.png','/demos/mount/images/room-bedroom.png','/demos/mount/images/restaurant.png','/demos/mount/images/material-oak.png'],
    ['/demos/mount/images/room-panorama.png','/demos/mount/images/room-bathroom.png','/demos/mount/images/spa.png','/demos/mount/images/material-stone.png']
  ];
  const galleryTitles = ['Valley Suite','Ridge Suite','Stone House','Panorama Residence'];
  const galleryModal = $('#gallery-modal');
  const gStage = $('#gallery-stage');
  const gThumbs = $('#gallery-thumbs');
  const gTitle = $('#gallery-title');
  const gCount = $('#gallery-count');
  let gSet = [], gI = 0;
  function buildGallery(idx){
    gSet = gallerySets[idx]; gI = 0;
    gTitle.textContent = galleryTitles[idx];
    gStage.innerHTML = gSet.map((src,i) => `<img src="${src}" class="${i===0?'active':''}" alt="${galleryTitles[idx]} — фото ${i+1}">`).join('');
    gThumbs.innerHTML = gSet.map((src,i) => `<button data-gi="${i}" class="${i===0?'active':''}" aria-label="Фото ${i+1}"><img src="${src}" alt=""></button>`).join('');
    updateGCount();
    $$('#gallery-thumbs button').forEach(b => b.addEventListener('click', () => goG(parseInt(b.dataset.gi))));
  }
  function updateGCount(){ if(gCount) gCount.textContent = String(gI+1).padStart(2,'0') + ' / ' + String(gSet.length).padStart(2,'0'); }
  function goG(i){
    gI = (i + gSet.length) % gSet.length;
    $$('#gallery-stage img').forEach((im,idx) => im.classList.toggle('active', idx === gI));
    $$('#gallery-thumbs button').forEach((b,idx) => b.classList.toggle('active', idx === gI));
    updateGCount();
  }
  $$('[data-gallery]').forEach(b => b.addEventListener('click', () => { buildGallery(parseInt(b.dataset.gallery)); openModal(galleryModal); }));
  if($('#g-prev')) $('#g-prev').addEventListener('click', () => goG(gI-1));
  if($('#g-next')) $('#g-next').addEventListener('click', () => goG(gI+1));
  if(galleryModal) galleryModal.addEventListener('keydown', e => { if(e.key==='ArrowLeft') goG(gI-1); if(e.key==='ArrowRight') goG(gI+1); });

  /* ---------- Booking form ---------- */
  const form = $('#book-form');
  const arr = $('#bf-arrival'), dep = $('#bf-departure');
  const result = $('#bf-result');
  // default dates: today + tomorrow
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const tomorrow = new Date(today.getTime() + 86400000);
  const dayAfter = new Date(today.getTime() + 3*86400000);
  if(arr){ arr.min = fmt(today); arr.value = fmt(tomorrow); }
  if(dep){ dep.min = fmt(tomorrow); dep.value = fmt(dayAfter); }
  if(arr) arr.addEventListener('change', () => { if(dep){ dep.min = arr.value; if(dep.value < arr.value) dep.value = arr.value; } });

  // guest selector
  let guests = 2;
  const gv = $('#bf-guests');
  const bbGv = $('#bb-guests-val');
  function updGuests(){
    if(gv) gv.textContent = guests;
    if(bbGv) bbGv.textContent = guests + ' ' + (i18n.current==='ru' ? (guests===1?'гость':guests<5?'гостя':'гостей') : (guests===1?'guest':'guests'));
  }
  if($('#g-plus')) $('#g-plus').addEventListener('click', () => { if(guests<8){guests++; updGuests();} });
  if($('#g-minus')) $('#g-minus').addEventListener('click', () => { if(guests>1){guests--; updGuests();} });
  updGuests();

  // room select sync to booking bar
  const roomSel = $('#bf-room');
  const bbRoom = $('#bb-room-val');
  if(roomSel) roomSel.addEventListener('change', () => {
    if(bbRoom) bbRoom.textContent = roomSel.options[roomSel.selectedIndex].text;
  });

  function validate(){
    let ok = true;
    [['#ff-arrival','#bf-arrival'],['#ff-departure','#bf-departure']].forEach(([ff,inp]) => {
      const field = $(ff), input = $(inp);
      if(!input.value){ field.classList.add('invalid'); input.classList.add('err'); ok = false; }
      else { field.classList.remove('invalid'); input.classList.remove('err'); }
    });
    if(arr.value && dep.value && dep.value <= arr.value){
      $('#ff-departure').classList.add('invalid'); dep.classList.add('err'); ok = false;
    }
    return ok;
  }
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      if(!validate()){
        result.className = 'bf-result error show';
        result.innerHTML = '<div class="br-t">' + i18n.t('book-err-t') + '</div><div class="br-d">' + i18n.t('book-err-d') + '</div>';
        return;
      }
      // demo availability
      const nights = Math.max(1, Math.round((new Date(dep.value) - new Date(arr.value)) / 86400000));
      const roomIdx = roomSel.value === 'any' ? null : parseInt(roomSel.value);
      const allRooms = [
        {n:'Valley Suite', a:'few', p:'₽ 28 000'},
        {n:'Ridge Suite', a:'ok', p:'₽ 38 000'},
        {n:'Stone House', a:'ok', p:'₽ 64 000'},
        {n:'Panorama Residence', a:'no', p:'₽ 92 000'}
      ];
      const list = roomIdx === null ? allRooms : [allRooms[roomIdx]];
      const statusTxt = {ru:{ok:'Доступно',few:'Места есть',no:'Занято'},en:{ok:'Available',few:'Few left',no:'Sold out'}};
      const cur = i18n.current;
      const items = list.map(r => `<div class="br-room"><span>${r.n}</span><span class="brr-s ${r.a}">${statusTxt[cur][r.a]}</span></div>`).join('');
      result.className = 'bf-result success show';
      result.innerHTML =
        '<div class="br-t">' + i18n.t('book-ok-t') + '</div>' +
        '<div class="br-d">' + i18n.t('book-ok-d').replace('{nights}', nights).replace('{guests}', guests) + '</div>' +
        '<div class="br-rooms">' + items + '</div>' +
        '<div class="br-d" style="margin-top:14px;font-size:12px;color:var(--grey)">' + i18n.t('book-demo') + '</div>';
      result.scrollIntoView({behavior:'smooth', block:'nearest'});
    });
  }

  // booking bar date inputs -> scroll to booking on focus
  if($('#bb-arrival')) $('#bb-arrival').addEventListener('focus', () => { $('#booking').scrollIntoView({behavior:'smooth'}); });
  if($('#bb-departure')) $('#bb-departure').addEventListener('focus', () => { $('#booking').scrollIntoView({behavior:'smooth'}); });

  /* ---------- Newsletter ---------- */
  const nlForm = $('#nl-form');
  if(nlForm){
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('#nl-email');
      if(!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
        toast(i18n.t('nl-err')); return;
      }
      const msg = $('#nl-msg');
      if(msg){ msg.classList.add('show'); }
      nlForm.reset();
      setTimeout(()=>{ if(msg) msg.classList.remove('show'); }, 4000);
    });
  }

  /* ---------- Lazy video: only autoplay when hero visible ---------- */
  if(video && 'IntersectionObserver' in window){
    const vio = new IntersectionObserver(en => {
      en.forEach(e => { if(e.isIntersecting) video.play().catch(()=>{}); else video.pause(); });
    }, {threshold:0.2});
    vio.observe(video);
  }

  /* ============================================================
     i18n
     ============================================================ */
  const EN = {
    'cta-check':'Check availability','cta-discover':'Discover MOUNT','cta-gallery':'Gallery',
    'hero-label':'North Ossetia — Caucasus','hero-alt':'Altitude 1,680 m','hero-h-1':'Above','hero-h-2':'the unnecessary.',
    'hero-sub':'A secluded architectural hotel shaped by stone, silence, and the mountains of North Ossetia.',
    'hero-season':'Summer · +18–24°','scroll':'Scroll','sound-on':'Sound','sound-off':'Mute',
    'f-arrival':'Arrival','f-departure':'Departure','f-guests':'Guests','f-room':'Room type','f-promo':'Promo code (optional)',
    'room-any':'Any',
    'brand-eyebrow':'The idea','brand-h-1':'The mountain is not the backdrop.','brand-h-2':'It is the architecture.',
    'brand-p1':'MOUNT was designed as a quiet continuation of the slope. Low stone volumes follow the relief and are barely readable from a distance — you notice them only up close.',
    'brand-p2':'<strong>Local stone, warm oak, brushed bronze and panoramic glass</strong> hold one rule: nothing between you and the landscape.',
    'topo-l':'Slope contours · 1,680 m',
    'vf-eyebrow':'02 · The view','vf-h-1':'The view','vf-h-2':'becomes the room.',
    'vf-intro':'Move along the horizon and walk through the hotel. Each turn opens a new vantage: the valley, the ridge, a stone house, a panoramic residence.',
    'vf-d0':'A quiet interior facing the lower valley. Light arrives slowly, with the mist.','vf-choose':'Choose this room',
    'sp-size':'Area','sp-guests':'Guests','sp-view':'View','sp-from':'From','sp-features':'Features','sp-bedrooms':'Bedrooms',
    'rn-0':'Valley Suite','rn-1':'Ridge Suite','rn-2':'Stone House','rn-3':'Panorama Residence',
    'vf-hint':'Move the cursor · swipe on mobile',
    'rooms-eyebrow':'03 · Rooms & residences','rooms-h-1':'Four ways','rooms-h-2':'to meet the silence.',
    'rooms-intro':'Each room is a separate composition of stone, oak and light. None repeats another; all speak one language.',
    'rooms-n1':'Room 01','rooms-n2':'Room 02','rooms-n3':'Room 03','rooms-n4':'Room 04',
    'rd-0':'A quiet interior facing the lower valley. Panoramic window, fireplace, linen and warm oak. Light arrives slowly with the morning mist.',
    'rd-1':'Higher on the slope. A private terrace, a tub facing the ridge, a window the mountain air walks through.',
    'rd-2':'A standalone residence for family or a small group. Two bedrooms, a living room with a fireplace, a kitchen and an outdoor hearth.',
    'rd-3':'The most private residence. Full valley view from two sides, a private sauna, a terrace and a dedicated host.',
    'view-valley':'Valley','view-ridge':'Ridge','view-panorama':'Valley 180°',
    'rf-0':'Fireplace · breakfast','rf-1':'Terrace · tub','rf-2':'Kitchen · hearth','rf-3':'Sauna · host',
    'per-night':'/ night',
    'seasons-eyebrow':'04 · Seasons','seasons-h-1':'Four mountains','seasons-h-2':'in one place.',
    'seasons-intro':'MOUNT changes more gently than it seems. Snow, water, colour, quiet — each season asks for its own rhythm and length of stay.',
    'se-winter':'Winter','se-spring':'Spring','se-summer':'Summer','se-autumn':'Autumn',
    'se-temp':'Temperature','se-stay':'Recommended','se-pack':'Pack',
    'se-winter-atm':'Silent whiteness. Quieter roads, drier air, brighter fire.','se-winter-pack':'Warm boots, layers',
    'exp-eyebrow':'05 · Experiences','exp-h-1':'Curated','exp-h-2':'walks.',
    'exp-intro':'Not tours but slow routes, gathered by the hotel with local guides. Each can be added to a stay.',
    'exp-01':'01 · Half day','exp-01-t':'Walk through mountain valleys','exp-01-d':'A guide leads a quiet trail along the river to a lookout above the valley.',
    'exp-02':'02 · Full day','exp-02-t':'Stone settlements','exp-02-d':'A route to historic stone towers and settlements, with stories of local culture.',
    'exp-03':'03 · Morning','exp-03-t':'Breakfast above the clouds','exp-03-d':'An early climb to the ridge where morning mist settles below you. Breakfast outdoors.',
    'exp-04':'04 · Half day','exp-04-t':'Picnic by a mountain river','exp-04-d':'A private picnic on a riverbank with local cheeses, bread and herbal tea.',
    'exp-05':'05 · Evening','exp-05-t':'Stargazing','exp-05-d':'Dark sky at altitude, far from city light. A telescope and warm tea on the terrace.',
    'rest-eyebrow':'06 · Restaurant','rest-h-1':'The landscape,','rest-h-2':'served slowly.',
    'rest-p1':'A seasonal kitchen that reads the ingredients and traditions of the Caucasus through a contemporary lens. Local trout, meadow herbs, mountain honey, sourdough and vegetables from nearby fields.',
    'rest-p2':'Open fire and panoramic glass. Breakfast begins in silence, dinner with a long tasting.',
    'rest-chef-l':'Chef','rest-chef-n':'Aslan Kasaev','rest-chef-q':'“I don’t invent the menu — I listen to what the mountain brings this month.”',
    'rest-menu':'Seasonal menu','rest-menu-note':'Tasting set · 7 courses',
    'menu-sub':'A seven-course tasting set. The menu changes with season and availability. Prices are indicative.',
    'menu-start':'Start','menu-main':'Main','menu-dessert':'Dessert','menu-c1':'Cold courses','menu-c2':'Warm','menu-c3':'Sweet',
    'menu-1-n':'Mountain trout tartare','menu-1-d':'Cucumber, dill, leek oil','menu-2-n':'Cheese with meadow herbs','menu-2-d':'Sourdough, honey, walnut','menu-3-n':'Root vegetables with pesto','menu-3-d':'Daikon, carrot, green basil',
    'menu-4-n':'Trout over open fire','menu-4-d':'Smoked butter, young greens','menu-5-n':'Braised venison','menu-5-d':'Juniper, root, berry','menu-6-n':'Roasted roots','menu-6-d':'Parsnip, Jerusalem artichoke, ash',
    'menu-7-n':'Apple and mountain honey','menu-7-d':'Caramel, thyme','menu-8-n':'Meadow berry sorbet','menu-8-d':'Juniper, rosehip',
    'menu-foot':'Tasting set — ₽ 7,800 per guest. Wine pairing on request. Dish information is indicative and reflects the seasonal concept of the kitchen.',
    'well-eyebrow':'07 · Wellness','well-h-1':'Warmth','well-h-2':'at mountain scale.',
    'well-p':'The opposite of the cold air outside. Stone, steam, water and linen — slowly and in silence, in hours closed to other guests on request.',
    'well-1':'Stone sauna','well-1-d':'Local stone, soft steam','well-2':'Steam room','well-2-d':'Meadow herbs',
    'well-3':'Thermal pool','well-3-d':'Outdoor, with a view','well-4':'Heated terrace','well-4-d':'Cold air, warm stone',
    'well-5':'Massage & rituals','well-5-d':'By appointment','well-6':'Private hours','well-6-d':'Individually',
    'arch-eyebrow':'08 · Architecture','arch-h-1':'Built into the contour,','arch-h-2':'not placed above it.',
    'arch-intro':'MOUNT follows the slope. Volumes step downward, holding a south-east orientation for soft morning light and natural shade later in the day.',
    'arch-plan-l':'Section along the slope','arch-p1':'Load-bearing walls are <strong>local slate</strong>, quarried within 40 km. Oak is air-dried. Bronze is brushed matte, so it doesn’t glare at sunset.',
    'arch-p2':'The glazing sits in thin bronze frames that almost disappear at dusk, when warm light comes on inside.',
    'arch-pr1-t':'Passive orientation','arch-pr1-d':'South-east — soft morning light, shade after noon.','arch-pr2-t':'Natural shading','arch-pr2-d':'Deep stone eaves and terraces.',
    'arch-pr3-t':'Local stone','arch-pr3-d':'Slate within 40 km, minimal processing.','arch-pr4-t':'Low silhouette','arch-pr4-d':'Volumes read only up close, never dominating the landscape.',
    'mat-stone-l':'Stone','mat-stone-n':'Local slate','mat-oak-l':'Wood','mat-oak-n':'Warm oak','mat-bronze-l':'Metal','mat-bronze-n':'Brushed bronze','mat-linen-l':'Textile','mat-linen-n':'Natural linen','mat-glass-l':'Glass','mat-glass-n':'Panoramic',
    'loc-eyebrow':'09 · Location','loc-h-1':'North Ossetia,','loc-h-2':'from above.',
    'loc-intro':'The road to MOUNT is part of the experience. The climb follows a serpentine through forest and a pass, after which the valley opens.',
    'loc-p':'The hotel stands on the eastern slope, an hour of serpentine from the nearest airport. In winter a stretch of road may need an all-wheel transfer — we meet guests and bring them to the door.',
    'loc-airport':'Airport','loc-airport-note':'Nearest · we meet on request','loc-transfer':'Transfer','loc-transfer-v':'~ 1h 20min <span class="lr-note">Private, included for stays of 3+ nights</span>',
    'loc-heli':'Helicopter','loc-heli-v':'On request <span class="lr-note">Subject to conditions</span>','loc-road':'Road','loc-road-v':'Serpentine, asphalt + gravel <span class="lr-note">Winter — all-wheel drive</span>',
    'loc-access':'Access','loc-access-v':'Year-round <span class="lr-note">Weather-dependent — check ahead</span>','loc-cta':'Plan your journey <span class="arrow">→</span>','loc-note':'Transfer info is indicative',
    'map-valley':'Valley','map-ridge':'Ridge','map-n':'N·W','map-s':'S·E',
    'journal-eyebrow':'10 · Journal','journal-h-1':'Slow','journal-h-2':'texts.','journal-intro':'Notes on place, architecture and mountains — for those preparing a stay.',
    'j-1-c':'Guide','j-1-t':'Quiet travel in North Ossetia','j-1-d':'Where to go, when to switch off the phone without regret. Routes without crowds and points where the mountain is heard best.',
    'j-2-c':'Architecture','j-2-t':'Architecture shaped by altitude','j-2-d':'How the contour dictates the plan and the stone dictates the light. A conversation about designing MOUNT.',
    'j-3-c':'Seasons','j-3-t':'Four seasons at MOUNT','j-3-d':'How the same slope differs in January and September — and when to come for what.','j-read':'Read',
    'rev-eyebrow':'11 · Guest impressions',
    'rev-1-q':'The silence here is physical. In three days I forgot what my phone sounds like.','rev-1-a':'Irina M. · Moscow',
    'rev-2-q':'The architecture doesn’t argue with the mountain. It just stands beside it — and that is enough.','rev-2-a':'Dmitry K. · St. Petersburg',
    'rev-3-q':'Dinner lasted three hours and I didn’t notice. The landscape on the plate is not marketing, it’s true.','rev-3-a':'Anna & Sergey · Kazan','rev-note':'Reviews are conceptual placeholders',
    'book-eyebrow':'12 · Booking','book-h-1':'Check','book-h-2':'availability.','book-p':'Choose dates and room type. We show indicative availability — final confirmation arrives from the host within a few hours.',
    'book-pt-1':'Transfer included for stays of 3+ nights','book-pt-2':'Flexible cancellation up to 14 days before arrival','book-pt-3':'Breakfast included in all categories','book-pt-4':'Free — children under 6',
    'book-form-t':'Check availability','book-form-l':'Demo mode','err-date':'Choose a date',
    'book-err-t':'Check the dates','book-err-d':'Please select an arrival and a later departure.',
    'book-ok-t':'Availability','book-ok-d':'{nights} nights · {guests} guests',
    'book-demo':'Demo availability — no real reservation is made.',
    'final-label':'North Ossetia · Caucasus','final-h-1':'Some places give you more.','final-h-2':'MOUNT leaves you less to carry.','final-cta':'Plan your stay <span class="arrow">→</span>',
    'foot-desc':'A secluded architectural hotel on a slope in North Ossetia–Alania. Stone, silence, mountains.',
    'foot-nav':'Navigation','foot-nav-1':'Rooms','foot-nav-2':'Experiences','foot-nav-3':'Restaurant','foot-nav-4':'Wellness','foot-nav-5':'Architecture','foot-nav-6':'Journal',
    'foot-contact-h':'Contact','foot-phone':'Phone','foot-email':'Email','foot-addr':'Address','foot-addr-v':'North Ossetia–Alania, RU','foot-hours':'Reception','foot-hours-v':'24 hours',
    'foot-nl':'A letter once a season','foot-nl-ok':'Thank you. One letter a season — and only.',
    'foot-legal':'Documents','foot-legal-1':'Privacy policy','foot-legal-2':'Terms','foot-legal-3':'Booking policy','foot-legal-4':'Cookies',
    'foot-rights':'All rights reserved. Conceptual project.','foot-top':'Top ↑','nl-err':'Please enter a valid email'
  };
  const RU = {}; // fallback to default text already in DOM
  const i18n = {
    current: 'ru',
    t(key){ const dict = this.current==='en' ? EN : RU; return dict[key] !== undefined ? dict[key] : key; }
  };
  window.i18n = i18n;

  function applyLang(lang){
    i18n.current = lang;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    const dict = lang === 'en' ? EN : null;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(dict && dict[key] !== undefined){
        el.innerHTML = dict[key];
      } else if(lang === 'ru'){
        // restore original RU text from cache
        if(el.dataset.ru) el.innerHTML = el.dataset.ru;
      }
    });
    // lang buttons
    $$('[data-lang]').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    // refresh dynamic content
    setVF(vfIndex, true);
    setSeason($$('.season-tab.active')[0]?.dataset.stab || 'winter');
    updGuests();
    if(roomSel && bbRoom) bbRoom.textContent = roomSel.options[roomSel.selectedIndex].text;
  }

  // cache RU text before any EN apply
  $$('[data-i18n]').forEach(el => { el.dataset.ru = el.innerHTML; });

  $$('[data-lang]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  // expose for sound toggle label
  window.applyLang = applyLang;
  } // end boot()

  // --- Run boot once DOM is ready ---
  function start(){
    if(document.getElementById('hero')) boot();
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
