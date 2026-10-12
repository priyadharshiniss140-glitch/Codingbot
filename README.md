# Threadbase — POST Mutations with TanStack Query

This React (Vite) + Express starter demonstrates creating a thread with `useMutation` and refreshing the cached `['threads']` query by invalidating it on success.

## Run locally

1. Install dependencies with `npm run setup`.
2. Copy `client/.env.development.example` to `client/.env.development`.
3. Run both app halves with `npm run dev`.
4. Open `http://localhost:5173`.

## Mutation behavior

- `CreateThreadForm.jsx` passes the `createThread` function reference to `useMutation`.
- Form submission calls `mutation.mutate({ title, body })`.
- The button is disabled and says `Posting…` while the request is pending.
- `onSuccess` resets the fields and calls `queryClient.invalidateQueries({ queryKey: ['threads'] })`, triggering the mounted list to refetch.
- `mutation.isError` displays the API error inline when posting fails.

## Verify before submission

Use DevTools → Network to confirm a successful `POST /api/threads` (201) is followed by a `GET /api/threads` refetch and that the newest thread appears first without a page reload. Submit an empty title to test the inline 400 error. Capture a screenshot of the Network panel showing the POST followed by the GET refetch, then attach it to the PR description.

Do not commit the local `.env.development` file.
