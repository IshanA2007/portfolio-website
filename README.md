# portfolio-website

This is the source for my personal site, [ishan-ajwani.com](https://ishan-ajwani.com). It is a single-page React app with a hero, an about section, and a projects section, plus a few custom touches like a particle background, a custom cursor, a preloader, and page transitions.

## Tech

- React with Vite
- react-router-dom for routing
- Custom CSS for the layout and animations, no UI framework
- Vercel Analytics, deployed on Vercel

## Editing the projects

The projects shown on the site are data-driven. They live in `src/data/projects.js`, so adding or reordering a project is a matter of editing that file rather than touching the components.

## Running it locally

1. Run `npm install`.
2. Run `npm run dev` and open the local URL it prints.
3. Run `npm run build` to produce the production build.
