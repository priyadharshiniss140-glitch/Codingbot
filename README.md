# Connect Prisma to Express — PostgreSQL

This project adds Prisma + PostgreSQL configuration and a startup connection to the Threadbase Express API. The React frontend is included unchanged. The provided `server/routes/threads.js` remains an in-memory API for this lesson; this exercise establishes the Prisma schema, initial migration, singleton client, and server startup connection.

## Prerequisites

- Node.js 18+
- A local PostgreSQL server running
- A database named `threadbase` (create it with `createdb threadbase`, or use your PostgreSQL admin tool)

## Setup

From the repository root, install the root, server, and client packages:

```bash
npm run setup
```

Configure the server database URL:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and replace `USER` and `PASSWORD` in `DATABASE_URL` with your local PostgreSQL credentials. Never commit `.env`.

## Prisma schema and migration

From `server/`:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev --name init
```

The `Thread` model and initial migration are in `prisma/schema.prisma` and `prisma/migrations/`. Use a real reachable PostgreSQL database before running the migration.

## Run

From the repository root:

```bash
npm run dev
```

The server calls `await prisma.$connect()` before starting to listen. On success, the terminal reports:

```
Prisma connected to PostgreSQL successfully.
Threadbase API running on http://localhost:3001
```

The frontend uses the unchanged API contract at `GET /api/threads`.

## Required submission evidence

After the local database is configured and the app starts successfully, capture a screenshot of the Express terminal showing the successful Prisma connection and server startup. Attach that real screenshot to the PR description before submitting to the course.
