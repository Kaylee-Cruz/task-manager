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
## AI Usage Log


-I asked Claude to help me with figuring out what the error was that the terminal was giving me when I tried running npm run dev. I sent it a screenshot of the error. It replied with different solutions. One was that my TaskBoard.js file was in the wrong location. The other solution was that it may not have been properly saved. The issue ended up being that I forgot to save my TaskBoard.js file properly so it came up blank when the terminal tried to run the command. I learned to always save my files when finishing.

-I asked Claude to help me come up with a colorful palette for the website and it created a custom palette. I learned how to assign roles to specific colors in order to maintain a cleaner code. 

-I ran into a problem with my website where when I refreshed it did not save all of the tasks I had previously loaded. Claude helped me figure out the error in my code and why it was showing up. I learned that there was an issue with the local storage and I had to edit my TaskBoard.js file to fix it. 