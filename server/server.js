// Threadbase API — GET lists threads; POST creates one and returns 201.
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let nextId = 4;
const threads = [
  { id: 1, title: "Welcome to Threadbase", body: "Post a thread and watch the list refresh itself.", createdAt: 1 },
  { id: 2, title: "React Query keys are the bridge", body: "Put filters in the key and it refetches for you.", createdAt: 2 },
  { id: 3, title: "Mutations change server state", body: "useMutation + invalidateQueries = self-updating UI.", createdAt: 3 },
];

app.get("/api/threads", (req, res) => {
  const newestFirst = [...threads].sort((a, b) => b.createdAt - a.createdAt);
  res.json(newestFirst);
});

app.post("/api/threads", (req, res) => {
  const { title, body = "" } = req.body || {};

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required." });
  }

  const thread = {
    id: nextId++,
    title: title.trim(),
    body: String(body).trim(),
    createdAt: Date.now(),
  };
  threads.push(thread);

  // Delay keeps the mutation's pending button state visible during development.
  setTimeout(() => res.status(201).json(thread), 600);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
});
