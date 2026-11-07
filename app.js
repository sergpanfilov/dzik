// Dzik czyta — тренажёр осознанного чтения. Вход, ежедневная сессия из шагов, звёзды, уровни, свободная тренировка.
(() => {
  const C = window.DZIK_CONFIG, B = window.BACZEK, TEXTS = window.DZIK_TEXTS, COMMAS = window.DZIK_COMMAS, FLASH = window.DZIK_FLASH, FACTS = window.DZIK_FACTS;
  const DEMO = !!window.DZIK_DEMO || /[?&]demo/.test(location.search);
  const sb = !DEMO && window.supabase && C ? window.supabase.createClient(C.supabaseUrl, C.supabaseKey) : null;
  const $ = id => document.getElementById(id);
  const stage = $("stage");
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const dayKey = d => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
  const todayKey = () => dayKey(Date.now());
  const addDays = (k, n) => { const [y, m, d] = k.split("-").map(Number); return dayKey(new Date(y, m - 1, d + n)); };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const seeded = s => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const words = s => s.split(/\s+/).filter(w => /[\p{L}\d]/u.test(w));
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

  // ---------- тексты интерфейса (польский) ----------
  const STEPS = [["pick", "Tekst"], ["schulte", "Rozgrzewka"], ["read", "Czytanie"], ["quiz", "Pytania"], ["lead", "Znaki stop"], ["marks", "Postaw znak"], ["comma", "Przecinek"], ["order", "Kolejność"], ["flash", "Błysk słów"], ["done", "Koniec"]];
  const TYPE_PL = { fakt: "fakt", "szczegół": "szczegół", dlaczego: "dlaczego", "słowo": "słowo", znak: "znak" };

  // ---------- состояние ----------
  let user = null, role = null, nick = null, studentEmail = null;
  let sessions = [];      // все сессии ученицы (daily + free), по времени
  let settings = {};      // dzik_settings
  let cur = null;         // текущая сессия (строка) — daily или free
  let pig = null, miniPig = null;
  let readTimer = null, leadTimer = null, schulteTimer = null;

  // ---------- хранилище (Supabase или демо) ----------
  const demoKey = "dzik-demo";
  const db = {
    async loadAll() {
      if (DEMO) { const d = store.get(demoKey, { sessions: [], settings: {} }); sessions = d.sessions; settings = d.settings || {}; return; }
      const r = await sb.from("dzik_sessions").select("*").eq("email", studentEmail).order("created_at").limit(5000);
      sessions = r.error ? [] : r.data;
      const s = await sb.from("dzik_settings").select("*").eq("email", studentEmail).maybeSingle();
      settings = s.data || {};
    },
    async save(row) {
      row.updated_at = new Date().toISOString();
      if (DEMO) {
        const i = sessions.findIndex(s => s.day === row.day); if (i >= 0) sessions[i] = row; else sessions.push(row);
        store.set(demoKey, { sessions, settings }); return "ok";
      }
      const { id, user_id, email, created_at, ...ins } = row;
      const r = await sb.from("dzik_sessions").upsert({ ...ins, email: studentEmail }, { onConflict: "user_id,day" }).select().maybeSingle();
      if (r.error) { console.warn(r.error); setSaved("Nie udało się zapisać. Sprawdź internet."); return "err"; }
      if (r.data) { Object.assign(row, r.data); const i = sessions.findIndex(s => s.day === row.day); if (i >= 0) sessions[i] = row; else sessions.push(row); }
      setSaved("Zapisano ✓"); return "ok";
    }
  };
  function setSaved(t) { const el = document.querySelector(".saved"); if (el) el.textContent = t; }

  // ---------- вычисления: уровень, серия, звёзды ----------
  const daily = () => sessions.filter(s => s.mode === "daily");
  const doneDaily = () => daily().filter(s => s.done);
  const maxLevel = () => Math.max(...TEXTS.map(t => t.level));
  function levelNow() {
    let lvl = 1, up = 0, down = 0, from = null;
    if (settings.level_override) { lvl = settings.level_override; from = settings.level_override_at; }
    for (const s of doneDaily()) {
      if (from && s.updated_at && s.updated_at < from) continue;
      const c = s.comp == null ? 0 : s.comp;
      if (c >= 80) { up++; down = 0; } else if (c < 50) { down++; up = 0; } else { up = 0; down = 0; }
      if (up >= 3) { lvl = Math.min(maxLevel(), lvl + 1); up = 0; }
      if (down >= 2) { lvl = Math.max(1, lvl - 1); down = 0; }
    }
    return lvl;
  }
  // Серия дней: один пропуск в неделю не обнуляет («dzik odpoczywa»).
  function streak() {
    const days = new Set(doneDaily().map(s => s.day)); let k = todayKey(); let n = 0, rests = [];
    if (!days.has(k)) k = addDays(k, -1);
    while (true) {
      if (days.has(k)) { n++; k = addDays(k, -1); continue; }
      const recent = rests.filter(r => r > addDays(k, -7)).length;
      if (recent >= 1 || n === 0) break;
      rests.push(k); k = addDays(k, -1);
    }
    return { n, rests };
  }
  const totalStars = () => doneDaily().reduce((a, s) => a + (s.stars || 0), 0);
  const stats = () => ({ stars: totalStars(), streak: streak().n });
  const daysSince = () => { const d = doneDaily(); if (!d.length) return null; const last = d[d.length - 1].day; let n = 0, k = todayKey(); while (k > last && n < 60) { k = addDays(k, -1); n++; } return n; };
  function avgWpm() { const xs = doneDaily().filter(s => s.wpm && !s.too_fast).slice(-10); return xs.length ? Math.round(xs.reduce((a, s) => a + s.wpm, 0) / xs.length) : null; }
  function medianWpm() { const xs = doneDaily().filter(s => s.wpm).map(s => s.wpm).sort((a, b) => a - b); return xs.length ? xs[Math.floor(xs.length / 2)] : null; }

  // ---------- выбор текста дня ----------
  const textById = id => TEXTS.find(t => t.id === id) || (window.DZIK_CUSTOM || []).find(t => t.id === id);
  function candidates(level, day) {
    const read = new Set(doneDaily().map(s => s.text_id));
    let pool = TEXTS.filter(t => t.level === level && !read.has(t.id));
    if (!pool.length) pool = TEXTS.filter(t => t.level === level);
    if (pool.length < 2) pool = pool.concat(TEXTS.filter(t => Math.abs(t.level - level) === 1 && !read.has(t.id)));
    const rnd = seeded(studentEmail + day); const arr = pool.slice().sort(() => rnd() - .5);
    const out = [arr[0]]; const other = arr.find(t => t.topic !== arr[0].topic) || arr[1]; if (other) out.push(other);
    return out;
  }

  // ---------- рендер общих частей ----------
  function render(html) { stage.innerHTML = html; window.scrollTo({ top: 0 }); }
  function say(text, sub) { $("bubble").innerHTML = esc(text) + (sub ? `<small>${esc(sub)}</small>` : ""); }
  function stepsBar(step) {
    const i = STEPS.findIndex(s => s[0] === step);
    return `<div class="steps">` + STEPS.slice(1, -1).map((s, j) => `<span class="step ${j + 1 < i ? "done" : j + 1 === i ? "cur" : ""}">${j + 1 < i ? "✓ " : ""}${s[1]}</span>`).join("") + `</div>`;
  }
  function renderAuth() {
    $("loginBtn").hidden = !!user || !sb; $("logoutBtn").hidden = !user;
    $("who").hidden = !user; $("who").textContent = user ? (nick || "") : "";
  }
  function applyFont() { document.documentElement.style.setProperty("--read-size", store.get("dzik-font", 24) + "px"); }
  function applyTheme() { const t = store.get("dzik-theme", null); if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); $("themeBtn").textContent = (t || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark" ? "☾" : "☀"; }
  function applySound() { const on = store.get("dzik-sound", settings.sound_on !== false); B.setSound(on); $("soundBtn").textContent = on ? "♪" : "♪̸"; $("soundBtn").classList.toggle("off", !on); $("soundBtn").setAttribute("aria-pressed", on); }

  // ---------- ДОМ ----------
  function greeting() {
    const away = daysSince(); const h = new Date().getHours();
    if (away !== null && away >= 3) return { r: "angry", t: `${away} dni bez czytania?! Czekałem i czekałem.`, s: "Ale już jesteś. Chodź, poczytamy." };
    if (cur && !cur.done) return { r: "wave", t: "Mamy zaczętą sesję. Dokończymy?", s: "Zacząłem czekać na tym samym miejscu." };
    if (cur && cur.done) return { r: "book", t: "Dzisiejsza sesja zrobiona. Jestem dumny!", s: "Jutro nowa historia. Możesz jeszcze poćwiczyć w wolnym treningu." };
    const st = streak().n;
    if (st >= 3) return { r: "wave", t: `Cześć${nick ? ", " + nick : ""}! Już ${st} dni z rzędu.`, s: "Dziś czeka nowa historia." };
    return { r: "wave", t: h < 12 ? "Dzień dobry! Co dziś czytamy?" : "Cześć! Co dziś czytamy?", s: "Jedna sesja to około 12 minut." };
  }
  function home() {
    const st = stats(); const lvl = levelNow(); const sk = streak();
    const todayDone = cur && cur.done, started = cur && !cur.done && cur.step && cur.step !== "pick";
    const outfit = B.outfit(st); pig.base = outfit; const g = greeting(); pig.play(g.r, null); say(g.t, g.s);
    const days = []; for (let i = 13; i >= 0; i--) { const k = addDays(todayKey(), -i); const on = doneDaily().some(s => s.day === k); days.push(`<i class="${on ? "on" : sk.rests.includes(k) ? "rest" : ""} ${k === todayKey() ? "today" : ""}" title="${k}"></i>`); }
    const acc = B.OUTFITS.map(o => `<span class="acc-chip ${B.opened(st).includes(o.id) ? "on" : ""}" title="${o.how}">${o.name}${B.opened(st).includes(o.id) ? "" : " · " + o.how}</span>`).join("");
    const read = doneDaily().slice().reverse();
    const stories = read.length ? read.slice(0, 12).map(s => { const t = textById(s.text_id); return t ? `<button class="story" data-free="${t.id}"><span class="t">${esc(t.title)}</span><span class="st">poziom ${t.level} · <b>${"★".repeat(s.stars || 0)}</b> ${s.stars || 0}/10</span></button>` : ""; }).join("") : `<p class="muted small">Tu pojawią się przeczytane historie.</p>`;
    render(`
      <section class="card hero">
        <div style="display:flex;flex-direction:column;gap:12px;min-width:0">
          <h2>${todayDone ? "Na dziś gotowe!" : started ? "Dokończ dzisiejszą sesję" : "Dzisiejszy trening"}</h2>
          <div class="stats-row">
            <div class="stat"><b class="star">${st.stars}</b><span>gwiazdek</span></div>
            <div class="stat"><b>${sk.n}</b><span>dni z rzędu</span></div>
            <div class="stat"><b>${lvl}</b><span>poziom</span></div>
          </div>
          <div class="trail" aria-label="Ostatnie 14 dni">${days.join("")}</div>
          ${cur && !cur.done && cur.step ? stepsBar(cur.step) : ""}
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:stretch">
          <button class="go" id="goBtn">${todayDone ? "Wolny trening" : started ? "Kontynuuj" : "Trenuj z dzikiem"}</button>
          ${todayDone ? "" : `<button class="ghost" id="freeBtn">Wolny trening</button>`}
        </div>
      </section>
      <section class="card">
        <div class="sec-h"><h3>Bączek i jego rzeczy</h3><span class="muted small">za gwiazdki i dni z rzędu</span></div>
        <div class="acc-list">${acc}</div>
      </section>
      <section class="card">
        <div class="sec-h"><h3>Moje historie</h3>${role === "viewer" ? `<a class="small muted" href="rodzice.html">Strona rodzica →</a>` : ""}</div>
        <div class="stories">${stories}</div>
      </section>
      <p class="saved"></p>`);
    $("goBtn").addEventListener("click", () => { if (todayDone) freeMenu(); else startDaily(); });
    if ($("freeBtn")) $("freeBtn").addEventListener("click", freeMenu);
    stage.querySelectorAll("[data-free]").forEach(b => b.addEventListener("click", () => freeMenu(b.dataset.free)));
  }

  // ---------- СЕССИЯ ----------
  async function startDaily() {
    if (!cur || cur.done) {
      if (cur && cur.done) return freeMenu();
      cur = { day: todayKey(), mode: "daily", level: levelNow(), step: "pick", done: false, state: {} };
    }
    goStep(cur.step || "pick");
  }
  async function setStep(step, patch) {
    cur.step = step; if (patch) Object.assign(cur.state, patch);
    await db.save(cur);
    goStep(step);
  }
  function goStep(step) {
    clearInterval(readTimer); clearInterval(leadTimer); clearInterval(schulteTimer);
    pig.base = "idle"; pig.idle();
    const fn = { pick, schulte, read, quiz, lead, marks, comma, order, flash, done: finish }[step];
    if (fn) fn(); else home();
  }
  const text = () => textById(cur.text_id);
  const isFree = () => cur.mode === "free";
  // следующий шаг в ежедневной сессии; в свободной тренировке — только выбранный модуль
  function next(after) {
    if (isFree()) return finishFree();
    const flashOn = settings.flash_on !== false && (doneDaily().length % 2 === 1 || (cur.state.quiz && cur.state.quiz.pct >= 80));
    const chain = ["pick", "schulte", "read", "quiz", "lead", "marks", "comma", "order", flashOn ? "flash" : null, "done"].filter(Boolean);
    return chain[chain.indexOf(after) + 1];
  }

  // выбор текста дня
  function pick() {
    const lvl = cur.level || levelNow(); const opts = candidates(lvl, cur.day);
    say("Którą historię dziś czytamy?", "Wybierz jedną. Druga poczeka na inny dzień.");
    render(`<section class="card">${stepsBar("pick")}<h2>Poziom ${lvl}</h2><div class="choices">${opts.map(t => `<button class="choice" data-id="${t.id}"><span class="t">${esc(t.title)}</span><span class="m">${words(t.body).length} słów · ${esc(t.topic)}</span></button>`).join("")}</div></section>`);
    stage.querySelectorAll(".choice").forEach(b => b.addEventListener("click", () => { B.sfx.tap(); cur.text_id = b.dataset.id; cur.level = lvl; setStep(next("pick")); }));
  }

  // модуль 1: Шульте
  function schulte() {
    const lvl = cur.level || 1; const letters = lvl >= 3 && Math.random() < .5; const twoColor = lvl >= 5 && Math.random() < .5;
    const L = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZ".slice(0, 25).split("");
    const items = letters ? L : Array.from({ length: 25 }, (_, i) => i + 1);
    const cells = shuffle(items.map((v, i) => ({ v, i })));
    let k = 0, errors = 0, t0 = 0, started = false;
    say(letters ? "Rozgrzewka: klikaj litery po kolei, A, Ą, B..." : "Rozgrzewka: klikaj liczby od 1 do 25.", "Patrz na kropkę w środku, szukaj wzrokiem, nie kręć głową.");
    render(`<section class="card schulte-wrap">${stepsBar("schulte")}<div class="row sp" style="width:100%"><span class="timer" id="tm">0.0 s</span><span class="muted small">pomyłki: <b id="er">0</b></span></div>
      <div class="schulte" id="grid">${cells.map(c => `<button data-i="${c.i}">${c.v}</button>`).join("")}</div>
      <button class="go" id="skip" hidden>Dalej</button></section>`);
    const tick = () => { $("tm").textContent = ((performance.now() - t0) / 1000).toFixed(1) + " s"; };
    stage.querySelectorAll("#grid button").forEach(b => b.addEventListener("click", () => {
      if (!started) { started = true; t0 = performance.now(); schulteTimer = setInterval(tick, 100); }
      if (+b.dataset.i === k) { b.classList.add("hit"); k++; B.sfx.tap(); if (k === 25) finishS(); }
      else { errors++; $("er").textContent = errors; b.classList.add("miss"); setTimeout(() => b.classList.remove("miss"), 300); }
    }));
    setTimeout(() => { if (k < 25) { $("skip").hidden = false; } }, 90000);
    $("skip").addEventListener("click", finishS);
    function finishS() {
      clearInterval(schulteTimer); const sec = started ? Math.round((performance.now() - t0) / 10) / 100 : 0;
      const best = daily().reduce((m, s) => s.state && s.state.schulte && s.state.schulte.sec && s.state.schulte.done ? Math.min(m, s.state.schulte.sec) : m, Infinity);
      const rec = k === 25 && sec < best;
      pig.play(rec ? "wow" : "smile", "schulte"); say(rec ? `Nowy rekord: ${sec} s!` : `${sec} s, pomyłek: ${errors}.`, "Oczy rozgrzane. Teraz tekst.");
      stage.querySelectorAll("#grid button").forEach(b => b.disabled = true);
      const go = $("skip"); go.hidden = false; go.textContent = "Dalej"; go.replaceWith(go.cloneNode(true));
      $("skip").addEventListener("click", () => setStep(next("schulte"), { schulte: { sec, errors, done: k === 25, letters } }));
    }
  }

  // модуль 2: чтение на время
  function read() {
    const t = text(); const n = words(t.body).length; let t0 = 0, acc = 0, running = false;
    say("Przeczytaj uważnie, w swoim tempie.", "Zwracaj uwagę na kropki i przecinki: to miejsca na oddech.");
    render(`<section class="card">${stepsBar("read")}<div class="text-head"><h2>${esc(t.title)}</h2><span class="muted small">${n} słów · poziom ${t.level}</span></div>
      <div class="reading blur" id="rd">${esc(t.body)}</div>
      <div class="btns"><button class="go" id="startBtn">Start</button><button class="go warm" id="doneBtn" hidden>Przeczytałam</button><span class="timer muted" id="tm" hidden>0:00</span></div></section>`);
    $("startBtn").addEventListener("click", () => { $("rd").classList.remove("blur"); $("startBtn").hidden = true; $("doneBtn").hidden = false; $("tm").hidden = false; t0 = performance.now(); running = true;
      readTimer = setInterval(() => { const s = Math.floor((acc + performance.now() - t0) / 1000); $("tm").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 500); });
    $("doneBtn").addEventListener("click", () => {
      acc += performance.now() - t0; running = false; clearInterval(readTimer);
      const sec = Math.max(1, Math.round(acc / 1000)); const wpm = Math.round(n / (sec / 60));
      const thr = settings.fast_wpm || 400; const r = cur.state.read || {};
      if (thr && wpm > thr && !r.asked) {
        cur.state.read = { asked: true, sec, wpm }; pig.play("suspicious"); say("Czy na pewno wszystko przeczytałaś?", `${wpm} słów na minutę to bardzo szybko.`);
        $("rd").classList.add("blur");
        stage.querySelector(".btns").innerHTML = `<button class="ghost" id="yes">Tak, wszystko</button><button class="go" id="again">Przeczytam jeszcze raz</button>`;
        $("yes").addEventListener("click", () => setStep(next("read"), { read: { sec, wpm, tooFast: true, asked: true } }));
        $("again").addEventListener("click", () => { $("rd").classList.remove("blur"); stage.querySelector(".btns").innerHTML = `<button class="go warm" id="doneBtn2">Przeczytałam</button>`; t0 = performance.now(); running = true;
          $("doneBtn2").addEventListener("click", () => { acc += performance.now() - t0; const sec2 = Math.round(acc / 1000); setStep(next("read"), { read: { sec: sec2, wpm: Math.round(n / (sec2 / 60)), tooFast: true, reread: true, asked: true } }); }); });
        return;
      }
      pig.play("smile"); setStep(next("read"), { read: { sec, wpm, tooFast: !!(thr && wpm > thr), asked: !!r.asked } });
    });
  }

  // модуль 2: вопросы
  function quiz() {
    const t = text(); const q = cur.state.quiz || { answers: [] }; cur.state.quiz = q;
    const i = q.answers.length;
    if (i >= t.questions.length) return quizDone();
    const Q = t.questions[i]; const opts = shuffle(Q.a.map((a, k) => ({ a, k }))); let peeked = false, answered = false;
    say(i === 0 ? "Teraz pytania. Tekst jest schowany." : ["Następne.", "Dalej!", "Jeszcze jedno.", "Ostatnie?"][i % 4], "Możesz raz podejrzeć tekst, ale wtedy pół gwiazdki.");
    render(`<section class="card">${stepsBar("quiz")}<div class="progress">${t.questions.map((_, k) => `<i class="${k < i ? (q.answers[k].ok ? (q.answers[k].peek ? "half" : "on") : "bad") : ""}"></i>`).join("")}</div>
      <p class="muted small">Pytanie ${i + 1} z ${t.questions.length} · ${TYPE_PL[Q.type] || Q.type}</p>
      <p class="quiz-q">${esc(Q.q)}</p>
      <div class="peek-box" id="peek" hidden><div class="reading" style="font-size:calc(var(--read-size)*.75)">${esc(t.body)}</div></div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${o.k}"><span class="k">${"ABC"[k]}</span><span>${esc(o.a)}</span></button>`).join("")}</div>
      <div class="btns sp"><button class="ghost peek" id="peekBtn">Podejrzyj tekst (raz)</button><button class="go" id="nextBtn" hidden>Dalej</button></div></section>`);
    $("peekBtn").addEventListener("click", () => { peeked = true; $("peek").hidden = false; $("peekBtn").disabled = true; $("peekBtn").textContent = "Podejrzane: pół gwiazdki"; });
    stage.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      if (answered) return; answered = true; const ok = b.dataset.k === "0";
      stage.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.dataset.k === "0") x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      q.answers.push({ i, type: Q.type, ok, peek: peeked, chosen: +b.dataset.k });
      if (ok) { pig.play("happy", "quiz"); say(peeked ? "Dobrze, choć z podglądem." : ["Dobrze!", "Tak jest!", "Brawo!", "Świetnie!"][i % 4]); }
      else { pig.play("oops", "quiz"); say("Nie tym razem. Prawidłowa odpowiedź jest podświetlona.", "Spróbuj zapamiętać."); }
      $("peek").hidden = true; $("peekBtn").hidden = true; $("nextBtn").hidden = false;
    }));
    $("nextBtn").addEventListener("click", async () => { await db.save(cur); quiz(); });
  }
  function quizDone() {
    const q = cur.state.quiz; const pts = q.answers.reduce((a, x) => a + (x.ok ? (x.peek ? .5 : 1) : 0), 0);
    q.pct = Math.round(pts / q.answers.length * 100);
    setStep(next("quiz"));
  }

  // модуль 3а: чтение с ведущей подсветкой
  function lead() {
    const t = text(); const wpm = settings.lead_wpm || 90; const iv = 60000 / wpm;
    const toks = t.body.split(/(\s+)/).map(x => x);  // слова и пробелы/переносы
    const html = toks.map((x, i) => /\s/.test(x) ? x : `<span class="w ${/[?]”?$/.test(x) ? "mark q" : /[!]”?$/.test(x) ? "mark e" : ""}" data-i="${i}">${esc(x)}</span>`).join("");
    say("Czytaj na głos razem z podświetleniem.", "Na przecinku krótki oddech, na kropce dłuższy, przy pytajniku głos idzie do góry.");
    render(`<section class="card">${stepsBar("lead")}<div class="text-head"><h2>${esc(t.title)}</h2><span class="muted small">tempo ${wpm} słów/min</span></div>
      <div class="reading" id="rd">${html}</div>
      <div class="btns"><button class="go" id="startBtn">Start</button><button class="ghost" id="pauseBtn" hidden>Pauza</button><button class="go" id="doneBtn" hidden>Gotowe</button></section>`);
    const spans = Array.from(stage.querySelectorAll(".w")); let i = -1, paused = false;
    function stepLead() {
      if (paused) return;
      if (i >= 0) spans[i].classList.remove("lit", "pause");
      i++; if (i >= spans.length) { clearInterval(leadTimer); $("doneBtn").hidden = false; $("pauseBtn").hidden = true; pig.play("smile"); say("Cały tekst z rytmem. Teraz postaw znaki."); return; }
      const w = spans[i]; w.classList.add("lit"); const txt = w.textContent;
      let extra = 0; if (/[,;:]”?$/.test(txt)) extra = .7; else if (/[.!?…]”?$/.test(txt)) extra = 1.5; else if (txt === "–") extra = .6;
      if (extra) w.classList.add("pause");
      clearInterval(leadTimer); leadTimer = setInterval(stepLead, iv * (1 + extra));
      if (i % 12 === 0) w.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    $("startBtn").addEventListener("click", () => { $("startBtn").hidden = true; $("pauseBtn").hidden = false; leadTimer = setInterval(stepLead, iv); });
    $("pauseBtn").addEventListener("click", () => { paused = !paused; $("pauseBtn").textContent = paused ? "Dalej" : "Pauza"; if (!paused) stepLead(); });
    $("doneBtn").addEventListener("click", () => setStep(next("lead"), { lead: { done: true, wpm } }));
  }

  // модуль 3б: «Postaw znak» — пропуски знаков, строится из текста
  function sentencesOf(body) {
    const out = [];
    body.split(/\n+/).forEach(line => {
      line = line.replace(/^–\s*/, "");
      line.split(/(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ„])/).forEach(s => {
        s = s.trim(); const n = words(s).length;
        if (n < 4 || n > 14 || /[„”–…:;]/.test(s) || !/[.!?]$/.test(s)) return; out.push(s);
      });
    });
    return out;
  }
  function makeMarks(body, n, rnd) {
    const ss = sentencesOf(body); const chosen = []; const step = Math.max(1, Math.floor(ss.length / n));
    for (let i = 0; i < ss.length && chosen.length < n; i += step) chosen.push(ss[i]);
    return chosen.map(s => {
      const ws = s.split(" "); const blanks = []; const last = ws.length - 1;
      blanks.push({ after: last, ans: ws[last].slice(-1) }); ws[last] = ws[last].slice(0, -1);
      const commas = ws.map((w, i) => w.endsWith(",") ? i : -1).filter(i => i >= 0);
      if (commas.length) { const i = commas[Math.floor(rnd() * commas.length)]; ws[i] = ws[i].slice(0, -1); blanks.push({ after: i, ans: "," }); }
      if (rnd() < .6 && ws.length > 4) {
        const used = new Set(blanks.map(b => b.after)); let tries = 0;
        while (tries++ < 10) { const i = 1 + Math.floor(rnd() * (ws.length - 3)); if (!used.has(i) && !used.has(i - 1) && !used.has(i + 1) && !ws[i].endsWith(",")) { blanks.push({ after: i, ans: "" }); break; } }
      }
      return { words: ws, blanks: blanks.sort((a, b) => a.after - b.after) };
    });
  }
  function marks() {
    const t = text(); const rnd = seeded(cur.day + t.id); const items = makeMarks(t.body, 4, rnd);
    const total = items.reduce((a, it) => a + it.blanks.length, 0); const fill = {}; let active = null;
    say("Postaw znaki: kropkę, przecinek, pytajnik, wykrzyknik albo nic.", "Kliknij puste pole, potem znak na dole.");
    render(`<section class="card">${stepsBar("marks")}${items.map((it, s) => `<p class="marks-s" data-s="${s}">${it.words.map((w, i) => { const b = it.blanks.find(b => b.after === i); return esc(w) + (b ? `<button class="blank" data-b="${s}-${i}" aria-label="znak"></button>` : "") + " "; }).join("")}</p>`).join("")}
      <div class="palette">${[",", ".", "?", "!"].map(m => `<button data-m="${m}">${m}</button>`).join("")}<button data-m="" class="nic">nic</button></div>
      <div class="btns"><button class="go" id="checkBtn" disabled>Sprawdź</button><button class="go" id="nextBtn" hidden>Dalej</button></div></section>`);
    const blanks = Array.from(stage.querySelectorAll(".blank"));
    const setActive = b => { blanks.forEach(x => x.classList.remove("active")); active = b; if (b) b.classList.add("active"); };
    const firstEmpty = () => blanks.find(b => !(b.dataset.b in fill));
    setActive(firstEmpty());
    blanks.forEach(b => b.addEventListener("click", () => setActive(b)));
    stage.querySelectorAll(".palette button").forEach(p => p.addEventListener("click", () => {
      if (!active) return; const m = p.dataset.m; fill[active.dataset.b] = m; active.textContent = m || "·"; active.classList.add("filled"); B.sfx.tap();
      $("checkBtn").disabled = Object.keys(fill).length < total; setActive(firstEmpty() || null);
    }));
    $("checkBtn").addEventListener("click", () => {
      let ok = 0; const wrongMarks = [];
      items.forEach((it, s) => it.blanks.forEach(b => { const el = stage.querySelector(`[data-b="${s}-${b.after}"]`); const got = fill[`${s}-${b.after}`]; const good = got === b.ans; if (good) ok++; else wrongMarks.push(b.ans || "nic"); el.classList.add(good ? "right" : "wrong"); if (!good) el.textContent = b.ans || "·"; }));
      stage.querySelector(".palette").hidden = true; $("checkBtn").hidden = true; $("nextBtn").hidden = false;
      const p = pct(ok, total); pig.play(p >= 80 ? "happy" : "oops", "marks"); say(p >= 80 ? `Znaki na miejscu: ${ok} z ${total}.` : `${ok} z ${total}. Poprawne znaki są pokazane.`, p >= 80 ? "" : "Kropka kończy myśl, przecinek robi oddech.");
      cur.state.marks = { ok, total, wrong: wrongMarks };
    });
    $("nextBtn").addEventListener("click", () => setStep(next("marks")));
  }

  // модуль 3в: «Przecinek zmienia sens»
  function comma() {
    const rnd = seeded(cur.day + "comma"); const pool = COMMAS.slice().sort(() => rnd() - .5).slice(0, 2);
    const st = cur.state.comma || { done: [], ok: 0 }; cur.state.comma = st; const i = st.done.length;
    if (i >= pool.length) { st.total = pool.length; return setStep(next("comma")); }
    const it = pool[i]; const opts = shuffle(it.a.map((a, k) => ({ a, k })));
    say(i === 0 ? "Przecinek potrafi zmienić wszystko." : "Jeszcze jeden.", "Które zdanie pasuje do znaczenia?");
    render(`<section class="card">${stepsBar("comma")}<p class="muted small">Znaczenie:</p><p class="quiz-q">${esc(it.meaning)}</p>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${o.k}"><span class="k">${"AB"[k]}</span><span>${esc(o.a)}</span></button>`).join("")}</div>
      <p class="note" id="joke" hidden></p><div class="btns"><button class="go" id="nextBtn" hidden>Dalej</button></div></section>`);
    let answered = false;
    stage.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      if (answered) return; answered = true; const ok = b.dataset.k === "0"; if (ok) st.ok++;
      stage.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.dataset.k === "0") x.classList.add("right"); }); if (!ok) b.classList.add("wrong");
      $("joke").hidden = false; $("joke").textContent = it.joke; pig.play(ok ? "happy" : "oops", "comma"); say(ok ? "Dokładnie!" : "Nie tym razem.", it.joke);
      st.done.push({ i, ok }); $("nextBtn").hidden = false;
    }));
    $("nextBtn").addEventListener("click", async () => { await db.save(cur); comma(); });
  }

  // модуль 4: порядок событий
  function order() {
    const t = text(); const ev = t.events.map((e, i) => ({ e, i })); let arr = shuffle(ev);
    if (arr.every((x, i) => x.i === i)) arr = arr.reverse();
    let attempt = 0;
    say("Ułóż wydarzenia po kolei.", "Przeciągnij kartę albo użyj strzałek. Potem Sprawdź.");
    render(`<section class="card">${stepsBar("order")}<div class="cards" id="cards"></div><div class="btns"><button class="go" id="checkBtn">Sprawdź</button><button class="go" id="nextBtn" hidden>Dalej</button></div></section>`);
    const box = $("cards");
    function draw() {
      box.innerHTML = arr.map((x, i) => `<div class="ev" data-i="${x.i}"><span class="n">${i + 1}</span><span>${esc(x.e)}</span><span class="mv"><button data-up aria-label="wyżej">▲</button><button data-dn aria-label="niżej">▼</button></span></div>`).join("");
      box.querySelectorAll("[data-up]").forEach((b, i) => b.addEventListener("click", () => { if (i > 0) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; draw(); } }));
      box.querySelectorAll("[data-dn]").forEach((b, i) => b.addEventListener("click", () => { if (i < arr.length - 1) { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; draw(); } }));
      box.querySelectorAll(".ev").forEach((el, i) => el.addEventListener("pointerdown", ev0 => {
        if (ev0.target.closest("button")) return; el.setPointerCapture(ev0.pointerId); el.classList.add("drag"); let over = null;
        const move = e => { const tgt = document.elementFromPoint(e.clientX, e.clientY); const card = tgt && tgt.closest(".ev"); box.querySelectorAll(".ev").forEach(c => c.classList.remove("over")); if (card && card !== el) { card.classList.add("over"); over = card; } else over = null; };
        const up = () => { el.releasePointerCapture(ev0.pointerId); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.classList.remove("drag");
          if (over) { const j = Array.from(box.children).indexOf(over); const [m] = arr.splice(i, 1); arr.splice(j, 0, m); } draw(); };
        el.addEventListener("pointermove", move); el.addEventListener("pointerup", up);
      }));
    }
    draw();
    $("checkBtn").addEventListener("click", () => {
      attempt++; let right = 0; box.querySelectorAll(".ev").forEach((el, i) => { const ok = +el.dataset.i === i; if (ok) right++; el.classList.add(ok ? "right" : "wrong"); });
      const all = right === arr.length;
      if (all || attempt >= 2) {
        const score = all ? (attempt === 1 ? 100 : 50) : Math.round(right / arr.length * 50);
        cur.state.order = { attempts: attempt, firstOk: all && attempt === 1, right, total: arr.length, score };
        box.querySelectorAll("button").forEach(b => b.disabled = true); $("checkBtn").hidden = true; $("nextBtn").hidden = false;
        pig.play(all ? (attempt === 1 ? "proud" : "happy") : "oops", "order"); say(all ? (attempt === 1 ? "Wszystko po kolei za pierwszym razem!" : "Teraz dobrze.") : `${right} z ${arr.length} na miejscu.`, all ? "" : "Jutro będzie lepiej.");
      } else { pig.play("oops", "order"); say(`${right} z ${arr.length} na swoim miejscu. Czerwone popraw.`, "Masz jeszcze jedną próbę."); setTimeout(() => box.querySelectorAll(".ev").forEach(el => el.classList.remove("right", "wrong")), 1800); }
    });
    $("nextBtn").addEventListener("click", () => setStep(next("order")));
  }

  // модуль 5: Błysk słów
  function flash() {
    const lvl = cur.level || 1; const ms = lvl <= 2 ? 500 : lvl === 3 ? 400 : 300; const pool = lvl <= 2 ? FLASH.short : lvl === 3 ? FLASH.short.concat(FLASH.long) : FLASH.long;
    const st = cur.state.flash || { rounds: [], sets: shuffle(pool).slice(0, 5).map(s => s[0]) }; cur.state.flash = st; const i = st.rounds.length;
    if (i >= 5) { st.ok = st.rounds.filter(r => r.ok).length; st.total = 5; return setStep(next("flash")); }
    const set = pool.find(s => s[0] === st.sets[i]) || pool[0]; const opts = shuffle(set);
    say(i === 0 ? "Bonus: słowo błyśnie na chwilę. Które to było?" : "Patrz uważnie.", `Słowo pokazuje się przez ${ms / 1000} s.`);
    render(`<section class="card">${stepsBar("flash")}<p class="muted small">${i + 1} z 5</p><div class="flash-word" id="fw"></div><div class="flash-opts" id="fo" hidden>${opts.map(o => `<button class="opt" data-w="${esc(o)}">${esc(o)}</button>`).join("")}</div>
      <div class="btns"><button class="go" id="showBtn">Pokaż</button><button class="go" id="nextBtn" hidden>Dalej</button></div></section>`);
    $("showBtn").addEventListener("click", () => { $("showBtn").hidden = true; $("fw").textContent = set[0]; setTimeout(() => { $("fw").textContent = "·"; $("fo").hidden = false; }, ms); });
    let answered = false;
    stage.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      if (answered) return; answered = true; const ok = b.dataset.w === set[0]; st.rounds.push({ w: set[0], ok });
      stage.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.dataset.w === set[0]) x.classList.add("right"); }); if (!ok) b.classList.add("wrong");
      pig.play(ok ? "happy" : "oops", "flash"); say(ok ? "Tak!" : `To było: ${set[0]}.`); $("nextBtn").hidden = false;
    }));
    $("nextBtn").addEventListener("click", async () => { await db.save(cur); flash(); });
  }

  // ---------- ИТОГ ----------
  function score() {
    const s = cur.state; const comp = s.quiz ? s.quiz.pct : 0;
    const pm = s.marks ? s.marks.ok : 0, pt = s.marks ? s.marks.total : 0, cm = s.comma ? s.comma.ok * 2 : 0, ct = s.comma ? (s.comma.total || 0) * 2 : 0;
    const punct = pt + ct ? Math.round((pm + cm) / (pt + ct) * 100) : 0;
    const ord = s.order ? s.order.score : 0;
    let speed = 0; const r = s.read || {};
    if (comp >= 80 && !r.tooFast) { const avg = avgWpm(); speed = avg ? Math.round(Math.min(1, Math.max(0, (r.wpm - avg) / avg / .2 + .5)) * 100) : 100; }
    const total = .5 * comp + .2 * punct + .2 * ord + .1 * speed;
    return { comp, punct, ord, speed, stars: Math.round(total / 10), wpm: r.wpm || 0, tooFast: !!r.tooFast };
  }
  async function finish() {
    const t = text(); const sc = score(); const wasDone = cur.done;
    const before = stats();
    if (!wasDone) { cur.done = true; cur.stars = sc.stars; cur.comp = sc.comp; cur.punct = sc.punct; cur.ord = sc.ord; cur.wpm = sc.wpm; cur.too_fast = sc.tooFast; cur.seconds = (cur.state.read && cur.state.read.sec) || 0; cur.state.score = sc; cur.step = "done"; await db.save(cur); }
    const after = stats(); const newAcc = B.OUTFITS.filter(o => !o.test(before) && o.test(after));
    const fact = FACTS[(doneDaily().length + t.id.length) % FACTS.length];
    const tomorrow = candidates(levelNow(), addDays(todayKey(), 1)).filter(x => x.id !== t.id)[0];
    const r = sc.stars >= 8 ? "proud" : sc.stars >= 5 ? "happy" : "smile";
    pig.base = B.outfit(after); pig.play(r, "done");
    say(sc.stars >= 8 ? "To był świetny trening!" : sc.stars >= 5 ? "Dobra robota!" : "Każdy dzień czytania się liczy.", newAcc.length ? `Bączek ma nowe: ${newAcc.map(a => a.name).join(", ")}!` : "");
    render(`<section class="card res">
      <div class="big-stars"><b>${"★".repeat(sc.stars)}</b>${"★".repeat(10 - sc.stars)}</div>
      <h2>${sc.stars} z 10 gwiazdek</h2>
      <div class="nums">
        <div><b>${sc.comp}%</b><span>rozumienie</span></div><div><b>${sc.punct}%</b><span>znaki</span></div>
        <div><b>${cur.state.order ? (cur.state.order.firstOk ? "✓" : cur.state.order.right + "/" + cur.state.order.total) : "–"}</b><span>kolejność</span></div>
        <div><b>${sc.wpm}</b><span>słów/min${sc.tooFast ? " · za szybko" : ""}</span></div>
      </div>
      <p class="muted small">Gwiazdki: rozumienie 50%, znaki 20%, kolejność 20%, tempo 10% (tylko gdy rozumienie ≥ 80%).</p>
      ${newAcc.length ? `<p class="pill good">Nowe: ${newAcc.map(a => esc(a.name)).join(", ")}</p>` : ""}
      <p class="pill info">${streak().n} dni z rzędu</p>
      <div class="fact"><b>Bączek opowiada:</b> ${esc(fact)}</div>
      ${tomorrow ? `<p class="muted small">Jutro: „${esc(tomorrow.title)}”.</p>` : ""}
      <div class="btns"><button class="go" id="homeBtn">Do domu</button></div><p class="saved"></p></section>`);
    if (sc.stars >= 8) confetti();
    $("homeBtn").addEventListener("click", home);
  }

  // ---------- СВОБОДНАЯ ТРЕНИРОВКА ----------
  function freeMenu(textId) {
    const lvl = levelNow(); let sel = textId || null;
    say("Wolny trening: wybierz ćwiczenie i historię.", "Nie liczy się do dni z rzędu, ale Bączek i tak się cieszy.");
    const byLevel = {}; TEXTS.forEach(t => (byLevel[t.level] = byLevel[t.level] || []).push(t));
    render(`<section class="card"><h2>Wolny trening</h2>
      <div class="row"><button class="ghost" data-m="schulte">Rozgrzewka</button><button class="ghost" data-m="read">Czytanie i pytania</button><button class="ghost" data-m="lead">Czytanie z rytmem</button><button class="ghost" data-m="marks">Postaw znak</button><button class="ghost" data-m="comma">Przecinek</button><button class="ghost" data-m="order">Kolejność</button><button class="ghost" data-m="flash">Błysk słów</button></div>
      <h3>Historia</h3>${Object.keys(byLevel).map(l => `<p class="muted small">Poziom ${l}${+l > lvl + 1 ? " · trudniejsze" : ""}</p><div class="stories">${byLevel[l].map(t => `<button class="story ${t.id === sel ? "next" : ""}" data-t="${t.id}"><span class="t">${esc(t.title)}</span><span class="st">${words(t.body).length} słów</span></button>`).join("")}</div>`).join("")}
      <div class="btns"><button class="ghost" id="backBtn">← Do domu</button></div></section>`);
    let mod = "read";
    const mark = () => { stage.querySelectorAll("[data-m]").forEach(b => b.style.borderColor = b.dataset.m === mod ? "var(--accent)" : ""); stage.querySelectorAll("[data-t]").forEach(b => b.style.borderColor = b.dataset.t === sel ? "var(--accent)" : ""); };
    stage.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => { mod = b.dataset.m; mark(); if (mod === "schulte" || mod === "comma" || mod === "flash" || sel) startFree(mod, sel); }));
    stage.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => { sel = b.dataset.t; mark(); startFree(mod, sel); }));
    $("backBtn").addEventListener("click", home); mark();
  }
  let dailyBackup = null;
  function startFree(mod, textId) {
    dailyBackup = cur; const t = textId ? textById(textId) : TEXTS[0];
    cur = { day: todayKey() + "/" + Date.now(), mode: "free", level: t.level, text_id: t.id, step: mod, done: false, state: { module: mod } };
    goStep(mod === "read" ? "read" : mod);
  }
  async function finishFree() {
    const s = cur.state; if (cur.step === "read" && !s.quiz) { return goStep("quiz"); }
    cur.done = true; cur.comp = s.quiz ? s.quiz.pct : null; cur.wpm = s.read ? s.read.wpm : null; cur.too_fast = !!(s.read && s.read.tooFast);
    cur.punct = s.marks ? pct(s.marks.ok, s.marks.total) : (s.comma ? pct(s.comma.ok, s.comma.total || 1) : null); cur.ord = s.order ? s.order.score : null; cur.seconds = s.read ? s.read.sec : null;
    await db.save(cur); cur = dailyBackup; pig.play("happy", "free"); say("Wolny trening zrobiony.", "Wracamy do domu.");
    render(`<section class="card res"><h2>Gotowe!</h2><p class="muted">Wynik zapisany w wolnych treningach.</p><div class="btns"><button class="go" id="homeBtn">Do domu</button><button class="ghost" id="againBtn">Jeszcze jedno</button></div><p class="saved"></p></section>`);
    $("homeBtn").addEventListener("click", home); $("againBtn").addEventListener("click", () => freeMenu());
  }
  // В свободной тренировке next() → finishFree; но «Czytanie i pytania» идёт read → quiz → конец.
  const _next = next;

  // ---------- конфетти ----------
  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("confetti"); cv.hidden = false; const ctx = cv.getContext("2d"); const dpr = devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = ["#2E8B57", "#E08A2E", "#F2B705", "#3D82EA", "#FF6B9D"];
    const ps = Array.from({ length: 80 }, () => ({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .4, vy: 2 + Math.random() * 3, vx: -1 + Math.random() * 2, r: Math.random() * 6, vr: -.1 + Math.random() * .2, c: cols[Math.floor(Math.random() * cols.length)] }));
    const t0 = performance.now();
    (function frame(now) { ctx.clearRect(0, 0, innerWidth, innerHeight); ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-7, -7, 14, 14); ctx.restore(); });
      if (now - t0 < 2400) requestAnimationFrame(frame); else { ctx.clearRect(0, 0, innerWidth, innerHeight); cv.hidden = true; } })(t0);
  }

  // ---------- ВХОД и запуск ----------
  function gate(msg, sub) {
    say(msg, sub); pig.play("suspicious");
    render(`<section class="card center"><p class="muted">${esc(sub || "")}</p>${!user && sb ? `<div class="btns"><button class="go" id="gateLogin">Zaloguj przez Google</button></div>` : ""}</section>`);
    if ($("gateLogin")) $("gateLogin").addEventListener("click", login);
  }
  const login = () => sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } });
  $("loginBtn").addEventListener("click", login);
  $("logoutBtn").addEventListener("click", async () => { await sb.auth.signOut(); location.reload(); });
  $("fontMinus").addEventListener("click", () => { store.set("dzik-font", Math.max(18, store.get("dzik-font", 24) - 2)); applyFont(); });
  $("fontPlus").addEventListener("click", () => { store.set("dzik-font", Math.min(40, store.get("dzik-font", 24) + 2)); applyFont(); });
  $("themeBtn").addEventListener("click", () => { const curT = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); store.set("dzik-theme", curT === "dark" ? "light" : "dark"); applyTheme(); });
  $("soundBtn").addEventListener("click", () => { store.set("dzik-sound", !B.soundOn()); applySound(); if (B.soundOn()) B.sfx.ok(); });

  async function onUser(u) {
    user = u; role = null; nick = null; studentEmail = null;
    if (DEMO) { user = { email: "demo@local" }; role = "student"; nick = "Demo"; studentEmail = "demo@local"; }
    else if (user) {
      const { data } = await sb.from("family").select("nick,role").eq("email", (user.email || "").toLowerCase()).maybeSingle();
      if (data) { role = data.role; nick = data.nick ? data.nick[0].toUpperCase() + data.nick.slice(1) : null; }
      if (role === "student") studentEmail = user.email.toLowerCase();
      else if (role === "viewer") { const st = await sb.from("family").select("email,nick").eq("role", "student").limit(1).maybeSingle(); if (st.data) { studentEmail = st.data.email; } }
    }
    renderAuth(); applySound();
    if (!user) return gate("Cześć! Zaloguj się, żeby trenować.", "Wejście tylko dla rodziny.");
    if (!role) return gate("Hm, nie znam tego konta.", "Ta strona jest tylko dla rodziny. Poproś rodzica o dostęp.");
    if (!studentEmail) return gate("Nie znalazłem ucznia.", "Rodzic: dodaj ucznia w ustawieniach.");
    await db.loadAll();
    cur = daily().find(s => s.day === todayKey()) || null;
    $("splashEp").textContent = "odcinek " + (doneDaily().length + (cur && cur.done ? 0 : 1));
    home();
  }
  // стартовая обложка: закрывается кнопкой START (это же нажатие разрешает звук)
  $("splashStart").addEventListener("click", () => { $("splash").hidden = true; B.setSound(store.get("dzik-sound", settings.sound_on !== false)); if (B.soundOn()) B.fart("double"); });
  if (/nosplash/.test(location.search)) $("splash").hidden = true;
  pig = B.mount($("boarBox"), "idle"); B.preload(["wave", "happy1", "happy2", "happy3", "oops", "oops2", "proud0", "proud", "wow0", "wow", "suspicious", "book", "angry1", "angry2"]);
  applyFont(); applyTheme(); applySound(); renderAuth();
  if (DEMO) onUser(null);
  else if (sb) {
    sb.auth.getSession().then(({ data }) => onUser(data.session ? data.session.user : null));
    sb.auth.onAuthStateChange((ev, session) => { if (ev === "SIGNED_IN" && (!user || user.id !== session.user.id)) onUser(session.user); });
  } else gate("Brak konfiguracji.", "");
})();
