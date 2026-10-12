# Axios Instance and Vite Environment Variables — Threadbase

This project demonstrates a clean frontend HTTP layer. The Express API is in `server/`, and the React/Vite application is in `client/`.

## Setup

Run these commands from the repository root:

```bash
npm run setup
cp client/.env.development.example client/.env.development
npm run dev
```

Open http://localhost:5173. The API runs at http://localhost:3001.

Open the browser DevTools console and verify it logs:

```
VITE_API_URL: http://localhost:3001
```

Confirm that the initial thread list loads and that the **Add thread** form creates a new thread.

## Implementation

- `client/src/services/apiClient.js` exports one Axios instance with its `baseURL` configured from `import.meta.env.VITE_API_URL`.
- `client/src/services/threads.service.js` calls the API through the shared instance and returns `response.data`.
- `client/.env.development.example` documents the local API URL.
- The local `.env.development` file is ignored by Git. Never commit real environment files.

## Submission check

Capture a screenshot of the browser console showing `VITE_API_URL: http://localhost:3001` while the app is running, then attach it to the PR description before submitting.
