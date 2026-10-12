// Prisma-backed CRUD routes for Threadbase.
// The frontend's route contract remains the same: list, create, update, delete.
import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

// GET /api/threads — list database records.
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();
    threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(threads);
  } catch (error) {
    return next(error);
  }
});

// POST /api/threads — create a database record.
router.post("/", async (req, res, next) => {
  try {
    const { title, body = "" } = req.body || {};

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is required." });
    }

    const thread = await prisma.thread.create({
      data: {
        title: title.trim(),
        body: String(body).trim(),
      },
    });

    return res.status(201).json(thread);
  } catch (error) {
    return next(error);
  }
});

// PUT /api/threads/:id — update only the fields provided by the client.
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, body } = req.body || {};
    const data = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Title cannot be empty." });
      }
      data.title = title.trim();
    }

    if (body !== undefined) {
      data.body = String(body).trim();
    }

    const thread = await prisma.thread.update({
      where: { id: id },
      data,
    });

    return res.status(200).json(thread);
  } catch (error) {
    if (error.code === "P2025") {
      error.statusCode = 404;
      error.message = "Thread not found.";
    }
    return next(error);
  }
});

// DELETE /api/threads/:id — return the deleted database record (200).
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const thread = await prisma.thread.delete({
      where: { id: id },
    });

    return res.status(200).json(thread);
  } catch (error) {
    if (error.code === "P2025") {
      error.statusCode = 404;
      error.message = "Thread not found.";
    }
    return next(error);
  }
});

export default router;
