import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectWheel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragAccum = useRef(0);
  const containerRef = useRef(null);
  const autoRotateTimer = useRef(null);

  const count = projects.length;
  const angleStep = 360 / count;

  // Theme colors matching ProjectCard
  const themes = [
    { color: "#6366f1", tag: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { color: "#06b6d4", tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    { color: "#f43f5e", tag: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
    { color: "#f59e0b", tag: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { color: "#8b5cf6", tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    { color: "#10b981", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ];

  const rotate = useCallback(
    (dir) => {
      setActiveIndex((prev) => (prev + dir + count) % count);
      // Pause auto-rotate on manual interaction, resume after delay
      setIsAutoRotating(false);
      clearTimeout(autoRotateTimer.current);
      autoRotateTimer.current = setTimeout(() => setIsAutoRotating(true), 5000);
    },
    [count]
  );

  // Auto-rotate
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoRotating, count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") rotate(-1);
      if (e.key === "ArrowRight") rotate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [rotate]);

  // Mouse / touch drag
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragAccum.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragAccum.current = x - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragAccum.current > 60) rotate(-1);
    else if (dragAccum.current < -60) rotate(1);
  };

  const currentProject = projects[activeIndex];
  const currentTheme = themes[activeIndex % themes.length];

  return (
    <div
      className="wheel-wrapper"
      onMouseEnter={() => setIsAutoRotating(false)}
      onMouseLeave={() => {
        clearTimeout(autoRotateTimer.current);
        autoRotateTimer.current = setTimeout(() => setIsAutoRotating(true), 1500);
      }}
    >
      {/* 3D Wheel Scene */}
      <div
        className="wheel-scene"
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div
          className="wheel-drum"
          style={{
            transform: `rotateY(${-activeIndex * angleStep}deg)`,
          }}
        >
          {projects.map((project, i) => {
            const theme = themes[i % themes.length];
            const angle = i * angleStep;
            const isActive = i === activeIndex;

            return (
              <div
                key={project.id}
                className={`wheel-card ${isActive ? "wheel-card--active" : ""}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(var(--wheel-radius))`,
                  "--card-accent": theme.color,
                }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="wheel-card__inner"
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveIndex(i);
                      setIsAutoRotating(false);
                      clearTimeout(autoRotateTimer.current);
                      autoRotateTimer.current = setTimeout(
                        () => setIsAutoRotating(true),
                        5000
                      );
                    }
                  }}
                >
                  {/* Thumbnail */}
                  <div className="wheel-card__image">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      draggable={false}
                    />
                    <div className="wheel-card__overlay" />
                  </div>

                  {/* Content */}
                  <div className="wheel-card__content">
                    <div
                      className="wheel-card__accent-line"
                      style={{ backgroundColor: theme.color }}
                    />
                    <h3 className="wheel-card__title">{project.title}</h3>
                    <p className="wheel-card__tagline">{project.tagline}</p>
                  </div>

                  {/* Active indicator glow */}
                  {isActive && (
                    <div
                      className="wheel-card__glow"
                      style={{
                        boxShadow: `0 0 40px ${theme.color}33, 0 0 80px ${theme.color}11`,
                        borderColor: `${theme.color}55`,
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="wheel-nav">
        <button
          className="wheel-nav__btn"
          onClick={() => rotate(-1)}
          aria-label="Previous project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="wheel-nav__dots">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setIsAutoRotating(false);
                clearTimeout(autoRotateTimer.current);
                autoRotateTimer.current = setTimeout(
                  () => setIsAutoRotating(true),
                  5000
                );
              }}
              className={`wheel-nav__dot ${i === activeIndex ? "wheel-nav__dot--active" : ""}`}
              style={i === activeIndex ? { backgroundColor: currentTheme.color, boxShadow: `0 0 8px ${currentTheme.color}` } : {}}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="wheel-nav__btn"
          onClick={() => rotate(1)}
          aria-label="Next project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Active Project Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          className="wheel-info"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="wheel-info__accent"
            style={{ backgroundColor: currentTheme.color }}
          />
          <h3 className="wheel-info__title" style={{ color: currentTheme.color }}>
            {currentProject.title}
          </h3>
          <p className="wheel-info__tagline">{currentProject.tagline}</p>
          <div className="wheel-info__tags">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className={`wheel-info__tag ${currentTheme.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`/projects/${currentProject.id}`}
            className="wheel-info__cta"
            style={{
              borderColor: `${currentTheme.color}44`,
              color: currentTheme.color,
            }}
          >
            Bekijk Project →
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
