// Dzik czyta — Bączek: кадры персонажа (img/baczek/*.webp), последовательности реакций, наряды, звуки (Web Audio).
(() => {
  const FRAMES = ["cloud1", "cloud2", "cloud3", "cloud4", "idle", "wave", "book", "happy1", "happy2", "happy3", "oops", "oops2", "proud0", "proud", "wow0", "wow", "suspicious", "sleep", "sleep2", "angry1", "angry2", "acc1", "acc2", "acc3", "acc4", "acc5", "acc6", "acc7"];
  const src = n => `img/baczek/${n}.webp`;
  const cache = {};
  function preload(names) { names.forEach(n => { if (!cache[n]) { const i = new Image(); i.src = src(n); cache[n] = i; } }); }

  // Наряды: открываются по сумме звёзд и серии дней (накопительно: каждый следующий включает предыдущие).
  const OUTFITS = [
    { id: "acc1", name: "szalik", how: "3 dni z rzędu", test: s => s.streak >= 3 },
    { id: "acc2", name: "okulary", how: "30 gwiazdek", test: s => s.stars >= 30 },
    { id: "acc3", name: "kokardka", how: "7 dni z rzędu", test: s => s.streak >= 7 },
    { id: "acc4", name: "plecak z książkami", how: "80 gwiazdek", test: s => s.stars >= 80 },
    { id: "acc5", name: "kalosze", how: "150 gwiazdek", test: s => s.stars >= 150 },
    { id: "acc6", name: "czapka", how: "14 dni z rzędu", test: s => s.streak >= 14 },
    { id: "acc7", name: "wianek mistrza", how: "300 gwiazdek", test: s => s.stars >= 300 }
  ];
  // Лучший наряд: самый высокий уровень, до которого все условия подряд выполнены.
  function outfit(stats) { let best = "idle"; for (const o of OUTFITS) { if (o.test(stats)) best = o.id; else break; } return best; }
  function opened(stats) { const out = []; for (const o of OUTFITS) { if (o.test(stats)) out.push(o.id); else break; } return out; }

  // ---------- звуки ----------
  let ctx = null, enabled = true;
  function audio() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function noiseBuf(c, sec) { const b = c.createBuffer(1, Math.floor(c.sampleRate * sec), c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
  const FARTS = {
    small: { f: 110, dur: .28, lfo: 30, vol: .25, slide: .7, noise: .25 },
    normal: { f: 95, dur: .5, lfo: 24, vol: .45, slide: .6, noise: .35 },
    big: { f: 75, dur: 1.1, lfo: 19, vol: .6, slide: .5, noise: .45 },
    squeak: { f: 180, dur: .4, lfo: 40, vol: .35, slide: 1.4, noise: .2 },
    double: { f: 100, dur: .22, lfo: 28, vol: .4, slide: .8, noise: .3, twice: true },
    long: { f: 85, dur: 1.6, lfo: 22, vol: .5, slide: .45, noise: .4 }
  };
  function fart(kind) {
    if (!enabled) return; const c = audio(); if (!c) return;
    const p = FARTS[kind] || FARTS.normal; const t0 = c.currentTime + .01;
    const play = t => {
      const master = c.createGain(); master.gain.value = 0; master.connect(c.destination);
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.Q.value = 2; lp.connect(master);
      const osc = c.createOscillator(); osc.type = "sawtooth"; osc.frequency.setValueAtTime(p.f, t); osc.frequency.exponentialRampToValueAtTime(p.f * p.slide, t + p.dur);
      const trem = c.createGain(); trem.gain.value = .5; osc.connect(trem); trem.connect(lp);
      const lfo = c.createOscillator(); lfo.type = "square"; lfo.frequency.setValueAtTime(p.lfo, t); lfo.frequency.linearRampToValueAtTime(p.lfo * .7, t + p.dur);
      const lfoG = c.createGain(); lfoG.gain.value = .5; lfo.connect(lfoG); lfoG.connect(trem.gain);
      const n = c.createBufferSource(); n.buffer = noiseBuf(c, p.dur + .1); const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 420; bp.Q.value = .8;
      const nG = c.createGain(); nG.gain.value = p.noise; n.connect(bp); bp.connect(nG); nG.connect(lp);
      master.gain.setValueAtTime(0, t); master.gain.linearRampToValueAtTime(p.vol, t + .03); master.gain.setValueAtTime(p.vol, t + p.dur * .7); master.gain.exponentialRampToValueAtTime(.001, t + p.dur);
      osc.start(t); lfo.start(t); n.start(t); osc.stop(t + p.dur + .05); lfo.stop(t + p.dur + .05); n.stop(t + p.dur + .05);
    };
    play(t0); if (p.twice) play(t0 + p.dur + .12);
  }
  function tone(freq, dur, type, vol, t) {
    const c = audio(); if (!c) return; t = t || c.currentTime;
    const o = c.createOscillator(); o.type = type || "sine"; o.frequency.value = freq;
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || .18, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .02);
  }
  const sfx = {
    ok() { if (!enabled) return; const c = audio(); if (!c) return; tone(660, .14, "sine", .12); tone(990, .22, "sine", .1, c.currentTime + .09); },
    tap() { if (!enabled) return; tone(520, .05, "triangle", .06); },
    star() { if (!enabled) return; const c = audio(); if (!c) return; [523, 659, 784, 1047].forEach((f, i) => tone(f, .25, "sine", .1, c.currentTime + i * .08)); }
  };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  // ---------- персонаж на странице ----------
  // mount(el): создаёт стопку кадров и обёртку движения. Реакции: play(el, name, fartKey).
  function mount(el, first) {
    el.classList.add("pig");
    el.innerHTML = `<img class="cloud" src="${src("cloud2")}" alt="" draggable="false"><div class="mv"></div><span class="zz" aria-hidden="true">Zzz</span>`;
    const cloudEl = el.querySelector(".cloud");
    const mv = el.querySelector(".mv"); const imgs = {};
    const get = n => { if (!imgs[n]) { const i = document.createElement("img"); i.src = src(n); i.alt = ""; i.className = "fr"; i.draggable = false; mv.appendChild(i); imgs[n] = i; } return imgs[n]; };
    let cur = null, timers = [];
    const show = n => { if (cur) imgs[cur].classList.remove("on"); get(n).classList.add("on"); cur = n; };
    const ANIMS = ["jump", "puff", "rock", "pop", "shake", "nod", "sleepy", "cloud-s", "cloud-m", "cloud-l", "cloud-x"];
    const CLOUD = { "cloud-s": "cloud1", "cloud-m": "cloud2", "cloud-l": "cloud3", "cloud-x": "cloud4" };
    const anim = cls => { el.classList.remove(...ANIMS); void el.offsetWidth; const c = cls.find(x => CLOUD[x]); if (c) cloudEl.src = src(CLOUD[c]); if (cls.length) el.classList.add(...cls); };
    const later = (ms, f) => timers.push(setTimeout(f, ms));
    const stop = () => { timers.forEach(clearTimeout); timers = []; };
    let lastKey = null;
    const api = {
      show, stop, current: () => cur,
      idle(frame) { stop(); show(frame || api.base); anim([]); },
      play(name, key) {
        stop(); const may = key && key !== lastKey; if (key) lastKey = key; const base = api.base;
        const F = may ? fart : () => {};
        const R = {
          wave() { show("wave"); anim(["rock"]); later(1600, () => show(base)); },
          happy() { show("happy1"); later(160, () => { show("happy2"); anim(["jump", may ? "cloud-m" : ""].filter(Boolean)); if (may) fart(pick(["normal", "double", "squeak"])); else sfx.ok(); }); later(760, () => show("happy3")); later(1500, () => show(base)); },
          oops() { show("oops"); anim(["rock", may ? "cloud-s" : ""].filter(Boolean)); F("small"); later(500, () => show("oops2")); later(1000, () => show("oops")); later(1500, () => show("oops2")); later(2600, () => show(base)); },
          proud() { show("proud0"); anim([]); later(600, () => { show("proud"); anim(["puff", may ? (Math.random() < .5 ? "cloud-l" : "cloud-x") : ""].filter(Boolean)); if (may) fart(pick(["big", "long"])); else sfx.star(); }); later(3400, () => show(base)); },
          wow() { show("wow0"); later(140, () => { show("wow"); anim(["pop", may ? "cloud-x" : ""].filter(Boolean)); F("squeak"); }); later(2400, () => show(base)); },
          suspicious() { show("suspicious"); anim(["nod"]); },
          angry() { show("angry1"); anim(["nod"]); later(1200, () => { show("angry2"); anim(["shake"]); }); later(1700, () => show("angry1")); later(2300, () => { show("angry2"); anim(["shake"]); }); later(2800, () => { show("angry1"); anim(["nod"]); }); },
          sleep() { show("sleep"); anim([]); later(1400, () => { show("sleep2"); anim(["sleepy", "nod"]); }); },
          book() { show("book"); anim(["nod"]); },
          smile() { show("happy3"); anim([]); later(1800, () => show(base)); }
        };
        (R[name] || R.wave)();
      },
      base: "idle",
      resetFart() { lastKey = null; }
    };
    show(first || "idle");
    return api;
  }

  window.BACZEK = {
    FRAMES, OUTFITS, outfit, opened, preload, mount, fart, sfx,
    setSound(on) { enabled = !!on; if (on) audio(); },
    soundOn: () => enabled,
    scale: stats => 0.85 + Math.min(0.3, (stats.stars || 0) / 1000)
  };
})();
