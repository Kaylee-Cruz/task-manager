// ============================================================
// COMPONENT: Home (page.js)
// PURPOSE: Entry point for the "/" route. Its only job is to
// render the interactive app. It stays a Server Component so
// the initial HTML ships with zero client-side JS cost for
// this wrapper — the interactivity lives inside TaskBoard.
// TYPE: Server Component (no 'use client', no hooks, no
// event handlers here — those all require a Client Component).
// ============================================================
import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <TaskBoard />
      </div>
    </main>
  );
}
