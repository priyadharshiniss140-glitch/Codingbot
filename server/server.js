// Express entry point — already complete. The Prisma connection and route mount
// stay unchanged; CRUD persistence is implemented in routes/threads.js.
import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import prisma from "./prisma/client.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/threads", threadsRouter);

// Keep JSON error responses for errors forwarded by route handlers.
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: err.message || "Internal server error" });
});

const PORT = 3001;

async function start() {
  await prisma.$connect();
  console.log("✅ Prisma connected to the database");
  app.listen(PORT, () => {
    console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start — check DATABASE_URL and that PostgreSQL is running.");
  console.error(err);
  process.exit(1);
});
