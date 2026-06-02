import { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sluit dropdown als je ergens anders klikt
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Randomize background color over time
  useEffect(() => {
    const interval = setInterval(() => {
      const randomHue = Math.floor(Math.random() * 360);
      document.documentElement.style.setProperty('--theme-hue', randomHue);
    }, 5000); // Change color every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      {/* Header komt hier */}
      <header className="bg-(--surface)/80 p-4 border-b border-(--bordercolor) sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            <span className="text-(--accent)">G</span>loveless
          </Link>
          <nav className="flex gap-8 text-sm font-medium">
            {/* Projecten Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-(--accent) transition-colors flex items-center gap-1 cursor-pointer"
              >
                Projecten
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 w-48 transition-all duration-200 origin-top ${
                  dropdownOpen
                    ? "opacity-100 visible scale-100 translate-y-0"
                    : "opacity-0 invisible scale-95 -translate-y-1"
                } z-50`}
              >
                <div className="py-1.5 bg-(--surface) rounded-lg shadow-xl border border-(--bordercolor) flex flex-col overflow-hidden">
                  <Link
                    to="/"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2.5 text-sm hover:bg-(--accent)/10 hover:text-(--accent) transition-colors"
                  >
                    Schoolprojecten
                  </Link>
                  <Link
                    to="/game-jams"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2.5 text-sm hover:bg-(--accent)/10 hover:text-(--accent) transition-colors"
                  >
                    Game Jams
                  </Link>
                </div>
              </div>
            </div>

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