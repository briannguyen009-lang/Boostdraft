# Lunar

A clickable, front-end-only music app prototype for a human colony on the Moon.

## Run

```sh
npm install
npm run dev
```

Open `http://localhost:4173`. Build with `npm run build`.

## Single-file app

`src/App.jsx` is the complete default-exported React app: all ten screens, onboarding, mock data, illustrations, styles, and interactions live in that file. The other files are the minimal Vite, React, and Tailwind launch setup.

- Starts with six-step onboarding; Profile includes **Restart onboarding**.
- Press **1** during any onboarding step to jump to Home. The shortcut is inactive while typing in a field. It keeps your entered details and uses Alex Reyes if you have not entered a name.
- Includes 13 fictional colonists and 30 fictional songs, with translated cultural notes.
- Playback, recording, uploads, room chat, sharing, Earth sync status, and Spacewalk comms are simulated.
- Contributions, uploads, connections, playlists, reactions, and saved moments update across screens.
- All state lives in React memory. Refreshing starts a fresh session; no browser storage is used.
- No backend, authentication, external image requests, real recordings, or audio streaming.

The phone has a 390 × 844 logical display. On shorter desktop windows, the frame scales to stay fully visible; mobile uses the available viewport.

Browser-checked: onboarding, Weekly publishing and sharing, playback, translated notes and replies, playlists, listening rooms, uploads, filters and empty results, Spacewalk moments, time capsule contributions, profile editing, and 390 × 844 mobile bounds.

## Deploy on Vercel

This app is a static React + Vite frontend. It needs no backend or environment variables.

1. Push the app source to a GitHub repository: `src/`, `index.html`, `package.json`, `package-lock.json`, and `vite.config.js`.
2. In Vercel, add a new project and import that repository.
3. Use the **Vite** framework preset, **npm run build** as the build command, and **dist** as the output directory. Use the folder containing `package.json` as the root directory.
4. Deploy and share the resulting URL.

The presentation exports in `output/`, temporary deck files in `.lunar-deck-build/`, and local `node_modules/` are not needed for hosting. Navigation uses React state, so no route rewrites are required. Each visitor gets an independent mock session; refreshing resets it.

See [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite).
