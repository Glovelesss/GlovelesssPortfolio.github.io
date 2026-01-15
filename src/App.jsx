import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      {/* Header komt hier */}
      <header className="bg-(--surface) p-4 border-b border-(--bordercolor)">
        <p className="text-center">Header placeholder</p>
      </header>

      {/* Pagina content via Outlet */}
      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      {/* Footer komt hier */}
      <footer className="bg-(--surface) p-4 border-t border-(--bordercolor)">
        <p className="text-center text-(--muted)">Footer placeholder</p>
      </footer>
    </div>
  );
}