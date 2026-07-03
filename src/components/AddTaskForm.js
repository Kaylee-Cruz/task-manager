// ============================================================
// COMPONENT: AddTaskForm
// PURPOSE: Lets the user type a new task title and submit it.
// It does NOT own the task list itself — it only signals
// upward through the onAdd callback. TaskBoard decides what
// actually happens to the data.
// TYPE: Client Component — needs useState for the input value
// and an onSubmit handler, both of which require the browser.
// PROPS:
//   onAdd(title) — called with the trimmed title when the user
//   submits a valid (non-blank) task.
// ============================================================
"use client";

import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  // Local state: only this component needs to know what the
  // user is currently typing, keystroke by keystroke. It would
  // be wasteful to lift this up to TaskBoard, since no sibling
  // component needs to know the in-progress (not-yet-submitted)
  // text.
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    // Stops the browser's default full-page-reload-on-submit
    // behavior. Without this, the form would trigger a native
    // navigation and wipe out all our React state.
    e.preventDefault();

    // Validation: reject blank/whitespace-only titles here so
    // TaskBoard's handleAdd never has to worry about receiving
    // garbage input. .trim() catches "   " (spaces only), which
    // a plain truthiness check on the raw string would miss.
    if (!title.trim()) return;

    onAdd(title.trim());
    setTitle(""); // reset the field so it's ready for the next task
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {/* Controlled input: value is always driven by React state
          (title), and onChange keeps state in sync on every
          keystroke. This is what lets us validate/trim/reset the
          field programmatically — an uncontrolled input (no
          value prop) wouldn't let handleSubmit clear it. */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task title"
        className="flex-1 rounded-playful border-2 border-violet/20 bg-card px-5 py-3 text-ink placeholder:text-ink-soft focus:border-violet focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-playful bg-sunflower px-6 py-3 font-display font-bold text-ink transition hover:brightness-95 active:scale-95"
      >
        Add
      </button>
    </form>
  );
}
