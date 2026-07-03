// ============================================================
// COMPONENT: TaskBoard (the "brain" of the app)
// PURPOSE: Owns all task state and the current filter. Passes
// data DOWN to child components as props, and receives events
// UP from children via callback props (handleToggle, etc).
// This is "lifting state up" — the core React data-flow pattern
// that makes Add/Toggle/Delete/Filter/Clear all stay in sync
// with each other, because they all read from the same source
// of truth instead of each keeping their own copy.
// TYPE: Client Component — needs useState + useEffect, which
// only run in the browser, not during server rendering.
// PROPS: none — this is the top-level owner, nothing above it.
// ============================================================
"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

export default function TaskBoard() {
  // ---- STATE: tasks -----------------------------------------
  // Starts as an empty array on BOTH the server render and the
  // very first client render. This match is required — if the
  // client's first render used a different value (e.g. reading
  // localStorage immediately), React would detect the mismatch
  // against the server-rendered HTML and throw a hydration error.
  const [tasks, setTasks] = useState([]);

  // Tracks whether we've finished loading from localStorage yet.
  // Needed so the persistence effect below doesn't immediately
  // overwrite the saved data with this empty starting array
  // before the load has happened.
  const [hydrated, setHydrated] = useState(false);

  // ---- EFFECT: load tasks from localStorage on mount ------------
  // Effects only run in the browser, AFTER the first render is
  // already committed and hydration is complete — so updating
  // state here causes a normal client-side re-render, not a
  // server/client mismatch. Empty dependency array [] means this
  // runs exactly once, right after the component first mounts.
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setHydrated(true);
  }, []);

  // ---- STATE: filter -------------------------------------------
  // Filter is independent of tasks — it changes for a completely
  // different reason (user clicks a filter button, not adding/
  // removing a task) — so it gets its own useState instead of
  // being bundled into one big state object.
  const [filter, setFilter] = useState("all"); // "all" | "active" | "done"

  // ---- EFFECT: persist tasks to localStorage --------------------
  // Why an effect and not just calling localStorage.setItem
  // directly inside handleAdd/handleToggle/etc: this way there is
  // ONE place responsible for persistence, and it automatically
  // stays correct no matter which handler changed `tasks`. The
  // `if (!hydrated) return` guard stops this from firing before
  // the load-effect above has run — without it, this effect would
  // save an empty array to localStorage first and wipe out the
  // saved tasks before we ever got to read them.
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, hydrated]);

  // ---- DERIVED VALUES (not stored in state) ---------------------
  // These are calculated fresh from `tasks` on every render rather
  // than kept in their own useState. If we stored `completedCount`
  // as separate state, every add/toggle/delete would need to
  // remember to update it too — two sources of truth that can
  // drift out of sync. Deriving it means it's IMPOSSIBLE for it
  // to be wrong, because it's recalculated every time.
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.length - completedCount;

  const visibleTasks =
    filter === "active"
      ? tasks.filter((t) => !t.done)
      : filter === "done"
      ? tasks.filter((t) => t.done)
      : tasks; // "all" — no filtering needed

  // ---- HANDLERS (callbacks passed DOWN to children) --------------
  function handleAdd(title) {
    // Spread (...tasks) copies every existing task into a NEW
    // array instead of pushing onto the old one. React decides
    // whether to re-render by comparing the OLD state reference
    // to the NEW one — if we mutated `tasks` in place with
    // .push(), the reference would stay identical and React
    // could skip the re-render entirely, silently breaking the UI.
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  function handleToggle(id) {
    // .map() returns a brand-new array, which is what gives React
    // a new reference to detect. Every task is copied through
    // unchanged EXCEPT the one matching `id`, which gets a new
    // object with `done` flipped. We don't mutate the matched
    // task directly (task.done = !task.done) because that would
    // change the old array in place — same problem as .push().
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function handleDelete(id) {
    // .filter() builds a new array containing everything EXCEPT
    // the matching id — this is how "removal" works immutably;
    // there's no in-place "remove item" on arrays we should use
    // here, since that would mutate state directly.
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    // Same immutable-filter pattern as delete, just keeping only
    // the tasks that are NOT done.
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="font-display text-sm font-bold uppercase tracking-widest text-violet">
          Module 10 · Project 10
        </p>
        <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
          My Task Manager
        </h1>
      </header>

      <AddTaskForm onAdd={handleAdd} />

      <TaskStats
        total={tasks.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={handleClearCompleted}
      />

      <FilterBar currentFilter={filter} onFilterChange={setFilter} />

      {/* Conditional render: an empty list reads as "is this app
          broken?" without an explicit message, so we show a
          friendly empty state instead of just rendering nothing.
          This triggers whenever the filtered result set is empty
          — whether that's zero tasks overall, or zero tasks that
          match the current filter (e.g. "Active" with none left). */}
      {visibleTasks.length === 0 ? (
        <p className="rounded-playful bg-card p-6 text-center text-ink-soft">
          {tasks.length === 0
            ? "No tasks yet — add your first one above."
            : "Nothing here for this filter."}
        </p>
      ) : (
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

