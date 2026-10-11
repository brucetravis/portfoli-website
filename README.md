# Bruce Travis

Personal website of Bruce Travis, software engineer in Nairobi, Kenya.

## Stack
- Astro
- Plain CSS with design tokens
- Self-hosted fonts: Instrument Serif, Hanken Grotesk, IBM Plex Mono

## Run locally
npm install
npm run dev
Open http://localhost:4321

## Commands
| Command           | Action                          |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the development server    |
| `npm run build`   | Build the site into `./dist/`   |
| `npm run preview` | Preview the built site locally  |

## Structure
src/
├── layouts/   BaseLayout.astro: shared page shell
├── pages/     each file is a page (index.astro = home)
└── styles/    global.css: colours, fonts, base styles
public/        static files (favicon, logo)

© 2026 Bruce Travis