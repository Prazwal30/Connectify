# Connectify

Connectify is a place to meet people, chat, and call. Set up a profile with the languages you speak or want to learn, find people to connect with, and start a conversation or video call.

The app uses Stream for chat and video, with an Express API and MongoDB handling accounts, profiles, and friend requests.

## What you can do

- Create an account, sign in, and keep your session in an HTTP-only cookie
- Add profile details, including a bio and languages
- Find suggested users and send or respond to friend requests
- Chat in real time and start a video call from a conversation
- Change the app’s theme

## Built with

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React Router, TanStack Query, Zustand, Stream Chat, and Stream Video
- **Backend:** Node.js, Express, MongoDB with Mongoose, JWT, and the Stream Chat server SDK

## Project layout

```text
connectify/
  backend/       Express API, authentication, database, and Stream integration
  forntend/      React and Vite app (the directory is currently spelled this way)
  scripts/       Script for starting the frontend and backend together
  package.json   Root-level development and build commands
```

## Getting started

You’ll need Node.js, npm, a MongoDB connection string, and Stream API credentials.

1. Clone the repository and open a terminal in its root directory.
2. Copy the example environment files:

   **PowerShell**

   ```powershell
   Copy-Item backend\.env.example backend\.env
   Copy-Item forntend\.env.example forntend\.env
   ```

   **macOS, Linux, or Git Bash**

   ```bash
   cp backend/.env.example backend/.env
   cp forntend/.env.example forntend/.env
   ```

3. Add your own values to the new `.env` files.
4. Install dependencies and start the app:

   ```bash
   npm run install:all
   npm run dev
   ```

The frontend is available at `http://localhost:5173` and the API at `http://localhost:3001`. If port 5173 is already in use, Vite may pick another one and print it in the terminal.

## Environment variables

Set these in `backend/.env`:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET=your_jwt_secret
```

Set these in `forntend/.env`:

```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:3001/api
```

Keep your real `.env` files private. They contain credentials; only the example files belong in the repository.

## Useful commands

Run both parts of the app:

```bash
npm run dev
```

Run just one part:

```bash
npm run dev:frontend
npm run dev:backend
```

Build the frontend:

```bash
npm run build
```

The backend package also has a syntax check:

```bash
npm --prefix backend run build
```

To install dependencies separately instead of using `npm run install:all`, run `npm install --prefix backend` and `npm install --prefix forntend`.

## Deployment

Set the backend and frontend environment variables in your hosting provider’s dashboard, using your deployed frontend and API URLs for `CLIENT_URL` and `VITE_API_URL`. Don’t upload local `.env` files. Video calls require HTTPS in production.

## Screenshots

<img width="1365" height="716" alt="Connectify home screen" src="https://github.com/user-attachments/assets/64bcd6bf-f72c-4173-9d0b-aa6333a10d0b" />
<img width="393" height="486" alt="Connectify mobile screen" src="https://github.com/user-attachments/assets/2bc86a6a-3c2b-4ef6-aa2e-818344843099" />
