import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      {/* Header komt hier */}
      <header className="bg-(--surface)/80 p-4 border-b border-(--bordercolor) sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            <span className="text-(--accent)">G</span>loveless
          </Link>
          <nav className="flex gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-(--accent) transition-colors">Projecten</Link>
            <Link to="/lab" className="hover:text-(--accent-secondary) transition-colors">Lab</Link>
            <Link to="/about" className="hover:text-(--accent) transition-colors">Over Mij</Link>
          </nav>
        </div>
      </header>

      {/* Pagina content via Outlet */}
      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>

      {/* Footer komt hier */}
      <footer className="bg-(--surface) py-10 border-t border-(--bordercolor)">
        <div className="container mx-auto px-4 text-center">
          <p className="text-(--text) font-medium mb-2">© {new Date().getFullYear()} Casper Winkel</p>
          <p className="text-sm text-(--muted)">Gemaakt met passie voor XR & Design</p>
        </div>
      </footer>
    </div>
  );
}