// Singleton PrismaClient instance shared by the server.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
