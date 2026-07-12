# My Task Manager

A task manager built with Next.js 16, React 19, and Tailwind CSS v4 for ISM 3232, Project 10.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build and run a production version locally:

```bash
npm run build
npm run start
```
## Technologies used

- **Next.js 16** (App Router) — routing and project structure
- **React 19** — component state and UI (useState, useEffect)
- **Tailwind CSS v4** — styling, using `@theme inline` for custom design tokens
- **localStorage** — persists tasks in the browser between sessions

## Design decisions

**Direction: Colorful.** The palette is defined as CSS custom properties in
`src/app/globals.css` (cream background, coral / teal / sunflower / violet
accents) and mapped into Tailwind utilities via `@theme inline`, so classes
like `bg-coral` or `text-violet` are available everywhere.

- Each task card gets a left-edge accent color that cycles through the
  palette based on its position in the list (`TaskCard.js`) — a small
  signature detail so the list doesn't read as a flat gray stack.
- Filter buttons (`FilterBar.js`) and stat badges (`TaskStats.js`) each get
  their own accent color tied to their meaning (teal = active, coral = done)
  rather than all sharing one accent.
- Buttons and cards use a shared `rounded-playful` radius token instead of
  Tailwind's default `rounded-lg`, for a consistent, slightly exaggerated
  rounded-corner look throughout.
- Fonts are system font stacks (`--font-display` / `--font-body` in
  `globals.css`) rather than an imported webfont, so the project has no
  external font dependency.

## File structure

```
src/
├── app/
│   ├── layout.js       # root layout
│   ├── page.js         # entry point, renders TaskBoard
│   └── globals.css     # color palette + design tokens
└── components/
    ├── TaskBoard.js     # owns all task state and filter logic
    ├── AddTaskForm.js   # input for creating a new task
    ├── TaskList.js      # renders the filtered list of tasks
    ├── TaskCard.js       # single task row (toggle/delete)
    ├── FilterBar.js      # All / Active / Done filter buttons
    └── TaskStats.js       # total/active/done counts + clear button
```
## AI Usage Log

- Used Claude to debug a blank-page error on `npm run dev`, traced to an unsaved `TaskBoard.js` file.
- Collaborated with Claude to design the custom color palette and assign semantic roles to each accent color.
- Used Claude to diagnose a localStorage bug where tasks weren't persisting on refresh — fixed by sequencing the load/save effects correctly.p. I learned that there was an issue with the local storage and I had to edit my TaskBoard.js file to fix it. 
## What I learned

Building this project helped me understand how React manages state that multiple components need to share — rather than each component tracking its own copy of the task list, TaskBoard owns the data and passes it down through props, which keeps everything in sync automatically. I also learned why array updates need to create new arrays instead of mutating the old one (using `.map()` and `.filter()` instead of `.push()`), since React relies on detecting a new reference to know it should re-render. Debugging the localStorage persistence issue taught me about the order effects run in — I had to make sure the "load from storage" effect finished before the "save to storage" effect could run, or it would silently overwrite my saved data.
