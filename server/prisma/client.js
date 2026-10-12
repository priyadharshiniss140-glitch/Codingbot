import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the server application.
const prisma = new PrismaClient();

export default prisma;
