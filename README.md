# Replacing In-Memory CRUD with Prisma — Threadbase

This React + Express application now reads and writes thread records through Prisma and PostgreSQL. The React CRUD components and service API remain unchanged; the four handlers in `server/routes/threads.js` perform database queries rather than using an in-memory array.

## Prerequisites

- Node.js 18+
- PostgreSQL running locally

## Setup

From the repository root:

```bash
npm run setup
```

Create the local server environment file and update `DATABASE_URL` to match your PostgreSQL user, password, host, port, and database:

```bash
cd server
cp .env.example .env
```

Create the database (for example, `createdb threadbase`), then apply the existing migration and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

Do not commit `server/.env`; it contains local credentials.

## Run

From the project root:

```bash
npm run dev
```

The Express server connects to PostgreSQL before listening on port 3001, and the React/Vite app runs on port 5173.

## Prisma route behavior

- `GET /api/threads`: reads records with `prisma.thread.findMany()`.
- `POST /api/threads`: creates a record with `prisma.thread.create()` and returns 201.
- `PUT /api/threads/:id`: parses the route ID and updates only supplied fields, returning the updated record with 200.
- `DELETE /api/threads/:id`: deletes the requested record and returns the deleted record with 200.
- Each handler is asynchronous and forwards caught errors to Express with `next(error)`. Missing records are mapped to 404.

## Verify persistence end to end

1. Create a thread in the React app.
2. Restart the Express server and refresh the page; the thread should remain in the list.
3. Run `psql threadbase -c 'SELECT * FROM "Thread";'` and confirm the same row exists.
4. Edit and delete threads to verify all four CRUD routes.

## Required PR screenshots

Attach two real screenshots to the Pull Request description:
1. The React app showing a newly created thread.
2. `psql` output of `SELECT * FROM "Thread";` showing that same thread.

The provided frontend has been included unchanged. This GitHub copy is a prepared working scaffold; if course evaluation strictly requires a native fork of the official starter, fork that repository and port the route change there before submission.
