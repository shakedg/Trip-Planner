// Trip Planner API — runs as a Netlify Function, stores data in Netlify Blobs.
// Anyone can read the schedule and send suggestions.
// Adding / editing / deleting plans requires the EDIT_PASSCODE environment variable.
import { getStore } from "@netlify/blobs";

const TYPES = ["family", "friends", "stay", "outing", "event", "travel", "other"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^[a-z0-9]{6,24}$/;
const MAX_SUGGESTIONS = 300;

class BadRequest extends Error {}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const expectedPasscode = () =>
  (globalThis.Netlify?.env?.get?.("EDIT_PASSCODE") ?? process.env.EDIT_PASSCODE ?? "").trim();

function isEditor(req) {
  const expected = expectedPasscode();
  const given = (req.headers.get("x-passcode") || "").trim();
  if (!expected || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function cleanDates(b, required) {
  const start = str(b.start, 10);
  const end = str(b.end, 10) || start;
  if (!start && !required) return { start: "", end: "" };
  if (!DATE_RE.test(start) || !DATE_RE.test(end)) throw new BadRequest("Invalid date");
  if (end < start) throw new BadRequest("End date is before start date");
  return { start, end };
}

function cleanEntry(b) {
  const title = str(b.title, 120);
  if (!title) throw new BadRequest("Title is required");
  return {
    title,
    type: TYPES.includes(b.type) ? b.type : "other",
    ...cleanDates(b, true),
    time: str(b.time, 60),
    location: str(b.location, 200),
    people: str(b.people, 200),
    notes: str(b.notes, 2000),
    overnight: b.overnight === true,
  };
}

async function readBody(req) {
  const text = await req.text();
  if (text.length > 10000) throw new BadRequest("Too large");
  try { return JSON.parse(text || "{}"); } catch { throw new BadRequest("Invalid JSON"); }
}

async function listAll(store, prefix) {
  const { blobs } = await store.list({ prefix });
  const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
  return items.filter(Boolean);
}

export default async (req) => {
  const store = getStore({ name: "trip-planner", consistency: "strong" });
  const parts = new URL(req.url).pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const [resource, id] = parts;
  if (id && !ID_RE.test(id)) return json({ error: "Not found" }, 404);
  const editor = isEditor(req);
  const now = new Date().toISOString();

  try {
    // Public: read the schedule
    if (req.method === "GET" && resource === "data") {
      const out = { entries: await listAll(store, "entries/"), editor };
      if (editor) out.suggestions = await listAll(store, "suggestions/");
      return json(out);
    }

    // Public: check a passcode
    if (req.method === "POST" && resource === "auth") {
      return editor ? json({ ok: true }) : json({ ok: false, error: "Wrong passcode" }, 401);
    }

    // Public: send a suggestion
    if (req.method === "POST" && resource === "suggestions") {
      const b = await readBody(req);
      const text = str(b.text, 1000);
      if (!text) throw new BadRequest("Suggestion text is required");
      const { blobs } = await store.list({ prefix: "suggestions/" });
      if (blobs.length >= MAX_SUGGESTIONS) throw new BadRequest("Suggestion box is full");
      const s = { id: newId(), name: str(b.name, 60), text, ...cleanDates(b, false), createdAt: now };
      await store.setJSON(`suggestions/${s.id}`, s);
      return json(s, 201);
    }

    // Everything below needs the passcode
    if (!editor) return json({ error: "Passcode required" }, 401);

    if (resource === "entries") {
      if (req.method === "POST" && !id) {
        const e = { id: newId(), ...cleanEntry(await readBody(req)), createdAt: now, updatedAt: now };
        await store.setJSON(`entries/${e.id}`, e);
        return json(e, 201);
      }
      if (req.method === "PUT" && id) {
        const existing = await store.get(`entries/${id}`, { type: "json" });
        if (!existing) return json({ error: "Not found" }, 404);
        const e = { ...existing, ...cleanEntry(await readBody(req)), id, updatedAt: now };
        await store.setJSON(`entries/${id}`, e);
        return json(e);
      }
      if (req.method === "DELETE" && id) {
        await store.delete(`entries/${id}`);
        return json({ ok: true });
      }
    }

    if (resource === "suggestions" && req.method === "DELETE" && id) {
      await store.delete(`suggestions/${id}`);
      return json({ ok: true });
    }

    return json({ error: "Not found" }, 404);
  } catch (err) {
    if (err instanceof BadRequest) return json({ error: err.message }, 400);
    console.error(err);
    return json({ error: "Server error" }, 500);
  }
};

export const config = { path: "/api/*" };
