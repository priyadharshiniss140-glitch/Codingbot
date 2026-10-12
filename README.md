# Threadbase — Live Chat with Socket.io

Real-time room chat with JWT-authenticated Socket.io connections, an Express API, and a React/Vite client.

## Run locally

Terminal 1 — server:

```bash
cd server
cp .env.example .env
npm install
npm start
```

Terminal 2 — client:

```bash
cd client
cp .env.development.example .env.development
npm install
npm run dev
```

Open the Vite URL (usually `http://localhost:5173`). Log in as Ada in one browser and Linus in another:
- Ada: `ada@threadbase.dev` / `password`
- Linus: `linus@threadbase.dev` / `password`

## How it works

- The Express app is wrapped with `createServer(app)` and Socket.io uses its own CORS config.
- A Socket.io handshake middleware verifies `socket.handshake.auth.token` with JWT and stores the decoded claims on `socket.data.user`.
- Clients join `thread-42` using `room:join`; messages are broadcast with `io.to(roomId).emit('chat:message', message)`, so the sender receives them too.
- `useSocket` sends the token in the handshake, maintains message state, joins/rejoins the room, and cleans up listeners and connections when the token/room changes or the component unmounts.

## Verify before submitting

Open two browser windows, log in as different users, and send a message from one. Confirm it appears once in both windows. Capture a real screenshot of both browser windows showing the same message and attach it to the PR description. Do not commit local `.env` files.
