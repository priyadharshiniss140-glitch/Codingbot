# Threadbase — PUT & DELETE Mutations with Selective Cache Invalidation

This React (Vite) + Express app demonstrates editing and deleting threads using TanStack Query mutations.

## Run locally

1. Run `npm run setup` from the repository root.
2. Copy `client/.env.development.example` to `client/.env.development`.
3. Run `npm run dev`.
4. Open `http://localhost:5173`.

## Cache behavior

- Edit mutation: `mutationFn: ({ id, data }) => updateThread(id, data)`.
- After edit: invalidate both `['threads']` and `['thread', id]`.
- Delete mutation: `mutationFn: deleteThread`, fired with `deleteMutation.mutate(thread.id)`.
- After delete: invalidate only `['threads']`.
- The Save and Delete buttons are disabled during their respective pending mutations. Inline errors are shown if a request fails.

## Verify before submission

Edit a title and save; Network should show `PUT /api/threads/:id` returning 200, followed by `GET /api/threads`. Delete a thread; Network should show `DELETE /api/threads/:id` returning 204 and the row should disappear after the list refetches.

Capture both real browser Network screenshots and attach them to the PR description. Do not commit `client/.env.development`.
