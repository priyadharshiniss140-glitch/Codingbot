# TanStack Query — Threadbase

React/Vite with Express API. This assignment adds a single QueryClient, QueryClientProvider, React Query Devtools, and a useQuery-based thread list.

## Run locally

1. Install dependencies: `npm run setup`
2. Copy `client/.env.development.example` to `client/.env.development`.
3. Start both servers: `npm run dev`
4. Open `http://localhost:5173`.

## Verify

- React Query Devtools should show the `threads` query after the list loads.
- The list should display the threads returned by `GET /api/threads`.
- The Network panel should show one request per initial load.
- Capture the Devtools panel showing the `threads` query and add it to the PR before submitting.

Only commit example environment files. Keep the local `.env.development` file untracked.
