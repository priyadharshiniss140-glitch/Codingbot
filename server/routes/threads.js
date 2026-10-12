// In-memory Threads API — already implemented. Do not change for this assignment.
//   GET    /api/threads      → the list, newest first
//   POST   /api/threads      → creates a thread from { title, body }, returns 201
//   PUT    /api/threads/:id  → replaces title/body, returns 200 + updated
//   DELETE /api/threads/:id  → removes a thread, returns 204 No Content
//
// This assignment connects Prisma + PostgreSQL and establishes the Thread schema.
// A later lesson swaps this array for live Prisma queries.
import { Router } from "express";

const router = Router();

let nextId = 4;
let threads = [
  { id: 1, title: "Welcome to Threadbase", body: "Your data currently lives in RAM — restart the server and it is gone.", createdAt: 1 },
  { id: 2, title: "Next stop: a real database", body: "Connect Prisma and PostgreSQL so threads survive a restart.", createdAt: 2 },
  { id: 3, title: "The seam is the data layer", body: "Only this file changes — React, hooks, services, and Axios stay untouched.", createdAt: 3 },
];

router.get("/", (req, res) => {
  const newestFirst = [...threads].sort((a, b) => b.createdAt - a.createdAt);
  res.json(newestFirst);
});

router.post("/", (req, res) => {
  const { title, body = "" } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required." });
  }
  const thread = { id: nextId++, title: title.trim(), body: String(body).trim(), createdAt: Date.now() };
  threads.push(thread);
  res.status(201).json(thread);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const thread = threads.find((t) => t.id === id);
  if (!thread) return res.status(404).json({ error: "Thread not found." });
  const { title, body } = req.body || {};
  if (title !== undefined && !String(title).trim()) {
    return res.status(400).json({ error: "Title cannot be empty." });
  }
  if (title !== undefined) thread.title = String(title).trim();
  if (body !== undefined) thread.body = String(body).trim();
  res.status(200).json(thread);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = threads.length;
  threads = threads.filter((t) => t.id !== id);
  if (threads.length === before) return res.status(404).json({ error: "Thread not found." });
  res.status(204).end();
});

export default router;
