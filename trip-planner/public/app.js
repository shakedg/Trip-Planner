(() => {
"use strict";

/* =========================================================
   TRIP SETTINGS — change these to customise your planner
   ========================================================= */
const TRIP = {
  start: "2026-12-16",           // first day (departure)
  end: "2027-01-06",             // last day (flight back)
  title: { en: "Our Trip Home", he: "הטיול שלנו הביתה" },
  subtitle: {
    en: "Where we'll be, day by day. Want to meet up? Send us a suggestion!",
    he: "איפה נהיה, יום אחר יום. רוצים להיפגש? שלחו לנו הצעה!",
  },
};

const TYPES = {
  family: "#E07A5F", friends: "#2A9D8F", stay: "#8A6FD6", outing: "#E3A13B",
  event: "#D9577F", travel: "#3A86D9", other: "#8D939C",
};

const I18N = {
  en: {
    langSwitch: "עברית", share: "Share", unlock: "Edit", lock: "Done editing",
    calendar: "Calendar", agenda: "Day by day", addPlan: "Add plan", suggestPlan: "Suggest a plan",
    exportIcs: "Add to my calendar", linkCopied: "Link copied — send it to family & friends!", copyThis: "Copy this link:",
    daysAway: "days away", daysPlanned: "days planned", freeDays: "free days", plans: "plans",
    departure: "Departure", flightBack: "Flight back", today: "Today",
    nothingPlanned: "Nothing planned yet.", suggestSomething: "Suggest something", sleepingAt: "Sleeping at:",
    dayOf: "Day {n} of {t}", nights: "{n} nights", night1: "1 night", daysN: "{n} days",
    newPlan: "New plan", editPlan: "Edit plan", fTitle: "What's the plan?", fTitlePh: "e.g. Visit Grandma & Grandpa",
    fType: "Type", fFrom: "From", fTo: "Until (last day)", fTime: "Time", fTimePh: "e.g. Lunch at 1pm",
    fWhere: "Where", fWherePh: "City, address or place", fWho: "Who's there", fWhoPh: "e.g. Mom's side, cousins",
    fOvernight: "We're staying overnight", fOvernightHint: "We sleep there every night until the last day (the day we leave).",
    fNotes: "Notes", fNotesPh: "Anything worth remembering — what to bring, who's driving…",
    save: "Save", cancel: "Cancel", del: "Delete", edit: "Edit", close: "Close", confirmDelete: "Delete this plan?",
    needTitle: "Please give it a title.", badDates: "The last day can't be before the first day.",
    saveError: "Couldn't save — check your connection and try again.", saved: "Saved", deleted: "Deleted",
    unlockTitle: "Edit mode", unlockLead: "Only we can add and change plans. Everyone else can view the schedule and send suggestions.",
    passcode: "Passcode", wrongPass: "That passcode didn't work.", unlocked: "You can now add and edit plans",
    editBanner: "Edit mode is on — click any day to add a plan.",
    demoBanner: "Preview mode: changes are saved only in this browser. Deploy to Netlify to share with everyone.",
    sTitle: "Suggest a plan", sLead: "Want to see us, host us, or have an idea? Send it and we'll fit it into the schedule.",
    sName: "Your name", sNamePh: "So we know who it's from", sIdea: "Your idea", sIdeaPh: "e.g. Friday dinner at our place",
    sDates: "Which dates work? (optional)", send: "Send", sent: "Thanks! We got your suggestion.", needIdea: "Please write your idea.",
    suggestionsTitle: "Suggestions from family & friends ({n})", addToPlan: "Add to plan", dismiss: "Dismiss",
    suggestedBy: "Suggested by {name}", someone: "someone", anyDate: "Any date",
    openMap: "Open in Maps", loading: "Loading the schedule…", loadError: "Couldn't load the schedule. Trying again shortly…",
    type_family: "Family", type_friends: "Friends", type_stay: "Stay-over", type_outing: "Day trip / outing",
    type_event: "Event", type_travel: "Travel", type_other: "Other",
  },
  he: {
    langSwitch: "English", share: "שיתוף", unlock: "עריכה", lock: "סיום עריכה",
    calendar: "לוח שנה", agenda: "יום אחר יום", addPlan: "הוספת תוכנית", suggestPlan: "הצעת תוכנית",
    exportIcs: "הוספה ליומן שלי", linkCopied: "הקישור הועתק — שלחו למשפחה ולחברים!", copyThis: "העתיקו את הקישור:",
    daysAway: "ימים בארץ", daysPlanned: "ימים מתוכננים", freeDays: "ימים פנויים", plans: "תוכניות",
    departure: "יוצאים לדרך", flightBack: "טיסה חזרה", today: "היום",
    nothingPlanned: "עוד לא מתוכנן כלום.", suggestSomething: "להציע משהו", sleepingAt: "לינה:",
    dayOf: "יום {n} מתוך {t}", nights: "{n} לילות", night1: "לילה אחד", daysN: "{n} ימים",
    newPlan: "תוכנית חדשה", editPlan: "עריכת תוכנית", fTitle: "מה התוכנית?", fTitlePh: "למשל: ביקור אצל סבא וסבתא",
    fType: "סוג", fFrom: "מתאריך", fTo: "עד (יום אחרון)", fTime: "שעה", fTimePh: "למשל: ארוחת צהריים ב-13:00",
    fWhere: "איפה", fWherePh: "עיר, כתובת או מקום", fWho: "מי משתתף", fWhoPh: "למשל: המשפחה של אמא, בני הדודים",
    fOvernight: "נשארים לישון", fOvernightHint: "ישנים שם כל לילה עד היום האחרון (היום שבו עוזבים).",
    fNotes: "הערות", fNotesPh: "כל מה שכדאי לזכור — מה להביא, מי נוהג…",
    save: "שמירה", cancel: "ביטול", del: "מחיקה", edit: "עריכה", close: "סגירה", confirmDelete: "למחוק את התוכנית?",
    needTitle: "נא לתת שם לתוכנית.", badDates: "היום האחרון לא יכול להיות לפני היום הראשון.",
    saveError: "השמירה נכשלה — בדקו את החיבור ונסו שוב.", saved: "נשמר", deleted: "נמחק",
    unlockTitle: "מצב עריכה", unlockLead: "רק אנחנו יכולים להוסיף ולשנות תוכניות. כל השאר יכולים לצפות בלוח ולשלוח הצעות.",
    passcode: "קוד", wrongPass: "הקוד לא נכון.", unlocked: "עכשיו אפשר להוסיף ולערוך תוכניות",
    editBanner: "מצב עריכה פעיל — לחצו על יום כדי להוסיף תוכנית.",
    demoBanner: "מצב תצוגה מקדימה: השינויים נשמרים רק בדפדפן הזה. העלו ל-Netlify כדי לשתף עם כולם.",
    sTitle: "הצעת תוכנית", sLead: "רוצים להיפגש, לארח אותנו או שיש לכם רעיון? שלחו ונשבץ בלוח.",
    sName: "השם שלך", sNamePh: "כדי שנדע ממי זה", sIdea: "הרעיון", sIdeaPh: "למשל: ארוחת שישי אצלנו",
    sDates: "באילו תאריכים מתאים? (לא חובה)", send: "שליחה", sent: "תודה! קיבלנו את ההצעה.", needIdea: "נא לכתוב את הרעיון.",
    suggestionsTitle: "הצעות ממשפחה וחברים ({n})", addToPlan: "הוספה ללוח", dismiss: "הסרה",
    suggestedBy: "הוצע על ידי {name}", someone: "מישהו", anyDate: "כל תאריך",
    openMap: "פתיחה במפות", loading: "טוענים את הלוח…", loadError: "לא הצלחנו לטעון את הלוח. מנסים שוב בעוד רגע…",
    type_family: "משפחה", type_friends: "חברים", type_stay: "לינה", type_outing: "טיול / יציאה",
    type_event: "אירוע", type_travel: "נסיעות", type_other: "אחר",
  },
};

const ICONS = {
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
};

/* ---------- small helpers ---------- */
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};
const $ = (s) => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "value") el.value = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}
function icon(name) {
  const s = h("span", { class: "ic", "aria-hidden": "true" });
  s.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  return s;
}

/* ---------- state ---------- */
const narrow = matchMedia("(max-width: 720px)").matches;
const state = {
  entries: [], suggestions: [], editor: false, demo: false, loaded: false, error: false,
  passcode: ls.get("tp_pass") || "",
  lang: ls.get("tp_lang") || ((navigator.language || "").startsWith("he") ? "he" : "en"),
  view: ls.get("tp_view") || (narrow ? "agenda" : "calendar"),
};
function t(key, vars) {
  let s = I18N[state.lang][key] ?? I18N.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
  return s;
}

/* ---------- dates (all as "YYYY-MM-DD" strings, UTC-safe) ---------- */
const toD = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const toS = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => { const d = toD(s); d.setUTCDate(d.getUTCDate() + n); return toS(d); };
const diffDays = (a, b) => Math.round((toD(b) - toD(a)) / 86400000);
const dow = (s) => toD(s).getUTCDay();
const range = (a, b) => { const out = []; for (let s = a; s <= b; s = addDays(s, 1)) out.push(s); return out; };
const locale = () => (state.lang === "he" ? "he-IL" : "en-US");
const fmt = (s, o) => new Intl.DateTimeFormat(locale(), { timeZone: "UTC", ...o }).format(toD(s));
const todayS = () => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`; };
const inTrip = (s) => s >= TRIP.start && s <= TRIP.end;
const tripDays = () => range(TRIP.start, TRIP.end);
function fmtRange(a, b) {
  if (!a) return t("anyDate");
  if (a === b || !b) return fmt(a, { weekday: "short", month: "short", day: "numeric" });
  return `${fmt(a, { month: "short", day: "numeric" })} – ${fmt(b, { month: "short", day: "numeric" })}`;
}
const entriesOn = (d) => state.entries
  .filter((e) => e.start <= d && d <= e.end)
  .sort((a, b) => a.start.localeCompare(b.start) || (a.time || "").localeCompare(b.time || ""));
const sleepOn = (d) => state.entries.filter((e) => e.overnight && (e.start === e.end ? e.start === d : e.start <= d && d < e.end));
const nightsOf = (e) => Math.max(1, diffDays(e.start, e.end));

/* ---------- data layer (Netlify API, or local preview) ---------- */
const authHeaders = () => (state.passcode ? { "x-passcode": state.passcode } : {});
async function request(method, path, body) {
  const res = await fetch(`/api/${path}`, {
    method, headers: { "content-type": "application/json", ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) { const err = new Error(data?.error || `HTTP ${res.status}`); err.status = res.status; throw err; }
  return data;
}
const demoDb = {
  read() { try { return JSON.parse(ls.get("tp_demo")) || { entries: [], suggestions: [] }; } catch { return { entries: [], suggestions: [] }; } },
  write(d) { ls.set("tp_demo", JSON.stringify(d)); },
};
async function detectBackend() {
  if (location.protocol === "file:") return false;
  try {
    const r = await fetch("/api/data", { headers: authHeaders() });
    return (r.headers.get("content-type") || "").includes("application/json");
  } catch { return false; }
}
const db = {
  async load() {
    if (state.demo) {
      const d = demoDb.read();
      state.entries = d.entries; state.suggestions = d.suggestions; state.editor = !!state.passcode;
      return;
    }
    const d = await request("GET", "data");
    state.entries = d.entries || [];
    state.suggestions = d.suggestions || [];
    if (state.passcode && !d.editor) { state.passcode = ""; ls.del("tp_pass"); }
    state.editor = !!d.editor;
  },
  async auth(pass) {
    if (state.demo) return true;
    const res = await fetch("/api/auth", { method: "POST", headers: { "x-passcode": pass } });
    return res.ok;
  },
  async saveEntry(e) {
    if (state.demo) {
      const d = demoDb.read(); const now = new Date().toISOString();
      if (e.id) d.entries = d.entries.map((x) => (x.id === e.id ? { ...x, ...e, updatedAt: now } : x));
      else d.entries.push({ ...e, id: uid(), createdAt: now, updatedAt: now });
      return demoDb.write(d);
    }
    return e.id ? request("PUT", `entries/${e.id}`, e) : request("POST", "entries", e);
  },
  async deleteEntry(id) {
    if (state.demo) { const d = demoDb.read(); d.entries = d.entries.filter((x) => x.id !== id); return demoDb.write(d); }
    return request("DELETE", `entries/${id}`);
  },
  async suggest(s) {
    if (state.demo) { const d = demoDb.read(); d.suggestions.push({ ...s, id: uid(), createdAt: new Date().toISOString() }); return demoDb.write(d); }
    return request("POST", "suggestions", s);
  },
  async deleteSuggestion(id) {
    if (state.demo) { const d = demoDb.read(); d.suggestions = d.suggestions.filter((x) => x.id !== id); return demoDb.write(d); }
    return request("DELETE", `suggestions/${id}`);
  },
};
async function refresh() {
  try { await db.load(); state.loaded = true; state.error = false; }
  catch { state.error = true; }
  render();
}

/* ---------- rendering ---------- */
function render() {
  const he = state.lang === "he";
  document.documentElement.lang = state.lang;
  document.documentElement.dir = he ? "rtl" : "ltr";
  document.title = TRIP.title[state.lang];

  $("#title").textContent = TRIP.title[state.lang];
  $("#subtitle").textContent = TRIP.subtitle[state.lang];
  $("#dates").textContent = `${fmt(TRIP.start, { month: "long", day: "numeric", year: "numeric" })} – ${fmt(TRIP.end, { month: "long", day: "numeric", year: "numeric" })}`;

  setBtn($("#langBtn"), "globe", t("langSwitch"));
  setBtn($("#shareBtn"), "share", t("share"));
  setBtn($("#lockBtn"), state.editor ? "unlock" : "lock", state.editor ? t("lock") : t("unlock"));
  setBtn($("#icsBtn"), "download", t("exportIcs"));
  setBtn($("#primaryBtn"), state.editor ? "plus" : "bulb", state.editor ? t("addPlan") : t("suggestPlan"));
  document.querySelectorAll(".tabs button").forEach((b) => {
    setBtn(b, b.dataset.view === "calendar" ? "cal" : "list", t(b.dataset.view));
    b.setAttribute("aria-selected", String(b.dataset.view === state.view));
  });

  const banner = $("#banner");
  if (state.demo) { banner.hidden = false; banner.className = "banner"; banner.textContent = t("demoBanner"); }
  else if (state.editor) { banner.hidden = false; banner.className = "banner edit"; banner.textContent = t("editBanner"); }
  else banner.hidden = true;

  renderStats();
  renderSuggestions();
  renderLegend();

  const view = $("#view");
  view.replaceChildren();
  if (!state.loaded) { view.append(h("p", { class: "loading" }, state.error ? t("loadError") : t("loading"))); return; }
  view.append(state.view === "calendar" ? renderCalendar() : renderAgenda());
}
function setBtn(btn, ic, label) { btn.replaceChildren(icon(ic), h("span", { class: "lbl" }, label)); btn.setAttribute("aria-label", label); }

function renderStats() {
  const days = tripDays();
  const planned = days.filter((d) => entriesOn(d).length).length;
  const items = [[days.length, t("daysAway")], [planned, t("daysPlanned")], [days.length - planned, t("freeDays")], [state.entries.length, t("plans")]];
  $("#stats").replaceChildren(...items.map(([n, l]) => h("div", { class: "stat" }, h("b", null, state.loaded ? n : "–"), h("span", null, l))));
}

function renderLegend() {
  $("#legend").replaceChildren(
    ...Object.entries(TYPES).map(([k, c]) => h("span", null, h("i", { class: "dot", style: `--c:${c}` }), t(`type_${k}`))),
    h("span", null, icon("moon"), t("fOvernight")),
  );
}

function renderCalendar() {
  const first = addDays(TRIP.start, -dow(TRIP.start));
  const last = addDays(TRIP.end, 6 - dow(TRIP.end));
  const today = todayS();
  const cal = h("div", { class: "cal" });
  cal.append(h("div", { class: "cal-head" }, range(first, addDays(first, 6)).map((d) => h("div", null, fmt(d, { weekday: "short" })))));

  const sorted = [...state.entries].sort((a, b) => a.start.localeCompare(b.start) || diffDays(b.start, b.end) - diffDays(a.start, a.end));
  for (let ws = first; ws <= last; ws = addDays(ws, 7)) {
    const we = addDays(ws, 6);
    const segs = [];
    for (const e of sorted) {
      if (e.end < ws || e.start > we) continue;
      segs.push({ e, c0: diffDays(ws, e.start < ws ? ws : e.start), c1: diffDays(ws, e.end > we ? we : e.end), contS: e.start < ws, contE: e.end > we });
    }
    const lanes = [];
    for (const sg of segs) {
      let L = lanes.findIndex((endCol) => endCol < sg.c0);
      if (L === -1) { L = lanes.length; lanes.push(sg.c1); } else lanes[L] = sg.c1;
      sg.lane = L;
    }
    const week = h("div", { class: "week", style: `grid-template-rows: var(--dayhead) repeat(${lanes.length}, var(--lane)) minmax(var(--minfill), 1fr)` });
    range(ws, we).forEach((d, i) => {
      const inside = inTrip(d);
      const showMonth = d === first || d.endsWith("-01") || d === TRIP.start;
      const label = showMonth ? fmt(d, { month: "short", day: "numeric" }) : fmt(d, { day: "numeric" });
      const edge = d === TRIP.start || d === TRIP.end;
      const cls = ["day", !inside && "out", d === today && "today", edge && "edge"].filter(Boolean).join(" ");
      const cell = h(inside ? "button" : "div", {
        class: cls, style: `grid-column:${i + 1}`, type: inside ? "button" : null,
        "aria-label": inside ? fmt(d, { weekday: "long", month: "long", day: "numeric" }) : null,
        title: d === TRIP.start ? t("departure") : d === TRIP.end ? t("flightBack") : null,
        onclick: inside ? () => openDay(d) : null,
      }, h("span", { class: "dnum" }, h("span", null, label), edge ? icon("plane") : null));
      week.append(cell);
    });
    for (const sg of segs) {
      const c = TYPES[sg.e.type] || TYPES.other;
      week.append(h("button", {
        type: "button",
        class: ["bar", sg.contS && "cont-s", sg.contE && "cont-e"].filter(Boolean).join(" "),
        style: `grid-column:${sg.c0 + 1} / ${sg.c1 + 2}; grid-row:${sg.lane + 2}; --c:${c}`,
        title: sg.e.title,
        onclick: (ev) => { ev.stopPropagation(); openEntry(sg.e); },
      }, sg.e.overnight ? icon("moon") : null, h("span", { dir: "auto" }, sg.e.title)));
    }
    cal.append(week);
  }
  return cal;
}

function renderAgenda() {
  const list = h("div", { class: "agenda" });
  for (const d of tripDays()) list.append(dayCard(d));
  return list;
}

function dayCard(d) {
  const items = entriesOn(d);
  const sleep = sleepOn(d);
  const card = h("article", { class: ["day-card", d === todayS() && "is-today", !items.length && "is-free"].filter(Boolean).join(" "), id: `day-${d}` });
  card.append(h("div", { class: "dc-date" },
    h("span", { class: "dc-wd" }, fmt(d, { weekday: "short" })),
    h("span", { class: "dc-num" }, fmt(d, { day: "numeric" })),
    h("span", { class: "dc-mon" }, fmt(d, { month: "short" }))));
  const body = h("div", { class: "dc-body" });
  if (d === TRIP.start) body.append(h("span", { class: "marker" }, icon("plane"), t("departure")));
  if (d === TRIP.end) body.append(h("span", { class: "marker" }, icon("plane"), t("flightBack")));
  for (const e of items) body.append(entryRow(e, d));
  if (!items.length) {
    body.append(h("p", { class: "free" }, t("nothingPlanned"), " ",
      state.editor
        ? h("button", { class: "link", type: "button", onclick: () => openForm({ start: d, end: d }) }, t("addPlan"))
        : h("button", { class: "link", type: "button", onclick: () => openSuggest(d) }, t("suggestSomething"))));
  }
  if (sleep.length) body.append(h("p", { class: "sleep" }, icon("moon"), t("sleepingAt"), " ", sleep.map((s) => s.location || s.title).join(", ")));
  card.append(body);
  return card;
}

function entryRow(e, d) {
  const total = diffDays(e.start, e.end) + 1;
  const meta = [];
  if (total > 1) meta.push(h("span", null, icon("cal"), t("dayOf", { n: diffDays(e.start, d) + 1, t: total })));
  if (e.time) meta.push(h("span", null, icon("clock"), e.time));
  if (e.location) meta.push(h("span", null, icon("pin"), e.location));
  if (e.people) meta.push(h("span", null, icon("users"), e.people));
  return h("button", { type: "button", class: "entry", style: `--c:${TYPES[e.type] || TYPES.other}`, onclick: () => openEntry(e) },
    h("strong", null, e.overnight ? icon("moon") : null, h("span", { dir: "auto" }, e.title)),
    meta.length ? h("span", { class: "meta" }, meta) : null);
}

function renderSuggestions() {
  const sec = $("#suggestions");
  if (!state.editor || !state.suggestions.length) { sec.hidden = true; return; }
  sec.hidden = false;
  const list = [...state.suggestions].sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  sec.replaceChildren(h("h2", null, t("suggestionsTitle", { n: list.length })), ...list.map((s) => h("div", { class: "sugg" },
    h("div", null,
      h("p", { dir: "auto" }, s.text),
      h("small", null, `${t("suggestedBy", { name: s.name || t("someone") })} · ${fmtRange(s.start, s.end)}`)),
    h("div", { class: "sugg-actions" },
      h("button", { class: "btn small primary", type: "button", onclick: () => openForm({
        title: s.text.slice(0, 120), start: s.start || TRIP.start, end: s.end || s.start || TRIP.start,
        notes: t("suggestedBy", { name: s.name || t("someone") }) + (s.text.length > 120 ? `\n\n${s.text}` : ""),
      }, { suggestionId: s.id }) }, t("addToPlan")),
      h("button", { class: "btn small ghost", type: "button", onclick: async () => {
        try { await db.deleteSuggestion(s.id); await refresh(); } catch { toast(t("saveError")); }
      } }, t("dismiss"))))));
}

/* ---------- dialogs ---------- */
const dlg = $("#dlg");
function openDialog(content) {
  $("#dlgBody").replaceChildren(content);
  if (!dlg.open) dlg.showModal();
  const first = dlg.querySelector("input:not([type=checkbox]), textarea");
  if (first) first.focus();
}
const closeDialog = () => dlg.close();
dlg.addEventListener("click", (e) => { if (e.target === dlg) closeDialog(); });

function field(label, input, hint) {
  return h("label", { class: "field" }, h("span", null, label), input, hint ? h("small", null, hint) : null);
}

function openDay(d) {
  const wrap = h("div", { class: "dlg" },
    h("h2", null, fmt(d, { weekday: "long", month: "long", day: "numeric" })),
    h("div", { style: "margin-top:12px" }, dayCard(d)),
    h("div", { class: "dlg-foot" },
      h("button", { class: "btn ghost", type: "button", onclick: closeDialog }, t("close")),
      state.editor
        ? h("button", { class: "btn primary", type: "button", onclick: () => openForm({ start: d, end: d }) }, icon("plus"), t("addPlan"))
        : h("button", { class: "btn primary", type: "button", onclick: () => openSuggest(d) }, icon("bulb"), t("suggestPlan"))));
  openDialog(wrap);
}

function openEntry(e) {
  const c = TYPES[e.type] || TYPES.other;
  const days = diffDays(e.start, e.end) + 1;
  const rows = [h("li", null, icon("cal"), h("span", null, fmtRange(e.start, e.end), days > 1 ? ` · ${t("daysN", { n: days })}` : ""))];
  if (e.overnight) { const n = nightsOf(e); rows.push(h("li", null, icon("moon"), n === 1 ? t("night1") : t("nights", { n }))); }
  if (e.time) rows.push(h("li", null, icon("clock"), e.time));
  if (e.location) rows.push(h("li", null, icon("pin"), h("span", null, e.location, " · ",
    h("a", { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location)}`, target: "_blank", rel: "noopener" }, t("openMap")))));
  if (e.people) rows.push(h("li", null, icon("users"), e.people));
  if (e.notes) rows.push(h("li", null, icon("note"), h("span", { class: "notes" }, e.notes)));
  openDialog(h("div", { class: "dlg" },
    h("span", { class: "pill", style: `--c:${c}` }, h("i", { class: "dot", style: `--c:${c}` }), t(`type_${e.type}`)),
    h("h2", { dir: "auto" }, e.title),
    h("ul", { class: "detail" }, rows),
    h("div", { class: "dlg-foot" },
      h("button", { class: "btn ghost", type: "button", onclick: closeDialog }, t("close")),
      state.editor ? h("button", { class: "btn primary", type: "button", onclick: () => openForm(e) }, t("edit")) : null)));
}

function openForm(init = {}, { suggestionId } = {}) {
  const e = { type: "family", start: TRIP.start, end: "", title: "", time: "", location: "", people: "", notes: "", overnight: false, ...init };
  const inp = (name, type, extra = {}) => h("input", { name, type, value: e[name] || "", ...extra });
  const type = h("select", { name: "type" }, Object.keys(TYPES).map((k) => h("option", { value: k, selected: e.type === k }, t(`type_${k}`))));
  const start = inp("start", "date", { required: true });
  const end = inp("end", "date", { value: e.end || e.start });
  const overnight = h("input", { type: "checkbox", name: "overnight", checked: e.overnight });
  const err = h("p", { class: "err", role: "alert" });
  start.addEventListener("change", () => { if (!end.value || end.value < start.value) end.value = start.value; });
  type.addEventListener("change", () => { if (type.value === "stay") overnight.checked = true; });

  const saveBtn = h("button", { class: "btn primary", type: "submit" }, t("save"));
  const form = h("form", { class: "form", novalidate: true },
    field(t("fTitle"), inp("title", "text", { placeholder: t("fTitlePh"), maxlength: 120, required: true })),
    h("div", { class: "row" }, field(t("fFrom"), start), field(t("fTo"), end)),
    h("div", { class: "row" }, field(t("fType"), type), field(t("fTime"), inp("time", "text", { placeholder: t("fTimePh"), maxlength: 60 }))),
    field(t("fWhere"), inp("location", "text", { placeholder: t("fWherePh"), maxlength: 200 })),
    field(t("fWho"), inp("people", "text", { placeholder: t("fWhoPh"), maxlength: 200 })),
    h("label", { class: "check" }, overnight, h("span", null, t("fOvernight"), h("small", null, t("fOvernightHint")))),
    field(t("fNotes"), h("textarea", { name: "notes", placeholder: t("fNotesPh"), maxlength: 2000 }, e.notes || "")),
    err,
    h("div", { class: "dlg-foot" },
      e.id ? h("button", { class: "btn danger", type: "button", onclick: async () => {
        if (!confirm(t("confirmDelete"))) return;
        try { await db.deleteEntry(e.id); closeDialog(); toast(t("deleted")); await refresh(); } catch { err.textContent = t("saveError"); }
      } }, t("del")) : null,
      h("span", { class: "spacer" }),
      h("button", { class: "btn ghost", type: "button", onclick: closeDialog }, t("cancel")),
      saveBtn));

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const f = new FormData(form);
    const data = {
      id: e.id, title: f.get("title").trim(), type: f.get("type"), start: f.get("start"), end: f.get("end") || f.get("start"),
      time: f.get("time").trim(), location: f.get("location").trim(), people: f.get("people").trim(),
      notes: f.get("notes").trim(), overnight: overnight.checked,
    };
    if (!data.title) { err.textContent = t("needTitle"); return; }
    if (!data.start || data.end < data.start) { err.textContent = t("badDates"); return; }
    saveBtn.disabled = true; err.textContent = "";
    try {
      await db.saveEntry(data);
      if (suggestionId) await db.deleteSuggestion(suggestionId).catch(() => {});
      closeDialog(); toast(t("saved")); await refresh();
    } catch (x) {
      if (x.status === 401) { state.editor = false; state.passcode = ""; ls.del("tp_pass"); err.textContent = t("wrongPass"); }
      else err.textContent = t("saveError");
      saveBtn.disabled = false;
    }
  });
  openDialog(h("div", { class: "dlg" }, h("h2", { style: "margin-bottom:16px" }, e.id ? t("editPlan") : t("newPlan")), form));
}

function openSuggest(d) {
  const name = h("input", { name: "name", type: "text", value: ls.get("tp_name") || "", placeholder: t("sNamePh"), maxlength: 60 });
  const text = h("textarea", { name: "text", placeholder: t("sIdeaPh"), maxlength: 1000, required: true });
  const start = h("input", { type: "date", name: "start", value: d || "", min: TRIP.start, max: TRIP.end });
  const end = h("input", { type: "date", name: "end", value: d || "", min: TRIP.start, max: TRIP.end });
  start.addEventListener("change", () => { if (!end.value || end.value < start.value) end.value = start.value; });
  const err = h("p", { class: "err", role: "alert" });
  const sendBtn = h("button", { class: "btn primary", type: "submit" }, t("send"));
  const form = h("form", { class: "form", novalidate: true },
    field(t("sName"), name), field(t("sIdea"), text),
    h("p", { class: "field", style: "margin:4px 0 -6px" }, h("span", null, t("sDates"))),
    h("div", { class: "row" }, field(t("fFrom"), start), field(t("fTo"), end)),
    err,
    h("div", { class: "dlg-foot" }, h("button", { class: "btn ghost", type: "button", onclick: closeDialog }, t("cancel")), sendBtn));
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!text.value.trim()) { err.textContent = t("needIdea"); return; }
    let s = start.value, en = end.value || start.value;
    if (s && en < s) { err.textContent = t("badDates"); return; }
    ls.set("tp_name", name.value.trim());
    sendBtn.disabled = true;
    try {
      await db.suggest({ name: name.value.trim(), text: text.value.trim(), start: s, end: s ? en : "" });
      closeDialog(); toast(t("sent")); if (state.editor) await refresh();
    } catch { err.textContent = t("saveError"); sendBtn.disabled = false; }
  });
  openDialog(h("div", { class: "dlg" }, h("h2", null, t("sTitle")), h("p", { class: "lead" }, t("sLead")), form));
  text.focus();
}

function openUnlock() {
  const pass = h("input", { type: "password", name: "pass", autocomplete: "current-password", required: true });
  const err = h("p", { class: "err", role: "alert" });
  const go = h("button", { class: "btn primary", type: "submit" }, t("unlock"));
  const form = h("form", { class: "form", novalidate: true }, field(t("passcode"), pass), err,
    h("div", { class: "dlg-foot" }, h("button", { class: "btn ghost", type: "button", onclick: closeDialog }, t("cancel")), go));
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const p = pass.value.trim();
    if (!p) return;
    go.disabled = true;
    let ok = false;
    try { ok = await db.auth(p); } catch {}
    if (!ok) { err.textContent = t("wrongPass"); go.disabled = false; pass.select(); return; }
    state.passcode = p; ls.set("tp_pass", p);
    closeDialog(); toast(t("unlocked")); await refresh();
  });
  openDialog(h("div", { class: "dlg" }, h("h2", null, t("unlockTitle")), h("p", { class: "lead" }, t("unlockLead")), form));
}

/* ---------- actions ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

async function share() {
  const url = location.href.split("#")[0];
  if (navigator.share && matchMedia("(pointer: coarse)").matches) {
    try { await navigator.share({ title: TRIP.title[state.lang], url }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  try { await navigator.clipboard.writeText(url); toast(t("linkCopied")); }
  catch { window.prompt(t("copyThis"), url); }
}

function exportIcs() {
  const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/([,;])/g, "\\$1");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Trip Planner//EN", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${esc(TRIP.title[state.lang])}`];
  for (const e of state.entries) {
    const desc = [e.time, e.people, e.notes].filter(Boolean).join("\n");
    lines.push("BEGIN:VEVENT", `UID:${e.id}@trip-planner`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${e.start.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${addDays(e.end, 1).replace(/-/g, "")}`,
      `SUMMARY:${esc(e.title)}`);
    if (e.location) lines.push(`LOCATION:${esc(e.location)}`);
    if (desc) lines.push(`DESCRIPTION:${esc(desc)}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  const a = h("a", { href: URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" })), download: "trip-plan.ics" });
  document.body.append(a); a.click(); a.remove();
}

$("#langBtn").addEventListener("click", () => { state.lang = state.lang === "he" ? "en" : "he"; ls.set("tp_lang", state.lang); render(); });
$("#shareBtn").addEventListener("click", share);
$("#icsBtn").addEventListener("click", exportIcs);
$("#lockBtn").addEventListener("click", async () => {
  if (state.editor) { state.passcode = ""; state.editor = false; ls.del("tp_pass"); await refresh(); }
  else openUnlock();
});
$("#primaryBtn").addEventListener("click", () => {
  const d = inTrip(todayS()) ? todayS() : TRIP.start;
  state.editor ? openForm({ start: d, end: d }) : openSuggest("");
});
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => {
  state.view = b.dataset.view; ls.set("tp_view", state.view); render();
}));

/* ---------- start ---------- */
(async () => {
  render();
  state.demo = !(await detectBackend());
  await refresh();
  if (state.view === "agenda" && inTrip(todayS())) document.getElementById(`day-${todayS()}`)?.scrollIntoView({ block: "center" });
  setInterval(() => { if (!document.hidden && !dlg.open) refresh(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && !dlg.open) refresh(); });
})();
})();
