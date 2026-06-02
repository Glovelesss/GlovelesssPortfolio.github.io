import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [showProjects, setShowProjects] = useState(false);

  //Helper functie om te checken of een link actief is
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/projects");
    }
    return location.pathname.startsWith(path);
  };

  //Scroll naar boven bij navigatie
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-animated border-b border-(--bordercolor)">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Site naam */}
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="text-xl font-bold text-(--accent) smooth-transition hover:text-(--accent-hover) hover:scale-105 inline-block"
        >
          Portfolio
        </Link>

        {/* Navigatie links */}
        <div className="flex gap-6">
          {/* Projects Dropdown */}
          <div className="relative group">
            <button
               onClick={() => setShowProjects(!showProjects)}
               className={`smooth-transition px-3 py-1 rounded-md flex items-center gap-1 ${
                 isActive("/") || isActive("/game-jams")
                   ? "bg-(--accent)/10 text-(--accent) font-semibold"
                   : "text-(--muted) hover:text-(--text) hover:bg-(--surface)"
               }`}
            >
              Projecten
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute left-0 mt-2 w-48 transition-all duration-300 transform origin-top-left ${
              showProjects ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
            } z-50`}>
              <div className="py-2 bg-(--surface) rounded-lg shadow-xl border border-(--bordercolor) flex flex-col">
                <Link
                  to="/"
                  onClick={() => { scrollToTop(); setShowProjects(false); }}
                  className="px-4 py-2 text-sm text-(--text) hover:bg-(--accent)/10 hover:text-(--accent) transition-colors"
                >
                  Schoolprojecten
                </Link>
                <Link
                  to="/game-jams"
                  onClick={() => { scrollToTop(); setShowProjects(false); }}
                  className="px-4 py-2 text-sm text-(--text) hover:bg-(--accent)/10 hover:text-(--accent) transition-colors"
                >
                  Game Jams
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/about"
            onClick={scrollToTop}
            className={`smooth-transition px-3 py-1 rounded-md ${
              isActive("/about") 
                ? "bg-(--accent)/10 text-(--accent) font-semibold" 
                : "text-(--muted) hover:text-(--text) hover:bg-(--surface)"
            }`}
          >
            Over Mij
          </Link>

          <Link
            to="/contact"
            onClick={scrollToTop}
            className={`smooth-transition px-3 py-1 rounded-md ${
              isActive("/contact") 
                ? "bg-(--accent)/10 text-(--accent) font-semibold" 
                : "text-(--muted) hover:text-(--text) hover:bg-(--surface)"
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}