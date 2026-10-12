// Threadbase API — GET /api/threads returns five dummy threads.
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const threads = [
  { id: 1, title: "Welcome to Threadbase", body: "This thread came from your Express API." },
  { id: 2, title: "Axios > fetch for app code", body: "Auto JSON, response.data, throws on errors." },
  { id: 3, title: "One base URL to rule them all", body: "Set it once in axios.create()." },
  { id: 4, title: "Server state is not UI state", body: "That's why TanStack Query exists." },
  { id: 5, title: "Fetch once, serve from cache", body: "useQuery dedupes and caches for you." },
];

app.get("/api/threads", (req, res) => {
  // Delay makes the loading state visible while developing the UI.
  setTimeout(() => res.json(threads), 600);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
});
