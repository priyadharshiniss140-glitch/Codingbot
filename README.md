# Threadbase — Avatar Upload UI

React front end for the Threadbase Multer upload endpoint. The server accepts one image at `POST /api/upload` using the form field name `avatar`; the client validates the file, previews it locally, and reports upload progress.

## Run locally

Terminal 1:

```bash
cd server
cp .env.example .env
npm install
npm start
```

Terminal 2:

```bash
cd client
cp .env.development.example .env.development
npm install
npm run dev
```

Open the Vite URL shown in the client terminal (normally http://localhost:5173).

## Checks

- Drag and drop an image, or click the drop zone to select one.
- Only JPEG, PNG, WebP, and GIF files up to 5 MB are accepted by the client.
- The selected image is previewed with an object URL, which is revoked when the preview changes or the component unmounts.
- Upload submits `FormData` with the `avatar` field and shows Axios upload progress.
- The browser sets the multipart `Content-Type` boundary automatically. The client does not set this header manually.

The required PR screenshot must show the selected image preview and the progress bar during a real upload. Do not commit local `.env` files or uploaded user images.
