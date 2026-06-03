import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectOrbit({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const count = projects.length;

  // Theme colors matching ProjectCard
  const themes = [
    { color: "#6366f1", tag: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { color: "#06b6d4", tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    { color: "#f43f5e", tag: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
    { color: "#f59e0b", tag: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { color: "#8b5cf6", tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    { color: "#10b981", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ];

  const currentProject = projects[activeIndex];
  const currentTheme = themes[activeIndex % themes.length];

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, count]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);

  return (
    <div 
      className="orbit-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="orbit-container">
        <AnimatePresence initial={false}>
          {projects.map((project, i) => {
            // Calculate distance from active index
            // We want to wrap around (e.g., if active is 0 and we are at length-1, distance is -1)
            let diff = i - activeIndex;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const isCenter = diff === 0;
            const zIndex = 100 - Math.abs(diff);

            // Hide cards that are too far away (e.g. > 2 positions)
            if (Math.abs(diff) > 2) return null;

            const theme = themes[i % themes.length];

            return (
              <motion.div
                key={project.id}
                className="orbit-card-wrapper"
                initial={false}
                animate={{
                  x: diff * 180, // Horizontal spread
                  y: Math.abs(diff) * 20, // Lower down the side cards
                  scale: isCenter ? 1 : 0.85 - Math.abs(diff) * 0.1, // Scale down side cards
                  rotateY: diff * -25, // Angle them towards the center
                  zIndex: zIndex,
                  opacity: isCenter ? 1 : 1 - Math.abs(diff) * 0.35,
                  filter: isCenter ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.6)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 1.2
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  pointerEvents: isCenter ? "auto" : "none",
                }}
                onClick={() => {
                  if (!isCenter) setActiveIndex(i);
                }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="orbit-card"
                  style={{
                    borderColor: isCenter ? `${theme.color}66` : "rgba(255,255,255,0.05)",
                    boxShadow: isCenter ? `0 20px 50px -10px ${theme.color}44, 0 0 0 1px ${theme.color}22` : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="orbit-card__image-container">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="orbit-card__image"
                    />
                    <div className="orbit-card__gradient" />
                  </div>

                  <div className="orbit-card__content">
                    <div 
                      className="orbit-card__accent" 
                      style={{ backgroundColor: theme.color }} 
                    />
                    <h3 className="orbit-card__title">{project.title}</h3>
                    <p className="orbit-card__tagline">{project.tagline}</p>
                    
                    {isCenter && (
                      <div className="orbit-card__tags">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className={`orbit-card__tag ${theme.tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="orbit-controls">
        <button onClick={handlePrev} className="orbit-btn" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <div className="orbit-indicators">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`orbit-dot ${i === activeIndex ? "active" : ""}`}
              style={i === activeIndex ? { backgroundColor: currentTheme.color, boxShadow: `0 0 10px ${currentTheme.color}` } : {}}
            />
          ))}
        </div>

        <button onClick={handleNext} className="orbit-btn" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
