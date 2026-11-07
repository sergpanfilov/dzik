// Dzik czyta — страница родителя: понимание, знаки, порядок, скорость, типы вопросов, последние сессии, настройки.
(() => {
  const C = window.DZIK_CONFIG, TEXTS = window.DZIK_TEXTS;
  const DEMO = /[?&]demo/.test(location.search);
  const sb = DEMO ? null : window.supabase.createClient(C.supabaseUrl, C.supabaseKey);
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const fromKey = k => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
  const ddmm = k => { const d = fromKey(k.slice(0, 10)); return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`; };
  const TYPE_RU = { fakt: "факт", "szczegół": "деталь", dlaczego: "причина", "słowo": "слово", znak: "знак препинания" };
  const say = t => { $("msg").textContent = t; $("msg").hidden = !t; };
  let studentEmail = null, me = null;

  if (sb) {
    $("loginBtn").addEventListener("click", () => sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }));
    $("logoutBtn").addEventListener("click", async () => { await sb.auth.signOut(); location.reload(); });
  }

  async function start() {
    let S, settings;
    if (DEMO) { const d = JSON.parse(localStorage.getItem("dzik-demo") || "{}"); S = d.sessions || []; settings = d.settings || {}; studentEmail = "demo@local"; }
    else {
      const { data: { session } } = await sb.auth.getSession(); me = session && session.user;
      $("loginBtn").hidden = !!me; $("logoutBtn").hidden = !me;
      if (!me) { say("Войдите через Google той почтой, которая есть в списке семьи."); return; }
      $("who").hidden = false; $("who").textContent = me.email;
      const fam = await sb.from("family").select("role").eq("email", me.email.toLowerCase()).maybeSingle();
      if (!fam.data || fam.data.role !== "viewer") { say("Эта страница только для родителей из списка семьи."); return; }
      const st = await sb.from("family").select("email,nick").eq("role", "student").limit(1).maybeSingle();
      if (!st.data) { say("Не нашёл ученицу в списке семьи."); return; }
      studentEmail = st.data.email;
      const r = await sb.from("dzik_sessions").select("*").eq("email", studentEmail).order("created_at").limit(5000);
      if (r.error) { say("Не удалось загрузить сессии: " + r.error.message); return; }
      S = r.data; const s2 = await sb.from("dzik_settings").select("*").eq("email", studentEmail).maybeSingle(); settings = s2.data || {};
    }
    say(""); $("main").hidden = false;
    render(S.filter(s => s.mode === "daily" && s.done), S, settings);
    bindSettings(settings, S);
  }

  function render(D, all, settings) {
    $("title").textContent = "Как идёт чтение";
    const days = D.map(s => s.day);
    const avg = f => { const xs = D.map(f).filter(x => x != null); return xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : "–"; };
    const last7 = D.slice(-7);
    const avg7 = f => { const xs = last7.map(f).filter(x => x != null); return xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : "–"; };
    const streak = (() => { const set = new Set(days); let n = 0, k = new Date(); k.setHours(0, 0, 0, 0); const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; if (!set.has(key(k))) k.setDate(k.getDate() - 1); let rest = false; while (true) { if (set.has(key(k))) { n++; k.setDate(k.getDate() - 1); } else if (!rest && n > 0) { rest = true; k.setDate(k.getDate() - 1); } else break; } return n; })();
    const minutes = Math.round(all.reduce((a, s) => a + (s.seconds || 0), 0) / 60);
    $("tiles").innerHTML = [[avg7(s => s.comp) + (avg7(s => s.comp) === "–" ? "" : "%"), "понимание, последние 7"], [avg7(s => s.punct) + (avg7(s => s.punct) === "–" ? "" : "%"), "знаки, последние 7"], [D.filter(s => s.state && s.state.order && s.state.order.firstOk).length + " / " + D.length, "порядок с первой попытки"], [avg7(s => s.too_fast ? null : s.wpm), "слов/мин (без «слишком быстро»)"], [streak, "дней подряд"], [D.length, "сессий всего"], [minutes, "минут чтения всего"], [D.reduce((a, s) => a + (s.stars || 0), 0), "звёзд всего"]]
      .map(([v, k]) => `<div class="tile"><span class="v">${v}</span><span class="k">${k}</span></div>`).join("");

    const ser = (name, c, f) => ({ name, c, pts: D.map(s => ({ k: s.day, v: f(s) })).filter(p => p.v != null) });
    const comp = [ser("понимание", "var(--ok)", s => s.comp)];
    $("lg1").innerHTML = comp.map(s => `<span><i style="background:${s.c}"></i>${s.name}</span>`).join("");
    chart($("chComp"), days, comp, { unit: "%", min: 0, max: 100, band: [80, 100] });
    const p2 = [ser("знаки", "var(--info)", s => s.punct), ser("порядок", "var(--warm)", s => s.ord)];
    $("lg2").innerHTML = p2.map(s => `<span><i style="background:${s.c}"></i>${s.name}</span>`).join("");
    chart($("chPunct"), days, p2, { unit: "%", min: 0, max: 100 });
    const w = [ser("скорость", "var(--accent)", s => s.wpm), { name: "слишком быстро", c: "var(--bad)", pts: D.filter(s => s.too_fast).map(s => ({ k: s.day, v: s.wpm })), dots: true }];
    $("lg3").innerHTML = w.map(s => `<span><i style="background:${s.c}"></i>${s.name}</span>`).join("");
    chart($("chWpm"), days, w, { unit: "сл/мин", min: 0, line: settings.fast_wpm || null });
    const wpms = D.filter(s => s.wpm).map(s => s.wpm).sort((a, b) => a - b); const med = wpms.length ? wpms[Math.floor(wpms.length / 2)] : null;
    $("wpmNote").textContent = med ? `Медиана ${med} слов/мин по ${wpms.length} сессиям.` + (settings.fast_wpm ? ` Порог «слишком быстро»: ${settings.fast_wpm}.` : wpms.length >= 5 ? ` Предлагаемый порог: ${Math.round(med * 1.5 / 5) * 5} (в полтора раза выше медианы), задаётся в настройках ниже.` : " Порог предложу после 5 сессий.") : "Пока нет данных о скорости.";

    // типы вопросов
    const T = {}; D.forEach(s => (s.state && s.state.quiz && s.state.quiz.answers || []).forEach(a => { const t = T[a.type] = T[a.type] || { n: 0, ok: 0, peek: 0 }; t.n++; if (a.ok) t.ok++; if (a.peek) t.peek++; }));
    const rows = Object.keys(T).map(k => ({ k, ...T[k], p: Math.round(T[k].ok / T[k].n * 100) })).sort((a, b) => a.p - b.p);
    $("types").innerHTML = `<tr><th>Тип вопроса</th><th class="n">Вопросов</th><th class="n">Верно</th><th class="n">С подсказкой</th><th>Оценка</th></tr>` + (rows.length ? rows.map(r => `<tr><td>${TYPE_RU[r.k] || r.k}</td><td class="n">${r.n}</td><td class="n">${r.p}%</td><td class="n">${r.peek}</td><td>${r.p < 60 ? '<span class="pill warn">трудно</span>' : r.p >= 85 ? '<span class="pill good">хорошо</span>' : "средне"}</td></tr>`).join("") : `<tr><td colspan="5" class="muted">Пока нет сессий.</td></tr>`);
    const marksWrong = {}; D.forEach(s => (s.state && s.state.marks && s.state.marks.wrong || []).forEach(m => marksWrong[m] = (marksWrong[m] || 0) + 1));
    const mw = Object.entries(marksWrong).sort((a, b) => b[1] - a[1]);
    if (mw.length) $("types").insertAdjacentHTML("afterend", `<p class="muted small">Чаще всего пропущенные знаки: ${mw.map(([k, v]) => `«${k}» ${v}`).join(", ")}.</p>`);

    // последние сессии
    const last = D.slice(-20).reverse();
    $("recent").innerHTML = `<tr><th>Дата</th><th>Текст</th><th class="n">Ур.</th><th class="n">Поним.</th><th class="n">Знаки</th><th class="n">Порядок</th><th class="n">Сл/мин</th><th class="n">★</th></tr>` +
      (last.length ? last.map((s, i) => { const t = TEXTS.find(x => x.id === s.text_id); const o = s.state && s.state.order;
        return `<tr class="open" data-i="${i}"><td>${ddmm(s.day)}</td><td class="wrap">${t ? esc(t.title) : s.text_id}</td><td class="n">${s.level || ""}</td><td class="n">${s.comp ?? "–"}%</td><td class="n">${s.punct ?? "–"}%</td><td class="n">${o ? (o.firstOk ? "✓" : o.right + "/" + o.total) : "–"}</td><td class="n">${s.wpm || "–"}${s.too_fast ? " !" : ""}</td><td class="n">${s.stars ?? "–"}</td></tr>`; }).join("")
        : `<tr><td colspan="8" class="muted">Пока нет сессий.</td></tr>`);
    $("recent").querySelectorAll("tr.open").forEach(tr => tr.addEventListener("click", () => {
      const s = last[+tr.dataset.i]; const t = TEXTS.find(x => x.id === s.text_id); const nx = tr.nextElementSibling;
      if (nx && nx.classList.contains("detail")) { nx.remove(); return; }
      const ans = s.state && s.state.quiz && s.state.quiz.answers || [];
      const q = ans.map(a => { const Q = t && t.questions[a.i]; if (!Q) return ""; return `<div>${a.ok ? "✓" : "✕"} <b>${esc(Q.q)}</b> <span class="muted">(${TYPE_RU[a.type] || a.type}${a.peek ? ", с подсказкой" : ""})</span>${a.ok ? "" : ` · выбрано: «${esc(Q.a[a.chosen] || "")}», верно: «${esc(Q.a[0])}»`}</div>`; }).join("");
      const m = s.state && s.state.marks; const c = s.state && s.state.comma; const f = s.state && s.state.flash; const sch = s.state && s.state.schulte; const r = s.state && s.state.read;
      const extra = [m ? `Знаки: ${m.ok} из ${m.total}${m.wrong && m.wrong.length ? " (ошибки: " + m.wrong.join(", ") + ")" : ""}` : "", c ? `Запятая и смысл: ${c.ok} из ${c.total || c.done.length}` : "", f ? `Błysk słów: ${f.ok} из ${f.total}` : "", sch ? `Шульте: ${sch.sec} с, ошибок ${sch.errors}` : "", r ? `Чтение: ${r.sec} с${r.reread ? ", перечитывала" : ""}${r.tooFast ? ", помечено «слишком быстро»" : ""}` : ""].filter(Boolean).join(" · ");
      tr.insertAdjacentHTML("afterend", `<tr class="detail"><td colspan="8">${q || "<span class='muted'>Без вопросов.</span>"}<div class="muted small" style="margin-top:6px">${extra}</div></td></tr>`);
    }));
  }

  function bindSettings(settings, D) {
    $("sLevel").value = settings.level_override || ""; $("sFast").value = settings.fast_wpm || ""; $("sLead").value = settings.lead_wpm || 90;
    $("sFlash").checked = settings.flash_on !== false; $("sSound").checked = settings.sound_on !== false;
    $("levelHint").textContent = "Автоматически: +1 после 3 сессий подряд с пониманием ≥ 80%, −1 после 2 подряд < 50%. Ручной выбор задаёт точку отсчёта.";
    $("fastHint").textContent = "Выше этого порога Bączek спросит, всё ли прочитано, а результат пометится. Пусто: первую неделю только замеряем.";
    $("saveBtn").addEventListener("click", async () => {
      const row = { email: studentEmail, level_override: $("sLevel").value ? +$("sLevel").value : null, level_override_at: $("sLevel").value && String($("sLevel").value) !== String(settings.level_override || "") ? new Date().toISOString() : (settings.level_override_at || null),
        fast_wpm: $("sFast").value ? +$("sFast").value : null, lead_wpm: +$("sLead").value || 90, flash_on: $("sFlash").checked, sound_on: $("sSound").checked, updated_at: new Date().toISOString() };
      if (DEMO) { const d = JSON.parse(localStorage.getItem("dzik-demo") || "{}"); d.settings = row; localStorage.setItem("dzik-demo", JSON.stringify(d)); $("saved").textContent = "Сохранено (демо)"; return; }
      const r = await sb.from("dzik_settings").upsert(row, { onConflict: "email" });
      $("saved").textContent = r.error ? "Ошибка: " + r.error.message : "Сохранено ✓"; if (!r.error) Object.assign(settings, row);
    });
  }

  // Линейный график по дням с подсказкой; серия с dots — только точки; band — зелёная зона; line — горизонтальный порог.
  function chart(box, days, series, o) {
    box.innerHTML = "";
    if (!days.length) { box.innerHTML = `<p class="muted small">Пока нет данных — появятся после первых сессий.</p>`; return; }
    days = days.slice(-60);
    const W = Math.max(300, box.clientWidth || 600), H = 220, pl = 40, pr = 20, pt = 12, pb = 26;
    const vals = series.flatMap(s => s.pts.map(p => p.v)).concat(o.line ? [o.line] : []);
    let lo = o.min != null ? o.min : 0, hi = o.max != null ? o.max : Math.max(10, Math.ceil(Math.max(...vals, 10) * 1.15 / 10) * 10);
    const step = niceStep((hi - lo) / 4); hi = Math.ceil(hi / step) * step;
    const xi = k => days.indexOf(k);
    const X = i => days.length === 1 ? (pl + W - pr) / 2 : pl + i * (W - pl - pr) / (days.length - 1);
    const Y = v => pt + (hi - v) * (H - pt - pb) / (hi - lo);
    let g = "";
    if (o.band) g += `<rect class="band" x="${pl}" y="${Y(o.band[1])}" width="${W - pl - pr}" height="${Y(o.band[0]) - Y(o.band[1])}"/>`;
    for (let v = lo; v <= hi + 1e-9; v += step) g += `<line class="ax" x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${pl - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
    if (o.line) g += `<line x1="${pl}" x2="${W - pr}" y1="${Y(o.line)}" y2="${Y(o.line)}" stroke="var(--bad)" stroke-dasharray="4 4"/><text x="${W - pr}" y="${Y(o.line) - 4}" text-anchor="end" style="fill:var(--bad)">порог ${o.line}</text>`;
    const every = Math.max(1, Math.ceil(days.length / Math.floor((W - pl - pr) / 54)));
    days.forEach((k, i) => { if (i % every === 0 || i === days.length - 1) g += `<text x="${X(i)}" y="${H - 6}" text-anchor="middle">${ddmm(k)}</text>`; });
    series.forEach(s => {
      const pts = s.pts.filter(p => xi(p.k) >= 0); if (!pts.length) return;
      if (!s.dots) g += `<path class="ln" d="${pts.map((p, j) => `${j ? "L" : "M"}${X(xi(p.k)).toFixed(1)},${Y(p.v).toFixed(1)}`).join("")}" style="stroke:${s.c}"/>`;
      pts.forEach(p => { g += `<circle cx="${X(xi(p.k))}" cy="${Y(p.v)}" r="${s.dots ? 6 : 4}" style="fill:${s.c};stroke:var(--surface);stroke-width:2"/>`; });
    });
    g += `<line class="cross" id="x" y1="${pt}" y2="${H - pb}" visibility="hidden"/><rect x="${pl}" y="0" width="${W - pl - pr}" height="${H}" fill="transparent"/>`;
    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="График по дням">${g}</svg><div class="tip" hidden></div>`;
    const svg = box.querySelector("svg"), tip = box.querySelector(".tip"), cross = svg.querySelector("#x");
    svg.addEventListener("pointermove", ev => {
      const r = svg.getBoundingClientRect(); const x = (ev.clientX - r.left) * W / r.width;
      let i = days.length === 1 ? 0 : Math.round((x - pl) / ((W - pl - pr) / (days.length - 1))); i = Math.max(0, Math.min(days.length - 1, i));
      const k = days[i]; cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i)); cross.setAttribute("visibility", "visible");
      const lines = series.map(s => { const p = s.pts.find(p => p.k === k); return p ? `<div><i style="background:${s.c}"></i>${s.name}: ${p.v} ${o.unit}</div>` : ""; }).join("");
      tip.innerHTML = `<div class="muted">${ddmm(k)}</div>${lines || '<div class="muted">нет данных</div>'}`; tip.hidden = false;
      const px = X(i) * r.width / W; tip.style.left = Math.min(Math.max(0, px + 12), r.width - tip.offsetWidth) + "px"; tip.style.top = "8px";
    });
    svg.addEventListener("pointerleave", () => { tip.hidden = true; cross.setAttribute("visibility", "hidden"); });
  }
  function niceStep(x) { const p = Math.pow(10, Math.floor(Math.log10(x))); const m = x / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
  start();
})();
