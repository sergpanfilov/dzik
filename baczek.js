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
  const pick = a => a[Math.floor(Math.random() * a.length)];
  let ctx = null, enabled = true;
  function audio() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function noiseBuf(c, sec) { const b = c.createBuffer(1, Math.floor(c.sampleRate * sec), c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
  // Пук: синтез по сэмплам. Серия «хлопков» (затухающие синусоиды с резонансом 80–500 Гц) с дрожащей частотой
  // повторения 18–75 Гц, низкий гул и немного дыхания; затем мягкий фильтр и лёгкое насыщение.
  const FARTS = {
    small:  { dur: .22, rate: [48, 60], res: [200, 260], decay: 40, rumble: .1, breath: .25, vol: .5, slide: .9 },
    normal: { dur: .55, rate: [26, 36], res: [120, 160], decay: 28, rumble: .25, breath: .2, vol: .8, slide: .75 },
    big:    { dur: 1.2, rate: [18, 28], res: [85, 120],  decay: 20, rumble: .4, breath: .25, vol: 1,  slide: .6 },
    squeak: { dur: .4,  rate: [55, 75], res: [320, 520], decay: 60, rumble: .05, breath: .15, vol: .55, slide: 1.5 },
    double: { dur: .28, rate: [30, 40], res: [130, 170], decay: 30, rumble: .2, breath: .2, vol: .75, slide: .8, twice: true },
    long:   { dur: 1.7, rate: [20, 34], res: [95, 140],  decay: 24, rumble: .35, breath: .3, vol: .9, slide: .55, wobble: true }
  };
  const rnd = (a, b) => a + Math.random() * (b - a);
  function fartBuffer(c, p) {
    const sr = c.sampleRate, n = Math.floor(sr * (p.dur + .15)), d = new Float32Array(n);
    const env = t => { const a = Math.min(1, t / .02); const r = t > p.dur ? Math.max(0, 1 - (t - p.dur) / .12) : 1; const w = p.wobble ? .75 + .25 * Math.sin(t * 9) : 1; return a * r * w * (t < p.dur * .8 ? 1 : 1 - (t - p.dur * .8) / (p.dur * .2) * .5); };
    let t = 0; const rate0 = rnd(p.rate[0], p.rate[1]), res0 = rnd(p.res[0], p.res[1]);
    while (t < p.dur) {
      const prog = t / p.dur; const rate = rate0 * (1 - .25 * prog) * rnd(.85, 1.15); const period = 1 / rate;
      const res = res0 * (1 + (p.slide - 1) * prog) * rnd(.93, 1.07); const amp = env(t) * rnd(.6, 1);
      const i0 = Math.floor(t * sr), len = Math.floor(period * sr * 1.3);
      for (let i = 0; i < len && i0 + i < n; i++) { const s = i / sr; d[i0 + i] += amp * Math.sin(2 * Math.PI * res * s) * Math.exp(-s * p.decay * 5); }
      t += period;
    }
    let lp = 0, lp2 = 0;
    for (let i = 0; i < n; i++) {
      const tt = i / sr, e = env(tt);
      const rum = p.rumble * e * Math.sin(2 * Math.PI * (62 + 6 * Math.sin(tt * 7)) * tt);
      const nz = Math.random() * 2 - 1; lp += (nz - lp) * .08; lp2 += (lp - lp2) * .08;
      let v = d[i] + rum + p.breath * e * lp2 * 3;
      d[i] = Math.tanh(v * 1.6) * .8 * p.vol;
    }
    const b = c.createBuffer(1, n, sr); b.getChannelData(0).set(d); return b;
  }
  function fartSynth(kind) {
    if (!enabled) return; const c = audio(); if (!c) return;
    const p = FARTS[kind] || FARTS.normal;
    const play = t => {
      const src = c.createBufferSource(); src.buffer = fartBuffer(c, p);
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 650; lp.Q.value = 1.2;
      const g = c.createGain(); g.gain.value = .9;
      src.connect(lp); lp.connect(g); g.connect(c.destination); src.start(t);
    };
    play(c.currentTime + .01); if (p.twice) play(c.currentTime + .01 + p.dur + .1);
  }
  // Настоящие записи: snd/fNN.mp3 (Yle Arkisto, Freesound 425594, CC BY 3.0). Синтез — запасной вариант, если файлы не загрузились.
  const SND = { small: ["f39", "f54", "f18", "f24"], normal: ["f23", "f04", "f53", "f01", "f09"], big: ["f58", "f20", "f50", "f16"], long: ["f31", "f45", "f36"], squeak: ["f44", "f10", "f34"], double: ["f39", "f54", "f18"],
    // голос: хрюканье (Mudchute City Farm, CC BY-SA 3.0; Erdie, CC BY 3.0) и визг (морская свинка, public domain)
    oink: ["oink1", "oink2", "oink3"], grunt: ["grunt"], squeal: ["gp_happy_0", "gp_happy_1", "gp_wheek_0", "gp_wheek_1", "gp_chirp_0"] };
  const bufs = {};
  async function loadSnd(n) {
    if (bufs[n] !== undefined) return bufs[n]; bufs[n] = null;
    try { const c = audio(); const r = await fetch("snd/" + n + ".mp3"); if (!r.ok) throw 0; bufs[n] = await c.decodeAudioData(await r.arrayBuffer()); } catch (e) { bufs[n] = null; }
    return bufs[n];
  }
  function preloadSounds() { Object.values(SND).flat().forEach(loadSnd); }
  function fart(kind) {
    if (!enabled) return; const c = audio(); if (!c) return;
    const names = SND[kind] || SND.normal; const n = pick(names);
    const playBuf = (b, t) => { const s = c.createBufferSource(); s.buffer = b; const g = c.createGain(); g.gain.value = .9; s.connect(g); g.connect(c.destination); s.start(t); };
    loadSnd(n).then(b => {
      if (!b) return fartSynth(kind);
      playBuf(b, c.currentTime + .01);
      if (kind === "double") loadSnd(pick(names)).then(b2 => b2 && playBuf(b2, c.currentTime + b.duration + .08));
    });
  }
  // Голос: хрюканье и визг (файлы; без них — тишина).
  function voice(kind, vol) {
    if (!enabled) return; const c = audio(); if (!c) return; const n = pick(SND[kind] || SND.oink);
    loadSnd(n).then(b => { if (!b) return; const s = c.createBufferSource(); s.buffer = b; const g = c.createGain(); g.gain.value = vol || .7; s.connect(g); g.connect(c.destination); s.start(c.currentTime + .01); });
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
          wave() { show("wave"); anim(["rock"]); voice("oink", .6); later(1600, () => show(base)); },
          happy() { show("happy1"); voice("squeal", .6); later(160, () => { show("happy2"); anim(["jump", may ? "cloud-m" : ""].filter(Boolean)); if (may) fart(pick(["normal", "double", "squeak"])); else sfx.ok(); }); later(760, () => show("happy3")); later(1500, () => show(base)); },
          oops() { show("oops"); anim(["rock", may ? "cloud-s" : ""].filter(Boolean)); F("small"); later(500, () => show("oops2")); later(1000, () => show("oops")); later(1500, () => show("oops2")); later(2600, () => show(base)); },
          proud() { show("proud0"); anim([]); voice("grunt", .7); later(600, () => { show("proud"); anim(["puff", may ? (Math.random() < .5 ? "cloud-l" : "cloud-x") : ""].filter(Boolean)); if (may) fart(pick(["big", "long"])); else sfx.star(); }); later(3400, () => show(base)); },
          wow() { show("wow0"); voice("squeal", .5); later(140, () => { show("wow"); anim(["pop", may ? "cloud-x" : ""].filter(Boolean)); F("squeak"); }); later(2400, () => show(base)); },
          suspicious() { show("suspicious"); anim(["nod"]); },
          angry() { show("angry1"); anim(["nod"]); later(1200, () => { show("angry2"); anim(["shake"]); }); later(1700, () => show("angry1")); later(2300, () => { show("angry2"); anim(["shake"]); }); later(2800, () => { show("angry1"); anim(["nod"]); }); },
          sleep() { show("sleep"); anim([]); later(1400, () => { show("sleep2"); anim(["sleepy", "nod"]); }); },
          book() { show("book"); anim(["nod"]); },
          smile() { show("happy3"); anim([]); voice("oink", .4); later(1800, () => show(base)); }
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
    FRAMES, OUTFITS, outfit, opened, preload, mount, fart, voice, sfx,
    setSound(on) { enabled = !!on; if (on) { audio(); preloadSounds(); } },
    soundOn: () => enabled,
    scale: stats => 0.85 + Math.min(0.3, (stats.stars || 0) / 1000)
  };
})();
