// ============================================================
// COMPONENT: TaskList
// PURPOSE: Renders the (already-filtered) array of tasks as a
// list of TaskCard rows. Filtering itself happens in TaskBoard
// — this component just maps over whatever array it's given.
// TYPE: Client Component. It renders no hooks or handlers of
// its own, but it's part of the same 'use client' tree as its
// parent/children which do, so it's marked client for clarity
// and consistency with the rest of the interactive UI.
// PROPS:
//   tasks — array of already-filtered task objects to display.
//   onToggle(id), onDelete(id) — passed straight through to
//   each TaskCard; TaskList doesn't need to touch these itself,
//   it just relays them further down.
// ============================================================
"use client";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        // key={task.id} (not index): React uses this to match
        // items across re-renders. Using the array index would
        // break when a task in the middle of the list is deleted
        // — every item after it would shift index and React
        // could reuse the wrong DOM node for the wrong task.
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          accentIndex={index}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
