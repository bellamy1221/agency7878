/* ==========================================================
   LEVANTE — site behaviour
   Loaded with `defer`, after gsap / ScrollTrigger / lenis.
   Progressive enhancement: if this or the motion libs fail,
   the page stays fully readable (see html.anim gating in CSS).
   ========================================================== */
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var H=document.documentElement;
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia('(pointer: fine)').matches;

/* ============================================================
   CONFIGURE ME — reservation delivery endpoint.
   Leave '' for development: the form validates fully but shows a
   clear "not configured" notice instead of faking a success.
   Set to a URL that accepts a POST with a JSON body, e.g.:
     • Formspree:  https://formspree.io/f/xxxxxxxx
     • Resend / custom serverless function
     • any backend route that returns 2xx on success
   ============================================================ */
var RESERVATION_ENDPOINT='';

/* ============ DATA ============ */
var ACTS=[
 {n:'01',name:'First Light',time:'13:30',dish:'Menorcan oyster · green almond · finger lime',note:'Raw and cold, while the sun is high.',
  img:'act-1-first-light-oyster',bg:'#FAF7F0',dark:false},
 {n:'02',name:'The Tide',time:'14:00',dish:'Red prawn · sea butter · warm bread',note:'The morning catch, barely touched.',
  img:'act-2-the-tide-prawn',bg:'#F3ECDC',dark:false},
 {n:'03',name:'The Field',time:'14:45',dish:'Ramellet tomato · Mahón curd · new oil',note:'The island’s interior — garden, dairy, grain.',
  img:'act-3-the-field-tomato',bg:'#EADDC1',dark:false},
 {n:'04',name:'The Ember',time:'15:30',dish:'Lamb over vine embers · black garlic · rosemary smoke',note:'Everything the fire holds. The room goes quiet and warm.',
  img:'act-4-the-ember-lamb',
  video:'assets/videos/ember.mp4',vposter:'ember-poster',
  bg:'#161210',dark:true},
 {n:'05',name:'Golden Hour',time:'17:00',dish:'Apricot in honey · fig-leaf ice cream · salt',note:'Sweetness as the light goes long.',
  img:'act-5-golden-hour-apricot',bg:'#EEDFBE',dark:false}
];
var DISH_W=1200,DISH_H=1490;

/* build a <picture> markup string (webp + jpg fallback) */
function pic(base,alt,w,h,extra){
  return '<picture>'+
    '<source srcset="assets/images/'+base+'.webp" type="image/webp">'+
    '<img src="assets/images/'+base+'.jpg" alt="'+alt+'" width="'+w+'" height="'+h+'" loading="lazy" decoding="async"'+(extra||'')+'>'+
  '</picture>';
}

/* ============ BUILD DAY DOM ============ */
var stageMedia=$('#stageMedia');
if(stageMedia){
  ACTS.forEach(function(a,i){
    var m=document.createElement('div');
    m.className='act-media';m.dataset.i=i;
    if(a.video){
      m.innerHTML='<video muted loop playsinline preload="none" tabindex="-1" aria-hidden="true" poster="assets/images/'+a.vposter+'.jpg"><source src="'+a.video+'" type="video/mp4"></video>';
    }else{
      m.innerHTML=pic(a.img,'',DISH_W,DISH_H);
    }
    if(i!==0){m.style.opacity=0;m.style.visibility='hidden'}
    stageMedia.appendChild(m);
  });
}
var ticksWrap=$('#stageTicks');
if(ticksWrap){
  ACTS.forEach(function(a,i){
    var t=document.createElement('button');
    t.className='tick'+(i===0?' on':'');t.type='button';
    t.setAttribute('role','tab');t.setAttribute('aria-label',a.name);
    t.setAttribute('aria-selected',i===0?'true':'false');
    t.textContent=a.n;
    ticksWrap.appendChild(t);
  });
}
var cards=$('#dayCards');
if(cards){
  ACTS.forEach(function(a){
    var c=document.createElement('article');
    c.className='act-card'+(a.dark?' dark':'');
    c.style.background=a.bg;
    c.innerHTML=
     '<figure class="media" data-mrv>'+pic(a.img,a.name+' — '+a.dish,DISH_W,DISH_H)+'</figure>'+
     '<div class="ac-over"><span>'+a.n+' / 05</span><span>'+a.time+'</span></div>'+
     '<h3 class="ac-name">'+a.name+'</h3>'+
     '<p class="ac-dish">'+a.dish+'</p>'+
     '<p class="ac-note">'+a.note+'</p>';
    cards.appendChild(c);
  });
}

/* ============ SPLIT WORDS ============ */
function splitWords(el){
  function walk(node){
    Array.prototype.slice.call(node.childNodes).forEach(function(ch){
      if(ch.nodeType===3){
        var frag=document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(function(part){
          if(!part)return;
          if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return}
          var wm=document.createElement('span');wm.className='wm';
          var wi=document.createElement('span');wi.className='wi';wi.textContent=part;
          wm.appendChild(wi);frag.appendChild(wm);
        });
        node.replaceChild(frag,ch);
      }else if(ch.nodeType===1){walk(ch)}
    });
  }
  walk(el);
}

/* ============ MOTION BOOT (fails safe) ============ */
var lenis=null;
if(!reduced && window.gsap && window.ScrollTrigger){
  try{
    gsap.registerPlugin(ScrollTrigger);

    /* smooth scroll */
    if(window.Lenis){
      try{
        lenis=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}});
        lenis.on('scroll',ScrollTrigger.update);
        gsap.ticker.add(function(t){lenis.raf(t*1000)});
        gsap.ticker.lagSmoothing(0);
      }catch(e){lenis=null}
    }

    $$('[data-words]').forEach(splitWords);

    /* only animate elements that are actually rendered — a ScrollTrigger on a
       display:none node (e.g. the desktop-only stage or mobile-only day cards)
       creates a degenerate trigger that corrupts the refresh batch. */
    function shown(el){return !!(el && el.getClientRects().length)}

    /* hero intro */
    var heroTl=gsap.timeline({defaults:{ease:'power3.out'}});
    heroTl.fromTo('#heroMedia',{scale:1.07},{scale:1,duration:2.4,ease:'power2.out'},0)
      .to('.hero-kicker',{autoAlpha:1,y:0,duration:.9},.45)
      .to('.hl',{y:0,duration:1.15,ease:'expo.out',stagger:.055},.3)
      .to('.hero-sub',{autoAlpha:1,y:0,duration:.9},'-=.75')
      .to('.hero-foot',{autoAlpha:1,duration:1},'-=.5');

    /* hero scroll parallax */
    gsap.to('#heroContent',{yPercent:-26,autoAlpha:.25,ease:'none',
      scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('#heroMedia',{yPercent:13,ease:'none',
      scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});

    /* hero pointer drift — pointer devices only */
    if(fine){
      var cxTo=gsap.quickTo('#heroContent','x',{duration:.9,ease:'power3'}),
          cyTo=gsap.quickTo('#heroContent','y',{duration:.9,ease:'power3'}),
          mxTo=gsap.quickTo('#heroMedia','x',{duration:1.2,ease:'power3'}),
          myTo=gsap.quickTo('#heroMedia','y',{duration:1.2,ease:'power3'});
      var heroEl=$('#hero');
      heroEl.addEventListener('pointermove',function(e){
        if(H.classList.contains('menu-open'))return;
        var nx=e.clientX/window.innerWidth-.5, ny=e.clientY/window.innerHeight-.5;
        cxTo(nx*12);cyTo(ny*8);mxTo(nx*-7);myTo(ny*-5);
      },{passive:true});
      heroEl.addEventListener('pointerleave',function(){cxTo(0);cyTo(0);mxTo(0);myTo(0)});
    }

    /* word reveals — once */
    $$('[data-words]').forEach(function(el){
      if(!shown(el)){gsap.set(el.querySelectorAll('.wi'),{y:0});return}
      gsap.to(el.querySelectorAll('.wi'),{y:0,duration:1,ease:'expo.out',stagger:.032,
        scrollTrigger:{trigger:el,start:'top 86%',once:true}});
    });

    /* block reveals — once */
    $$('[data-rv]').forEach(function(el){
      if(!shown(el)){gsap.set(el,{autoAlpha:1,y:0});return}
      gsap.fromTo(el,{y:34,autoAlpha:0},{y:0,autoAlpha:1,duration:1.05,ease:'power3.out',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });

    /* media clip reveals + gentle parallax — once */
    $$('.media[data-mrv]').forEach(function(m){
      if(!shown(m)){m.style.clipPath='none';var h=m.querySelector('img,video');if(h)h.style.transform='none';return}
      var im=m.querySelector('img,video');
      var tl=gsap.timeline({scrollTrigger:{trigger:m,start:'top 88%',once:true}});
      tl.fromTo(m,{clipPath:'inset(12% 0% 12% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.25,ease:'power3.out'},0);
      if(im)tl.fromTo(im,{scale:1.14},{scale:1.045,duration:1.5,ease:'power3.out'},0);
    });
    $$('.media[data-plx]').forEach(function(m){
      if(!shown(m))return;
      var im=m.querySelector('img');if(!im)return;
      gsap.fromTo(im,{yPercent:-4.5},{yPercent:4.5,ease:'none',
        scrollTrigger:{trigger:m,start:'top bottom',end:'bottom top',scrub:true}});
    });

    /* ============ THE DAY — pinned stage (desktop only) ============ */
    var mm=gsap.matchMedia();
    mm.add('(min-width: 901px)',function(){
      var stage=$('#dayStage');
      var mediaEls=$$('.act-media',stage);
      var tickEls=$$('.tick',stage);
      var ghost=$('#actGhost');
      var N=ACTS.length,cur=0,swapTl=null;

      function playVid(i){
        mediaEls.forEach(function(m,j){
          var v=m.querySelector('video');if(!v)return;
          if(j===i){var p=v.play();if(p&&p.catch)p.catch(function(){})}
          else v.pause();
        });
      }
      function setAct(i,instant){
        if(i===cur&&!instant)return;
        var dir=i>cur?1:-1,prev=cur;cur=i;var a=ACTS[i];
        tickEls.forEach(function(t,j){t.classList.toggle('on',j===i);t.setAttribute('aria-selected',j===i?'true':'false')});
        stage.classList.toggle('is-dark',!!a.dark);
        gsap.to(stage,{backgroundColor:a.bg,duration:.85,ease:'power2.inOut',overwrite:'auto'});
        playVid(i);
        var inc=mediaEls[i];
        mediaEls.forEach(function(m,j){m.style.zIndex=(j===i)?3:(j===prev?2:1)});
        if(swapTl)swapTl.kill();
        if(instant){
          mediaEls.forEach(function(m,j){gsap.set(m,{autoAlpha:j===i?1:0,clipPath:'inset(0% 0% 0% 0%)',scale:1})});
        }else{
          swapTl=gsap.timeline();
          swapTl.set(inc,{autoAlpha:1},0)
            .fromTo(inc,{clipPath:dir>0?'inset(100% 0% 0% 0%)':'inset(0% 0% 100% 0%)',scale:1.12},
              {clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:.85,ease:'power3.inOut'},0)
            .add(function(){mediaEls.forEach(function(m,j){if(j!==i)gsap.set(m,{autoAlpha:0})})},.9);
        }
        /* text swap */
        var sw=$$('.stage-copy .sw');
        if(instant){applyText(a);gsap.set(sw,{y:0,autoAlpha:1});ghost.textContent=a.n;return}
        gsap.timeline()
          .to(sw,{y:-16,autoAlpha:0,duration:.28,ease:'power2.in',stagger:.028},0)
          .add(function(){applyText(a);ghost.textContent=a.n},.3)
          .fromTo(sw,{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.62,ease:'power3.out',stagger:.05},.36);
      }
      function applyText(a){
        $('#actIdx').textContent=a.n+' / 05';
        $('#actTime').textContent=a.time;
        $('#actName').textContent=a.name;
        $('#actDish').textContent=a.dish;
        $('#actNote').textContent=a.note;
      }
      setAct(0,true);

      var st=ScrollTrigger.create({
        trigger:stage,start:'top top',end:'+='+((N-1)*95)+'%',
        pin:true,anticipatePin:1,
        snap:{snapTo:1/(N-1),duration:{min:.2,max:.5},ease:'power2.inOut',delay:.06},
        onUpdate:function(self){
          var i=Math.round(self.progress*(N-1));
          if(i!==cur)setAct(i);
        },
        onLeave:function(){playVid(-1)},
        onLeaveBack:function(){playVid(-1)}
      });
      tickEls.forEach(function(t,j){
        t.addEventListener('click',function(){
          var y=st.start+(j/(N-1))*(st.end-st.start);
          if(lenis)lenis.scrollTo(y,{duration:1});else window.scrollTo(0,y);
        });
      });
      return function(){st.kill()};
    });

    /* refresh after images/fonts settle */
    window.addEventListener('load',function(){ScrollTrigger.refresh()});

    window.__motionReady=true;
  }catch(err){
    /* any motion failure: reveal everything, disable smoothing */
    H.classList.remove('anim');
    window.__motionReady=true;
  }
}else{
  /* reduced motion or libs unavailable: native behaviour, content visible */
  H.classList.remove('anim');
  window.__motionReady=true;
}

/* failsafe: if motion never signalled ready, reveal content */
setTimeout(function(){if(!window.__motionReady)H.classList.remove('anim')},4000);

/* ============ NAV (rAF-throttled) ============ */
(function(){
  var nav=$('#nav');if(!nav)return;
  var lastY=window.scrollY||0,ticking=false;
  function apply(){
    var y=window.scrollY||document.documentElement.scrollTop;
    nav.classList.toggle('scrolled',y>70);
    nav.classList.toggle('on-hero',y<=70);
    if(!H.classList.contains('menu-open')){
      if(y>140&&y>lastY+6)nav.classList.add('hide');
      else if(y<lastY-6||y<=140)nav.classList.remove('hide');
    }
    lastY=y;ticking=false;
  }
  window.addEventListener('scroll',function(){
    if(!ticking){ticking=true;requestAnimationFrame(apply)}
  },{passive:true});
  apply();
})();

/* ============ MOBILE MENU (focus-managed) ============ */
(function(){
  var burger=$('#burger'),mmenu=$('#mmenu'),main=$('#main'),foot=$('#foot');
  if(!burger||!mmenu)return;
  function open(){
    H.classList.add('menu-open');
    burger.setAttribute('aria-expanded','true');
    burger.setAttribute('aria-label','Close menu');
    mmenu.setAttribute('aria-hidden','false');mmenu.removeAttribute('inert');
    if(main)main.setAttribute('inert','');if(foot)foot.setAttribute('inert','');
    if(lenis)lenis.stop();
    var first=mmenu.querySelector('a');if(first)first.focus();
  }
  function close(returnFocus){
    if(!H.classList.contains('menu-open'))return;
    H.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Open menu');
    mmenu.setAttribute('aria-hidden','true');mmenu.setAttribute('inert','');
    if(main)main.removeAttribute('inert');if(foot)foot.removeAttribute('inert');
    if(lenis)lenis.start();
    if(returnFocus)burger.focus();
  }
  window.__closeMenu=close;
  burger.addEventListener('click',function(){
    if(H.classList.contains('menu-open'))close(true);else open();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&H.classList.contains('menu-open'))close(true);
  });
})();

/* ============ ANCHOR SCROLLING ============ */
$$('a[data-scroll]').forEach(function(a){
  a.addEventListener('click',function(e){
    var href=a.getAttribute('href');if(!href||href.charAt(0)!=='#')return;
    var el=document.getElementById(href.slice(1));if(!el)return;
    e.preventDefault();
    if(window.__closeMenu)window.__closeMenu(false);
    var focusTarget=function(){
      el.setAttribute('tabindex','-1');
      el.focus({preventScroll:true});
    };
    if(lenis){lenis.scrollTo(el,{duration:1.2,offset:0,onComplete:focusTarget})}
    else{el.scrollIntoView({behavior:reduced?'auto':'smooth'});setTimeout(focusTarget,reduced?0:600)}
  });
});

/* ============ HERO VIDEO — resilient loop ============ */
(function(){
  var v=$('#heroVideo'),poster=$('#heroPoster');if(!v)return;
  var conn=navigator.connection||navigator.webkitConnection;
  var saveData=!!(conn&&conn.saveData);
  var allow=!reduced&&!saveData;

  if(!allow){
    /* reduced-motion or data-saver: keep the still, never fetch the clip */
    try{v.pause();v.removeAttribute('autoplay');v.preload='none'}catch(e){}
    return;
  }

  var fading=false,started=false;
  function fadeTo(el,val,dur,cb){
    if(window.gsap){gsap.to(el,{autoAlpha:val,duration:dur,onComplete:cb})}
    else{el.style.opacity=val;if(cb)cb()}
  }
  v.addEventListener('playing',function(){
    if(!started){started=true;fadeTo(poster,0,.8)}
  });
  /* manual loop that dips through the poster so the cut is invisible */
  v.addEventListener('timeupdate',function(){
    if(!v.duration||fading)return;
    if(v.currentTime>v.duration-.55){
      fading=true;
      fadeTo(poster,1,.45,function(){
        try{v.currentTime=.03}catch(e){}
        var p=v.play();if(p&&p.catch)p.catch(function(){});
        setTimeout(function(){fadeTo(poster,0,.8,function(){fading=false})},180);
      });
    }
  });
  /* autoplay blocked or media error: the poster simply stays */
  v.addEventListener('error',function(){poster.style.opacity=1});
  function tryPlay(){var p=v.play();if(p&&p.catch)p.catch(function(){poster.style.opacity=1})}

  /* pause when off-screen or tab hidden */
  var visible=true;
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      en.forEach(function(entry){
        visible=entry.isIntersecting;
        if(visible&&!document.hidden)tryPlay();else v.pause();
      });
    },{threshold:.15});
    io.observe($('#hero'));
  }else{tryPlay()}
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)v.pause();else if(visible)tryPlay();
  });
  tryPlay();
})();

/* ============ RESERVATION ============ */
(function(){
  var form=$('#resForm');if(!form)return;
  var state={date:null,guests:2,table:null};
  var GUEST_MIN=2,GUEST_MAX=8,HEARTH_MAX=4;
  var submitting=false;

  var row=$('#dateRow');
  var fmtW=new Intl.DateTimeFormat('en-GB',{weekday:'short'});
  var fmtM=new Intl.DateTimeFormat('en-GB',{month:'short'});
  var fmtLong=new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long'});
  var today=new Date();

  /* ---- date pills ---- */
  var pills=[];
  for(var i=1;i<=21;i++){
    var d=new Date(today.getFullYear(),today.getMonth(),today.getDate()+i);
    var closed=(d.getDay()===1||d.getDay()===2); /* closed Mon & Tue */
    var b=document.createElement('button');
    b.type='button';b.className='d-pill';b.disabled=closed;
    b.setAttribute('role','radio');b.setAttribute('aria-checked','false');
    b.setAttribute('tabindex','-1');
    var label=fmtLong.format(d)+(closed?' — closed':'');
    b.setAttribute('aria-label',label);
    if(closed){b.setAttribute('aria-disabled','true');b.title='Closed'}
    b.innerHTML='<span class="dw">'+fmtW.format(d)+'</span><span class="dn">'+d.getDate()+'</span><span class="dm">'+fmtM.format(d)+'</span>';
    b._date=d;b._closed=closed;
    row.appendChild(b);pills.push(b);
  }
  var enabledPills=pills.filter(function(p){return !p._closed});
  if(enabledPills[0])enabledPills[0].setAttribute('tabindex','0');

  function selectDate(b){
    state.date=b._date;
    pills.forEach(function(x){
      var on=x===b;
      x.classList.toggle('sel',on);
      x.setAttribute('aria-checked',on?'true':'false');
      if(!x._closed)x.setAttribute('tabindex',on?'0':'-1');
    });
    b.setAttribute('tabindex','0');
    clearErr($('#fldDate'));
  }
  pills.forEach(function(b){
    if(b._closed)return;
    b.addEventListener('click',function(){selectDate(b);b.focus()});
  });
  /* roving arrow-key navigation */
  row.addEventListener('keydown',function(e){
    if(['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].indexOf(e.key)<0)return;
    var idx=enabledPills.indexOf(document.activeElement);
    if(idx<0)idx=enabledPills.indexOf(enabledPills.filter(function(p){return p.classList.contains('sel')})[0]);
    if(idx<0)idx=0;
    var ni=idx;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')ni=Math.min(enabledPills.length-1,idx+1);
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')ni=Math.max(0,idx-1);
    else if(e.key==='Home')ni=0;else if(e.key==='End')ni=enabledPills.length-1;
    e.preventDefault();
    var t=enabledPills[ni];if(t){selectDate(t);t.focus();t.scrollIntoView({block:'nearest',inline:'nearest'})}
  });

  /* ---- guests ---- */
  var gNum=$('#gNum'),gMinus=$('#gMinus'),gPlus=$('#gPlus'),gCap=$('#gCap');
  function guestMax(){return state.table==='The hearth counter'?HEARTH_MAX:GUEST_MAX}
  function renderGuests(){
    gNum.textContent=state.guests;
    gMinus.disabled=state.guests<=GUEST_MIN;
    gPlus.disabled=state.guests>=guestMax();
    gCap.textContent=state.table==='The hearth counter'?'The hearth counter seats up to four':'Tables of two to eight';
  }
  gMinus.addEventListener('click',function(){state.guests=Math.max(GUEST_MIN,state.guests-1);renderGuests()});
  gPlus.addEventListener('click',function(){state.guests=Math.min(guestMax(),state.guests+1);renderGuests()});
  renderGuests();

  /* ---- table cards ---- */
  var tCards=$$('.t-card');
  tCards.forEach(function(c,i){
    c.setAttribute('role','radio');c.setAttribute('aria-checked','false');
    c.setAttribute('tabindex',i===0?'0':'-1');
    c.addEventListener('click',function(){selectTable(c);c.focus()});
  });
  function selectTable(c){
    state.table=c.dataset.t;
    tCards.forEach(function(x){
      var on=x===c;
      x.classList.toggle('sel',on);
      x.setAttribute('aria-checked',on?'true':'false');
      x.setAttribute('tabindex',on?'0':'-1');
    });
    c.setAttribute('tabindex','0');
    if(state.guests>guestMax())state.guests=guestMax();
    renderGuests();
    clearErr($('#fldTable'));
  }
  $('#tCards').addEventListener('keydown',function(e){
    if(['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].indexOf(e.key)<0)return;
    var idx=tCards.indexOf(document.activeElement);if(idx<0)idx=0;
    var ni=idx;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')ni=Math.min(tCards.length-1,idx+1);
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')ni=Math.max(0,idx-1);
    else if(e.key==='Home')ni=0;else if(e.key==='End')ni=tCards.length-1;
    e.preventDefault();selectTable(tCards[ni]);tCards[ni].focus();
  });

  /* ---- inputs ---- */
  var inName=$('#inName'),inMail=$('#inMail');
  function clearErr(fld){if(fld){fld.classList.remove('err')}}
  [inName,inMail].forEach(function(inp){
    inp.addEventListener('input',function(){$('#fldWho').classList.remove('err');inp.removeAttribute('aria-invalid')});
  });

  /* ---- notice / loading helpers ---- */
  var note=$('#resNote'),submit=$('#resSubmit');
  function showNote(msg,isErr){
    note.innerHTML=msg;note.classList.toggle('is-err',!!isErr);note.classList.add('show');
  }
  function hideNote(){note.classList.remove('show','is-err');note.textContent=''}
  function setLoading(on){
    submitting=on;
    submit.disabled=on;
    if(on){submit.setAttribute('aria-busy','true');submit.innerHTML='<span class="spinner" aria-hidden="true"></span> Sending the request…'}
    else{submit.removeAttribute('aria-busy');submit.innerHTML='Request the table <span class="ar" aria-hidden="true">→</span>'}
  }

  function validate(){
    var bad=[];
    if(!state.date){$('#fldDate').classList.add('err');bad.push($('#fldDate'))}
    if(!state.table){$('#fldTable').classList.add('err');bad.push($('#fldTable'))}
    var nm=inName.value.trim(),ml=inMail.value.trim();
    var mailOk=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ml);
    if(!nm||!mailOk){
      $('#fldWho').classList.add('err');
      if(!nm)inName.setAttribute('aria-invalid','true');
      if(!mailOk)inMail.setAttribute('aria-invalid','true');
      bad.push($('#fldWho'));
    }
    return bad;
  }
  function focusFirstInvalid(bad){
    var f=bad[0];if(!f)return;
    if(f.id==='fldDate'){var p=enabledPills.filter(function(x){return x.getAttribute('tabindex')==='0'})[0]||enabledPills[0];if(p)p.focus()}
    else if(f.id==='fldTable'){tCards[0].focus()}
    else{(!inName.value.trim()?inName:inMail).focus()}
  }

  function buildPayload(){
    return {
      restaurant:'Levante',
      date:state.date?fmtLong.format(state.date):null,
      dateISO:state.date?state.date.toISOString().slice(0,10):null,
      guests:state.guests,
      table:state.table,
      seating:'13:30',
      name:inName.value.trim(),
      email:inMail.value.trim()
    };
  }

  function showSuccess(){
    $('#sumDate').textContent=fmtLong.format(state.date);
    $('#sumGuests').textContent=state.guests+(state.guests>1?' guests':' guest');
    $('#sumTable').textContent=state.table;
    var done=$('#resDone');
    if(window.gsap&&!reduced){
      gsap.to(form,{autoAlpha:0,y:-14,duration:.4,ease:'power2.in',onComplete:function(){
        form.style.display='none';done.style.display='flex';
        gsap.fromTo(done,{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.7,ease:'power3.out'});
        done.setAttribute('tabindex','-1');done.focus({preventScroll:true});
      }});
    }else{
      form.style.display='none';done.style.display='flex';
      done.setAttribute('tabindex','-1');done.focus({preventScroll:true});
    }
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(submitting)return;                 /* guard against duplicate submissions */
    hideNote();
    var bad=validate();
    if(bad.length){focusFirstInvalid(bad);return}

    var payload=buildPayload();

    /* No endpoint configured → be honest: do NOT fake a success. */
    if(!RESERVATION_ENDPOINT){
      showNote('<strong>Booking isn’t connected yet.</strong> Your request was validated but not sent — there is no reservation endpoint configured. Set <strong>RESERVATION_ENDPOINT</strong> in <em>assets/js/site.js</em> (Formspree, Resend or a custom API) to go live.',false);
      return;
    }

    setLoading(true);
    var ctrl=new AbortController();
    var to=setTimeout(function(){ctrl.abort()},15000);
    fetch(RESERVATION_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(payload),
      signal:ctrl.signal
    }).then(function(res){
      if(res.ok)return res;
      throw new Error('Request failed ('+res.status+')');
    }).then(function(){
      setLoading(false);showSuccess();
    }).catch(function(){
      setLoading(false);
      showNote('<strong>We couldn’t send your request.</strong> Please try again, or email <a class="lnk" href="mailto:reservations@levante.example">reservations@levante.example</a>.',true);
    }).finally(function(){clearTimeout(to)});
  });

  $('#amendBtn').addEventListener('click',function(){
    var done=$('#resDone');
    done.style.display='none';form.style.display='block';
    hideNote();
    if(window.gsap&&!reduced)gsap.fromTo(form,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.6,ease:'power3.out'});
    else{form.style.opacity=1}
    var p=enabledPills.filter(function(x){return x.getAttribute('tabindex')==='0'})[0]||enabledPills[0];
    if(p)p.focus();
  });
})();
})();
