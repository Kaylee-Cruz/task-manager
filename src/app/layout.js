// ============================================================
// COMPONENT: RootLayout
// PURPOSE: The outermost shell every page is rendered inside.
// Loads global CSS once so every page gets it for free instead
// of importing it per-page.
// TYPE: Server Component (default for everything in app/ unless
// a file starts with 'use client') — it never needs state or
// browser APIs, so there's no reason to ship it as client JS.
// ============================================================
import "./globals.css";

export const metadata = {
  title: "My Task Manager",
  description: "A colorful task manager built with Next.js and Tailwind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
