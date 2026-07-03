// ============================================================
// COMPONENT: TaskStats
// PURPOSE: Displays live total/active/completed counts as
// colorful badges, and provides the "clear completed" action.
// Purely presentational — every number it shows is handed to
// it as a prop; it does no counting itself.
// TYPE: Client Component — the clear-completed button needs an
// onClick handler.
// PROPS:
//   total, active, completed — numbers computed by TaskBoard.
//   onClearCompleted() — callback fired when the user clicks
//   "Clear completed"; TaskBoard owns removing the tasks.
// ============================================================
"use client";

export default function TaskStats({ total, active, completed, onClearCompleted }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-playful bg-card p-4">
      <div className="flex gap-2">
        <Badge color="bg-violet" label={`${total} total`} />
        <Badge color="bg-teal" label={`${active} active`} />
        <Badge color="bg-coral" label={`${completed} done`} />
      </div>

      {/* Conditional render: only worth showing this button when
          there's actually something it could clear. Rendering it
          disabled instead would leave a dead control on screen
          for no reason. */}
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm font-bold text-ink-soft underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

// Small local helper — not exported, only used inside this file.
// Pulled out purely to avoid repeating the same three-line JSX
// three times above; it owns no logic of its own.
function Badge({ color, label }) {
  return (
    <span
      className={`${color} rounded-full px-3 py-1 text-xs font-bold text-white`}
    >
      {label}
    </span>
  );
}
