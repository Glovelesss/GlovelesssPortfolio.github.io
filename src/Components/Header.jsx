import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

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
    <header className="sticky top-0 z-50 bg-(--surface) border-b border-(--bordercolor)">
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
          <Link
            to="/"
            onClick={scrollToTop}
            className={`smooth-transition px-3 py-1 rounded-md ${
              isActive("/") 
                ? "bg-(--accent)/10 text-(--accent) font-semibold" 
                : "text-(--muted) hover:text-(--text) hover:bg-(--surface)"
            }`}
          >
            Projects
          </Link>

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