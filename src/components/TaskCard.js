// ============================================================
// COMPONENT: TaskCard
// PURPOSE: Displays a single task. Receives task data from
// TaskList via props and fires callback events back up to
// TaskBoard when the user interacts (toggle/delete). Holds no
// state of its own — every visual detail is derived from props.
// TYPE: Client Component ('use client') — needs onClick handlers.
// PROPS:
//   id — unique task identifier (from crypto.randomUUID)
//   title — the task text typed by the user
//   done — boolean; true means the task is complete
//   accentIndex — the task's position in the visible list, used
//   only to pick a decorative accent color (not identity — the
//   real identity is `id`)
//   onToggle(id) — callback fired with this task's id when the
//   user clicks the checkbox; TaskBoard flips `done` with .map()
//   onDelete(id) — callback fired with this task's id when the
//   user clicks delete; TaskBoard removes it with .filter()
// ============================================================
"use client";

// Signature visual detail for the "colorful" direction: each
// card gets a left-edge accent color that cycles through the
// palette based on its position, so the list reads as playful
// rather than a flat gray stack — purely decorative, carries no
// meaning about the task itself.
const ACCENTS = ["border-l-sunflower", "border-l-teal", "border-l-violet", "border-l-coral"];

export default function TaskCard({ id, title, done, accentIndex, onToggle, onDelete }) {
  const accent = ACCENTS[accentIndex % ACCENTS.length];

  return (
    <li
      className={`flex items-center gap-3 rounded-playful border-l-4 bg-card p-4 shadow-sm ${accent}`}
    >
      <button
        onClick={() => onToggle(id)}
        aria-label={done ? "Mark as not done" : "Mark as done"}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          done ? "border-teal bg-teal text-white" : "border-ink-soft/40"
        }`}
      >
        {/* Conditional render: the checkmark glyph only makes
            sense to show once the task is actually done — an
            empty circle communicates "not done" better than a
            faded checkmark would. */}
        {done && "✓"}
      </button>

      {/* Conditional className: strikethrough + faded text is
          the visual signal for "complete" required by the
          assignment. This is a ternary, not two separate
          elements, because exactly one style applies at a time
          based on a single boolean. */}
      <span className={`flex-1 ${done ? "text-ink-soft line-through" : "text-ink"}`}>
        {title}
      </span>

      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="shrink-0 rounded-full px-3 py-1 text-sm font-bold text-coral hover:bg-coral/10"
      >
        Delete
      </button>
    </li>
  );
}
