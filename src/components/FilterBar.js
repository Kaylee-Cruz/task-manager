// ============================================================
// COMPONENT: FilterBar
// PURPOSE: Three buttons that let the user choose which subset
// of tasks TaskList should display. This component is entirely
// "dumb" — it doesn't know how filtering actually works, it
// just reports which button was clicked.
// TYPE: Client Component — has onClick handlers, which only
// work in the browser.
// PROPS:
//   currentFilter — the active filter string ("all" | "active"
//   | "done"), owned by TaskBoard, used here only to highlight
//   the matching button.
//   onFilterChange(next) — callback fired with the new filter
//   value when a button is clicked. TaskBoard owns the actual
//   filter state; this component never sets it directly.
// ============================================================
"use client";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

// One color per filter so each button has a distinct identity
// rather than three identical gray pills — ties back into the
// "colorful" design direction.
const ACTIVE_COLOR = {
  all: "bg-violet",
  active: "bg-teal",
  done: "bg-coral",
};

export default function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => {
        // Conditional render (conditional className, same idea):
        // the selected button gets a solid color fill; the
        // others stay outlined. This is derived straight from
        // props on every render, not stored anywhere, so it can
        // never fall out of sync with currentFilter.
        const isActive = currentFilter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              isActive
                ? `${ACTIVE_COLOR[opt.value]} text-white`
                : "bg-card text-ink-soft hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
