# Connectify

Connectify is a full-stack chat and video calling app built for making language-learning connections feel more natural. Users can create an account, set up their profile, find people to connect with, send friend requests, chat in real time, and start a video call directly from a conversation.

The app uses Stream for real-time messaging and video, while the backend handles authentication, users, friend requests, and secure token generation.

## Features

- Sign up, log in, and log out with JWT auth stored in HTTP-only cookies
- Complete onboarding with profile details like bio, location, and languages
- Discover recommended users and send friend requests
- Manage friends and incoming/outgoing requests
- Chat in real time with Stream Chat
- Start video calls from inside a chat using Stream Video
- Switch themes with DaisyUI
- Fetch and cache app data with React Query
- Store users and friend requests in MongoDB

## Tech Stack

**Frontend**

- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- TanStack React Query
- Stream Chat React
- Stream Video React SDK
- Zustand

**Backend**

- Node.js
- Express
- MongoDB / Mongoose
- JWT
- Cookie Parser
- CORS
- Stream Chat server SDK

## Project Structure

```txt
connectify/
  backend/       Express API, auth, MongoDB, Stream token generation
  forntend/      React/Vite frontend
  scripts/       Root development helper scripts
  package.json   Root scripts for running the full app
```

Small note: the frontend folder is currently named `forntend`, so the commands below use that exact spelling.

## Environment Variables

Before running the app, create local environment files from the examples:

```bash
copy backend\.env.example backend\.env
copy forntend\.env.example forntend\.env
```

### Backend

`backend/.env`

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET=your_jwt_secret
```

### Frontend

`forntend/.env`

```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:3001/api
```

Keep real `.env` files private. They contain secrets, so only `.env.example` files should be committed.

## Installation

Install everything from the root folder:

```bash
npm run install:all
```

You can also install each side separately:

```bash
npm install --prefix backend
npm install --prefix forntend
```

## Development

Start the backend and frontend together:

```bash
npm run dev
```

Start only the frontend:

```bash
npm run dev:frontend
```

Start only the backend:

```bash
npm run dev:backend
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3001
```

If `5173` is already in use, Vite may choose another port such as `5174`.

## Build

Build the frontend from the root folder:

```bash
npm run build
```

Check the backend syntax:

```bash
npm --prefix backend run build
```

Build frontend only:

```bash
npm --prefix forntend run build
```

## Production

For deployment, add the production environment variables in your hosting dashboard. Do not upload your local `.env` files.

Backend:

```env
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET=your_jwt_secret
```

Frontend:

```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=https://your-backend-domain.com/api
```

In production, video calls need HTTPS. Stream handles the real-time chat and video infrastructure globally; this backend provides authentication, user data, friend request logic, and Stream tokens.

## Git

After making changes, commit them with:

```bash
git add .
git commit -m "your commit message"
git push
```

If Git asks for your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
